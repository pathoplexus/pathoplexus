/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { F as ForwardRef } from './content-copy-outline_1cwU1GhK.mjs';
import 'clsx';

const CryptoDonationWidget = ({ addresses }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [buttonText, setButtonText] = useState("Copy");
  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addresses[selectedCrypto]);
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 2e3);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "my-3 p-3 border border-gray-200 rounded bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "crypto-select", className: "text-sm text-gray-600", children: "Currency:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "crypto-select",
          value: selectedCrypto,
          onChange: handleCryptoChange,
          className: "px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-400",
          children: [
            /* @__PURE__ */ jsx("option", { value: "btc", children: "BTC" }),
            /* @__PURE__ */ jsx("option", { value: "eth", children: "ETH" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Address:" }),
      /* @__PURE__ */ jsx("code", { className: "flex-1 p-2 bg-white border border-gray-200 rounded text-xs break-all font-mono text-gray-700", children: addresses[selectedCrypto] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleCopyAddress,
          className: "flex items-center gap-1 px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors",
          children: [
            /* @__PURE__ */ jsx(ForwardRef, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: buttonText })
          ]
        }
      )
    ] })
  ] });
};

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
  "title": "Funding"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "support-pathoplexus",
    "text": "Support Pathoplexus"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["To date, Pathoplexus has largely been built with donated resources and time. We are actively seeking funding to drive the platform forward. We are a registered non-profit in Switzerland; if you would like a donation receipt for your taxes, please reach out to ", createVNode(_components.a, {
        href: "mailto:donations@pathoplexus.org",
        children: "donations@pathoplexus.org"
      }), ". Donations do not affect governance or operational decisions."]
    }), "\n", createVNode(_components.h2, {
      id: "support-pathoplexus",
      children: "Support Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: ["We welcome support from both institutions and individuals. For institutional partnerships and major funding opportunities, please contact us at ", createVNode(_components.a, {
        href: "mailto:hello@pathoplexus.org",
        children: "hello@pathoplexus.org"
      }), " to discuss how you could support Pathoplexus and what we could achieve together.  We also welcome donations from individuals. We can accept donations in a number of ways:"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Bank transfer"
      }), " - Our account is based in Switzerland and in Swiss Francs (CHF). If your account is in a different currency, we recommend using ", createVNode(_components.a, {
        href: "https://wise.com/",
        children: "Wise"
      }), "."]
    }), "\n", createVNode("div", {
      class: "bank-details bg-gray-50 p-4 rounded-lg",
      children: [createVNode("span", {
        class: "text-sm font-medium",
        children: "Bank account details"
      }), createVNode("br", {}), createVNode("table", {
        class: "my-3 border-collapse border border-gray-200 rounded-lg",
        children: createVNode("tbody", {
          children: [createVNode("tr", {
            class: "bg-gray-50",
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "Account holder"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs",
              children: "Pathoplexus"
            })]
          }), createVNode("tr", {
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "IBAN"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs font-mono",
              children: "CH18 0023 3233 3422 4101 P"
            })]
          }), createVNode("tr", {
            class: "bg-gray-50",
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "BIC"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs font-mono",
              children: "UBSWCHZH80A"
            })]
          }), createVNode("tr", {
            class: "bg-gray-50",
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "Recipient address"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs",
              children: "Pathoplexus, 4000 Basel, Switzerland"
            })]
          }), createVNode("tr", {
            class: "bg-gray-50",
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "Bank name"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs",
              children: "UBS Switzerland AG"
            })]
          }), createVNode("tr", {
            class: "bg-gray-50",
            children: [createVNode("td", {
              class: "border border-gray-200 px-4 py-2 font-medium text-xs",
              children: "Bank address"
            }), createVNode("td", {
              class: "border border-gray-200 px-4 py-2 text-xs",
              children: "Bahnhofstrasse 45, Zurich, Switzerland"
            })]
          })]
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Cryptocurrency"
      }), " - We accept donations in Bitcoin and Ethereum:"]
    }), "\n", createVNode(CryptoDonationWidget, {
      addresses: {
        btc: "bc1qlh9escc7600jw4z06mmrp6wmus3gy2h5q84ltu",
        eth: "0x353F356bc3885b3D29750708c47dcF9277549cbD"
      },
      "client:load": true,
      "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/CryptoDonationWidget",
      "client:component-export": "CryptoDonationWidget",
      "client:component-hydration": true
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

const url = "/about/funding";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/funding.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/funding.mdx";
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
