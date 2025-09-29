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
  "title": "Editing your account",
  "order": 14
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    li: "li",
    ol: "ol",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "You can edit your account to update your information anytime.\r\nOnce logged in, you can click on ‘My account’ in the top-right of the webpage"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Click ‘Edit email address or password’"
      }), "\n", createVNode(_components.li, {
        children: "This will redirect you to Keycloak, the component of our website that handles accounts and authentication"
      }), "\n", createVNode(_components.li, {
        children: "From here, you can edit your personal information, such as username, email, name, and password. At the moment, you cannot edit your ORCiD or affiliation/university"
      }), "\n", createVNode(_components.li, {
        children: "If you have signed up through ORCiD and do not have a password, you can set a password."
      }), "\n", createVNode(_components.li, {
        children: "Be sure to save any changes after you make them."
      }), "\n", createVNode(_components.li, {
        children: "You can also explore your login options such as 2-factor authentication, and see where else you’re logged in and what other accounts are linked."
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

const url = "/docs/how-to/edit-account";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/edit-account.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/edit-account.mdx";
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
