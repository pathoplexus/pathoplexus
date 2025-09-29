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
  "title": "Contact"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "contact",
    "text": "Contact"
  }, {
    "depth": 2,
    "slug": "support",
    "text": "Support"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "contact",
      children: "Contact"
    }), "\n", createVNode(_components.p, {
      children: ["To reach out to us, please contact ", createVNode("a", {
        href: "mailto:hello@pathoplexus.org",
        children: createVNode(_components.a, {
          href: "mailto:hello@pathoplexus.org",
          children: "hello@pathoplexus.org"
        })
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "support",
      children: "Support"
    }), "\n", createVNode(_components.p, {
      children: "If you are having problems with Pathoplexus or need to discuss something with our support team, please get in touch using the form below."
    }), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n", createVNode("script", {
      src: "https://desk.zoho.eu/portal/api/feedbackwidget/167952000000219216?orgId=20097676067&displayType=embeded"
    }), "\n", createVNode("div", {
      id: "zsfeedbackwidgetdiv"
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

const url = "/contact";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/contact/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/contact/index.mdx";
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
