/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import { $ as $$Team } from './Team_3ri42Dsz.mjs';
import { g as georgeGithinji, a as allisonBlack, b as andersonBrito, t as tommyLam } from './tommyLam-square_CENPNgKA.mjs';
import { e as emmaHodcroft } from './emmaHodcroft-square_BYq7acxQ.mjs';
import 'clsx';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$AboutLayout, {
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
  "layout": "../../layouts/AboutLayout.astro",
  "menuTitle": "Executive Board",
  "title": "Pathoplexus Executive Board",
  "route": "/",
  "order": 2
};
function getHeadings() {
  return [];
}
const members = [{
  name: "Emma Hodcroft",
  description: "Evolution, phylogenetics",
  affiliation: "Swiss TPH; University of Basel; SIB: Switzerland",
  picture: emmaHodcroft
}, {
  name: "George Githinji",
  description: "Evolution, phylogenetics",
  affiliation: "KEMRI-Wellcome Trust Research Programme: Kenya",
  picture: georgeGithinji
}, {
  name: "Allison Black",
  description: "Public health, molecular epidemiology",
  affiliation: "Washington, USA",
  picture: allisonBlack
}, {
  name: "Anderson Brito",
  description: "Virology, public health",
  affiliation: "Instituto Todos pela Saúde: Brazil",
  picture: andersonBrito
}, {
  name: "Tommy Lam",
  description: "Software development, evolution",
  affiliation: "The University of Hong Kong: Hong Kong",
  picture: tommyLam
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Pathoplexus is run by an Executive Board, who have dedicated themselves to following the\n", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), "\nand aiming to ensure the Pathoplexus database is efficient, effective, transparent, and at the service of the pathogen genome sharing community."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus believes a diverse, active board is key to ensuring the database can maximise the good it does.\nOur board is committed to serving in two-year terms, and is accountable to the Pathoplexus Membership."
    }), "\n", createVNode(_components.p, {
      children: ["The Pathoplexus Executive Board is defined and guided by the ", createVNode(_components.a, {
        href: "/about/governance/pathoplexus-statutes",
        children: "Pathoplexus Statutes"
      }), " and ", createVNode(_components.a, {
        href: "/about/governance/eb-guidelines",
        children: "Executive Board Guidelines"
      }), ". Executive Board members serve in a personal capacity; their affiliations are listed solely to highlight their areas of expertise."]
    }), "\n", createVNode("div", {
      class: "h-12"
    }), "\n", createVNode($$Team, {
      members: members
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

const url = "/about/eb";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/eb.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/eb.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Content,
    default: Content,
    file,
    frontmatter,
    getHeadings,
    members,
    url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
