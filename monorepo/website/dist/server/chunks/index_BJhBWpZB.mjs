/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
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
  "title": "About Pathoplexus",
  "order": 1
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "our-boards",
    "text": "Our Boards"
  }, {
    "depth": 3,
    "slug": "loculus",
    "text": "Loculus"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    h3: "h3",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Pathoplexus is a new open-source database designed to enhance the sharing and analysis of human viral pathogen genomic data.\r\nDeveloped in response to the growing need for specialized viral databases, Pathoplexus aims to offer the features needed for the research community to share and explore datasets for viruses of public health importance.\r\nBy leveraging new open-source software, Pathoplexus provides a robust and user-friendly platform for scientists and public health professionals."
    }), "\n", createVNode(_components.p, {
      children: ["One of the key features of Pathoplexus is its ", createVNode(_components.strong, {
        children: "flexible data sharing options"
      }), ".\r\nUsers can choose to share their data openly or with time-limited protections to ensure proper attribution and safeguard their contributions.\r\nAfter a specified period, all data becomes openly accessible through INSDC-member databases.\r\nData on Pathoplexus consists of both data directly submitted to Pathoplexus (which users can choose to keep protected for a period of time, or make open straight away) and data from INSDC-member databases.\r\nPathoplexus offers access to all Pathoplexus’ data to ", createVNode(_components.em, {
        children: "all"
      }), " users, with protected data having some restrictions on use (see our ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ").\r\nThis approach balances the urgency of public health needs with the rights of data generators, ensuring that valuable contributions are recognized and credited appropriately."]
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus integrates ", createVNode(_components.strong, {
        children: "advanced tools for searching, filtering, and accessing sequences"
      }), ", making it easier for users to contextualize and interpret their genomic data.\r\nThe platform combines new submissions with pre-populated, standardized datasets, offering comprehensive background and context for insightful analyses.\r\nResearchers can perform sophisticated searches and analyses, as well as upload and revise their own sequences, through an intuitive website or a well-documented API.\r\nChanges to uploaded sequences are tracked for reproducibility and clarity."]
    }), "\n", createVNode(_components.p, {
      children: ["Our commitment to ", createVNode(_components.strong, {
        children: "transparency and community engagement"
      }), " sets Pathoplexus apart.\r\nAt Pathoplexus, we believe databases are powered by the community that chooses to share sequences with them, so being part of the sequencing community is critical to us.\r\nOur open-source model encourages innovation and community engagement, with all code available on GitHub, while our transparent and diverse governance ensures we stick to our aims and purpose.\r\nWe welcome feedback and contributions from users worldwide.\r\nBy fostering a connected and collaborative environment, Pathoplexus aims to support a more effective and informed response to infectious diseases worldwide."]
    }), "\n", createVNode(_components.p, {
      children: ["We are guided by the ", createVNode(_components.a, {
        href: "/about/governance/pathoplexus-statutes",
        children: "Pathoplexus Statutes"
      }), ", the ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), ",\r\nand our other ", createVNode(_components.a, {
        href: "/about/governance",
        children: "Governance Documents"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "our-boards",
      children: "Our Boards"
    }), "\n", createVNode(_components.p, {
      children: ["See our ", createVNode(_components.a, {
        href: "/about/eb",
        children: "Executive Board"
      }), " and ", createVNode(_components.a, {
        href: "/about/sab",
        children: "Scientific Advisory Boards"
      })]
    }), "\n", createVNode(_components.h3, {
      id: "loculus",
      children: "Loculus"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://github.com/loculus-project/loculus",
        children: "Loculus"
      }), " is the open-source software behind Pathoplexus.\r\nThe software is developed by an international team; you can see more about them on the website above."]
    }), "\n", createVNode(_components.p, {
      children: ["You can see the Loculus Team ", createVNode(_components.a, {
        href: "https://loculus.org/#team",
        children: "here"
      }), "."]
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

const url = "/about";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/index.mdx";
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
