import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { sentenceCase, snakeCase } from 'change-case';
import Papa from 'papaparse';
import { forwardRef, Fragment as Fragment$1, useState, useCallback, useRef, useEffect } from 'react';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, Input } from '@headlessui/react';
import { D as DisabledUntilHydrated } from './DisabledUntilHydrated_Cq3qsxAK.mjs';
import { Tooltip } from 'react-tooltip';
import { F as ForwardRef$5 } from './info-outline_DvO6qTrv.mjs';
import { ah as mapErrorsAndWarnings, a7 as SUBMISSION_ID_INPUT_FIELD, A as ACCESSION_FIELD } from './config_CQtV1zSN.mjs';
import { toast } from 'react-toastify';
import { u as useClientFlag } from './isClient_EhWp56WR.mjs';
import { F as ForwardRef$6 } from './baseline-download_B32u_4WX.mjs';
import * as XLSX from '@lokalise/xlsx';
import * as fflate from 'fflate';
import * as fzstd from 'fzstd';
import JSZip from 'jszip';
import { err, ok } from 'neverthrow';

const icTwotoneUndo = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8" }) });
const ForwardRef$4 = forwardRef(icTwotoneUndo);

const InputField = ({ row, onChange, colorClassName, options }) => {
  const filteredOptions = (options ?? []).filter((o) => o.name.toLowerCase().includes(row.value.toLowerCase()));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    options !== void 0 ? /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
      Combobox,
      {
        immediate: true,
        value: row.value,
        onChange: (value) => onChange({ ...row, value: value ?? "" }),
        children: /* @__PURE__ */ jsxs("div", { className: "relative inline", children: [
          /* @__PURE__ */ jsx(
            ComboboxInput,
            {
              id: row.key,
              name: row.key,
              onChange: (event) => onChange({ ...row, value: event.target.value ? event.target.value : "" }),
              className: `border border-gray-200 rounded-md w-full ${row.value !== row.initialValue ? "pl-3 pr-12" : "px-3"}  ${row.value === row.initialValue && colorClassName} h-8`,
              autoComplete: "none"
            }
          ),
          /* @__PURE__ */ jsx(
            ComboboxOptions,
            {
              modal: false,
              className: "absolute border empty:invisible z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-h-32",
              children: filteredOptions.map((option) => /* @__PURE__ */ jsx(
                ComboboxOption,
                {
                  value: option.name,
                  className: ({ focus }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? "bg-blue-500 text-white" : "text-gray-900"}`,
                  children: ({ selected, focus }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `inline-block ${selected ? "font-medium" : "font-normal"}`,
                        children: option.name
                      }
                    ),
                    selected && /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-blue-500"}`,
                        children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: "w-5 h-5",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                fillRule: "evenodd",
                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                clipRule: "evenodd"
                              }
                            )
                          }
                        )
                      }
                    )
                  ] })
                },
                option.name
              ))
            }
          )
        ] })
      }
    ) }) : /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
      Input,
      {
        id: row.key,
        name: row.key,
        type: "text",
        className: `border border-gray-200 rounded-md w-full ${row.value !== row.initialValue ? "pl-3 pr-12" : "px-3"}  ${colorClassName} h-8`,
        value: row.value,
        onChange: (e) => onChange({ ...row, value: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-white bg-opacity-50 rounded-lg -m-12 px-3",
        onClick: () => onChange({ ...row, value: row.initialValue }),
        children: row.value !== row.initialValue && /* @__PURE__ */ jsx(
          "div",
          {
            className: "tooltip tooltip-info whitespace-pre-line",
            "data-tip": "Revert to: " + row.initialValue,
            children: /* @__PURE__ */ jsx(ForwardRef$4, { color: "action" })
          }
        )
      }
    )
  ] });
};

const InputFieldTooltip = ({
  id,
  field,
  place = "right",
  positionStrategy = "fixed",
  className = "z-20 max-w-80 space-y-2 whitespace-normal",
  delayShow = 200,
  includeExample = false
}) => /* @__PURE__ */ jsxs(Tooltip, { id, place, positionStrategy, className, delayShow, children: [
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "font-mono font-semibold text-gray-300", children: field.name }) }),
  field.definition && /* @__PURE__ */ jsx("p", { children: field.definition }),
  field.guidance && /* @__PURE__ */ jsx("p", { children: field.guidance }),
  includeExample && field.example !== void 0 && /* @__PURE__ */ jsxs("p", { className: "italic", children: [
    "Example: ",
    field.example
  ] })
] });

const icBaselineWarningAmber = (props, ref) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 5.99L19.53 19H4.47zM12 2L1 21h22z" }),
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M13 16h-2v2h2zm0-6h-2v5h2z" })
] });
const ForwardRef$3 = forwardRef(icBaselineWarningAmber);

const icTwotoneDangerous = (props, ref) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M9.1 5L5 9.1v5.8L9.1 19h5.8l4.1-4.1V9.1L14.9 5zm7.14 9.83l-1.41 1.41L12 13.41l-2.83 2.83l-1.41-1.41L10.59 12L7.76 9.17l1.41-1.41L12 10.59l2.83-2.83l1.41 1.41L13.41 12z", opacity: 0.3 }),
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1zm-4.17-7.14L12 10.59L9.17 7.76L7.76 9.17L10.59 12l-2.83 2.83l1.41 1.41L12 13.41l2.83 2.83l1.41-1.41L13.41 12l2.83-2.83z" })
] });
const ForwardRef$2 = forwardRef(icTwotoneDangerous);

const EditableDataRow = ({ inputField, row, onChange }) => {
  const colorClassName = row.errors.length > 0 ? "text-red-600" : row.warnings.length > 0 ? "text-yellow-600" : "";
  const hasDescription = [inputField.definition, inputField.guidance, inputField.example].some(
    (value) => value !== void 0
  );
  const label = inputField.displayName ?? sentenceCase(inputField.name);
  const labelArr = label.trim().split(" ");
  const lastWord = labelArr.pop();
  const startOfLabel = labelArr.join(" ");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("tr", { className: "table-fixed w-full", children: [
      /* @__PURE__ */ jsx("td", { className: `w-1/4 relative ${colorClassName}`, children: /* @__PURE__ */ jsxs("label", { htmlFor: row.key, children: [
        startOfLabel.length > 0 && /* @__PURE__ */ jsxs("span", { children: [
          startOfLabel,
          " "
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "whitespace-nowrap", children: [
          lastWord,
          hasDescription && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              ForwardRef$5,
              {
                className: "inline-block h-4 w-4 text-gray-500 shrink-0 ml-1 mb-0.5",
                "data-tooltip-id": "field-tooltip" + row.key
              }
            ),
            /* @__PURE__ */ jsx(
              InputFieldTooltip,
              {
                id: "field-tooltip" + row.key,
                field: inputField,
                includeExample: true
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("td", { className: "text-right", children: /* @__PURE__ */ jsx("div", { className: "pr-2 flex flex-row items-center", children: /* @__PURE__ */ jsx(ErrorAndWarningIcons, { row }) }) }),
      /* @__PURE__ */ jsx("td", { className: "w-3/4", children: /* @__PURE__ */ jsx(
        InputField,
        {
          row,
          onChange,
          colorClassName,
          options: inputField.options
        }
      ) })
    ] }),
    row.warnings.length + row.errors.length > 0 ? /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", {}),
      /* @__PURE__ */ jsx("td", {}),
      /* @__PURE__ */ jsxs("td", { className: "text-xs", children: [
        row.errors.map((error) => /* @__PURE__ */ jsx("div", { className: "text-red-600", children: error }, error)),
        row.warnings.map((warning) => /* @__PURE__ */ jsx("div", { className: "text-yellow-600", children: warning }, warning))
      ] })
    ] }) : null
  ] });
};
const ErrorAndWarningIcons = ({ row }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    row.errors.length > 0 ? /* @__PURE__ */ jsx("div", { className: "tooltip tooltip-error whitespace-pre-line text-error", "data-tip": row.errors.join("\n"), children: /* @__PURE__ */ jsx(ForwardRef$2, {}) }) : null,
    row.warnings.length > 0 ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "tooltip tooltip-warning whitespace-pre-line text-warning",
        "data-tip": row.warnings.join("\n"),
        children: /* @__PURE__ */ jsx(ForwardRef$3, {})
      }
    ) : null
  ] });
};

const Subtitle = ({ title, bold, small, customKey }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
  /* @__PURE__ */ jsx("tr", { className: "h-4" }, snakeCase(customKey ?? title) + "_spacing"),
  /* @__PURE__ */ jsx("tr", { className: "subtitle", children: /* @__PURE__ */ jsx("td", { className: `${bold ?? false ? "font-semibold" : "font-normal"} ${small && "text-base"}`, colSpan: 3, children: title }) }, snakeCase(customKey ?? title))
] }, snakeCase(customKey ?? title) + "_fragment");
class EditableMetadata {
  constructor(rows) {
    this.rows = rows;
  }
  static fromInitialData(initialData) {
    return new EditableMetadata(
      Object.entries(initialData.originalData.metadata).map(([key, value]) => ({
        key,
        value,
        initialValue: value,
        ...mapErrorsAndWarnings(initialData, key, "Metadata")
      }))
    );
  }
  static empty() {
    return new EditableMetadata([]);
  }
  updateWith(editedRow) {
    const relevantOldRow = this.rows.find((oldRow) => oldRow.key === editedRow.key);
    const updatedRows = relevantOldRow ? this.rows.map(
      (prevRow) => prevRow.key === editedRow.key ? { ...prevRow, value: editedRow.value } : prevRow
    ) : [...this.rows, editedRow];
    return new EditableMetadata(JSON.parse(JSON.stringify(updatedRows)));
  }
  /**
   * Helper function to get the Submission ID from the rows, if it is present.
   */
  getSubmissionId() {
    const row = this.rows.find((row2) => row2.key === SUBMISSION_ID_INPUT_FIELD);
    return row ? row.value : void 0;
  }
  /**
   * Return the Metadata information as a TSV. If no information is present, 'undefined' is returned.
   * @param submissionId optional (might already be in the rows if add to the form initially).
   *      The submission ID to put into the TSV.
   * @param accession optional. If an accession is already assigned to this sequence, it should be given.
   */
  getMetadataTsv(submissionId, accession) {
    if (!this.rows.some((row) => row.value !== "")) return void 0;
    if (this.rows.length === 1 && this.rows[0].key === SUBMISSION_ID_INPUT_FIELD) {
      return void 0;
    }
    const tsvFields = /* @__PURE__ */ new Map();
    this.rows.forEach((row) => tsvFields.set(row.key, row.value));
    if (submissionId) {
      tsvFields.set(SUBMISSION_ID_INPUT_FIELD, submissionId);
    }
    if (accession) {
      tsvFields.set(ACCESSION_FIELD, accession);
    }
    const tsvContent = Papa.unparse([Array.from(tsvFields.keys()), Array.from(tsvFields.values())], {
      delimiter: "	",
      newline: "\n"
    });
    return new File([tsvContent], "metadata.tsv", { type: "text/tab-separated-values" });
  }
  getMetadataRecord() {
    return this.rows.reduce((prev, row) => ({ ...prev, [row.key]: row.value }), {});
  }
}
const MetadataForm = ({
  editableMetadata,
  setEditableMetadata,
  groupedInputFields,
  isSubmitForm: submitMode = false
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Subtitle, { title: "Metadata" }),
  Array.from(groupedInputFields.entries()).map(([group, fields]) => {
    if (fields.length === 0) return void 0;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(Subtitle, { title: group, small: true }),
      fields.map((inputField) => {
        const field = editableMetadata.rows.find(
          (editedMetadataField) => editedMetadataField.key === inputField.name
        ) ?? {
          key: inputField.name,
          value: "",
          initialValue: "",
          warnings: [],
          errors: []
        };
        if (!submitMode && inputField.noEdit) {
          return null;
        }
        return /* @__PURE__ */ jsx(
          EditableDataRow,
          {
            inputField,
            row: field,
            onChange: (editedRow) => setEditableMetadata((prevMetadata) => prevMetadata.updateWith(editedRow))
          },
          "raw_metadata" + inputField.name
        );
      })
    ] }, group);
  })
] });
const SubmissionIdRow = ({ submissionId }) => /* @__PURE__ */ jsxs("tr", { children: [
  /* @__PURE__ */ jsx("td", { className: "w-1/4", children: "ID:" }),
  /* @__PURE__ */ jsx("td", { className: "pr-3 text-right " }),
  /* @__PURE__ */ jsx("td", { className: "w-full", children: submissionId })
] });

const FileUploadComponent = ({
  setFile,
  name,
  ariaLabel,
  fileKind,
  small = false,
  initialValue = void 0,
  showUndo = false,
  onDownload = void 0,
  downloadDisabled = false
}) => {
  const [myFile, rawSetMyFile] = useState(initialValue);
  const [isDragOver, setIsDragOver] = useState(false);
  const isClient = useClientFlag();
  const [isEdited, setIsEdited] = useState(false);
  const setMyFile = useCallback(
    async (file) => {
      let processedFile = void 0;
      if (file !== null) {
        const processingResult = await fileKind.processRawFile(file);
        processedFile = processingResult.match(
          (value) => {
            if (value.warnings().length) {
              toast.warn(value.warnings().join(" "));
            }
            return value;
          },
          (error) => {
            toast.error(error.message, { autoClose: false });
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            return void 0;
          }
        );
      }
      await setFile(processedFile);
      rawSetMyFile(processedFile);
      if (processedFile === void 0 && initialValue !== void 0) {
        setIsEdited(true);
      } else if (processedFile !== void 0 && initialValue === void 0) {
        setIsEdited(true);
      } else if (processedFile === void 0 && initialValue === void 0) {
        setIsEdited(false);
      } else {
        const initialText = await initialValue.text();
        const currentText = await processedFile.text();
        setIsEdited(initialText !== currentText);
      }
    },
    [setFile, rawSetMyFile]
  );
  const reset = async () => {
    await setFile(initialValue);
    rawSetMyFile(initialValue);
    setIsEdited(false);
  };
  const fileInputRef = useRef(null);
  const handleUpload = () => {
    document.getElementById(name)?.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    void setMyFile(file);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      myFile?.handle().slice(0, 1).arrayBuffer().catch(() => {
        void setMyFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, [myFile, setMyFile]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col ${small ? "h-24" : "h-40"} w-full rounded-lg border ${myFile ? "border-hidden" : "border-dashed border-gray-900/25"} ${isDragOver && !myFile ? "bg-green-100" : ""} relative`,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      children: [
        small ? /* @__PURE__ */ jsx(fileKind.icon, { className: "mx-auto mt-2 mb-0 h-8 w-8 text-gray-300", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(fileKind.icon, { className: "mx-auto mt-4 mb-0 h-12 w-12 text-gray-300", "aria-hidden": "true" }),
        !myFile ? /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center justify-center flex-1 py-2 px-4`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "inline cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    handleUpload();
                  },
                  children: "Upload"
                }
              ),
              isClient && /* @__PURE__ */ jsx(
                "input",
                {
                  id: name,
                  name,
                  type: "file",
                  className: "sr-only",
                  "aria-label": ariaLabel,
                  "data-testid": name,
                  onChange: (event) => {
                    const file = event.target.files?.[0] ?? null;
                    void setMyFile(file);
                  },
                  ref: fileInputRef
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { className: "pl-1", children: "or drag and drop" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm pb+2 leading-5 text-gray-600", children: [
            fileKind.supportedExtensions.join(", "),
            " file"
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center flex-1 px-4 py-2", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-1", children: myFile.handle().name }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => void setMyFile(null),
              "data-testid": `discard_${name}`,
              className: "text-xs break-words text-gray-700 py-1.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50",
              children: "Discard file"
            }
          )
        ] }),
        showUndo && isEdited && /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-transparent",
            onClick: () => void reset(),
            "aria-label": `Undo ${name}`,
            "data-testid": `undo_${name}`,
            children: /* @__PURE__ */ jsx("div", { className: "tooltip tooltip-info whitespace-pre-line", "data-tip": "Revert to initial data", children: /* @__PURE__ */ jsx(ForwardRef$4, { color: "action" }) })
          }
        ) }),
        onDownload && myFile && /* @__PURE__ */ jsx("div", { className: `absolute top-1 ${showUndo && isEdited ? "right-10" : "right-2"}`, children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-transparent",
            onClick: onDownload,
            disabled: downloadDisabled,
            "aria-label": `Download ${name}`,
            "data-testid": `download_${name}`,
            children: /* @__PURE__ */ jsx("div", { className: "tooltip tooltip-info whitespace-pre-line", "data-tip": "Download sequence", children: /* @__PURE__ */ jsx(
              ForwardRef$6,
              {
                className: `${downloadDisabled ? "text-gray-200" : "text-gray-400 hover:text-gray-600"} transition-colors`
              }
            ) })
          }
        ) })
      ]
    }
  );
};

const materialSymbolsLightDataTableOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zM5 8.998h14V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616zm0 5.004h14V9.998H5zM5.616 19h12.769q.23 0 .423-.192t.192-.424v-3.382H5v3.382q0 .231.192.424t.423.192M6.77 7.804V6.188h1.615v1.616zm0 5.004v-1.616h1.615v1.616zm0 5.003v-1.615h1.615v1.615z" }) });
const ForwardRef$1 = forwardRef(materialSymbolsLightDataTableOutline);

const phDnaLight = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 256 256", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M198 204.5V232a6 6 0 0 1-12 0v-27.5a65.64 65.64 0 0 0-36.48-59l-48.4-24.2A77.57 77.57 0 0 1 58 51.5V24a6 6 0 0 1 12 0v27.5a65.64 65.64 0 0 0 36.48 59l48.4 24.2A77.57 77.57 0 0 1 198 204.5m-38-2.5H70.05A66 66 0 0 1 74 182h74.13a6 6 0 0 0 0-12H79.77a65.9 65.9 0 0 1 17.16-18.7a6 6 0 0 0-7.1-9.67A78.27 78.27 0 0 0 58 204.5V232a6 6 0 0 0 12 0v-18h90a6 6 0 0 0 0-12m32-184a6 6 0 0 0-6 6v18H96a6 6 0 0 0 0 12h90a66 66 0 0 1-4 20h-74.11a6 6 0 1 0 0 12h68.34a65.9 65.9 0 0 1-17.16 18.7a6 6 0 0 0 7.1 9.67A78.27 78.27 0 0 0 198 51.5V24a6 6 0 0 0-6-6" }) });
const ForwardRef = forwardRef(phDnaLight);

const COMPRESSION_EXTENSIONS = ["zst", "gz", "zip", "xz"];
const METADATA_FILE_KIND = {
  type: "metadata",
  icon: ForwardRef$1,
  supportedExtensions: ["tsv", "xlsx", "xls"],
  processRawFile: async (file) => {
    const fileNameParts = file.name.toLowerCase().split(".");
    const extension = fileNameParts[fileNameParts.length - 1];
    const isCompressed = COMPRESSION_EXTENSIONS.includes(extension);
    const dataExtension = isCompressed ? fileNameParts[fileNameParts.length - 2] : extension;
    const compressionExtension = isCompressed ? extension : null;
    if (dataExtension === "tsv" && !isCompressed) return ok(new RawFile(file));
    if (dataExtension === "tsv" && isCompressed) return ok(new CompressedFile(file));
    if (dataExtension === "xlsx" || dataExtension === "xls") {
      if (isCompressed && compressionExtension === "xz") {
        return err(
          new Error(
            "LZMA compression (.xz files) is not supported with Excel files yet. Please use a different compression format for Excel files."
          )
        );
      }
      const compression = isCompressed ? compressionExtension : null;
      const excelFile = new ExcelFile(file, compression);
      try {
        await excelFile.init();
      } catch (error) {
        return err(error);
      }
      return ok(excelFile);
    }
    return err(
      new Error(
        `Unsupported file extension for metadata upload. Please use one of: ${METADATA_FILE_KIND.supportedExtensions.join(
          ", "
        )}.`
      )
    );
  }
};
const FASTA_FILE_KIND = {
  type: "fasta",
  icon: ForwardRef,
  supportedExtensions: ["fasta"],
  processRawFile: (file) => Promise.resolve(ok(new RawFile(file)))
};
const PLAIN_SEGMENT_KIND = {
  type: "singleSegment",
  icon: ForwardRef,
  supportedExtensions: ["sequence"],
  processRawFile: async (file) => {
    const text = await file.text();
    const lines = text.split("\n");
    const firstUntrimmedLine = lines.findIndex((l) => l.trim() !== l);
    if (firstUntrimmedLine >= 0) {
      return err(
        new Error(
          `Line ${firstUntrimmedLine + 1} contains leading or trailing whitespace, which is not allowed.`
        )
      );
    }
    const headerLineCount = lines.filter((l) => l.startsWith(">")).length;
    if (headerLineCount > 1) {
      return err(
        new Error(`Found ${headerLineCount} headers in uploaded file, only a single header is allowed.`)
      );
    }
    const segmentData = lines.filter((l) => !l.startsWith(">")).map((l) => l.trim()).join("");
    if (segmentData.length === 0) {
      return err(new Error("Uploaded file does not appear to contain any sequence data."));
    }
    return ok({
      inner: () => {
        const blob = new Blob([segmentData], { type: "text/plain" });
        return new File([blob], "segment.txt", { type: "text/plain" });
      },
      text: () => Promise.resolve(segmentData),
      handle: () => file,
      warnings: () => []
    });
  }
};
class RawFile {
  constructor(innerFile) {
    this.innerFile = innerFile;
  }
  inner() {
    return this.innerFile;
  }
  handle() {
    return this.innerFile;
  }
  async text() {
    return this.innerFile.text();
  }
  warnings() {
    return [];
  }
}
class VirtualFile extends RawFile {
  constructor(content, fileName = "virtual.txt") {
    const blob = new Blob([content]);
    super(new File([blob], fileName));
  }
}
const isSupportedInBrowserCompressionKind = (s) => ["zst", "gz", "zip"].includes(s);
async function decompress(compressedData, compression) {
  switch (compression) {
    case "zst": {
      const array = fzstd.decompress(new Uint8Array(compressedData));
      return array.buffer.slice(array.byteOffset, array.byteOffset + array.byteLength);
    }
    case "gz": {
      return fflate.decompressSync(new Uint8Array(compressedData)).buffer;
    }
    case "zip": {
      const zip = JSZip.loadAsync(compressedData);
      return zip.then((z) => z.files[Object.keys(z.files)[0]].async("arraybuffer"));
    }
  }
}
class CompressedFile extends RawFile {
  async text() {
    const fileNameSegments = this.inner().name.split(".");
    const compressionType = fileNameSegments[fileNameSegments.length - 1].toLowerCase();
    if (isSupportedInBrowserCompressionKind(compressionType)) {
      return this.inner().arrayBuffer().then((b) => decompress(b, compressionType)).then((b) => new TextDecoder("utf-8").decode(b));
    }
    if (compressionType === "xz") throw new Error("xz files cannot be opened for editing.");
    throw new Error(`Unknown extension: ${compressionType}`);
  }
}
class ExcelFile {
  originalFile;
  compression;
  tsvFile;
  processingWarnings;
  constructor(excelFile, compression = null) {
    this.originalFile = excelFile;
    this.compression = compression;
    this.processingWarnings = [];
  }
  async getRawData() {
    const compression = this.compression;
    const buffer = this.originalFile.arrayBuffer();
    return compression === null ? buffer : buffer.then((b) => decompress(b, compression));
  }
  async init() {
    const rawData = await this.getRawData();
    const workbook = XLSX.read(rawData, {
      cellDates: true
    });
    const firstSheetName = workbook.SheetNames[0];
    let sheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    sheet = XLSX.utils.json_to_sheet(json, {
      cellDates: true,
      dateNF: "yyyy-mm-dd"
      // use this format to 'render' date cells
    });
    const tsvContent = XLSX.utils.sheet_to_csv(sheet, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FS: "	",
      blankrows: false
    });
    const rowCount = tsvContent.split("\n").length - 1;
    if (rowCount <= 0) {
      throw new Error(`Sheet ${firstSheetName} is empty.`);
    }
    const tsvBlob = new Blob([tsvContent], { type: "text/tab-separated-values" });
    const tsvFile = new File([tsvBlob], "converted.tsv", { type: "text/tab-separated-values" });
    this.tsvFile = tsvFile;
    if (workbook.SheetNames.length > 1) {
      this.processingWarnings.push(
        `The file contains ${workbook.SheetNames.length} sheets, only the first sheet (${firstSheetName}; ${rowCount} rows) was processed.`
      );
    }
  }
  inner() {
    if (this.tsvFile === void 0) {
      throw new Error("file was not initialized");
    }
    return this.tsvFile;
  }
  async text() {
    return this.inner().text();
  }
  handle() {
    return this.originalFile;
  }
  warnings() {
    return this.processingWarnings;
  }
}

function generateAndDownloadFastaFile(accessionVersion, sequenceData, segmentKey, isSingleSegment = false) {
  const fileName = isSingleSegment || !segmentKey ? `${accessionVersion}.fasta` : `${accessionVersion}_${segmentKey}.fasta`;
  const header = isSingleSegment || !segmentKey ? accessionVersion : `${accessionVersion}_${segmentKey}`;
  const fileContent = `>${header}
${sequenceData}`;
  const blob = new Blob([fileContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
class EditableSequences {
  constructor(rows) {
    this.rows = rows;
  }
  static emptyRows(names) {
    return names.map((name) => ({
      key: name,
      initialValue: "",
      value: "",
      errors: [],
      warnings: []
    }));
  }
  isMultsegmented() {
    return this.rows.length > 1;
  }
  /**
   * @param initialData The sequence entry to edit, from which the initial sequence data is taken.
   * @param segmentNames All segment names for the organism of the sequence. This is used to include empty segments.
   */
  static fromInitialData(initialData, segmentNames) {
    const emptyRows = this.emptyRows(segmentNames);
    const existingDataRows = Object.entries(initialData.originalData.unalignedNucleotideSequences).map(
      ([key, value]) => ({
        key,
        initialValue: value,
        value,
        ...mapErrorsAndWarnings(initialData, key, "NucleotideSequence")
      })
    );
    const mergedRows = [];
    emptyRows.forEach((row) => {
      const existingRow = existingDataRows.find((r) => r.key === row.key);
      if (existingRow) {
        mergedRows.push(existingRow);
      } else {
        mergedRows.push(row);
      }
    });
    return new EditableSequences(mergedRows);
  }
  /**
   * Create an empty {@link EditableSequences} object from segment names.
   * Each segment will be empty initially.
   */
  static fromSequenceNames(segmentNames) {
    return new EditableSequences(this.emptyRows(segmentNames));
  }
  /**
   * Create a new {@link EditableSequences} object with the given row value updated.
   */
  update(editedRow) {
    return new EditableSequences(
      this.rows.map(
        (prevRow) => prevRow.key === editedRow.key ? { ...prevRow, value: editedRow.value.trim() } : prevRow
      )
    );
  }
  getSequenceFasta(submissionId) {
    const filledRows = this.rows.filter((row) => row.value.trim() !== "");
    if (filledRows.length === 0) return void 0;
    const fastaContent = !this.isMultsegmented() ? `>${submissionId}
${filledRows[0].value}` : filledRows.map((sequence) => `>${submissionId}_${sequence.key}
${sequence.value}`).filter(Boolean).join("\n");
    return new File([fastaContent], "sequences.fasta", { type: "text/plain" });
  }
  getSequenceRecord() {
    return this.rows.filter((row) => row.value.trim() !== "").reduce((prev, row) => ({ ...prev, [row.key]: row.value }), {});
  }
}
const SequencesForm = ({
  editableSequences,
  setEditableSequences,
  dataToEdit,
  isLoading
}) => {
  const singleSegment = editableSequences.rows.length === 1;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h3", { className: "subtitle", children: `Nucleotide sequence${singleSegment ? "" : "s"}` }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-6", children: editableSequences.rows.map((field) => /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-56", children: [
      !singleSegment && /* @__PURE__ */ jsxs("label", { className: "text-gray-900 font-medium text-sm block", children: [
        field.key,
        " segment"
      ] }),
      /* @__PURE__ */ jsx(
        FileUploadComponent,
        {
          setFile: async (file) => {
            const text = file ? await file.text() : "";
            setEditableSequences(
              (editableSequences2) => editableSequences2.update({
                key: field.key,
                value: text
              })
            );
          },
          name: `${field.key}_segment_file`,
          ariaLabel: `${field.key} Segment File`,
          fileKind: PLAIN_SEGMENT_KIND,
          small: true,
          initialValue: field.initialValue.length > 0 ? new VirtualFile(field.initialValue, "Existing data") : void 0,
          showUndo: true,
          onDownload: field.initialValue.length > 0 && dataToEdit ? () => {
            const accessionVersion = `${dataToEdit.accession}.${dataToEdit.version}`;
            generateAndDownloadFastaFile(
              accessionVersion,
              field.initialValue,
              field.key,
              singleSegment
            );
          } : void 0,
          downloadDisabled: isLoading
        }
      )
    ] }, field.key)) })
  ] });
};

export { EditableMetadata as E, FileUploadComponent as F, InputFieldTooltip as I, MetadataForm as M, RawFile as R, Subtitle as S, EditableSequences as a, SubmissionIdRow as b, SequencesForm as c, FASTA_FILE_KIND as d, METADATA_FILE_KIND as e };
