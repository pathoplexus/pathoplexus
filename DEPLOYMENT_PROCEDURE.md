# Deployment procedure

This document is only intended for Pathoplexus sysadmins.

## To develop new versions of Pathoplexus

Work in a development branch. You can choose what version of Loculus to target by adjusting the `loculusVersion` in  `pathoplexus_app/values.yaml`. Use a Loculus commit SHA.

## Merging to main

Open a PR to merge into main. The current main is visible at http://preview-main.pathoplexus.org.

## Staging a new version

Once you have new release candidate you can point the staging server at it by changing the head_sha in the `staging` folder in https://github.com/pathoplexus/loculus_deployments/tree/main/deploy .

The changes will be reflected at http://demo.pathoplexus.org . You should also check the health of the application in ArgoCD.

## Deploying a new version to production

Once you have new release candidate you can point the staging server at it by changing the head_sha in the `production` folder in https://github.com/pathoplexus/loculus_deployments/tree/main/deploy .

The changes will be reflected at http://production.pathoplexus.org . You should check ArgoCD to monitor the health of the application.

# What determines the configuration of an instance?

All configuration is in this repository, and all is versioned such that only the version pointed to in the `loculus_deployments` repo has an effect.

- Customisations to the website image, made in the monorepo folder, will be automatically used in deployments.
- The Loculus version to target is set in `pathoplexus_app/values.yaml`
- The core configuration of Pathoplexus is set in `loculus_values/values.yaml`.
- Additional configuration that will only be used on special deployment is set in `loculus_values/environment_specific_values/`.
