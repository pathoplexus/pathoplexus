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
  "title": "Editing submissions",
  "order": 41
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "editing-sequences-on-the-website",
    "text": "Editing sequences on the website"
  }, {
    "depth": 2,
    "slug": "editing-sequences-via-the-api",
    "text": "Editing sequences via the API"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["After ", createVNode(_components.a, {
        href: "/docs/how-to/upload-sequences",
        children: "uploading sequences"
      }), " and while ", createVNode(_components.a, {
        href: "/docs/how-to/approve-submissions",
        children: "approving them"
      }), " you may see something you’d like to edit, or fix a warning. You can do this by editing the sequence before releasing it."]
    }), "\n", createVNode(_components.h2, {
      id: "editing-sequences-on-the-website",
      children: "Editing sequences on the website"
    }), "\n", createVNode(_components.p, {
      children: "After your submitted sequences have processed and are visible on the review page (with “Current Submissions” displayed to the top-left), you can edit any sequence by clicking the ‘edit’ button (pencil and paper) to the right of the sequence."
    }), "\n", createVNode(_components.p, {
      children: "This will take you to a new page where you can edit all the fields you uploaded, or add information to an empty field.\r\nYou can also edit the unaligned sequence."
    }), "\n", createVNode(_components.p, {
      children: "After making any edits you wish, press the ‘Submit’ button at the top-left, and confirm the submission.\r\nThe sequence will go back to processing, and display on the page again when processing is complete.\r\nIf the status of having a warning or error has changed, a new status symbol will be shown to the left of the sequence."
    }), "\n", createVNode(_components.p, {
      children: ["You can then proceed to ", createVNode(_components.a, {
        href: "/docs/how-to/approve-submissions",
        children: "approving all valid sequences"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "editing-sequences-via-the-api",
      children: "Editing sequences via the API"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["Instructions coming soon. See the ", createVNode(_components.a, {
          href: "/api-documentation",
          children: "Swagger API documentation"
        })]
      })
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

const url = "/docs/how-to/edit-submissions";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/edit-submissions.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/edit-submissions.mdx";
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
