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
  "title": "SeqSets"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["SeqSets (pronounced ", createVNode(_components.em, {
        children: "seek-set"
      }), ") are collections of sequences indicated by their Pathoplexus accession numbers, which provide unique identifiers that can be used to reference that set of sequences."]
    }), "\n", createVNode(_components.p, {
      children: ["They can also be used to generate ", createVNode(_components.a, {
        href: "https://www.doi.org/the-identifier/what-is-a-doi/",
        children: "DOIs"
      }), ", which can be used to reference that collection of sequences.\r\nThis is particularly useful in publications, where putting the DOI into the reference list (like a paper or other cited resource), will allow tracking of which publications sequences are used in."]
    }), "\n", createVNode(_components.p, {
      children: "DOIs and SeqSets can also be used to give credit to sequence generators and share the sequences used in any analysis, whether a social media post, blog post, or in personal communications."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/docs/how-to/generate-seqset",
          children: "How to generate and use SeqSets"
        })
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

const url = "/docs/concepts/seqset";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/seqset.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/seqset.mdx";
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
