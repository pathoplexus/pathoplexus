import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { forwardRef } from 'react';
import { F as ForwardRef$1 } from './close_BTgvflS0.mjs';

const materialSymbolsMenu = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" }) });
const ForwardRef = forwardRef(materialSymbolsMenu);

const groupPagesByDirectory = (pages) => {
  const groupedPages = {};
  const indexPages = {};
  pages.forEach((page) => {
    const fileParts = page.file.split("/");
    const fileName = fileParts[fileParts.length - 1];
    const dir = fileParts[fileParts.length - 2];
    if (fileName === "index.mdx") {
      indexPages[dir] = page;
    } else {
      if (!(dir in groupedPages)) {
        groupedPages[dir] = [];
      }
      groupedPages[dir].push(page);
    }
  });
  Object.values(groupedPages).forEach((pages2) => {
    pages2.sort((a, b) => {
      const orderA = a.frontmatter.order ?? Infinity;
      const orderB = b.frontmatter.order ?? Infinity;
      return orderA !== orderB ? orderA - orderB : a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
  });
  return { groupedPages, indexPages };
};
const toTitleCase = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
const MenuItem = ({ page, currentPageUrl }) => /* @__PURE__ */ jsx("li", { className: "border-b border-gray-200 last:border-0", children: /* @__PURE__ */ jsx(
  "a",
  {
    href: page.url,
    className: `block p-4 py-2 sm:py-3 text-primary-600 hover:bg-blue-50 transition-colors duration-150 ease-in-out ${page.url === currentPageUrl ? "font-bold" : ""}`,
    children: page.frontmatter.menuTitle ?? page.frontmatter.title
  }
) });
const MenuSection = ({ dir, pages, indexPage, currentPageUrl }) => /* @__PURE__ */ jsxs("li", { className: "border-b border-gray-200 last:border-0", children: [
  /* @__PURE__ */ jsx("div", { className: "p-4 text-primary-600 font-semibold bg-gray-100", children: indexPage ? /* @__PURE__ */ jsx(
    "a",
    {
      href: indexPage.url,
      className: `block text-primary-600 hover:text-primary-800 ${indexPage.url === currentPageUrl ? "font-bold" : ""}`,
      children: indexPage.frontmatter.title
    }
  ) : toTitleCase(dir.replaceAll("-", " ")) }),
  /* @__PURE__ */ jsx("ul", { className: "list-none m-0 p-0", children: pages.map((page) => /* @__PURE__ */ jsx(MenuItem, { page, currentPageUrl }, page.url)) })
] });
const DocsMenu = ({ docsPages, currentPageUrl, title }) => {
  const { groupedPages, indexPages } = groupPagesByDirectory(docsPages);
  const sortedDirectories = Object.keys(groupedPages).sort((a, b) => {
    const orderA = (a in indexPages ? indexPages[a].frontmatter.order : void 0) ?? Infinity;
    const orderB = (b in indexPages ? indexPages[b].frontmatter.order : void 0) ?? Infinity;
    return orderA - orderB;
  });
  const menuContent = /* @__PURE__ */ jsx("ul", { className: "list-none m-0 p-0", children: sortedDirectories.map((dir) => /* @__PURE__ */ jsx(
    MenuSection,
    {
      dir,
      pages: groupedPages[dir],
      indexPage: indexPages[dir],
      currentPageUrl
    },
    dir
  )) });
  return /* @__PURE__ */ jsx(Disclosure, { as: "nav", className: "docs-menu bg-white border rounded-lg overflow-hidden mt-5 sticky sm:min-w-64", children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-gray-100", children: [
      /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-primary-600", children: title }),
      /* @__PURE__ */ jsx("div", { className: "sm:hidden", children: /* @__PURE__ */ jsx(DisclosureButton, { className: "text-primary-600 hover:text-primary-800 focus:outline-none", children: open ? /* @__PURE__ */ jsx(ForwardRef$1, { className: "w-6 h-6", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ForwardRef, { className: "w-6 h-6", "aria-hidden": "true" }) }) })
    ] }),
    /* @__PURE__ */ jsx(DisclosurePanel, { className: "sm:hidden", children: menuContent }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block sm:w-64", children: menuContent })
  ] }) });
};

export { DocsMenu as D };
