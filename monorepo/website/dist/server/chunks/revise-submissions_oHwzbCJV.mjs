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
  "title": "Revising a submission",
  "order": 43
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 2,
    "slug": "editing-the-metadata",
    "text": "Editing the metadata"
  }, {
    "depth": 3,
    "slug": "how-to-create-the-metadata-file",
    "text": "How to create the metadata file"
  }, {
    "depth": 3,
    "slug": "creating-a-matching-fasta-file",
    "text": "Creating a matching FASTA file"
  }, {
    "depth": 2,
    "slug": "editing-the-sequence",
    "text": "Editing the sequence"
  }, {
    "depth": 3,
    "slug": "creating-the-fasta-file",
    "text": "Creating the FASTA file"
  }, {
    "depth": 3,
    "slug": "creating-the-metadata-file",
    "text": "Creating the metadata file"
  }, {
    "depth": 2,
    "slug": "submitting-the-revision",
    "text": "Submitting the revision"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h3, {
      id: "contents",
      children: "Contents:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#editing-the-metadata",
          children: "Editing the metadata"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#editing-the-sequence",
          children: "Editing the sequence"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#submitting-the-revision",
          children: "Submitting the revision"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Sequences can be corrected or updated after they have been submitted to Pathoplexus.\r\nSubmitting these changes (“revisions”) will cause the version of the sequence to be incremented, and previous versions of the metadata and sequence data can always be accessed via previous version numbers.\r\n(See ", createVNode(_components.a, {
        href: "/docs/concepts/versioning",
        children: "Versioning"
      }), ")"]
    }), "\n", createVNode(_components.p, {
      children: ["The process of submitting revisions is very similar to original submission.\r\nThe main difference is that you must provide an ", createVNode(_components.code, {
        children: "accession"
      }), " column in the metadata file, which contains the Pathoplexus accession number(s) assigned when the sequences were submitted originally."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["You must use the ", createVNode(_components.em, {
          children: "original metadata"
        }), " when doing a revision!"]
      }), " (In other words, the original files you submitted to Pathoplexus.) Currently you will need to have this file locally - we aim to introduce a way to download this from Pathoplexus soon. If you do not have this file, please ", createVNode(_components.em, {
        children: "contact us"
      }), " at ", createVNode(_components.a, {
        href: "mailto:revisions@pathoplexus.org",
        children: "revisions@pathoplexus.org"
      }), " to help you do the revision."]
    }), "\n", createVNode(_components.h2, {
      id: "editing-the-metadata",
      children: "Editing the metadata"
    }), "\n", createVNode(_components.h3, {
      id: "how-to-create-the-metadata-file",
      children: "How to create the metadata file"
    }), "\n", createVNode(_components.p, {
      children: ["The metadata file should include all the metadata fields that were originally included, ", createVNode(_components.strong, {
        children: "both"
      }), " those that you wish to update and that should remain the same. (Not including a metadata column will set its value to ‘empty’.)"]
    }), "\n", createVNode(_components.h3, {
      id: "creating-a-matching-fasta-file",
      children: "Creating a matching FASTA file"
    }), "\n", createVNode(_components.p, {
      children: "Even if you are not revising the sequence, you must provide the a FASTA file that matches the metadata file you are uploading.\r\nIt should only contain the sequences that are in the metadata file (if this is fewer than your original submission), and does not otherwise need to be edited."
    }), "\n", createVNode(_components.p, {
      children: ["You can also edit the sequence at the same time as revising the metadata - simply prepare the FASTA file as explained in ", createVNode(_components.a, {
        href: "#editing-the-sequence",
        children: "Editing the sequence"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "editing-the-sequence",
      children: "Editing the sequence"
    }), "\n", createVNode(_components.h3, {
      id: "creating-the-fasta-file",
      children: "Creating the FASTA file"
    }), "\n", createVNode(_components.p, {
      children: "Create a FASTA file that contains only the sequences you’d like to revise, with whatever changes you’d like to make.\r\nThere is no reason to edit the sequence names in the FASTA file, as long as they still match those in your metadata file."
    }), "\n", createVNode(_components.h3, {
      id: "creating-the-metadata-file",
      children: "Creating the metadata file"
    }), "\n", createVNode(_components.p, {
      children: ["The metadata file should only have rows of data for the sequences in the FASTA file.\r\nIt needs to include an ", createVNode(_components.code, {
        children: "accession"
      }), " column, which includes the Pathoplexus accessions assigned at initial submission."]
    }), "\n", createVNode(_components.p, {
      children: ["You should also include the ", createVNode(_components.code, {
        children: "id"
      }), " column, which will match the sequence ids in your FASTA file.\r\nIf you want to edit any metadata fields as well, you can include these as described in ", createVNode(_components.a, {
        href: "#editing-the-metadata",
        children: "Editing the metadata"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["We also encourage you to add a short description or summary in the optional ", createVNode(_components.code, {
        children: "versionComment"
      }), " metadata field describing the reason for revising the sequence."]
    }), "\n", createVNode(_components.h2, {
      id: "submitting-the-revision",
      children: "Submitting the revision"
    }), "\n", createVNode(_components.p, {
      children: ["To submit a revision, navigate to the ", createVNode(_components.code, {
        children: "Submit"
      }), " section of the Pathoplexus website using the link in the top-right corner of the website.\r\nSelect the correct pathogen if requested, or ensure you’re submitting to the correct pathogen database via the drop-down on the top-left of the website."]
    }), "\n", createVNode(_components.p, {
      children: "When on the page with ‘Submit’, ‘Revise’, ‘Review’, and ‘View’ boxes, select ‘Revise’."
    }), "\n", createVNode(_components.p, {
      children: ["Just as with an original submission, drag and drop (or select) the files where you have made the appropriate revisions.\r\n", createVNode(_components.strong, {
        children: "Ensure you specify the same Terms of Data as you previously chose for your sequences."
      }), "\r\nPress ‘Submit’."]
    }), "\n", createVNode(_components.p, {
      children: "You will be directed to the same processing page as you’re taken to during initial submission, where you can view the sequences and their changes before releasing them.\r\nOnce released, these changes will appear in the database after a few minutes, with the version numbers incremented."
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

const url = "/docs/how-to/revise-submissions";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/revise-submissions.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/revise-submissions.mdx";
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
