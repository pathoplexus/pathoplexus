#!/bin/bash

set -Eeuo pipefail

# This script orchestrates the cloning of Keycloak and Loculus databases from production to staging
# Keycloak is dumped second and loaded first to prevent potential race conditions

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHILD_SCRIPT="$SCRIPT_DIR/clone.sh"
PROD_KC_DUMP="production_keycloak_dump.sql"
PROD_LOC_DUMP="production_loculus_dump.sql"
PROD_KC_DB="pathoplexus_prod_keycloak"
PROD_LOC_DB="pathoplexus_prod_loculus"
STAGING_KC_DB="pathoplexus_staging_keycloak"
STAGING_LOC_DB="pathoplexus_staging_loculus"
STAGING_KC_USER="staging_keycloak_user"
STAGING_LOC_USER="staging_loculus_user"
PROD_S3_BUCKET="ppx-s3-bucket"
STAGING_S3_BUCKET="ppx-staging-s3-bucket"
S3_SYNC_LOG=""
S3_SYNC_PID=""
LOC_SED_PID=""
KC_SED_PID=""

cleanup() {
    for pid in "${S3_SYNC_PID:-}" "${LOC_SED_PID:-}" "${KC_SED_PID:-}"; do
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
        fi
    done
    if [ -n "${S3_SYNC_LOG:-}" ] && [ -f "$S3_SYNC_LOG" ]; then
        rm -f "$S3_SYNC_LOG"
    fi
}
trap cleanup EXIT

ensure_s5cmd() {
    if command -v s5cmd >/dev/null 2>&1; then
        return 0
    fi

    echo "s5cmd not found. Installing s5cmd..." >&2
    local arch
    case "$(uname -m)" in
        x86_64)  arch="64bit" ;;
        aarch64) arch="arm64" ;;
        *) echo "Error: Unsupported architecture $(uname -m)" >&2; return 1 ;;
    esac

    local tmp_dir
    tmp_dir=$(mktemp -d)
    if ! curl -fsSL "https://github.com/peak/s5cmd/releases/download/v2.3.0/s5cmd_2.3.0_Linux-${arch}.tar.gz" | tar -xz -C "$tmp_dir" s5cmd; then
        echo "Error: Failed to download s5cmd. Check network connectivity." >&2
        rm -rf "$tmp_dir"
        return 1
    fi

    if [ -w /usr/local/bin ]; then
        mv "$tmp_dir/s5cmd" /usr/local/bin/
    elif sudo -n true 2>/dev/null; then
        sudo mv "$tmp_dir/s5cmd" /usr/local/bin/
    else
        mkdir -p "$HOME/.local/bin"
        mv "$tmp_dir/s5cmd" "$HOME/.local/bin/"
        export PATH="$HOME/.local/bin:$PATH"
    fi
    rm -rf "$tmp_dir"
    echo "s5cmd installed successfully."
}

start_s3_sync_background() {
    ensure_s5cmd

    echo "Verifying S3 bucket credentials and access..."
    s5cmd --profile db-clone ls "s3://$PROD_S3_BUCKET" >/dev/null
    s5cmd --profile db-clone ls "s3://$STAGING_S3_BUCKET" >/dev/null

    echo "Starting S3 bucket sync in the background..."
    S3_SYNC_LOG=$(mktemp -t s3_sync_XXXXXX.log)
    s5cmd --profile db-clone --numworkers 256 --stat sync --delete \
        "s3://$PROD_S3_BUCKET/*" "s3://$STAGING_S3_BUCKET/" > "$S3_SYNC_LOG" 2>&1 &
    S3_SYNC_PID=$!
}

wait_for_s3_sync() {
    if [ -z "${S3_SYNC_PID:-}" ]; then
        return 0
    fi

    echo "Waiting for background S3 sync to complete..."
    local pid="$S3_SYNC_PID"
    S3_SYNC_PID=""
    if ! wait "$pid"; then
        echo "Error: S3 bucket sync failed. Output:" >&2
        cat "$S3_SYNC_LOG" >&2
        exit 1
    fi

    echo "S3 bucket sync completed successfully!"
    grep -A 20 -E "^Operation[[:space:]]+Total" "$S3_SYNC_LOG" || true
}

# Note: Could screw up columns and values that contain `prod` etc
# For now not an issue but might eventually want to be more surgical
perform_sed_replacements() {
    local file="$1"
    echo "Performing sed replacements on $file..."
    # Abort the script if a line with `@` contains the word "prod" to prevent altering sensitive data
    if awk '/@/ && /prod_/ { found=1; exit } END { exit !found }' "$file"; then
        echo "Error: Found 'prod' in line with '@' in $file. Aborting to prevent changing sensitive data." >&2
        exit 1
    fi

    # Do not perform replacements on lines that contain the protected URL
    # see https://github.com/pathoplexus/pathoplexus/issues/1127
    local protected_url='https://pathoplexus.org/about/governance/minutes/2026-06-01_EB_Resolutions.pdf'
    local placeholder='__PROTECTED_PATHOPLEXUS_URL__'

    sed -i \
        -e "s#${protected_url}#${placeholder}#g" \
        -e 's/prod_loculus_user/staging_loculus_user/g' \
        -e 's/prod_keycloak_user/staging_keycloak_user/g' \
        -e 's#//pathoplexus.org#//staging.pathoplexus.org#g' \
        -e 's#authentication.pathoplexus.org#authentication-staging.pathoplexus.org#g' \
        -e "s#${placeholder}#${protected_url}#g" \
        "$file"
}

echo "Dumping production Loculus database..."
$CHILD_SCRIPT dump $PROD_LOC_DB $PROD_LOC_DUMP
# Perform sed replacements on Loculus dump in the background while Keycloak is dumped
perform_sed_replacements "$PROD_LOC_DUMP" &
LOC_SED_PID=$!

echo "Dumping production Keycloak database..."
$CHILD_SCRIPT dump $PROD_KC_DB $PROD_KC_DUMP
perform_sed_replacements "$PROD_KC_DUMP" &
KC_SED_PID=$!

# Start S3 sync immediately after DB dumps finish so it runs concurrently with DB loading.
# Syncing files after the dump guarantees no files referenced by the dumped db can be missing.
start_s3_sync_background

# Ensure sed replacements succeeded BEFORE loading into staging databases
echo "Validating database dump replacements..."
wait "$KC_SED_PID"
KC_SED_PID=""
wait "$LOC_SED_PID"
LOC_SED_PID=""

echo "Loading Keycloak dump to staging..."
$CHILD_SCRIPT load $STAGING_KC_DB $PROD_KC_DUMP $STAGING_KC_USER

echo "Loading Loculus dump to staging..."
$CHILD_SCRIPT load $STAGING_LOC_DB $PROD_LOC_DUMP $STAGING_LOC_USER

# Ensure S3 sync has finished before completing the clone
wait_for_s3_sync

echo "Cloning process completed successfully!"
if command -v kubectl >/dev/null 2>&1 && kubectl --request-timeout=5s get deployment/loculus-backend -n staging >/dev/null 2>&1; then
    echo "Restarting staging backend deployment..."
    if ! kubectl rollout restart deployment/loculus-backend -n staging; then
        echo "Warning: Backend rollout restart failed. Please restart manually:" >&2
        echo "  kubectl rollout restart deployment/loculus-backend -n staging" >&2
    fi
else
    echo "Please restart the backend to apply changes:"
    echo "  kubectl rollout restart deployment/loculus-backend -n staging"
fi
