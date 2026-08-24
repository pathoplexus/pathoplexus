# Pathoplexus_app

This directory is a tiny Helm chart used to deploy instances of Pathoplexus. It creates a Kubernetes resource for an ArgoCD `Application`. That application deploys the (large) [Loculus Helm chart](https://github.com/loculus-project/loculus/tree/main/kubernetes). The version of Loculus that should be used is defined by the `values.yaml` in this directory by setting the commit SHA.

The end result is that each version (commit) of this _pathoplexus_ repository contains a reference to a particular version of Loculus in this `values.yaml`, which is used:
  - to extend the Loculus website with Pathoplexus-specific pages (these are stored in the `monorepo` directory)
  - to specify the version of the Loculus Helm chart to deploy
  - to specify what versions of the Loculus images to deploy


Each commit also contains (in the parent directory to this one):

- the `loculus_values` directory in the parent directory which specifies the specific configuration of that loculus chart
- the `monorepo` directory which specifies what Pathoplexus-specific additions to make to the website

This chart contains its own hardcoded `loculusVersion` value. It also expects to be provided with the following values (which is handled by ArgoCD):
- `pathoplexusVersion`: this should be the same as the `pathoplexus` commit SHA of this actual version of the `pathoplexus_app` Helm chart
- `hostname` this is the host for the loculus deployment
- `special_environment`: this is an optional specification that the deployment should use special deployment files which should have been placed in a file named `loculus_values/environment_specific_values/[special_environment].yaml`
