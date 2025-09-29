/* empty css                         */
import { a as createComponent, r as renderComponent, b as renderTemplate, c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import 'kleur/colors';
import { g as getConfiguredOrganisms, h as getGroupedInputFields, j as getSchema } from './config_CQtV1zSN.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { O as OrganismMetadataTable } from './OrganismMetadataTable_XPem5HTs.mjs';
import 'clsx';

const OrganismMetadataTableSelector = ({ organisms }) => {
  const [selectedOrganismKey, setSelectedOrganismKey] = useState("");
  const selectedOrganism = organisms.find((o) => o.key === selectedOrganismKey) ?? null;
  const handleOrganismSelect = (event) => {
    setSelectedOrganismKey(event.target.value);
  };
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedOrganismKey(params.get("organism") ?? "");
    };
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedOrganismKey) {
      params.set("organism", selectedOrganismKey);
    } else {
      params.delete("organism");
    }
    const newUrl = window.location.origin + window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [selectedOrganismKey]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "select",
      {
        id: "organism-select",
        value: selectedOrganismKey,
        onChange: handleOrganismSelect,
        className: "border border-gray-300 p-2",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "-- Select an Organism --" }),
          organisms.map((organism) => /* @__PURE__ */ jsx("option", { value: organism.key, children: organism.displayName }, organism.key))
        ]
      }
    ) }),
    selectedOrganism && /* @__PURE__ */ jsx(OrganismMetadataTable, { organism: selectedOrganism })
  ] });
};

const $$MetadataTable = createComponent(($$result, $$props, $$slots) => {
  const configuredOrganisms = getConfiguredOrganisms();
  const organisms = configuredOrganisms.map((organism) => {
    return {
      key: organism.key,
      displayName: organism.displayName,
      metadata: getSchema(organism.key).metadata,
      groupedInputFields: getGroupedInputFields(organism.key, "submit")
    };
  });
  return renderTemplate`${renderComponent($$result, "OrganismTableSelector", OrganismMetadataTableSelector, { "organisms": organisms, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/OrganismMetadataTable/OrganismMetadataTableSelector", "client:component-export": "default" })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/MetadataTable.astro", void 0);

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
  "title": "Metadata format",
  "route": "/"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "metadata-types",
    "text": "Metadata Types"
  }, {
    "depth": 3,
    "slug": "dates",
    "text": "Dates"
  }, {
    "depth": 3,
    "slug": "authors",
    "text": "Authors"
  }, {
    "depth": 2,
    "slug": "overview",
    "text": "Overview"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    h3: "h3",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Here you can find a brief description and example of each field you can include in the metadata file uploaded with your samples.\nMost of these fields are currently optional, but we do have some required fields."
    }), "\n", createVNode(_components.h2, {
      id: "metadata-types",
      children: "Metadata Types"
    }), "\n", createVNode(_components.p, {
      children: "Some fields, like dates, countries and authors, will be standardized so that all entries in the database are easy to process.\nAt the moment, these are the only fields we standardize, and we will keep users updated if that changes in the future."
    }), "\n", createVNode(_components.h3, {
      id: "dates",
      children: "Dates"
    }), "\n", createVNode(_components.p, {
      children: ["Please format dates as YYYY-MM-DD, use XX if unknown, ex: ", createVNode(_components.code, {
        children: "2020-03-XX"
      }), " or ", createVNode(_components.code, {
        children: "2020-XX-XX"
      }), ", please provide at least a year. If you have older sequences for which the date isn’t available, or legal reasons relating to releasing the date, please get in touch via ", createVNode(_components.a, {
        href: "mailto:submission@pathoplexus.org",
        children: "submission@pathoplexus.org"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "authors",
      children: "Authors"
    }), "\n", createVNode(_components.p, {
      children: ["Please format authors as a string where each author is separated using a semi-colon, and a comma is used to separate first names/initials from last name, e.g. ", createVNode(_components.code, {
        children: "last name, first name;"
      }), ". Last name(s) is mandatory, only ASCII alphabetical characters A-Z are allowed. For example: ", createVNode(_components.code, {
        children: "Smith, Anna; Perez, Tom J.; Xu, X.L.;"
      }), " or ", createVNode(_components.code, {
        children: "Xu,;"
      }), " if the first name is unknown."]
    }), "\n", createVNode(_components.h2, {
      id: "overview",
      children: "Overview"
    }), "\n", createVNode($$MetadataTable, {})]
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

const url = "/docs/concepts/metadataformat";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/metadataformat.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/concepts/metadataformat.mdx";
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
