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
  "title": "Adding an ORCiD link to your account",
  "order": 11
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "If you have an account created without linking to ORCiD, you can link your ORCiD later. We recommend this as it makes it much easier to track your contributions to sequences that are uploaded, and to credit you unambiguously with your activity on Pathoplexus."
    }), "\n", createVNode(_components.p, {
      children: "To link your ORCiD:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Ensure you are logged out of your account (go to ‘My account’ and click ‘logout’)"
      }), "\n", createVNode(_components.li, {
        children: "Click on ‘Login’ on the top-right of the website"
      }), "\n", createVNode(_components.li, {
        children: "Click the ‘ORCiD’ option on the right-hand side rather than logging in"
      }), "\n", createVNode(_components.li, {
        children: "Log into ORCiD and authorize linking your account"
      }), "\n", createVNode(_components.li, {
        children: ["When redirected back to Pathoplexus to finish adding your information, ", createVNode(_components.strong, {
          children: "ensure you use the same email as is already linked to your Pathoplexus account"
        }), ". This is necessary for us to know which account you’d like to link the ORCID with. (The other information you add, such as name, on this page will not overwrite the information you already have in your account.)"]
      }), "\n", createVNode(_components.li, {
        children: "On the next page, select “Link with existing account”"
      }), "\n", createVNode(_components.li, {
        children: "You will receive an email asking you to confirm linking the ORCiD; only once you click this link (expires in 5 minutes) is your ORCiD linked"
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

const url = "/docs/how-to/add-orcid-account";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/add-orcid-account.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/add-orcid-account.mdx";
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
