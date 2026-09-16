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

## Passwords

Passwords for the following users need to be set in the environment variables:

- `prod_loculus_user`
- `staging_loculus_user`
- `prod_keycloak_user`
- `staging_keycloak_user`
- `postgres`

Run the script as follows:

```sh
./clone-prod-to-staging.sh
```

It can happen that part of the clone fails. You can check the logs if things don't work as expected.