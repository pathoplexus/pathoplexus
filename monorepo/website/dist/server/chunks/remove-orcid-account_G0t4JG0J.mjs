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
  "title": "Removing the ORCiD link to your account",
  "order": 13
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
      children: "If you wish to remove the linking of your ORCiD from your Pathoplexus account, you can do so. However, since your ORCiD provides an unambiguous way to refer to you and credit you for your contributions to Pathoplexus, we highly recommend you keep an ORCiD linked to your account."
    }), "\n", createVNode(_components.p, {
      children: "To unlink your ORCiD:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Log into your account and visit your account page (‘My account’ in the top-right corner of the webpage)"
      }), "\n", createVNode(_components.li, {
        children: "Click “Edit email address or password” - you will be redirected to the Keycloak application we use to manage our logins securely"
      }), "\n", createVNode(_components.li, {
        children: "Under ‘Account security’ click on ‘Linked accounts’"
      }), "\n", createVNode(_components.li, {
        children: "Click on ‘unlink account’ next to the ORCiD entry"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "You can link your ORCiD account again at any time in the future, using the ‘link account’ button at the bottom of the ‘Linked accounts’ page in Keycloak"
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

const url = "/docs/how-to/remove-orcid-account";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/remove-orcid-account.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/remove-orcid-account.mdx";
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
