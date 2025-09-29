import fs from 'fs';
import path from 'path';
import z, { z as z$1 } from 'zod';
import { DateTime, FixedOffsetZone } from 'luxon';

const pageSize = 100;
const ACCESSION_VERSION_FIELD = "accessionVersion";
const ACCESSION_FIELD = "accession";
const VERSION_FIELD = "version";
const VERSION_STATUS_FIELD = "versionStatus";
const IS_REVOCATION_FIELD = "isRevocation";
const SUBMITTED_AT_FIELD = "submittedAtTimestamp";
const RELEASED_AT_FIELD = "releasedAtTimestamp";
const SUBMITTER_FIELD = "submitter";
const GROUP_NAME_FIELD = "groupName";
const GROUP_ID_FIELD = "groupId";
const DATA_USE_TERMS_FIELD = "dataUseTerms";
const DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD = "dataUseTermsRestrictedUntil";
const VERSION_COMMENT_FIELD = "versionComment";
const SUBMISSION_ID_INPUT_FIELD = "id";
const metadataDefaultDownloadDataFormat = "tsv";
const sequenceDefaultDownloadDataFormat = "fasta";
const DEFAULT_LOCALE = "en-US";

const receivedStatus = "RECEIVED";
const inProcessingStatus = "IN_PROCESSING";
const processedStatus = "PROCESSED";
const approvedForReleaseStatus = "APPROVED_FOR_RELEASE";
const noIssuesProcessingResult = "NO_ISSUES";
const warningsProcessingResult = "HAS_WARNINGS";
const errorsProcessingResult = "HAS_ERRORS";
const sequenceEntryStatusNames = z.union([
  z.literal(receivedStatus),
  z.literal(inProcessingStatus),
  z.literal(processedStatus),
  z.literal(approvedForReleaseStatus)
]);
const sequenceEntryProcessingResultNames = z.union([
  z.literal(noIssuesProcessingResult),
  z.literal(warningsProcessingResult),
  z.literal(errorsProcessingResult)
]);
const processingAnnotationSourceType = z.union([z.literal("Metadata"), z.literal("NucleotideSequence")]);
const processingAnnotation = z.object({
  unprocessedFields: z.array(
    z.object({
      name: z.string(),
      type: processingAnnotationSourceType
    })
  ),
  processedFields: z.array(
    z.object({
      name: z.string(),
      type: processingAnnotationSourceType
    })
  ),
  message: z.string()
});
const unprocessedMetadataRecord = z.record(z.string());
const metadataField = z.union([z.string(), z.number(), z.date(), z.null(), z.boolean()]);
const metadataRecord = z.record(metadataField);
const accession = z.string();
z.object({
  accessions: z.array(accession)
});
const accessionVersion = z.object({
  accession,
  version: z.number()
});
const accessionVersionsFilter = z.object({
  accessionVersionsFilter: z.array(accessionVersion).optional()
});
const approveAllDataScope = z.literal("ALL");
const approveProcessedDataWithoutWarningsScope = z.literal("WITHOUT_WARNINGS");
const accessionVersionsFilterWithApprovalScope = accessionVersionsFilter.merge(
  z.object({
    groupIdsFilter: z.array(z.number()),
    scope: z.union([approveAllDataScope, approveProcessedDataWithoutWarningsScope])
  })
);
const deleteAllDataScope = z.literal("ALL");
const deleteProcessedAndRevocationConfirmationDataScope = z.literal("ALL_PROCESSED_AND_REVOCATIONS");
const deleteProcessedDataWithErrorsScope = z.literal("PROCESSED_WITH_ERRORS");
const deleteProcessedDataWithWarningsScope = z.literal("PROCESSED_WITH_WARNINGS");
const accessionVersionsFilterWithDeletionScope = accessionVersionsFilter.merge(
  z.object({
    groupIdsFilter: z.array(z.number()),
    scope: z.union([
      deleteAllDataScope,
      deleteProcessedAndRevocationConfirmationDataScope,
      deleteProcessedDataWithErrorsScope,
      deleteProcessedDataWithWarningsScope
    ])
  })
);
const openDataUseTermsOption = "OPEN";
const restrictedDataUseTermsOption = "RESTRICTED";
const dataUseTermsOptions = [restrictedDataUseTermsOption, openDataUseTermsOption];
const restrictedDataUseTerms = z.object({
  type: z.literal(restrictedDataUseTermsOption),
  restrictedUntil: z.string()
});
const dataUseTerms = z.union([
  restrictedDataUseTerms,
  z.object({
    type: z.literal(openDataUseTermsOption)
  })
]);
const dataUseTermsHistoryEntry = z.object({
  accession,
  changeDate: z.string(),
  dataUseTerms,
  userName: z.string()
});
const sequenceEntryStatus = accessionVersion.merge(
  z.object({
    status: sequenceEntryStatusNames,
    processingResult: sequenceEntryProcessingResultNames.nullable(),
    submissionId: z.string(),
    isRevocation: z.boolean(),
    dataUseTerms,
    groupId: z.number(),
    submitter: z.string()
  })
);
const statusCounts = z.record(z.number()).refine(
  (entry) => {
    return Object.keys(entry).every((key) => sequenceEntryStatusNames.safeParse(key).success);
  },
  { message: "Invalid status name in statusCounts" }
);
const processingResultCounts = z.record(z.number()).refine(
  (entry) => {
    return Object.keys(entry).every((key) => sequenceEntryProcessingResultNames.safeParse(key).success);
  },
  { message: "Invalid status name in processingResultCounts" }
);
const getSequencesResponse = z.object({
  sequenceEntries: z.array(sequenceEntryStatus),
  statusCounts,
  processingResultCounts
});
const submissionIdMapping = accessionVersion.merge(
  z.object({
    submissionId: z.string()
  })
);
const editedSequenceEntryData = accessionVersion.merge(
  z.object({
    data: z.object({
      metadata: unprocessedMetadataRecord,
      unalignedNucleotideSequences: z.record(z.string())
    })
  })
);
const revocationRequest = z.object({
  accessions: z.array(accession),
  versionComment: z.string().nullable()
});
const unprocessedData = accessionVersion.merge(
  z.object({
    data: z.object({
      metadata: unprocessedMetadataRecord,
      unalignedNucleotideSequences: z.record(z.string())
    }),
    submissionId: z.string(),
    submitter: z.string(),
    groupId: z.number(),
    submittedAt: z.number()
  })
);
const filesByCategory = z.record(
  z.array(
    z.object({
      fileId: z.string(),
      name: z.string()
    })
  )
);
const filesBySubmissionId = z.record(filesByCategory);
const sequenceEntryToEdit = accessionVersion.merge(
  z.object({
    status: sequenceEntryStatusNames,
    groupId: z.number(),
    submissionId: z.string(),
    errors: z.array(processingAnnotation).nullable(),
    warnings: z.array(processingAnnotation).nullable(),
    originalData: z.object({
      metadata: unprocessedMetadataRecord,
      unalignedNucleotideSequences: z.record(z.string()),
      files: filesByCategory.nullable()
    }),
    processedData: z.object({
      metadata: metadataRecord,
      unalignedNucleotideSequences: z.record(z.string().nullable()),
      alignedNucleotideSequences: z.record(z.string().nullable()),
      nucleotideInsertions: z.record(z.array(z.string())),
      alignedAminoAcidSequences: z.record(z.string().nullable()),
      aminoAcidInsertions: z.record(z.array(z.string())),
      files: filesByCategory.nullable()
    })
  })
);
const mapErrorsAndWarnings = (editedData, key, type) => ({
  errors: (editedData.errors ?? []).filter(
    (error) => error.processedFields.find((field) => field.name === key && field.type === type) !== void 0
  ).map((error) => error.message),
  warnings: (editedData.warnings ?? []).filter(
    (warning) => warning.processedFields.find((field) => field.name === key && field.type === type) !== void 0
  ).map((warning) => warning.message)
});
const uploadFiles = z.object({
  metadataFile: z.instanceof(File),
  sequenceFile: z.instanceof(File).optional(),
  fileMapping: filesBySubmissionId.optional()
});
const submitFiles = uploadFiles.merge(
  z.object({
    groupId: z.number(),
    dataUseTermsType: z.enum(dataUseTermsOptions),
    restrictedUntil: z.string().nullable()
  })
);
const problemDetail = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string().optional()
});
const address = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string()
});
const newGroup = z.object({
  groupName: z.string(),
  institution: z.string(),
  address,
  contactEmail: z.string()
});
const group = newGroup.extend({
  groupId: z.number()
});
const groupDetails = z.object({
  group,
  users: z.array(
    z.object({
      name: z.string()
    })
  )
});
z.object({
  pageOneIndexed: z.number(),
  size: z.number()
});
const info = z.object({
  name: z.string(),
  status: z.string(),
  documentation: z.string(),
  isInDebugMode: z.boolean()
});
const requestUploadResponse = z.array(
  z.object({
    fileId: z.string().uuid(),
    url: z.string()
  })
);
const pipelineVersionStatistics = z.record(z.record(z.number()));

function parseUnixTimestamp(value) {
  return DateTime.fromSeconds(value, { zone: FixedOffsetZone.utcInstance }).toFormat("yyyy-MM-dd TTT");
}

const orderDirection = z.enum(["ascending", "descending"]);
const orderBy = z.object({
  field: z.string(),
  type: orderDirection
});
const lapisBaseRequest = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  fields: z.array(z.string()).optional(),
  orderBy: z.array(orderBy).optional()
}).catchall(z.union([z.string(), z.number(), z.null(), z.array(z.string().nullable())]));
const mutationsRequest = lapisBaseRequest.extend({ minProportion: z.number().optional() });
const sequenceRequest = lapisBaseRequest.extend({ dataFormat: z.enum(["FASTA", "NDJSON", "JSON"]) });
const mutationProportionCount = z.object({
  mutation: z.string(),
  proportion: z.number(),
  count: z.number(),
  sequenceName: z.string().nullable(),
  mutationFrom: z.string(),
  mutationTo: z.string(),
  position: z.number()
});
const mutationsResponse = makeLapisResponse(z.array(mutationProportionCount));
const insertionCount = z.object({
  insertion: z.string(),
  count: z.number()
});
const insertionsResponse = makeLapisResponse(z.array(insertionCount));
const metadatum = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const details = z.record(metadatum);
const detailsResponse = makeLapisResponse(z.array(details));
const aggregatedItem = z.object({ count: z.number() }).catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));
const aggregatedResponse = makeLapisResponse(z.array(aggregatedItem));
const lineageDefinitionEntry = z.object({
  parents: z.array(z.string()).optional(),
  aliases: z.array(z.string()).optional()
});
const lineageDefinition = z.record(z.string(), lineageDefinitionEntry);
function makeLapisResponse(data) {
  return z.object({
    data,
    info: z.object({
      dataVersion: z.string()
    })
  });
}
const versionStatuses = {
  revoked: "REVOKED",
  revised: "REVISED",
  latestVersion: "LATEST_VERSION"
};
const versionStatusSchema = z.enum([
  versionStatuses.revoked,
  versionStatuses.revised,
  versionStatuses.latestVersion
]);
const rawSequenceEntryHistoryEntry = accessionVersion.merge(
  z.object({
    accessionVersion: z.string(),
    versionStatus: versionStatusSchema,
    isRevocation: z.boolean(),
    submittedAtTimestamp: z.number()
  })
);
const sequenceEntryHistoryEntry = rawSequenceEntryHistoryEntry.transform((raw) => ({
  ...raw,
  submittedAtTimestamp: parseUnixTimestamp(raw.submittedAtTimestamp)
}));
const parsedSequenceEntryHistoryEntrySchema = rawSequenceEntryHistoryEntry.merge(
  z.object({
    submittedAtTimestamp: z.string()
  })
);
const sequenceEntryHistory = z.array(sequenceEntryHistoryEntry);
function getLatestAccessionVersion(sequenceEntryHistory2) {
  if (sequenceEntryHistory2.length === 0) {
    return void 0;
  }
  const clonedSequenceEntryHistory = [...sequenceEntryHistory2];
  return clonedSequenceEntryHistory.sort((a, b) => b.version - a.version)[0];
}
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["TSV"] = "tsv";
  FileType2["FASTA"] = "fa";
  return FileType2;
})(FileType || {});

const namedSequence = z.object({
  name: z.string(),
  sequence: z.string(),
  insdcAccessionFull: z.optional(z.string())
});
const referenceGenome = z.object({
  nucleotideSequences: z.array(namedSequence),
  genes: z.array(namedSequence)
});
const suborganism = z.string();
const referenceGenomes = z.record(suborganism, referenceGenome).refine((value) => Object.entries(value).length > 0, "The reference genomes must not be empty.");

const metadataPossibleTypes = z.enum([
  "string",
  "date",
  "int",
  "float",
  "timestamp",
  "boolean",
  "authors"
]);
const segmentedMutations = z.object({
  segment: z.string(),
  mutations: z.array(mutationProportionCount)
});
const linkMenuItem = z.object({
  name: z.string(),
  url: z.string()
});
const customDisplay = z.object({
  type: z.string(),
  url: z.string().optional(),
  html: z.string().optional(),
  value: z.array(segmentedMutations).optional(),
  displayGroup: z.string().optional(),
  linkMenuItems: z.array(linkMenuItem).optional()
});
const rangeOverlapSearch = z.object({
  /**
   * specify rangeName in both (upper and lower) fields to link them later.
   */
  rangeName: z.string(),
  rangeDisplayName: z.string(),
  // just needed in the 'lower' field technically
  bound: z.enum(["lower", "upper"])
});
const metadata = z.object({
  name: z.string(),
  displayName: z.string().optional(),
  type: metadataPossibleTypes,
  autocomplete: z.boolean().optional(),
  notSearchable: z.boolean().optional(),
  hideInSearchResultsTable: z.boolean().optional(),
  customDisplay: customDisplay.optional(),
  initiallyVisible: z.boolean().optional(),
  hideOnSequenceDetailsPage: z.boolean().optional(),
  header: z.string().optional(),
  rangeSearch: z.boolean().optional(),
  rangeOverlapSearch: rangeOverlapSearch.optional(),
  substringSearch: z.boolean().optional(),
  lineageSearch: z.boolean().optional(),
  columnWidth: z.number().optional(),
  order: z.number().optional(),
  orderOnDetailsPage: z.number().optional(),
  includeInDownloadsByDefault: z.boolean().optional()
});
const inputFieldOption = z.object({
  name: z.string()
});
const inputField = z.object({
  name: z.string(),
  displayName: z.string().optional(),
  noEdit: z.boolean().optional(),
  required: z.boolean().optional(),
  definition: z.string().optional(),
  // Definition, Example and Guidance for submitters
  example: z.union([z.string(), z.number()]).optional(),
  guidance: z.string().optional(),
  desired: z.boolean().optional(),
  options: z.array(inputFieldOption).optional()
});
const linkOut = z.object({
  name: z.string(),
  url: z.string(),
  maxNumberOfRecommendedEntries: z.number().int().positive().optional()
});
const fileCategory = z.object({
  name: z.string()
});
const submissionFiles = z.object({
  enabled: z.boolean(),
  categories: z.array(fileCategory).optional()
});
const submissionDataTypesSchema = z.object({
  consensusSequences: z.boolean(),
  files: submissionFiles.optional()
});
const schema = z.object({
  organismName: z.string(),
  image: z.string().optional(),
  files: z.array(fileCategory).optional(),
  metadata: z.array(metadata),
  metadataTemplate: z.array(z.string()).optional(),
  inputFields: z.array(inputField),
  tableColumns: z.array(z.string()),
  primaryKey: z.string(),
  defaultOrderBy: z.string(),
  defaultOrder: orderDirection,
  submissionDataTypes: submissionDataTypesSchema,
  loadSequencesAutomatically: z.boolean().optional(),
  richFastaHeaderFields: z.array(z.string()).optional(),
  linkOuts: z.array(linkOut).optional()
});
const instanceConfig = z.object({
  schema,
  referenceGenomes
});
const logoConfig = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number()
});
const githubSequenceFlaggingConfig = z.object({
  organization: z.string(),
  repository: z.string(),
  issueTemplate: z.string().optional()
});
const sequenceFlaggingConfig = z.object({
  github: githubSequenceFlaggingConfig
});
const fieldToDisplay = z.object({
  field: z.string(),
  displayName: z.string()
});
const websiteConfig = z.object({
  accessionPrefix: z.string(),
  organisms: z.record(instanceConfig),
  name: z.string(),
  logo: logoConfig,
  bannerMessage: z.string().optional(),
  bannerMessageURL: z.string().optional(),
  welcomeMessageHTML: z.string().optional().nullable(),
  additionalHeadHTML: z.string().optional(),
  gitHubEditLink: z.string().optional(),
  gitHubMainUrl: z.string().optional(),
  enableSeqSets: z.boolean(),
  seqSetsFieldsToDisplay: z.array(fieldToDisplay).optional(),
  enableLoginNavigationItem: z.boolean(),
  enableSubmissionNavigationItem: z.boolean(),
  enableSubmissionPages: z.boolean(),
  enableDataUseTerms: z.boolean(),
  sequenceFlagging: sequenceFlaggingConfig.optional()
});

z$1.string().min(1);
const serviceUrls = z$1.object({
  backendUrl: z$1.string(),
  lapisUrls: z$1.record(z$1.string(), z$1.string())
});
const serverConfig = serviceUrls.merge(
  z$1.object({
    keycloakUrl: z$1.string()
  })
);
const runtimeConfig = z$1.object({
  public: serviceUrls,
  serverSide: serverConfig,
  backendKeycloakClientSecret: z$1.string().min(5),
  insecureCookies: z$1.boolean()
});

let _config = null;
let _runtimeConfig = null;
function getConfigDir() {
  const configDir = "./tests/config";
  return configDir;
}
function validateWebsiteConfig(config) {
  const errors = [];
  Array.from(Object.entries(config.organisms).values()).forEach(([organism, schema]) => {
    if (schema.schema.metadataTemplate !== void 0) {
      schema.schema.metadataTemplate.forEach((fieldName) => {
        if (schema.schema.inputFields.find((inputField) => inputField.name === fieldName) === void 0) {
          errors.push(
            Error(
              `Error in ${organism}.schema.metadataTemplate: ${fieldName} is not defined in the inputFields.`
            )
          );
        }
      });
    }
  });
  return errors;
}
function getWebsiteConfig() {
  if (_config === null) {
    const config = readTypedConfigFile("website_config.json", websiteConfig);
    const validationErrors = validateWebsiteConfig(config);
    if (validationErrors.length > 0) {
      throw new AggregateError(validationErrors, "There were validation errors in the website_config.json");
    }
    _config = config;
  }
  return _config;
}
function getGitHubReportUrl(sequenceFlaggingConfig, organism, accessionVersion) {
  if (sequenceFlaggingConfig === void 0) return void 0;
  const ghConf = sequenceFlaggingConfig.github;
  const url = new URL(`/${ghConf.organization}/${ghConf.repository}/issues/new`, "https://github.com");
  if (ghConf.issueTemplate) {
    url.searchParams.append("template", ghConf.issueTemplate);
  }
  url.searchParams.append("title", `[${organism} - ${accessionVersion}]`);
  return url.toString();
}
function safeGetWebsiteConfig() {
  try {
    return getWebsiteConfig();
  } catch (_) {
    return null;
  }
}
function getMetadataDisplayNames(organism) {
  return new Map(
    getWebsiteConfig().organisms[organism].schema.metadata.map(({ name, displayName }) => [
      name,
      displayName ?? name
    ])
  );
}
function getConfiguredOrganisms() {
  return Object.entries(getWebsiteConfig().organisms).map(([key, instance]) => ({
    key,
    displayName: instance.schema.organismName,
    image: instance.schema.image
  }));
}
function getConfig(organism) {
  const websiteConfig2 = getWebsiteConfig();
  if (!(organism in websiteConfig2.organisms)) {
    throw new Error(`No configuration for organism ${organism}`);
  }
  return websiteConfig2.organisms[organism];
}
function outputFilesEnabled(organism) {
  return (getConfig(organism).schema.files ?? []).length > 0;
}
function getSchema(organism) {
  return getConfig(organism).schema;
}
function getMetadataTemplateFields(organism, action) {
  const schema = getConfig(organism).schema;
  const baseFields = schema.metadataTemplate ?? schema.inputFields.map((field) => field.name);
  const extraFields = action === "submit" ? [SUBMISSION_ID_INPUT_FIELD] : [ACCESSION_FIELD, SUBMISSION_ID_INPUT_FIELD];
  const allFields = [...extraFields, ...baseFields];
  const fieldsToDisplaynames = new Map(
    allFields.map((field) => [field, schema.metadata.find((metadata) => metadata.name === field)?.displayName])
  );
  return fieldsToDisplaynames;
}
function getAccessionInputField() {
  const accessionPrefix = getWebsiteConfig().accessionPrefix;
  const instanceName = getWebsiteConfig().name;
  return {
    name: ACCESSION_FIELD,
    displayName: "Accession",
    definition: `The ${instanceName} accession (without version) of the sequence you would like to revise.`,
    example: `${accessionPrefix}000P97Y`,
    noEdit: true,
    required: true
  };
}
function getSubmissionIdInputField() {
  return {
    name: SUBMISSION_ID_INPUT_FIELD,
    displayName: "ID",
    definition: "FASTA ID",
    guidance: "Your sequence identifier; should match the FASTA file header - this is used to link the metadata to the FASTA sequence",
    example: "GJP123",
    noEdit: true,
    required: true
  };
}
function getGroupedInputFields(organism, action, excludeDuplicates = false) {
  const inputFields = getConfig(organism).schema.inputFields;
  const metadata = getConfig(organism).schema.metadata;
  const groups = /* @__PURE__ */ new Map();
  const requiredFields = inputFields.filter((meta) => meta.required);
  const desiredFields = inputFields.filter((meta) => meta.desired);
  const coreFields = action === "submit" ? [getSubmissionIdInputField()] : [getSubmissionIdInputField(), getAccessionInputField()];
  groups.set("Required fields", [...coreFields, ...requiredFields]);
  groups.set("Desired fields", desiredFields);
  if (!excludeDuplicates) groups.set("Submission details", [getSubmissionIdInputField()]);
  const fieldAlreadyAdded = (fieldName) => Array.from(groups.values()).flatMap((fields) => fields.map((f) => f.name)).some((name) => name === fieldName);
  inputFields.forEach((field) => {
    const metadataEntry = metadata.find((meta) => meta.name === field.name);
    const header = metadataEntry?.header ?? "Uncategorized";
    if (!groups.has(header)) {
      groups.set(header, []);
    }
    if (excludeDuplicates && fieldAlreadyAdded(field.name)) {
      return;
    }
    groups.get(header).push({ ...field });
  });
  return groups;
}
function getRuntimeConfig() {
  _runtimeConfig ??= readTypedConfigFile("runtime_config.json", runtimeConfig);
  return _runtimeConfig;
}
function getLapisUrl(serviceConfig, organism) {
  if (!(organism in serviceConfig.lapisUrls)) {
    throw new Error(`No lapis url configured for organism ${organism}`);
  }
  return serviceConfig.lapisUrls[organism];
}
function getReferenceGenome(organism) {
  return Object.values(getConfig(organism).referenceGenomes)[0];
}
const getAccession = (n) => {
  return {
    name: n.name,
    insdcAccessionFull: n.insdcAccessionFull
  };
};
const getReferenceGenomesSequenceNames = (organism) => {
  const referenceGenomes = getReferenceGenome(organism);
  return {
    nucleotideSequences: referenceGenomes.nucleotideSequences.map((n) => n.name),
    genes: referenceGenomes.genes.map((n) => n.name),
    insdcAccessionFull: referenceGenomes.nucleotideSequences.map((n) => getAccession(n))
  };
};
function seqSetsAreEnabled() {
  return getWebsiteConfig().enableSeqSets;
}
function dataUseTermsAreEnabled() {
  return getWebsiteConfig().enableDataUseTerms;
}
function readTypedConfigFile(fileName, schema) {
  const configFilePath = path.join(getConfigDir(), fileName);
  const json = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  try {
    return schema.parse(json);
  } catch (e) {
    const zodError = e;
    throw new Error(`Type error reading ${configFilePath}: ${zodError.message}`);
  }
}

export { revocationRequest as $, ACCESSION_FIELD as A, mutationsResponse as B, mutationsRequest as C, insertionsResponse as D, sequenceRequest as E, FileType as F, GROUP_ID_FIELD as G, lineageDefinition as H, IS_REVOCATION_FIELD as I, getReferenceGenome as J, parseUnixTimestamp as K, metadataPossibleTypes as L, customDisplay as M, VERSION_COMMENT_FIELD as N, SUBMITTER_FIELD as O, GROUP_NAME_FIELD as P, DATA_USE_TERMS_FIELD as Q, RELEASED_AT_FIELD as R, SUBMITTED_AT_FIELD as S, getReferenceGenomesSequenceNames as T, restrictedDataUseTermsOption as U, VERSION_STATUS_FIELD as V, getGitHubReportUrl as W, getLatestAccessionVersion as X, submitFiles as Y, submissionIdMapping as Z, uploadFiles as _, getRuntimeConfig as a, editedSequenceEntryData as a0, accessionVersionsFilterWithApprovalScope as a1, accessionVersionsFilterWithDeletionScope as a2, unprocessedData as a3, dataUseTerms as a4, openDataUseTermsOption as a5, seqSetsAreEnabled as a6, SUBMISSION_ID_INPUT_FIELD as a7, metadataDefaultDownloadDataFormat as a8, sequenceDefaultDownloadDataFormat as a9, serviceUrls as aa, schema as ab, parsedSequenceEntryHistoryEntrySchema as ac, DATA_USE_TERMS_RESTRICTED_UNTIL_FIELD as ad, pageSize as ae, DEFAULT_LOCALE as af, approvedForReleaseStatus as ag, mapErrorsAndWarnings as ah, getMetadataTemplateFields as ai, processedStatus as aj, errorsProcessingResult as ak, warningsProcessingResult as al, receivedStatus as am, inProcessingStatus as an, noIssuesProcessingResult as ao, deleteAllDataScope as ap, approveAllDataScope as aq, deleteProcessedDataWithErrorsScope as ar, outputFilesEnabled as as, getMetadataDisplayNames as at, getWebsiteConfig as b, sequenceEntryToEdit as c, dataUseTermsHistoryEntry as d, getSequencesResponse as e, dataUseTermsAreEnabled as f, getConfiguredOrganisms as g, getGroupedInputFields as h, info as i, getSchema as j, group as k, groupDetails as l, problemDetail as m, newGroup as n, getLapisUrl as o, pipelineVersionStatistics as p, VERSION_FIELD as q, requestUploadResponse as r, safeGetWebsiteConfig as s, accessionVersion as t, ACCESSION_VERSION_FIELD as u, versionStatuses as v, sequenceEntryHistory as w, detailsResponse as x, lapisBaseRequest as y, aggregatedResponse as z };
