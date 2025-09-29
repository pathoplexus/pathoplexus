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
  "title": "Versioning"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Pathoplexus ‘versions’ all sequences it holds.\r\nThis means that whenever any part of a sequence or its associated ", createVNode(_components.a, {
        href: "metadataformat",
        children: "metadata"
      }), " is updated, a new record is generated and linked to the old data, which is preserved."]
    }), "\n", createVNode(_components.p, {
      children: ["The version of a sequence is indicated by the numbers after the full-stop (", createVNode(_components.code, {
        children: "."
      }), ") in the ", createVNode(_components.a, {
        href: "accession",
        children: createVNode(_components.strong, {
          children: "accession number"
        })
      }), ".\r\nFor example, the initial version of a new sequence may have an accession such as: ", createVNode(_components.code, {
        children: "PP_0000AE.1"
      }), "\r\nIf later, the group who uploaded the sequence realized the collection date was wrong, and corrected this, the latest version of the accession number would now be ", createVNode(_components.code, {
        children: "PP_0000AE.2"
      })]
    }), "\n", createVNode(_components.p, {
      children: "When viewing a sequence record online, you can view all previous versions of a sequence by using the drop-down menu to the top-right of the page.\r\nThe version status of the sequence is also displayed as part of the metadata."
    }), "\n", createVNode(_components.p, {
      children: "If you are viewing an outdated version (not the current version) you will also see a banner at the top of the page, which you can use to link to the current version."
    }), "\n", createVNode(_components.p, {
      children: "Note that URLs linking directly to sequences also include versions - allowing you to link to a previous version if you wish.\r\nIf you link to a URL without a version at the end of the accession, it will redirect you to the most recent version."
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

const url = "/docs/concepts/versioning";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/versioning.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/versioning.mdx";
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
