# Script to clone production database to staging database

This script is used to make the staging database tables a clone of the production database tables. A few modifications are made to the dumps before loading so that the staging database works (e.g. users are renamed, ownership changed).

The script roughly follows these steps:

1. Dump the production database tables.
2. Modify the dump to rename users and change ownership.
3. Load the modified dump into the staging database tables.

The script needs to be run on a server with access to the database (e.g. a bastion host on AWS).

## Connection settings (`PGHOST`)

The database host is **not** stored in the repo. Before running the scripts you
must provide `PGHOST` on the bastion/server, in one of two ways:

- Create `scripts/db-clone/env.sh` by copying the template and filling in the
  real host. This file is gitignored and stays on the server only:

  ```sh
  cp env.sh.example env.sh
  # then edit env.sh and set PGHOST to the RDS cluster endpoint
  ```

## Database roles and passwords

The script only uses restricted roles, so that the bastion holds no credentials that can read the
prod Keycloak realm keys (which would allow forging prod login tokens) or write to prod:

- `prod_keycloak_clone_reader`: reads the prod Keycloak DB. Row-level security hides the realm keys.
- `prod_loculus_clone_reader`: reads the prod Loculus DB.
- `staging_clone_loader`: drops, recreates and loads the staging DBs. It is a member of
  `staging_keycloak_user` and `staging_loculus_user` and has no access to prod.

They are created once by an admin with [`setup-clone-roles.sql`](setup-clone-roles.sql) (see the
header of that file for how to run it). Run it from an admin machine, not from the bastion.

Passwords for these three roles need to be available to `psql`/`pg_dump` on the bastion (e.g. in
`~/.pgpass`). Do **not** store passwords for `postgres`, `prod_keycloak_user` or `prod_loculus_user`
on the bastion.

## Staging Keycloak realm keys

The prod realm keys are never cloned. Instead, every clone adds the same fixed staging signing key,
so staging access tokens issued before a clone stay valid until they expire. Refresh tokens do not
survive a clone: the staging sessions are replaced with the ones from prod and the refresh tokens
are signed with a realm key that Keycloak regenerates. So users logged in to staging are logged out
once their access token expires and have to log in again. The key lives in `staging-keycloak-key.pem`
on the bastion (gitignored). Create it once before the first clone:

```sh
umask 077
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out staging-keycloak-key.pem
openssl req -x509 -key staging-keycloak-key.pem -days 36500 -subj "/CN=loculus" >> staging-keycloak-key.pem
```

Keycloak generates its other (non-signing) realm keys itself on startup.

After a clone, restart staging Keycloak, or clear its realm, user and keys caches (admin console:
Realm settings → Action), so it doesn't serve stale cached data.

You will need to configure the `db-clone` AWS IAM user profile on the bastion, this can be done with:

```
aws configure --profile db-clone
```

The user profile needs write access to the staging s3 bucket and ONLY read access to the production s3 bucket (for security ensure the user does not have write access to the production s3 bucket).

Run the script as follows:

```sh
./clone-prod-to-staging.sh
```

It can happen that part of the clone fails. You can check the logs if things don't work as expected.