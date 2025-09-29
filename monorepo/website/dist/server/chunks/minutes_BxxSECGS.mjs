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
  "title": "Meeting Minutes",
  "order": 6
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "general-assembly-meetings",
    "text": "General Assembly Meetings"
  }, {
    "depth": 1,
    "slug": "executive-board-meetings",
    "text": "Executive Board Meetings"
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
      children: "At Pathoplexus we take transparent governance seriously."
    }), "\n", createVNode(_components.p, {
      children: "We make summaries of our Member meetings (General Assembly) and Executive Board meetings publicly available below. Minutes are PDF documents."
    }), "\n", createVNode(_components.h1, {
      id: "general-assembly-meetings",
      children: "General Assembly Meetings"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-11-25_PathoplexusGAmeeting.pdf",
          children: "2024-11-25 - Extraordinary General Assembly Meeting"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-10-04_PathoplexusGAmeeting.pdf",
          children: "2024-10-04 - Extraordinary General Assembly Meeting"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-08-12_PathoplexusGAmeeting.pdf",
          children: "2024-08-12 - Founding Meeting"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "executive-board-meetings",
      children: "Executive Board Meetings"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-07-24_EB_Resolutions.pdf",
          children: "2025-07-24 - Executive Board Resolutions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-07-24_PathoplexusEBmeeting_summary.pdf",
          children: "2025-07-24 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-04-11_PathoplexusEBmeeting_summary.pdf",
          children: "2025-04-11 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-02-27_EB_Resolutions.pdf",
          children: "2025-02-27 - Executive Board Resolutions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-02-13_PathoplexusEBmeeting_summary.pdf",
          children: "2025-02-13 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-01-27_PathoplexusEBmeeting_summary.pdf",
          children: "2025-01-27 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-12-09_EB_Resolutions.pdf",
          children: "2024-12-09 - Executive Board Resolutions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-10-30_EB_Resolutions.pdf",
          children: "2024-10-30 - Executive Board Resolutions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-10-22_PathoplexusEBmeeting_summary.pdf",
          children: "2024-10-22 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-09-12_EB_Resolutions.pdf",
          children: "2024-09-12 - Executive Board Resolutions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2024-08-12_PathoplexusEBmeeting.pdf",
          children: "2024-08-12 - Executive Board Meeting Minutes"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/governance/minutes/2025-06-18_EB_Resolutions.pdf",
          children: "2025-06-18 - Executive Board Resolutions"
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

const url = "/about/governance/minutes";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/minutes.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/minutes.mdx";
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
