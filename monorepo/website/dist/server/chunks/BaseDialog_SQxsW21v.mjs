import { jsxs, jsx } from 'react/jsx-runtime';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import 'react';

const BaseDialog = ({ title, isOpen, onClose, children, fullWidth = true }) => {
  const fullWidthClasses = fullWidth ? "w-full w-max-5xl" : "";
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onClose, className: "relative z-40", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-25" }),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxs(
      DialogPanel,
      {
        className: `${fullWidthClasses} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl`,
        children: [
          /* @__PURE__ */ jsx(DialogTitle, { as: "h3", className: "text-2xl font-bold leading-6 text-gray-900 mb-4", children: title }),
          /* @__PURE__ */ jsx(CloseButton, { onClick: onClose }),
          children
        ]
      }
    ) }) })
  ] });
};
const CloseButton = ({ onClick }) => {
  return /* @__PURE__ */ jsxs("button", { className: "absolute right-2 top-2 text-gray-400 hover:text-gray-500", onClick, children: [
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" }),
    /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
  ] });
};

export { BaseDialog as B };
