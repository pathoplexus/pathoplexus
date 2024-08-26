# pathoplexus

This repo builds the specific images (just website at least for now) for anything in Loculus that needs a custom image for Pathoplexus.

This repository is an **overlay** over the [loculus monorepo](https://github.com/loculus-project/loculus). You can imagine that the monorepo folder within this repository is copied on-top of the loculus monorepo. Then we build the website image. This means this repository only contains pathoplexus-specific files.

## Adding new pages

Add new pages by entering the [monorepo/website/src/pages](./monorepo/website/src/pages) directory, and copying a directory for an existing page, then modifying it appropriately.

## How to develop locally

If you want to work with a dev preview, you need to clone the repo, then run

```bash
./sync.sh -l
```

to copy the monorepo into this repository, with .gitignore ignoring its contents.

You can then cd to the `monorepo/website` directory and follow the [Loculus website development instructions](https://github.com/loculus-project/loculus/blob/main/website/README.md).

### Scope

By default, changes to most existing Loculus files will be ignored.
To bring a file into scope, remove it from `monorepo/.gitignore`.

### Clean up

To clean up so you can see your real files run `python delete_ignored.py`. (Don't do this before you have updated `.gitignore` or the files will be deleted.

