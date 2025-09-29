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
  "title": "Creating an account",
  "order": 10
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    li: "li",
    ol: "ol",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "When creating a new Pathoplexus account, you can choose to either login with an existing ORCiD or create a separate account. If you use ORCiD, your account will be linked with Pathoplexus and we will pull some information from ORCiD, such as your ORCiD and name - but will never receive or access your password. In the future, you can always login using ORCiD and don’t need a separate password."
    }), "\n", createVNode(_components.p, {
      children: "If you choose to create your own account, you will need to create a password, much like with other websites, and will need to add your ORCiD manually if you would like to link it (highly recommended to track authorship most effectively)."
    }), "\n", createVNode(_components.p, {
      children: "To begin creating a new account, click ‘Login’ in the top-right on the website."
    }), "\n", createVNode(_components.p, {
      children: "To login with ORCiD:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Create ‘ORCiD’ to the right-hand side of the page, login to ORCiD, and authorize access to your account"
      }), "\n", createVNode(_components.li, {
        children: "You’ll then be redirected back to Pathoplexus to complete your account creation"
      }), "\n", createVNode(_components.li, {
        children: "On the new page, you’ll be able to edit and complete the information needed for your account"
      }), "\n", createVNode(_components.li, {
        children: "When you press ‘Submit’ you will be sent an email to verify your account (valid for 5 minutes). You won’t be able to log in until you verify your account"
      }), "\n", createVNode(_components.li, {
        children: "When you click on the verification email you’ll automatically be logged in to your new account"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "To login by creating your own account:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Click ‘Register’ at the bottom of the login page to create a new account"
      }), "\n", createVNode(_components.li, {
        children: "Fill in the required user account information, including username, email, and password"
      }), "\n", createVNode(_components.li, {
        children: ["You will need to agree to the ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), " to create an account"]
      }), "\n", createVNode(_components.li, {
        children: "When you press ‘Submit’ you will be sent an email to verify your account (valid for 5 minutes). You won’t be able to log in until you verify your account"
      }), "\n", createVNode(_components.li, {
        children: "When you click on the verification email you’ll automatically be logged in to your new account"
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

const url = "/docs/how-to/create-account";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/create-account.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/create-account.mdx";
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
