import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React__default, { useMemo, useState, useEffect, Fragment as Fragment$1, forwardRef, useRef, useId, useCallback } from 'react';
import { a8 as metadataDefaultDownloadDataFormat, a9 as sequenceDefaultDownloadDataFormat, u as ACCESSION_VERSION_FIELD, aa as serviceUrls, ab as schema, ac as parsedSequenceEntryHistoryEntrySchema, d as dataUseTermsHistoryEntry, Q as DATA_USE_TERMS_FIELD, ad as DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD, U as restrictedDataUseTermsOption, a5 as openDataUseTermsOption, o as getLapisUrl, ae as pageSize } from './config_CQtV1zSN.mjs';
import { sentenceCase, capitalCase } from 'change-case';
import { f as formatNumberWithDefaultLocale } from './formatNumber_pkmC1VHM.mjs';
import kebabCase from 'just-kebab-case';
import { a as approxMaxAcceptableUrlLength, r as routes } from './routes_BftQyUXo.mjs';
import { F as ForwardRef$a } from './content-copy-outline_1cwU1GhK.mjs';
import { B as BaseDialog } from './BaseDialog_SQxsW21v.mjs';
import { F as ForwardRef$b } from './close_BTgvflS0.mjs';
import { Menu, MenuButton, MenuItems, MenuItem, Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { B as BasicModal, a as ForwardRef$e, F as ForwardRef$f } from './Modal_BU_T5B71.mjs';
import { F as ForwardRef$c, u as useOffCanvas, O as OffCanvasOverlay } from './BaseLayout_C5Fsgcd-.mjs';
import { C as CustomTooltip, R as RecentSequencesBanner } from './CustomTooltip_CT1LhZ-F.mjs';
import { D as DisabledUntilHydrated } from './DisabledUntilHydrated_Cq3qsxAK.mjs';
import { FloatingLabel } from 'flowbite-react';
import { DateTime } from 'luxon';
import { DatePicker } from 'rsuite';
/* empty css                         */
import { l as lapisClientHooks, b as backendClientHooks } from './serviceHooks_DslcN1kS.mjs';
import { g as getClientLogger } from './clientLogger_iKuJ-UyB.mjs';
import { P as Pagination } from './Pagination_DxF1OMvg.mjs';
import { z } from 'zod';
import { t as tableDataEntrySchema } from './types_XQo49VFf.mjs';
import { b as SequencesBanner, a as SequenceDataUI, S as SequenceEntryHistoryMenu, s as successToast, e as errorToast } from './SequenceEntryHistoryMenu_BU5Rpt1P.mjs';
import { F as ForwardRef$d } from './baseline-download_B32u_4WX.mjs';
import { Tooltip } from 'react-tooltip';
import { D as DataUseTermsSelector } from './DataUseTermsSelector_D8ph774s.mjs';
import { a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';
import { E as ErrorBox } from './ErrorBox_Du3rMPgb.mjs';
import { L as LapisClient } from './lapisClient_DGgBUH0Y.mjs';

const parseMutationsString = (value, referenceGenomesSequenceNames) => {
  return value.split(",").map((mutation) => parseMutationString(mutation.trim(), referenceGenomesSequenceNames)).filter(Boolean);
};
const parseMutationString = (mutation, referenceGenomesSequenceNames) => {
  const tests = [
    { baseType: "nucleotide", mutationType: "substitutionOrDeletion", test: isValidNucleotideMutationQuery },
    { baseType: "aminoAcid", mutationType: "substitutionOrDeletion", test: isValidAminoAcidMutationQuery },
    { baseType: "nucleotide", mutationType: "insertion", test: isValidNucleotideInsertionQuery },
    { baseType: "aminoAcid", mutationType: "insertion", test: isValidAminoAcidInsertionQuery }
  ];
  for (const { baseType, mutationType, test } of tests) {
    if (test(mutation, referenceGenomesSequenceNames)) {
      return { baseType, mutationType, text: mutation };
    }
  }
};
const serializeMutationQueries = (selectedOptions) => {
  return selectedOptions.map((option) => option.text).join(", ");
};
const intoMutationSearchParams = (mutation, referenceGenomesSequenceNames) => {
  const mutationFilter = parseMutationsString(mutation ?? "", referenceGenomesSequenceNames);
  return {
    nucleotideMutations: mutationFilter.filter((m) => m.baseType === "nucleotide" && m.mutationType === "substitutionOrDeletion").map((m) => m.text),
    aminoAcidMutations: mutationFilter.filter((m) => m.baseType === "aminoAcid" && m.mutationType === "substitutionOrDeletion").map((m) => m.text),
    nucleotideInsertions: mutationFilter.filter((m) => m.baseType === "nucleotide" && m.mutationType === "insertion").map((m) => m.text),
    aminoAcidInsertions: mutationFilter.filter((m) => m.baseType === "aminoAcid" && m.mutationType === "insertion").map((m) => m.text)
  };
};
const isValidAminoAcidInsertionQuery = (text, referenceGenomesSequenceNames) => {
  try {
    const textUpper = text.toUpperCase();
    if (!textUpper.startsWith("INS_")) {
      return false;
    }
    const query = textUpper.slice(4);
    const [gene, position, insertion] = query.split(":");
    const existingGenes = new Set(referenceGenomesSequenceNames.genes.map((g) => g.toUpperCase()));
    if (!existingGenes.has(gene) || !Number.isInteger(Number(position))) {
      return false;
    }
    return /^[A-Z*?]+$/.test(insertion);
  } catch (_) {
    return false;
  }
};
const isValidAminoAcidMutationQuery = (text, referenceGenomesSequenceNames) => {
  try {
    const textUpper = text.toUpperCase();
    const [gene, mutation] = textUpper.split(":");
    const existingGenes = new Set(referenceGenomesSequenceNames.genes.map((g) => g.toUpperCase()));
    if (!existingGenes.has(gene)) {
      return false;
    }
    return /^[A-Z*]?[0-9]+[A-Z-*\\.]?$/.test(mutation);
  } catch (_) {
    return false;
  }
};
const isValidNucleotideInsertionQuery = (text, referenceGenomesSequenceNames) => {
  try {
    const isMultiSegmented = referenceGenomesSequenceNames.nucleotideSequences.length > 1;
    const textUpper = text.toUpperCase();
    if (!textUpper.startsWith("INS_")) {
      return false;
    }
    const query = textUpper.slice(4);
    const split = query.split(":");
    if (!isMultiSegmented && split.length > 2 || isMultiSegmented && split.length > 3) {
      return false;
    }
    const [segment, position, insertion] = isMultiSegmented ? split : [void 0, ...split];
    if (segment !== void 0) {
      const existingSegments = new Set(
        referenceGenomesSequenceNames.nucleotideSequences.map((n) => n.toUpperCase())
      );
      if (!existingSegments.has(segment)) {
        return false;
      }
    }
    if (!Number.isInteger(Number(position))) {
      return false;
    }
    return /^[A-Z*?]+$/.test(insertion);
  } catch (_) {
    return false;
  }
};
const isValidNucleotideMutationQuery = (text, referenceGenomesSequenceNames) => {
  try {
    const isMultiSegmented = referenceGenomesSequenceNames.nucleotideSequences.length > 1;
    const textUpper = text.toUpperCase();
    let mutation = textUpper;
    if (isMultiSegmented) {
      const [segment, _mutation] = textUpper.split(":");
      const existingSegments = new Set(
        referenceGenomesSequenceNames.nucleotideSequences.map((n) => n.toUpperCase())
      );
      if (!existingSegments.has(segment)) {
        return false;
      }
      mutation = _mutation;
    }
    return /^[A-Z]?[0-9]+[A-Z-\\.]?$/.test(mutation);
  } catch (_) {
    return false;
  }
};

function validateSingleValue(value, paramName) {
  if (Array.isArray(value)) {
    throw new Error(
      `Parameter "${paramName}" unexpectedly contains multiple values. This parameter does not support multiple values. Values: ${JSON.stringify(value)}`
    );
  }
  if (value === null || value === void 0) {
    return "";
  }
  return value;
}
function extractArrayValue(value) {
  if (value === void 0 || value === "") {
    return [];
  }
  if (value === null) {
    return [null];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

const VISIBILITY_PREFIX = "visibility_";
const COLUMN_VISIBILITY_PREFIX = "column_";
const ORDER_KEY = "orderBy";
const ORDER_DIRECTION_KEY = "order";
const PAGE_KEY = "page";
const NULL_QUERY_VALUE = "_null_";
const getFieldOrColumnVisibilitiesFromQuery = (schema, state, visibilityPrefix, initiallyVisibleAccessor, visibilitySelectableAccessor) => {
  const visibilities = /* @__PURE__ */ new Map();
  schema.metadata.forEach((field) => {
    if (!visibilitySelectableAccessor(field)) {
      return;
    }
    let fieldName = field.name;
    if (field.rangeOverlapSearch) {
      fieldName = field.rangeOverlapSearch.rangeName;
    }
    visibilities.set(fieldName, initiallyVisibleAccessor(field));
  });
  const visibilityKeys = Object.keys(state).filter((key) => key.startsWith(visibilityPrefix));
  for (const key of visibilityKeys) {
    const stringValue = validateSingleValue(state[key], key);
    visibilities.set(key.slice(visibilityPrefix.length), stringValue === "true");
  }
  return visibilities;
};
const getFieldVisibilitiesFromQuery = (schema, state) => {
  const initiallyVisibleAccessor = (field) => field.initiallyVisible === true;
  const isFieldSelectable = (field) => field.notSearchable !== true;
  return getFieldOrColumnVisibilitiesFromQuery(
    schema,
    state,
    VISIBILITY_PREFIX,
    initiallyVisibleAccessor,
    isFieldSelectable
  );
};
const getColumnVisibilitiesFromQuery = (schema, state) => {
  const initiallyVisibleAccessor = (field) => schema.tableColumns.includes(field.name);
  const isFieldSelectable = (field) => !(field.hideInSearchResultsTable ?? false);
  return getFieldOrColumnVisibilitiesFromQuery(
    schema,
    state,
    COLUMN_VISIBILITY_PREFIX,
    initiallyVisibleAccessor,
    isFieldSelectable
  );
};
const getMetadataSchemaWithExpandedRanges = (metadataSchema) => {
  const result = [];
  for (const field of metadataSchema) {
    if (field.rangeOverlapSearch) {
      const fieldGroupProps = {
        fieldGroup: field.rangeOverlapSearch.rangeName,
        fieldGroupDisplayName: field.rangeOverlapSearch.rangeDisplayName,
        header: field.header
      };
      result.push({
        ...field,
        ...fieldGroupProps,
        name: `${field.name}From`,
        displayName: "From"
      });
      result.push({
        ...field,
        ...fieldGroupProps,
        name: `${field.name}To`,
        displayName: "To"
      });
    } else if (field.rangeSearch === true) {
      const fromField = {
        ...field,
        name: `${field.name}From`,
        displayName: "From",
        fieldGroup: field.name,
        fieldGroupDisplayName: field.displayName ?? sentenceCase(field.name),
        header: field.header
      };
      const toField = {
        ...field,
        name: `${field.name}To`,
        displayName: "To",
        fieldGroup: field.name,
        fieldGroupDisplayName: field.displayName ?? sentenceCase(field.name),
        header: field.header
      };
      result.push(fromField);
      result.push(toField);
    } else {
      result.push(field);
    }
  }
  return result;
};
const consolidateGroupedFields = (filters) => {
  const fieldList = [];
  const groupsMap = /* @__PURE__ */ new Map();
  for (const filter of filters) {
    if (filter.fieldGroup !== void 0) {
      if (!groupsMap.has(filter.fieldGroup)) {
        const fieldForGroup = {
          name: filter.fieldGroup,
          groupedFields: [],
          type: filter.type,
          grouped: true,
          displayName: filter.fieldGroupDisplayName,
          initiallyVisible: filter.initiallyVisible,
          header: filter.header
        };
        fieldList.push(fieldForGroup);
        groupsMap.set(filter.fieldGroup, fieldForGroup);
      }
      groupsMap.get(filter.fieldGroup).groupedFields.push(filter);
    } else {
      fieldList.push(filter);
    }
  }
  return fieldList;
};
class MetadataFilterSchema {
  filters;
  constructor(metadataSchema) {
    const expandedFilters = getMetadataSchemaWithExpandedRanges(metadataSchema);
    this.filters = consolidateGroupedFields(expandedFilters);
  }
  ungroupedMetadataFilters() {
    return this.filters.flatMap((filter) => filter.grouped ? filter.groupedFields : filter);
  }
  getType(fieldName) {
    return this.ungroupedMetadataFilters().find((metadataFilter) => metadataFilter.name === fieldName)?.type;
  }
  /**
   * Get the display name for simple metadata fields, or displayname + sub label for
   * ranges, i.e. "released at - from" (<displayname> - <label>)
   */
  getLabel(fieldName) {
    let displayName = this.filters.map((metadata) => {
      if (metadata.grouped === true) {
        const groupedField = metadata.groupedFields.find(
          (groupedMetadata) => groupedMetadata.name === fieldName
        );
        if (groupedField) {
          return `${metadata.displayName} - ${groupedField.displayName}`;
        }
      }
    }).find((x) => x !== void 0);
    displayName ??= this.filters.find((metadata) => metadata.name === fieldName)?.displayName;
    return displayName ?? fieldName;
  }
  isSubstringSearchEnabled(fieldName) {
    return this.ungroupedMetadataFilters().find((metadataFilter) => metadataFilter.name === fieldName)?.substringSearch === true;
  }
  filterNameToLabelMap() {
    return this.filters.reduce(
      (acc, field) => {
        acc[field.name] = field.displayName ?? sentenceCase(field.name);
        return acc;
      },
      {}
    );
  }
  /**
   * @param queryState the key-values set in the URL.
   * @param hiddenFieldValues The default settings to use for all {@link FieldValues} as a starting point.
   */
  getFieldValuesFromQuery(queryState, hiddenFieldValues) {
    const values = { ...hiddenFieldValues };
    for (const field of this.ungroupedMetadataFilters()) {
      const value = queryState[field.name];
      if (value === void 0) {
        continue;
      }
      if (Array.isArray(value)) {
        values[field.name] = value.map((v) => v === NULL_QUERY_VALUE ? null : v);
      } else {
        values[field.name] = value === NULL_QUERY_VALUE ? null : value;
      }
    }
    if ("accession" in queryState) {
      const val = validateSingleValue(queryState.accession, "accession");
      values.accession = val === "" ? void 0 : val;
    }
    if ("mutation" in queryState) {
      const val = validateSingleValue(queryState.mutation, "mutation");
      values.mutation = val === "" ? void 0 : val;
    }
    return values;
  }
}

class FieldFilterSet {
  filterSchema;
  fieldValues;
  hiddenFieldValues;
  referenceGenomeSequenceNames;
  /**
   * @param filterSchema The {@link MetadataFilterSchema} to use. Provides labels and other
   *     additional info for how to apply a certain value to a metadata field as a filter.
   * @param fieldValues The {@link FieldValues} that are used to filter sequence entries.
   * @param hiddenFieldValues key-value combinations of fields that should be hidden when converting
   *     displaying the field values (because these are default values).
   * @param referenceGenomeSequenceNames Necessary to construct mutation API params.
   */
  constructor(filterSchema, fieldValues, hiddenFieldValues, referenceGenomeSequenceNames) {
    this.filterSchema = filterSchema;
    this.fieldValues = fieldValues;
    this.hiddenFieldValues = hiddenFieldValues;
    this.referenceGenomeSequenceNames = referenceGenomeSequenceNames;
  }
  /**
   * Creates an empty filter.
   * This is a convenience function, mostly used for testing.
   */
  static empty() {
    return new FieldFilterSet(
      new MetadataFilterSchema([]),
      {},
      {},
      { nucleotideSequences: [], genes: [], insdcAccessionFull: [] }
    );
  }
  sequenceCount() {
    return void 0;
  }
  isEmpty() {
    return this.toDisplayStrings().size === 0;
  }
  toApiParams() {
    const sequenceFilters = Object.fromEntries(
      Object.entries(this.fieldValues).filter(
        ([, value]) => value !== void 0 && value !== ""
      )
    );
    for (const filterName of Object.keys(sequenceFilters)) {
      if (this.filterSchema.isSubstringSearchEnabled(filterName) && sequenceFilters[filterName] !== void 0) {
        sequenceFilters[filterName.concat(".regex")] = makeCaseInsensitiveLiteralSubstringRegex(
          sequenceFilters[filterName]
        );
        delete sequenceFilters[filterName];
      }
    }
    if (sequenceFilters.accession !== "" && sequenceFilters.accession !== void 0) {
      sequenceFilters.accession = textAccessionsToList(sequenceFilters.accession);
    }
    delete sequenceFilters.mutation;
    const mutationSearchParams = intoMutationSearchParams(
      this.fieldValues.mutation,
      this.referenceGenomeSequenceNames
    );
    return {
      ...sequenceFilters,
      ...mutationSearchParams
    };
  }
  toUrlSearchParams() {
    const result = [];
    const accessionKey = "accession";
    const mutationKeys = [
      "nucleotideMutations",
      "aminoAcidMutations",
      "nucleotideInsertions",
      "aminoAcidInsertions"
    ];
    const skipKeys = mutationKeys.concat([accessionKey]);
    const lapisSearchParameters = this.toApiParams();
    if (lapisSearchParameters.accession !== void 0) {
      lapisSearchParameters.accession.forEach((a) => result.push(["accession", String(a)]));
    }
    mutationKeys.forEach((key) => {
      if (lapisSearchParameters[key] !== void 0) {
        lapisSearchParameters[key].forEach((m) => result.push([key, m]));
      }
    });
    for (const [key, value] of Object.entries(lapisSearchParameters)) {
      if (skipKeys.includes(key)) {
        continue;
      }
      if (Array.isArray(value)) {
        if (value.length > 0) {
          result.push([key, value]);
        }
      } else {
        const stringValue = String(value);
        const trimmedValue = stringValue.trim();
        if (trimmedValue.length > 0) {
          result.push([key, trimmedValue]);
        }
      }
    }
    return result;
  }
  isHiddenFieldValue(fieldName, fieldValue) {
    return Object.keys(this.hiddenFieldValues).includes(fieldName) && this.hiddenFieldValues[fieldName] === fieldValue;
  }
  toDisplayStrings() {
    return new Map(
      Object.entries(this.fieldValues).filter(([name, filterValue]) => !this.isHiddenFieldValue(name, filterValue)).map(([name, filterValue]) => [
        name,
        [
          this.filterSchema.getLabel(name),
          filterValue === null ? null : this.filterValueDisplayString(name, filterValue)
        ]
      ])
    );
  }
  filterValueDisplayString(fieldName, value) {
    if (Array.isArray(value)) {
      return value;
    }
    let result = value;
    if (this.filterSchema.getType(fieldName) === "timestamp") {
      const date = new Date(Number(value) * 1e3);
      result = date.toISOString().split("T")[0];
    }
    if (typeof result === "string" && result.length > 40) {
      result = `${result.substring(0, 37)}...`;
    }
    return result;
  }
}
const textAccessionsToList = (text) => {
  const accessions = text.split(/[\t,;\n ]/).map((s) => s.trim()).filter((s) => s !== "").map((s) => {
    if (s.includes(".")) {
      return s.split(".")[0];
    }
    return s;
  });
  return accessions;
};
const makeCaseInsensitiveLiteralSubstringRegex = (s) => {
  return `(?i)${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`;
};
class SequenceEntrySelection {
  selectedSequences;
  constructor(selectedSequences) {
    this.selectedSequences = selectedSequences;
  }
  sequenceCount() {
    return this.selectedSequences.size;
  }
  isEmpty() {
    return this.selectedSequences.size === 0;
  }
  toApiParams() {
    return { accessionVersion: Array.from(this.selectedSequences).sort() };
  }
  toUrlSearchParams() {
    const result = [];
    Array.from(this.selectedSequences).sort().forEach((sequence) => {
      result.push(["accessionVersion", sequence]);
    });
    return result;
  }
  toDisplayStrings() {
    const count = this.selectedSequences.size;
    if (count === 0) return /* @__PURE__ */ new Map();
    const seqs = Array.from(this.selectedSequences).sort();
    if (count === 1) {
      return /* @__PURE__ */ new Map([["selectedSequences", ["single sequence", seqs[0]]]]);
    }
    if (count === 2) {
      return /* @__PURE__ */ new Map([["selectedSequences", ["sequences selected", seqs.join(", ")]]]);
    }
    return /* @__PURE__ */ new Map([["selectedSequences", ["sequences selected", count.toLocaleString()]]]);
  }
}

const DownloadDialogButton = ({ onClick, sequenceFilter }) => {
  let buttonText = "";
  let buttonWidthClass = "";
  const sequenceCount = sequenceFilter.sequenceCount();
  if (sequenceCount === void 0) {
    buttonText = "Download all entries";
    buttonWidthClass = "w-44";
  } else {
    const formattedCount = formatNumberWithDefaultLocale(sequenceCount);
    const entries = sequenceCount === 1 ? "entry" : "entries";
    buttonText = `Download ${formattedCount} selected ${entries}`;
    buttonWidthClass = "w-[15rem]";
  }
  return /* @__PURE__ */ jsx("button", { className: buttonWidthClass + " outlineButton", onClick, children: buttonText });
};

const dataTypeForFilename = (dataType) => {
  switch (dataType.type) {
    case "metadata":
      return "metadata";
    case "unalignedNucleotideSequences":
      return dataType.segment !== void 0 ? `nuc-${dataType.segment}` : "nuc";
    case "alignedNucleotideSequences":
      return dataType.segment !== void 0 ? `aligned-nuc-${dataType.segment}` : "aligned-nuc";
    case "alignedAminoAcidSequences":
      return `aligned-aa-${dataType.gene}`;
  }
};

const downloadAsFile = "downloadAsFile";
const dataFormat = "dataFormat";
class DownloadUrlGenerator {
  /**
   * Create new DownloadUrlGenerator with the given properties.
   * @param organism The organism, will be part of the filename.
   * @param lapisUrl The lapis API URL for downloading.
   * @param dataUseTermsEnabled If false, the downloaded URLs won't include any data use terms related settings.
   * @param richFastaHeaderFields Set the fastaHeaderTemplate parameter to include rich fasta headers.
   */
  constructor(organism, lapisUrl, dataUseTermsEnabled, richFastaHeaderFields) {
    this.organism = organism;
    this.lapisUrl = lapisUrl;
    this.dataUseTermsEnabled = dataUseTermsEnabled;
    this.richFastaHeaderFields = richFastaHeaderFields;
  }
  generateDownloadUrl(downloadParameters, option) {
    const baseUrl = this.downloadEndpoint(option.dataType);
    const params = new URLSearchParams();
    const excludedParams = /* @__PURE__ */ new Set();
    params.set(downloadAsFile, "true");
    params.set("downloadFileBasename", this.generateFilename(option.dataType));
    if (!option.includeRestricted && this.dataUseTermsEnabled) {
      params.set("dataUseTerms", "OPEN");
      excludedParams.add("dataUseTerms");
    }
    if (option.dataType.type === "metadata") {
      params.set(dataFormat, metadataDefaultDownloadDataFormat);
    } else {
      params.set(dataFormat, sequenceDefaultDownloadDataFormat);
    }
    if (option.compression !== void 0) {
      params.set("compression", option.compression);
    }
    if (option.dataFormat !== void 0) {
      params.delete(dataFormat);
      params.set(dataFormat, option.dataFormat);
    }
    if (option.fields && option.fields.length > 0 && option.dataType.type === "metadata") {
      params.set("fields", option.fields.join(","));
    }
    if ((option.dataType.type === "unalignedNucleotideSequences" || option.dataType.type === "alignedNucleotideSequences" || option.dataType.type === "alignedAminoAcidSequences") && option.dataType.includeRichFastaHeaders === true && this.richFastaHeaderFields && this.richFastaHeaderFields.length > 0) {
      params.delete(dataFormat);
      params.append("fastaHeaderTemplate", this.richFastaHeaderFields.map((field) => `{${field}}`).join("|"));
    }
    downloadParameters.toUrlSearchParams().filter(([name]) => !excludedParams.has(name)).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val && val.length > 0) {
            params.append(name, val);
          }
        });
      } else if (value && value.length > 0) {
        params.append(name, value);
      }
    });
    return {
      url: `${baseUrl}?${params}`,
      baseUrl,
      params
    };
  }
  generateFilename(downloadDataType) {
    const organism = kebabCase(this.organism);
    const dataType = dataTypeForFilename(downloadDataType);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(":", "");
    return `${organism}_${dataType}_${timestamp}`;
  }
  downloadEndpoint(dataType) {
    const segmentPath = (segment) => segment !== void 0 ? "/" + segment : "";
    switch (dataType.type) {
      case "metadata":
        return this.lapisUrl + "/sample/details";
      case "unalignedNucleotideSequences":
        return this.lapisUrl + "/sample/unalignedNucleotideSequences" + segmentPath(dataType.segment);
      case "alignedNucleotideSequences":
        return this.lapisUrl + "/sample/alignedNucleotideSequences" + segmentPath(dataType.segment);
      case "alignedAminoAcidSequences":
        return this.lapisUrl + "/sample/alignedAminoAcidSequences/" + dataType.gene;
    }
  }
}

const CopyUrlButton = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }).catch(() => {
    });
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "ml-2 p-2 text-gray-500 hover:text-primary-600 rounded-md hover:bg-gray-100 transition-colors",
      onClick: handleCopy,
      "data-testid": "copy-download-url",
      title: "Copy download URL",
      children: [
        /* @__PURE__ */ jsx(ForwardRef$a, { className: "h-4 w-4" }),
        copied && /* @__PURE__ */ jsx("span", { className: "absolute bg-gray-800 text-white text-xs px-2 py-1 rounded -mt-10 -ml-2", children: "Copied!" })
      ]
    }
  );
};
const DownloadButton$1 = ({
  downloadUrlGenerator,
  downloadOption,
  sequenceFilter,
  disabled = false,
  onClick
}) => {
  const {
    downloadUrl,
    handleClick,
    isGetRequest,
    message
  } = useMemo(() => {
    if (downloadOption === void 0 || disabled) {
      return {
        downloadUrl: "#",
        handleClick: void 0,
        isGetRequest: false
      };
    }
    const { url, baseUrl, params } = downloadUrlGenerator.generateDownloadUrl(sequenceFilter, downloadOption);
    const useGet = url.length <= approxMaxAcceptableUrlLength;
    if (useGet) {
      return {
        downloadUrl: url,
        handleClick: onClick,
        isGetRequest: true
      };
    }
    if (downloadOption.dataType.type === "unalignedNucleotideSequences" && downloadOption.dataType.includeRichFastaHeaders) {
      return {
        downloadUrl: "#",
        handleClick: void 0,
        isGetRequest: false,
        message: "Sorry, we don't yet support downloading files with custom FASTA headers for long queries."
      };
    }
    return {
      downloadUrl: "#",
      handleClick: (e) => {
        e.preventDefault();
        downloadViaPostForm(baseUrl, params);
        if (onClick !== void 0) {
          onClick();
        }
      },
      isGetRequest: false
    };
  }, [downloadUrlGenerator, downloadOption, disabled, sequenceFilter, onClick]);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx("div", { className: message && "tooltip tooltip-open tooltip-right tooltip-info", "data-tip": message, children: /* @__PURE__ */ jsx(
      "a",
      {
        className: `btn loculusColor ${disabled || handleClick === void 0 ? "btn-disabled" : ""} text-white`,
        href: downloadUrl,
        onClick: handleClick,
        "data-testid": "start-download",
        children: "Download"
      }
    ) }),
    isGetRequest && !disabled && /* @__PURE__ */ jsx(CopyUrlButton, { url: downloadUrl })
  ] });
};
const downloadViaPostForm = (baseUrl, params) => {
  const fieldsParam = params.get("fields");
  if (fieldsParam) {
    params.delete("fields");
    const fieldsList = fieldsParam.split(",");
    fieldsList.forEach((field) => {
      params.append("fields", field.trim());
    });
  }
  const form = document.createElement("form");
  form.method = "POST";
  form.action = baseUrl;
  form.target = "_blank";
  for (const [key, value] of params.entries()) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

const FieldSelectorButton = ({
  onClick,
  selectedFieldsCount,
  disabled = false
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: `inline-flex items-center px-2 py-1 text-xs font-medium border border-gray-300 rounded-md shadow-sm 
                ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"}`,
      children: /* @__PURE__ */ jsxs("span", { children: [
        "Choose fields (",
        selectedFieldsCount,
        ")"
      ] })
    }
  );
};

const FieldSelectorModal$1 = ({
  isOpen,
  onClose,
  title,
  fields,
  selectedFields,
  setFieldSelected
}) => {
  const handleToggleField = (fieldName) => {
    const isCurrentlySelected = selectedFields.has(fieldName);
    setFieldSelected(fieldName, !isCurrentlySelected);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  };
  const handleSelectAll = () => {
    fields.forEach((field) => {
      if (!field.alwaysSelected && !field.disabled) {
        setFieldSelected(field.name, true);
      }
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  };
  const handleSelectNone = () => {
    fields.forEach((field) => {
      if (!field.alwaysSelected && !field.disabled) {
        setFieldSelected(field.name, false);
      }
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  };
  const fieldsByHeader = fields.reduce((acc, field) => {
    const header = field.header ?? "Other";
    acc[header] = acc[header] ?? [];
    acc[header].push(field);
    return acc;
  }, {});
  const sortedHeaders = Object.keys(fieldsByHeader).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });
  return /* @__PURE__ */ jsxs(BaseDialog, { title, isOpen, onClose, fullWidth: false, children: [
    /* @__PURE__ */ jsx("div", { className: "min-w-[1000px]" }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-between px-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "text-sm text-primary-600 hover:text-primary-900 font-medium mr-4",
          onClick: handleSelectAll,
          children: "Select all"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "text-sm text-primary-600 hover:text-primary-900 font-medium",
          onClick: handleSelectNone,
          children: "Select none"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 max-h-[60vh] overflow-y-auto p-2", children: [
      sortedHeaders.map((header) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium text-lg mb-2 text-gray-700", children: header }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2", children: fieldsByHeader[header].sort((a, b) => {
          const aOrder = "order" in a ? a.order : void 0;
          const bOrder = "order" in b ? b.order : void 0;
          if (aOrder !== void 0 && bOrder !== void 0) {
            return aOrder - bOrder;
          } else if (aOrder !== void 0) {
            return -1;
          } else if (bOrder !== void 0) {
            return 1;
          }
          const aDisplay = a.displayName ?? a.name;
          const bDisplay = b.displayName ?? b.name;
          return aDisplay.localeCompare(bDisplay);
        }).map((field) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: `field-${field.name}`,
              className: `h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 ${field.disabled || field.alwaysSelected ? "opacity-60 cursor-not-allowed" : ""}`,
              checked: selectedFields.has(field.name) || Boolean(field.alwaysSelected),
              onChange: () => handleToggleField(field.name),
              disabled: Boolean(field.disabled) || Boolean(field.alwaysSelected)
            }
          ),
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: `field-${field.name}`,
              className: `ml-2 text-sm ${field.disabled || field.alwaysSelected ? "text-gray-500" : "text-gray-700"}`,
              children: [
                field.displayName ?? field.name,
                field.alwaysSelected ? " (always included)" : ""
              ]
            }
          )
        ] }, field.name)) })
      ] }, header)),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn loculusColor text-white -py-1",
          onClick: onClose,
          "data-testid": "field-selector-close-button",
          children: "Close"
        }
      ) })
    ] })
  ] });
};

const FieldSelectorModal = ({
  isOpen,
  onClose,
  metadata,
  initialSelectedFields,
  onSave
}) => {
  const getInitialSelectedFields = () => {
    const fields = new Set(initialSelectedFields ?? getDefaultSelectedFields(metadata));
    fields.add(ACCESSION_VERSION_FIELD);
    return fields;
  };
  const [selectedFields, setSelectedFields] = useState(getInitialSelectedFields());
  const handleFieldSelection = (fieldName, selected) => {
    setSelectedFields((prevSelectedFields) => {
      const newSelectedFields = new Set(prevSelectedFields);
      if (selected) {
        newSelectedFields.add(fieldName);
      } else {
        newSelectedFields.delete(fieldName);
      }
      onSave(Array.from(newSelectedFields));
      return newSelectedFields;
    });
  };
  const fieldItems = metadata.map((field) => ({
    name: field.name,
    displayName: field.displayName,
    header: field.header,
    alwaysSelected: field.name === ACCESSION_VERSION_FIELD,
    disabled: field.name === ACCESSION_VERSION_FIELD
  }));
  return /* @__PURE__ */ jsx(
    FieldSelectorModal$1,
    {
      title: "Select fields to download",
      isOpen,
      onClose,
      fields: fieldItems,
      selectedFields,
      setFieldSelected: handleFieldSelection
    }
  );
};
function getDefaultSelectedFields(metadata) {
  const defaultFields = metadata.filter((field) => field.includeInDownloadsByDefault).map((field) => field.name);
  if (!defaultFields.includes(ACCESSION_VERSION_FIELD)) {
    defaultFields.push(ACCESSION_VERSION_FIELD);
  }
  return defaultFields;
}

const RadioOptionBlock = ({
  name,
  title,
  options,
  selected,
  onSelect,
  disabled = false,
  variant = "default"
}) => {
  return /* @__PURE__ */ jsxs("div", { className: (variant === "nested" ? "px-4 mr-10" : "") + " flex-1 min-w-60 justify-start", children: [
    title !== void 0 && /* @__PURE__ */ jsx("h4", { className: variant === "nested" ? "text-sm font-normal" : "font-bold", children: title }),
    options.map((option, index) => /* @__PURE__ */ jsxs("div", { className: disabled ? "bg-gray-100" : "", children: [
      /* @__PURE__ */ jsxs("label", { className: "label justify-start py-1 items-baseline", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name,
            className: "mr-4 text-primary-600 focus:ring-primary-600 relative bottom-[-0.2rem] disabled:opacity-50",
            checked: index === selected,
            onChange: () => onSelect(index),
            disabled
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `label-text ${disabled ? "text-gray-500" : ""} ${variant === "nested" ? "text-sm" : ""}`,
            children: option.label
          }
        )
      ] }),
      option.subOptions
    ] }, index))
  ] });
};
const DropdownOptionBlock = ({
  name,
  title,
  options,
  selected,
  onSelect,
  disabled = false
}) => {
  return /* @__PURE__ */ jsx("div", { className: "max-w-80", children: /* @__PURE__ */ jsxs(
    "select",
    {
      name,
      className: "select select-bordered w-full max-w-xs min-h-0 h-auto py-0",
      disabled,
      value: selected,
      onChange: (event) => onSelect(event.target.selectedIndex),
      children: [
        title !== void 0 && /* @__PURE__ */ jsx("option", { disabled: true, selected: true, children: title }),
        options.map((option, index) => /* @__PURE__ */ jsx("option", { value: index, children: option.label }, index))
      ]
    }
  ) });
};

function orderFieldsForDownload(fields, metadata) {
  const fieldsWithoutAccessionVersion = fields.filter((field) => field !== ACCESSION_VERSION_FIELD);
  const orderMap = /* @__PURE__ */ new Map();
  for (const m of metadata) {
    orderMap.set(m.name, m.order ?? Number.MAX_SAFE_INTEGER);
  }
  const ordered = fieldsWithoutAccessionVersion.slice().sort((a, b) => (orderMap.get(a) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(b) ?? Number.MAX_SAFE_INTEGER));
  return [ACCESSION_VERSION_FIELD, ...ordered];
}
const DownloadForm = ({
  referenceGenomesSequenceNames,
  onChange,
  allowSubmissionOfConsensusSequences,
  dataUseTermsEnabled,
  metadata,
  selectedFields,
  onSelectedFieldsChange,
  richFastaHeaderFields
}) => {
  const [includeRestricted, setIncludeRestricted] = useState(0);
  const [dataType, setDataType] = useState(0);
  const [compression, setCompression] = useState(0);
  const [unalignedNucleotideSequence, setUnalignedNucleotideSequence] = useState(0);
  const [alignedNucleotideSequence, setAlignedNucleotideSequence] = useState(0);
  const [alignedAminoAcidSequence, setAlignedAminoAcidSequence] = useState(0);
  const [includeRichFastaHeaders, setIncludeRichFastaHeaders] = useState(0);
  const [isFieldSelectorOpen, setIsFieldSelectorOpen] = useState(false);
  const isMultiSegmented = referenceGenomesSequenceNames.nucleotideSequences.length > 1;
  useEffect(() => {
    let downloadDataType;
    switch (dataType) {
      case 0:
        downloadDataType = { type: "metadata" };
        break;
      case 1:
        downloadDataType = {
          type: "unalignedNucleotideSequences",
          segment: isMultiSegmented ? referenceGenomesSequenceNames.nucleotideSequences[unalignedNucleotideSequence] : void 0,
          includeRichFastaHeaders: includeRichFastaHeaders === 1
        };
        break;
      case 2:
        downloadDataType = {
          type: "alignedNucleotideSequences",
          segment: isMultiSegmented ? referenceGenomesSequenceNames.nucleotideSequences[alignedNucleotideSequence] : void 0
        };
        break;
      case 3:
        downloadDataType = {
          type: "alignedAminoAcidSequences",
          gene: referenceGenomesSequenceNames.genes[alignedAminoAcidSequence]
        };
        break;
      default:
        throw new Error(`Invalid state error: DownloadForm dataType=${dataType}`);
    }
    const compressionOptions = [void 0, "zstd", "gzip"];
    onChange({
      dataType: downloadDataType,
      includeRestricted: includeRestricted === 1,
      fields: dataType === 0 ? orderFieldsForDownload(selectedFields, metadata) : void 0,
      compression: compressionOptions[compression],
      dataFormat: void 0
    });
  }, [
    includeRestricted,
    compression,
    dataType,
    unalignedNucleotideSequence,
    alignedNucleotideSequence,
    alignedAminoAcidSequence,
    includeRichFastaHeaders,
    isMultiSegmented,
    referenceGenomesSequenceNames.nucleotideSequences,
    referenceGenomesSequenceNames.genes,
    onChange,
    selectedFields
  ]);
  const metadataOption = {
    label: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { children: "Metadata" }),
      /* @__PURE__ */ jsx(
        FieldSelectorButton,
        {
          onClick: () => setIsFieldSelectorOpen(true),
          selectedFieldsCount: selectedFields.length,
          disabled: dataType !== 0
        }
      )
    ] })
  };
  const dataTypeOptions = allowSubmissionOfConsensusSequences ? [
    metadataOption,
    {
      label: /* @__PURE__ */ jsx(Fragment, { children: "Raw nucleotide sequences" }),
      subOptions: /* @__PURE__ */ jsxs("div", { className: "px-8", children: [
        isMultiSegmented ? /* @__PURE__ */ jsx(
          DropdownOptionBlock,
          {
            name: "unalignedNucleotideSequences",
            options: referenceGenomesSequenceNames.nucleotideSequences.map((segment) => ({
              label: /* @__PURE__ */ jsx(Fragment, { children: segment })
            })),
            selected: unalignedNucleotideSequence,
            onSelect: setUnalignedNucleotideSequence,
            disabled: dataType !== 1
          }
        ) : void 0,
        richFastaHeaderFields && /* @__PURE__ */ jsx(
          RadioOptionBlock,
          {
            name: "richFastaHeaders",
            title: "FASTA header style",
            options: [{ label: /* @__PURE__ */ jsx(Fragment, { children: "Accession" }) }, { label: /* @__PURE__ */ jsx(Fragment, { children: "Display name" }) }],
            selected: includeRichFastaHeaders,
            onSelect: setIncludeRichFastaHeaders,
            disabled: dataType !== 1,
            variant: "nested"
          }
        )
      ] })
    },
    {
      label: /* @__PURE__ */ jsx(Fragment, { children: "Aligned nucleotide sequences" }),
      subOptions: isMultiSegmented ? /* @__PURE__ */ jsx("div", { className: "px-8", children: /* @__PURE__ */ jsx(
        DropdownOptionBlock,
        {
          name: "alignedNucleotideSequences",
          options: referenceGenomesSequenceNames.nucleotideSequences.map((gene) => ({
            label: /* @__PURE__ */ jsx(Fragment, { children: gene })
          })),
          selected: alignedNucleotideSequence,
          onSelect: setAlignedNucleotideSequence,
          disabled: dataType !== 2
        }
      ) }) : void 0
    },
    {
      label: /* @__PURE__ */ jsx(Fragment, { children: "Aligned amino acid sequences" }),
      subOptions: /* @__PURE__ */ jsx("div", { className: "px-8", children: /* @__PURE__ */ jsx(
        DropdownOptionBlock,
        {
          name: "alignedAminoAcidSequences",
          options: referenceGenomesSequenceNames.genes.map((gene) => ({
            label: /* @__PURE__ */ jsx(Fragment, { children: gene })
          })),
          selected: alignedAminoAcidSequence,
          onSelect: setAlignedAminoAcidSequence,
          disabled: dataType !== 3
        }
      ) })
    }
  ] : [metadataOption];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap mb-4 gap-y-2 py-4", children: [
    dataUseTermsEnabled && /* @__PURE__ */ jsx(
      RadioOptionBlock,
      {
        name: "includeRestricted",
        title: "Include restricted data?",
        options: [
          { label: /* @__PURE__ */ jsx(Fragment, { children: "No, only download open data" }) },
          {
            label: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Yes, include restricted data",
              /* @__PURE__ */ jsx("br", {}),
              "(",
              /* @__PURE__ */ jsx("a", { href: routes.datauseTermsPage(), className: "underline", children: "What does it mean?" }),
              ")"
            ] })
          }
        ],
        selected: includeRestricted,
        onSelect: setIncludeRestricted
      }
    ),
    /* @__PURE__ */ jsx(
      RadioOptionBlock,
      {
        name: "dataType",
        title: "Data type",
        options: dataTypeOptions,
        selected: dataType,
        onSelect: setDataType
      }
    ),
    /* @__PURE__ */ jsx(
      RadioOptionBlock,
      {
        name: "compression",
        title: "Compression",
        options: [{ label: /* @__PURE__ */ jsx(Fragment, { children: "None" }) }, { label: /* @__PURE__ */ jsx(Fragment, { children: "Zstandard" }) }, { label: /* @__PURE__ */ jsx(Fragment, { children: "Gzip" }) }],
        selected: compression,
        onSelect: setCompression
      }
    ),
    /* @__PURE__ */ jsx(
      FieldSelectorModal,
      {
        isOpen: isFieldSelectorOpen,
        onClose: () => setIsFieldSelectorOpen(false),
        metadata,
        initialSelectedFields: selectedFields,
        onSave: onSelectedFieldsChange
      }
    )
  ] });
};

const BADGE_CLASSES = "border-primary-600 rounded-sm border border-l-primary-600 bg-gray-100 border-l-8 pl-3 py-1 text-sm flex flex-row";
const SHOW_ALL_THRESHOLD = 6;
const MAX_SHOWN = 3;
const isBlankToken = (v) => v === "(blank)";
const Token = ({ text }) => /* @__PURE__ */ jsx("span", { className: isBlankToken(text) ? "italic font-semibold" : "font-semibold", children: text });
const normalize = (v) => v ?? "(blank)";
const ArrayFilterValues = ({ values }) => {
  const normalized = values.map(normalize);
  if (normalized.length === 1) {
    const only = normalized[0];
    return /* @__PURE__ */ jsx("span", { className: "text-primary-900", children: /* @__PURE__ */ jsx(Token, { text: only }) });
  }
  if (normalized.length < SHOW_ALL_THRESHOLD) {
    return /* @__PURE__ */ jsx("span", { className: "text-primary-900", children: normalized.map((val, idx) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      idx > 0 && ", ",
      /* @__PURE__ */ jsx(Token, { text: val })
    ] }, idx)) });
  }
  const shown = normalized.slice(0, MAX_SHOWN);
  const remaining = normalized.length - MAX_SHOWN;
  return /* @__PURE__ */ jsxs("span", { className: "text-primary-900", children: [
    shown.map((val, idx) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      idx > 0 && ", ",
      /* @__PURE__ */ jsx(Token, { text: val })
    ] }, idx)),
    /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
      "… and ",
      remaining,
      " more"
    ] })
  ] });
};
const SingleFilterValue = ({ value }) => {
  if (value === "") {
    return /* @__PURE__ */ jsx("span", { className: "text-primary-900 italic", children: "any" });
  }
  if (value == null) {
    return /* @__PURE__ */ jsx("span", { className: "text-primary-900 italic", children: "(blank)" });
  }
  return /* @__PURE__ */ jsx("span", { className: "text-primary-900 font-semibold", children: value });
};
const Badge = ({ label, showX, onRemove, ariaLabel, children }) => /* @__PURE__ */ jsxs("div", { className: BADGE_CLASSES, children: [
  /* @__PURE__ */ jsxs("span", { className: "text-primary-900 font-light pr-1", children: [
    label,
    ":"
  ] }),
  children,
  showX ? /* @__PURE__ */ jsx("button", { "aria-label": ariaLabel, className: "inline ml-2 mt-0.5 pr-2", onClick: onRemove, children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "w-3 h-4 text-primary-600" }) }) : /* @__PURE__ */ jsx("div", { className: "pr-4" })
] });
const ActiveFilters = ({ sequenceFilter, removeFilter }) => {
  if (sequenceFilter.isEmpty()) return null;
  const showXButton = removeFilter !== void 0;
  const entries = [...sequenceFilter.toDisplayStrings()];
  return /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap gap-3", children: entries.map(([key, [label, value]]) => {
    if (Array.isArray(value)) {
      return /* @__PURE__ */ jsx(
        Badge,
        {
          label,
          showX: showXButton,
          onRemove: showXButton ? () => removeFilter(key) : void 0,
          ariaLabel: `remove ${label} filter`,
          children: /* @__PURE__ */ jsx(ArrayFilterValues, { values: value })
        },
        key
      );
    }
    return /* @__PURE__ */ jsx(
      Badge,
      {
        label,
        showX: showXButton,
        onRemove: showXButton ? () => removeFilter(key) : void 0,
        ariaLabel: "remove filter",
        children: /* @__PURE__ */ jsx(SingleFilterValue, { value })
      },
      key
    );
  }) });
};

const DownloadDialog = ({
  downloadUrlGenerator,
  sequenceFilter,
  referenceGenomesSequenceNames,
  allowSubmissionOfConsensusSequences,
  dataUseTermsEnabled,
  metadata,
  richFastaHeaderFields
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [downloadOption, setDownloadOption] = useState();
  const [agreedToDataUseTerms, setAgreedToDataUseTerms] = useState(dataUseTermsEnabled ? false : true);
  const [selectedFields, setSelectedFields] = useState(getDefaultSelectedFields(metadata));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DownloadDialogButton, { sequenceFilter, onClick: openDialog }),
    /* @__PURE__ */ jsx(BaseDialog, { title: "Download", isOpen, onClose: closeDialog, fullWidth: false, children: /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
      !sequenceFilter.isEmpty() && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold mb-2", children: "Active filters" }),
        /* @__PURE__ */ jsx(ActiveFilters, { sequenceFilter })
      ] }),
      /* @__PURE__ */ jsx(
        DownloadForm,
        {
          referenceGenomesSequenceNames,
          onChange: setDownloadOption,
          allowSubmissionOfConsensusSequences,
          dataUseTermsEnabled,
          metadata,
          selectedFields,
          onSelectedFieldsChange: setSelectedFields,
          richFastaHeaderFields
        }
      ),
      dataUseTermsEnabled && /* @__PURE__ */ jsx("div", { className: "mb-4 py-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            name: "data-use-terms-agreement",
            className: "mr-3 ml-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-600",
            checked: agreedToDataUseTerms,
            onChange: () => setAgreedToDataUseTerms(!agreedToDataUseTerms)
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "I agree to the",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: routes.datauseTermsPage(),
              className: "underline",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "data use terms"
            }
          ),
          "."
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        DownloadButton$1,
        {
          downloadUrlGenerator,
          downloadOption,
          sequenceFilter,
          disabled: !agreedToDataUseTerms,
          onClick: closeDialog
        }
      )
    ] }) })
  ] });
};

function matchPlaceholders(template) {
  const placeholderRegex = /\[([\w]+)(?::([\w-]+))?(?:\+([^\]|]+))?(?:\|([^\]]+))?\]/g;
  const matches = Array.from(template.matchAll(placeholderRegex));
  return matches.map((match) => {
    const [fullMatch, dataType, segment, plusOption, optionString] = match;
    let dataFormat;
    let columns;
    let rich = false;
    if (plusOption) {
      if (dataType === "metadata") {
        columns = plusOption.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
      } else if (plusOption === "rich") {
        rich = true;
      }
    }
    if (optionString) {
      dataFormat = optionString;
    }
    return {
      fullMatch,
      dataType,
      segment,
      richHeaders: rich,
      dataFormat,
      columns
    };
  });
}
function processTemplate(template, placeholdersAndValues) {
  function processNestedBraces(str) {
    const regex = /{{([^{}]+)}}/g;
    if (!str.match(regex)) {
      return str;
    }
    const processed = str.replace(regex, (_match, content) => {
      return encodeURIComponent(content);
    });
    return processNestedBraces(processed);
  }
  let result = template;
  Object.entries(placeholdersAndValues).forEach(([key, value]) => {
    result = result.replaceAll(`[${key}]`, value || "");
  });
  return processNestedBraces(result);
}

const dashiconsExternal = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M9 3h8v8l-2-1V6.92l-5.6 5.59l-1.41-1.41L14.08 5H10zm3 12v-3l2-2v7H3V6h8L9 8H5v7z" }) });
const ForwardRef$9 = forwardRef(dashiconsExternal);

const DATA_TYPES = ["unalignedNucleotideSequences", "metadata", "alignedNucleotideSequences"];
const LinkOutMenu = ({
  downloadUrlGenerator,
  sequenceFilter,
  sequenceCount,
  linkOuts,
  dataUseTermsEnabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataUseTermsModalVisible, setDataUseTermsModalVisible] = useState(false);
  const currentLinkOut = useRef(null);
  const handleLinkClick = (linkOut) => {
    currentLinkOut.current = linkOut;
    if (linkOut.maxNumberOfRecommendedEntries !== void 0 && sequenceCount !== void 0 && sequenceCount > linkOut.maxNumberOfRecommendedEntries) {
      const proceed = confirm(
        `Warning: This tool is recommended for at most ${linkOut.maxNumberOfRecommendedEntries} sequences. You are attempting to use ${sequenceCount}. Continue?`
      );
      if (!proceed) {
        return;
      }
    }
    if (dataUseTermsEnabled) {
      setDataUseTermsModalVisible(true);
    } else {
      const url = generateLinkOutUrl(currentLinkOut.current);
      openUrl(url);
    }
  };
  const generateLinkOutUrl = (linkOut, includeRestricted = false) => {
    const placeholders = matchPlaceholders(linkOut.url);
    const urlMap = {};
    for (const match of placeholders) {
      const { fullMatch, dataType, segment, richHeaders, dataFormat, columns } = match;
      if (!DATA_TYPES.includes(dataType)) {
        continue;
      }
      const downloadOption = {
        includeRestricted,
        dataType: {
          type: dataType,
          segment,
          includeRichFastaHeaders: richHeaders ? true : void 0
        },
        compression: void 0,
        dataFormat,
        fields: columns
      };
      const { url } = downloadUrlGenerator.generateDownloadUrl(sequenceFilter, downloadOption);
      urlMap[fullMatch.slice(1, -1)] = url;
    }
    return processTemplate(linkOut.url, urlMap);
  };
  const openUrl = (url) => {
    if (url.length > approxMaxAcceptableUrlLength) {
      alert(
        `Warning: The generated URL for the tool is very long (${url.length} characters) and may not work in some browsers or servers. This may relate to your current search filter settings.`
      );
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleIncludeRestricted = () => {
    if (currentLinkOut.current) {
      const url = generateLinkOutUrl(currentLinkOut.current, true);
      openUrl(url);
    }
    setDataUseTermsModalVisible(false);
  };
  const handleOpenLinkWithOpenOnly = () => {
    if (currentLinkOut.current) {
      const url = generateLinkOutUrl(currentLinkOut.current, false);
      openUrl(url);
    }
    setDataUseTermsModalVisible(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Menu, { as: "div", className: "ml-2 relative inline-block text-left", children: [
      /* @__PURE__ */ jsxs(
        MenuButton,
        {
          className: "outlineButton flex items-center min-w-[100px] justify-between h-full",
          onClick: () => setIsOpen(!isOpen),
          children: [
            /* @__PURE__ */ jsx("span", { children: "Tools" }),
            /* @__PURE__ */ jsx(ForwardRef$c, { className: "ml-2 h-5 w-5", "aria-hidden": "true" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(MenuItems, { className: "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: linkOuts.map((linkOut) => /* @__PURE__ */ jsx(MenuItem, { children: ({ focus }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleLinkClick(linkOut),
          className: `
                                            ${focus ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                                            flex items-center justify-between px-4 py-2 text-sm w-full text-left
                                        `,
          children: [
            linkOut.name,
            /* @__PURE__ */ jsx(ForwardRef$9, { className: "h-4 w-4 ml-2" })
          ]
        }
      ) }, linkOut.name)) }) })
    ] }),
    dataUseTermsEnabled && /* @__PURE__ */ jsx(
      LinkOutMenuDataUseTermModal,
      {
        modalVisible: isDataUseTermsModalVisible,
        setModalVisible: setDataUseTermsModalVisible,
        currentLinkOut,
        onClick: handleOpenLinkWithOpenOnly,
        onClick1: handleIncludeRestricted
      }
    )
  ] });
};
function LinkOutMenuDataUseTermModal(props) {
  return /* @__PURE__ */ jsx(BasicModal, { isModalVisible: props.modalVisible, setModalVisible: props.setModalVisible, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold mb-2", children: [
      "Options for launching ",
      props.currentLinkOut.current?.name ?? "Tool"
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-700 mb-4 mt-6", children: "Data use terms" }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 text-gray-600", children: "Would you like to include Restricted-Use sequences in this analysis? (If you do, you must comply with the Restricted-Use terms.)" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors",
          onClick: props.onClick,
          children: "Open sequences only"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors",
          onClick: props.onClick1,
          children: "Include Restricted-Use"
        }
      )
    ] })
  ] }) });
}

const TextField = forwardRef(function(props, ref) {
  const { label, disabled, onChange, autoComplete, fieldValue, className, onFocus, multiline, onBlur } = props;
  const id = useId();
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const numericTypes = ["number", "int", "float"];
  const inputType = props.type !== void 0 && numericTypes.includes(props.type) ? "number" : "text";
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransitionEnabled(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  const standardOnFocus = (event) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const standardOnBlur = (event) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };
  const inputOnFocus = standardOnFocus;
  const inputOnBlur = standardOnBlur;
  const handleChange = (event) => {
    if (props.type === "int") {
      const value = event.target.value;
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        event.target.value = intValue.toString();
      } else {
        event.target.value = "";
      }
    }
    if (onChange) {
      onChange(event);
    }
  };
  const standardProps = {
    id,
    onChange: handleChange,
    autoComplete,
    disabled
  };
  if (multiline === false || multiline === void 0) {
    const handlePaste = (event) => {
      const pasteData = event.clipboardData.getData("text");
      const cleanedData = pasteData.replace(/[\r\n]+/g, "");
      if (pasteData !== cleanedData) {
        event.preventDefault();
        const input = event.currentTarget;
        const selectionStart = input.selectionStart ?? 0;
        const selectionEnd = input.selectionEnd ?? 0;
        const value = input.value;
        const newValue = value.substring(0, selectionStart) + cleanedData + value.substring(selectionEnd);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, newValue);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          input.setSelectionRange(selectionStart + cleanedData.length, selectionStart + cleanedData.length);
        }, 0);
      }
    };
    const inputProps = {
      ...standardProps,
      onFocus: inputOnFocus,
      onBlur: inputOnBlur,
      onPaste: handlePaste,
      ref,
      placeholder: "",
      label: label ?? "",
      step: props.type === "int" ? 1 : void 0
    };
    return /* @__PURE__ */ jsx(FloatingLabel, { ...inputProps, variant: "outlined", type: inputType, value: fieldValue });
  }
  const refTextArea = ref;
  const onFocusHTMLArea = standardOnFocus;
  const onBlurHTMLArea = standardOnBlur;
  const textareaProps = {
    ...standardProps,
    ref: refTextArea,
    placeholder: "",
    onFocus: onFocusHTMLArea,
    onBlur: onBlurHTMLArea,
    value: fieldValue
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative my-1", children: [
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ...textareaProps,
        rows: hasFocus || fieldValue !== void 0 && fieldValue.toString().split("\n").length > 1 ? 4 : 1,
        className: `rounded-md block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`,
        placeholder: ""
      }
    ),
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: id,
        className: `absolute text-sm text-gray-500 dark:text-gray-400 ${isTransitionEnabled ? "duration-300" : ""} transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`,
        children: label
      }
    )
  ] });
});

const NormalTextField = forwardRef((props, ref) => {
  const { field, setSomeFieldValues, multiline, onFocus, onBlur, fieldValue } = props;
  return /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
    TextField,
    {
      label: field.displayName ?? field.name,
      type: field.type,
      fieldValue,
      onFocus,
      onBlur,
      onChange: (e) => setSomeFieldValues([field.name, e.target.value]),
      autoComplete: "off",
      multiline,
      ref
    }
  ) });
});

const AccessionField = ({ textValue, setTextValue }) => {
  return /* @__PURE__ */ jsx(
    NormalTextField,
    {
      field: {
        type: "string",
        displayName: "Accession",
        autocomplete: false,
        name: "accession",
        notSearchable: false
      },
      setSomeFieldValues: ([, filter]) => {
        setTextValue(filter);
      },
      fieldValue: textValue,
      multiline: true
    }
  );
};

function jsDateToISOString(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function isoStringToJsDate(value) {
  if (!value) return null;
  const dt = DateTime.fromFormat(value, "yyyy-MM-dd");
  if (!dt.isValid) return null;
  const jsDate = dt.toJSDate();
  jsDate.setHours(0, 0, 0, 0);
  return jsDate;
}
function jsDateToTimestamp(date, isUpperBound) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const [hours, minutes, seconds, ms] = isUpperBound ? [23, 59, 59, 999] : [0, 0, 0, 0];
  const utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
  if (isNaN(utcDate.getTime())) return "";
  return String(Math.floor(utcDate.getTime() / 1e3));
}
function timestampToJsDate(value) {
  if (!value) return null;
  const timestamp = parseInt(value, 10);
  if (isNaN(timestamp)) return null;
  const utcDate = new Date(timestamp * 1e3);
  if (isNaN(utcDate.getTime())) return null;
  const localDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    utcDate.getUTCMilliseconds()
  );
  return isNaN(localDate.getTime()) ? null : localDate;
}
const DateField = (props) => /* @__PURE__ */ jsx(
  CustomizedDatePicker,
  {
    ...props,
    dateToValueConverter: jsDateToISOString,
    valueToDateConverter: isoStringToJsDate
  }
);
const TimestampField = (props) => {
  const isUpperBound = props.field.name.endsWith("To");
  return /* @__PURE__ */ jsx(
    CustomizedDatePicker,
    {
      ...props,
      dateToValueConverter: (date) => jsDateToTimestamp(date, isUpperBound),
      valueToDateConverter: (timestamp) => timestampToJsDate(timestamp)
    }
  );
};
const CustomizedDatePicker = ({
  field,
  setSomeFieldValues,
  dateToValueConverter,
  valueToDateConverter,
  fieldValue
}) => {
  const [resetKey, setResetKey] = useState(0);
  const lastWasEmpty = useRef(true);
  const internalClear = useRef(false);
  useEffect(() => {
    const isEmpty = fieldValue === "";
    if (isEmpty && !lastWasEmpty.current && !internalClear.current) {
      setResetKey((k) => k + 1);
    }
    lastWasEmpty.current = isEmpty;
    internalClear.current = false;
  }, [fieldValue]);
  const defaultDate = fieldValue !== "" ? valueToDateConverter(String(fieldValue)) : null;
  const handleChange = (date) => {
    const converted = dateToValueConverter(date);
    if (converted === "") internalClear.current = true;
    setSomeFieldValues([field.name, converted]);
  };
  const handleClean = () => {
    internalClear.current = true;
    setSomeFieldValues([field.name, ""]);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm w-16 my-3 text-right mr-2 text-gray-400", children: field.displayName ?? field.name }),
    /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
      DatePicker,
      {
        format: "yyyy-MM-dd",
        defaultValue: defaultDate,
        id: field.name,
        name: field.name,
        isoWeek: true,
        oneTap: true,
        onChange: handleChange,
        onClean: handleClean
      },
      resetKey
    ) })
  ] }) });
};

function isStrictMode(lowerFromDefined, lowerToDefined, upperFromDefined, upperToDefined) {
  if ((lowerFromDefined || upperToDefined) && !lowerToDefined && !upperFromDefined) {
    return true;
  } else if ((lowerToDefined || upperFromDefined) && !lowerFromDefined && !upperToDefined) {
    return false;
  } else {
    return true;
  }
}
const DateRangeField = ({ field, fieldValues, setSomeFieldValues }) => {
  const getField = (bound, fromTo) => field.groupedFields.find((f) => f.name.endsWith(fromTo) && f.rangeOverlapSearch.bound === bound);
  const lowerFromField = getField("lower", "From");
  const lowerToField = getField("lower", "To");
  const upperFromField = getField("upper", "From");
  const upperToField = getField("upper", "To");
  const [strictMode, setStrictMode] = useState(
    isStrictMode(
      lowerFromField.name in fieldValues,
      lowerToField.name in fieldValues,
      upperFromField.name in fieldValues,
      upperToField.name in fieldValues
    )
  );
  const lowerField = strictMode ? lowerFromField : upperFromField;
  const upperField = strictMode ? upperToField : lowerToField;
  const getFieldValue = (fieldName) => {
    return validateSingleValue(fieldValues[fieldName], fieldName);
  };
  const [lowerValue, setLowerValue] = useState(getFieldValue(lowerField.name));
  const [upperValue, setUpperValue] = useState(getFieldValue(upperField.name));
  useEffect(() => {
    setStrictMode(
      isStrictMode(
        lowerFromField.name in fieldValues,
        lowerToField.name in fieldValues,
        upperFromField.name in fieldValues,
        upperToField.name in fieldValues
      )
    );
    setLowerValue(validateSingleValue(fieldValues[lowerField.name], lowerField.name));
    setUpperValue(validateSingleValue(fieldValues[upperField.name], upperField.name));
  }, [field, fieldValues]);
  useEffect(() => {
    if (strictMode) {
      setSomeFieldValues(
        [lowerFromField.name, lowerValue],
        [upperToField.name, upperValue],
        [upperFromField.name, null],
        [lowerToField.name, null]
      );
    } else {
      setSomeFieldValues(
        [upperFromField.name, lowerValue],
        [lowerToField.name, upperValue],
        [lowerFromField.name, null],
        [upperToField.name, null]
      );
    }
  }, [
    strictMode,
    lowerValue,
    upperValue,
    lowerFromField,
    lowerToField,
    upperFromField,
    upperToField,
    setSomeFieldValues
  ]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col border p-3 mb-3 rounded-md border-gray-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-baseline mb-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-gray-500 text-sm", children: field.displayName }),
      /* @__PURE__ */ jsx(CustomTooltip, { id: "strict-tooltip" + field.name, children: /* @__PURE__ */ jsxs("div", { className: "w-52", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "strict: " }),
          field.displayName,
          " range must be ",
          /* @__PURE__ */ jsx("span", { className: "italic", children: "entirely " }),
          "inside of the search range."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "not strict: " }),
          field.displayName,
          " range must have ",
          /* @__PURE__ */ jsx("span", { className: "italic", children: "some overlap " }),
          "with the search range."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("label", { "data-tooltip-id": "strict-tooltip" + field.name, children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm mr-2", children: "strict" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "checkbox checkbox-sm text-3xl [--chkbg:white] [--chkfg:theme(colors.gray.700)] checked:border-gray-300",
            checked: strictMode,
            onChange: (event) => setStrictMode(event.target.checked)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DateField,
      {
        field: {
          name: `${field.name}-from`,
          displayName: "From",
          type: "date"
        },
        fieldValue: lowerValue,
        setSomeFieldValues: ([_, value]) => {
          const validatedValue = validateSingleValue(value, `${field.name}-from`);
          setLowerValue(validatedValue);
        }
      }
    ),
    /* @__PURE__ */ jsx(
      DateField,
      {
        field: {
          name: `${field.name}-to`,
          displayName: "To",
          type: "date"
        },
        fieldValue: upperValue,
        setSomeFieldValues: ([_, value]) => {
          const validatedValue = validateSingleValue(value, `${field.name}-to`);
          setUpperValue(validatedValue);
        }
      }
    )
  ] }, field.name);
};

const createGenericOptionsHook = (lapisUrl, fieldName, lapisSearchParameters) => {
  const otherFields = { ...lapisSearchParameters };
  delete otherFields[fieldName];
  Object.keys(otherFields).forEach((key) => {
    if (otherFields[key] === "") {
      delete otherFields[key];
    }
  });
  const lapisParams = { fields: [fieldName], ...otherFields };
  return function hook() {
    const { data, isLoading, error, mutate } = lapisClientHooks(lapisUrl).zodiosHooks.useAggregated({}, {});
    const options = (data?.data ?? []).filter(
      (it) => it[fieldName] === null || typeof it[fieldName] === "string" || typeof it[fieldName] === "boolean" || typeof it[fieldName] === "number"
    ).map((it) => ({
      option: it[fieldName] === null ? "(blank)" : it[fieldName].toString(),
      value: it[fieldName] === null ? NULL_QUERY_VALUE : it[fieldName].toString(),
      count: it.count
    })).sort((a, b) => a.option.toLowerCase() < b.option.toLowerCase() ? -1 : 1);
    return {
      options,
      isLoading,
      error,
      load: () => mutate(lapisParams)
    };
  };
};
function aggregateCounts(lineageDefinition, counts, includeSublineages) {
  const canonicalNames = /* @__PURE__ */ new Map();
  const canonicalCounts = /* @__PURE__ */ new Map();
  for (const lineage of Object.keys(lineageDefinition)) {
    canonicalNames.set(lineage, lineage);
    const aliases = lineageDefinition[lineage].aliases ?? [];
    aliases.forEach((a) => canonicalNames.set(a, lineage));
    let count = counts.get(lineage) ?? 0;
    count += aliases.map((a) => counts.get(a) ?? 0).reduce((acc, num) => acc + num, 0);
    canonicalCounts.set(lineage, count);
  }
  let resolvedCounts = /* @__PURE__ */ new Map();
  if (includeSublineages) {
    const children = /* @__PURE__ */ new Map();
    for (const lineage of Object.keys(lineageDefinition)) {
      let parents = lineageDefinition[lineage].parents ?? [];
      parents = parents.map((p) => canonicalNames.get(p));
      parents.forEach((parent) => {
        const existingChildren = children.get(parent) ?? [];
        children.set(parent, [lineage, ...existingChildren]);
      });
    }
    for (const lineage of Object.keys(lineageDefinition)) {
      const descendants = /* @__PURE__ */ new Set();
      let toVisit = [lineage];
      while (toVisit.length > 0) {
        const currentElement = toVisit[0];
        toVisit = toVisit.slice(1);
        descendants.add(currentElement);
        (children.get(currentElement) ?? []).forEach((child) => toVisit.push(child));
      }
      const count = Array.from(descendants).map((descendant) => canonicalCounts.get(descendant) ?? 0).reduce((acc, num) => acc + num, 0);
      resolvedCounts.set(lineage, count);
    }
  } else {
    resolvedCounts = canonicalCounts;
  }
  return resolvedCounts;
}
const createLineageOptionsHook = (lapisUrl, fieldName, lapisSearchParameters, includeSublineages) => {
  const otherFields = { ...lapisSearchParameters };
  delete otherFields[fieldName];
  Object.keys(otherFields).forEach((key) => {
    if (otherFields[key] === "") {
      delete otherFields[key];
    }
  });
  const lapisParams = { fields: [fieldName], ...otherFields };
  return function hook() {
    const {
      data,
      isLoading: aggregateIsLoading,
      error: aggregateError,
      mutate
    } = lapisClientHooks(lapisUrl).zodiosHooks.useAggregated({}, {});
    const {
      data: lineageDefinition,
      isLoading: defIsLoading,
      error: defError
    } = lapisClientHooks(lapisUrl).zodiosHooks.useLineageDefinition(
      {
        params: {
          column: fieldName
        }
      },
      {}
    );
    const unaggregatedCounts = /* @__PURE__ */ new Map();
    if (data?.data) {
      data.data.filter(
        (it) => typeof it[fieldName] === "string" || typeof it[fieldName] === "boolean" || typeof it[fieldName] === "number"
      ).forEach((it) => unaggregatedCounts.set(it[fieldName].toString(), it.count));
    }
    const options = [];
    if (lineageDefinition) {
      const aggregatedCounts = aggregateCounts(lineageDefinition, unaggregatedCounts, includeSublineages);
      Object.keys(lineageDefinition).forEach((lineageName) => {
        let count = aggregatedCounts.get(lineageName);
        if (count === 0) count = void 0;
        options.push({ option: lineageName, value: lineageName, count });
      });
    }
    options.sort((a, b) => a.option.toLowerCase() < b.option.toLowerCase() ? -1 : 1);
    return {
      options,
      isLoading: aggregateIsLoading || defIsLoading,
      error: new AggregateError([aggregateError, defError].filter(Boolean)),
      load: () => mutate(lapisParams)
    };
  };
};
const createOptionsProviderHook = (optionsProvider) => {
  switch (optionsProvider.type) {
    case "generic": {
      return useCallback(
        createGenericOptionsHook(
          optionsProvider.lapisUrl,
          optionsProvider.fieldName,
          optionsProvider.lapisSearchParameters
        ),
        [optionsProvider]
      );
    }
    case "lineage":
      return useCallback(
        createLineageOptionsHook(
          optionsProvider.lapisUrl,
          optionsProvider.fieldName,
          optionsProvider.lapisSearchParameters,
          optionsProvider.includeSublineages
        ),
        [optionsProvider]
      );
  }
};

const mdiChevronUpDown = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 18.17L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15M12 5.83L15.17 9l1.41-1.41L12 3L7.41 7.59L8.83 9z" }) });
const ForwardRef$8 = forwardRef(mdiChevronUpDown);

const mdiTick = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" }) });
const ForwardRef$7 = forwardRef(mdiTick);

const CustomInput = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  TextField,
  {
    ref,
    fieldValue: props.value,
    onChange: props.onChange,
    onFocus: props.onFocus,
    disabled: props.disabled,
    autoComplete: "off",
    placeholder: props.placeholder ?? "",
    label: props.placeholder ?? ""
  }
));
const logger$2 = getClientLogger("SingleChoiceAutoCompleteField");
const SingleChoiceAutoCompleteField = ({
  field,
  optionsProvider,
  setSomeFieldValues,
  fieldValue,
  maxDisplayedOptions = 1e3
}) => {
  const [query, setQuery] = useState("");
  const hook = createOptionsProviderHook(optionsProvider);
  const { options, isLoading: isOptionListLoading, error, load } = hook();
  useEffect(() => {
    if (error) {
      void logger$2.error(`Error while loading autocomplete options: ${error.message} - ${error.stack}`);
    }
  }, [error]);
  const filteredOptions = useMemo(() => {
    const allMatchedOptions = query === "" ? options : options.filter((option) => option.option.toLowerCase().includes(query.toLowerCase()));
    return allMatchedOptions.slice(0, maxDisplayedOptions);
  }, [options, query, maxDisplayedOptions]);
  const handleChange = (value) => {
    const finalValue = value === NULL_QUERY_VALUE ? null : value ?? "";
    setSomeFieldValues([field.name, finalValue]);
  };
  const handleClear = () => {
    setQuery("");
    setSomeFieldValues([field.name, ""]);
  };
  return /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(Combobox, { immediate: true, value: fieldValue, onChange: handleChange, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        ComboboxInput,
        {
          displayValue: (value) => {
            if (value === null || value === NULL_QUERY_VALUE) {
              return "(blank)";
            }
            return String(value);
          },
          onChange: (event) => setQuery(event.target.value),
          onFocus: load,
          placeholder: field.displayName ?? field.name,
          as: CustomInput
        }
      ),
      (fieldValue !== "" && fieldValue !== void 0 || query !== "") && /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute inset-y-0 right-8 flex items-center pr-2 h-5 top-4 bg-white rounded-sm",
          onClick: handleClear,
          "aria-label": `Clear ${field.displayName ?? field.name}`,
          type: "button",
          children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "w-5 h-5 text-gray-400" })
        }
      ),
      /* @__PURE__ */ jsx(ComboboxButton, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(ForwardRef$8, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsx(
      ComboboxOptions,
      {
        modal: false,
        className: "absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-h-32",
        children: isOptionListLoading ? /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-gray-500", children: "Loading..." }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-gray-500", children: "No options available" }) : /* @__PURE__ */ jsx(Fragment, { children: filteredOptions.map((option) => /* @__PURE__ */ jsx(
          ComboboxOption,
          {
            className: ({ focus }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? "bg-blue-500 text-white" : "text-gray-900"}`,
            value: option.value,
            children: ({ focus, selected }) => {
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `inline-block ${selected ? "font-medium" : "font-normal"} ${option.option === "(blank)" ? "italic" : ""}`,
                    children: option.option
                  }
                ),
                option.count !== void 0 && /* @__PURE__ */ jsxs("span", { className: "inline-block ml-1", children: [
                  "(",
                  formatNumberWithDefaultLocale(option.count),
                  ")"
                ] }),
                selected && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-blue-500"}`,
                    children: /* @__PURE__ */ jsx(ForwardRef$7, { className: "w-5 h-5" })
                  }
                )
              ] });
            }
          },
          option.option
        )) })
      }
    )
  ] }) }) }) });
};

const LineageField = ({
  field,
  fieldValue,
  setSomeFieldValues,
  lapisUrl,
  lapisSearchParameters
}) => {
  const [includeSublineages, _setIncludeSubLineages] = useState(fieldValue.endsWith("*"));
  const [inputText, _setInputText] = useState(fieldValue.endsWith("*") ? fieldValue.slice(0, -1) : fieldValue);
  useEffect(() => {
    _setInputText(fieldValue.endsWith("*") ? fieldValue.slice(0, -1) : fieldValue);
    _setIncludeSubLineages(fieldValue.endsWith("*"));
  }, [fieldValue]);
  function queryText(includeSublineages2, inputText2) {
    let queryText2 = includeSublineages2 ? `${inputText2}*` : inputText2;
    if (queryText2 === "*") queryText2 = "";
    return queryText2;
  }
  function setIncludeSubLineages(newValue) {
    _setIncludeSubLineages(newValue);
    setSomeFieldValues([field.name, queryText(newValue, inputText)]);
  }
  function setInputText(newValue) {
    _setInputText(newValue);
    setSomeFieldValues([field.name, queryText(includeSublineages, newValue)]);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col border p-3 mb-3 rounded-md border-gray-300", children: [
    /* @__PURE__ */ jsx(
      SingleChoiceAutoCompleteField,
      {
        field,
        optionsProvider: {
          type: "lineage",
          lapisUrl,
          lapisSearchParameters,
          fieldName: field.name,
          includeSublineages
        },
        setSomeFieldValues: ([_, value]) => {
          setInputText(value);
        },
        fieldValue: inputText
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-end", children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm mr-2", children: "include sublineages" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          className: "checkbox checkbox-sm text-3xl [--chkbg:white] [--chkfg:theme(colors.gray.700)] checked:border-gray-300",
          checked: includeSublineages,
          onChange: (event) => setIncludeSubLineages(event.target.checked)
        }
      )
    ] }) })
  ] }, field.name);
};

const FloatingLabelContainer = ({
  label,
  isFocused,
  hasContent,
  children,
  onClick,
  className = "",
  borderClassName,
  htmlFor
}) => {
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransitionEnabled(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  const borderClasses = borderClassName ?? (isFocused ? "border-blue-600" : "border-gray-300 hover:border-gray-400");
  return /* @__PURE__ */ jsxs("div", { className: "relative my-1", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative flex flex-wrap items-center rounded-md cursor-text transition-colors bg-white min-h-[52px] border ${borderClasses} ${className}`,
        onClick,
        children
      }
    ),
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor,
        className: `absolute text-sm ${isTransitionEnabled ? "duration-300" : ""} transform z-10 origin-[0] bg-white px-2 start-1 pointer-events-none ${hasContent || isFocused ? `-translate-y-3 scale-75 top-1 ${isFocused ? "text-blue-600" : "text-gray-500"}` : "text-gray-500 scale-100 -translate-y-1/2 top-1/2"}`,
        children: label
      }
    )
  ] });
};

const logger$1 = getClientLogger("MultiChoiceAutoCompleteField");
const MultiChoiceAutoCompleteField = ({
  field,
  optionsProvider,
  setSomeFieldValues,
  fieldValues,
  maxDisplayedOptions = 1e3
}) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const MAX_VISIBLE_BADGES = 2;
  const hook = createOptionsProviderHook(optionsProvider);
  const { options, isLoading: isOptionListLoading, error, load } = hook();
  const selectedValues = useMemo(() => new Set(fieldValues.map((v) => v ?? NULL_QUERY_VALUE)), [fieldValues]);
  useEffect(() => {
    if (error) {
      void logger$1.error(`Error while loading autocomplete options: ${error.message} - ${error.stack}`);
    }
  }, [error]);
  const filteredOptions = useMemo(() => {
    const allMatchedOptions = query === "" ? options : options.filter((option) => option.option.toLowerCase().includes(query.toLowerCase()));
    return allMatchedOptions.slice(0, maxDisplayedOptions);
  }, [options, query, maxDisplayedOptions]);
  const handleChange = (value) => {
    if (!value || value.length === 0) {
      setSomeFieldValues([field.name, ""]);
    } else {
      const convertedValues = value.map((v) => v === NULL_QUERY_VALUE ? null : v);
      setSomeFieldValues([field.name, convertedValues]);
    }
  };
  const handleClear = () => {
    setQuery("");
    handleChange([]);
  };
  const multiSelectValue = useMemo(() => Array.from(selectedValues), [selectedValues]);
  return /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(Combobox, { immediate: true, multiple: true, value: multiSelectValue, onChange: handleChange, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      FloatingLabelContainer,
      {
        label: field.displayName ?? field.name,
        isFocused,
        hasContent: selectedValues.size > 0 || query !== "",
        className: "pr-16",
        onClick: (e) => {
          const target = e.target;
          if (!target.closest("button") && !target.closest("input")) {
            inputRef.current?.focus();
          }
        },
        children: [
          selectedValues.size > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 p-1 pt-3", children: selectedValues.size > MAX_VISIBLE_BADGES ? /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                inputRef.current?.focus();
                inputRef.current?.click();
              },
              children: [
                selectedValues.size,
                " selected"
              ]
            }
          ) : Array.from(selectedValues).map((value) => {
            const displayValue = value === NULL_QUERY_VALUE ? "(blank)" : value;
            return /* @__PURE__ */ jsxs(
              "span",
              {
                className: "bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs flex items-center",
                children: [
                  displayValue,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "ml-1 text-blue-500 hover:text-blue-700",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const newValues = multiSelectValue.filter(
                          (v) => v !== value
                        );
                        handleChange(newValues);
                      },
                      "aria-label": `Remove ${displayValue}`,
                      type: "button",
                      children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              value
            );
          }) }),
          /* @__PURE__ */ jsx(
            ComboboxInput,
            {
              ref: inputRef,
              className: `flex-grow border-0 outline-none text-sm text-gray-900 bg-transparent appearance-none focus:ring-0 ${selectedValues.size > 0 ? "px-3 pb-1.5 pt-1" : "px-2.5 pb-1.5 pt-3"}`,
              displayValue: () => "",
              onChange: (event) => setQuery(event.target.value),
              onFocus: () => {
                setIsFocused(true);
                load();
              },
              onBlur: () => {
                setIsFocused(false);
                setQuery("");
              },
              placeholder: "",
              "aria-label": field.displayName ?? field.name
            }
          ),
          (selectedValues.size > 0 || query !== "") && /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute inset-y-0 right-8 flex items-center pr-2",
              onClick: handleClear,
              "aria-label": `Clear ${field.displayName ?? field.name}`,
              type: "button",
              children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "w-5 h-5 text-gray-400" })
            }
          ),
          /* @__PURE__ */ jsx(ComboboxButton, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(ForwardRef$8, { className: "w-5 h-5 text-gray-400" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      ComboboxOptions,
      {
        modal: false,
        className: "absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-h-32",
        children: isOptionListLoading ? /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-gray-500", children: "Loading..." }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-gray-500", children: "No options available" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-4 py-2 text-xs text-gray-600 border-b border-gray-200", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "hover:text-blue-600 hover:underline",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const allValues = filteredOptions.map((opt) => opt.value);
                  handleChange(allValues);
                },
                children: "Select all"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "hover:text-blue-600 hover:underline",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleChange([]);
                },
                children: "Select none"
              }
            )
          ] }),
          filteredOptions.map((option) => /* @__PURE__ */ jsx(
            ComboboxOption,
            {
              className: ({ focus }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? "bg-blue-500 text-white" : "text-gray-900"}`,
              value: option.value,
              children: ({ focus, selected }) => {
                return /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `inline-block ${selected ? "font-medium" : "font-normal"} ${option.option === "(blank)" ? "italic" : ""}`,
                      children: option.option
                    }
                  ),
                  option.count !== void 0 && /* @__PURE__ */ jsxs("span", { className: "inline-block ml-1", children: [
                    "(",
                    formatNumberWithDefaultLocale(option.count),
                    ")"
                  ] }),
                  selected && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-blue-500"}`,
                      children: /* @__PURE__ */ jsx(ForwardRef$7, { className: "w-5 h-5" })
                    }
                  )
                ] });
              }
            },
            option.option
          ))
        ] })
      }
    )
  ] }) }) }) });
};

const materialSymbolsHelpOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" }) });
const ForwardRef$6 = forwardRef(materialSymbolsHelpOutline);

const DisplaySearchDocs = () => {
  const [isOpen, setIsOpen] = React__default.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: openDialog, className: "text-gray-400 hover:text-primary-600 ", children: /* @__PURE__ */ jsx(ForwardRef$6, { className: "inline-block h-6 w-5" }) }),
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
          children: /* @__PURE__ */ jsxs(DialogPanel, { className: "w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all", children: [
            /* @__PURE__ */ jsx(DialogTitle, { as: "h3", className: "font-bold text-2xl mb-4 text-primary-700", children: "Mutation Search" }),
            /* @__PURE__ */ jsx("button", { className: "absolute right-2 top-2 p-1", onClick: closeDialog, children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "Nucleotide Mutations and Insertions" }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "For a single-segmented organism, nucleotide mutations have the format",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<position><base>" }),
                " or",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<base_ref><position><base>" }),
                ". A ",
                /* @__PURE__ */ jsx("b", { children: "<base>" }),
                " ",
                "can be one of the four nucleotides ",
                /* @__PURE__ */ jsx("b", { children: "A" }),
                ", ",
                /* @__PURE__ */ jsx("b", { children: "T" }),
                ", ",
                /* @__PURE__ */ jsx("b", { children: "C" }),
                ", and",
                " ",
                /* @__PURE__ */ jsx("b", { children: "G" }),
                ". It can also be ",
                /* @__PURE__ */ jsx("b", { children: "-" }),
                " for deletion and ",
                /* @__PURE__ */ jsx("b", { children: "N" }),
                " for unknown. For example if the reference sequence is ",
                /* @__PURE__ */ jsx("b", { children: "A" }),
                " at position ",
                /* @__PURE__ */ jsx("b", { children: "23" }),
                " both:",
                " ",
                /* @__PURE__ */ jsx("b", { children: "23T" }),
                " and ",
                /* @__PURE__ */ jsx("b", { children: "A23T" }),
                " will yield the same results."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "If your organism is multi-segmented you must append the name of the segment to the start of the mutation, e.g. ",
                /* @__PURE__ */ jsx("b", { children: "S:23T" }),
                " and ",
                /* @__PURE__ */ jsx("b", { children: "S:A23T" }),
                " for a mutation in segment ",
                /* @__PURE__ */ jsx("b", { children: "S" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "Insertions can be searched for in the same manner, they just need to have",
                " ",
                /* @__PURE__ */ jsx("b", { children: "ins_" }),
                " appended to the start of the mutation. Example",
                " ",
                /* @__PURE__ */ jsx("b", { children: "ins_10462:A" }),
                " or if the organism is multi-segmented",
                " ",
                /* @__PURE__ */ jsx("b", { children: "ins_S:10462:A" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "Amino Acid Mutations and Insertions" }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "An amino acid mutation has the format",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<gene>:<position><base>" }),
                " or",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<gene>:<base_ref><position><base>" }),
                ". A",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<base>" }),
                " can be one of the 20 amino acid codes. It can also be",
                " ",
                /* @__PURE__ */ jsx("b", { children: "-" }),
                " for deletion and ",
                /* @__PURE__ */ jsx("b", { children: "X" }),
                " for unknown. Example: ",
                /* @__PURE__ */ jsx("b", { children: "E:57Q" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "Insertions can be searched for in the same manner, they just need to have",
                " ",
                /* @__PURE__ */ jsx("b", { children: "ins_ " }),
                "appended to the start of the mutation. Example ",
                /* @__PURE__ */ jsx("b", { children: "ins_NS4B:31:N" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "Insertion Wildcards" }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "Loculus supports insertion queries that contain wildcards ",
                /* @__PURE__ */ jsx("b", { children: "?" }),
                ". For example ",
                /* @__PURE__ */ jsx("b", { children: "ins_S:214:?EP?" }),
                " will match all cases where segment ",
                /* @__PURE__ */ jsx("b", { children: "S" }),
                " ",
                "has an insertion of ",
                /* @__PURE__ */ jsx("b", { children: "EP" }),
                " between the positions 214 and 215 but also an insertion of other AAs which include the ",
                /* @__PURE__ */ jsx("b", { children: "EP" }),
                ", e.g. the insertion",
                " ",
                /* @__PURE__ */ jsx("b", { children: "EPE" }),
                " will be matched."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "You can also use wildcards to match any insertion at a given position. For example ",
                /* @__PURE__ */ jsx("b", { children: "ins_S:214:?" }),
                " will match any (but at least one) insertion between the positions 214 and 215."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "Multiple Mutations" }),
              /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Multiple mutation filters can be provided by adding one mutation after the other." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "Any Mutation" }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "To filter for any mutation at a given position you can omit the",
                " ",
                /* @__PURE__ */ jsx("b", { children: "<base>" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-l mb-4 text-primary-700", children: "No Mutation" }),
              /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                "You can write a ",
                /* @__PURE__ */ jsx("b", { children: "." }),
                " for the ",
                /* @__PURE__ */ jsx("b", { children: "<base>" }),
                " to filter for sequences for which it is confirmed that no mutation occurred, i.e. has the same base as the reference genome at the specified position."
              ] })
            ] })
          ] })
        }
      ) }) })
    ] }) })
  ] });
};

const MutationField = ({ referenceGenomesSequenceNames, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const selectedOptions = useMemo(
    () => parseMutationsString(value, referenceGenomesSequenceNames),
    [value, referenceGenomesSequenceNames]
  );
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const mutQuery = parseMutationString(newValue, referenceGenomesSequenceNames);
    const newOptions = mutQuery ? [mutQuery] : [];
    setOptions(newOptions);
  };
  const handleOptionClick = (option) => {
    if (Array.isArray(option)) {
      option = option[0];
    }
    if (!option) {
      return;
    }
    const newSelectedOptions = [...selectedOptions, option];
    onChange(serializeMutationQueries(newSelectedOptions));
    setInputValue("");
    setOptions([]);
  };
  const handleTagDelete = (index) => {
    const newSelectedOptions = selectedOptions.filter((_, i) => i !== index);
    onChange(serializeMutationQueries(newSelectedOptions));
  };
  return /* @__PURE__ */ jsx("div", { className: "flex relative mb-2 flex-row w-full", children: /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(Combobox, { value: selectedOptions, onChange: handleOptionClick, children: /* @__PURE__ */ jsxs("div", { className: "w-full relative", children: [
    /* @__PURE__ */ jsxs(
      FloatingLabelContainer,
      {
        label: "Mutations",
        isFocused: hasFocus,
        hasContent: selectedOptions.length > 0 || inputValue !== "",
        borderClassName: hasFocus ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300",
        className: "shadow-sm",
        htmlFor: "mutField",
        children: [
          selectedOptions.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 p-1 pt-3", children: selectedOptions.map((option, index) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: `inline-block px-2 py-1 rounded-full text-sm ${option.baseType === "nucleotide" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`,
              children: [
                option.text,
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      handleTagDelete(index);
                    },
                    className: "ml-1 focus:outline-none",
                    children: "×"
                  }
                )
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
            /* @__PURE__ */ jsx(
              ComboboxInput,
              {
                onFocus: () => setHasFocus(true),
                onBlur: () => setHasFocus(false),
                placeholder: "",
                onChange: handleInputChange,
                displayValue: (option) => option.text,
                value: inputValue,
                id: "mutField",
                className: `block w-full text-sm text-gray-900 bg-transparent focus:outline-none focus:ring-0 border-0 ${selectedOptions.length === 0 ? "px-2.5 pb-1.5 pt-3" : "px-3 pb-1.5 pt-1"}`
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -translate-y-1/2 right-1", children: /* @__PURE__ */ jsx(DisplaySearchDocs, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment$1,
        leave: "transition ease-in duration-100",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsx(
          ComboboxOptions,
          {
            modal: false,
            className: "absolute w-full z-20 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            children: options.map((option, index) => /* @__PURE__ */ jsx(
              ComboboxOption,
              {
                value: option,
                className: ({ focus }) => `${focus ? "text-white bg-blue-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-10 pr-4`,
                children: ({ selected }) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `${selected ? "font-medium" : "font-normal"} block truncate`,
                    children: option.text
                  }
                )
              },
              index
            ))
          }
        )
      }
    )
  ] }) }) }) });
};

const searchFormHelpDocsUrl = "/docs/how-to/search-sequences-website";

const materialSymbolsResetFocus = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 16v-2.5q0-.625.438-1.062T13.5 12H16v1.5h-2.5V16zm1.5 6q-.625 0-1.062-.437T12 20.5V18h1.5v2.5H16V22zm7-6v-2.5H18V12h2.5q.625 0 1.063.438T22 13.5V16zM18 22v-1.5h2.5V18H22v2.5q0 .625-.437 1.063T20.5 22zm2.775-12H18.7q-.65-2.2-2.475-3.6T12 5Q9.075 5 7.037 7.038T5 12q0 1.8.813 3.3T8 17.75V15h2v6H4v-2h2.35Q4.8 17.75 3.9 15.938T3 12q0-1.875.713-3.512t1.924-2.85t2.85-1.925T12 3q3.225 0 5.663 1.988T20.775 10" }) });
const ForwardRef$5 = forwardRef(materialSymbolsResetFocus);

const streamlineWrench = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 14 14", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", d: "M13.41 3.596a.76.76 0 0 0-.35-.51l-2 2a1 1 0 0 1-1.44 0l-.76-.68a1 1 0 0 1 0-1.4l2-2a.76.76 0 0 0-.48-.43a3.8 3.8 0 0 0-4.2 5.309L.815 11.252a1 1 0 0 0 .014 1.428l.561.538a1 1 0 0 0 1.396-.01l5.428-5.37a3.81 3.81 0 0 0 5.196-4.242" }) });
const ForwardRef$4 = forwardRef(streamlineWrench);

const queryClient = new QueryClient();
const SearchForm = ({
  filterSchema,
  fieldValues,
  setSomeFieldValues,
  lapisUrl,
  searchVisibilities,
  setASearchVisibility,
  referenceGenomesSequenceNames,
  lapisSearchParameters,
  showMutationSearch
}) => {
  const visibleFields = filterSchema.filters.filter((field) => searchVisibilities.get(field.name));
  const [isFieldSelectorOpen, setIsFieldSelectorOpen] = useState(false);
  const { isOpen: isMobileOpen, close: closeOnMobile, toggle: toggleMobileOpen } = useOffCanvas();
  const toggleFieldSelector = () => setIsFieldSelectorOpen(!isFieldSelectorOpen);
  const fieldItems = filterSchema.filters.filter((filter) => filter.name !== "accession").map((filter) => ({
    name: filter.name,
    displayName: filter.displayName ?? sentenceCase(filter.name),
    header: filter.header
  }));
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx("div", { className: "text-right -mb-10 md:hidden", children: /* @__PURE__ */ jsx("button", { onClick: toggleMobileOpen, className: "btn btn-xs bg-primary-600 text-white", children: "Modify search query" }) }),
    isMobileOpen && /* @__PURE__ */ jsx(OffCanvasOverlay, { className: "md:hidden", onClick: closeOnMobile }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${isMobileOpen ? "translate-y-0" : "translate-y-full"} fixed bottom-0 left-0 w-full bg-white h-4/5 rounded-t-lg overflow-auto offCanvasTransform
                      md:translate-y-0 md:static md:h-auto md:overflow-visible md:min-w-72`,
        children: /* @__PURE__ */ jsxs("div", { className: "shadow-xl rounded-r-lg px-4 pt-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold flex-1 md:hidden mb-2", children: "Search query" }),
          /* @__PURE__ */ jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between w-full mb-1 text-primary-700", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full mb-1 text-primary-700 text-sm", children: [
              /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsxs("button", { className: "hover:underline", onClick: toggleFieldSelector, children: [
                /* @__PURE__ */ jsx(ForwardRef$4, { className: "inline-block" }),
                " Add search fields"
              ] }) }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "hover:underline",
                  onClick: () => {
                    window.location.href = "./";
                  },
                  children: [
                    /* @__PURE__ */ jsx(ForwardRef$5, { className: "inline-block" }),
                    " Reset"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("a", { href: searchFormHelpDocsUrl, target: "_blank", children: [
                /* @__PURE__ */ jsx(ForwardRef$6, { className: "inline-block" }),
                " Help"
              ] })
            ] }) }),
            " "
          ] }),
          /* @__PURE__ */ jsx(
            FieldSelectorModal$1,
            {
              title: "Add search fields",
              isOpen: isFieldSelectorOpen,
              onClose: toggleFieldSelector,
              fields: fieldItems,
              selectedFields: new Set(
                Array.from(searchVisibilities.entries()).filter(([_, visible]) => visible).map(([field]) => field)
              ),
              setFieldSelected: setASearchVisibility
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsx(
              AccessionField,
              {
                textValue: "accession" in fieldValues ? fieldValues.accession : "",
                setTextValue: (value) => setSomeFieldValues(["accession", value])
              }
            ) }),
            showMutationSearch && /* @__PURE__ */ jsx(
              MutationField,
              {
                referenceGenomesSequenceNames,
                value: "mutation" in fieldValues ? fieldValues.mutation : "",
                onChange: (value) => setSomeFieldValues(["mutation", value])
              }
            ),
            visibleFields.map((filter) => /* @__PURE__ */ jsx(
              SearchField,
              {
                field: filter,
                lapisUrl,
                fieldValues,
                setSomeFieldValues,
                lapisSearchParameters
              },
              filter.name
            ))
          ] }),
          " "
        ] })
      }
    )
  ] });
};
const SearchField = ({ field, lapisUrl, fieldValues, setSomeFieldValues, lapisSearchParameters }) => {
  if (field.grouped === true) {
    if (field.groupedFields[0].rangeOverlapSearch) {
      return /* @__PURE__ */ jsx(DateRangeField, { field, fieldValues, setSomeFieldValues });
    } else {
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col border p-3 mb-3 rounded-md border-gray-300", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-gray-500 text-sm mb-1", children: field.displayName ?? field.name }),
        field.groupedFields.map((f) => /* @__PURE__ */ jsx(
          SearchField,
          {
            field: f,
            fieldValues,
            setSomeFieldValues,
            lapisSearchParameters,
            lapisUrl
          },
          f.name
        ))
      ] }, field.name);
    }
  }
  switch (field.type) {
    case "date":
      return /* @__PURE__ */ jsx(
        DateField,
        {
          field,
          fieldValue: validateSingleValue(fieldValues[field.name], field.name),
          setSomeFieldValues
        }
      );
    case "timestamp":
      return /* @__PURE__ */ jsx(
        TimestampField,
        {
          field,
          fieldValue: validateSingleValue(fieldValues[field.name], field.name),
          setSomeFieldValues
        }
      );
    default:
      if (field.lineageSearch) {
        return /* @__PURE__ */ jsx(
          LineageField,
          {
            field,
            fieldValue: fieldValues[field.name] ?? "",
            setSomeFieldValues,
            lapisUrl,
            lapisSearchParameters
          }
        );
      }
      if (field.autocomplete === true) {
        const fieldValuesArray = extractArrayValue(fieldValues[field.name]);
        return /* @__PURE__ */ jsx(
          MultiChoiceAutoCompleteField,
          {
            field,
            fieldValues: fieldValuesArray,
            setSomeFieldValues,
            optionsProvider: {
              type: "generic",
              lapisUrl,
              lapisSearchParameters,
              fieldName: field.name
            }
          }
        );
      }
      return /* @__PURE__ */ jsx(
        NormalTextField,
        {
          type: field.type,
          field,
          fieldValue: validateSingleValue(fieldValues[field.name], field.name),
          setSomeFieldValues
        }
      );
  }
};

const SearchPagination = ({
  count,
  page,
  setPage
}) => {
  return /* @__PURE__ */ jsx(
    Pagination,
    {
      count,
      page,
      onChange: (_, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0 });
      },
      color: "primary",
      variant: "outlined",
      shape: "rounded"
    }
  );
};

const detailsJsonSchema = z.object({
  tableData: z.array(tableDataEntrySchema),
  organism: z.string(),
  accessionVersion: z.string(),
  dataUseTermsHistory: z.array(dataUseTermsHistoryEntry),
  schema,
  clientConfig: serviceUrls,
  isRevocation: z.boolean(),
  sequenceEntryHistory: z.array(parsedSequenceEntryHistoryEntrySchema)
});

const charmMenuKebab = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, children: [
  /* @__PURE__ */ jsx("circle", { cx: 8, cy: 2.5, r: 0.75 }),
  /* @__PURE__ */ jsx("circle", { cx: 8, cy: 8, r: 0.75 }),
  /* @__PURE__ */ jsx("circle", { cx: 8, cy: 13.5, r: 0.75 })
] }) });
const ForwardRef$3 = forwardRef(charmMenuKebab);

const materialSymbolsLightWidthFull = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M4.616 19q-.672 0-1.144-.472T3 17.385V6.615q0-.67.472-1.143Q3.944 5 4.616 5h14.769q.67 0 1.143.472q.472.472.472 1.144v10.769q0 .67-.472 1.143q-.472.472-1.143.472zm0-1h.807V6h-.807q-.27 0-.443.173T4 6.616v10.769q0 .269.173.442t.443.173m13.961 0h.808q.269 0 .442-.173t.173-.443V6.616q0-.27-.173-.443T19.385 6h-.808z" }) });
const ForwardRef$2 = forwardRef(materialSymbolsLightWidthFull);

const mdiDockBottom = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 9H4V6h16Z" }) });
const ForwardRef$1 = forwardRef(mdiDockBottom);

const oouiNewWindowLtr = (props, ref) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 20 20", width: "1.2em", height: "1.2em", ref, ...props, children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M17 17H3V3h5V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-2z" }),
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "m11 1l3.3 3.3L8.6 10l1.4 1.4l5.7-5.7L19 9V1z" })
] });
const ForwardRef = forwardRef(oouiNewWindowLtr);

const BUTTONCLASS = "inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";
const logger = getClientLogger("SeqPreviewModal");
const SeqPreviewModal = ({
  seqId,
  accessToken,
  isOpen,
  onClose,
  referenceGenomeSequenceNames,
  sequenceFlaggingConfig,
  myGroups,
  isHalfScreen = false,
  setIsHalfScreen,
  setPreviewedSeqId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (seqId) {
      setIsLoading(true);
      void fetch(`/seq/${seqId}/details.json`).then((res) => res.json()).then((json) => {
        try {
          return detailsJsonSchema.parse(json);
        } catch (e) {
          void logger.error(`Failed to parse JSON: ${e}`);
          throw e;
        }
      }).then(setData).catch(() => setIsError(true)).finally(() => setIsLoading(false));
    }
  }, [accessToken, seqId]);
  const content = /* @__PURE__ */ jsxs(
    "div",
    {
      className: `mt-4 text-gray-700 overflow-y-auto ${isHalfScreen ? "h-[calc(50vh-9rem)]" : "h-[calc(100vh-9rem)]"}`,
      children: [
        !isLoading && data !== null && /* @__PURE__ */ jsx(
          SequencesBanner,
          {
            sequenceEntryHistory: data.sequenceEntryHistory,
            accessionVersion: data.accessionVersion
          }
        ),
        isLoading ? /* @__PURE__ */ jsx("div", { children: "Loading..." }) : data !== null && !isError ? /* @__PURE__ */ jsx("div", { className: "px-6", children: /* @__PURE__ */ jsx(
          SequenceDataUI,
          {
            ...data,
            referenceGenomeSequenceNames,
            myGroups,
            accessToken,
            sequenceFlaggingConfig: data.isRevocation ? void 0 : sequenceFlaggingConfig
          }
        ) }) : /* @__PURE__ */ jsx("div", { children: "Failed to load sequence data" })
      ]
    }
  );
  const controls = /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xl font-medium leading-6 text-primary-700 pl-6", children: seqId }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      data !== null && data.sequenceEntryHistory.length > 1 && /* @__PURE__ */ jsx(
        SequenceEntryHistoryMenu,
        {
          sequenceEntryHistory: data.sequenceEntryHistory,
          accessionVersion: seqId,
          setPreviewedSeqId
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: BUTTONCLASS,
          onClick: () => setIsHalfScreen(!isHalfScreen),
          title: isHalfScreen ? "Expand sequence details view" : "Dock sequence details view",
          "data-testid": "toggle-half-screen-button",
          children: isHalfScreen ? /* @__PURE__ */ jsx(ForwardRef$2, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(ForwardRef$1, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsx(DownloadButton, { seqId }),
      /* @__PURE__ */ jsx("a", { href: routes.sequenceEntryDetailsPage(seqId), title: "Open in full window", className: BUTTONCLASS, children: /* @__PURE__ */ jsx(ForwardRef, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: BUTTONCLASS,
          onClick: onClose,
          title: "Close",
          "data-testid": "close-preview-button",
          children: /* @__PURE__ */ jsx(ForwardRef$b, { className: "w-6 h-6" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsx(Transition, { appear: true, show: isOpen, as: React__default.Fragment, children: isHalfScreen ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed bottom-0 w-full left-0 z-40 bg-white p-6 border-t border-gray-400",
      "data-testid": "half-screen-preview",
      children: [
        controls,
        content
      ]
    }
  ) : /* @__PURE__ */ jsx(
    Dialog,
    {
      as: "div",
      className: "fixed inset-0 z-40 overflow-y-auto",
      onClose,
      "data-testid": "sequence-preview-modal",
      children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen px-8 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black opacity-30" }),
        /* @__PURE__ */ jsxs(DialogPanel, { className: "inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl pb-0", children: [
          controls,
          content
        ] })
      ] })
    }
  ) });
};
const DownloadButton = ({ seqId }) => {
  return /* @__PURE__ */ jsxs("div", { className: "dropdown dropdown-hover relative inline-block", children: [
    /* @__PURE__ */ jsxs("button", { className: BUTTONCLASS, children: [
      /* @__PURE__ */ jsx(ForwardRef$d, { className: "w-6 h-6" }),
      /* @__PURE__ */ jsx(ForwardRef$3, { className: " w-4 h-6 -ml-1.5 pb-1 pt-1.5" })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "dropdown-content z-20 menu p-1 shadow bg-base-100 rounded-btn absolute top-full w-52 -left-32", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: routes.sequenceEntryFastaPage(seqId, true), className: "block px-4 py-2 hover:bg-gray-100", children: "Download FASTA" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: routes.sequenceEntryTsvPage(seqId, true), className: "block px-4 py-2 hover:bg-gray-100", children: "Download metadata TSV" }) })
    ] })
  ] });
};

const ScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [handleWidth, setHandleWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [trackStyle, setTrackStyle] = useState({ left: 0, width: 0 });
  const updatePositions = () => {
    if (scrollRef.current) {
      const rect = scrollRef.current.getBoundingClientRect();
      const clientWidth = scrollRef.current.clientWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      setMaxScroll(scrollWidth - clientWidth);
      const computedTrackWidth = clientWidth - 10;
      setHandleWidth(clientWidth / scrollWidth * computedTrackWidth);
      const computedLeft = rect.left + (clientWidth - computedTrackWidth) / 2;
      setTrackStyle({ left: computedLeft, width: computedTrackWidth });
    }
  };
  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);
  const handleScroll = (e) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const onMouseDownHandle = (e) => {
    setDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(scrollLeft);
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!dragging || !scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    const scrollWidth = scrollRef.current.scrollWidth;
    const maxScrollVal = scrollWidth - clientWidth;
    const trackWidth = trackStyle.width;
    const deltaX = e.clientX - startX;
    const scrollDelta = deltaX / (trackWidth - handleWidth) * maxScrollVal;
    scrollRef.current.scrollLeft = startScrollLeft + scrollDelta;
  };
  const onMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, startX, startScrollLeft, handleWidth, trackStyle.width]);
  const handlePosition = trackStyle.width && maxScroll > 0 ? scrollLeft / maxScroll * (trackStyle.width - handleWidth) : 0;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { ref: scrollRef, onScroll: handleScroll, className: "overflow-x-scroll hide-scrollbar", children }),
    maxScroll > 0 && /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gray-100",
        style: {
          position: "fixed",
          bottom: "3px",
          left: `${trackStyle.left}px`,
          width: `${trackStyle.width}px`,
          height: "10px",
          borderRadius: "5px"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: onMouseDownHandle,
            className: "bg-gray-500",
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${handleWidth}px`,
              borderRadius: "6px",
              transform: `translateX(${handlePosition}px)`,
              cursor: dragging ? "grabbing" : "grab",
              transition: "transform 75ms"
            }
          }
        )
      }
    )
  ] });
};

const MAX_TOOLTIP_LENGTH = 150;
function formatField(value, type) {
  if (typeof value === "number" && Number.isInteger(value)) {
    if (type === "timestamp") {
      return new Date(value * 1e3).toISOString().slice(0, 10);
    }
    return formatNumberWithDefaultLocale(value);
  } else if (typeof value === "boolean") {
    return value ? "True" : "False";
  } else {
    return value;
  }
}
const getColumnWidthStyle = (columnWidth) => columnWidth !== void 0 ? `${columnWidth}px` : `130px`;
const CellContent = ({ value, type, columnWidth }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [value]);
  const formattedValue = formatField(value, type);
  const tooltipText = typeof formattedValue === "string" ? formattedValue.slice(0, MAX_TOOLTIP_LENGTH) + (formattedValue.length > MAX_TOOLTIP_LENGTH ? ".." : "") : formattedValue;
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref: textRef,
      className: "truncate block",
      style: { maxWidth: getColumnWidthStyle(columnWidth) },
      "data-tooltip-id": isTruncated ? "table-tip" : void 0,
      "data-tooltip-content": isTruncated ? tooltipText : void 0,
      children: formattedValue
    }
  );
};
const Table = ({
  data,
  schema,
  selectedSeqs,
  setSelectedSeqs,
  setPreviewedSeqId,
  previewedSeqId,
  orderBy,
  setOrderByField,
  setOrderDirection,
  columnsToShow
}) => {
  const primaryKey = schema.primaryKey;
  const columns = columnsToShow.map((field) => {
    const metadata = schema.metadata.find((m) => m.name === field);
    return {
      field,
      headerName: metadata?.displayName ?? capitalCase(field),
      type: metadata?.type ?? "string",
      columnWidth: metadata?.columnWidth,
      order: metadata?.order ?? Number.MAX_SAFE_INTEGER
    };
  }).sort((a, b) => a.order - b.order);
  const handleSort = (field) => {
    if (orderBy.field === field) {
      if (orderBy.type === "ascending") {
        setOrderDirection("descending");
      } else {
        setOrderDirection("ascending");
      }
    } else {
      setOrderByField(field);
      setOrderDirection("ascending");
    }
  };
  const mouseDownSelection = useRef("");
  const dragSelecting = useRef({ active: false, value: false });
  useEffect(() => {
    const handleMouseUp = () => {
      dragSelecting.current.active = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  const handleRowMouseDown = () => {
    const sel = window.getSelection();
    mouseDownSelection.current = sel?.toString() ?? "";
  };
  const handleRowClick = (e, seqId) => {
    const sel = window.getSelection();
    const current = sel?.toString() ?? "";
    if (current && current !== mouseDownSelection.current) {
      return;
    }
    const detectMob = () => {
      const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    };
    if (e.button === 0) {
      const screenWidth = window.screen.width;
      if (!e.ctrlKey && !e.metaKey && screenWidth > 1024 && !detectMob()) {
        e.preventDefault();
        setPreviewedSeqId(seqId);
      } else {
        window.open(routes.sequenceEntryDetailsPage(seqId));
      }
    } else if (e.button === 1) {
      window.open(routes.sequenceEntryDetailsPage(seqId));
    }
  };
  const setRowSelected = (seqId, selected) => {
    setSelectedSeqs((prevSelectedSeqs) => {
      const newSelectedSeqs = new Set(prevSelectedSeqs);
      if (selected) {
        newSelectedSeqs.add(seqId);
      } else {
        newSelectedSeqs.delete(seqId);
      }
      return newSelectedSeqs;
    });
  };
  const clearSelection = () => setSelectedSeqs(/* @__PURE__ */ new Set());
  const orderIcon = orderBy.type === "ascending" ? /* @__PURE__ */ jsx(ForwardRef$e, { className: "w-3 h-3 ml-1 inline" }) : /* @__PURE__ */ jsx(ForwardRef$f, { className: "w-3 h-3 ml-1 inline" });
  return /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxs(ScrollContainer, { children: [
    /* @__PURE__ */ jsx(Tooltip, { id: "table-tip" }),
    data.length !== 0 ? /* @__PURE__ */ jsxs("table", { className: "min-w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-gray-400 border-b mb-100", children: [
        /* @__PURE__ */ jsx("th", { className: "px-2 py-2 md:pl-6 text-xs text-gray-500 cursor-pointer text-left", children: selectedSeqs.size > 0 && /* @__PURE__ */ jsx(
          ForwardRef$b,
          {
            className: "inline w-3 h-3 mx-0.5",
            onClick: clearSelection
          }
        ) }),
        /* @__PURE__ */ jsxs(
          "th",
          {
            onClick: () => handleSort(primaryKey),
            className: "px-2 py-2 md:pl-6 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer text-left",
            children: [
              capitalCase(primaryKey),
              " ",
              orderBy.field === primaryKey && orderIcon
            ]
          }
        ),
        columns.map((c) => /* @__PURE__ */ jsxs(
          "th",
          {
            onClick: () => handleSort(c.field),
            className: "px-2 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer box-content last:pr-6 text-left",
            style: {
              minWidth: getColumnWidthStyle(c.columnWidth)
            },
            children: [
              c.headerName,
              " ",
              orderBy.field === c.field && orderIcon
            ]
          },
          c.field
        ))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white", children: data.map((row, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: `hover:bg-primary-100 border-b border-gray-200 ${row[primaryKey] === previewedSeqId ? "bg-gray-200" : ""} cursor-pointer`,
          onMouseDown: handleRowMouseDown,
          onClick: (e) => handleRowClick(e, row[primaryKey]),
          onAuxClick: (e) => handleRowClick(e, row[primaryKey]),
          "data-testid": "sequence-row",
          children: [
            /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-2 whitespace-nowrap text-primary-900 md:pl-6",
                onClick: (e) => {
                  e.stopPropagation();
                  const seqId = row[primaryKey];
                  const newValue = !selectedSeqs.has(seqId);
                  setRowSelected(seqId, newValue);
                },
                onMouseEnter: () => {
                  if (dragSelecting.current.active) {
                    setRowSelected(row[primaryKey], dragSelecting.current.value);
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }
                },
                children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "text-primary-900 hover:text-primary-800 hover:no-underline",
                    onClick: (e) => e.stopPropagation(),
                    checked: selectedSeqs.has(row[primaryKey]),
                    onMouseDown: () => {
                      const seqId = row[primaryKey];
                      const newValue = !selectedSeqs.has(seqId);
                      dragSelecting.current = { active: true, value: newValue };
                      setRowSelected(seqId, newValue);
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-2 whitespace-nowrap text-primary-900 md:pl-6",
                "aria-label": "SearchResult",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: routes.sequenceEntryDetailsPage(row[primaryKey]),
                    className: "text-primary-900 hover:text-primary-800 hover:no-underline",
                    onClick: (e) => e.preventDefault(),
                    onAuxClick: (e) => e.preventDefault(),
                    children: row[primaryKey]
                  }
                )
              }
            ),
            columns.map((c) => /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-2 py-2 text-primary-900 box-content last:pr-6",
                style: {
                  minWidth: getColumnWidthStyle(c.columnWidth)
                },
                children: /* @__PURE__ */ jsx(
                  CellContent,
                  {
                    value: row[c.field],
                    type: c.type,
                    columnWidth: c.columnWidth
                  }
                )
              },
              `${index}-${c.field}`
            ))
          ]
        },
        index
      )) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center font-bold text-xl my-8", children: "No Data" })
  ] }) });
};

const MAX_URL_LENGTH = 2e3;
function parseSearchToDict(search) {
  const urlParams = new URLSearchParams(search);
  const dict = {};
  for (const key of new Set(urlParams.keys())) {
    const values = urlParams.getAll(key);
    dict[key] = values.length === 1 ? values[0] : values;
  }
  return dict;
}
function dictToSearchParams(dict) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(dict)) {
    if (value === void 0) {
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => {
        params.append(key, v);
      });
    } else {
      params.set(key, value);
    }
  }
  return params;
}
function buildUrlFromParams(params) {
  const base = window.location.protocol + "//" + window.location.host + window.location.pathname;
  let url = base + "?" + params.toString();
  if (url.endsWith("*")) {
    url = url + "&";
  }
  return url;
}
function useQueryAsState(defaultDict) {
  const [valueDict, setValueDict] = useState(defaultDict);
  const [useUrlStorage, setUseUrlStorage] = useState(true);
  useEffect(() => {
    const parsed = parseSearchToDict(window.location.search);
    setValueDict((prev) => JSON.stringify(prev) === JSON.stringify(parsed) ? prev : parsed);
  }, []);
  useEffect(() => {
    const params = dictToSearchParams(valueDict);
    const candidateUrl = buildUrlFromParams(params);
    if (useUrlStorage) {
      if (candidateUrl.length > MAX_URL_LENGTH) {
        setUseUrlStorage(false);
        window.history.replaceState({ path: window.location.pathname }, "", window.location.pathname);
      } else {
        window.history.replaceState({ path: candidateUrl }, "", candidateUrl);
      }
    } else {
      if (candidateUrl.length <= MAX_URL_LENGTH) {
        setUseUrlStorage(true);
        window.history.replaceState({ path: candidateUrl }, "", candidateUrl);
      }
    }
  }, [valueDict, useUrlStorage]);
  return [valueDict, setValueDict];
}

function useUrlParamState(paramName, queryState, defaultValue, setState, paramType = "string", shouldRemove) {
  const valueState = useMemo(
    () => paramName in queryState ? parseUrlValue(queryState[paramName], paramType) : defaultValue,
    [paramName, queryState, paramType, defaultValue]
  );
  function parseUrlValue(urlValue, type) {
    switch (type) {
      case "boolean":
        return urlValue === "true";
      case "nullable-string":
        return typeof urlValue === "string" ? urlValue : null;
      case "string":
        if (Array.isArray(urlValue)) {
          throw Error("Expected string, found array value in state.");
        }
        return urlValue ?? "";
    }
  }
  const updateUrlParam = useCallback(
    (newValue) => {
      setState((prev) => {
        if (shouldRemove(newValue)) {
          const newState = { ...prev };
          delete newState[paramName];
          return newState;
        } else {
          return {
            ...prev,
            [paramName]: String(newValue)
          };
        }
      });
    },
    [paramName, setState, shouldRemove]
  );
  return [valueState, updateUrlParam];
}

function getLoadedState(rows) {
  const openAccessions = [];
  const restrictedAccessions = /* @__PURE__ */ new Map();
  let earliestRestrictedUntil = null;
  rows.forEach((row) => {
    switch (row[DATA_USE_TERMS_FIELD]) {
      case openDataUseTermsOption:
        openAccessions.push(row.accession);
        break;
      case restrictedDataUseTermsOption: {
        const date = DateTime.fromFormat(row[DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD], "yyyy-MM-dd");
        if (earliestRestrictedUntil === null || date < earliestRestrictedUntil) {
          earliestRestrictedUntil = date;
        }
        restrictedAccessions.set(row.accession, row[DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD]);
        break;
      }
    }
  });
  const totalCount = rows.length;
  const openCount = openAccessions.length;
  const restrictedCount = totalCount - openCount;
  const resultType = openCount === totalCount ? "allOpen" : restrictedCount === totalCount ? "allRestricted" : "mixed";
  return {
    type: "loaded",
    resultType,
    totalCount,
    openCount,
    restrictedCount,
    openAccessions,
    restrictedAccessions,
    earliestRestrictedUntil
  };
}
const EditDataUseTermsModal = ({
  lapisUrl,
  clientConfig,
  accessToken,
  sequenceFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const detailsHook = lapisClientHooks(lapisUrl).zodiosHooks.useDetails({}, {});
  useEffect(() => {
    detailsHook.mutate({
      ...sequenceFilter.toApiParams(),
      fields: ["accession", DATA_USE_TERMS_FIELD, DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD]
    });
  }, [sequenceFilter]);
  const [state, setState] = useState({ type: "loading" });
  useEffect(() => {
    if (detailsHook.isLoading) {
      return;
    }
    if (detailsHook.error !== null && state.type !== "error") {
      setState({ type: "error", error: detailsHook.error });
      return;
    }
    if (detailsHook.data) {
      const newState = getLoadedState(detailsHook.data.data);
      setState(newState);
    }
  }, [detailsHook.data, detailsHook.error, detailsHook.isLoading]);
  const sequenceCount = sequenceFilter.sequenceCount();
  let buttonText = "Edit data use terms (all sequences)";
  if (sequenceCount !== void 0) {
    const formatted = formatNumberWithDefaultLocale(sequenceCount);
    const plural = sequenceCount === 1 ? "" : "s";
    buttonText = `Edit data use terms (${formatted} sequence${plural})`;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { className: "mr-4 underline text-primary-700 hover:text-primary-500", onClick: openDialog, children: buttonText }),
    /* @__PURE__ */ jsxs(BaseDialog, { title: "Edit data use terms", isOpen, onClose: closeDialog, children: [
      state.type === "loading" && "loading",
      state.type === "error" && `error: ${state.error}`,
      state.type === "loaded" && (accessToken === void 0 ? /* @__PURE__ */ jsx("p", { children: "You need to be logged in to edit data use terms." }) : /* @__PURE__ */ jsx(
        EditControl,
        {
          clientConfig,
          accessToken,
          state,
          closeDialog,
          sequenceFilter
        }
      ))
    ] })
  ] });
};
const EditControl = ({ clientConfig, accessToken, state, closeDialog, sequenceFilter }) => {
  const [dataUseTerms, setDataUseTerms] = useState(null);
  let affectedAccessions = [];
  if (dataUseTerms != null) {
    switch (dataUseTerms.type) {
      case openDataUseTermsOption:
        affectedAccessions = Array.from(state.restrictedAccessions.keys());
        break;
      case restrictedDataUseTermsOption:
        affectedAccessions = Array.from(state.restrictedAccessions.entries()).filter(([, date]) => date !== dataUseTerms.restrictedUntil).map(([accession]) => accession);
    }
  }
  switch (state.resultType) {
    case "allOpen":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ActiveFilters, { sequenceFilter }),
        /* @__PURE__ */ jsx("p", { children: "All selected sequences are already open, nothing to edit." })
      ] });
    case "mixed":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(ActiveFilters, { sequenceFilter }),
        /* @__PURE__ */ jsxs("p", { children: [
          state.openCount,
          " open and ",
          state.restrictedCount,
          " restricted sequences selected."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You can release all the ",
          state.restrictedCount,
          " restricted sequences, moving them to the",
          " ",
          /* @__PURE__ */ jsx("a", { href: routes.datauseTermsPage(), className: "text-primary-600", children: "Open Data Use Terms" }),
          ". If you want to pick a date for the restricted sequences, please narrow your selection down to just restricted sequences. You can use the filters to do so."
        ] }),
        /* @__PURE__ */ jsx(
          CancelSubmitButtons,
          {
            clientConfig,
            accessToken,
            newTerms: { type: openDataUseTermsOption },
            affectedAccessions,
            closeDialog
          }
        )
      ] });
    case "allRestricted": {
      const earliestDateDisplay = state.earliestRestrictedUntil.toFormat("yyyy-MM-dd");
      return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(ActiveFilters, { sequenceFilter }),
        /* @__PURE__ */ jsxs("h4", { className: "font-bold mb-2", children: [
          "Choose the new data use terms for ",
          state.restrictedCount,
          " restricted sequence",
          state.restrictedCount > 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row", children: /* @__PURE__ */ jsx(
          DataUseTermsSelector,
          {
            maxRestrictedUntil: state.earliestRestrictedUntil,
            setDataUseTerms,
            calendarDescription: /* @__PURE__ */ jsxs(Fragment, { children: [
              "The release date of a sequence cannot be updated to be later than the date that is currently set. This means that the new release date can only be between now and the earliest release date for any of the selected sequences, which is",
              " ",
              /* @__PURE__ */ jsx("b", { children: earliestDateDisplay }),
              "."
            ] })
          }
        ) }),
        /* @__PURE__ */ jsx(
          CancelSubmitButtons,
          {
            clientConfig,
            accessToken,
            newTerms: dataUseTerms,
            affectedAccessions,
            closeDialog
          }
        )
      ] });
    }
  }
};
const CancelSubmitButtons = ({
  clientConfig,
  accessToken,
  closeDialog,
  newTerms,
  affectedAccessions
}) => {
  const setDataUseTermsHook = backendClientHooks(clientConfig).useSetDataUseTerms(
    { headers: createAuthorizationHeader(accessToken) },
    { onError: errorToast, onSuccess: successToast }
  );
  const updatePossible = newTerms !== null && affectedAccessions.length !== 0;
  const maybeS = affectedAccessions.length > 1 ? "s" : "";
  let buttonText = "Update";
  if (newTerms) {
    switch (newTerms.type) {
      case restrictedDataUseTermsOption:
        if (affectedAccessions.length !== 0) {
          buttonText = `Update release date on ${affectedAccessions.length} sequence${maybeS}`;
        } else {
          buttonText = "Nothing to update";
        }
        break;
      case openDataUseTermsOption:
        buttonText = `Release ${affectedAccessions.length} sequence${maybeS} now`;
        break;
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 justify-end", children: [
    /* @__PURE__ */ jsx("button", { className: "btn", onClick: closeDialog, children: "Cancel" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "btn loculusColor text-white",
        disabled: !updatePossible,
        onClick: () => {
          closeDialog();
          if (newTerms === null) return;
          setDataUseTermsHook.mutate({
            accessions: affectedAccessions,
            newDataUseTerms: newTerms
          });
        },
        children: buttonText
      }
    )
  ] });
};

const buildSequenceCountText = (totalSequences, oldCount, initialCount) => {
  const sequenceCount = totalSequences ?? oldCount ?? initialCount;
  const formattedCount = formatNumberWithDefaultLocale(sequenceCount);
  const pluralSuffix = sequenceCount === 1 ? "" : "s";
  return `Search returned ${formattedCount} sequence${pluralSuffix}`;
};
const InnerSearchFullUI = ({
  accessToken,
  referenceGenomesSequenceNames,
  myGroups,
  organism,
  clientConfig,
  schema,
  hiddenFieldValues,
  initialData,
  initialCount,
  initialQueryDict,
  showEditDataUseTermsControls = false,
  dataUseTermsEnabled = true,
  sequenceFlaggingConfig,
  linkOuts
}) => {
  hiddenFieldValues ??= {};
  const metadataSchema = schema.metadata;
  const filterSchema = useMemo(() => new MetadataFilterSchema(metadataSchema), [metadataSchema]);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const columnFieldItems = useMemo(
    () => schema.metadata.filter((field) => !(field.hideInSearchResultsTable ?? false)).map((field) => ({
      name: field.name,
      displayName: field.displayName ?? field.name,
      header: field.header,
      alwaysSelected: field.name === schema.primaryKey,
      disabled: field.name === schema.primaryKey
    })),
    [schema.metadata, schema.primaryKey]
  );
  const [state, setState] = useQueryAsState(initialQueryDict);
  const [previewedSeqId, setPreviewedSeqId] = useUrlParamState(
    "selectedSeq",
    state,
    null,
    setState,
    "nullable-string",
    (value) => !value
  );
  const [previewHalfScreen, setPreviewHalfScreen] = useUrlParamState(
    "halfScreen",
    state,
    false,
    setState,
    "boolean",
    (value) => !value
  );
  const searchVisibilities = useMemo(() => {
    return getFieldVisibilitiesFromQuery(schema, state);
  }, [schema, state]);
  const columnVisibilities = useMemo(() => getColumnVisibilitiesFromQuery(schema, state), [schema, state]);
  const columnsToShow = useMemo(() => {
    return schema.metadata.filter((field) => columnVisibilities.get(field.name) === true).map((field) => field.name);
  }, [schema.metadata, columnVisibilities]);
  let orderByField = state.orderBy ?? schema.defaultOrderBy;
  if (!columnsToShow.includes(orderByField)) {
    orderByField = schema.primaryKey;
  }
  const orderDirection = state.order ?? schema.defaultOrder;
  const page = parseInt(state.page ?? "1", 10);
  const setPage = useCallback(
    (newPage) => {
      setState((prev) => {
        if (newPage === 1) {
          const withoutPageSet = { ...prev };
          delete withoutPageSet.page;
          return withoutPageSet;
        } else {
          return {
            ...prev,
            page: newPage.toString()
          };
        }
      });
    },
    [setState]
  );
  const setOrderByField = (field) => {
    setState((prev) => ({
      ...prev,
      orderBy: field,
      page: "1"
    }));
  };
  const setOrderDirection = (direction) => {
    setState((prev) => ({
      ...prev,
      order: direction,
      page: "1"
    }));
  };
  const fieldValues = useMemo(() => {
    return filterSchema.getFieldValuesFromQuery(state, hiddenFieldValues);
  }, [state, hiddenFieldValues, filterSchema]);
  const setSomeFieldValues = useCallback(
    (...fieldValuesToSet) => {
      setState((prev) => {
        const newState = { ...prev };
        fieldValuesToSet.forEach(([key, value]) => {
          if (value === "" || value === null) {
            if (Object.keys(hiddenFieldValues).includes(key)) {
              newState[key] = "";
            } else {
              delete newState[key];
            }
          } else if (Array.isArray(value)) {
            if (value.length === 0) {
              delete newState[key];
            } else {
              newState[key] = value.map((v) => v ?? NULL_QUERY_VALUE);
            }
          } else {
            newState[key] = value;
          }
        });
        return newState;
      });
      setPage(1);
    },
    [setState, setPage, hiddenFieldValues]
  );
  const removeFilter = (metadataFilterName) => {
    if (Object.keys(hiddenFieldValues).includes(metadataFilterName)) {
      const hiddenValue = hiddenFieldValues[metadataFilterName];
      const valueToSet = Array.isArray(hiddenValue) ? hiddenValue.filter((v) => v !== null) : hiddenValue;
      setSomeFieldValues([metadataFilterName, valueToSet]);
    } else {
      setSomeFieldValues([metadataFilterName, null]);
    }
  };
  const setASearchVisibility = (fieldName, visible) => {
    setState((prev) => {
      const newState = { ...prev };
      const key = `${VISIBILITY_PREFIX}${fieldName}`;
      const metadataField = schema.metadata.find((field) => {
        let name = field.name;
        if (field.rangeOverlapSearch) {
          name = field.rangeOverlapSearch.rangeName;
        }
        return name === fieldName;
      });
      const defaultVisible = metadataField?.initiallyVisible === true;
      if (visible === defaultVisible) {
        delete newState[key];
      } else {
        newState[key] = visible ? "true" : "false";
      }
      if (!visible) {
        delete newState[fieldName];
      }
      return newState;
    });
    if (!visible) {
      setPage(1);
    }
  };
  const setAColumnVisibility = (fieldName, visible) => {
    setState((prev) => {
      const newState = { ...prev };
      const key = `${COLUMN_VISIBILITY_PREFIX}${fieldName}`;
      const defaultVisible = schema.tableColumns.includes(fieldName);
      if (visible === defaultVisible) {
        delete newState[key];
      } else {
        newState[key] = visible ? "true" : "false";
      }
      return newState;
    });
  };
  useEffect(() => {
    if (showEditDataUseTermsControls && dataUseTermsEnabled) {
      setAColumnVisibility(DATA_USE_TERMS_FIELD, true);
    }
  }, []);
  const lapisUrl = getLapisUrl(clientConfig, organism);
  const downloadUrlGenerator = new DownloadUrlGenerator(
    organism,
    lapisUrl,
    dataUseTermsEnabled,
    schema.richFastaHeaderFields
  );
  const hooks = lapisClientHooks(lapisUrl).zodiosHooks;
  const aggregatedHook = hooks.useAggregated({}, {});
  const detailsHook = hooks.useDetails({}, {});
  const [selectedSeqs, setSelectedSeqs] = useState(/* @__PURE__ */ new Set());
  const sequencesSelected = selectedSeqs.size > 0;
  const clearSelectedSeqs = () => setSelectedSeqs(/* @__PURE__ */ new Set());
  const tableFilter = useMemo(
    () => new FieldFilterSet(filterSchema, fieldValues, hiddenFieldValues, referenceGenomesSequenceNames),
    [fieldValues, hiddenFieldValues, referenceGenomesSequenceNames, filterSchema]
  );
  const lapisSearchParameters = useMemo(() => tableFilter.toApiParams(), [tableFilter]);
  const downloadFilter = sequencesSelected ? new SequenceEntrySelection(selectedSeqs) : tableFilter;
  useEffect(() => {
    aggregatedHook.mutate({
      ...lapisSearchParameters,
      fields: []
    });
    const OrderByList = [
      {
        field: orderByField,
        type: orderDirection
      }
    ];
    detailsHook.mutate({
      ...lapisSearchParameters,
      fields: [...columnsToShow, schema.primaryKey],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: OrderByList
    });
  }, [lapisSearchParameters, schema.tableColumns, schema.primaryKey, pageSize, page, orderByField, orderDirection]);
  const totalSequences = aggregatedHook.data?.data[0].count ?? void 0;
  const linkOutSequenceCount = downloadFilter.sequenceCount() ?? totalSequences;
  const [oldData, setOldData] = useState(null);
  const [oldCount, setOldCount] = useState(null);
  const [firstClientSideLoadOfDataCompleted, setFirstClientSideLoadOfDataCompleted] = useState(false);
  const [firstClientSideLoadOfCountCompleted, setFirstClientSideLoadOfCountCompleted] = useState(false);
  useEffect(() => {
    if (detailsHook.data?.data && oldData !== detailsHook.data.data) {
      setOldData(detailsHook.data.data);
      setFirstClientSideLoadOfDataCompleted(true);
    }
  }, [detailsHook.data?.data, oldData]);
  useEffect(() => {
    if (aggregatedHook.data?.data && oldCount !== aggregatedHook.data.data[0].count) {
      setOldCount(aggregatedHook.data.data[0].count);
      setFirstClientSideLoadOfCountCompleted(true);
    }
  }, [aggregatedHook.data?.data, oldCount]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-4", children: [
    /* @__PURE__ */ jsx(
      FieldSelectorModal$1,
      {
        title: "Customize columns",
        isOpen: isColumnModalOpen,
        onClose: () => setIsColumnModalOpen(!isColumnModalOpen),
        fields: columnFieldItems,
        selectedFields: new Set(
          Array.from(columnVisibilities.entries()).filter(([_, visible]) => visible).map(([field]) => field)
        ),
        setFieldSelected: setAColumnVisibility
      }
    ),
    /* @__PURE__ */ jsx(
      SeqPreviewModal,
      {
        seqId: previewedSeqId ?? "",
        accessToken,
        isOpen: Boolean(previewedSeqId),
        onClose: () => setPreviewedSeqId(null),
        referenceGenomeSequenceNames: referenceGenomesSequenceNames,
        myGroups,
        isHalfScreen: previewHalfScreen,
        setIsHalfScreen: setPreviewHalfScreen,
        setPreviewedSeqId: (seqId) => setPreviewedSeqId(seqId),
        sequenceFlaggingConfig
      },
      previewedSeqId ?? "seq-modal"
    ),
    /* @__PURE__ */ jsx("div", { className: "md:w-[18rem]", children: /* @__PURE__ */ jsx(
      SearchForm,
      {
        organism,
        clientConfig,
        referenceGenomesSequenceNames,
        fieldValues,
        setSomeFieldValues,
        filterSchema,
        lapisUrl,
        searchVisibilities,
        setASearchVisibility,
        lapisSearchParameters,
        showMutationSearch: schema.submissionDataTypes.consensusSequences
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `md:w-[calc(100%-18.1rem)]`,
        style: { paddingBottom: Boolean(previewedSeqId) && previewHalfScreen ? "50vh" : "0" },
        children: [
          /* @__PURE__ */ jsx(RecentSequencesBanner, { organism }),
          (detailsHook.isError || aggregatedHook.isError) && // @ts-expect-error because response is not expected on error, but does exist
          (aggregatedHook.error?.response?.status === 503 ? /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg text-lg text-gray-700 text-italic", children: [
            " ",
            "The retrieval database is currently initializing – please check back later."
          ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-red-400 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { children: "There was an error loading the data" }),
            /* @__PURE__ */ jsxs("details", { children: [
              /* @__PURE__ */ jsx("summary", { className: "text-xs cursor-pointer py-2", children: "More details" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", children: JSON.stringify(detailsHook.error) }),
              /* @__PURE__ */ jsx("p", { children: detailsHook.error?.message }),
              /* @__PURE__ */ jsx("p", { children: aggregatedHook.error?.message })
            ] })
          ] })),
          (detailsHook.isPaused || aggregatedHook.isPaused) && (!detailsHook.isSuccess || !aggregatedHook.isSuccess) && /* @__PURE__ */ jsxs(ErrorBox, { title: "Connection problem", children: [
            "The browser thinks you are offline. This will affect site usage, and many features may not work. If you are actually online, please try using a different browser. If the problem persists, feel free to create an issue in",
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://github.com/pathoplexus/pathoplexus/issues", children: "our Github repo" }),
            " or email us at ",
            /* @__PURE__ */ jsx("a", { href: "mailto:bug@pathoplexus.org", children: "bug@pathoplexus.org" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `
                        ${!(firstClientSideLoadOfCountCompleted && firstClientSideLoadOfDataCompleted) ? "cursor-wait pointer-events-none" : detailsHook.isLoading || aggregatedHook.isLoading ? "opacity-50 pointer-events-none" : ""}
                        `,
              children: [
                !tableFilter.isEmpty() && /* @__PURE__ */ jsx("div", { className: "pt-3 pb-2", children: /* @__PURE__ */ jsx(ActiveFilters, { sequenceFilter: tableFilter, removeFilter }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-800 mb-6 justify-between flex flex-col sm:flex-row items-baseline gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
                    buildSequenceCountText(totalSequences, oldCount, initialCount),
                    detailsHook.isLoading || aggregatedHook.isLoading || !firstClientSideLoadOfCountCompleted || !firstClientSideLoadOfDataCompleted ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs ml-3 appearSlowly" }) : null
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                    showEditDataUseTermsControls && dataUseTermsEnabled && /* @__PURE__ */ jsx(
                      EditDataUseTermsModal,
                      {
                        lapisUrl,
                        clientConfig,
                        accessToken,
                        sequenceFilter: downloadFilter
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "mr-4 underline text-primary-700 hover:text-primary-500",
                        onClick: () => setIsColumnModalOpen(true),
                        children: "Customize columns"
                      }
                    ),
                    sequencesSelected ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "mr-4 underline text-primary-700 hover:text-primary-500",
                        onClick: clearSelectedSeqs,
                        children: "Clear selection"
                      }
                    ) : null,
                    /* @__PURE__ */ jsx(
                      DownloadDialog,
                      {
                        downloadUrlGenerator,
                        sequenceFilter: downloadFilter,
                        referenceGenomesSequenceNames,
                        allowSubmissionOfConsensusSequences: schema.submissionDataTypes.consensusSequences,
                        dataUseTermsEnabled,
                        metadata: schema.metadata,
                        richFastaHeaderFields: schema.richFastaHeaderFields
                      }
                    ),
                    linkOuts !== void 0 && linkOuts.length > 0 && /* @__PURE__ */ jsx(
                      LinkOutMenu,
                      {
                        downloadUrlGenerator,
                        sequenceFilter: downloadFilter,
                        sequenceCount: linkOutSequenceCount,
                        linkOuts,
                        dataUseTermsEnabled
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Table,
                  {
                    schema,
                    data: detailsHook.data?.data !== void 0 ? detailsHook.data.data : oldData ?? initialData,
                    selectedSeqs,
                    setSelectedSeqs,
                    setPreviewedSeqId: (seqId) => setPreviewedSeqId(seqId),
                    previewedSeqId,
                    orderBy: {
                      field: orderByField,
                      type: orderDirection
                    },
                    setOrderByField,
                    setOrderDirection,
                    columnsToShow
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: totalSequences !== void 0 && /* @__PURE__ */ jsx(
                  SearchPagination,
                  {
                    count: Math.ceil(totalSequences / pageSize),
                    page,
                    setPage
                  }
                ) })
              ]
            }
          )
        ]
      }
    )
  ] });
};
const SearchFullUI = (props) => {
  const queryClient = new QueryClient();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(InnerSearchFullUI, { ...props }) });
};

function parseUrlSearchParams(searchParams) {
  const result = {};
  const allParams = [...searchParams.entries()];
  const paramGroups = {};
  for (const [key, value] of allParams) {
    if (!(key in paramGroups)) {
      paramGroups[key] = [];
    }
    paramGroups[key].push(value);
  }
  for (const [key, values] of Object.entries(paramGroups)) {
    if (values.length === 1) {
      result[key] = values[0];
    } else {
      result[key] = values;
    }
  }
  return result;
}

const performLapisSearchQueries = async (state, schema, referenceGenomesSequenceNames, hiddenFieldValues, organism) => {
  const filterSchema = new MetadataFilterSchema(schema.metadata);
  const fieldValues = filterSchema.getFieldValuesFromQuery(state, hiddenFieldValues);
  const fieldFilter = new FieldFilterSet(filterSchema, fieldValues, hiddenFieldValues, referenceGenomesSequenceNames);
  const lapisSearchParameters = fieldFilter.toApiParams();
  const orderByField = ORDER_KEY in state ? validateSingleValue(state[ORDER_KEY], ORDER_KEY) : schema.defaultOrderBy;
  const orderDirection = ORDER_DIRECTION_KEY in state ? validateSingleValue(state[ORDER_DIRECTION_KEY], ORDER_DIRECTION_KEY) : schema.defaultOrder;
  const pageParam = PAGE_KEY in state ? validateSingleValue(state[PAGE_KEY], PAGE_KEY) : "";
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const columnVisibilities = getColumnVisibilitiesFromQuery(schema, state);
  const columnsToShow = schema.metadata.filter((field) => columnVisibilities.get(field.name) === true).map((field) => field.name);
  const client = LapisClient.createForOrganism(organism);
  const [detailsResult, aggregatedResult] = await Promise.all([
    // @ts-expect-error because OrderBy typing does not accept this for unknown reasons
    client.call("details", {
      ...lapisSearchParameters,
      fields: [...columnsToShow, schema.primaryKey],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        {
          field: orderByField,
          type: orderDirection === "ascending" ? "ascending" : "descending"
        }
      ]
    }),
    client.call("aggregated", {
      ...lapisSearchParameters,
      fields: []
    })
  ]);
  return {
    data: detailsResult.unwrapOr({ data: [] }).data,
    totalCount: aggregatedResult.unwrapOr({ data: [{ count: 0 }] }).data[0].count
  };
};

export { SearchFullUI as S, performLapisSearchQueries as a, parseUrlSearchParams as p };
