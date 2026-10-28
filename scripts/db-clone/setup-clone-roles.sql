-- One-time setup of the restricted roles used by clone-prod-to-staging.sh.
--
-- Run this as `postgres` from an admin machine, NOT from the bastion. Afterwards only the
-- three roles created here should have credentials on the bastion:
--
--   psql -h "$PGHOST" -U postgres -d postgres \
--     -v keycloak_reader_password='...' \
--     -v loculus_reader_password='...' \
--     -v loader_password='...' \
--     -f setup-clone-roles.sql
--
-- prod_keycloak_clone_reader  can read the prod Keycloak DB except realm keys and secrets (row-level security)
-- prod_loculus_clone_reader   can read the prod Loculus DB
-- staging_clone_loader        can drop, recreate and fill the staging DBs, and nothing on prod

\set ON_ERROR_STOP on

CREATE ROLE prod_keycloak_clone_reader LOGIN PASSWORD :'keycloak_reader_password';
CREATE ROLE prod_loculus_clone_reader LOGIN PASSWORD :'loculus_reader_password';
CREATE ROLE staging_clone_loader LOGIN CREATEDB PASSWORD :'loader_password';

-- Membership in the staging owner roles lets the loader drop the staging DBs (incl. terminating
-- connections) and load the dumps as their owners. Never grant it any prod role.
GRANT staging_keycloak_user, staging_loculus_user TO staging_clone_loader;

-- Temporarily act as the prod owners: granting on, and enabling RLS on, tables requires ownership
GRANT prod_keycloak_user, prod_loculus_user TO postgres;

GRANT CONNECT ON DATABASE pathoplexus_prod_keycloak TO prod_keycloak_clone_reader;
GRANT CONNECT ON DATABASE pathoplexus_prod_loculus TO prod_loculus_clone_reader;

-- Prod Keycloak
\connect pathoplexus_prod_keycloak
SET ROLE prod_keycloak_user;

GRANT USAGE ON SCHEMA public TO prod_keycloak_clone_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO prod_keycloak_clone_reader;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO prod_keycloak_clone_reader;
-- Keep tables added by future Keycloak upgrades dumpable
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO prod_keycloak_clone_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES TO prod_keycloak_clone_reader;

-- Keycloak connects as the table owner, which bypasses RLS, so it is not affected by these policies.
-- Hide the realm key providers (RSA private keys, HMAC and AES secrets)
ALTER TABLE component ENABLE ROW LEVEL SECURITY;
CREATE POLICY clone_no_keys ON component FOR SELECT TO prod_keycloak_clone_reader
    USING (provider_type <> 'org.keycloak.keys.KeyProvider');

-- The subquery is itself filtered by the policy on component, so config of key providers is hidden too
ALTER TABLE component_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY clone_no_keys ON component_config FOR SELECT TO prod_keycloak_clone_reader
    USING (component_id IN (SELECT id FROM component));

-- The ORCID client secret and SMTP password are currently cloned to staging.
-- Uncomment to hide them as well (and add clientSecret to assert_no_keycloak_secrets).

-- Hide the ORCID client secret
-- ALTER TABLE identity_provider_config ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY clone_no_secrets ON identity_provider_config FOR SELECT TO prod_keycloak_clone_reader
--     USING (name <> 'clientSecret');

-- Hide the SMTP password
-- ALTER TABLE realm_smtp_config ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY clone_no_secrets ON realm_smtp_config FOR SELECT TO prod_keycloak_clone_reader
--     USING (name <> 'password');

RESET ROLE;

-- Prod Loculus
\connect pathoplexus_prod_loculus
SET ROLE prod_loculus_user;

GRANT USAGE ON SCHEMA public TO prod_loculus_clone_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO prod_loculus_clone_reader;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO prod_loculus_clone_reader;
-- Keep tables added by future Flyway migrations dumpable
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO prod_loculus_clone_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES TO prod_loculus_clone_reader;

GRANT USAGE ON SCHEMA ena_deposition_schema TO prod_loculus_clone_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA ena_deposition_schema TO prod_loculus_clone_reader;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA ena_deposition_schema TO prod_loculus_clone_reader;
-- Keep tables added by future Flyway migrations dumpable
ALTER DEFAULT PRIVILEGES IN SCHEMA ena_deposition_schema GRANT SELECT ON TABLES TO prod_loculus_clone_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA ena_deposition_schema GRANT SELECT ON SEQUENCES TO prod_loculus_clone_reader;

RESET ROLE;

\connect postgres
REVOKE prod_keycloak_user, prod_loculus_user FROM postgres;
