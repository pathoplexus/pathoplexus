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
  "title": "Creating a group",
  "order": 20
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "steps-for-creating-a-group",
    "text": "Steps for creating a group"
  }, {
    "depth": 2,
    "slug": "group-naming-recommendations",
    "text": "Group naming recommendations"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "If your organization does not yet have a group on Pathoplexus, you can create one."
    }), "\n", createVNode(_components.p, {
      children: "If they already have a group, please do not create another! Contact someone in that group and ask them to add you using your Pathoplexus username."
    }), "\n", createVNode(_components.p, {
      children: ["Please remember that everyone within a group is able to submit, edit, and revoke sequences uploaded by anyone else in that group. Read more about that ", createVNode(_components.a, {
        href: "/docs/how-to/add-remove-user-group",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "steps-for-creating-a-group",
      children: "Steps for creating a group"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Log into your account and enter your account page by clicking ‘My account’ in the top-right corner of the webpage"
      }), "\n", createVNode(_components.li, {
        children: "Click ‘Create Group’"
      }), "\n", createVNode(_components.li, {
        children: ["Fill in the required information about your group. Please check the ", createVNode(_components.a, {
          href: "#group-naming-recommendations",
          children: "‘Group naming recommendations’"
        }), " section below."]
      }), "\n", createVNode(_components.li, {
        children: "Click ‘Submit’ to create your group"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["You can now add members to your group by following the steps ", createVNode(_components.a, {
        href: "/docs/how-to/add-remove-user-group",
        children: "outlined in the docs"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "group-naming-recommendations",
      children: "Group naming recommendations"
    }), "\n", createVNode(_components.p, {
      children: "To help others recognize your group and avoid duplication, please follow these best practices when choosing a name:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Include your lab name, institution, and country."
      }), "\n", createVNode(_components.li, {
        children: "Avoid vague names. Prefer full names over acronyms unless they are widely recognized."
      }), "\n", createVNode(_components.li, {
        children: "If your lab is part of a consortium or department, consider including that too."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "These naming conventions ensure your group is identifiable, searchable, and distinguishable from others on the platform."
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

const url = "/docs/how-to/create-group";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/create-group.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/create-group.mdx";
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
