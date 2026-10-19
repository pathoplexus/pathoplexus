#!/bin/bash

set -x

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load local connection settings (PGHOST) if present.
if [ -f "$SCRIPT_DIR/env.sh" ]; then
    # shellcheck disable=SC1091
    source "$SCRIPT_DIR/env.sh"
fi

# Only restricted roles are used (see setup-clone-roles.sql), the bastion must not hold
# credentials for postgres or the prod owner roles.
CLONE_LOADER="staging_clone_loader"

if [ -z "${PGHOST:-}" ]; then
    echo "Error: PGHOST is not set." >&2
    echo "Export it in the environment on the bastion/server, or create" >&2
    echo "$SCRIPT_DIR/env.sh (copy env.sh.example). See README.md." >&2
    exit 1
fi

print_usage() {
    echo "Usage: $0 <action> <database> <file> <username>"
    echo "Actions:"
    echo "  dump - Dump the specified database to a file, connecting as <username>"
    echo "  load - Load a dump file into the specified database, owned by <username>"
    echo "Examples:"
    echo "  $0 dump pathoplexus_prod_keycloak temp_dump.sql prod_keycloak_clone_reader"
    echo "  $0 load pathoplexus_staging_keycloak temp_dump.sql staging_keycloak_user"
}

check_command() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

dump_database() {
    local db_name="$1"
    local dump_file="$2"
    local db_user="$3"
    echo "Dumping $db_name database to $dump_file..."
    # --enable-row-security: dump only the rows the user may see (hides Keycloak realm keys),
    # without it pg_dump errors out on tables with RLS
    pg_dump -U "$db_user" --enable-row-security --if-exists --no-owner --clean "$db_name" > "$dump_file"
    check_command "Failed to dump $db_name database"
    echo "Database dump completed successfully!"
}

prepare_database() {
    local db_name="$1"
    local db_user="$2"
    echo "Preparing database $db_name..."
    psql -d postgres -U "$db_user" <<EOF
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = '$db_name' AND pid <> pg_backend_pid();
        REVOKE CONNECT ON DATABASE $db_name FROM public;
        ALTER DATABASE $db_name CONNECTION LIMIT 0;
EOF
    check_command "Failed to prepare database $db_name"
}

restore_limited_access() {
    local db_name="$1"
    local db_user="$2"
    echo "Restoring limited access for postgres user only on $db_name..."
    psql -d postgres -U "$db_user" <<EOF
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = '$db_name' AND pid <> pg_backend_pid();
        REVOKE CONNECT ON DATABASE $db_name FROM public;
        ALTER DATABASE $db_name CONNECTION LIMIT 1;
EOF
    check_command "Failed to restore limited access to $db_name"
}

restore_full_access() {
    local db_name="$1"
    local db_user="$2"
    echo "Restoring full access for all users on $db_name..."
    psql -d postgres -U "$db_user" <<EOF
        GRANT CONNECT ON DATABASE $db_name TO public;
        ALTER DATABASE $db_name CONNECTION LIMIT -1;
EOF
    check_command "Failed to restore full access to $db_name"
}

change_ownership() {
    local db_name="$1"
    local new_owner="$2"
    echo "Changing ownership to $new_owner"
    psql -d "$db_name" <<EOF
    DO \$\$
    DECLARE
        r RECORD;
    BEGIN
        -- Change ownership of tables
        FOR r IN (SELECT schemaname, tablename FROM pg_tables WHERE schemaname = 'public')
        LOOP
            EXECUTE 'ALTER TABLE ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) || ' OWNER TO ' || quote_ident('$new_owner');
        END LOOP;

        -- Change ownership of views
        FOR r IN (SELECT schemaname, viewname FROM pg_views WHERE schemaname = 'public')
        LOOP
            EXECUTE 'ALTER VIEW ' || quote_ident(r.schemaname) || '.' || quote_ident(r.viewname) || ' OWNER TO ' || quote_ident('$new_owner');
        END LOOP;
    END \$\$;
EOF
    check_command "Failed to change ownership"
}

load_database() {
    local db_name="$1"
    local dump_file="$2"
    local new_owner="$3"

    # The loader is a member of the owner role, which allows it to drop the database
    # and terminate remaining connections (FORCE)
    psql -U "$CLONE_LOADER" -d postgres -c "DROP DATABASE IF EXISTS \"$db_name\" WITH (FORCE);"
    check_command "Failed to drop $db_name"

    psql -U "$CLONE_LOADER" -d postgres -c "CREATE DATABASE \"$db_name\" WITH OWNER = \"$new_owner\";"
    check_command "Failed to create $db_name"

    psql -U "$CLONE_LOADER" -d "$db_name" -v ON_ERROR_STOP=1 <<EOF
BEGIN;
SET ROLE "$new_owner";
-- Load the dump file
\i $dump_file;
COMMIT;
EOF
    check_command "Failed to load $dump_file into $db_name"

    echo "Database loading completed successfully!"
}

if [ "$#" -ne 4 ]; then
    print_usage
    exit 1
fi

ACTION="$1"
DB_NAME="$2"
FILE="$3"
DB_USER="$4"

case "$ACTION" in
    dump)
        dump_database "$DB_NAME" "$FILE" "$DB_USER"
        ;;
    load)
        load_database "$DB_NAME" "$FILE" "$DB_USER"
        ;;
    *)
        echo "Invalid action: $ACTION"
        print_usage
        exit 1
        ;;
esac
