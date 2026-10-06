#!/bin/bash

set -Eeuo pipefail

# This script orchestrates the cloning of Keycloak and Loculus databases from production to staging
# Keycloak is dumped second and loaded first to prevent potential race conditions

# Set variables
CHILD_SCRIPT="./clone.sh"
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

# Note: Could screw up columns and values that contain `prod` etc
# For now not an issue but might eventually want to be more surgical
perform_sed_replacements() {
    local file="$1"
    echo "Performing sed replacements on $file..."
    # Abort the script if a line with `@` contains the word "prod" to prevent altering sensitive data
    if awk '/@/ && /prod_/ { found=1; exit } END { exit !found }' "$file"; then
        echo "Error: Found 'prod' in line with '@' in $file. Aborting to prevent changing sensitive data."
        exit 1
    fi

    # Do not perform replacements on lines that contain the protected URL
    # see https://github.com/pathoplexus/pathoplexus/issues/1127
    local protected_url='https://pathoplexus.org/about/governance/minutes/2026-06-01_EB_Resolutions.pdf'
    local placeholder='__PROTECTED_PATHOPLEXUS_URL__'
    sed -i "s#${protected_url}#${placeholder}#g" "$file"

    sed -i 's/prod_loculus_user/staging_loculus_user/g' "$file"
    sed -i 's/prod_keycloak_user/staging_keycloak_user/g' "$file"
    sed -i 's#//pathoplexus.org#//staging.pathoplexus.org#g' "$file"
    sed -i 's#authentication.pathoplexus.org#authentication-staging.pathoplexus.org#g' "$file"

    # Restore the protected string
    sed -i "s#${placeholder}#${protected_url}#g" "$file"
}

sync_s3_buckets() {
    echo "Syncing S3 buckets from production to staging..."
    aws configure set s3.max_concurrent_requests 50 --profile db-clone
    aws s3 sync s3://$PROD_S3_BUCKET s3://$STAGING_S3_BUCKET --delete --profile db-clone || { echo "Error: Failed to sync S3 buckets"; exit 1; }
    echo "S3 bucket sync completed successfully!"
}

echo "Dumping production Loculus database..."
$CHILD_SCRIPT dump $PROD_LOC_DB $PROD_LOC_DUMP

echo "Dumping production Keycloak database..."
$CHILD_SCRIPT dump $PROD_KC_DB $PROD_KC_DUMP

# Sync files after the dump so no files referenced by the dumped db can be missing (there might
# be additional unreferenced files in the bucket but that is ok, to prevent additional files we
# could enable s3 versioning and pick whichever version has LastModified <= T
echo "Syncing S3 buckets..."
sync_s3_buckets

perform_sed_replacements $PROD_KC_DUMP
perform_sed_replacements $PROD_LOC_DUMP

echo "Loading Keycloak dump to staging..."
$CHILD_SCRIPT load $STAGING_KC_DB $PROD_KC_DUMP $STAGING_KC_USER

echo "Loading Loculus dump to staging..."
$CHILD_SCRIPT load $STAGING_LOC_DB $PROD_LOC_DUMP $STAGING_LOC_USER

echo "Cloning process completed successfully!"
echo "Please restart the backend to apply changes."