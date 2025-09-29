/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import 'clsx';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$AboutLayout, {
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
  "layout": "../../../layouts/AboutLayout.astro",
  "title": "Terms of use",
  "order": 2
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "terms-of-use",
    "text": "Terms of Use"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "It’s important for all Pathoplexus users to familiarize themselves with the terms of using our website and database, as well as the terms outlining how data on Pathoplexus can be used."
    }), "\n", createVNode(_components.h1, {
      id: "terms-of-use",
      children: "Terms of Use"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["For a full description of how data can be used on Pathoplexus, see the ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["For a summary of how Open Data can be used, see the ", createVNode(_components.a, {
          href: "/about/terms-of-use/open-data",
          children: "Open Data Terms of Use Summary"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["For a summary of how Restricted Data can be used, see the ", createVNode(_components.a, {
          href: "/about/terms-of-use/restricted-data",
          children: "Restricted Data Terms of Use Summary"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["For information about the services we provide as a database, including what kind of data you can submit to us, see the ", createVNode(_components.a, {
          href: "/about/terms-of-use/terms-of-service",
          children: "Database Terms of Use"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["For information on how we store and process user data, see our ", createVNode(_components.a, {
          href: "/about/terms-of-use/privacy-policy",
          children: "Privacy Policy"
        })]
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

const url = "/about/terms-of-use";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/index.mdx";
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
