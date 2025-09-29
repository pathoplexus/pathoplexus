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
  "layout": "../../layouts/DocLayout.astro",
  "title": "Introduction",
  "order": 1
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "how-to-use-this-documentation",
    "text": "How to use this documentation"
  }, {
    "depth": 2,
    "slug": "getting-started",
    "text": "Getting started"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Pathoplexus is a powerful platform designed to streamline the process of managing, sharing, and analyzing pathogen sequence data. This documentation serves as a guide to understanding and utilizing the features of Pathoplexus effectively."
    }), "\n", createVNode(_components.h2, {
      id: "how-to-use-this-documentation",
      children: "How to use this documentation"
    }), "\n", createVNode(_components.p, {
      children: "Our documentation is divided into two main sections:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Concepts"
          }), ": Dive deep into the terms and formats used in Pathoplexus. This section explains key terms and processes that make up the platform."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "How to"
          }), ": Step-by-step guides for common tasks and operations within Pathoplexus. Whether you’re setting up your account, uploading sequences, or using advanced features, you’ll find detailed instructions here."]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "getting-started",
      children: "Getting started"
    }), "\n", createVNode(_components.p, {
      children: "New to Pathoplexus? Begin your journey by:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/docs/how-to/create-account",
          children: "Creating an account"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/docs/how-to/add-orcid-account",
          children: "Linking your ORCiD"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "For any questions or issues not covered in this documentation, please don’t hesitate to contact our support team or report issues directly through the platform."
    }), "\n", createVNode(_components.p, {
      children: "Welcome to Pathoplexus!"
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

const url = "/docs";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/index.mdx";
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
