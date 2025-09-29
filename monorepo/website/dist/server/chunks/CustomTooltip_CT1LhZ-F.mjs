import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const mdiClockOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" }) });
const ForwardRef = forwardRef(mdiClockOutline);

const getLastApprovalTimeKey = (organism) => organism + "lastApprovalTime";
const RecentSequencesBanner = ({ organism }) => {
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const checkApprovalTime = () => {
      const lastApproveTimeString = localStorage.getItem(getLastApprovalTimeKey(organism));
      if (lastApproveTimeString === null) {
        setShowBanner(false);
        return;
      }
      const lastApprovalTime = parseInt(lastApproveTimeString, 10);
      const currentTime = Math.floor(Date.now() / 1e3);
      const tenMinutes = 10 * 60;
      setShowBanner(currentTime - lastApprovalTime <= tenMinutes);
    };
    checkApprovalTime();
    const intervalId = setInterval(checkApprovalTime, 1e4);
    return () => clearInterval(intervalId);
  }, [organism]);
  if (!showBanner) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-green-100 text-center p-4 text-green-800  rounded border-green-600 border mb-4 opacity-70", children: [
    /* @__PURE__ */ jsx(ForwardRef, { className: "inline-block mr-2" }),
    "You recently approved new sequences for release. Sequences take time to load into the database and so it may be several minutes before they appear here."
  ] });
};

const CustomTooltip = ({ className, ...props }) => (
  // Set positionStrategy and z-index to make the Tooltip float above the ReviewPage toolbar
  /* @__PURE__ */ jsx(
    Tooltip,
    {
      positionStrategy: "fixed",
      place: "right",
      className: `z-20 max-w-sm whitespace-pre-wrap break-words ${className ?? ""}`,
      ...props
    }
  )
);

export { CustomTooltip as C, RecentSequencesBanner as R, getLastApprovalTimeKey as g };
