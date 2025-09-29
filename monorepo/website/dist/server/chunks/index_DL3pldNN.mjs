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
  "title": "How to",
  "order": 1
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Our ‘How To’ pages provide a useful guide to some of the most common things you might want to do at Pathoplexus, from ", createVNode(_components.a, {
        href: "/docs/how-to/create-account",
        children: "creating an account"
      }), " to ", createVNode(_components.a, {
        href: "/docs/how-to/search-download-seqs-api",
        children: "searching for sequences via API"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Use the menu on the left to navigate through a list of topics that you might be curious about - or need help figuring out! - and hopefully we can quickly get you using Pathoplexus like a pro."
    }), "\n", createVNode(_components.p, {
      children: ["You can also find out ", createVNode(_components.a, {
        href: "/docs/how-to/report-sequence-issues",
        children: "how to report suspected issues with sequences"
      }), " and ", createVNode(_components.a, {
        href: "/docs/how-to/curator-sop",
        children: "how our curators evaluate reported problems"
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

const url = "/docs/how-to";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/index.mdx";
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
