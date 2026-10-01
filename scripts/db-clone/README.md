# Script to clone production database to staging database

This script is used to make the staging database tables a clone of the production database tables. A few modifications are made to the dumps before loading so that the staging database works (e.g. users are renamed, ownership changed).

The script roughly follows these steps:

1. Dump production Loculus database, then immediately start sed modifications in the background.
2. Dump production Keycloak database, then start sed modifications in the background.
3. Start S3 bucket sync in the background (`s5cmd`).
4. Load modified Keycloak dump into staging.
5. Load modified Loculus dump into staging.
6. Wait for background S3 bucket sync to complete.

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

You will need to configure the `db-clone` AWS IAM user profile on the bastion, this can be done with:

```
aws configure --profile db-clone
```

The user profile needs write access to the staging s3 bucket and ONLY read access to the production s3 bucket (for security ensure the user does not have write access to the production s3 bucket).

## S3 Synchronization (`s5cmd`)
 
The clone script uses [`s5cmd`](https://github.com/peak/s5cmd) for high-speed parallel S3 synchronization. If `s5cmd` is not found on the system, the script will automatically invoke `./install-s5cmd.sh` to download the standalone static binary (into `/usr/local/bin` if permitted, otherwise `~/.local/bin`).
 
To install it beforehand:
 
```sh
./install-s5cmd.sh
```

Run the script as follows:

```sh
./clone-prod-to-staging.sh
kubectl rollout restart deployment/loculus-backend -n staging
```

It can happen that part of the clone fails. You can check the logs if things don't work as expected.
