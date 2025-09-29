import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';

const materialSymbolsErrorOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" }) });
const ForwardRef$1 = forwardRef(materialSymbolsErrorOutline);

const materialSymbolsWarningOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M1 21L12 2l11 19zm3.45-2h15.1L12 6zM12 18q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2zm1-2.5" }) });
const ForwardRef = forwardRef(materialSymbolsWarningOutline);

const ErrorBox = ({ title, children, level = "error" }) => {
  const alertClass = `my-8 alert ${level === "error" ? "alert-error" : "alert-warning"}`;
  return /* @__PURE__ */ jsxs("div", { className: alertClass, children: [
    level === "error" && /* @__PURE__ */ jsx(ForwardRef$1, {}),
    level === "warning" && /* @__PURE__ */ jsx(ForwardRef, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid-flow-row", children: [
      title !== void 0 && /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: title }),
      children
    ] })
  ] });
};

export { ErrorBox as E };
