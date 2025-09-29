import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { r as routes } from './routes_BftQyUXo.mjs';
import { F as ForwardRef } from './BaseLayout_C5Fsgcd-.mjs';

const OrganismMetadataTable = ({ organism }) => {
  const [expandedHeaders, setExpandedHeaders] = useState(
    new Set(Array.from(organism.groupedInputFields.keys()))
  );
  const toggleHeader = (header) => {
    const updatedExpandedHeaders = new Set(expandedHeaders);
    if (updatedExpandedHeaders.has(header)) {
      updatedExpandedHeaders.delete(header);
    } else {
      updatedExpandedHeaders.add(header);
    }
    setExpandedHeaders(updatedExpandedHeaders);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: organism.displayName }),
    /* @__PURE__ */ jsxs("div", { children: [
      "You can download all metadata fields and their descriptions here:",
      " ",
      /* @__PURE__ */ jsx("a", { href: routes.metadataOverview(organism.key), className: "text-primary-700  opacity-90", children: "metadata_fields_descriptions.csv" })
    ] }),
    Array.from(organism.groupedInputFields.entries()).map(([header, fields]) => /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 cursor-pointer", onClick: () => toggleHeader(header), children: [
        header,
        /* @__PURE__ */ jsx(ForwardRef, { className: "inline-block -mt-1 ml-1 h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `transition-all duration-300 ${expandedHeaders.has(header) ? "block" : "sr-only"}`,
          "data-table-header": header,
          children: /* @__PURE__ */ jsx(MetadataTable, { fields, metadata: organism.metadata })
        }
      )
    ] }, header))
  ] });
};
const MetadataTable = ({ fields, metadata }) => {
  return /* @__PURE__ */ jsxs("table", { className: "table-auto border-collapse border border-gray-200 w-full", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 w-[25%]", children: "Field Name" }),
      /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 w-[13%]", children: "Type" }),
      /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 w-[37%]", children: "Description" }),
      /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 w-[25%]", children: "Example" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: fields.map((field) => {
      const metadataEntry = metadata.find((meta) => meta.name === field.name);
      return /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-4 py-2", children: field.name }),
        /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-4 py-2", children: metadataEntry?.type ?? "String" }),
        /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-4 py-2", children: `${field.definition ?? ""} ${field.guidance ?? ""}` }),
        /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-4 py-2", children: field.example ?? "" })
      ] }, field.name);
    }) })
  ] });
};

export { OrganismMetadataTable as O };
