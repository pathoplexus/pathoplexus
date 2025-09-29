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
  "title": "Generating & using SeqSets",
  "order": 50
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 2,
    "slug": "creating-a-seqset",
    "text": "Creating a SeqSet"
  }, {
    "depth": 2,
    "slug": "sharing-a-seqset",
    "text": "Sharing a SeqSet"
  }, {
    "depth": 2,
    "slug": "adding-a-doi",
    "text": "Adding a DOI"
  }, {
    "depth": 2,
    "slug": "editing-a-seqset",
    "text": "Editing a SeqSet"
  }, {
    "depth": 2,
    "slug": "exporting-a-seqset",
    "text": "Exporting a SeqSet"
  }, {
    "depth": 2,
    "slug": "deleting-a-seqset",
    "text": "Deleting a SeqSet"
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
          href: "#creating-a-seqset",
          children: "Creating a SeqSet"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#sharing-a-seqset",
          children: "Sharing a SeqSet"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#adding-a-doi",
          children: "Adding a DOI"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#editing-a-seqset",
          children: "Editing a SeqSet"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#exporting-a-seqset",
          children: "Exporting a SeqSet"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#deleting-a-seqset",
          children: "Deleting a SeqSet"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["You must ", createVNode(_components.a, {
        href: "/docs/how-to/create-account",
        children: "create an account"
      }), " and be logged into Pathoplexus to create SeqSets (pronounced ", createVNode(_components.em, {
        children: "seek-sets"
      }), ")."]
    }), "\n", createVNode(_components.h2, {
      id: "creating-a-seqset",
      children: "Creating a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: ["On the top-right corner of Pathoplexus, click on the ‘SeqSets’ link.\r\nAny SeqSets you’ve created previously will be shown in a table.\r\nNew SeqSets can be created by clicking on the ", createVNode(_components.code, {
        children: "+"
      }), " icon next to the ‘SeqSets’ heading."]
    }), "\n", createVNode(_components.p, {
      children: ["After clicking the ", createVNode(_components.code, {
        children: "+"
      }), ", a new box will open allowing you to name and describe the SeqSet, and to add accession numbers.\r\nYou can include accession numbers in either your Focal or Background dataset. Definitions and usage guidelines for these datasets are available in the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " under the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms#422-publications-and-preprints",
        children: "Publications and Preprints"
      }), " section."]
    }), "\n", createVNode(_components.p, {
      children: "You can currently only add Pathoplexus accession numbers. These can be added with or without the version."
    }), "\n", createVNode(_components.p, {
      children: "After adding all your accessions, click ‘Save’ to generate a new SeqSet."
    }), "\n", createVNode(_components.h2, {
      id: "sharing-a-seqset",
      children: "Sharing a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: "SeqSets can be shared via the URL visible when viewing a SeqSet page.\r\nSimply copy this from your browser and others will be able to use this link to view your SeqSet (without needing a Pathoplexus account)."
    }), "\n", createVNode(_components.p, {
      children: "If you generate a DOI for the SeqSet (see below), you can also share this link."
    }), "\n", createVNode(_components.h2, {
      id: "adding-a-doi",
      children: "Adding a DOI"
    }), "\n", createVNode(_components.p, {
      children: ["You can add a ", createVNode(_components.a, {
        href: "https://www.doi.org/the-identifier/what-is-a-doi/",
        children: "DOI"
      }), " in order to reference the SeqSet more easily, and to allow your SeqSet to be referenced in publications."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Important"
      }), ":\r\nNote that after generating at DOI, you will not be able to edit that SeqSet directly any longer.\r\nIf you make edits, you will generate a new ‘version’ of the SeqSet, which will require generating a new DOI.\r\nFor this reason, we suggest finalizing your list of sequences ", createVNode(_components.em, {
        children: "before"
      }), " generating a DOI."]
    }), "\n", createVNode(_components.p, {
      children: "After generating a SeqSet, click on it to view an overview. Next to ‘DOI’ you’ll see a link to “Generate a DOI”.\r\nPress this, confirm you really want to create a DOI, and a DOI will be automatically generated."
    }), "\n", createVNode(_components.p, {
      children: "It can take up to a day for your DOI to be registered in the system and for the provided link to work correctly."
    }), "\n", createVNode(_components.p, {
      children: "If you edit a SeqSet after generating a DOI, you will need to generate a new DOI.\r\nThus, it’s usually better to wait until you are confident that you have pulled together all the sequences you want to reference, before generating a DOI."
    }), "\n", createVNode(_components.p, {
      children: "Once you have generated a DOI, you can no longer delete a SeqSet, as DOIs are intended to be persistent."
    }), "\n", createVNode(_components.h2, {
      id: "editing-a-seqset",
      children: "Editing a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: "You can edit a SeqSet by selecting it and then clicking the ‘Edit’ button on the top of the page."
    }), "\n", createVNode(_components.p, {
      children: "When you edit a SeqSet, you will generate a new version of that SeqSet, which will be visible when you return to your SeqSet overview page."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If you edit a SeqSet after generating a DOI, you will need to generate a new DOI."
      }), "\r\nThus, it’s usually better to finalize your set of sequences before generating a DOI."]
    }), "\n", createVNode(_components.h2, {
      id: "exporting-a-seqset",
      children: "Exporting a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: "You can use the ‘Export’ button when viewing a SeqSet, to export information about that SeqSet (including the accessions of the sequences included in the SeqSet) into JSON or TSV format."
    }), "\n", createVNode(_components.p, {
      children: "You can also generate citation information in BibTeX, MLA, and APA style."
    }), "\n", createVNode(_components.h2, {
      id: "deleting-a-seqset",
      children: "Deleting a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: "You can only delete SeqSets that do not have DOIs. To do this, click on the SeqSet and click the ‘Delete’ button."
    }), "\n", createVNode(_components.p, {
      children: "Note that deletion is permanent and people will no longer be able to view this SeqSet."
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

const url = "/docs/how-to/generate-seqset";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/generate-seqset.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/generate-seqset.mdx";
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
