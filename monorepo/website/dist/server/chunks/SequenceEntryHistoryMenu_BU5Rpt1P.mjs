import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import React__default, { useState, useMemo, useRef, Fragment as Fragment$1, forwardRef, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { DateTime, FixedOffsetZone } from 'luxon';
import { U as restrictedDataUseTermsOption, o as getLapisUrl, Q as DATA_USE_TERMS_FIELD, W as getGitHubReportUrl, X as getLatestAccessionVersion, v as versionStatuses } from './config_CQtV1zSN.mjs';
import { Menu, MenuButton, MenuItems, MenuItem, Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { F as ForwardRef$4 } from './BaseLayout_C5Fsgcd-.mjs';
import './types_XQo49VFf.mjs';
import { F as ForwardRef$6 } from './close_BTgvflS0.mjs';
import { F as ForwardRef$5 } from './info-outline_DvO6qTrv.mjs';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { r as routes } from './routes_BftQyUXo.mjs';
import { b as backendClientHooks, l as lapisClientHooks, u as unalignedSequenceSegment, i as isUnalignedSequence, a as isAlignedSequence, c as isGeneSequence, d as alignedSequenceSegment, g as geneSequence } from './serviceHooks_DslcN1kS.mjs';
import { a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';
import { s as stringifyMaybeAxiosError } from './stringifyMaybeAxiosError_D1gzvjBG.mjs';
import { w as withQueryProvider } from './withQueryProvider_BqTp-ccD.mjs';
import { noCase } from 'change-case';
import { F as FixedLengthTextViewer, B as BoxWithTabsTabBar, a as BoxWithTabsTab, b as BoxWithTabsBox } from './BoxWithTabs_BpozTDUW.mjs';
import { D as DataUseTermsSelector } from './DataUseTermsSelector_D8ph774s.mjs';
import { E as ErrorBox } from './ErrorBox_Du3rMPgb.mjs';
import { g as getAccessionVersionString } from './extractAccessionVersion_CIVou_Oi.mjs';
import { g as getVersionStatusLabel, a as getVersionStatusColor } from './getVersionStatusColor_CfRIEGJ4.mjs';

const DEFAULT_AT_LEAST_VISIBLE = 25;
const NUMBER_VISIBLE_LAST_AUTHORS = 1;
const AuthorList = ({ authors }) => {
  const [showMore, setShowMore] = useState(false);
  const data = useMemo(() => {
    if (authors.length <= DEFAULT_AT_LEAST_VISIBLE + 3) {
      return {
        showMoreNeeded: false
      };
    }
    return {
      showMoreNeeded: true,
      beforeEllipsis: authors.slice(0, DEFAULT_AT_LEAST_VISIBLE - NUMBER_VISIBLE_LAST_AUTHORS),
      afterEllipsis: authors.slice(authors.length - NUMBER_VISIBLE_LAST_AUTHORS, authors.length)
    };
  }, [authors]);
  let authorsElements;
  if (!data.showMoreNeeded || showMore) {
    authorsElements = authors.map((author, index) => /* @__PURE__ */ jsxs("span", { children: [
      author,
      index === authors.length - 2 ? " & " : index !== authors.length - 1 ? ", " : ""
    ] }, index));
  } else {
    authorsElements = /* @__PURE__ */ jsxs(Fragment, { children: [
      data.beforeEllipsis.map((author, index) => /* @__PURE__ */ jsxs("span", { children: [
        author,
        ", "
      ] }, index)),
      /* @__PURE__ */ jsx("span", { children: "..., " }),
      data.afterEllipsis.map((author, index) => /* @__PURE__ */ jsxs("span", { children: [
        author,
        index === data.afterEllipsis.length - 2 ? " & " : index !== data.afterEllipsis.length - 1 ? ", " : ""
      ] }, index))
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    authorsElements,
    data.showMoreNeeded && /* @__PURE__ */ jsx("button", { onClick: () => setShowMore(!showMore), className: "ml-2 underline", children: showMore ? "Show less" : "Show more" })
  ] });
};

const DataUseTermsHistoryModal = ({ dataUseTermsHistory }) => {
  const dialogRef = useRef(null);
  const handleOpenHistoryDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("dialog", { ref: dialogRef, className: "modal", children: /* @__PURE__ */ jsx(DataUseTermsHistoryDialog, { dataUseTermsHistory }) }),
    /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("button", { className: "underline", onClick: handleOpenHistoryDialog, children: "(history)" }) })
  ] });
};
const DataUseTermsHistoryDialog = ({ dataUseTermsHistory }) => {
  const formatDate = (dateString) => DateTime.fromISO(dateString, { zone: FixedOffsetZone.utcInstance }).setLocale("en").toFormat("yyyy-MM-dd T");
  return /* @__PURE__ */ jsxs("div", { className: "modal-box w-auto max-w-md", children: [
    /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", children: "✕" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Data use terms history" }),
    /* @__PURE__ */ jsxs("table", { className: "table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Changed" }),
        /* @__PURE__ */ jsx("th", { children: "User" }),
        /* @__PURE__ */ jsx("th", { children: "Data use terms" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: dataUseTermsHistory.map((row, index) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: formatDate(row.changeDate) }),
        /* @__PURE__ */ jsx("td", { children: row.userName }),
        /* @__PURE__ */ jsxs("td", { children: [
          row.dataUseTerms.type,
          row.dataUseTerms.type === restrictedDataUseTermsOption ? " until " + row.dataUseTerms.restrictedUntil : ""
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-4 mt-4", children: /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn", children: "Close" }) }) })
  ] });
};

const LinkWithMenuComponent = ({ value, linkMenuItems }) => {
  if (linkMenuItems.length === 0) {
    return /* @__PURE__ */ jsx("span", { children: value });
  }
  const primaryLink = linkMenuItems[0];
  const hasMultipleLinks = linkMenuItems.length > 1;
  const generateUrl = (urlTemplate) => {
    return urlTemplate.replace("__value__", value.toString());
  };
  if (!hasMultipleLinks) {
    return /* @__PURE__ */ jsx("a", { href: generateUrl(primaryLink.url), target: "_blank", rel: "noopener noreferrer", className: "underline", children: value });
  }
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center", children: [
    /* @__PURE__ */ jsx("a", { href: generateUrl(primaryLink.url), target: "_blank", rel: "noopener noreferrer", className: "underline", children: value }),
    /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative inline-block text-left ml-1", children: [
      /* @__PURE__ */ jsx(MenuButton, { className: "inline-flex items-center p-1 text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(ForwardRef$4, { className: "h-3 w-3", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx(MenuItems, { className: "absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: linkMenuItems.map((linkItem) => /* @__PURE__ */ jsx(MenuItem, { children: ({ focus }) => /* @__PURE__ */ jsx(
        "a",
        {
          href: generateUrl(linkItem.url),
          target: "_blank",
          rel: "noopener noreferrer",
          className: `
                                            ${focus ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                                            block px-4 py-2 text-sm
                                        `,
          children: linkItem.name
        }
      ) }, linkItem.name)) }) })
    ] })
  ] });
};

const SubBadge = ({ position, mutationTo, mutationFrom, sequenceName }) => {
  return /* @__PURE__ */ jsx("li", { className: "inline-block", children: /* @__PURE__ */ jsxs("span", { className: "rounded-[3px] font-mono text-xs overflow-auto", children: [
    sequenceName === null ? /* @__PURE__ */ jsx("span", { className: "px-[4px] py-[2px] rounded-s-[3px]", style: { background: getColor(mutationFrom) }, children: mutationFrom }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("span", { className: "px-[4px] py-[2px] rounded-s-[3px] bg-gray-200", children: [
        sequenceName,
        ":"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "px-[4px] py-[2px]", style: { background: getColor(mutationFrom) }, children: mutationFrom })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "px-[4px] py-[2px] bg-gray-200", children: position }),
    /* @__PURE__ */ jsx("span", { className: "px-[4px] py-[2px] rounded-e-[3px]", style: { background: getColor(mutationTo) }, children: mutationTo })
  ] }) }, position);
};
const COLORS = {
  "A": "#db8070",
  "C": "#859dfc",
  "G": "#c2b553",
  "T": "#7fbb81",
  "V": "#e5e57c",
  "L": "#e5e550",
  "I": "#e5e514",
  "B": "#e54c4c",
  "D": "#e5774e",
  "E": "#e59c6c",
  "F": "#e2e54d",
  "H": "#9ddde5",
  "K": "#b4a2e5",
  "M": "#b7e525",
  "N": "#e57875",
  "P": "#b6b5e5",
  "Q": "#e5aacd",
  "R": "#878fe5",
  "S": "#e583d8",
  "W": "#4aa7e5",
  "X": "#aaaaaa",
  "Y": "#57cfe5",
  "Z": "#777777",
  "*": "#777777",
  "-": "#444444"
};
function getColor(code) {
  return COLORS[code] ?? COLORS.X;
}
const MAX_INITIAL_NUMBER_BADGES = 20;
const SubstitutionsContainers = ({ values }) => {
  return values.map(({ segment, mutations }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "py-1 my-1 font-semibold border-b", children: segment }),
    /* @__PURE__ */ jsx(SubstitutionsContainer, { values: mutations })
  ] }, segment));
};
const SubstitutionsContainer = ({ values }) => {
  const [showMore, setShowMore] = useState(false);
  const { alwaysVisible, initiallyHidden } = useMemo(() => {
    let alwaysVisible2 = [];
    let initiallyHidden2 = [];
    const elements = values.map(({ mutationFrom, mutationTo, position, sequenceName }, index) => /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx(
        SubBadge,
        {
          sequenceName,
          mutationFrom,
          position,
          mutationTo
        }
      ),
      " "
    ] }, index));
    if (elements.length <= MAX_INITIAL_NUMBER_BADGES) {
      alwaysVisible2 = elements;
    } else {
      alwaysVisible2 = elements.slice(0, MAX_INITIAL_NUMBER_BADGES - 2);
      initiallyHidden2 = elements.slice(MAX_INITIAL_NUMBER_BADGES - 2);
    }
    return { alwaysVisible: alwaysVisible2, initiallyHidden: initiallyHidden2 };
  }, [values]);
  return /* @__PURE__ */ jsxs("div", { children: [
    alwaysVisible,
    initiallyHidden.length > 0 && (showMore ? /* @__PURE__ */ jsxs(Fragment, { children: [
      initiallyHidden,
      /* @__PURE__ */ jsx("button", { onClick: () => setShowMore(false), className: "underline", children: "Show less" })
    ] }) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setShowMore(true);
        },
        className: "underline",
        children: "Show more"
      }
    ))
  ] });
};

const GroupComponent = ({ jsonString }) => {
  const values = JSON.parse(jsonString);
  const groupId = values.find((value) => value.name === "groupId")?.value;
  const groupName = values.find((value) => value.name === "groupName")?.value;
  return /* @__PURE__ */ jsx("a", { href: `/group/${groupId}`, className: "underline", children: groupName });
};
const FileListComponent = ({ jsonString }) => {
  const fileEntries = JSON.parse(jsonString);
  return /* @__PURE__ */ jsx("ul", { children: fileEntries.map((fileEntry) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: fileEntry.url, className: "underline", children: fileEntry.name }) }, fileEntry.fileId)) });
};
const CustomDisplayComponent = ({ data, dataUseTermsHistory }) => {
  const { value, customDisplay } = data;
  return /* @__PURE__ */ jsx("div", { className: "whitespace-normal text-gray-600 break-inside-avoid", children: /* @__PURE__ */ jsxs("div", { children: [
    !customDisplay && /* @__PURE__ */ jsx(PlainValueDisplay, { value }),
    customDisplay?.type === "percentage" && typeof value === "number" && `${(100 * value).toFixed(2)}%`,
    customDisplay?.type === "badge" && (customDisplay.value === void 0 ? /* @__PURE__ */ jsx("span", { className: "italic", children: "N/A" }) : /* @__PURE__ */ jsx(SubstitutionsContainers, { values: customDisplay.value })),
    customDisplay?.type === "link" && customDisplay.url !== void 0 && /* @__PURE__ */ jsx(
      "a",
      {
        href: customDisplay.url.replace("__value__", value.toString()),
        target: "_blank",
        className: "underline",
        children: value
      }
    ),
    customDisplay?.type === "linkWithMenu" && customDisplay.linkMenuItems !== void 0 && /* @__PURE__ */ jsx(LinkWithMenuComponent, { value, linkMenuItems: customDisplay.linkMenuItems }),
    customDisplay?.type === "htmlTemplate" && customDisplay.html !== void 0 && /* eslint-disable @typescript-eslint/naming-convention */
    /* @__PURE__ */ jsx(
      "div",
      {
        dangerouslySetInnerHTML: { __html: generateCleanHtml(customDisplay.html, value.toString()) }
      }
    ),
    customDisplay?.type === "dataUseTerms" && /* @__PURE__ */ jsxs(Fragment, { children: [
      value,
      " ",
      /* @__PURE__ */ jsx(DataUseTermsHistoryModal, { dataUseTermsHistory })
    ] }),
    customDisplay?.type === "submittingGroup" && typeof value == "string" && /* @__PURE__ */ jsx(GroupComponent, { jsonString: value }),
    customDisplay?.type === "fileList" && typeof value == "string" && /* @__PURE__ */ jsx(FileListComponent, { jsonString: value })
  ] }) });
};
const MAX_PLAIN_STRING_LENGTH = 400;
const SHOW_MORE_LENGTH = 10;
const computePreviewString = (value) => {
  const searchStart = MAX_PLAIN_STRING_LENGTH - 50;
  const searchEnd = MAX_PLAIN_STRING_LENGTH - 3 - SHOW_MORE_LENGTH;
  const commaIndex = Math.max(value.lastIndexOf(",", searchEnd), value.lastIndexOf(";", searchEnd));
  if (commaIndex >= searchStart) {
    return value.slice(0, commaIndex + 1).trim();
  }
  const spaceIndex = value.lastIndexOf(" ", searchEnd);
  if (spaceIndex >= searchStart) {
    return value.slice(0, spaceIndex).trim();
  }
  return value.slice(0, searchEnd).trim();
};
const PlainValueDisplay = ({ value }) => {
  const [showMore, setShowMore] = React__default.useState(false);
  const preview = React__default.useMemo(() => {
    if (typeof value === "string" && value.length > MAX_PLAIN_STRING_LENGTH) {
      return computePreviewString(value);
    }
    return null;
  }, [value]);
  if (typeof value === "boolean") {
    return /* @__PURE__ */ jsx("span", { children: value ? "True" : "False" });
  }
  if (preview) {
    return /* @__PURE__ */ jsxs("span", { children: [
      showMore ? value : `${preview}...`,
      " ",
      /* @__PURE__ */ jsx("button", { onClick: () => setShowMore(!showMore), className: `underline${showMore ? " block" : ""}`, children: showMore ? "Show less" : "Show more" })
    ] });
  }
  if (value !== "") {
    return value;
  }
  return /* @__PURE__ */ jsx("span", { className: "italic", children: "None" });
};
const generateCleanHtml = (trustedHtml, userValue) => {
  const cleanedValue = sanitizeHtml(userValue, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "escape"
  });
  return trustedHtml.replace("__value__", cleanedValue);
};

const DataTableComponent$1 = ({ data, dataUseTermsHistory }) => {
  const { label, type } = data;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    type.kind === "metadata" && /* @__PURE__ */ jsxs("div", { className: "text-sm grid my-1", style: { gridTemplateColumns: "200px 1fr" }, children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 break-inside-avoid pr-4", children: label }),
      /* @__PURE__ */ jsx(CustomDisplayComponent, { data, dataUseTermsHistory })
    ] }),
    type.kind === "mutation" && /* @__PURE__ */ jsxs("div", { className: "text-sm my-1", children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 break-inside-avoid py-2", children: label }),
      /* @__PURE__ */ jsx(CustomDisplayComponent, { data, dataUseTermsHistory })
    ] })
  ] });
};

const ReferenceLink = ({ accession }) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://www.ncbi.nlm.nih.gov/nuccore/__value__".replace("__value__", accession),
      target: "_blank",
      className: "underline text-primary-600 hover:text-primary-500",
      children: accession
    }
  );
};
const ReferenceSequenceLinkButton = ({ reference }) => {
  const [isOpen, setIsOpen] = React__default.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const isMultiSegmented = reference.length > 1;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: openDialog, className: "text-gray-400 hover:text-primary-600 ", children: /* @__PURE__ */ jsx(ForwardRef$5, { className: "inline-block h-6 w-5" }) }),
    /* @__PURE__ */ jsx(Transition, { appear: true, show: isOpen, as: Fragment$1, children: /* @__PURE__ */ jsxs(Dialog, { as: "div", className: "relative z-40", onClose: closeDialog, children: [
      /* @__PURE__ */ jsx(
        TransitionChild,
        {
          as: Fragment$1,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-25" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsx(
        TransitionChild,
        {
          as: Fragment$1,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: /* @__PURE__ */ jsxs(DialogPanel, { className: "w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all", children: [
            /* @__PURE__ */ jsx(DialogTitle, { as: "h3", className: "font-bold text-2xl mb-4 text-primary-700", children: "Reference sequence" }),
            /* @__PURE__ */ jsx("button", { className: "absolute right-2 top-2 p-1", onClick: closeDialog, children: /* @__PURE__ */ jsx(ForwardRef$6, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-4", children: reference.filter((item) => item.insdcAccessionFull !== void 0).length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                "Alignment and Mutation metrics use the following INSDC reference sequence",
                reference.length > 1 ? "s: " : ": "
              ] }),
              /* @__PURE__ */ jsx("table", { className: "ml-5 mt-2", children: /* @__PURE__ */ jsx("tbody", { children: reference.map(
                (currElement, index) => currElement.insdcAccessionFull !== void 0 && /* @__PURE__ */ jsxs("tr", { children: [
                  isMultiSegmented && /* @__PURE__ */ jsxs("td", { className: "px-2 font-medium", children: [
                    currElement.name,
                    ":"
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-2", children: /* @__PURE__ */ jsx(
                    ReferenceLink,
                    {
                      accession: currElement.insdcAccessionFull
                    }
                  ) })
                ] }, index)
              ) }) })
            ] }) })
          ] })
        }
      ) }) })
    ] }) })
  ] });
};

function formatAuthorName(author) {
  const parts = author.split(",").map((x) => x.trim());
  if (parts.length >= 2) {
    return `${parts[1]} ${parts[0]}`.trim();
  }
  return author.trim();
}
function grouping(listTableDataEntries) {
  const result = [];
  const groupedEntries = /* @__PURE__ */ new Map();
  for (const entry of listTableDataEntries) {
    if (entry.customDisplay?.displayGroup !== void 0) {
      if (!groupedEntries.has(entry.customDisplay.displayGroup)) {
        groupedEntries.set(entry.customDisplay.displayGroup, []);
        result.push({
          name: entry.customDisplay.displayGroup,
          type: {
            kind: "metadata",
            metadataType: "string"
          },
          value: "[]",
          header: entry.header,
          customDisplay: entry.customDisplay,
          label: entry.label,
          orderOnDetailsPage: entry.orderOnDetailsPage
        });
      }
      groupedEntries.get(entry.customDisplay.displayGroup).push(entry);
    } else {
      result.push(entry);
    }
  }
  return result.map((entry) => {
    if (groupedEntries.has(entry.name)) {
      return {
        ...entry,
        value: JSON.stringify(groupedEntries.get(entry.name))
      };
    }
    return entry;
  });
}
function getDataTableData(listTableDataEntries) {
  const result = {
    topmatter: {
      authors: void 0,
      sequenceDisplayName: void 0
    },
    table: []
  };
  const listTableDataEntriesAfterGrouping = grouping(listTableDataEntries);
  const tableHeaderMap = /* @__PURE__ */ new Map();
  for (const entry of listTableDataEntriesAfterGrouping) {
    if (result.topmatter.authors === void 0 && entry.type.kind === "metadata" && entry.type.metadataType === "authors") {
      result.topmatter.authors = entry.value.toString().split(";").filter((x) => x.trim().length > 0).map(formatAuthorName);
      continue;
    }
    if (result.topmatter.sequenceDisplayName === void 0 && entry.type.kind === "metadata" && entry.name === "displayName") {
      result.topmatter.sequenceDisplayName = entry.value.toString();
      continue;
    }
    if (entry.type.kind === "metadata" && entry.name.startsWith("length") && entry.value === 0) {
      continue;
    }
    if (!tableHeaderMap.has(entry.header)) {
      tableHeaderMap.set(entry.header, []);
    }
    tableHeaderMap.get(entry.header).push(entry);
  }
  const headerGroups = [];
  for (const [header, rows] of tableHeaderMap.entries()) {
    rows.sort(
      (a, b) => (a.orderOnDetailsPage ?? Number.POSITIVE_INFINITY) - (b.orderOnDetailsPage ?? Number.POSITIVE_INFINITY)
    );
    const definedOrders = rows.map((r) => r.orderOnDetailsPage).filter((o) => o !== void 0);
    const meanOrder = definedOrders.length > 0 ? definedOrders.reduce((sum, o) => sum + o, 0) / definedOrders.length : Number.POSITIVE_INFINITY;
    headerGroups.push({ header, rows, meanOrder });
  }
  headerGroups.sort((a, b) => a.meanOrder - b.meanOrder);
  result.table = headerGroups.map(({ header, rows }) => ({ header, rows }));
  return result;
}

const riInformationLine = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16M11 7h2v2h-2zm0 4h2v6h-2z" }) });
const ForwardRef$3 = forwardRef(riInformationLine);

const ReferenceDisplay = ({ reference }) => {
  const refLength = reference.length;
  return reference.map((ref, index) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "underline hover:text-primary-500",
        target: "_blank",
        href: `https://www.ncbi.nlm.nih.gov/nuccore/${ref.insdcAccessionFull}`,
        children: ref.insdcAccessionFull
      }
    ),
    index < refLength - 2 ? ", " : index === refLength - 2 ? " & " : ""
  ] }, index));
};
const DataTableComponent = ({ dataTableData, dataUseTermsHistory, reference }) => {
  const hasReferenceAccession = reference.filter((item) => item.insdcAccessionFull !== void 0).length > 0;
  return /* @__PURE__ */ jsxs("div", { children: [
    dataTableData.topmatter.sequenceDisplayName !== void 0 && /* @__PURE__ */ jsxs("div", { className: "pr-6 mb-4 italic", children: [
      "Display Name: ",
      dataTableData.topmatter.sequenceDisplayName
    ] }),
    dataTableData.topmatter.authors !== void 0 && dataTableData.topmatter.authors.length > 0 && /* @__PURE__ */ jsx("div", { className: "pr-6 mb-4", children: /* @__PURE__ */ jsx(AuthorList, { authors: dataTableData.topmatter.authors }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "grid gap-x-6",
        style: { gridTemplateColumns: "repeat(auto-fill, minmax(min(100vw, 32rem), 1fr))" },
        children: dataTableData.table.map(({ header, rows }) => /* @__PURE__ */ jsxs("div", { className: "p-4 pl-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row", children: [
            /* @__PURE__ */ jsx("h1", { className: "py-2 text-lg font-semibold border-b mr-2", children: header }),
            hasReferenceAccession && header.includes("Alignment") && /* @__PURE__ */ jsx(ReferenceSequenceLinkButton, { reference })
          ] }),
          hasReferenceAccession && header.includes("mutation") && /* @__PURE__ */ jsxs("h2", { className: "pt-2 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx(ForwardRef$3, { className: "inline-block h-4 w-4 mr-1 -mt-0.5" }),
            "Mutations called relative to the ",
            /* @__PURE__ */ jsx(ReferenceDisplay, { reference }),
            " reference",
            reference.length > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: rows.map((entry, index) => /* @__PURE__ */ jsx(DataTableComponent$1, { data: entry, dataUseTermsHistory }, index)) })
        ] }, header))
      }
    )
  ] });
};

const InnerRevokeButton = ({
  organism,
  accessToken,
  clientConfig,
  accessionVersion,
  groupId
}) => {
  const hooks = backendClientHooks(clientConfig);
  const useRevokeSequenceEntries = hooks.useRevokeSequences(
    {
      headers: createAuthorizationHeader(accessToken),
      params: { organism }
    },
    {
      onSuccess: () => {
        document.location = routes.userSequenceReviewPage(organism, groupId);
      },
      onError: (error) => toast.error(getRevokeSequenceEntryErrorMessage(error), {
        position: "top-center",
        autoClose: false
      })
    }
  );
  const handleRevokeSequenceEntry = (inputValue) => {
    useRevokeSequenceEntries.mutate({ accessions: [accessionVersion], versionComment: inputValue });
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "btn btn-sm  bg-red-400",
      onClick: () => displayRevocationDialog({
        dialogText: "Are you sure you want to create a revocation for this sequence?",
        onConfirmation: handleRevokeSequenceEntry
      }),
      children: "Revoke this sequence"
    }
  );
};
const displayRevocationDialog = ({ dialogText, onConfirmation }) => {
  confirmAlert({
    closeOnClickOutside: true,
    customUI: ({ onClose }) => /* @__PURE__ */ jsx(
      RevocationDialog,
      {
        dialogText,
        onConfirmation: (inputValue) => {
          onConfirmation(inputValue);
          onClose();
        },
        onClose
      }
    )
  });
};
const RevocationDialog = ({ dialogText, onConfirmation, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "modal-box", children: [
    /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", onClick: onClose, children: "✕" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: dialogText }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value),
        placeholder: "Enter reason for revocation",
        className: "mt-4 w-11/12 mx-auto block"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 mt-4", children: [
      /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn loculusColor text-white hover:bg-primary-700", onClick: onClose, children: "Cancel" }) }),
      /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn loculusColor text-white hover:bg-primary-700",
          onClick: (e) => {
            e.preventDefault();
            onConfirmation(inputValue);
          },
          children: "Confirm"
        }
      ) })
    ] })
  ] });
};
const RevokeButton = withQueryProvider(InnerRevokeButton);
function getRevokeSequenceEntryErrorMessage(error) {
  return "Failed to revoke sequence entry: " + stringifyMaybeAxiosError(error);
}

const LINE_LENGTH = 100;
const SequencesViewer = ({
  organism,
  accessionVersion,
  clientConfig,
  sequenceType,
  isMultiSegmented
}) => {
  const { data, error, isLoading } = lapisClientHooks(
    getLapisUrl(clientConfig, organism)
  ).utilityHooks.useGetSequence(accessionVersion, sequenceType, isMultiSegmented);
  if (error !== null) {
    return /* @__PURE__ */ jsxs("div", { className: "text-error", children: [
      "Failed to load ",
      noCase(sequenceType.type),
      " sequence ",
      sequenceType.name,
      ": ",
      JSON.stringify(error)
    ] });
  }
  if (isLoading || data === void 0) {
    return /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-lg" });
  }
  if (data === null) {
    return /* @__PURE__ */ jsx("span", { className: "text-gray-600 italic", children: "None" });
  }
  const header = ">" + data.name + (sequenceType.name === "main" ? "" : `_${sequenceType.name}`);
  return /* @__PURE__ */ jsx("div", { className: "h-80 overflow-auto", children: /* @__PURE__ */ jsx(FixedLengthTextViewer, { text: data.sequence, maxLineLength: LINE_LENGTH, header }) });
};

const InnerSequencesContainer = ({
  organism,
  accessionVersion,
  clientConfig,
  genes,
  nucleotideSegmentNames,
  loadSequencesAutomatically
}) => {
  const [loadSequences, setLoadSequences] = useState(false);
  useEffect(() => {
    if (loadSequencesAutomatically) {
      setLoadSequences(true);
    }
  }, [loadSequencesAutomatically]);
  const [sequenceType, setSequenceType] = useState(unalignedSequenceSegment(nucleotideSegmentNames[0]));
  if (!loadSequences) {
    return /* @__PURE__ */ jsx("button", { className: "btn btn-sm m-4", onClick: () => setLoadSequences(true), children: "Load sequences" });
  }
  return /* @__PURE__ */ jsx(
    SequenceTabs,
    {
      organism,
      accessionVersion,
      clientConfig,
      nucleotideSegmentNames,
      sequenceType,
      setType: setSequenceType,
      genes
    }
  );
};
const SequencesContainer = withQueryProvider(InnerSequencesContainer);
const SequenceTabs = ({
  organism,
  accessionVersion,
  clientConfig,
  nucleotideSegmentNames,
  genes,
  sequenceType,
  setType
}) => {
  const [activeTab, setActiveTab] = useState("unaligned");
  useEffect(() => {
    if (isUnalignedSequence(sequenceType)) {
      setActiveTab("unaligned");
    } else if (isAlignedSequence(sequenceType)) {
      setActiveTab("aligned");
    } else if (isGeneSequence(sequenceType.name, sequenceType)) {
      setActiveTab("gene");
    }
  }, [sequenceType]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(BoxWithTabsTabBar, { children: [
      /* @__PURE__ */ jsx(
        UnalignedNucleotideSequenceTabs,
        {
          nucleotideSegmentNames,
          sequenceType,
          setType,
          isActive: activeTab === "unaligned",
          setActiveTab
        }
      ),
      /* @__PURE__ */ jsx(
        AlignmentSequenceTabs,
        {
          nucleotideSegmentNames,
          sequenceType,
          setType,
          isActive: activeTab === "aligned",
          setActiveTab
        }
      ),
      /* @__PURE__ */ jsx(
        BoxWithTabsTab,
        {
          isActive: activeTab === "gene",
          label: "Aligned amino acid sequences",
          onClick: () => setActiveTab("gene")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(BoxWithTabsBox, { children: [
      activeTab === "gene" && /* @__PURE__ */ jsx(GeneDropdown, { genes, sequenceType, setType }),
      activeTab !== "gene" || isGeneSequence(sequenceType.name, sequenceType) ? /* @__PURE__ */ jsx(
        SequencesViewer,
        {
          organism,
          accessionVersion,
          clientConfig,
          sequenceType,
          isMultiSegmented: isMultiSegmented(nucleotideSegmentNames)
        }
      ) : /* @__PURE__ */ jsx("div", { className: "h-80" })
    ] })
  ] });
};
const UnalignedNucleotideSequenceTabs = ({
  nucleotideSegmentNames,
  sequenceType,
  setType,
  isActive,
  setActiveTab
}) => {
  if (!isMultiSegmented(nucleotideSegmentNames)) {
    const onlySegment = nucleotideSegmentNames[0];
    return /* @__PURE__ */ jsx(
      BoxWithTabsTab,
      {
        isActive,
        onClick: () => {
          setType(unalignedSequenceSegment(onlySegment));
          setActiveTab("unaligned");
        },
        label: "Nucleotide sequence"
      },
      onlySegment
    );
  }
  return /* @__PURE__ */ jsx(Fragment, { children: nucleotideSegmentNames.map((segmentName) => /* @__PURE__ */ jsx(
    BoxWithTabsTab,
    {
      isActive: isActive && isUnalignedSequence(sequenceType) && segmentName === sequenceType.name,
      onClick: () => {
        setType(unalignedSequenceSegment(segmentName));
        setActiveTab("unaligned");
      },
      label: `${segmentName} (unaligned)`
    },
    segmentName
  )) });
};
const AlignmentSequenceTabs = ({
  nucleotideSegmentNames,
  sequenceType,
  setType,
  isActive,
  setActiveTab
}) => {
  if (!isMultiSegmented(nucleotideSegmentNames)) {
    const onlySegment = nucleotideSegmentNames[0];
    return /* @__PURE__ */ jsx(
      BoxWithTabsTab,
      {
        isActive,
        onClick: () => {
          setType(alignedSequenceSegment(onlySegment));
          setActiveTab("aligned");
        },
        label: "Aligned nucleotide sequence"
      },
      onlySegment
    );
  }
  return /* @__PURE__ */ jsx(Fragment, { children: nucleotideSegmentNames.map((segmentName) => /* @__PURE__ */ jsx(
    BoxWithTabsTab,
    {
      isActive: isActive && isAlignedSequence(sequenceType) && segmentName === sequenceType.name,
      onClick: () => {
        setType(alignedSequenceSegment(segmentName));
        setActiveTab("aligned");
      },
      label: `${segmentName} (aligned)`
    },
    segmentName
  )) });
};
const GeneDropdown = ({ genes, sequenceType, setType }) => {
  const selectedGene = isGeneSequence(sequenceType.name, sequenceType) ? sequenceType.name : "";
  return /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs(
    "select",
    {
      className: "select select-bordered w-full max-w-xs",
      value: selectedGene,
      onChange: (e) => setType(geneSequence(e.target.value)),
      children: [
        /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select a gene" }),
        genes.map((gene) => /* @__PURE__ */ jsx("option", { value: gene, children: gene }, gene))
      ]
    }
  ) });
};
function isMultiSegmented(nucleotideSegmentNames) {
  return nucleotideSegmentNames.length > 1;
}

function successToast() {
  toast.success("Data use terms updated successfully. Changes take some time propagate and become visible here.", {
    autoClose: 4e3
  });
}
function errorToast(error) {
  toast.error("Failed to edit terms of use: " + stringifyMaybeAxiosError(error), {
    position: "top-center",
    autoClose: false
  });
}

const InnerEditDataUseTermsButton = ({
  accessToken,
  clientConfig,
  accessionVersion,
  dataUseTerms
}) => {
  const restrictedUntil = DateTime.fromISO(dataUseTerms.restrictedUntil);
  const [selectedDataUseTerms, setDataUseTerms] = useState(dataUseTerms);
  const dialogRef = useRef(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const useSetDataUseTerms = backendClientHooks(clientConfig).useSetDataUseTerms(
    { headers: createAuthorizationHeader(accessToken) },
    { onError: errorToast, onSuccess: successToast }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { className: "btn btn-sm", onClick: openDialog, children: "Edit data use terms" }),
    /* @__PURE__ */ jsxs("dialog", { ref: dialogRef, className: "modal-box", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-sm btn-circle btn-ghost text-gray-900 absolute right-2 top-2",
          onClick: closeDialog,
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium leading-6 text-gray-900", children: "Edit data use terms" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-900 mb-4 py-2", children: [
        "Currently restricted until ",
        /* @__PURE__ */ jsx("b", { children: restrictedUntil.toFormat("yyyy-MM-dd") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-2", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-x-3", children: /* @__PURE__ */ jsx(
        DataUseTermsSelector,
        {
          initialDataUseTermsOption: selectedDataUseTerms.type,
          maxRestrictedUntil: restrictedUntil,
          setDataUseTerms
        }
      ) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end my-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-sm",
          onClick: () => {
            closeDialog();
            useSetDataUseTerms.mutate({
              accessions: accessionVersion,
              newDataUseTerms: selectedDataUseTerms
            });
          },
          children: "Submit"
        }
      ) })
    ] })
  ] });
};
const EditDataUseTermsButton = withQueryProvider(InnerEditDataUseTermsButton);

const RestrictedUseWarning = () => {
  return /* @__PURE__ */ jsxs(ErrorBox, { title: "Restricted-Use sequence", level: "warning", children: [
    "This sequence is only available under the",
    " ",
    /* @__PURE__ */ jsx("a", { href: "https://pathoplexus.org/about/terms-of-use/restricted-data", className: "underline", children: "Restricted Use Terms" }),
    ". This prohibits publications that use this sequence as focal data during the restricted-use period, except with the consent of the sequence submitters."
  ] });
};

const mdiEye = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" }) });
const ForwardRef$2 = forwardRef(mdiEye);

const SequenceDataUI = ({
  tableData,
  organism,
  accessionVersion,
  dataUseTermsHistory,
  schema,
  clientConfig,
  myGroups,
  accessToken,
  sequenceFlaggingConfig,
  referenceGenomeSequenceNames
}) => {
  const groupId = tableData.find((entry) => entry.name === "groupId").value;
  const isMyGroup = myGroups.some((group) => group.groupId === groupId);
  dataUseTermsHistory.sort((a, b) => a.changeDate > b.changeDate ? -1 : 1);
  const currentDataUseTerms = dataUseTermsHistory[0].dataUseTerms;
  const dataUseTerms = tableData.find((entry) => entry.name === DATA_USE_TERMS_FIELD);
  const isRestricted = dataUseTerms?.value.toString().toUpperCase() === "RESTRICTED";
  const genes = referenceGenomeSequenceNames.genes;
  const nucleotideSegmentNames = referenceGenomeSequenceNames.nucleotideSequences;
  const reference = referenceGenomeSequenceNames.insdcAccessionFull;
  const loadSequencesAutomatically = schema.loadSequencesAutomatically === true;
  const dataTableData = getDataTableData(tableData);
  const reportUrl = getGitHubReportUrl(sequenceFlaggingConfig, organism, accessionVersion);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isRestricted && /* @__PURE__ */ jsx(RestrictedUseWarning, {}),
    /* @__PURE__ */ jsx(DataTableComponent, { dataTableData, dataUseTermsHistory, reference }),
    schema.submissionDataTypes.consensusSequences && /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsx(
      SequencesContainer,
      {
        organism,
        accessionVersion,
        clientConfig,
        genes,
        nucleotideSegmentNames,
        loadSequencesAutomatically
      }
    ) }),
    isMyGroup && accessToken !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("hr", { className: "my-4" }),
      /* @__PURE__ */ jsxs("div", { className: "my-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3", children: "Sequence management" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400 mb-4 block", children: [
          /* @__PURE__ */ jsx(ForwardRef$2, { className: "w-6 h-6 inline-block mr-2" }),
          "Only visible to group members"
        ] }),
        isRestricted && /* @__PURE__ */ jsx(
          EditDataUseTermsButton,
          {
            clientConfig,
            accessToken,
            accessionVersion: [accessionVersion.split(".")[0]],
            dataUseTerms: currentDataUseTerms
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: routes.editPage(organism, {
              accession: accessionVersion.split(".")[0],
              version: parseInt(accessionVersion.split(".")[1], 10)
            }),
            className: "btn btn-sm mr-3",
            children: "Revise this sequence"
          }
        ),
        /* @__PURE__ */ jsx(
          RevokeButton,
          {
            organism,
            clientConfig,
            accessionVersion: accessionVersion.split(".")[0],
            accessToken,
            groupId
          }
        )
      ] })
    ] }),
    reportUrl !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("hr", { className: "my-4" }),
      /* @__PURE__ */ jsxs("div", { className: "my-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3", children: "Report an issue with this sequence or metadata" }),
        /* @__PURE__ */ jsx("a", { href: reportUrl, className: "btn btn-sm", children: "Create GitHub issue" })
      ] })
    ] })
  ] });
};

const SequencesBanner = ({ sequenceEntryHistory, accessionVersion }) => {
  const ownHistoryEntry = sequenceEntryHistory.find((entry) => entry.accessionVersion === accessionVersion);
  const latestAccessionVersion = getLatestAccessionVersion(sequenceEntryHistory);
  const revoked = ownHistoryEntry?.versionStatus === versionStatuses.revoked && latestAccessionVersion?.isRevocation === true;
  const isLatestVersion = ownHistoryEntry?.versionStatus === versionStatuses.latestVersion;
  return /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
    !isLatestVersion && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3", role: "alert", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold", children: "This is not the latest version of this sequence entry." }),
      latestAccessionVersion && /* @__PURE__ */ jsxs("p", { children: [
        "The latest version is:",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: routes.sequenceEntryDetailsPage(latestAccessionVersion),
            className: "font-bold underline mx-1",
            children: getAccessionVersionString(latestAccessionVersion)
          }
        )
      ] })
    ] }),
    ownHistoryEntry?.isRevocation && /* @__PURE__ */ jsx("div", { className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-3", role: "alert", children: /* @__PURE__ */ jsx("p", { className: "font-bold", children: "This is a revocation version. It essentially contains no data, it's just a marker that all previous versions have been revoked." }) }),
    revoked && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-3", role: "alert", children: /* @__PURE__ */ jsx("p", { className: "font-bold", children: "This sequence entry has been revoked!" }) }),
      /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "text-red-600 rotate-45 text-8xl font-bold uppercase opacity-20", children: "REVOKED" }) })
    ] })
  ] });
};

const icBaselineHistory = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.95 8.95 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54l.72-1.21l-3.5-2.08V8z" }) });
const ForwardRef$1 = forwardRef(icBaselineHistory);

const icSharpKeyboardArrowDown = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" }) });
const ForwardRef = forwardRef(icSharpKeyboardArrowDown);

const SequenceEntryHistoryMenu = ({
  sequenceEntryHistory,
  accessionVersion,
  setPreviewedSeqId
}) => {
  const selectedVersion = sequenceEntryHistory.find((version) => version.accessionVersion === accessionVersion);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "dropdown dropdown-hover hidden sm:inline-block mr-2", children: [
      /* @__PURE__ */ jsxs("label", { tabIndex: 0, className: "btn btn-sm btn-outline py-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: selectedVersion === void 0 ? "All versions" : `Version ${selectedVersion.version}` }),
        /* @__PURE__ */ jsx(ForwardRef, {})
      ] }),
      /* @__PURE__ */ jsxs(
        "ul",
        {
          tabIndex: 0,
          className: "dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box absolute top-full right-[-8rem] text-sm w-80",
          children: [
            sequenceEntryHistory.map((version) => {
              const isSelected = accessionVersion === version.accessionVersion;
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: routes.sequenceEntryDetailsPage(version.accessionVersion),
                  className: "hover:no-underline",
                  onClick: (e) => {
                    if (setPreviewedSeqId) {
                      setPreviewedSeqId(version.accessionVersion);
                      e.preventDefault();
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: isSelected ? "font-semibold" : "", children: version.accessionVersion }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `${getVersionStatusColor(version.versionStatus, version.isRevocation)} ml-2`,
                        children: getVersionStatusLabel(version.versionStatus, version.isRevocation)
                      }
                    )
                  ]
                }
              ) }, version.accessionVersion);
            }),
            /* @__PURE__ */ jsx("li", { className: "border-t mt-1 pt-1", children: /* @__PURE__ */ jsx("a", { href: routes.versionPage(accessionVersion), className: "hover:no-underline", children: "All versions" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sm:hidden inline-block mr-2", children: /* @__PURE__ */ jsx("a", { href: routes.versionPage(accessionVersion), className: "text-xl", children: /* @__PURE__ */ jsx(ForwardRef$1, {}) }) })
  ] });
};

export { DataTableComponent as D, SequenceEntryHistoryMenu as S, SequenceDataUI as a, SequencesBanner as b, errorToast as e, getDataTableData as g, successToast as s };
