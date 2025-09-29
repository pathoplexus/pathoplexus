/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import { $ as $$Team } from './Team_3ri42Dsz.mjs';
import 'clsx';

const mangShi = new Proxy({"src":"/_astro/mangShi-square.CWMHChqE.png","width":285,"height":285,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/mangShi-square.png";
							}
							
							return target[name];
						}
					});

const sofoniasTessema = new Proxy({"src":"/_astro/sofoniasTessema-square.BCP97mnr.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/sofoniasTessema-square.jpg";
							}
							
							return target[name];
						}
					});

const pardisSabeti = new Proxy({"src":"/_astro/pardisSabeti-square.CiJl0DBX.png","width":250,"height":250,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/pardisSabeti-square.png";
							}
							
							return target[name];
						}
					});

const silhouette = new Proxy({"src":"/_astro/silhouette-square.DspVR948.jpg","width":973,"height":973,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/silhouette-square.jpg";
							}
							
							return target[name];
						}
					});

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
  "title": "Scientific Advisory Board",
  "route": "/",
  "order": 3
};
function getHeadings() {
  return [];
}
const members = [{
  name: "Sofonias Tessema",
  description: "Africa CDC",
  picture: sofoniasTessema
}, {
  name: "Pardis Sabeti",
  description: "Broad Institute, Harvard University, HHMI",
  picture: pardisSabeti
}, {
  name: "Mang Shi",
  description: "Sun Yat-sen University",
  picture: mangShi
}, {
  name: "Meera Chand",
  description: "UKHSA",
  picture: silhouette
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["The Pathoplexus Scientific Advisory Board, made up of experts in virus genomics and data sharing, plays a crucial role in providing expert guidance to Pathoplexus decision-making, providing feedback to help ensure that the Pathoplexus database meets the needs of the scientific and public health communities and adheres to the ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), ". By sharing their expertise, the board helps maintain the database as a reliable and transparent resource for pathogen genome sharing."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus recognizes that a diverse and active board is essential for maximizing the database’s positive impact."
    }), "\n", createVNode(_components.p, {
      children: ["The Pathoplexus Scientific Advisory Board is defined and guided by the ", createVNode(_components.a, {
        href: "/about/governance/sab-guidelines",
        children: "Scientific Advisory Board Guidelines"
      }), "."]
    }), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n", createVNode($$Team, {
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

const url = "/about/sab";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/sab.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/sab.mdx";
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
