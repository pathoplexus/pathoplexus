#!/bin/bash

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

check_command() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

# Note: Could screw up columns and values that contain `prod` etc
# For now not an issue but might eventually want to be more surgical
perform_sed_replacements() {
    local file="$1"
    echo "Performing sed replacements on $file..."
    # Abort the script if a line with `@` contains the word "prod" to prevent altering sensitive data
    if grep -q '@' "$file"; then
        if grep -q 'prod' "$file"; then
            echo "Error: Found 'prod' in $file. Aborting to prevent changing sensitive data."
            exit 1
        fi
    fi

    sed -i 's/prod/staging/g' "$file"
    sed -i 's#//pathoplexus.org#//staging.pathoplexus.org#g' "$file"
    sed -i 's#authentication.pathoplexus.org#authentication-staging.pathoplexus.org#g' "$file"
    check_command "Failed to perform sed replacements on $file"
}

echo "Dumping production Loculus database..."
$CHILD_SCRIPT dump $PROD_LOC_DB $PROD_LOC_DUMP
check_command "Failed to dump production Loculus database"

echo "Dumping production Keycloak database..."
$CHILD_SCRIPT dump $PROD_KC_DB $PROD_KC_DUMP
check_command "Failed to dump production Keycloak database"

perform_sed_replacements $PROD_KC_DUMP

perform_sed_replacements $PROD_LOC_DUMP

echo "Loading Keycloak dump to staging..."
$CHILD_SCRIPT load $STAGING_KC_DB $PROD_KC_DUMP $STAGING_KC_USER
check_command "Failed to load Keycloak dump to staging"

echo "Loading Loculus dump to staging..."
$CHILD_SCRIPT load $STAGING_LOC_DB $PROD_LOC_DUMP $STAGING_LOC_USER
check_command "Failed to load Loculus dump to staging"

echo "Cloning process completed successfully!"
echo "Please restart the backend to apply changes."