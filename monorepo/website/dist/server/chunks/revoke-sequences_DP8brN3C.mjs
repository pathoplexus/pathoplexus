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
  "title": "Revoking a sequence",
  "order": 45
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "how-to-revoke-a-sequence",
    "text": "How to revoke a sequence"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Sequences can be revoked if they contain errors that cannot be corrected.\r\nYou can read more about the circumstances under which sequences could/should be revoked in the ", createVNode(_components.a, {
        href: "/about/governance/data-submission#81-revocation",
        children: "Revocation"
      }), " section of the Data Submission and Processing document."]
    }), "\n", createVNode(_components.p, {
      children: ["Note that revoking a sequence ", createVNode(_components.strong, {
        children: "does not delete it"
      }), ".\r\nWhile it will not turn up in default searches, and will be clearly marked as revoked, it will still be publicly visible."]
    }), "\n", createVNode(_components.p, {
      children: ["Deletion is generally ", createVNode(_components.em, {
        children: "not"
      }), " permitted by Pathoplexus, since this is intransparent and causes confusion when a record cannot be traced.\r\nRead more about Deletion and the circumstances when it may be appropriate (such as identifiable data, or data submitted without permission)\r\nin the ", createVNode(_components.a, {
        href: "/about/governance/data-submission#82-deletion",
        children: "Deletion"
      }), " section of the Data Submission and Processing document."]
    }), "\n", createVNode(_components.h3, {
      id: "how-to-revoke-a-sequence",
      children: "How to revoke a sequence"
    }), "\n", createVNode(_components.p, {
      children: "Revocation can only be done by members of the group that originally submitted that sequence."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Find the sequence you would like to revoke via searching the main database, or by viewing your submitted sequences.\r\n(Go to ‘Submit’ and ‘View sequences’)."
      }), "\n", createVNode(_components.li, {
        children: "Scroll to the bottom of the sequence page and find the ‘Revoke this sequence’ button in the bottom-left corner."
      }), "\n", createVNode(_components.li, {
        children: "Confirm you want to revoke the sequence"
      }), "\n", createVNode(_components.li, {
        children: "You will be taken to the sequence review page - press ‘Release’ to release the revoked sequence"
      }), "\n", createVNode(_components.li, {
        children: "Confirm you want to release the sequence"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The sequence is now revoked."
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

const url = "/docs/how-to/revoke-sequences";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/revoke-sequences.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/revoke-sequences.mdx";
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
