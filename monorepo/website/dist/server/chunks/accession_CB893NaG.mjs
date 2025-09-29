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
  "title": "Accessions"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "pathoplexus-accessions",
    "text": "Pathoplexus accessions"
  }, {
    "depth": 2,
    "slug": "insdc-accessions",
    "text": "INSDC accessions"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "“Accessions” are identification tags that are unique for each sequence.\r\nWithin Pathoplexus, you will encounter two types of accessions: the Pathoplexus accession, and the INSDC (Genbank, ENA, DDBJ) accession."
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus accessions are generated for every sequence present in Pathoplexus.\r\nIf a sequence is uploaded directly to Pathoplexus, it will receive a Pathoplexus accession before having an INSDC accession.\r\nIf it is added to Pathoplexus from INSDC, it will have a Pathoplexus accession as well its original INSDC accession."
    }), "\n", createVNode(_components.h2, {
      id: "pathoplexus-accessions",
      children: "Pathoplexus accessions"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus accessions are generated for every sequence that is added to Pathoplexus.\r\nThe format of Pathoplexus accessions has the prefix “", createVNode(_components.code, {
        children: "PP_"
      }), "” to show the accession is from Pathoplexus, and then a number generated for the sequence.\r\nSometimes you may see an additional full-stop “", createVNode(_components.code, {
        children: "."
      }), "” and number after the accession - these indicate the ", createVNode(_components.a, {
        href: "versioning",
        children: createVNode(_components.strong, {
          children: "version"
        })
      }), " of the sequence."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus accessions are generated sequentially, but due to the time to process and approve/release sequences, accessions should not be interpreted as a strict record of order."
    }), "\n", createVNode(_components.h2, {
      id: "insdc-accessions",
      children: "INSDC accessions"
    }), "\n", createVNode(_components.p, {
      children: "INSDC databases also generate accession numbers for each sequence when they are submitted.\r\nWhen Pathoplexus pulls data from INSDC databases, we record and display the associated INSDC accession, so that the original source of the sequence is clear and traceable."
    }), "\n", createVNode(_components.p, {
      children: "When sequences uploaded directly to Pathoplexus are submitted to INSDC by Pathoplexus, they will additionally receive an INSDC accession, which will be displayed on Pathoplexus when they are publicly available on INSDC."
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

const url = "/docs/concepts/accession";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/accession.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/accession.mdx";
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
