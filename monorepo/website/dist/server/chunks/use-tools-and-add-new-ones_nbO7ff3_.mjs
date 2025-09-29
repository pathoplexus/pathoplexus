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
  "title": "Use external tools and suggest new ones",
  "order": 105
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "using-the-tools-menu",
    "text": "Using the Tools menu"
  }, {
    "depth": 2,
    "slug": "configuring-a-new-tool-to-be-added-to-pathoplexus",
    "text": "Configuring a new tool to be added to Pathoplexus"
  }, {
    "depth": 3,
    "slug": "requirements",
    "text": "Requirements"
  }, {
    "depth": 3,
    "slug": "adding-your-tool-to-pathoplexus",
    "text": "Adding your tool to Pathoplexus"
  }, {
    "depth": 3,
    "slug": "url-template-placeholders",
    "text": "URL template placeholders"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "using-the-tools-menu",
      children: "Using the Tools menu"
    }), "\n", createVNode(_components.p, {
      children: ["The sequence search page contains a ", createVNode(_components.strong, {
        children: "Tools"
      }), " dropdown that lists external\napplications that can be launched with the sequences in your search query or any that you select. Select some sequences (or execute a search), open the\ndropdown and choose a tool. You will be taken to the tool in question which will be supplied with URLs so that it can seamlessly retrieve the sequences you are looking for from Pathoplexus."]
    }), "\n", createVNode(_components.p, {
      children: "Initial tools allow you to:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "perform QC on sequences with Nextclade and see their placement on a phylogenetic tree (only available for some organisms)"
      }), "\n", createVNode(_components.li, {
        children: "visualise the geographic distribution of your sequences"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "configuring-a-new-tool-to-be-added-to-pathoplexus",
      children: "Configuring a new tool to be added to Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: "We are interested in adding new useful external tools to this menu. If you are a tool developer interested in having your tool featured here, please read on."
    }), "\n", createVNode(_components.h3, {
      id: "requirements",
      children: "Requirements"
    }), "\n", createVNode(_components.p, {
      children: "For a tool to be integrated into the Pathoplexus tools menu, it must be able to:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Accept file URLs as parameters in its web address"
      }), "\n", createVNode(_components.li, {
        children: "Automatically fetch and process the files from these URLs and do something useful with them"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "When users select your tool from the Tools menu, Pathoplexus will generate download URLs, configured in a way that you specify, then redirect users to your tool with these URLs embedded in the web address. Your tool needs to parse these URLs from the incoming request and retrieve the files directly from Pathoplexus.\nTools are available on a per-pathogen basis; if a tool will only work with some of the pathogens on Pathoplexus, you can add it to just those. If it will work on all pathogens, you can add it to all of them."
    }), "\n", createVNode(_components.h3, {
      id: "adding-your-tool-to-pathoplexus",
      children: "Adding your tool to Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: ["The list of tools is defined in the ", createVNode(_components.code, {
        children: "linkOuts"
      }), " section of the ", createVNode(_components.code, {
        children: "values.yaml"
      }), "\nconfiguration of Pathoplexus."]
    }), "\n", createVNode(_components.p, {
      children: "A link-out entry has the following structure:"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "json",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "{"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "  \"name\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"My Tool\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "  \"url\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"http://example.com/analysis?data={{[unalignedNucleotideSequences]}}\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "  \"maxNumberOfRecommendedEntries\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "100"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "}"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.code, {
        children: "name"
      }), " is displayed in the menu, ", createVNode(_components.code, {
        children: "url"
      }), " is a template that may contain\nplaceholders and ", createVNode(_components.code, {
        children: "maxNumberOfRecommendedEntries"
      }), " is optional. When this value is\nset, users will be warned if they attempt to send more sequences than the limit\nsuggests."]
    }), "\n", createVNode(_components.h3, {
      id: "url-template-placeholders",
      children: "URL template placeholders"
    }), "\n", createVNode(_components.p, {
      children: "The URL template may contain placeholders wrapped in square brackets. They are\nreplaced with download links generated for the current search results. Available\nplaceholders are:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "[unalignedNucleotideSequences]"
        }), " – link to the unaligned FASTA file."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "[alignedNucleotideSequences]"
        }), " – link to the aligned FASTA file."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "[metadata]"
        }), " – link to a metadata table in TSV format."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Each placeholder can be extended with options:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: ":[segment]"
        }), " – restricts the sequence download to a specific segment, e.g.\n", createVNode(_components.code, {
          children: "[unalignedNucleotideSequences:S]"
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "+rich"
        }), " – include rich FASTA headers when supported, e.g.\n", createVNode(_components.code, {
          children: "[unalignedNucleotideSequences+rich]"
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "|format"
        }), " – request a specific data format such as ", createVNode(_components.code, {
          children: "json"
        }), ", e.g.\n", createVNode(_components.code, {
          children: "[metadata|json]"
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: ["For metadata, a comma-separated format like ", createVNode(_components.code, {
          children: "+col1,col2"
        }), " can be used to include only\ncertain fields, e.g. ", createVNode(_components.code, {
          children: "[metadata+country,host]"
        }), "."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["To ensure parts of the URL are properly URL encoded, wrap them in double curly\nbraces. For example ", createVNode(_components.code, {
        children: "{{my query}}"
      }), " becomes ", createVNode(_components.code, {
        children: "my%20query"
      }), " after processing. This\nencoding happens after placeholders are substituted, so ", createVNode(_components.code, {
        children: "{{[unalignedNucleotideSequences]}}"
      }), " will become a properly URL-encoded URL to access the unaligned nucleotide sequences. You can even doubly-nest ", createVNode(_components.code, {
        children: "{{}}"
      }), " syntax where necessary."]
    }), "\n", createVNode(_components.p, {
      children: "Multiple placeholders can appear in a single URL, allowing you to pass both\nsequence and metadata downloads to an external tool."
    }), "\n", createVNode(_components.p, {
      children: ["You can create a PR or issue in the ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus",
        children: "Pathoplexus repository"
      }), " to suggest adding your link-out entries to the configuration under a specific organism, and we’ll consider all suggested new tools."]
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

const url = "/docs/how-to/use-tools-and-add-new-ones";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/use-tools-and-add-new-ones.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/use-tools-and-add-new-ones.mdx";
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
