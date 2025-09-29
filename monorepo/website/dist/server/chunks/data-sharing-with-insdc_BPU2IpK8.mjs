/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import 'clsx';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$DocLayout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    'server:root': true,
    children
  });
};
const frontmatter = {
  "layout": "../../../layouts/DocLayout.astro",
  "title": "Data Sharing with INSDC"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "mapping-of-ncbi-virus-metadata-fields-to-loculus-metadata-fields",
    "text": "Mapping of NCBI Virus Metadata Fields to Loculus Metadata Fields"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    strong: "strong",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["As part of our effort to enable global scientific collaboration and facilitate international public health response we share ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms#41-open-data",
        children: "open"
      }), " sequences with the ", createVNode(_components.a, {
        href: "https://www.insdc.org/",
        children: "INSDC databases (ENA, DDBJ, NCBI)"
      }), " and ingest public sequences from the INSDC. Read more about how your sequences are shared ", createVNode(_components.a, {
        href: "/docs/concepts/insdc-submission",
        children: "here"
      }), " and ", createVNode(_components.a, {
        href: "/about/governance/data-submission#2-data-submission-and-access",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "This means that when you browse for a pathogen on Pathoplexus you should also see all other publicly available sequences of that pathogen (that satisfy our sequence alignment requirements)."
    }), "\n", createVNode(_components.p, {
      children: ["We download sequences from the INSDC using the ", createVNode(_components.a, {
        href: "https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/data-packages/virus-genome/",
        children: "NCBI Datasets Virus Data Package"
      }), ". We then map INSDC metadata fields to Loculus metadata fields before uploading the sequences to Loculus. In order to give users access to as much data as possible we do not enforce required metadata fields on data ingested from the INSDC, however we do enforce that sequences alignment is of an acceptable quality. A quality score is based on the standard for each pathogen, defined in the ", createVNode(_components.a, {
        href: "https://docs.nextstrain.org/projects/nextclade/en/stable/user/datasets.html",
        children: "Nextclade datasets"
      }), " that we use."]
    }), "\n", createVNode(_components.p, {
      children: "Additionally, for multi-segmented organisms the INSDC often does not offer data where segments have been grouped by isolate. To retain as much information as possible from the samples, we additionally group samples based on their isolate and other metadata fields. By default all metadata fields must be the same across segments for us to group them as one sample, with the exception of segment-specific metadata fields. These fields are either alignment-related (length, totalSnps, totalInsertedNucs, totalDeletedNucs, totalUnknownNucs, totalAmbiguousNucs, totalFrameShifts, frameShifts, completeness) or related to the INSDC-accession for that specific segment (ncbiUpdateDate, insdcAccessionBase, insdcAccessionFull, insdcVersion)."
    }), "\n", createVNode(_components.h2, {
      id: "mapping-of-ncbi-virus-metadata-fields-to-loculus-metadata-fields",
      children: "Mapping of NCBI Virus Metadata Fields to Loculus Metadata Fields"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: createVNode(_components.strong, {
              children: "NCBI Virus Field Name"
            })
          }), createVNode(_components.th, {
            children: createVNode(_components.strong, {
              children: "Loculus Field name"
            })
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Accession"
            })
          }), createVNode(_components.td, {
            children: "insdcAccessionFull (also produces insdcAccessionBase, insdcVersion)"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "BioProjects"
            })
          }), createVNode(_components.td, {
            children: "bioprojectAccession"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "BioSample accession"
            })
          }), createVNode(_components.td, {
            children: "biosampleAccession"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Geographic Location"
            })
          }), createVNode(_components.td, {
            children: "geoLocCountry, geoLocAdmin1"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Geographic Region"
            })
          }), createVNode(_components.td, {
            children: "geoLocAdmin2"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Host Common Name"
            })
          }), createVNode(_components.td, {
            children: "hostNameCommon"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Host Infraspecific Names Sex"
            })
          }), createVNode(_components.td, {
            children: "hostGender"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Host Name"
            })
          }), createVNode(_components.td, {
            children: "hostNameScientific"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Host Taxonomic ID"
            })
          }), createVNode(_components.td, {
            children: "hostTaxonId"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Is Lab Host"
            })
          }), createVNode(_components.td, {
            children: "isLabHost"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Isolate Collection date"
            })
          }), createVNode(_components.td, {
            children: "sampleCollectionDate"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Isolate Lineage"
            })
          }), createVNode(_components.td, {
            children: "specimenCollectorSampleId"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Purpose of Sampling"
            })
          }), createVNode(_components.td, {
            children: "purposeOfSampling"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Release date"
            })
          }), createVNode(_components.td, {
            children: "ncbiReleaseDate"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "SRA Accessions"
            })
          }), createVNode(_components.td, {
            children: "insdcRawReadsAccession"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Source database"
            })
          }), createVNode(_components.td, {
            children: "ncbiSourceDb"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Submitter Affiliation"
            })
          }), createVNode(_components.td, {
            children: "authorAffiliations"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Submitter Names"
            })
          }), createVNode(_components.td, {
            children: "authors"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Update date"
            })
          }), createVNode(_components.td, {
            children: "ncbiUpdateDate"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Virus Name"
            })
          }), createVNode(_components.td, {
            children: "ncbiVirusName"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.strong, {
              children: "Virus Taxonomic ID"
            })
          }), createVNode(_components.td, {
            children: "ncbiVirusTaxId"
          })]
        })]
      })]
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

const url = "/docs/concepts/data-sharing-with-insdc";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/data-sharing-with-insdc.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/data-sharing-with-insdc.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
