import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { isErrorFromAlias } from '@zodios/core';
import { DateTime } from 'luxon';
import { useState, useEffect, forwardRef } from 'react';
import { r as routes, S as SubmissionRouteUtils } from './routes_BftQyUXo.mjs';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { err, ok } from 'neverthrow';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import '@lokalise/xlsx';
import 'jszip';
import { I as InputFieldTooltip, F as FileUploadComponent, d as FASTA_FILE_KIND, e as METADATA_FILE_KIND, R as RawFile, E as EditableMetadata, a as EditableSequences, M as MetadataForm, c as SequencesForm } from './SequencesForm_BqEDMvJC.mjs';
import { B as BaseDialog } from './BaseDialog_SQxsW21v.mjs';
import { g as getClientLogger } from './clientLogger_iKuJ-UyB.mjs';
import { produce } from 'immer';
import { u as useClientFlag } from './isClient_EhWp56WR.mjs';
import { B as BackendClient, a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';
import { D as DataUseTermsSelector } from './DataUseTermsSelector_D8ph774s.mjs';
import { b as backendClientHooks, f as backendApi } from './serviceHooks_DslcN1kS.mjs';
import { a5 as openDataUseTermsOption, U as restrictedDataUseTermsOption } from './config_CQtV1zSN.mjs';
import { s as stringifyMaybeAxiosError } from './stringifyMaybeAxiosError_D1gzvjBG.mjs';
import { d as displayConfirmationDialog } from './ConfirmationDialog_BWzbBNGK.mjs';
import { D as DisabledUntilHydrated } from './DisabledUntilHydrated_Cq3qsxAK.mjs';
import { w as withQueryProvider } from './withQueryProvider_BqTp-ccD.mjs';

const metadataFormatDocsUrl = "/docs/concepts/metadataformat/?organism={organism}";

const stringSimilarity = (str1, str2, substringLength = 2, caseSensitive = false) => {
  if (!caseSensitive) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }
  if (str1.length < substringLength || str2.length < substringLength) return 0;
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < str1.length - (substringLength - 1); i++) {
    const substr1 = str1.substring(i, i + substringLength);
    map.set(substr1, (map.get(substr1) ?? 0) + 1);
  }
  let match = 0;
  for (let j = 0; j < str2.length - (substringLength - 1); j++) {
    const substr2 = str2.substring(j, j + substringLength);
    const count = map.get(substr2) ?? 0;
    if (count > 0) {
      map.set(substr2, count - 1);
      match++;
    }
  }
  return match * 2 / (str1.length + str2.length - (substringLength - 1) * 2);
};

class ColumnMapping {
  constructor(map) {
    this.map = map;
  }
  static getBestMatchingTargetColumn(sourceColumn, inputFields) {
    if (inputFields.length === 0) return null;
    const [bestMatch, score] = inputFields.map((field) => {
      const score2 = Math.max(
        stringSimilarity(sourceColumn, field.name),
        stringSimilarity(sourceColumn, field.displayName ?? "")
      );
      return [field.name, score2];
    }).reduce((maxItem, currentItem) => currentItem[1] > maxItem[1] ? currentItem : maxItem);
    return score > 0.8 ? bestMatch : null;
  }
  /* Create a new mapping with the given columns, doing a best-effort to pre-match columns. */
  static fromColumns(sourceColumns, inputFields) {
    const mapping = /* @__PURE__ */ new Map();
    let availableFields = inputFields;
    let remainingSourceColumns = sourceColumns;
    sourceColumns.forEach((sourceColumn) => mapping.set(sourceColumn, null));
    sourceColumns.forEach((sourceColumn) => {
      const foundField = availableFields.find(
        (inputField) => inputField.name === sourceColumn || inputField.displayName === sourceColumn
      );
      if (foundField) {
        mapping.set(sourceColumn, foundField.name);
        availableFields = availableFields.filter((f) => f.name !== sourceColumn);
        remainingSourceColumns = remainingSourceColumns.filter((f) => f !== sourceColumn);
      }
    });
    if (remainingSourceColumns.includes("submissionId") && availableFields.find((f) => f.name === "id")) {
      mapping.set("submissionId", "id");
      availableFields = availableFields.filter((f) => f.name !== "id");
      remainingSourceColumns = remainingSourceColumns.filter((f) => f !== "submissionId");
    }
    remainingSourceColumns.forEach((sourceColumn) => {
      const bestMatch = this.getBestMatchingTargetColumn(sourceColumn, availableFields);
      mapping.set(sourceColumn, bestMatch);
      availableFields = availableFields.filter((field) => field.name !== bestMatch);
    });
    return new ColumnMapping(mapping);
  }
  /* Update the mapping with new source and target columns, keeping previously mapped values. */
  update(newSourceColumns, newInputFields) {
    const newMapping = new Map(
      newSourceColumns.map((newSourceCol) => {
        const prevTargetCol = this.map.get(newSourceCol);
        if (prevTargetCol && newInputFields.map((f) => f.name).includes(prevTargetCol)) {
          return [newSourceCol, prevTargetCol];
        } else {
          return [newSourceCol, null];
        }
      })
    );
    return new ColumnMapping(newMapping);
  }
  /* Returns the entries in the mapping as a list. Each item in the list has:
   * - The source column name
   * - The target column name
   */
  entries() {
    return Array.from(this.map.entries());
  }
  usedColumns() {
    return Array.from(this.map.values()).filter((v) => v !== null);
  }
  updateWith(sourceColumn, targetColumn) {
    const newMapping = new Map(this.map);
    newMapping.set(sourceColumn, targetColumn);
    this.map.forEach((targetCol, srcCol) => targetCol === targetColumn && newMapping.set(srcCol, null));
    return new ColumnMapping(newMapping);
  }
  /* Apply this mapping to a TSV file, returning a new file with remapped columns. */
  async applyTo(tsvFile) {
    const text = await tsvFile.text();
    const parsed = Papa.parse(text, { delimiter: "	", skipEmptyLines: true });
    const inputRows = parsed.data;
    const headersInFile = inputRows.splice(0, 1)[0];
    const headers = [];
    const indices = [];
    this.entries().forEach(([sourceCol, targetCol]) => {
      if (targetCol === null) return;
      headers.push(targetCol);
      indices.push(headersInFile.findIndex((sourceHeader) => sourceHeader === sourceCol));
    });
    const newRows = inputRows.map((row) => indices.map((i) => row[i]));
    const newFileContent = Papa.unparse([headers, ...newRows], { delimiter: "	", newline: "\n" });
    return new File([newFileContent], "remapped.tsv");
  }
  equals(other) {
    if (other === null) {
      return false;
    }
    const mapsAreEqual = (m1, m2) => m1.size === m2.size && Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key));
    return mapsAreEqual(this.map, other.map);
  }
}

const ColumnMappingModal = ({
  inputFile,
  columnMapping,
  setColumnMapping,
  groupedInputFields
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [currentMapping, setCurrentMapping] = useState(null);
  const [inputColumns, setInputColumns] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    const loadColumns = async () => {
      const columnExtractionResult = await extractColumns(inputFile);
      columnExtractionResult.match(
        (inputColumns2) => setInputColumns(inputColumns2),
        (error) => {
          toast.error(`Could not read file header: ${error.message}`);
          setIsOpen(false);
        }
      );
    };
    void loadColumns();
  }, [isOpen, inputFile, setInputColumns]);
  useEffect(() => {
    if (inputColumns === null) return;
    const inputFields = Array.from(groupedInputFields.values()).flat();
    if (columnMapping !== null) {
      setCurrentMapping(columnMapping.update(inputColumns, inputFields));
    } else {
      setCurrentMapping(ColumnMapping.fromColumns(inputColumns, inputFields));
    }
  }, [inputColumns, columnMapping, groupedInputFields, setCurrentMapping]);
  const handleSubmit = () => {
    setColumnMapping(currentMapping);
    closeDialog();
  };
  const handleDiscard = () => {
    setColumnMapping(null);
    closeDialog();
  };
  const requiredFieldsWithDuplicates = Array.from(groupedInputFields.values()).flat().filter((f) => f.required);
  const requiredFields = requiredFieldsWithDuplicates.filter(
    (f, i) => requiredFieldsWithDuplicates.findIndex((x) => x.name === f.name) === i
  );
  const missingFields = requiredFields.filter((field) => !currentMapping?.usedColumns().includes(field.name));
  const isChanged = !columnMapping?.equals(currentMapping);
  const submittable = isChanged && missingFields.length === 0;
  const openModalButtonText = columnMapping !== null ? "Edit column mapping" : "Add column mapping";
  const saveButtonText = columnMapping === null ? "Add this mapping" : "Save";
  const minWidthStyle = calculateMinWidthStyleFromPossibleOptions(groupedInputFields);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "text-xs break-words text-gray-700 py-1.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50",
        "data-tooltip-id": "columnMapping",
        onClick: (e) => {
          e.preventDefault();
          openDialog();
        },
        children: openModalButtonText
      }
    ),
    /* @__PURE__ */ jsxs(
      Tooltip,
      {
        id: "columnMapping",
        place: "bottom",
        globalCloseEvents: { scroll: true, clickOutsideAnchor: true },
        openEvents: { mouseenter: true, focus: false },
        closeEvents: { mouseleave: true, blur: true },
        children: [
          "If your metadata file does not use the defined field names, this allow you",
          /* @__PURE__ */ jsx("br", {}),
          "to map columns in your file to the fields expected by the database."
        ]
      }
    ),
    /* @__PURE__ */ jsx(BaseDialog, { title: "Remap columns", isOpen, onClose: closeDialog, fullWidth: false, children: currentMapping === null || inputColumns === null ? "Loading ..." : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-2 sm:min-w-56", children: "Column in your file" }),
          /* @__PURE__ */ jsx("th", { style: minWidthStyle, children: "Submission column" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: currentMapping.entries().map(([sourceCol, targetCol]) => /* @__PURE__ */ jsx(
          ColumnSelectorRow,
          {
            selectingFor: sourceCol,
            selectedOption: targetCol,
            options: groupedInputFields,
            usedOptions: currentMapping.usedColumns(),
            setColumnMapping: setCurrentMapping
          },
          sourceCol
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-h-6 text-sm", children: missingFields.length > 0 && "All required fields need to be set to apply this mapping." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 justify-end", children: [
        columnMapping !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn bg-white text-red-800 border-red-800",
              onClick: handleDiscard,
              children: "Discard Mapping"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex-1" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: closeDialog, children: "Cancel" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn loculusColor text-white",
            onClick: handleSubmit,
            disabled: !submittable,
            children: saveButtonText
          }
        )
      ] })
    ] }) })
  ] });
};
async function extractColumns(tsvFile) {
  let text;
  try {
    text = await tsvFile.text();
  } catch (error) {
    return Promise.resolve(err(error));
  }
  const parsed = Papa.parse(text, { delimiter: "	", skipEmptyLines: true });
  return ok(parsed.data[0]);
}
const ColumnSelectorRow = ({
  selectingFor,
  options,
  usedOptions,
  selectedOption,
  setColumnMapping
}) => {
  const selectedField = selectedOption ? Array.from(options.values()).flat().find((o) => o.name === selectedOption) : void 0;
  const selectedOptionText = selectedField?.displayName ?? selectedField?.name;
  const isExactMatch = selectedField?.displayName === selectingFor || selectedField?.name === selectingFor;
  const minWidthStyle = calculateMinWidthStyleFromPossibleOptions(options);
  const inputFieldToListboxOption = (header, field) => /* @__PURE__ */ jsxs(
    ListboxOption,
    {
      value: field.name,
      className: `data-[focus]:bg-primary-200 p-1 pl-3 rounded-sm ${selectedOption === field.name ? "bg-gray-200" : ""}`,
      "data-tooltip-id": `${header}-${field.name}-tooltip`,
      children: [
        /* @__PURE__ */ jsx("span", { className: usedOptions.includes(field.name) ? "text-gray-400" : "", children: field.displayName ?? field.name }),
        /* @__PURE__ */ jsx(InputFieldTooltip, { id: `${header}-${field.name}-tooltip`, field })
      ]
    },
    `${header}-${field.name}`
  );
  return /* @__PURE__ */ jsxs("tr", { className: "border-gray-400 border-solid border-x-0 border-y", children: [
    /* @__PURE__ */ jsx("td", { className: "pr-4", children: selectingFor }),
    /* @__PURE__ */ jsx("td", { style: minWidthStyle, children: /* @__PURE__ */ jsxs(
      Listbox,
      {
        value: selectedOption,
        onChange: (newValue) => setColumnMapping((currentMapping) => currentMapping.updateWith(selectingFor, newValue)),
        children: [
          /* @__PURE__ */ jsx(ListboxButton, { className: "rounded-md border-none px-0 py-1 w-full pr-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mr-0", children: [
            selectedOption ? /* @__PURE__ */ jsx("span", { className: isExactMatch ? "" : "italic", children: selectedOptionText }) : /* @__PURE__ */ jsx("span", { className: "italic text-gray-400", children: "unmapped" }),
            /* @__PURE__ */ jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 mb-1 rotate-180 text-gray-500", children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 3l7 10H3l7-10z" })
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs(ListboxOptions, { anchor: "top", className: "bg-gray-100 p-1 rounded-sm text-sm", children: [
            /* @__PURE__ */ jsx(ListboxOption, { value: null, className: "data-[focus]:bg-primary-200 p-1", children: /* @__PURE__ */ jsx("span", { className: "italic", children: "unmapped" }) }, ""),
            /* @__PURE__ */ jsx("div", { className: "w-10/12 mx-auto my-1 h-0.5 bg-gray-200" }, "border"),
            Array.from(options.entries()).map(([header, fields]) => {
              if (fields.length === 0) return;
              return /* @__PURE__ */ jsxs("div", { className: "pt-1", children: [
                /* @__PURE__ */ jsx("div", { className: "p-1 font-semibold", children: header }),
                fields.map((field) => inputFieldToListboxOption(header, field))
              ] }, header);
            })
          ] })
        ]
      }
    ) })
  ] }, selectingFor);
};
function calculateMinWidthStyleFromPossibleOptions(options) {
  const maxOptionTextLength = Math.max(
    ...Array.from(options.values()).flat().flatMap((x) => [x.name, x.displayName]).map((text) => text?.length ?? 0)
  );
  return { minWidth: `${Math.ceil(maxOptionTextLength / 2) + 2}rem` };
}

const dataUploadDocsUrl = "/docs/how-to/upload-sequences";

const SequenceEntryUpload = ({
  organism,
  action,
  metadataFile,
  setMetadataFile,
  sequenceFile,
  setSequenceFile,
  columnMapping,
  setColumnMapping,
  referenceGenomeSequenceNames,
  metadataTemplateFields,
  enableConsensusSequences,
  isMultiSegmented
}) => {
  const [exampleEntries, setExampleEntries] = useState(10);
  const handleLoadExampleData = () => {
    const { metadataFileContent, revisedMetadataFileContent, sequenceFileContent } = getExampleData(exampleEntries);
    const exampleMetadataContent = action === `submit` ? metadataFileContent : revisedMetadataFileContent;
    const metadataFile2 = createTempFile(exampleMetadataContent, "text/tab-separated-values", "metadata.tsv");
    setMetadataFile(new RawFile(metadataFile2));
    if (enableConsensusSequences) {
      const sequenceFile2 = createTempFile(sequenceFileContent, "application/octet-stream", "sequences.fasta");
      setSequenceFile(new RawFile(sequenceFile2));
    }
  };
  const finalMetadataFormatDocsUrl = metadataFormatDocsUrl.replace("{organism}", organism);
  return /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-x-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg", children: enableConsensusSequences ? "Sequences and metadata" : "Metadata" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
        "Select your ",
        enableConsensusSequences && "sequence data and ",
        "metadata files"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-xs mt-5", children: [
        action === "revise" && /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsxs("strong", { children: [
          'For revisions, your metadata file must contain an "accession" column, containing for each row the accession already in the database. ',
          /* @__PURE__ */ jsx("br", {})
        ] }) }),
        "The documentation pages contain more details on the required",
        " ",
        /* @__PURE__ */ jsx("a", { href: finalMetadataFormatDocsUrl, className: "text-primary-700 opacity-90", children: "metadata format" }),
        " ",
        "including a list of all supported metadata. You can download a",
        " ",
        /* @__PURE__ */ jsx("a", { href: routes.metadataTemplate(organism, action, "tsv"), className: "text-primary-700 opacity-90", children: "TSV" }),
        " or ",
        /* @__PURE__ */ jsx("a", { href: routes.metadataTemplate(organism, action, "xlsx"), className: "text-primary-700 opacity-90", children: "XLSX" }),
        " ",
        "template with column headings for the metadata file."
      ] }),
      isMultiSegmented && /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-xs mt-3", children: [
        organism.toUpperCase(),
        " has a multi-segmented genome. Please submit one metadata entry with a unique ",
        /* @__PURE__ */ jsx("i", { children: "submissionId" }),
        " for the full multi-segmented sample, e.g. ",
        /* @__PURE__ */ jsx("b", { children: "sample1" }),
        ". Sequence data should be a FASTA file with each header indicating the ",
        /* @__PURE__ */ jsx("i", { children: "submissionId" }),
        " and the segment, i.e.",
        " ",
        referenceGenomeSequenceNames.nucleotideSequences.map((name, index) => /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
          "sample1_",
          name,
          index !== referenceGenomeSequenceNames.nucleotideSequences.length - 1 ? ", " : ""
        ] }, index)),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-xs mt-3", children: [
        "Files can optionally be compressed using ",
        /* @__PURE__ */ jsx("i", { children: ".zst" }),
        ", ",
        /* @__PURE__ */ jsx("i", { children: ".zip" }),
        " or ",
        /* @__PURE__ */ jsx("i", { children: ".gz" }),
        "; for FASTA files",
        " ",
        /* @__PURE__ */ jsx("i", { children: ".xz" }),
        " is also supported. For more information please refer to the",
        " ",
        /* @__PURE__ */ jsx("a", { href: dataUploadDocsUrl, className: "text-primary-700 opacity-90", children: "help pages" }),
        "."
      ] }),
      (organism.startsWith("not-aligned-organism") || organism.startsWith("dummy-organism")) && action === "submit" && /* @__PURE__ */ jsx(
        DevExampleData,
        {
          setExampleEntries,
          exampleEntries,
          handleLoadExampleData,
          dataIsLoaded: !!metadataFile && (!enableConsensusSequences || !!sequenceFile)
        }
      )
    ] }),
    /* @__PURE__ */ jsx("form", { className: "sm:col-span-2 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
      enableConsensusSequences && /* @__PURE__ */ jsxs("div", { className: "w-60 space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-gray-900 font-medium text-sm block", children: "Sequence file" }),
        /* @__PURE__ */ jsx(
          FileUploadComponent,
          {
            setFile: setSequenceFile,
            name: "sequence_file",
            ariaLabel: "Sequence File",
            fileKind: FASTA_FILE_KIND
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-60 space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-gray-900 font-medium text-sm block", children: "Metadata file" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full", children: [
          /* @__PURE__ */ jsx(
            FileUploadComponent,
            {
              setFile: setMetadataFile,
              name: "metadata_file",
              ariaLabel: "Metadata File",
              fileKind: METADATA_FILE_KIND
            }
          ),
          metadataFile !== void 0 && /* @__PURE__ */ jsx(
            ColumnMappingModal,
            {
              inputFile: metadataFile,
              columnMapping,
              setColumnMapping,
              groupedInputFields: metadataTemplateFields
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const DevExampleData = ({
  setExampleEntries,
  exampleEntries,
  handleLoadExampleData,
  dataIsLoaded
}) => {
  return /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-xs mt-5 opacity-50", children: [
    "Add dev example data",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "number",
        value: exampleEntries ?? "",
        onChange: (event) => setExampleEntries(parseInt(event.target.value, 10)),
        className: "w-32 h-6 rounded"
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: handleLoadExampleData, className: "border rounded px-2 py-1 ml-2 h-6", children: "Load Example Data" }),
    " ",
    /* @__PURE__ */ jsx("br", {}),
    dataIsLoaded && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Data loaded" })
  ] });
};
function getExampleData(randomEntries = 20) {
  const regions = ["Europe", "Asia", "North America", "South America", "Africa", "Australia"];
  const countries = ["Switzerland", "USA", "China", "Brazil", "Nigeria", "Australia"];
  const divisions = ["Bern", "California", "Beijing", "Rio de Janeiro", "Lagos", "Sydney"];
  const hosts = ["Homo sapiens", "Canis lupus familiaris"];
  const lineages = ["A", "A.1", "A.1.1", "A.2", "B"];
  let metadataContent = "submissionId	date	region	country	division	host	lineage\n";
  let revisedMetadataContent = "accession	submissionId	date	region	country	division	host	lineage\n";
  let sequenceContent = "";
  for (let i = 0; i < randomEntries; i++) {
    const submissionId = `custom${i}`;
    const date = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1e3)).toISOString().split("T")[0];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const division = divisions[Math.floor(Math.random() * divisions.length)];
    const host = hosts[Math.floor(Math.random() * hosts.length)];
    const lineage = lineages[Math.floor(Math.random() * lineages.length)];
    metadataContent += `${submissionId}	${date}	${region}	${country}	${division}	${host}	${lineage}
`;
    revisedMetadataContent += `${i + 1}	${submissionId}	${date}	${region}	${country}	${division}	${host}	${lineage}
`;
    sequenceContent += `>${submissionId}
ACTG
`;
  }
  return {
    metadataFileContent: metadataContent,
    revisedMetadataFileContent: revisedMetadataContent,
    sequenceFileContent: sequenceContent
  };
}
function createTempFile(content, mimeType, fileName) {
  const blob = new Blob([content], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

const FormOrUploadWrapper = ({
  inputMode,
  setFileFactory,
  organism,
  action,
  referenceGenomeSequenceNames,
  metadataTemplateFields,
  submissionDataTypes
}) => {
  const enableConsensusSequences = submissionDataTypes.consensusSequences;
  const isMultiSegmented = referenceGenomeSequenceNames.nucleotideSequences.length > 1;
  const [editableMetadata, setEditableMetadata] = useState(EditableMetadata.empty());
  const [editableSequences, setEditableSequences] = useState(
    EditableSequences.fromSequenceNames(referenceGenomeSequenceNames.nucleotideSequences)
  );
  const [metadataFile, setMetadataFile] = useState(void 0);
  const [sequenceFile, setSequenceFile] = useState(void 0);
  const [columnMapping, setColumnMapping] = useState(null);
  useEffect(() => {
    setFileFactory(() => {
      return async () => {
        switch (inputMode) {
          case "form": {
            const submissionId = editableMetadata.getSubmissionId();
            if (!submissionId) {
              return { type: "error", errorMessage: "Please specify an ID." };
            }
            const metadataFile2 = editableMetadata.getMetadataTsv();
            if (!metadataFile2) {
              return { type: "error", errorMessage: "Please specify metadata." };
            }
            const sequenceFile2 = editableSequences.getSequenceFasta(submissionId);
            if (!sequenceFile2 && enableConsensusSequences) {
              return { type: "error", errorMessage: "Please enter sequence data." };
            }
            return {
              type: "ok",
              metadataFile: metadataFile2,
              sequenceFile: sequenceFile2,
              submissionId
            };
          }
          case "bulk": {
            let mFile = metadataFile?.inner();
            if (metadataFile !== void 0 && columnMapping !== null) {
              mFile = await columnMapping.applyTo(metadataFile);
            }
            if (mFile === void 0) {
              return { type: "error", errorMessage: "Please specify a metadata file." };
            }
            const sFile = sequenceFile?.inner();
            if (enableConsensusSequences && sFile === void 0) {
              return { type: "error", errorMessage: "Please specify a sequences file." };
            }
            return {
              type: "ok",
              metadataFile: mFile,
              sequenceFile: sFile
            };
          }
        }
      };
    });
  }, [editableMetadata, editableSequences, metadataFile, sequenceFile, enableConsensusSequences, columnMapping]);
  if (inputMode === "bulk") {
    return /* @__PURE__ */ jsx(
      SequenceEntryUpload,
      {
        organism,
        action,
        metadataFile,
        setMetadataFile,
        sequenceFile,
        setSequenceFile,
        columnMapping,
        setColumnMapping,
        referenceGenomeSequenceNames,
        metadataTemplateFields,
        enableConsensusSequences,
        isMultiSegmented
      }
    );
  } else {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("table", { className: "customTable", children: /* @__PURE__ */ jsx("tbody", { className: "w-full", children: /* @__PURE__ */ jsx(
        MetadataForm,
        {
          editableMetadata,
          setEditableMetadata,
          groupedInputFields: metadataTemplateFields,
          isSubmitForm: action === "submit"
        }
      ) }) }),
      enableConsensusSequences && /* @__PURE__ */ jsx(SequencesForm, { editableSequences, setEditableSequences })
    ] });
  }
};

const lucideFile = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, children: [
  /* @__PURE__ */ jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
  /* @__PURE__ */ jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
] }) });
const ForwardRef$2 = forwardRef(lucideFile);

const lucideFolderUp = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, children: [
  /* @__PURE__ */ jsx("path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Zm-8-10v6" }),
  /* @__PURE__ */ jsx("path", { d: "m9 13l3-3l3 3" })
] }) });
const ForwardRef$1 = forwardRef(lucideFolderUp);

const lucideLoader = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9" }) });
const ForwardRef = forwardRef(lucideLoader);

const FolderUploadComponent = ({
  fileCategory: fileField,
  inputMode,
  accessToken,
  clientConfig,
  group,
  setFileMapping,
  onError
}) => {
  const isClient = useClientFlag();
  const [fileUploadState, setFileUploadState] = useState(void 0);
  const [isDragging, setIsDragging] = useState(false);
  const backendClient = new BackendClient(clientConfig.backendUrl);
  function startUploading(submissionIdFileMap) {
    Object.entries(submissionIdFileMap).forEach(([submissionId, files]) => {
      files.forEach(({ file, url, fileId }) => {
        fetch(url, {
          method: "PUT",
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Content-Type": file.type
          },
          body: file
        }).then((response) => {
          setFileUploadState((state) => {
            if (state?.type === "uploadInProgress") {
              return produce(state, (draft) => {
                draft.files[submissionId] = state.files[submissionId].map((file2) => {
                  if (file2.type === "pending" && file2.fileId === fileId) {
                    if (response.ok) {
                      return {
                        type: "uploaded",
                        fileId: file2.fileId,
                        name: file2.name,
                        size: file2.size
                      };
                    } else {
                      return {
                        type: "error",
                        msg: "error",
                        name: file2.name,
                        size: file2.size
                      };
                    }
                  } else {
                    return file2;
                  }
                });
              });
            }
            return state;
          });
        }).catch((error) => {
          if (error instanceof Error) {
            onError(error.message);
          }
        });
      });
    });
  }
  useEffect(() => {
    if (fileUploadState === void 0) {
      setFileMapping((currentMapping) => {
        if (inputMode === "bulk") {
          if (currentMapping !== void 0) {
            return produce(currentMapping, (draft) => {
              Object.keys(draft).forEach((submissionId) => {
                draft[submissionId][fileField] = [];
              });
            });
          } else {
            return void 0;
          }
        } else {
          return produce(currentMapping ?? {}, (draft) => {
            draft.dummySubmissionId = {
              [fileField]: []
            };
          });
        }
      });
      return;
    }
    switch (fileUploadState.type) {
      // If awaiting URLS, request pre signed upload URLs from the backend, assign them to the files,
      // and set the state to 'uploadInProgress'.
      case "awaitingUrls": {
        const awaitingUrlCount = Object.values(fileUploadState.files).map((l) => l.length).reduce((a, b) => a + b);
        backendClient.requestUpload(accessToken, group.groupId, awaitingUrlCount).then((res) => {
          res.match(
            (fileIdAndUrlList) => {
              const pendingFiles = {};
              Object.keys(fileUploadState.files).forEach(
                (submissionId) => pendingFiles[submissionId] = []
              );
              let i = 0;
              Object.entries(fileUploadState.files).forEach(([submissionId, files]) => {
                files.forEach((file) => {
                  pendingFiles[submissionId].push({
                    type: "pending",
                    file: file.file,
                    name: file.name,
                    size: file.file.size,
                    url: fileIdAndUrlList[i].url,
                    fileId: fileIdAndUrlList[i].fileId
                  });
                  i++;
                });
              });
              setFileUploadState({
                type: "uploadInProgress",
                files: pendingFiles
              });
              startUploading(pendingFiles);
            },
            (err) => onError(err.detail)
          );
        }).catch(() => onError("failed to prepare upload."));
        break;
      }
      case "uploadInProgress": {
        if (Object.values(fileUploadState.files).flatMap((x) => x).every(({ type }) => type === "uploaded")) {
          setFileUploadState({
            type: "uploadCompleted",
            files: fileUploadState.files
          });
        }
        break;
      }
      case "uploadCompleted": {
        setFileMapping(
          (currentMapping) => produce(currentMapping ?? {}, (draft) => {
            Object.entries(fileUploadState.files).forEach(([submissionId, files]) => {
              if (currentMapping?.[submissionId] !== void 0) {
                draft[submissionId] = { ...currentMapping[submissionId] };
              } else {
                draft[submissionId] = {};
              }
              draft[submissionId][fileField] = files;
            });
          })
        );
        break;
      }
    }
  }, [fileUploadState]);
  const handleFolderSelect = (e) => {
    if (e.target.files) {
      const filesArray = filterDotFiles(Array.from(e.target.files));
      const error = isFilesArrayValid(filesArray, inputMode);
      if (error) {
        onError(error);
        return;
      }
      if (inputMode === "form") {
        setFileUploadState({
          type: "awaitingUrls",
          files: { dummySubmissionId: filesArray.map((f) => ({ file: f, name: f.name })) }
        });
      } else {
        const files = Object.fromEntries(
          filesArray.map((file) => file.webkitRelativePath.split("/")).map((pathSegments) => [pathSegments[1], []])
        );
        filesArray.forEach((file) => {
          const submissionId = file.webkitRelativePath.split("/")[1];
          files[submissionId].push({ file, name: file.name });
        });
        setFileUploadState({
          type: "awaitingUrls",
          files
        });
      }
    }
  };
  return fileUploadState === void 0 || fileUploadState.type === "awaitingUrls" ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center flex-1 py-2 px-4 border rounded-lg ${fileUploadState !== void 0 ? "border-hidden" : isDragging ? "border-dashed border-yellow-400 bg-yellow-50" : "border-dashed border-gray-900/25"}`,
      onDragEnter: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      onDragOver: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      onDragLeave: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      onDrop: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        toast.info(
          "Sorry, drag and drop is not currently supported but you can select an entire folder to upload by clicking the Upload Folder button."
        );
      },
      children: [
        /* @__PURE__ */ jsx(ForwardRef$1, { className: `mx-auto mt-4 mb-2 h-12 w-12 text-gray-300`, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { children: fileUploadState === void 0 ? /* @__PURE__ */ jsxs("label", { className: "inline relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: (e) => {
                e.preventDefault();
                document.getElementById(fileField)?.click();
              },
              children: "Upload Folder"
            }
          ),
          isClient && /* @__PURE__ */ jsx(
            "input",
            {
              id: fileField,
              name: fileField,
              type: "file",
              className: "sr-only",
              "aria-label": `Upload ${fileField}`,
              "data-testid": fileField,
              onChange: handleFolderSelect,
              ...{ webkitdirectory: "", directory: "" },
              multiple: true
            }
          )
        ] }) : /* @__PURE__ */ jsx("p", { children: "Preparing upload ..." }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm pt-2 leading-5 text-gray-600", children: "Upload an entire folder of files" })
      ]
    }
  ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left px-4 py-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-3", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Files" }),
      inputMode === "form" ? Object.values(fileUploadState.files)[0].map((file) => /* @__PURE__ */ jsx(FileListItem, { name: file.name, size: file.size, status: file.type }, file.name)) : Object.entries(fileUploadState.files).flatMap(([submissionId, files]) => [
        /* @__PURE__ */ jsx("h4", { className: "text-xs font-medium py-2", children: submissionId }, submissionId),
        ...files.map((file) => /* @__PURE__ */ jsx(FileListItem, { name: file.name, size: file.size, status: file.type }, file.name))
      ]),
      /* @__PURE__ */ jsx("ul", {})
    ] }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setFileUploadState(void 0),
        "data-testid": `discard_${fileField}`,
        className: "text-xs break-words text-gray-700 py-1.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50",
        children: "Discard files"
      }
    )
  ] });
};
const FileListItem = ({ name, size, status }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row", children: [
    /* @__PURE__ */ jsx("div", { className: "w-3.5" }),
    /* @__PURE__ */ jsx(ForwardRef$2, { className: "h-4 w-4 text-gray-500 ml-1 mr-1" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700 truncate max-w-[140px]", children: name }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 ml-2 whitespace-nowrap", children: [
        "(",
        formatFileSize(size),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-2 w-5 flex justify-center", children: getStatusIcon(status) })
  ] });
};
const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const foo = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  const bar = sizes[i];
  return `${foo} ${bar}`;
};
const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return /* @__PURE__ */ jsx(ForwardRef, { className: "animate-spin h-3 w-3 text-blue-500" });
    case "uploaded":
      return /* @__PURE__ */ jsx("span", { className: "text-green-500 text-xs", children: "✓" });
    case "error":
      return /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: "✗" });
  }
};
const filterDotFiles = (files) => {
  return files.filter((file) => {
    const segments = file.webkitRelativePath.split("/");
    return segments.every((segment) => !segment.startsWith("."));
  });
};
const isFilesArrayValid = (files, inputMode) => {
  const subdirectories = files.map((file) => file.webkitRelativePath.split("/")).filter((pathSegments) => pathSegments.length > (inputMode === "form" ? 2 : 3)).map((pathSegments) => pathSegments[pathSegments.length - 2]);
  if (subdirectories.length > 0) {
    return "Subdirectories are not yet supported.";
  }
  const toplevelFiles = files.map((file) => file.webkitRelativePath.split("/")).filter((pathSegments) => pathSegments.length < (inputMode === "form" ? 2 : 3)).map((pathSegments) => pathSegments[pathSegments.length - 1]);
  if (toplevelFiles.length > 0) {
    return `All files need to be inside a directory named with a sequence ID; these files are not: ${toplevelFiles.join(", ")}`;
  }
};

const dateTimeInMonths = (monthsFromNow) => DateTime.now().plus({ months: monthsFromNow });

const logger = getClientLogger("DataUploadForm");
const InnerDataUploadForm = ({
  accessToken,
  organism,
  clientConfig,
  action,
  inputMode,
  onSuccess,
  onError,
  group,
  referenceGenomeSequenceNames,
  metadataTemplateFields,
  submissionDataTypes,
  dataUseTermsEnabled
}) => {
  const extraFilesEnabled = submissionDataTypes.files?.enabled ?? false;
  const { submit, revise, isLoading } = useSubmitFiles(accessToken, organism, clientConfig, onSuccess, onError);
  const [fileFactory, setFileFactory] = useState(void 0);
  const [fileMapping, setFileMapping] = useState(void 0);
  const [dataUseTermsType, setDataUseTermsType] = useState(openDataUseTermsOption);
  const [restrictedUntil, setRestrictedUntil] = useState(dateTimeInMonths(6));
  const [agreedToINSDCUploadTerms, setAgreedToINSDCUploadTerms] = useState(false);
  const [confirmedNoPII, setConfirmedNoPII] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const sequenceDataResult = await fileFactory();
    if (sequenceDataResult.type === "error") {
      onError(sequenceDataResult.errorMessage);
      return;
    }
    const { metadataFile, sequenceFile, submissionId } = sequenceDataResult;
    if (submissionId === void 0 && inputMode === "form") {
      onError("No ID specified.");
      return;
    }
    if (dataUseTermsEnabled && !confirmedNoPII) {
      onError(
        "Please confirm the data you submitted does not include restricted or personally identifiable information."
      );
      return;
    }
    if (dataUseTermsEnabled && !agreedToINSDCUploadTerms) {
      onError("Please tick the box to agree that you will not independently submit these sequences to INSDC");
      return;
    }
    let fileMappingWithSubmissionId = fileMapping;
    if (extraFilesEnabled && inputMode === "form" && fileMapping !== void 0) {
      fileMappingWithSubmissionId = { [submissionId]: Object.values(fileMapping)[0] };
    }
    const submitSequenceData = () => {
      switch (action) {
        case "submit": {
          const groupId = group.groupId;
          submit({
            metadataFile,
            sequenceFile,
            fileMapping: extraFilesEnabled ? fileMappingWithSubmissionId : void 0,
            groupId,
            dataUseTermsType,
            restrictedUntil: dataUseTermsType === restrictedDataUseTermsOption ? restrictedUntil.toFormat("yyyy-MM-dd") : null
          });
          break;
        }
        case "revise":
          revise({ metadataFile, sequenceFile });
          break;
      }
    };
    if (action === "submit" && dataUseTermsEnabled && dataUseTermsType === openDataUseTermsOption) {
      displayConfirmationDialog({
        dialogText: "You have selected the Open Data Use Terms. Once released under the Open Data Use Terms sequences will be deposited to INSDC and cannot be changed to the Restricted-Use Data Use Terms.",
        confirmButtonText: "Continue under Open terms",
        closeButtonText: "Cancel",
        onConfirmation: submitSequenceData
      });
    } else {
      submitSequenceData();
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "text-left mt-3 max-w-4xl mb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex-col flex gap-8", children: [
    action === "submit" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { className: "title", children: "Submit sequences" }),
      /* @__PURE__ */ jsx(InputModeTabs, { organism, groupId: group.groupId, currentInputMode: inputMode }),
      /* @__PURE__ */ jsx(
        FormOrUploadWrapper,
        {
          inputMode,
          setFileFactory,
          organism,
          action,
          referenceGenomeSequenceNames,
          metadataTemplateFields,
          submissionDataTypes
        }
      )
    ] }) : /* @__PURE__ */ jsx(
      FormOrUploadWrapper,
      {
        inputMode: "bulk",
        setFileFactory,
        organism,
        action,
        referenceGenomeSequenceNames,
        metadataTemplateFields,
        submissionDataTypes
      }
    ),
    /* @__PURE__ */ jsx("hr", {}),
    extraFilesEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        ExtraFilesUpload,
        {
          fileCategories: submissionDataTypes.files?.categories ?? [],
          accessToken,
          inputMode,
          clientConfig,
          group,
          onError,
          setFileMapping
        }
      ),
      /* @__PURE__ */ jsx("hr", {})
    ] }),
    action === "submit" && dataUseTermsEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        DataUseTerms,
        {
          dataUseTermsType,
          setDataUseTermsType,
          restrictedUntil,
          setRestrictedUntil
        }
      ),
      /* @__PURE__ */ jsx("hr", {})
    ] }),
    dataUseTermsEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Acknowledgement,
        {
          confirmedNoPII,
          setConfirmedNoPII,
          agreedToINSDCUploadTerms,
          setAgreedToINSDCUploadTerms
        }
      ),
      /* @__PURE__ */ jsx("hr", {})
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-x-6", children: /* @__PURE__ */ jsx(DisabledUntilHydrated, { alsoDisabledIf: isLoading, children: /* @__PURE__ */ jsxs(
      "button",
      {
        name: "submit",
        type: "submit",
        className: "rounded-md py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-600 text-white hover:bg-primary-500",
        onClick: (e) => void handleSubmit(e),
        children: [
          /* @__PURE__ */ jsx("div", { className: `absolute ml-1.5 inline-flex ${isLoading ? "visible" : "invisible"}`, children: /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-center mx-8", children: "Submit sequences" })
        ]
      }
    ) }) })
  ] }) });
};
const DataUploadForm = withQueryProvider(InnerDataUploadForm);
const InputModeTabs = ({
  organism,
  groupId,
  currentInputMode
}) => {
  const inputModeUrl = (inputMode) => SubmissionRouteUtils.toUrl({
    name: "submit",
    organism,
    groupId,
    inputMode
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex border-b", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        className: `py-2 px-4 border-b-2 ${currentInputMode === "bulk" ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500"} hover:text-primary-600`,
        href: inputModeUrl("bulk"),
        children: "Upload bulk sequences"
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        className: `py-2 px-4 border-b-2 ${currentInputMode === "form" ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500"} hover:text-primary-600`,
        href: inputModeUrl("form"),
        children: "Submit single sequence"
      }
    )
  ] });
};
const ExtraFilesUpload = ({
  accessToken,
  clientConfig,
  inputMode,
  group,
  fileCategories,
  setFileMapping,
  onError
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-x-16 gap-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg", children: "Extra files" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: inputMode === "bulk" ? "The folder you select needs to contain one folder per sequence ID, which contains the files for that sequence entry" : "Upload a folder of files for this sequence" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 flex flex-col gap-4", children: fileCategories.map((fileCategory) => /* @__PURE__ */ jsx(
      FolderUploadComponent,
      {
        fileCategory: fileCategory.name,
        inputMode,
        accessToken,
        clientConfig,
        group,
        onError,
        setFileMapping
      },
      fileCategory.name
    )) })
  ] });
};
const DataUseTerms = ({
  dataUseTermsType,
  setDataUseTermsType,
  restrictedUntil,
  setRestrictedUntil
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-x-16 gap-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg", children: "Data use terms" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Choose how your data can be used" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "gap-x-6 gap-y-8 col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium leading-6 text-gray-900", children: "Terms of use for this data set" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(
        DataUseTermsSelector,
        {
          calendarUseModal: true,
          initialDataUseTermsOption: dataUseTermsType,
          maxRestrictedUntil: dateTimeInMonths(12),
          setDataUseTerms: (terms) => {
            setDataUseTermsType(terms.type);
            if (terms.type === restrictedDataUseTermsOption) {
              setRestrictedUntil(DateTime.fromFormat(terms.restrictedUntil, "yyyy-MM-dd"));
            }
          }
        }
      ) }),
      dataUseTermsType === openDataUseTermsOption ? /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Your data will be available on Pathoplexus under the open use terms." }) : /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        "Your data will be available on Pathoplexus, under the restricted use terms until",
        " ",
        restrictedUntil.toFormat("yyyy-MM-dd"),
        " and under the open use terms after that date."
      ] })
    ] }) })
  ] });
};
const Acknowledgement = ({
  confirmedNoPII,
  setConfirmedNoPII,
  agreedToINSDCUploadTerms,
  setAgreedToINSDCUploadTerms
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-x-16 gap-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg", children: "Acknowledgement" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Acknowledge submission terms" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "gap-x-6 gap-y-8 col-span-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { className: "block text-sm", children: [
        "Your data will be available on Pathoplexus, under the selected data use terms. Data with open data use terms will additionally be made publicly available through the",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://www.insdc.org/", className: "text-primary-600 hover:underline", children: "INSDC" }),
        " ",
        "databases (ENA, DDBJ, NCBI)."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 py-5", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            name: "confirmation-no-pii",
            className: "mr-3 ml-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-600",
            checked: confirmedNoPII,
            onChange: () => setConfirmedNoPII(!confirmedNoPII)
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-xs pl-4 text-gray-500", children: "I confirm that the data submitted is not sensitive or human-identifiable" }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 py-3", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            name: "confirmation-INSDC-upload-terms",
            className: "mr-3 ml-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-600",
            checked: agreedToINSDCUploadTerms,
            onChange: () => setAgreedToINSDCUploadTerms(!agreedToINSDCUploadTerms)
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-xs pl-4 text-gray-500", children: [
          "I confirm I have not and will not submit this data independently to INSDC, to avoid data duplication. I agree to Loculus handling the submission of this data to INSDC.",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/docs/concepts/insdc-submission",
              className: "text-primary-600 hover:underline",
              children: "Find out more."
            }
          )
        ] }) })
      ] }) })
    ] }) })
  ] });
};
function useSubmitFiles(accessToken, organism, clientConfig, onSuccess, onError) {
  const hooks = backendClientHooks(clientConfig);
  const submit = hooks.useSubmit(
    { params: { organism }, headers: createAuthorizationHeader(accessToken) },
    { onSuccess, onError: handleError(onError, "submit") }
  );
  const revise = hooks.useRevise(
    { params: { organism }, headers: createAuthorizationHeader(accessToken) },
    { onSuccess, onError: handleError(onError, "revise") }
  );
  return {
    submit: submit.mutate,
    revise: revise.mutate,
    isLoading: submit.isLoading || revise.isLoading
  };
}
function handleError(onError, action) {
  return (error) => {
    void logger.error(`Received error from backend: ${stringifyMaybeAxiosError(error)}`);
    if (isErrorFromAlias(backendApi, action, error)) {
      switch (error.response.status) {
        case 400:
          onError("Failed to submit sequence entries: " + error.response.data.detail);
          return;
        case 422:
          onError("The submitted file content was invalid: " + error.response.data.detail);
          return;
        default:
          onError(error.response.data.title + ": " + error.response.data.detail);
          return;
      }
    }
    onError("Received unexpected message from backend: " + stringifyMaybeAxiosError(error));
  };
}

export { DataUploadForm as D };
