import { jsxs, jsx } from 'react/jsx-runtime';
import { r as routes } from './routes_BftQyUXo.mjs';
import { F as ForwardRef } from './groups_B9ncEdH9.mjs';

const NeedAGroup = () => /* @__PURE__ */ jsxs("div", { className: "mt-6 message max-w-4xl mx-auto", children: [
  /* @__PURE__ */ jsx(ForwardRef, { className: "w-12 h-12 inline-block mr-2" }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "Sequences can only be submitted to the database by users who are part of a ",
      /* @__PURE__ */ jsx("i", { children: "submitting group" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
      "To submit to the database, please either",
      " ",
      /* @__PURE__ */ jsx("a", { href: routes.createGroup(), className: "underline", children: "create a submitting group" }),
      " ",
      "or ask a group administrator to add you to an existing group."
    ] })
  ] })
] });

export { NeedAGroup as N };
