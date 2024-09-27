#!/bin/bash

set -x


export PGHOST=pathoplexus3.cluster-che6ccwa8oie.eu-central-1.rds.amazonaws.com
export PGUSER=postgres

print_usage() {
    echo "Usage: $0 <action> <database> <file> [new_owner_username]"
    echo "Actions:"
    echo "  dump - Dump the specified database to a file"
    echo "  load - Load a dump file into the specified database"
    echo "Examples:"
    echo "  $0 dump production temp_dump.sql"
    echo "  $0 load staging temp_dump.sql staging_keycloak_user"
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
    echo "Dumping $db_name database to $dump_file..."
    pg_dump --if-exists --no-owner --clean "$db_name" > "$dump_file"
    check_command "Failed to dump $db_name database"
    echo "Database dump completed successfully!"
    echo "Dump file: $dump_file"
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

    psql -U postgres -d postgres -c "
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE pid <> pg_backend_pid()
        AND datname = '$db_name';
    "

    psql -U postgres -d postgres -c "REVOKE postgres FROM $new_owner"
    psql -U postgres -d postgres -c "REVOKE $new_owner FROM postgres"
    psql -U postgres -d postgres -c "GRANT $new_owner TO postgres"

    psql -U $new_owner -d postgres -c "DROP DATABASE IF EXISTS \"$db_name\";"

    psql -U postgres -d postgres -c "CREATE DATABASE \"$db_name\" WITH OWNER = \"$new_owner\";"
    psql -U postgres -d postgres -c "REVOKE CONNECT ON DATABASE $db_name FROM \"$new_owner\";"

    psql -U postgres -d postgres -c "REVOKE $new_owner FROM postgres"

    psql -U postgres -d "$db_name" <<EOF
GRANT postgres TO "$new_owner";
BEGIN;
SET ROLE "$new_owner";
-- Load the dump file
\i "$dump_file";
COMMIT;
SET ROLE "postgres";
REVOKE postgres FROM "$new_owner";
EOF

    echo "Database loading completed successfully!"
}

if [ "$#" -lt 3 ] || [ "$#" -gt 4 ]; then
    print_usage
    exit 1
fi

ACTION="$1"
DB_NAME="$2"
FILE="$3"
NEW_OWNER="${4:-}"

case "$ACTION" in
    dump)
        dump_database "$DB_NAME" "$FILE"
        ;;
    load)
        load_database "$DB_NAME" "$FILE" "$NEW_OWNER"
        ;;
    *)
        echo "Invalid action: $ACTION"
        print_usage
        exit 1
        ;;
esac