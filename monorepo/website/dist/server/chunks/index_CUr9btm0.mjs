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
  "title": "Governance",
  "order": 3
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "governance",
    "text": "Governance"
  }, {
    "depth": 1,
    "slug": "privacy",
    "text": "Privacy"
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
      children: ["At Pathoplexus we take transparent governance seriously.\nWe have tried to develop a database governance system that values diverse backgrounds and expertise, clarity and community input.\nOur ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Charter"
      }), " is designed to guide the aims and values of Pathoplexus long into the future."]
    }), "\n", createVNode(_components.p, {
      children: "You can read all of our governance and privacy documents and terms below."
    }), "\n", createVNode(_components.h1, {
      id: "governance",
      children: "Governance"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/pathoplexus-statutes",
          children: "Statutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/values",
          children: "Values"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/terms-of-use/terms-of-service",
          children: "Database Terms of Service"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/data-submission",
          children: "Data Submission and Processing"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/eb-guidelines",
          children: "Executive Board Guidelines"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/sab-guidelines",
          children: "Scientific Advisory Board Guidelines"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes",
          children: "Meeting Minutes"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "privacy",
      children: "Privacy"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/terms-of-use/privacy-policy",
          children: "Privacy Policy (GDPR Statement)"
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

const url = "/about/governance";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/index.mdx";
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
