/* empty css                                 */
import { _ as __astro_tag_component__, c as createVNode, F as Fragment } from '../chunks/astro/server_BcdccBRb.mjs';
import { $ as $$MdLayout } from '../chunks/MdLayout_B0ntFVX4.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$MdLayout, {
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
  "layout": "../../layouts/MdLayout.astro",
  "title": "Custom page"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "custom-page",
    "text": "Custom page"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h1: "h1",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "custom-page",
      children: "Custom page"
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
            children: "code blocks"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "are great"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["and ", createVNode(_components.code, {
        children: "commands"
      })]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "italics"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://google.com",
        children: "Link"
      })
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

const url = "/custompage";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/custompage/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/custompage/index.mdx";
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

const page = () => _page;

export { page };
