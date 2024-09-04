# Deployment procedure

This document is only intended for Pathoplexus sysadmins.

## To develop new versions of Pathoplexus

Work in a development branch. You can choose what version of Loculus to target by adjusting the `loculusVersion` in  `pathoplexus_app/values.yaml` (use a Loculus commit SHA). Adding the `preview` label will create a preview.

## To simply bump the version of Loculus used in Pathoplexus `main`
We have a GitHub workflow for this. Go to the "Actions" tab -> Open the "Create PR to bump main pathoplexus.." action -> Open the "Run workflow" dropdown -> Click on the "Run workflow" button. This will create a PR, which someone else will need to approve. The PR will contain a changelist for Loculus, which you should carefully review for breaking changes.

## Staging the latest main

Once you have new release candidate on main, you can point the staging server at it by changing the head_sha in the `staging` folder in https://github.com/pathoplexus/loculus_deployments/tree/main/deploy .

The easiest way to do this is with the GitHub action in the `loculus_deployments` repository: https://github.com/pathoplexus/loculus_deployments/actions

A little after the PR is merged, changes will be reflected at http://demo.pathoplexus.org . You should also check the health of the application in ArgoCD.

## Promoting a new version from staging to production

Once you have new release candidate you can point the production server at it by changing the head_sha in the `production` folder in https://github.com/pathoplexus/loculus_deployments/tree/main/deploy .

The appropriate way to do this is with the GitHub action in the `loculus_deployments` repository which will copy the SHA from staging to production, creating a PR: https://github.com/pathoplexus/loculus_deployments/actions

After merging, the changes will be reflected at http://production.pathoplexus.org . You should check ArgoCD to monitor the health of the application.

# What determines the configuration of an instance?

All configuration is in this repository, and all is versioned such that only the version pointed to in the `loculus_deployments` repo has an effect.

- Customisations to the website image, made in the monorepo folder, will be automatically used in deployments.
- The Loculus version to target is set in `pathoplexus_app/values.yaml`
- The core configuration of Pathoplexus is set in `loculus_values/values.yaml`.
- Additional configuration that will only be used on special deployment is set in `loculus_values/environment_specific_values/`.
