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
  "title": "INSDC Submission"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "ena-submission",
    "text": "ENA Submission"
  }, {
    "depth": 2,
    "slug": "citing-your-sequences",
    "text": "Citing your Sequences"
  }, {
    "depth": 2,
    "slug": "mapping-of-pathoplexus-metadata-fields-to-ena-metadata-fields",
    "text": "Mapping of Pathoplexus Metadata Fields to ENA Metadata Fields"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    p: "p",
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
      children: [createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms#41-open-data",
        children: "Open"
      }), " sequences will be made publicly available through the ", createVNode(_components.a, {
        href: "https://www.insdc.org/",
        children: "INSDC databases (ENA, DDBJ, NCBI)"
      }), ". To accomplish this, we will upload sequences on your behalf to ", createVNode(_components.a, {
        href: "https://www.ebi.ac.uk/ena/browser/about",
        children: "ENA"
      }), ". After successful submission to ENA (this can take up to 48hours) we will return the accessions of your sequences in ENA."]
    }), "\n", createVNode(_components.p, {
      children: ["When submitting to ENA we use the ", createVNode(_components.code, {
        children: "institution"
      }), " on your group page as your ", createVNode(_components.code, {
        children: "center name"
      }), ", ", createVNode(_components.a, {
        href: "https://ena-docs.readthedocs.io/en/latest/submit/general-guide/programmatic.html#identifying-submitters",
        children: "center name"
      }), " is used by ENA as an identifier to facilitate the recognition and attribution of your sequences within the INSDC."]
    }), "\n", createVNode(_components.p, {
      children: ["We urge users to not upload their sequences independently to INSDC to prevent data duplication. However, if at any point in time Pathoplexus no longer exists and you need to modify your data you can use the ", createVNode(_components.code, {
        children: "center name"
      }), " to identify your group and request sequence revision."]
    }), "\n", createVNode(_components.h2, {
      id: "ena-submission",
      children: "ENA Submission"
    }), "\n", createVNode(_components.p, {
      children: ["In order to submit your sequences to ENA we need to create a Project, Sample and Assembly on your behalf, see ", createVNode(_components.a, {
        href: "https://ena-docs.readthedocs.io/en/latest/submit/general-guide/metadata.html",
        children: "ENA’s metadata model"
      }), " for more information."]
    }), "\n", createVNode(_components.p, {
      children: "In ENA, Projects contain general information on your group and the organism being sequenced. We create one Project per each group and organism. In ENA Samples contain metadata information and Assemblies contain the actual sequences. We create one sample and one assembly object per sequence."
    }), "\n", createVNode(_components.h2, {
      id: "citing-your-sequences",
      children: "Citing your Sequences"
    }), "\n", createVNode(_components.p, {
      children: ["If you would like to cite your sequences in a publication you can use your Bioproject accession (this will start with ", createVNode(_components.code, {
        children: "PRJ"
      }), "), Biosample accession (this will start with ", createVNode(_components.code, {
        children: "SAM"
      }), ") and Genome Assembly accession (starting with ", createVNode(_components.code, {
        children: "GCA"
      }), ")."]
    }), "\n", createVNode(_components.h2, {
      id: "mapping-of-pathoplexus-metadata-fields-to-ena-metadata-fields",
      children: "Mapping of Pathoplexus Metadata Fields to ENA Metadata Fields"
    }), "\n", createVNode(_components.p, {
      children: ["To facilitate data standardization we map our metadata to ENA’s ", createVNode(_components.a, {
        href: "https://www.ebi.ac.uk/ena/browser/view/ERC000033",
        children: "ENA virus pathogen reporting standard checklist"
      }), ", using PHA4GE’s official mapping."]
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "ENA Sample-related Fields"
          }), createVNode(_components.th, {
            children: "Loculus Fields"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "subject exposure"
          }), createVNode(_components.td, {
            children: "exposureEvent"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "type exposure"
          }), createVNode(_components.td, {
            children: "exposureEvent"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "hospitalisation"
          }), createVNode(_components.td, {
            children: "hostHealthState==Hospital"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "illness symptoms"
          }), createVNode(_components.td, {
            children: "signsAndSymptoms"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "collection date"
          }), createVNode(_components.td, {
            children: "sampleCollectionDate"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "geographic location (country and/or sea)"
          }), createVNode(_components.td, {
            children: "geoLocCountry"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "geographic location (region and locality)"
          }), createVNode(_components.td, {
            children: "geoLocAdmin1"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "sample capture status"
          }), createVNode(_components.td, {
            children: "purposeOfSampling"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host disease outcome"
          }), createVNode(_components.td, {
            children: "hostHealthOutcome"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host common name"
          }), createVNode(_components.td, {
            children: "hostNameCommon"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host age"
          }), createVNode(_components.td, {
            children: "hostAge"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host health state"
          }), createVNode(_components.td, {
            children: "hostHealthState"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host sex"
          }), createVNode(_components.td, {
            children: "hostGender"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "host scientific name"
          }), createVNode(_components.td, {
            children: "hostNameScientific"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "isolate"
          }), createVNode(_components.td, {
            children: "specimenCollectorSampleId"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "collecting institution"
          }), createVNode(_components.td, {
            children: "sequencedByOrganization, authorAffiliations"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "receipt date"
          }), createVNode(_components.td, {
            children: "received date"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "isolation source host-associated"
          }), createVNode(_components.td, {
            children: "anatomical material, anatomical part, body product"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "isolation source non-host-associated"
          }), createVNode(_components.td, {
            children: "environmental site, environmental material"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "authors"
          }), createVNode(_components.td, {
            children: "authors"
          })]
        })]
      })]
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "ENA Assembly-related Fields"
          }), createVNode(_components.th, {
            children: "Loculus Fields"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "ASSEMBLY_TYPE"
          }), createVNode(_components.td, {
            children: "default=ISOLATE"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "PROGRAM"
          }), createVNode(_components.td, {
            children: "sequencingInstrument, default=Unknown"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "PLATFORM"
          }), createVNode(_components.td, {
            children: "sequencingProtocol, default=Unknown"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "COVERAGE"
          }), createVNode(_components.td, {
            children: "depthOfCoverage, default=1"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: "MOLECULETYPE"
          }), createVNode(_components.td, {
            children: "NaN"
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

const url = "/docs/concepts/insdc-submission";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/insdc-submission.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/insdc-submission.mdx";
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
