/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import { $ as $$InfoBox } from './InfoBox_IxH1oVvV.mjs';
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
  "title": "Approving submissions",
  "order": 42
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "website",
    "text": "Website"
  }, {
    "depth": 3,
    "slug": "actioning-individual-sequences",
    "text": "Actioning individual sequences"
  }, {
    "depth": 3,
    "slug": "actioning-sequences-in-bulk",
    "text": "Actioning sequences in bulk"
  }, {
    "depth": 1,
    "slug": "api",
    "text": "API"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h1: "h1",
    h3: "h3",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Once you’ve uploaded sequences via the website or ", createVNode(_components.a, {
        href: "/api-documentation",
        children: "API"
      }), ", you will have to approve them before they are fully submitted."]
    }), "\n", createVNode(_components.h1, {
      id: "website",
      children: "Website"
    }), "\n", createVNode(_components.p, {
      children: "After submitting sequences, you’ll be taken to a page showing the progress of processing every sequence. For each sequence, it will show whether it’s awaiting processing, being processed, or has finished processing."
    }), "\n", createVNode(_components.p, {
      children: "Sequences that have finished processing will show different icons to indicate whether there were any issues during the processing."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Green checkmark - indicates that processing was entirely successful"
      }), "\n", createVNode(_components.li, {
        children: "Yellow checkmark - indicates that processing encountered warnings"
      }), "\n", createVNode(_components.li, {
        children: "Red label - indicates that there were errors during processing"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "We highly recommend checking all sequences with warnings to see if they could be rectified or indicate a larger problem with the data."
    }), "\n", createVNode(_components.p, {
      children: "You can only approve and release sequences that have yellow or green checkmarks (no warnings or errors, or only errors) - you cannot approve and release sequences with errors."
    }), "\n", createVNode(_components.p, {
      children: "You can filter the processed sequences to only show those with warnings, errors, or which passed, to help you decide which actions to take."
    }), "\n", createVNode(_components.p, {
      children: ["If see something you’d like to change, or want to try and resolve a warning, you can ", createVNode(_components.a, {
        href: "edit-submissions",
        children: "edit the sequence"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "actioning-individual-sequences",
      children: "Actioning individual sequences"
    }), "\n", createVNode(_components.p, {
      children: "For each sequence, you have 3 options (2 if the sequence has an error), indicated to the right: release (paper plane), edit (pencil and paper), and discard (waste bin).\r\nClicking on any of these icons for one sequence, will execute the action on that sequence only.\r\nWhen you release or discard a sequence, it will no longer be shown on the page."
    }), "\n", createVNode(_components.h3, {
      id: "actioning-sequences-in-bulk",
      children: "Actioning sequences in bulk"
    }), "\n", createVNode(_components.p, {
      children: "You can also take action on multiple sequences at once, using the buttons above the displayed sequences."
    }), "\n", createVNode(_components.p, {
      children: "Discarding: You can choose to discard either all sequences, or those with errors. If you discard all sequences, you will need to start the submission process over."
    }), "\n", createVNode(_components.p, {
      children: "Releasing: You can release all valid sequences (those without warnings or errors, and those with warnings), leaving only those with errors."
    }), "\n", createVNode(_components.p, {
      children: "Once you release your sequences, they will appear on Pathoplexus within a couple minutes."
    }), "\n", createVNode(_components.p, {
      children: ["If you leave any sequences unreleased, you can view, ", createVNode(_components.a, {
        href: "/docs/how-to/edit-submissions",
        children: "edit"
      }), ", and approve/release (if they have no errors) them at a later time."]
    }), "\n", createVNode(_components.p, {
      children: "You can also always view your released sequences by going to ‘Browse’ in the top-right menu, then selecting the pathogen, then clicking ‘View’."
    }), "\n", createVNode(_components.h1, {
      id: "api",
      children: "API"
    }), "\n", createVNode($$InfoBox, {
      children: createVNode(_components.p, {
        children: ["To use the ", createVNode(_components.a, {
          href: "https://demo.pathoplexus.org",
          children: "demo instance"
        }), " instead of the main instance, please replace ", createVNode(_components.code, {
          children: "backend.pathoplexus.org"
        }), " with ", createVNode(_components.code, {
          children: "backend-demo.pathoplexus.org"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The following API requests all require an authentication token. Please read ", createVNode(_components.a, {
        href: "/docs/how-to/authentication-api",
        children: "Authenticating via API guide"
      }), " for the instructions to obtain the token an include the token in the HTTP header ", createVNode(_components.code, {
        children: "Authorization: Bearer <authentication token>"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "You can retrieve a list of uploaded but not released sequences by sending a GET request to the endpoint:"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://backend.pathoplexus.org/<organism>/get-sequences?groupIdsFilter=<group id>&statusesFilter=RECEIVED&statusesFilter=IN_PROCESSING&statusesFilter=HAS_ERRORS&statusesFilter=AWAITING_APPROVAL&warningsFilter=INCLUDE_WARNINGS"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["The available values for the organism are: ", createVNode(_components.code, {
        children: "cchf"
      }), ", ", createVNode(_components.code, {
        children: "ebola-sudan"
      }), ", ", createVNode(_components.code, {
        children: "ebola-zaire"
      }), " and ", createVNode(_components.code, {
        children: "west-nile"
      }), ". The ", createVNode(_components.code, {
        children: "sequenceEntries"
      }), " field of the returned object contains a list of sequences with their corresponding ", createVNode(_components.code, {
        children: "status"
      }), ":"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Sequence that are in the status ", createVNode(_components.code, {
          children: "RECEIVED"
        }), " have not yet been processed. This should usually happen within a few minutes."]
      }), "\n", createVNode(_components.li, {
        children: ["Sequences that are in the status ", createVNode(_components.code, {
          children: "IN_PROCESSING"
        }), " are currently being processed, please wait a few more moments."]
      }), "\n", createVNode(_components.li, {
        children: ["Sequences that are in the status ", createVNode(_components.code, {
          children: "HAS_ERRORS"
        }), " contain errors. To find out details, we recommend going to the review page on the website: you can find it by going to the Submission Portal and clicking on “Review”."]
      }), "\n", createVNode(_components.li, {
        children: ["Sequences that are in the status ", createVNode(_components.code, {
          children: "AWAITING_APPROVAL"
        }), " have passed the processing and quality checks and can be approved."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "A cURL request could be:"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "curl -X 'GET' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  'https://backend.pathoplexus.org/<organism>/get-sequences?groupIdsFilter=<group id>&statusesFilter=RECEIVED&statusesFilter=IN_PROCESSING&statusesFilter=HAS_ERRORS&statusesFilter=AWAITING_APPROVAL&warningsFilter=INCLUDE_WARNINGS' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'accept: application/json' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'Authorization: Bearer <authentication token>'"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["You can either approve selected sequences or approve all sequences that are in the status ", createVNode(_components.code, {
        children: "AWAITING_APPROVAL"
      }), ". To do that, send a POST request to ", createVNode(_components.code, {
        children: "https://backend.pathoplexus.org/<organism>/approve-processed-data"
      }), " with the following request body:"]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "// For a specific list of sequences:"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "{"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"accessionVersionsFilter\": ["
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "    { \"accession\": \"<accession>\", \"version\": <version> },"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "    …"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  ],"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"groupIdsFilter\": [<group id>],"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"scope\": \"ALL\""
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "}"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "// Or to approve all entries without errors (which may include sequences with warnings):"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "{"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"groupIdsFilter\": [<group id>],"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"scope\": \"ALL\""
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "}"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "A cURL request could be:"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "curl -X 'POST' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  'https://backend.pathoplexus.org/<organism>/approve-processed-data' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'accept: application/json' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'Authorization: Bearer <authentication token>' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'Content-Type: application/json' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -d '{"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"groupIdsFilter\": [<group id>],"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  \"scope\": \"ALL\""
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "}'"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Further information can be found in our ", createVNode(_components.a, {
        href: "https://backend.pathoplexus.org/swagger-ui/index.html#/submission-controller",
        children: "Swagger API documentation"
      }), "."]
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

const url = "/docs/how-to/approve-submissions";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/approve-submissions.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/approve-submissions.mdx";
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
