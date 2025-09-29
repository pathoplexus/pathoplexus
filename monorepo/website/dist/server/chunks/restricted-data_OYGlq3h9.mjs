/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import { $ as $$InfoBox } from './InfoBox_IxH1oVvV.mjs';
import 'clsx';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$AboutLayout, {
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
  "layout": "../../../layouts/AboutLayout.astro",
  "title": "Restricted Data Terms of Use",
  "menuTitle": "Restricted Data Terms of Use (Summary)",
  "order": 3
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "summary",
    "text": "Summary"
  }, {
    "depth": 1,
    "slug": "key-points",
    "text": "Key Points"
  }, {
    "depth": 1,
    "slug": "usage-requirements",
    "text": "Usage Requirements"
  }, {
    "depth": 2,
    "slug": "unpublished-and-un-preprinted-work",
    "text": "Unpublished and Un-Preprinted Work"
  }, {
    "depth": 2,
    "slug": "publications-and-preprints",
    "text": "Publications and Preprints"
  }, {
    "depth": 3,
    "slug": "focal-set-use",
    "text": "Focal Set Use"
  }, {
    "depth": 3,
    "slug": "background-set-use",
    "text": "Background Set Use"
  }, {
    "depth": 1,
    "slug": "third-party-data-sharing",
    "text": "Third Party Data Sharing"
  }, {
    "depth": 1,
    "slug": "using-all-data",
    "text": "Using All Data"
  }, {
    "depth": 1,
    "slug": "ethical-considerations",
    "text": "Ethical Considerations"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode($$InfoBox, {
      children: createVNode(_components.p, {
        children: ["This summary is provided as a general guideline to the Restricted Data Terms of Use, but only the full terms are used to interpret, enforce, and arbitrate. For the full terms, and guidance, see the\n", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), " document."]
      })
    }), "\n", createVNode(_components.h1, {
      id: "summary",
      children: "Summary"
    }), "\n", createVNode(_components.p, {
      children: "Restricted Data on Pathoplexus is subject to specific use conditions for a limited time period, up to one year after submission. Afterwards the data automatically becomes Open Data. In the following, we state the main Data Use terms for Restricted Data as a summary."
    }), "\n", createVNode(_components.h1, {
      id: "key-points",
      children: "Key Points"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Availability & Usage"
        }), ": Restricted Data is freely accessible to all users, but with restrictions on how it can be used."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Duration"
        }), ": Data can be restricted for up to 1 year after submission, as set by the submitter."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Onward Submission"
        }), ": Restricted data is made available on INSDC after the restricted period ends."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Attribution"
        }), ": Data ", createVNode(_components.strong, {
          children: "must"
        }), " be attributed according to the requirements detailed below."]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "usage-requirements",
      children: "Usage Requirements"
    }), "\n", createVNode(_components.h2, {
      id: "unpublished-and-un-preprinted-work",
      children: "Unpublished and Un-Preprinted Work"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Restricted data can be used for unpublished work (e.g., graphical representations, blog posts, reports)."
      }), "\n", createVNode(_components.li, {
        children: ["Data submitters ", createVNode(_components.strong, {
          children: "must"
        }), " be acknowledged by providing accession numbers or using a SeqSet when using restricted data."]
      }), "\n", createVNode(_components.li, {
        children: ["Work ", createVNode(_components.strong, {
          children: "must"
        }), " link back to Pathoplexus for original data and submitters."]
      }), "\n", createVNode(_components.li, {
        children: "The institution and leading author(s) need to be credited if all sequences are from one institution."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "publications-and-preprints",
      children: "Publications and Preprints"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Use of restricted data often requires explicit permission from the Submitting Group."
      }), "\n", createVNode(_components.li, {
        children: ["Users ", createVNode(_components.strong, {
          children: "must"
        }), " create a SeqSet, generate a DOI, and cite it in the manuscript."]
      }), "\n", createVNode(_components.li, {
        children: "Users need to specify the division of sequences into “Focal Set” and “Background Set” (see below, and full terms for details)."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "focal-set-use",
      children: "Focal Set Use"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Sequences are part of the focal set if they are key to the analysis being performed: without these sequences the analysis would not be possible"
      }), "\n", createVNode(_components.li, {
        children: ["Usage requires either:\n", createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "Including one or more Submitters as an author on the manuscript, or"
          }), "\n", createVNode(_components.li, {
            children: "Obtaining explicit written permission (“Authorship Waiver”) from the Submitting Group."
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "background-set-use",
      children: "Background Set Use"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Sequences are part of the background set if they could be replaced with other sequences with the same analysis outcome"
      }), "\n", createVNode(_components.li, {
        children: "The Background set may be used without authorship or waiver, but careful consideration is required to determine if the sequences are background sequences."
      }), "\n", createVNode(_components.li, {
        children: ["Users ", createVNode(_components.strong, {
          children: "must"
        }), " create a SeqSet, generate a DOI, and cite it in the manuscript."]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "third-party-data-sharing",
      children: "Third Party Data Sharing"
    }), "\n", createVNode(_components.p, {
      children: "When sharing Restricted Data from Pathoplexus onward:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Clearly communicate the Data Use Terms."
      }), "\n", createVNode(_components.li, {
        children: "Keep the Data Use Terms columns intact in the metadata."
      }), "\n", createVNode(_components.li, {
        children: "If displayed publicly, include a direct link to the original sequence page on Pathoplexus."
      }), "\n", createVNode(_components.li, {
        children: "If re-sharing Pathoplexus data as part of a database with many users, access restrictions may not be imposed"
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "using-all-data",
      children: "Using All Data"
    }), "\n", createVNode(_components.p, {
      children: "To study general viral properties or patterns, such as mutation frequencies, across broad regions or globally, it is sometimes permissible to use all sequences for a pathogen as a “Background Set”."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The dataset must contain contributions from many submitting groups"
      }), "\n", createVNode(_components.li, {
        children: ["Users ", createVNode(_components.strong, {
          children: "must"
        }), " create a SeqSet containing all the data, generate a DOI, and cite it in the manuscript."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "If only a few submitters have generated sequences for a pathogen, it’s unethical to use all sequences from that pathogen without contacting and involving those submitters."
    }), "\n", createVNode(_components.h1, {
      id: "ethical-considerations",
      children: "Ethical Considerations"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Avoid “scooping” others’ work."
      }), "\n", createVNode(_components.li, {
        children: "Consider involving authors from regions where data originates."
      }), "\n", createVNode(_components.li, {
        children: "Ensure fair representation and genuine collaboration efforts."
      }), "\n"]
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

const url = "/about/terms-of-use/restricted-data";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/restricted-data.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/restricted-data.mdx";
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
