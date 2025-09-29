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
  "title": "Preprocessing"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Pathoplexus processes submitted data to validate, harmonize, and standardize it. We ensure users have maximum flexibility in accessing the most useful data for their needs by only rejecting submissions lacking essential metadata values or sequences not identifiable as the specified pathogen."
    }), "\n", createVNode(_components.p, {
      children: ["We use ", createVNode(_components.a, {
        href: "https://docs.nextstrain.org/projects/nextclade/en/stable/user/nextclade-cli/reference.html#nextclade-run",
        children: "Nextclade"
      }), " for alignment, mutation calling, quality checks and clade assignment."]
    }), "\n", createVNode(_components.p, {
      children: "The data preprocessing steps encompass:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Sequences:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Verification that the sequence corresponds to the virus specified by the user."
          }), "\n", createVNode(_components.li, {
            children: "Alignment with the reference genome."
          }), "\n", createVNode(_components.li, {
            children: "Removal of terminal Ns."
          }), "\n", createVNode(_components.li, {
            children: "Translation of genes/coding regions."
          }), "\n", createVNode(_components.li, {
            children: "Quantification of mutations by number and type (including nucleotide and amino acid variations)."
          }), "\n", createVNode(_components.li, {
            children: "Identification and labeling of deletions and insertions."
          }), "\n", createVNode(_components.li, {
            children: "Assignment of specific clades/lineages."
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["Metadata:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Standardization of collection date formats."
          }), "\n", createVNode(_components.li, {
            children: ["Standardization of location information using ", createVNode(_components.a, {
              href: "https://www.ebi.ac.uk/ena/browser/api/xml/ERC000011",
              children: "INSDC-standards"
            }), "."]
          }), "\n", createVNode(_components.li, {
            children: "Ensure required values are set"
          }), "\n", createVNode(_components.li, {
            children: "Ensure metadata fields are of correct type (e.g. string, int, date)"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Submissions that fail to meet these requirements are rejected by the preprocessing pipeline, which provides a detailed error message explaining the reason for rejection."
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

const url = "/docs/concepts/preprocessing";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/preprocessing.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/preprocessing.mdx";
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
