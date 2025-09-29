/* empty css                                    */
import { _ as __astro_tag_component__, c as createVNode, F as Fragment } from '../../chunks/astro/server_BcdccBRb.mjs';
import { $ as $$MdLayout } from '../../chunks/MdLayout_B0ntFVX4.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$MdLayout, {
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
  "layout": "../../layouts/MdLayout.astro",
  "title": "Expanding Pathoplexus: RSV and HMPV added"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "expanding-pathoplexus-rsv-and-hmpv-added",
    "text": "Expanding Pathoplexus: RSV and HMPV added"
  }, {
    "depth": 3,
    "slug": "meetings-minutes-and-resolutions",
    "text": "Meetings, Minutes, and Resolutions:"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h1: "h1",
    h3: "h3",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode("div", {
      children: createVNode(_components.p, {
        children: [createVNode("a", {
          href: "/news",
          children: "News"
        }), " > ", createVNode("b", {
          children: "Expanding Pathoplexus: RSV and HMPV added"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "expanding-pathoplexus-rsv-and-hmpv-added",
      children: "Expanding Pathoplexus: RSV and HMPV added"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 22 May 2025"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Today, Pathoplexus launches two additional viral pathogens: RSV and HMPV. RSV, which includes the RSV-A and RSV-B subtypes, and HMPV are two related respiratory viruses which are known to cause severe illness in infants and other vulnerable patient groups, making them viruses of public health concern. Each year, RSV causes an estimated 3.6 million RSV-associated hospitalizations and approximately 100 000 RSV-attributable deaths in children under 5 years of age worldwide (", createVNode(_components.a, {
        href: "https://www.who.int/news-room/fact-sheets/detail/respiratory-syncytial-virus-(rsv)",
        children: "WHO report, 2025"
      }), ").  Pathoplexus aims to support sequence sharing to improve both understanding and response."]
    }), "\n", createVNode(_components.p, {
      children: ["Our Executive Board ", createVNode(_components.a, {
        href: "/about/governance/minutes/2025-04-11_PathoplexusEBmeeting_summary.pdf",
        children: "decided to add"
      }), " RSV and HMPV to Pathoplexus based on feedback from the community, having received a letter from those working on respiratory viruses such as RSV & HMPV asking that the virus be added."]
    }), "\n", createVNode(_components.p, {
      children: ["As with other organisms, you can share RSV and HMPV data as “", createVNode(_components.a, {
        href: "/about/terms-of-use/open-data",
        children: "Open"
      }), "” immediately or specify that data be “", createVNode(_components.a, {
        href: "/about/terms-of-use/restricted-data",
        children: "Restricted-Use"
      }), "” for up to 1 year, before becoming Open. Restricted-Use data is still available but is restricted in how it can be used in publications or preprints. All Open data is sent on to INSDC-member databases."]
    }), "\n", createVNode(_components.p, {
      children: "Launching with these new pathogens is an achievement we’re proud of, and we hope to continue expanding the pathogens that Pathoplexus can support in the future."
    }), "\n", createVNode(_components.h3, {
      id: "meetings-minutes-and-resolutions",
      children: "Meetings, Minutes, and Resolutions:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Remember that you can always ", createVNode(_components.a, {
          href: "/about/governance/minutes",
          children: "check our minutes from General Assemblies and Executive Board meetings, as well as Executive Board resolutions"
        })]
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

const url = "/news/2025-05-22-pathoplexus-rsv-and-hmpv";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-05-22-pathoplexus-rsv-and-hmpv.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-05-22-pathoplexus-rsv-and-hmpv.mdx";
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

const page = () => _page;

export { page };
