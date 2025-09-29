import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useMemo, useEffect } from 'react';

function splitString(s, maxLength) {
  const numSubStrings = Math.ceil(s.length / maxLength);
  const splitLines = [];
  for (let i = 0; i < numSubStrings; i++) {
    const start = i * maxLength;
    const end = start + maxLength;
    splitLines.push(s.slice(start, end));
  }
  return splitLines;
}

const FixedLengthTextViewer = ({ text, maxLineLength, header }) => {
  const textArea = useRef(null);
  const lineNumbersArea = useRef(null);
  const { formattedText, lineNumbers } = useMemo(() => {
    const lines = splitString(text, maxLineLength);
    const lineNumbering = [];
    for (let i = 0; i <= lines.length - 1; i++) {
      lineNumbering.push(i * maxLineLength + 1);
    }
    if (header !== void 0) {
      lines.unshift(header);
      lineNumbering.unshift("");
    }
    const formattedText2 = lines.join("\n");
    const lineNumbers2 = lineNumbering.join("\n");
    return { formattedText: formattedText2, lineNumbers: lineNumbers2 };
  }, [text, maxLineLength, header]);
  useEffect(() => {
    if (textArea.current === null || lineNumbersArea.current === null) {
      return;
    }
    textArea.current.style.height = `${textArea.current.scrollHeight + 4}px`;
    lineNumbersArea.current.style.height = `${textArea.current.scrollHeight + 4}px`;
  }, [formattedText]);
  const lineSpacing = "leading-6";
  return /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx(
      "textarea",
      {
        readOnly: true,
        value: lineNumbers,
        className: `flex-none w-20 h-full text-right text-gray-500 border-none  resize-none select-none  border-r border-gray-100  ${lineSpacing} p-0 font-mono `,
        style: { pointerEvents: "none" },
        ref: lineNumbersArea
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        readOnly: true,
        value: formattedText,
        "data-testid": "fixed-length-text-viewer",
        className: `font-mono resize-none select-none h-content flex-grow whitespace-pre bg-transparent border-0 focus:outline-none focus:ring-0 ${lineSpacing} p-0 pl-3 text-gray-800`,
        ref: textArea
      }
    )
  ] });
};

const BoxWithTabsTabBar = ({ children }) => /* @__PURE__ */ jsx("div", { className: "tabs -mb-px tabs-lifted flex flex-wrap", children });
const BoxWithTabsTab = ({ isActive, label, onClick }) => /* @__PURE__ */ jsx("button", { className: `tab ${isActive ? "tab-active font-semibold" : ""}`, onClick, children: label });
const BoxWithTabsBox = ({ children }) => /* @__PURE__ */ jsx("div", { className: "border p-4", children });

export { BoxWithTabsTabBar as B, FixedLengthTextViewer as F, BoxWithTabsTab as a, BoxWithTabsBox as b };
