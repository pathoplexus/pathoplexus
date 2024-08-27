# Pathoplexus

Pathoplexus is a specialised genomic database for viruses of public health importance. By combining modern open-source software with transparent governance structures, Pathoplexus fills a niche within the existing genomic sequencing database landscape, aiming to meet requests from both data submitters and users and striving to improve equity. 

Pathoplexus aims to offer the best features of existing platforms, and to supplement these with new approaches that optimise data utility and preserve data autonomy. In particular, data submitters can easily share their data via Pathoplexus and receive credit through citable Pathoplexus datasets. Submitters can choose to have their data immediately deposited in the International Nucleotide Sequence Database Collaboration (INSDC) databases, without additional effort. Alternatively, submitters can choose to submit data with a time-limited restriction, during which use in publications is not permitted without involvement of the submitters. Only after this restriction ends is the data released to the INSDC. However, all users can freely access, explore, and download all data hosted in Pathoplexus. Data querying can be done both in an interactive and programmable fashion, the latter enabling the embedding of Pathoplexus into other tools. 

For the full Pathoplexus experience, head over to [Pathoplexus.org](https://pathoplexus.org/) to [browse our database](https://pathoplexus.org/organism-selector/search), [submit your own samples](https://pathoplexus.org/docs/how-to/upload_sequences), or read more about our [aims and governance](https://pathoplexus.org/about).

### Our software
Pathoplexus is powered by a new open-source software package, [Loculus](https://loculus.org). Loculus is a general purpose tool for running virus sequence databases: anyone can use it to launch their own database for their pathogens of interest. These might include internal laboratory databases, or databases for collaborations or consortia. (Check out their [GitHub](https://github.com/loculus-project/loculus))
<br>
<br>
<br>
<br>
<br>

## The Technical Bit

### How we relate to the Loculus code
This repo builds the specific images (just website at least for now) for anything in Loculus that needs a custom image for Pathoplexus.

This repository is an **overlay** over the [loculus monorepo](https://github.com/loculus-project/loculus). One can imagine this as the monorepo folder within this repository being copied on-top of the loculus monorepo. Then build the website image is built. This means this repository only contains Pathoplexus-specific files.

### How to develop & run locally

#### Adding new pages

Add new pages by entering the [monorepo/website/src/pages](./monorepo/website/src/pages) directory, and copying a directory for an existing page, then modifying it appropriately.

#### How to develop locally

If you want to work with a dev preview, you need to clone the repo, then run

```bash
./sync.sh -l
```

to copy the monorepo into this repository, with .gitignore ignoring its contents.

You can then cd to the `monorepo/website` directory and follow the [Loculus website development instructions](https://github.com/loculus-project/loculus/blob/main/website/README.md).


#### Scope

By default, changes to most existing Loculus files will be ignored.
To bring a file into scope, remove it from `monorepo/.gitignore`.

#### Clean up

To clean up so you can see your real files run `python delete_ignored.py`. (Don't do this before you have updated `.gitignore` or the files will be deleted.)

