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
  "title": "Search sequences on the website",
  "order": 90
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "mutations",
    "text": "Mutations"
  }, {
    "depth": 3,
    "slug": "nucleotide-mutations-and-insertions",
    "text": "Nucleotide mutations and insertions"
  }, {
    "depth": 3,
    "slug": "amino-acid-mutations-and-insertions",
    "text": "Amino acid mutations and insertions"
  }, {
    "depth": 3,
    "slug": "insertion-wildcards",
    "text": "Insertion wildcards"
  }, {
    "depth": 3,
    "slug": "multiple-mutations",
    "text": "Multiple mutations"
  }, {
    "depth": 3,
    "slug": "any-mutation",
    "text": "Any mutation"
  }, {
    "depth": 3,
    "slug": "no-mutation",
    "text": "No mutation"
  }];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h2: "h2",
    h3: "h3",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "mutations",
      children: "Mutations"
    }), "\n", createVNode(_components.h3, {
      id: "nucleotide-mutations-and-insertions",
      children: "Nucleotide mutations and insertions"
    }), "\n", createVNode(_components.p, {
      children: ["A nucleotide mutation has the format ", createVNode(_components.code, {
        children: "<position><base>"
      }), " or ", createVNode(_components.code, {
        children: "<base_ref><position><base>"
      }), ". A ", createVNode(_components.code, {
        children: "<base>"
      }), " can be one of the four nucleotides ", createVNode(_components.code, {
        children: "A"
      }), ", ", createVNode(_components.code, {
        children: "T"
      }), ", ", createVNode(_components.code, {
        children: "C"
      }), ", and ", createVNode(_components.code, {
        children: "G"
      }), ". It can also be ", createVNode(_components.code, {
        children: "-"
      }), " for deletion and ", createVNode(_components.code, {
        children: "N"
      }), " for unknown. For example if the reference sequence is ", createVNode(_components.code, {
        children: "A"
      }), " at position 23 both: ", createVNode(_components.code, {
        children: "23T"
      }), " and ", createVNode(_components.code, {
        children: "A23T"
      }), " will yield the same results."]
    }), "\n", createVNode(_components.p, {
      children: ["If your organism is multi-segmented you must append the name of the segment to the start of the mutation, e.g. ", createVNode(_components.code, {
        children: "S:23T"
      }), " and ", createVNode(_components.code, {
        children: "S:A23T"
      }), " for a mutation in segment ", createVNode(_components.code, {
        children: "S"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Insertions can be searched for in the same manner, they just need to have ", createVNode(_components.code, {
        children: "ins_"
      }), " appended to the start of the mutation. Example ", createVNode(_components.code, {
        children: "ins_10462:A"
      }), " or if the organism is multi-segmented ", createVNode(_components.code, {
        children: "ins_S:10462:A"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "amino-acid-mutations-and-insertions",
      children: "Amino acid mutations and insertions"
    }), "\n", createVNode(_components.p, {
      children: ["An amino acid mutation has the format ", createVNode(_components.code, {
        children: "<gene>:<position><base>"
      }), " of ", createVNode(_components.code, {
        children: "<gene>:<base_ref><position><base>"
      }), ". A ", createVNode(_components.code, {
        children: "<base>"
      }), " can be one of the 20 amino acid codes. It can also be ", createVNode(_components.code, {
        children: "-"
      }), " for deletion and ", createVNode(_components.code, {
        children: "X"
      }), " for unknown. Example: ", createVNode(_components.code, {
        children: "E:57Q"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Insertions can be searched for in the same manner, they just need to have ", createVNode(_components.code, {
        children: "ins_"
      }), " appended to the start of the mutation. Example ", createVNode(_components.code, {
        children: "ins_NS4B:31:N"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "insertion-wildcards",
      children: "Insertion wildcards"
    }), "\n", createVNode(_components.p, {
      children: ["Loculus supports insertion queries that contain wildcards ", createVNode(_components.code, {
        children: "?"
      }), ". For example ", createVNode(_components.code, {
        children: "ins_S:214:?EP?"
      }), " will match all cases where segment ", createVNode(_components.code, {
        children: "S"
      }), " has an insertion of ", createVNode(_components.code, {
        children: "EP"
      }), " between the positions 214 and 215 but also an insertion of other AAs which include the ", createVNode(_components.code, {
        children: "EP"
      }), ", e.g. the insertion ", createVNode(_components.code, {
        children: "EPE"
      }), " will be matched."]
    }), "\n", createVNode(_components.p, {
      children: ["You can also use wildcards to match any insertion at a given position. For example ", createVNode(_components.code, {
        children: "ins_S:214:?:"
      }), " will match any (but at least one) insertion between the positions 214 and 215."]
    }), "\n", createVNode(_components.h3, {
      id: "multiple-mutations",
      children: "Multiple mutations"
    }), "\n", createVNode(_components.p, {
      children: "Multiple mutation filters can be provided by adding one mutation after the other."
    }), "\n", createVNode(_components.h3, {
      id: "any-mutation",
      children: "Any mutation"
    }), "\n", createVNode(_components.p, {
      children: ["To filter for any mutation at a given position you can omit the ", createVNode(_components.code, {
        children: "<base>"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "no-mutation",
      children: "No mutation"
    }), "\n", createVNode(_components.p, {
      children: ["You can write a ", createVNode(_components.code, {
        children: "."
      }), " for the ", createVNode(_components.code, {
        children: "<base>"
      }), " to filter for sequences for which it is confirmed that no mutation occurred, i.e. has the same base as the reference genome at the specified position."]
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

const url = "/docs/how-to/search-sequences-website";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/search-sequences-website.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/search-sequences-website.mdx";
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
