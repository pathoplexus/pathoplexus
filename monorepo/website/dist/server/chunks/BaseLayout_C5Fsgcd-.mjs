import { a as createComponent, d as createAstro, m as maybeRenderHead, r as renderComponent, ah as addAttribute, b as renderTemplate, am as renderHead, e as renderSlot, F as Fragment, al as unescapeHTML } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
/* empty css                         */
import { ToastContainer } from 'react-toastify';
import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { r as routes } from './routes_BftQyUXo.mjs';
import { b as getWebsiteConfig } from './config_CQtV1zSN.mjs';
import { c as cleanOrganism } from './cleanOrganism_Dc4DF_FJ.mjs';
import { g as getAuthUrl } from './getAuthUrl_CP-cK5RK.mjs';
import { c as createBackendClient } from './backendClientFactory_DhWS0NBG.mjs';
import axios from 'axios';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';

const materialSymbolsSearch = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" }) });
const ForwardRef$1 = forwardRef(materialSymbolsSearch);

const AccessionSearchBox = ({ className, onSubmitSuccess, defaultOpen, fullWidth }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(!!defaultOpen);
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);
  function isValidAccession(input) {
    return /^[A-Za-z0-9._-]+$/.test(input);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) {
      setOpen(true);
      setError(null);
      return;
    }
    if (!isValidAccession(v)) {
      setError("Invalid accession format.");
      return;
    }
    setError(null);
    onSubmitSuccess?.();
    window.location.href = routes.sequenceEntryDetailsPage(v);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit,
      className,
      role: "search",
      "aria-label": "Accession search",
      "data-testid": "nav-accession-search-form",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              onClick: () => setOpen(true),
              className: "flex items-center justify-center text-primary-600 hover:text-primary-700 transition-colors",
              "aria-label": open ? "Search" : "Open accession search",
              "data-testid": "nav-accession-search-button",
              children: /* @__PURE__ */ jsx(ForwardRef$1, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "text",
              value,
              onChange: (e) => setValue(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Escape") {
                  setOpen(false);
                }
              },
              onBlur: () => {
                if (!value.trim() && !defaultOpen) {
                  setOpen(false);
                }
              },
              placeholder: "Search by accession",
              className: `input input-bordered input-md text-sm placeholder:text-gray-500 text-gray-900 bg-white focus:border-primary focus:outline-none transition-all duration-200 ease-out ml-2 ` + (open ? `px-3 ${fullWidth ? "w-full" : "w-36 lg:w-48"} opacity-100` : "px-0 w-0 opacity-0 pointer-events-none"),
              "aria-label": "Enter an accession or accession.version",
              "data-testid": "nav-accession-search-input"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-xs mt-1", role: "alert", "data-testid": "nav-accession-search-error", children: error })
      ]
    }
  );
};

const useOffCanvas = (initialIsOpen = false) => {
  const [isOpen, setOpen] = useState(initialIsOpen);
  const open = useCallback(() => {
    document.body.style.overflow = "hidden";
    setOpen(true);
  }, [setOpen]);
  const close = useCallback(() => {
    document.body.style.overflow = "unset";
    setOpen(false);
  }, [setOpen]);
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);
  return { isOpen, open, close, toggle };
};

const bottomNavigationItems = [
  {
    text: "API docs",
    path: routes.apiDocumentationPage()
  },
  {
    text: "Governance",
    path: "/about/governance"
  },
  {
    text: "Funding",
    path: "/about/funding"
  },
  {
    text: "Contact",
    path: "/contact"
  },
  {
    text: "Status",
    path: "https://status.pathoplexus.org/"
  }
];

const extraStaticTopNavigationItems = [
  {
    text: "News",
    path: "/news"
  },
  {
    text: "About",
    path: "/about"
  },
  {
    text: "Docs",
    path: "/docs/"
  }
];
const extraSequenceRelatedTopNavigationItems = (_) => {
  return [];
};

const navigationItems = {
  top: topNavigationItems,
  bottom: bottomNavigationItems
};
function getSequenceRelatedItems(organism) {
  const browseItem = {
    text: "Browse",
    path: organism !== void 0 ? routes.searchPage(organism) : routes.organismSelectorPage("search")
  };
  if (!getWebsiteConfig().enableSubmissionNavigationItem) {
    return [browseItem];
  }
  const submitItem = {
    text: "Submit",
    path: organism !== void 0 ? routes.submissionPageWithoutGroup(organism) : routes.organismSelectorPage("submission")
  };
  return [browseItem, submitItem];
}
function getSeqSetsItems() {
  if (!getWebsiteConfig().enableSeqSets) {
    return [];
  }
  return [
    {
      text: "SeqSets",
      path: routes.seqSetsPage()
    }
  ];
}
function getAccountItems(isLoggedIn, loginUrl, organism) {
  if (!getWebsiteConfig().enableLoginNavigationItem) {
    return [];
  }
  const accountItem = isLoggedIn ? {
    text: "My account",
    path: organism !== void 0 ? routes.userOverviewPage(organism) : routes.userOverviewPage()
  } : {
    text: "Login",
    path: loginUrl
  };
  return [accountItem];
}
function topNavigationItems(organism, isLoggedIn, loginUrl) {
  const sequenceRelatedItems = getSequenceRelatedItems(organism);
  const seqSetsItems = getSeqSetsItems();
  const accountItems = getAccountItems(isLoggedIn, loginUrl, organism);
  return [
    ...sequenceRelatedItems,
    ...extraSequenceRelatedTopNavigationItems(),
    ...seqSetsItems,
    ...extraStaticTopNavigationItems,
    ...accountItems
  ];
}

const OffCanvasOverlay = ({ onClick, className }) => /* @__PURE__ */ jsx("div", { className: `bg-gray-800 bg-opacity-50 fixed inset-0 z-30 ${className ?? ""}`, onClick });

const styledHamburger = `
    .hamburger {
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
        z-index: 1001;
    }
    
    .burger {                     
        width: 2rem;
        height: 0.25rem;
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
    }
    
    .burger1--open {
        transform: rotate(45deg);
    }
    
    .burger1--closed {
        transform: rotate(0);
    }
    
    .burger2--open {
      opacity: 0;
    }
    
    .burger2--closed {
      opacity: 1;
    }
      
    .burger3--open {
      transform: rotate(-45deg);
    }
    
    .burger3--closed {
      transform: rotate(0);
    }
`;
const SandwichIcon = ({ isOpen }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "hamburger", children: [
      /* @__PURE__ */ jsx("div", { className: `burger bg-primary-600 burger1--${isOpen ? "open" : "closed"}` }),
      /* @__PURE__ */ jsx("div", { className: `burger bg-primary-600 burger2--${isOpen ? "open" : "closed"}` }),
      /* @__PURE__ */ jsx("div", { className: `burger bg-primary-600  burger3--${isOpen ? "open" : "closed"}` })
    ] }),
    /* @__PURE__ */ jsx("style", { children: styledHamburger })
  ] });
};

const SandwichMenu = ({ topNavigationItems, gitHubMainUrl, siteName }) => {
  const { isOpen, toggle: toggleMenu, close: closeMenu } = useOffCanvas();
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    !isOpen ? /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute z-50 bg-transparent border-none cursor-pointer",
        onClick: toggleMenu,
        "aria-label": "Open main menu",
        children: /* @__PURE__ */ jsx(SandwichIcon, { isOpen })
      }
    ) : /* @__PURE__ */ jsx(OffCanvasOverlay, { onClick: closeMenu }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed top-0 right-0 bg-white w-64 min-h-screen flex flex-col offCanvasTransform ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute z-50 bg-transparent border-none cursor-pointer right-3 top-4",
              onClick: toggleMenu,
              "aria-label": "Close main menu",
              children: /* @__PURE__ */ jsx(SandwichIcon, { isOpen })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "font-bold p-5 flex flex-col justify-between min-h-screen max-h-screen overflow-y-auto", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "h-10", children: /* @__PURE__ */ jsx("a", { href: "/", children: siteName }) }),
              /* @__PURE__ */ jsx("div", { className: "py-3 pr-2", children: /* @__PURE__ */ jsx(AccessionSearchBox, { defaultOpen: true, fullWidth: true, onSubmitSuccess: closeMenu }) }),
              /* @__PURE__ */ jsx("div", { className: "flex-grow divide-y-2 divide-gray-300 divide-solid border-t-2 border-b-2 border-gray-300 border-solid ", children: topNavigationItems.map(({ text, path }) => /* @__PURE__ */ jsx(OffCanvasNavItem, { text, level: 1, path }, path)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto mb-10", children: [
              /* @__PURE__ */ jsx("div", { className: "flex justify-end items-center py-5", children: /* @__PURE__ */ jsx("a", { href: gitHubMainUrl ?? "https://github.com/loculus-project", children: /* @__PURE__ */ jsx("img", { src: "/github-mark.svg", className: "w-8", alt: "GitHub logo" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "font-light divide-y-2 divide-gray-300 divide-solid border-t-2 border-b-2 border-gray-300 border-solid ", children: navigationItems.bottom.map(({ text, path }) => /* @__PURE__ */ jsx(OffCanvasNavItem, { text, level: 1, path, type: "small" }, path)) })
            ] })
          ] })
        ]
      }
    )
  ] });
};
const OffCanvasNavItem = ({ text, level, path, type }) => {
  const height = type === "small" ? "py-1" : "py-3";
  const indent = {
    1: "ml-4",
    2: "ml-8"
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: `${indent[level]} ${height}`, children: path === false ? text : /* @__PURE__ */ jsxs("a", { href: path, children: [
    " ",
    text
  ] }) }) }) });
};

const $$Astro$2 = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { implicitOrganism, gitHubMainUrl } = Astro2.props;
  const { organism, knownOrganisms } = cleanOrganism(Astro2.params.organism);
  const selectedOrganism = implicitOrganism !== void 0 ? knownOrganisms.find((it) => it.key === implicitOrganism) : organism;
  const siteName = getWebsiteConfig().name;
  const isLoggedIn = Astro2.locals.session?.isLoggedIn ?? false;
  const loginUrl = await getAuthUrl(Astro2.url.toString());
  const topNavigationItems = navigationItems.top(selectedOrganism?.key, isLoggedIn, loginUrl);
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-end relative"> <div class="subtitle hidden lg:flex lg:z-6 gap-4 items-center"> ${renderComponent($$result, "AccessionSearchBox", AccessionSearchBox, { "className": "", "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Navigation/AccessionSearchBox.tsx", "client:component-export": "default" })} ${topNavigationItems.map(({ text, path }) => renderTemplate`<a${addAttribute(path, "href")}>${text}</a>`)} </div> <div class="lg:hidden z-0"${addAttribute({
    position: "absolute",
    right: "1.5rem",
    top: "-2rem"
  }, "style")}> ${renderComponent($$result, "SandwichMenu", SandwichMenu, { "topNavigationItems": topNavigationItems, "gitHubMainUrl": gitHubMainUrl, "siteName": siteName, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Navigation/SandwichMenu.tsx", "client:component-export": "SandwichMenu" })} </div> </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Navigation/Navigation.astro", void 0);

const iwwaArrowDown = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 40 40", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M4.659 11.833h30.682L20 32.167z" }) });
const ForwardRef = forwardRef(iwwaArrowDown);

const $$Astro$1 = createAstro();
const $$OrganismSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OrganismSelector;
  const { knownOrganisms, organism: originalOrganism } = cleanOrganism(Astro2.params.organism);
  const { implicitOrganism } = Astro2.props;
  const foundimplicitOrganism = knownOrganisms.find((knownOrganism) => knownOrganism.key === implicitOrganism);
  const organism = foundimplicitOrganism || originalOrganism;
  const label = organism === void 0 ? "Organisms" : organism.displayName;
  const firstBitOfUrl = Astro2.url.pathname.split("/")[1];
  const isOrganismPage = knownOrganisms.some((knownOrganism) => knownOrganism.key === firstBitOfUrl);
  const isOrganismSelectorPage = firstBitOfUrl === "organism-selector";
  const restOfUrl = Astro2.url.pathname.split("/").slice(2).join("/");
  return renderTemplate`${maybeRenderHead()}<div class="dropdown dropdown-hover flex relative"> <label tabindex="0" class="py-1 block text-primary-1500 cursor-pointer"> ${label} <span class="text-primary"> ${renderComponent($$result, "IwwaArrowDown", ForwardRef, { "className": "inline-block -mt-1 ml-1 h-4 w-4" })}</span> </label> <ul tabindex="0" class="dropdown-content z-20 menu p-1 shadow bg-base-100 rounded-btn absolute top-full -left-4"> ${knownOrganisms.map((knownOrganism) => renderTemplate`<li> <a${addAttribute(
    isOrganismPage || isOrganismSelectorPage ? `/${knownOrganism.key}/${restOfUrl}` : routes.organismStartPage(knownOrganism.key),
    "href"
  )} class="text-primary-1500"> ${knownOrganism.displayName} </a> </li>`)} </ul> </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Navigation/OrganismSelector.astro", void 0);

const Banner = ({ message, lastTimeBannerWasClosed, serverTime }) => {
  const timeToKeepBannerClosed = 1e3 * 60 * 60 * 24;
  if (message === void 0 || lastTimeBannerWasClosed !== void 0 && lastTimeBannerWasClosed + timeToKeepBannerClosed > serverTime) {
    return null;
  }
  const initialClientTime = Date.now();
  const serverClientOffset = serverTime - initialClientTime;
  const setBannerClosed = () => {
    document.cookie = `lastTimeBannerWasClosed=${Date.now() + serverClientOffset}; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 border-b border-gray-400 text-yellow-700 px-4 py-2 opacity-90 flex justify-between", children: [
    /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: message } }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: setBannerClosed,
        className: "text-yellow-700",
        style: {
          fontSize: ".7rem"
        },
        children: "X"
      }
    )
  ] });
};

const logger = getInstanceLogger("bannerMessageService");
let cachedMessage = null;
let lastFetch = 0;
const CACHE_DURATION_MS = 5 * 60 * 1e3;
const REQUEST_TIMEOUT_MS = 3e3;
async function getRemoteBannerMessage() {
  const { bannerMessageURL } = getWebsiteConfig();
  if (!bannerMessageURL) {
    return null;
  }
  const now = Date.now();
  if (cachedMessage === null || now - lastFetch > CACHE_DURATION_MS) {
    try {
      const response = await axios.get(bannerMessageURL, {
        responseType: "text",
        timeout: REQUEST_TIMEOUT_MS
      });
      cachedMessage = typeof response.data === "string" ? response.data.trim() : "";
    } catch (e) {
      logger.error(`Failed to fetch banner message from ${bannerMessageURL}: ${e.message}`);
      cachedMessage = "";
    }
    lastFetch = now;
  }
  return cachedMessage === "" ? null : cachedMessage;
}

const $$Astro = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const websiteConfig = getWebsiteConfig();
  const {
    name: websiteName,
    logo,
    bannerMessage: configBannerMessage,
    additionalHeadHTML,
    gitHubMainUrl
  } = websiteConfig;
  const remoteBannerMessage = await getRemoteBannerMessage();
  const bannerMessage = remoteBannerMessage ?? configBannerMessage;
  const { title, implicitOrganism, noHorizontalPadding } = Astro2.props;
  const backendIsInDebugMode = await createBackendClient().isInDebugMode();
  const lastTimeBannerWasClosed = Astro2.cookies.get("lastTimeBannerWasClosed")?.value;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preload" as="image" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(websiteName + " | " + title, "content")}><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(websiteName + " | " + title, "content")}><title>${title} | ${websiteName}</title>${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(additionalHeadHTML)}` })}${renderHead()}</head> <body> ${backendIsInDebugMode && renderTemplate`<div class="bg-red-500 text-white text-center p-2">Backend is in debug mode</div>`} ${renderComponent($$result, "Banner", Banner, { "message": bannerMessage, "lastTimeBannerWasClosed": lastTimeBannerWasClosed !== void 0 ? parseInt(lastTimeBannerWasClosed, 10) : void 0, "serverTime": Date.now(), "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/common/Banner", "client:component-export": "Banner" })} <div class="flex flex-col min-h-screen w-11/12 mx-auto"> ${renderComponent($$result, "ToastContainer", ToastContainer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "react-toastify", "client:component-export": "ToastContainer" })} <header class="bg-white h-fit z-30"> <nav class="flex justify-between items-center p-4"> <div class="flex justify-start"> <div class="flex flex-col"> <div class="flex flex-row pb-3"> <a href="/"><img class="h-8 mr-4"${addAttribute(logo.url, "src")} alt="icon"${addAttribute({
    aspectRatio: `${logo.width}/${logo.height}`
  }, "style")}></a> <a href="/" class="fancytitle mr-4">${websiteName}</a> </div> ${renderComponent($$result, "OrganismSelector", $$OrganismSelector, { "implicitOrganism": implicitOrganism })} </div> </div> ${renderComponent($$result, "Navigation", $$Navigation, { "implicitOrganism": implicitOrganism, "gitHubMainUrl": gitHubMainUrl })} </nav> <hr class="border-t border-gray-1000"> ${renderSlot($$result, $$slots["banner"])} </header> <div${addAttribute(["flex-grow", "mt-3", "mb-5", noHorizontalPadding === true ? "" : "px-4"], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div> <hr class="border-t border-gray-1000"> <footer class="hidden sm:flex sm:z-6 sm:z-6 flex justify-between items-center h-20"> <div class="flex gap-5"> ${navigationItems.bottom.map(({ text, path }) => renderTemplate`<a${addAttribute(path, "href")} class="text-gray-600"> ${text} </a>`)} </div> <a${addAttribute(gitHubMainUrl !== void 0 ? gitHubMainUrl : "https://github.com/loculus-project", "href")} class="h-full py-6"> <img src="/github-mark.svg" class="h-full object-scale-down" alt="github-icon"> </a> </footer> </div> </body></html>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, ForwardRef as F, OffCanvasOverlay as O, useOffCanvas as u };
