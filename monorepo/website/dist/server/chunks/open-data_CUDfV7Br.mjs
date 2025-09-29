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
  "title": "Open Data Terms of Use",
  "menuTitle": "Open Data Terms of Use (Summary)",
  "order": 2
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
    "slug": "ethical-guidelines",
    "text": "Ethical Guidelines"
  }, {
    "depth": 1,
    "slug": "data-acknowledgement",
    "text": "Data Acknowledgement"
  }, {
    "depth": 1,
    "slug": "third-party-data-sharing",
    "text": "Third Party Data Sharing"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
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
        children: ["This summary is provided as a general overview of the Open Data Terms of Use, but only the full terms are used to interpret and arbitrate. For the full terms, and guidance, see the\n", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), " document."]
      })
    }), "\n", createVNode(_components.h1, {
      id: "summary",
      children: "Summary"
    }), "\n", createVNode(_components.p, {
      children: "Open Data submitted to Pathoplexus is available for use without restrictions, subject to ethical guidelines and proper attribution. In the following, we state the main Data Use Terms for Open Data as a summary."
    }), "\n", createVNode(_components.h1, {
      id: "key-points",
      children: "Key Points"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Availability"
        }), ": Open Data is freely accessible to all users."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Usage"
        }), ": Open Data can be used for any purpose, including unpublished work, publications, and preprints."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Onward Submission"
        }), ": Open Data is immediately submitted to International Nucleotide Sequence Database Collaboration (INSDC) on behalf of the original submitters."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Attribution"
        }), ": It is highly recommended to acknowledge the data generators."]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "ethical-guidelines",
      children: "Ethical Guidelines"
    }), "\n", createVNode(_components.p, {
      children: "Even though Open Data does not have specific formal restrictions, users are expected to:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Use the data ethically and in accordance with scientific etiquette."
      }), "\n", createVNode(_components.li, {
        children: "Acknowledge data generators when appropriate."
      }), "\n", createVNode(_components.li, {
        children: "Consider seeking collaborations in appropriate circumstances."
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "data-acknowledgement",
      children: "Data Acknowledgement"
    }), "\n", createVNode(_components.p, {
      children: "For publications and preprints:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "It is strongly encouraged to create a SeqSet of Pathoplexus accessions."
      }), "\n", createVNode(_components.li, {
        children: "Cite the DOI of the SeqSet in the References section of your manuscript."
      }), "\n", createVNode(_components.li, {
        children: "Consider additionally listing INSDC accessions for easy tracing on both platforms."
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "third-party-data-sharing",
      children: "Third Party Data Sharing"
    }), "\n", createVNode(_components.p, {
      children: "When sharing Open Data onward from Pathoplexus:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Clearly communicate the Data Use Terms."
      }), "\n", createVNode(_components.li, {
        children: "If displayed on a website or database, include a direct link to the original sequence page on Pathoplexus or an INSDC database."
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

const url = "/about/terms-of-use/open-data";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/open-data.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/open-data.mdx";
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
