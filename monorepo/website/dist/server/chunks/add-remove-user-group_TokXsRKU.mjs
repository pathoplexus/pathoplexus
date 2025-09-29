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
  "title": "Adding or removing a user group",
  "order": 21
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "adding-a-user-to-a-group-you-are-a-member-of",
    "text": "Adding a user to a group you are a member of"
  }, {
    "depth": 2,
    "slug": "removing-a-user-from-your-group",
    "text": "Removing a user from your group"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Users cannot add themselves to groups; they must ask someone within a group to add them. (Users are automatically members of groups they create)"
    }), "\n", createVNode(_components.p, {
      children: "When making this request, please be sure to supply your username exactly as it appears within your user account, as this is what they will use to add you."
    }), "\n", createVNode(_components.p, {
      children: "You can then ask them to follow the below steps to add you to their group."
    }), "\n", createVNode(_components.h2, {
      id: "adding-a-user-to-a-group-you-are-a-member-of",
      children: "Adding a user to a group you are a member of"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Log into your account and navigate to your account page (‘My account’ in the top-right of the website)"
      }), "\n", createVNode(_components.li, {
        children: "Within your groups, select the name of the group that you’d like to add a user to"
      }), "\n", createVNode(_components.li, {
        children: "Using the ‘user’ interface at the bottom of the page, type in the username of the person you want to add"
      }), "\n", createVNode(_components.li, {
        children: "The user is now part of your group"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "removing-a-user-from-your-group",
      children: "Removing a user from your group"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Log into your account and navigate to your account page (‘My account’ in the top-right of the website)"
      }), "\n", createVNode(_components.li, {
        children: "Within your groups, select the name of the group that you’d like to remove a user from"
      }), "\n", createVNode(_components.li, {
        children: "Using the ‘user’ interface at the bottom of the page, click the red button next to the user you wish to remove"
      }), "\n", createVNode(_components.li, {
        children: "The user is now removed"
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

const url = "/docs/how-to/add-remove-user-group";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/add-remove-user-group.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/add-remove-user-group.mdx";
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
