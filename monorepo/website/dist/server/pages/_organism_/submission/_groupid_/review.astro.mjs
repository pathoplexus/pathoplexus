/* empty css                                          */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate } from '../../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useState, forwardRef, useRef, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { aj as processedStatus, ak as errorsProcessingResult, al as warningsProcessingResult, am as receivedStatus, an as inProcessingStatus, U as restrictedDataUseTermsOption, ao as noIssuesProcessingResult, ap as deleteAllDataScope, aq as approveAllDataScope, ar as deleteProcessedDataWithErrorsScope, a as getRuntimeConfig, as as outputFilesEnabled, at as getMetadataDisplayNames } from '../../../../chunks/config_CQtV1zSN.mjs';
import { B as BoxWithTabsTabBar, a as BoxWithTabsTab, b as BoxWithTabsBox, F as FixedLengthTextViewer } from '../../../../chunks/BoxWithTabs_BpozTDUW.mjs';
import { b as backendClientHooks, f as backendApi } from '../../../../chunks/serviceHooks_DslcN1kS.mjs';
import { C as CustomTooltip, g as getLastApprovalTimeKey } from '../../../../chunks/CustomTooltip_CT1LhZ-F.mjs';
import { a as createAuthorizationHeader } from '../../../../chunks/backendClientFactory_DhWS0NBG.mjs';
import { g as getAccessionVersionString } from '../../../../chunks/extractAccessionVersion_CIVou_Oi.mjs';
import { a as ForwardRef$a, F as ForwardRef$b } from '../../../../chunks/unlocked_6dRdJrtu.mjs';
import { isErrorFromAlias } from '@zodios/core';
import { s as stringifyMaybeAxiosError } from '../../../../chunks/stringifyMaybeAxiosError_D1gzvjBG.mjs';
import { r as routes } from '../../../../chunks/routes_BftQyUXo.mjs';
import { d as displayConfirmationDialog } from '../../../../chunks/ConfirmationDialog_BWzbBNGK.mjs';
import { w as withQueryProvider } from '../../../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { F as ForwardRef$c } from '../../../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { P as Pagination } from '../../../../chunks/Pagination_DxF1OMvg.mjs';
import { $ as $$SubmissionPageWrapper } from '../../../../chunks/SubmissionPageWrapper_D7EtueRX.mjs';
import { g as getAccessToken } from '../../../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getGroupsAndCurrentGroup } from '../../../../chunks/submissionPages_DJJXYWxq.mjs';
export { renderers } from '../../../../renderers.mjs';

const FilesDialog = ({ isOpen, onClose, dataToView }) => {
  if (!isOpen || !dataToView) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-30", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-xl mx-3 w-full max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Files" }),
      /* @__PURE__ */ jsx("button", { className: "text-gray-500 hover:text-gray-700", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsx("div", { children: Object.entries(dataToView.processedData.files ?? {}).map(([category, files]) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: category }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 space-y-1", children: files.map((file) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `/seq/${dataToView.accession}.${dataToView.version}/${category}/${file.name}`,
          className: "text-primary-600 hover:underline",
          children: file.name
        }
      ) }, file.fileId)) })
    ] }, category)) })
  ] }) });
};

const SequencesDialog = ({ isOpen, onClose, dataToView }) => {
  const [activeTab, setActiveTab] = useState(0);
  if (!isOpen || !dataToView) return null;
  const processedSequences = extractProcessedSequences(dataToView);
  if (processedSequences.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-30", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-6xl mx-3 w-full max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Processed sequences" }),
      /* @__PURE__ */ jsx("button", { className: "text-gray-500 hover:text-gray-700", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsx(BoxWithTabsTabBar, { children: processedSequences.map(({ label }, i) => /* @__PURE__ */ jsx(
        BoxWithTabsTab,
        {
          isActive: i === activeTab,
          label,
          onClick: () => setActiveTab(i)
        },
        label
      )) }),
      /* @__PURE__ */ jsx(BoxWithTabsBox, { children: processedSequences[activeTab].sequence !== null && /* @__PURE__ */ jsx("div", { className: "overflow-auto", style: { maxHeight: "calc(80vh - 10rem)" }, children: /* @__PURE__ */ jsx(
        FixedLengthTextViewer,
        {
          text: processedSequences[activeTab].sequence,
          maxLineLength: 100
        }
      ) }) })
    ] })
  ] }) });
};
const extractProcessedSequences = (data) => {
  return [
    { type: "unaligned", sequences: data.processedData.unalignedNucleotideSequences },
    { type: "aligned", sequences: data.processedData.alignedNucleotideSequences },
    { type: "gene", sequences: data.processedData.alignedAminoAcidSequences }
  ].flatMap(
    ({ type, sequences }) => Object.entries(sequences).map(([sequenceName, sequence]) => {
      let label = sequenceName;
      if (type !== "gene") {
        if (label === "main") {
          label = type === "unaligned" ? "Sequence" : "Aligned";
        } else {
          label = type === "unaligned" ? `${sequenceName} (unaligned)` : `${sequenceName} (aligned)`;
        }
      }
      return { label, sequence };
    })
  );
};

const displayMetadataField = (value) => {
  if (value === null) {
    return "null";
  }
  if (typeof value === "number" && Number.isInteger(value)) {
    return value.toString();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toString();
};

const biTrash = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "currentColor", children: [
  /* @__PURE__ */ jsx("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" }),
  /* @__PURE__ */ jsx("path", { d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" })
] }) });
const ForwardRef$9 = forwardRef(biTrash);

const clarityNoteEditLine = (props, ref) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 36 36", width: "1.2em", height: "1.2em", ref, ...props, children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z", className: "clr-i-outline clr-i-outline-path-1" }),
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z", className: "clr-i-outline clr-i-outline-path-2" }),
  /* @__PURE__ */ jsx("path", { fill: "none", d: "M0 0h36v36H0z" })
] });
const ForwardRef$8 = forwardRef(clarityNoteEditLine);

const fluentNote24Filled = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M17.75 3A3.25 3.25 0 0 1 21 6.25V13h-4.75A3.25 3.25 0 0 0 13 16.25V21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3zm2.81 11.5l-6.06 6.06v-4.31c0-.966.784-1.75 1.75-1.75z" }) });
const ForwardRef$7 = forwardRef(fluentNote24Filled);

const fluentTagQuestionMark24Filled = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M19.75 2A2.25 2.25 0 0 1 22 4.25v5.462a3.25 3.25 0 0 1-.952 2.298l-.026.026a6.5 6.5 0 0 0-9.028 8.92a3.256 3.256 0 0 1-4.043-.442L3.489 16.06a3.25 3.25 0 0 1-.004-4.596l8.5-8.51a3.25 3.25 0 0 1 2.3-.953zM17 5.502a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-6.125 3.005a.625.625 0 1 1 1.25 0a.625.625 0 0 1-1.25 0m-1.229-4.548c-.01-1.137.806-1.954 1.854-1.954c1.03 0 1.853.846 1.853 1.95c0 .566-.185.913-.663 1.447l-.266.29l-.1.116c-.248.292-.324.462-.324.695a.5.5 0 0 1-1 0c0-.576.187-.926.67-1.468l.266-.29l.1-.113c.242-.286.317-.453.317-.677c0-.558-.38-.95-.853-.95c-.494 0-.86.366-.854.945a.5.5 0 0 1-1 .01" }) });
const ForwardRef$6 = forwardRef(fluentTagQuestionMark24Filled);

const grommetIconsEmptyCircle = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeWidth: 2, d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z" }) });
const ForwardRef$5 = forwardRef(grommetIconsEmptyCircle);

const lucideFiles = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, children: [
  /* @__PURE__ */ jsx("path", { d: "M15 2a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 21 8v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" }),
  /* @__PURE__ */ jsx("path", { d: "M15 2v4a2 2 0 0 0 2 2h4M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" })
] }) });
const ForwardRef$4 = forwardRef(lucideFiles);

const mdiDna = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M4 2h2v2c0 1.44.68 2.61 1.88 3.78c.86.83 2.01 1.63 3.21 2.42l-1.83 1.19C8.27 10.72 7.31 10 6.5 9.21C5.07 7.82 4 6.1 4 4zm14 0h2v2c0 2.1-1.07 3.82-2.5 5.21c-1.41 1.38-3.21 2.52-4.96 3.63c-1.75 1.12-3.45 2.21-4.66 3.38C6.68 17.39 6 18.56 6 20v2H4v-2c0-2.1 1.07-3.82 2.5-5.21c1.41-1.38 3.21-2.52 4.96-3.63c1.75-1.12 3.45-2.21 4.66-3.38C17.32 6.61 18 5.44 18 4zm-3.26 10.61c.99.67 1.95 1.39 2.76 2.18C18.93 16.18 20 17.9 20 20v2h-2v-2c0-1.44-.68-2.61-1.88-3.78c-.86-.83-2.01-1.63-3.21-2.42zM7 3h10v1l-.06.5H7.06L7 4zm.68 3h8.64c-.24.34-.52.69-.9 1.06l-.51.44H9.07l-.49-.44c-.38-.37-.66-.72-.9-1.06m1.41 10.5h5.84l.49.44c.38.37.66.72.9 1.06H7.68c.24-.34.52-.69.9-1.06zm-2.03 3h9.88l.06.5v1H7v-1z" }) });
const ForwardRef$3 = forwardRef(mdiDna);

const mdiTickOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M19.78 2.2L24 6.42L8.44 22L0 13.55l4.22-4.22l4.22 4.22zm0 2.8L8.44 16.36l-4.22-4.17l-1.41 1.36l5.63 5.62L21.19 6.42z" }) });
const ForwardRef$2 = forwardRef(mdiTickOutline);

const wpfPaperPlane = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 26 26", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M24.906 0a1 1 0 0 0-.375.125l-24 13a.99.99 0 0 0 .188 1.813l6.375 1.906c.149 1.179.813 6.285.937 7.281c.124.992.798 1.164 1.469.25c.454-.619 3.124-4.375 3.125-4.375l5.688 5.688a.99.99 0 0 0 1.656-.438l6-24A.99.99 0 0 0 24.906 0M23.47 2.938l-5.032 20.125l-5.656-5.657L21 6L8.219 15.125L3.563 13.75L23.468 2.937z" }) });
const ForwardRef$1 = forwardRef(wpfPaperPlane);

const ReviewCard = ({
  sequenceEntryStatus,
  metadataDisplayNames,
  approveAccessionVersion,
  deleteAccessionVersion,
  editAccessionVersion,
  clientConfig,
  organism,
  accessToken,
  filesEnabled
}) => {
  const [isSequencesDialogOpen, setSequencesDialogOpen] = useState(false);
  const [isFilesDialogOpen, setFilesDialogOpen] = useState(false);
  const { isLoading, data } = useGetMetadataAndAnnotations(organism, clientConfig, accessToken, sequenceEntryStatus);
  const hasFiles = Object.entries(data?.processedData.files ?? {}).length > 0;
  const notProcessed = sequenceEntryStatus.status !== processedStatus;
  return /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 relative transition-all duration-500", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-wrap ", children: [
        /* @__PURE__ */ jsx(
          StatusIcon,
          {
            status: sequenceEntryStatus.status,
            dataUseTerms: sequenceEntryStatus.dataUseTerms,
            accession: sequenceEntryStatus.accession,
            hasWarnings: sequenceEntryStatus.processingResult === warningsProcessingResult,
            hasErrors: sequenceEntryStatus.processingResult === errorsProcessingResult
          }
        ),
        /* @__PURE__ */ jsx(
          KeyValueComponent,
          {
            accessionVersion: getAccessionVersionString(sequenceEntryStatus),
            keyName: getAccessionVersionString(sequenceEntryStatus),
            value: sequenceEntryStatus.submissionId
          }
        ),
        data !== void 0 && /* @__PURE__ */ jsx(MetadataList, { data, metadataDisplayNames, isLoading }),
        sequenceEntryStatus.isRevocation && /* @__PURE__ */ jsx(
          KeyValueComponent,
          {
            accessionVersion: getAccessionVersionString(sequenceEntryStatus),
            keyName: "Revocation entry",
            value: "This is a revocation entry, which will create a new version that revokes this accession",
            extraStyle: "text-red-600 font-semibold",
            disableTruncate: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ButtonBar,
        {
          sequenceEntryStatus,
          approveAccessionVersion,
          deleteAccessionVersion,
          editAccessionVersion,
          viewSequences: data && !notProcessed ? () => setSequencesDialogOpen(true) : void 0,
          viewFiles: data && !notProcessed ? () => setFilesDialogOpen(true) : void 0,
          filesEnabled,
          hasFiles
        }
      )
    ] }),
    data?.errors?.length !== void 0 && data.errors.length > 0 && /* @__PURE__ */ jsx(
      Errors,
      {
        errors: data.errors,
        accession: sequenceEntryStatus.accession,
        metadataDisplayNames
      }
    ),
    data?.warnings?.length !== void 0 && data.warnings.length > 0 && /* @__PURE__ */ jsx(Warnings, { warnings: data.warnings, accession: sequenceEntryStatus.accession }),
    /* @__PURE__ */ jsx(
      SequencesDialog,
      {
        isOpen: isSequencesDialogOpen,
        onClose: () => setSequencesDialogOpen(false),
        dataToView: data
      }
    ),
    /* @__PURE__ */ jsx(FilesDialog, { isOpen: isFilesDialogOpen, onClose: () => setFilesDialogOpen(false), dataToView: data })
  ] });
};
const ButtonBar = ({
  sequenceEntryStatus,
  approveAccessionVersion,
  deleteAccessionVersion,
  editAccessionVersion,
  viewSequences,
  viewFiles,
  filesEnabled,
  hasFiles
}) => {
  const buttonBarClass = (disabled) => `${disabled ? "text-gray-300" : "text-gray-500 hover:text-gray-900 hover:cursor-pointer"} inline-block text-xl`;
  const approvable = sequenceEntryStatus.status === processedStatus && !(sequenceEntryStatus.processingResult === errorsProcessingResult);
  const notProcessed = sequenceEntryStatus.status !== processedStatus;
  return /* @__PURE__ */ jsx("div", { className: "flex mb-auto pt-3.5 items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
    filesEnabled && viewFiles && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: buttonBarClass(!hasFiles),
          onClick: viewFiles,
          "data-tooltip-id": "view-files-tooltip" + sequenceEntryStatus.accession,
          "data-testid": `view-files-${sequenceEntryStatus.accession}`,
          disabled: !hasFiles,
          children: /* @__PURE__ */ jsx(ForwardRef$4, {})
        },
        "view-files-button-" + sequenceEntryStatus.accession
      ),
      /* @__PURE__ */ jsx(
        CustomTooltip,
        {
          id: "view-files-tooltip" + sequenceEntryStatus.accession,
          content: hasFiles ? "View files" : "No files for this entry"
        }
      )
    ] }),
    viewSequences && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: buttonBarClass(false),
          onClick: viewSequences,
          "data-tooltip-id": "view-sequences-tooltip" + sequenceEntryStatus.accession,
          "data-testid": `view-sequences-${sequenceEntryStatus.accession}`,
          children: /* @__PURE__ */ jsx(ForwardRef$3, {})
        },
        "view-sequences-button-" + sequenceEntryStatus.accession
      ),
      /* @__PURE__ */ jsx(
        CustomTooltip,
        {
          id: "view-sequences-tooltip" + sequenceEntryStatus.accession,
          content: "View processed sequences"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-3 h-5 mt-0.5 border-l border-gray-300" }),
    " ",
    /* @__PURE__ */ jsx(
      "button",
      {
        className: buttonBarClass(!approvable),
        onClick: approveAccessionVersion,
        "data-tooltip-id": "approve-tooltip" + sequenceEntryStatus.accession,
        disabled: !approvable,
        children: /* @__PURE__ */ jsx(ForwardRef$1, {})
      },
      "approve-button-" + sequenceEntryStatus.accession
    ),
    /* @__PURE__ */ jsx(
      CustomTooltip,
      {
        id: "approve-tooltip" + sequenceEntryStatus.accession,
        content: approvable ? "Release this sequence entry" : sequenceEntryStatus.processingResult === errorsProcessingResult ? "You need to fix the errors before releasing this sequence entry" : "Still awaiting preprocessing"
      }
    ),
    !sequenceEntryStatus.isRevocation && /* @__PURE__ */ jsx(
      "button",
      {
        className: buttonBarClass(notProcessed),
        "data-testid": `${getAccessionVersionString({ ...sequenceEntryStatus })}.edit`,
        "data-tooltip-id": "edit-tooltip" + sequenceEntryStatus.accession,
        onClick: editAccessionVersion,
        disabled: notProcessed,
        children: /* @__PURE__ */ jsx(ForwardRef$8, {})
      },
      "edit-button-" + sequenceEntryStatus.accession
    ),
    /* @__PURE__ */ jsx(
      CustomTooltip,
      {
        id: "edit-tooltip" + sequenceEntryStatus.accession,
        content: notProcessed ? "Processing..." : "Edit this sequence entry"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: buttonBarClass(notProcessed),
        onClick: deleteAccessionVersion,
        "data-tooltip-id": "delete-tooltip" + sequenceEntryStatus.accession,
        disabled: notProcessed,
        children: /* @__PURE__ */ jsx(ForwardRef$9, {})
      },
      "delete-button-" + sequenceEntryStatus.accession
    ),
    /* @__PURE__ */ jsx(
      CustomTooltip,
      {
        id: "delete-tooltip" + sequenceEntryStatus.accession,
        content: notProcessed ? "Cannot discard. Wait for preprocessing." : "Discard this sequence entry"
      }
    )
  ] }) });
};
const isAnnotationPresent = (metadataField) => (item) => item.processedFields[0].name === metadataField;
const MetadataList = ({ data, isLoading, metadataDisplayNames }) => !isLoading && Object.entries(data.processedData.metadata).map(
  ([metadataName, value], index) => value === null ? null : /* @__PURE__ */ jsx(
    KeyValueComponent,
    {
      accessionVersion: getAccessionVersionString(data),
      keyName: metadataDisplayNames.get(metadataName) ?? metadataName,
      value: displayMetadataField(value),
      warnings: data.warnings?.filter(isAnnotationPresent(metadataName)),
      errors: data.errors?.filter(isAnnotationPresent(metadataName))
    },
    index
  )
);
const Errors = ({ errors, accession, metadataDisplayNames }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col m-2 ", children: errors.map((error) => {
    const uniqueKey = error.processedFields.map((field) => field.type + field.name).join(".") + accession;
    const processedFieldName = error.processedFields.map((field) => metadataDisplayNames.get(field.name) ?? field.name).join(", ");
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0", children: [
      /* @__PURE__ */ jsxs(
        "p",
        {
          className: "text-red-600",
          "data-tooltip-id": "error-tooltip-" + accession + "-" + uniqueKey,
          children: [
            processedFieldName,
            ": ",
            error.message
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        CustomTooltip,
        {
          id: "error-tooltip-" + accession + "-" + uniqueKey,
          content: "You must fix this error before releasing this sequence entry"
        }
      )
    ] }, uniqueKey);
  }) }) });
};
const Warnings = ({ warnings, accession }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col m-2 ", children: warnings.map((warning) => {
    const processedFieldName = warning.processedFields.map((field) => field.name).join(", ");
    return /* @__PURE__ */ jsxs(
      "p",
      {
        className: "text-yellow-500",
        children: [
          processedFieldName,
          ": ",
          warning.message
        ]
      },
      warning.processedFields.map((field) => field.type + field.name).join(".") + accession
    );
  }) }) });
};
const DataUseTermsIcon = ({ dataUseTerms, accession }) => {
  const hintText = dataUseTerms.type === restrictedDataUseTermsOption ? `Under the Restricted Use Terms until ${dataUseTerms.restrictedUntil}` : `To be released as open data`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { "data-tooltip-id": "dataUseTerm-tooltip-" + accession, children: dataUseTerms.type === restrictedDataUseTermsOption ? /* @__PURE__ */ jsx(ForwardRef$a, {}) : /* @__PURE__ */ jsx(ForwardRef$b, {}) }),
    /* @__PURE__ */ jsx(CustomTooltip, { id: "dataUseTerm-tooltip-" + accession, content: hintText })
  ] });
};
const StatusIcon = ({ status, dataUseTerms, accession, hasWarnings, hasErrors }) => {
  if (status === receivedStatus) {
    return /* @__PURE__ */ jsxs("div", { className: "p-2 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-tooltip-id": "awaitingProcessing-tooltip-" + accession,
          children: /* @__PURE__ */ jsx(ForwardRef$5, { className: "text-gray-500" })
        },
        "awaitingProcessing-tooltip-" + accession
      ),
      /* @__PURE__ */ jsx(CustomTooltip, { id: "awaitingProcessing-tooltip-" + accession, content: "Awaiting processing" }),
      /* @__PURE__ */ jsx(DataUseTermsIcon, { dataUseTerms, accession })
    ] });
  }
  if (status === processedStatus && hasErrors) {
    return /* @__PURE__ */ jsxs("div", { className: "p-2 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx("div", { "data-tooltip-id": `error-tooltip-` + accession, children: /* @__PURE__ */ jsx(ForwardRef$6, { className: "text-red-600" }) }, "error-tooltip-" + accession),
      /* @__PURE__ */ jsx(CustomTooltip, { id: `error-tooltip-` + accession, content: "Error detected" }),
      /* @__PURE__ */ jsx(DataUseTermsIcon, { dataUseTerms, accession })
    ] });
  }
  if (status === inProcessingStatus) {
    return /* @__PURE__ */ jsxs("div", { className: "p-2 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx("div", { "data-tooltip-id": "inProcessing-tooltip-" + accession, children: /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm" }) }, "inProcessing-tooltip-" + accession),
      /* @__PURE__ */ jsx(CustomTooltip, { id: "inProcessing-tooltip-" + accession, content: "In processing" }),
      /* @__PURE__ */ jsx(DataUseTermsIcon, { dataUseTerms, accession })
    ] });
  }
  if (status === processedStatus && !hasErrors) {
    return /* @__PURE__ */ jsxs("div", { className: "p-2 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx("div", { "data-tooltip-id": "awaitingApproval-tooltip-" + accession, children: /* @__PURE__ */ jsx(ForwardRef$2, { className: hasWarnings ? "text-yellow-400" : `text-green-500` }) }),
      /* @__PURE__ */ jsx(
        CustomTooltip,
        {
          id: "awaitingApproval-tooltip-" + accession,
          content: hasWarnings ? "Passed QC with warnings" : "Passed QC"
        }
      ),
      /* @__PURE__ */ jsx(DataUseTermsIcon, { dataUseTerms, accession })
    ] });
  }
};
const KeyValueComponent = ({
  accessionVersion,
  keyName,
  value,
  extraStyle,
  keyStyle,
  warnings,
  errors,
  disableTruncate = false
}) => {
  const { textColor, primaryMessages, secondaryMessages } = getTextColorAndMessages(errors, warnings);
  const textTooltipId = "text-tooltip-" + keyName + accessionVersion;
  const noteTooltipId = "note-tooltip-" + keyName + accessionVersion;
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    if (textRef.current && !disableTruncate) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    } else {
      setIsTruncated(false);
    }
  }, [value, disableTruncate]);
  const showTooltip = primaryMessages !== void 0 || isTruncated;
  const tooltipContent = primaryMessages !== void 0 ? primaryMessages.map((annotation) => annotation.message).join(", ") : value;
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col m-2 `, children: [
    /* @__PURE__ */ jsx("span", { className: keyStyle ?? "text-gray-500 uppercase text-xs", children: keyName }),
    /* @__PURE__ */ jsxs("span", { className: `text-base ${extraStyle}`, children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          ref: textRef,
          className: `${textColor} ${disableTruncate ? "" : "truncate max-w-xs inline-block"}`,
          "data-tooltip-id": showTooltip ? textTooltipId : void 0,
          children: value
        }
      ),
      showTooltip && /* @__PURE__ */ jsx(CustomTooltip, { id: textTooltipId, content: tooltipContent }),
      secondaryMessages !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ForwardRef$7, { className: "text-yellow-500 inline-block", "data-tooltip-id": noteTooltipId }),
        /* @__PURE__ */ jsx(
          CustomTooltip,
          {
            id: noteTooltipId,
            content: secondaryMessages.map((annotation) => annotation.message).join(", ")
          }
        )
      ] })
    ] })
  ] });
};
function getTextColorAndMessages(errors, warnings) {
  const hasErrors = errors !== void 0 && errors.length > 0;
  const hasWarnings = warnings !== void 0 && warnings.length > 0;
  if (hasErrors) {
    return {
      textColor: "text-red-600",
      primaryMessages: errors,
      secondaryMessages: hasWarnings ? warnings : void 0
    };
  }
  if (hasWarnings) {
    return {
      textColor: "text-yellow-500",
      primaryMessages: warnings,
      secondaryMessages: void 0
    };
  }
  return {
    textColor: "",
    primaryMessages: void 0,
    secondaryMessages: void 0
  };
}
function useGetMetadataAndAnnotations(organism, clientConfig, accessToken, sequenceEntryStatus) {
  const { status, accession, version, isRevocation } = sequenceEntryStatus;
  return backendClientHooks(clientConfig).useGetDataToEdit(
    {
      headers: createAuthorizationHeader(accessToken),
      params: { organism, accession, version }
    },
    {
      enabled: status !== receivedStatus && status !== inProcessingStatus && !isRevocation
    }
  );
}

function useSubmissionOperations(organism, group, clientConfig, accessToken, openErrorFeedback, pageQuery) {
  const hooks = useMemo(() => backendClientHooks(clientConfig), [clientConfig]);
  const allRelevantStatuses = [receivedStatus, inProcessingStatus, processedStatus];
  const allProcessingResults = [noIssuesProcessingResult, warningsProcessingResult, errorsProcessingResult];
  const [includedStatuses, setIncludedStatuses] = useState(allRelevantStatuses);
  const [includedProcessingResults, setIncludedProcessingResults] = useState(allProcessingResults);
  const useGetSequences = hooks.useGetSequences(
    {
      headers: createAuthorizationHeader(accessToken),
      params: {
        organism
      },
      queries: {
        groupIdsFilter: group.groupId.toString(),
        initialStatusesFilter: allRelevantStatuses.join(","),
        statusesFilter: includedStatuses.join(","),
        processingResultFilter: includedProcessingResults.join(","),
        page: pageQuery.pageOneIndexed - 1,
        size: pageQuery.size
      }
    },
    {
      onError: (error) => openErrorFeedback(getSequencesErrorMessage(error)),
      refetchInterval: 2e3
    }
  );
  if (useGetSequences.error) {
    openErrorFeedback(`Failed to query Group`);
  }
  const useDeleteSequenceEntries = hooks.useDeleteSequences(
    { headers: createAuthorizationHeader(accessToken), params: { organism } },
    {
      onSuccess: () => useGetSequences.refetch(),
      onError: (error) => openErrorFeedback(deleteSequenceEntriesErrorMessage(error))
    }
  );
  const useApproveProcessedData = hooks.useApproveProcessedData(
    { headers: createAuthorizationHeader(accessToken), params: { organism } },
    {
      onSuccess: () => useGetSequences.refetch(),
      onError: (error) => openErrorFeedback(approveProcessedDataErrorMessage(error))
    }
  );
  return {
    deleteSequenceEntries: useDeleteSequenceEntries.mutate,
    approveProcessedData: useApproveProcessedData.mutate,
    getSequences: useGetSequences,
    includedStatuses,
    setIncludedStatuses,
    includedProcessingResults,
    setIncludedProcessingResults
  };
}
function deleteSequenceEntriesErrorMessage(error) {
  if (isErrorFromAlias(backendApi, "deleteSequences", error)) {
    return "Failed to delete sequence entries: " + error.response.data.detail;
  }
  return "Failed to delete sequence entries: " + stringifyMaybeAxiosError(error);
}
function approveProcessedDataErrorMessage(error) {
  if (isErrorFromAlias(backendApi, "approveProcessedData", error)) {
    return "Failed to approve processed sequence entries: " + error.response.data.detail;
  }
  return "Failed to approve processed sequence entries: " + stringifyMaybeAxiosError(error);
}
function getSequencesErrorMessage(error) {
  if (isErrorFromAlias(backendApi, "getSequences", error)) {
    return "Failed to query sequences: " + error.response.data.detail;
  }
  return "Failed to query sequences: " + stringifyMaybeAxiosError(error);
}

const lucideFilter = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M22 3H2l8 9.46V19l4 2v-8.54z" }) });
const ForwardRef = forwardRef(lucideFilter);

const menuItemClassName = `group flex rounded-md items-center w-full px-2 py-2 text-sm
hover:bg-primary-500 bg-primary-600 text-white text-left mb-1`;
let oldSequenceData = null;
const pageSizeOptions = [10, 20, 50, 100];
const NumberAndVisibility = ({
  text,
  countNumber,
  setVisibility,
  visibilityEnabled
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 text-sm text-gray-700 px-3", children: /* @__PURE__ */ jsxs("label", { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        checked: visibilityEnabled,
        onChange: () => setVisibility(!visibilityEnabled),
        className: "mr-2 text-gray-400"
      }
    ),
    /* @__PURE__ */ jsxs("span", { className: " inline-block font-semibold ", children: [
      countNumber,
      " "
    ] }),
    " ",
    text
  ] }) });
};
const InnerReviewPage = ({
  clientConfig,
  organism,
  group,
  accessToken,
  metadataDisplayNames,
  filesEnabled
}) => {
  const [pageQuery, setPageQuery] = useState({ pageOneIndexed: 1, size: pageSizeOptions[2] });
  const hooks = useSubmissionOperations(organism, group, clientConfig, accessToken, toast.error, pageQuery);
  const showNoIssues = hooks.includedProcessingResults.includes(noIssuesProcessingResult);
  const showWarnings = hooks.includedProcessingResults.includes(warningsProcessingResult);
  const showErrors = hooks.includedProcessingResults.includes(errorsProcessingResult);
  const showUnprocessed = hooks.includedStatuses.includes(inProcessingStatus) && hooks.includedStatuses.includes(receivedStatus);
  const setAStatus = (status, value) => {
    hooks.setIncludedStatuses((prev) => {
      if (value) {
        return [...prev, status];
      }
      return prev.filter((s) => s !== status);
    });
  };
  const setAProcessingResult = (status, include) => {
    hooks.setIncludedProcessingResults((prev) => {
      if (include) {
        return [...prev, status];
      }
      return prev.filter((s) => s !== status);
    });
  };
  const setShowNoIssues = (value) => setAProcessingResult(noIssuesProcessingResult, value);
  const setShowWarnings = (value) => setAProcessingResult(warningsProcessingResult, value);
  const setShowErrors = (value) => setAProcessingResult(errorsProcessingResult, value);
  const setShowUnprocessed = (value) => {
    setAStatus(inProcessingStatus, value);
    setAStatus(receivedStatus, value);
  };
  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageQuery({ pageOneIndexed: 1, size: newSize });
  };
  let sequencesData = hooks.getSequences.data;
  if (!hooks.getSequences.isLoading && !hooks.getSequences.isError) {
    oldSequenceData = hooks.getSequences.data;
  }
  if (hooks.getSequences.isLoading) {
    if (oldSequenceData) {
      sequencesData = oldSequenceData;
    } else {
      return /* @__PURE__ */ jsx("div", { children: "Loading..." });
    }
  }
  if (hooks.getSequences.isError) {
    return /* @__PURE__ */ jsxs("div", { children: [
      "Error: ",
      hooks.getSequences.error.message
    ] });
  }
  if (sequencesData === void 0) {
    return /* @__PURE__ */ jsx("div", { children: "Loading.." });
  }
  const receivedCount = sequencesData.statusCounts[receivedStatus];
  const processingCount = sequencesData.statusCounts[inProcessingStatus];
  const unprocessedCount = receivedCount + processingCount;
  const processedCount = sequencesData.statusCounts[processedStatus];
  const total = processedCount + unprocessedCount;
  const errorCount = sequencesData.processingResultCounts[errorsProcessingResult];
  const warningCount = sequencesData.processingResultCounts[warningsProcessingResult];
  const noIssuesCount = sequencesData.processingResultCounts[noIssuesProcessingResult];
  const validCount = warningCount + noIssuesCount;
  const selectedCount = (showUnprocessed ? unprocessedCount : 0) + (showNoIssues ? noIssuesCount : 0) + (showWarnings ? warningCount : 0) + (showErrors ? errorCount : 0);
  if ((pageQuery.pageOneIndexed - 1) * pageQuery.size > selectedCount) {
    setPageQuery({ ...pageQuery, pageOneIndexed: Math.ceil(selectedCount / pageQuery.size) });
  }
  if (total === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "pt-1 text-gray-600", children: [
      "You do not currently have any unreleased sequences awaiting review. You can view your released sequences on the",
      " ",
      /* @__PURE__ */ jsx("a", { href: routes.mySequencesPage(organism, group.groupId), className: "text-primary-600 hover:underline", children: "Released sequences" }),
      " ",
      "page."
    ] });
  }
  const sequences = sequencesData.sequenceEntries;
  const controlPanel = /* @__PURE__ */ jsxs("div", { className: "flex flex-col", "data-testid": "review-page-control-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-gray-600 mr-3", children: [
      unprocessedCount > 0 && /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm mr-2 relative top-1", children: " " }),
      processedCount,
      " of ",
      total,
      " sequences processed"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border border-slate-200 p-3 mt-3 flex items-start", children: [
      /* @__PURE__ */ jsx(ForwardRef, { className: "w-4 h-4 inline-block text-gray-500 mt-1 mr-3" }),
      /* @__PURE__ */ jsx(
        NumberAndVisibility,
        {
          text: "awaiting processing",
          countNumber: unprocessedCount,
          setVisibility: setShowUnprocessed,
          visibilityEnabled: showUnprocessed
        },
        "unprocessed"
      ),
      /* @__PURE__ */ jsx("div", { className: "border-green-500 border-b-2 pb-1", children: /* @__PURE__ */ jsx(
        NumberAndVisibility,
        {
          text: "no issues",
          countNumber: noIssuesCount,
          setVisibility: setShowNoIssues,
          visibilityEnabled: showNoIssues
        },
        "valid"
      ) }),
      /* @__PURE__ */ jsx("div", { className: "border-yellow-400 border-b-2 pb-1", children: /* @__PURE__ */ jsx(
        NumberAndVisibility,
        {
          text: "with warnings",
          countNumber: warningCount,
          setVisibility: setShowWarnings,
          visibilityEnabled: showWarnings
        },
        "warnings"
      ) }),
      /* @__PURE__ */ jsx("div", { className: "border-b-2 border-red-600 pb-1", children: /* @__PURE__ */ jsx(
        NumberAndVisibility,
        {
          text: "with errors",
          countNumber: errorCount,
          setVisibility: setShowErrors,
          visibilityEnabled: showErrors
        },
        "errors"
      ) })
    ] })
  ] });
  const pagination = /* @__PURE__ */ jsxs("div", { className: "flex justify-end align-center gap-3 py-3", children: [
    /* @__PURE__ */ jsx(
      Pagination,
      {
        count: Math.ceil(selectedCount / pageQuery.size),
        page: pageQuery.pageOneIndexed,
        onChange: (_, newPage) => {
          setPageQuery({ ...pageQuery, pageOneIndexed: newPage });
        },
        color: "primary",
        variant: "outlined",
        shape: "rounded"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "pageSize", children: "Page size: " }),
      /* @__PURE__ */ jsx("select", { id: "pageSize", value: pageQuery.size, onChange: handleSizeChange, children: pageSizeOptions.map((size) => /* @__PURE__ */ jsx("option", { value: size, children: size }, size)) })
    ] })
  ] });
  const bulkActionButtons = /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center gap-3 mt-auto ", children: [
    processedCount > 0 && /* @__PURE__ */ jsxs(Menu, { as: "div", className: " inline-block text-left", children: [
      /* @__PURE__ */ jsxs(MenuButton, { className: "border rounded-md p-1 bg-primary-600 text-white px-2", children: [
        /* @__PURE__ */ jsx(ForwardRef$9, { className: "inline-block w-4 h-4 -mt-0.5 mr-1.5" }),
        "Discard sequences",
        /* @__PURE__ */ jsx(ForwardRef$c, { className: "inline-block ml-1 w-3 h-3 -mt-0.5" })
      ] }),
      /* @__PURE__ */ jsx(MenuItems, { className: "origin-top-right absolute z-50 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "py-1", children: [
        errorCount > 0 && showErrors && /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsxs(
          "button",
          {
            className: menuItemClassName,
            onClick: () => displayConfirmationDialog({
              dialogText: "Are you sure you want to discard all sequences with errors?",
              confirmButtonText: "Discard",
              onConfirmation: () => {
                hooks.deleteSequenceEntries({
                  groupIdsFilter: [group.groupId],
                  scope: deleteProcessedDataWithErrorsScope.value
                });
              }
            }),
            children: [
              /* @__PURE__ */ jsx(ForwardRef$9, { className: "inline-block w-4 h-4 -mt-0.5 mr-1.5" }),
              "Discard ",
              errorCount,
              " sequence",
              errorCount > 1 ? "s" : "",
              " with errors"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsxs(
          "button",
          {
            className: menuItemClassName,
            onClick: () => displayConfirmationDialog({
              dialogText: `Are you sure you want to discard all ${processedCount} processed sequences?`,
              confirmButtonText: "Discard",
              onConfirmation: () => {
                hooks.deleteSequenceEntries({
                  groupIdsFilter: [group.groupId],
                  scope: deleteAllDataScope.value
                });
              }
            }),
            children: [
              /* @__PURE__ */ jsx(ForwardRef$9, { className: "inline-block w-4 h-4 -mt-0.5 mr-1.5" }),
              "Discard all ",
              processedCount,
              " processed sequences"
            ]
          }
        ) })
      ] }) })
    ] }),
    validCount > 0 && /* @__PURE__ */ jsxs(
      "button",
      {
        className: "border rounded-md p-1 bg-primary-600 text-white px-2",
        onClick: () => displayConfirmationDialog({
          dialogText: "Are you sure you want to release all valid sequences?",
          confirmButtonText: "Release",
          onConfirmation: () => {
            hooks.approveProcessedData({
              groupIdsFilter: [group.groupId],
              scope: approveAllDataScope.value
            });
            storeLastApprovalTime(organism);
          }
        }),
        children: [
          /* @__PURE__ */ jsx(ForwardRef$1, { className: "inline-block w-4 h-4 -mt-0.5 mr-1.5" }),
          "Release ",
          validCount,
          " valid sequence",
          validCount > 1 ? "s" : ""
        ]
      }
    )
  ] });
  const reviewCards = /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 py-4 divide-y divide-gray-200", children: sequences.map((sequence) => {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      ReviewCard,
      {
        sequenceEntryStatus: sequence,
        metadataDisplayNames,
        approveAccessionVersion: () => displayConfirmationDialog({
          dialogText: `Are you sure you want to approve ${getAccessionVersionString(sequence)}?`,
          confirmButtonText: "Approve",
          onConfirmation: () => {
            hooks.approveProcessedData({
              accessionVersionsFilter: [sequence],
              groupIdsFilter: [group.groupId],
              scope: approveAllDataScope.value
            });
            storeLastApprovalTime(organism);
          }
        }),
        deleteAccessionVersion: () => displayConfirmationDialog({
          dialogText: `Are you sure you want to discard ${getAccessionVersionString(sequence)}?`,
          confirmButtonText: "Discard",
          onConfirmation: () => {
            hooks.deleteSequenceEntries({
              accessionVersionsFilter: [sequence],
              groupIdsFilter: [group.groupId],
              scope: deleteAllDataScope.value
            });
          }
        }),
        editAccessionVersion: () => {
          window.location.href = routes.editPage(organism, sequence);
        },
        clientConfig,
        organism,
        accessToken,
        filesEnabled
      }
    ) }, sequence.accession);
  }) });
  return /* @__PURE__ */ jsxs("div", { className: hooks.getSequences.isLoading ? "opacity-50 pointer-events-none" : "", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex sm:justify-between items-bottom flex-col md:flex-row gap-5 bg-white pb-1", children: [
        controlPanel,
        bulkActionButtons
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-2 w-full",
          style: {
            background: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%,rgba(100, 100, 100, .2) 80%)"
          }
        }
      )
    ] }),
    reviewCards,
    pagination
  ] });
};
const storeLastApprovalTime = (organism) => {
  const lastApprovalTime = Math.floor(Date.now() / 1e3);
  localStorage.setItem(getLastApprovalTimeKey(organism), lastApprovalTime.toString());
};
const ReviewPage = withQueryProvider(InnerReviewPage);

const $$Astro = createAstro();
const $$Review = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Review;
  const organism = Astro2.params.organism;
  const groupsResult = await getGroupsAndCurrentGroup(Astro2.params, Astro2.locals.session);
  const clientConfig = getRuntimeConfig().public;
  const filesEnabled = outputFilesEnabled(organism);
  const metadataDisplayNames = getMetadataDisplayNames(organism);
  return renderTemplate`${renderComponent($$result, "SubmissionPageWrapper", $$SubmissionPageWrapper, { "title": "Review current submissions", "groupsResult": groupsResult }, { "default": async ($$result2) => renderTemplate`${groupsResult.match(
    ({ currentGroup: group }) => renderTemplate`${renderComponent($$result2, "ReviewPage", ReviewPage, { "clientConfig": clientConfig, "organism": organism, "group": group, "accessToken": getAccessToken(Astro2.locals.session), "metadataDisplayNames": metadataDisplayNames, "filesEnabled": filesEnabled, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ReviewPage/ReviewPage", "client:component-export": "ReviewPage" })}`,
    () => void 0
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/review.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/review.astro";
const $$url = "/[organism]/submission/[groupId]/review";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Review,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
