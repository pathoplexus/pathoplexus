import { makeEndpoint, makeApi, Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { isAxiosError } from 'axios';
import z from 'zod';
import { n as notAuthorizedError, a as authorizationHeader, w as withOrganismPathSegment } from './commonApiTypes_DLGEfh_V.mjs';
import { m as problemDetail, Y as submitFiles, Z as submissionIdMapping, _ as uploadFiles, c as sequenceEntryToEdit, $ as revocationRequest, a0 as editedSequenceEntryData, e as getSequencesResponse, a1 as accessionVersionsFilterWithApprovalScope, t as accessionVersion, a2 as accessionVersionsFilterWithDeletionScope, a3 as unprocessedData, d as dataUseTermsHistoryEntry, a4 as dataUseTerms } from './config_CQtV1zSN.mjs';
import { l as lapisApi, a as fastaEntries } from './parseFasta_DBChogMZ.mjs';

const submitEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/submit"),
  alias: "submit",
  requestFormat: "form-data",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: submitFiles.transform((submitData) => {
        const { fileMapping, ...rest } = submitData;
        return fileMapping !== void 0 ? { ...rest, fileMapping: JSON.stringify(fileMapping) } : rest;
      })
    }
  ],
  response: z.array(submissionIdMapping),
  errors: [
    { status: "default", schema: problemDetail },
    { status: 400, schema: problemDetail },
    { status: 422, schema: problemDetail },
    notAuthorizedError
  ]
});
const reviseEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/revise"),
  alias: "revise",
  requestFormat: "form-data",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: uploadFiles
    }
  ],
  response: z.array(submissionIdMapping),
  errors: [
    { status: "default", schema: problemDetail },
    { status: 400, schema: problemDetail },
    { status: 422, schema: problemDetail },
    notAuthorizedError
  ]
});
const getDataToEditEndpoint = makeEndpoint({
  method: "get",
  path: withOrganismPathSegment("/get-data-to-edit/:accession/:version"),
  alias: "getDataToEdit",
  parameters: [authorizationHeader],
  response: sequenceEntryToEdit,
  errors: [notAuthorizedError]
});
const revokeSequencesEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/revoke"),
  alias: "revokeSequences",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: revocationRequest
    }
  ],
  response: z.array(submissionIdMapping),
  errors: [{ status: "default", schema: problemDetail }, { status: 422, schema: problemDetail }, notAuthorizedError]
});
const submitReviewedSequenceEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/submit-edited-data"),
  alias: "submitReviewedSequence",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: editedSequenceEntryData
    }
  ],
  response: z.never(),
  errors: [notAuthorizedError]
});
const getSequencesEndpoint = makeEndpoint({
  method: "get",
  path: withOrganismPathSegment("/get-sequences"),
  alias: "getSequences",
  parameters: [
    authorizationHeader,
    {
      name: "groupIdsFilter",
      type: "Query",
      schema: z.string().optional()
      // comma separated list of group ids (numbers)
    },
    {
      name: "statusesFilter",
      type: "Query",
      schema: z.string().optional()
    },
    {
      name: "processingResultFilter",
      type: "Query",
      schema: z.string().optional()
    },
    {
      name: "page",
      // 0-indexed
      type: "Query",
      schema: z.number().optional()
    },
    {
      name: "size",
      type: "Query",
      schema: z.number().optional()
    }
  ],
  response: getSequencesResponse,
  errors: [notAuthorizedError, { status: 404, schema: problemDetail }]
});
const approveProcessedDataEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/approve-processed-data"),
  alias: "approveProcessedData",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: accessionVersionsFilterWithApprovalScope
    }
  ],
  response: z.array(accessionVersion),
  errors: [{ status: "default", schema: problemDetail }, notAuthorizedError]
});
const deleteSequencesEndpoint = makeEndpoint({
  method: "delete",
  path: withOrganismPathSegment("/delete-sequence-entry-versions"),
  alias: "deleteSequences",
  parameters: [
    authorizationHeader,
    {
      name: "accessionVersions",
      type: "Body",
      schema: accessionVersionsFilterWithDeletionScope
    }
  ],
  response: z.array(accessionVersion),
  errors: [{ status: "default", schema: problemDetail }, notAuthorizedError]
});
const extractUnprocessedDataEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/extract-unprocessed-data"),
  alias: "extractUnprocessedData",
  parameters: [
    authorizationHeader,
    {
      name: "numberOfSequenceEntries",
      type: "Query",
      schema: z.number()
    },
    {
      name: "pipelineVersion",
      type: "Query",
      schema: z.number()
    }
  ],
  response: z.union([z.string(), unprocessedData]),
  errors: [notAuthorizedError]
});
const submitProcessedDataEndpoint = makeEndpoint({
  method: "post",
  path: withOrganismPathSegment("/submit-processed-data"),
  alias: "submitProcessedData",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: z.string()
    },
    {
      name: "pipelineVersion",
      type: "Query",
      schema: z.number()
    }
  ],
  response: z.never(),
  errors: [{ status: "default", schema: problemDetail }, { status: 422, schema: problemDetail }, notAuthorizedError]
});
const getDataUseTermsHistoryEndpoint = makeEndpoint({
  method: "get",
  path: "/data-use-terms/:accession",
  alias: "getDataUseTermsHistory",
  response: z.array(dataUseTermsHistoryEntry),
  errors: [
    { status: "default", schema: problemDetail },
    { status: 404, schema: problemDetail }
  ]
});
const setDataUseTerms = makeEndpoint({
  method: "put",
  path: "/data-use-terms",
  alias: "setDataUseTerms",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: z.object({
        accessions: z.array(z.string()),
        newDataUseTerms: dataUseTerms
      })
    }
  ],
  response: z.never(),
  errors: [
    { status: "default", schema: problemDetail },
    { status: 404, schema: problemDetail }
  ]
});
const backendApi = makeApi([
  submitEndpoint,
  reviseEndpoint,
  getDataToEditEndpoint,
  revokeSequencesEndpoint,
  submitReviewedSequenceEndpoint,
  getSequencesEndpoint,
  approveProcessedDataEndpoint,
  deleteSequencesEndpoint,
  extractUnprocessedDataEndpoint,
  submitProcessedDataEndpoint,
  getDataUseTermsHistoryEndpoint,
  setDataUseTerms
]);

var SeqSetRecordType = /* @__PURE__ */ ((SeqSetRecordType2) => {
  SeqSetRecordType2["loculus"] = "Loculus";
  return SeqSetRecordType2;
})(SeqSetRecordType || {});
const seqSetRecord = z.object({
  accession: z.string(),
  type: z.nativeEnum(SeqSetRecordType),
  isFocal: z.boolean()
});
const seqSetRecords = z.array(seqSetRecord);
const seqSet = z.object({
  seqSetId: z.string(),
  seqSetDOI: z.string().nullish(),
  seqSetVersion: z.number(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  createdBy: z.string()
});
const seqSets = z.array(seqSet);
const citedByResult = z.object({
  years: z.array(z.number()),
  citations: z.array(z.number())
});
const authorProfile = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  emailDomain: z.string(),
  university: z.string().nullish()
});

const getSeqSetsOfUserEndpoint = makeEndpoint({
  method: "get",
  path: "/get-seqsets-of-user",
  alias: "getSeqSetsOfUser",
  parameters: [authorizationHeader],
  response: seqSets,
  errors: [notAuthorizedError]
});
const getUserCitedByEndpoint = makeEndpoint({
  method: "get",
  path: "/get-user-cited-by-seqset?username=:username",
  alias: "getUserCitedBy",
  parameters: [authorizationHeader],
  response: citedByResult,
  errors: [notAuthorizedError]
});
const getSeqSetCitedByEndpoint = makeEndpoint({
  method: "get",
  path: "/get-seqset-cited-by-publication?seqSetId=:seqSetId&version=:version",
  alias: "getSeqSetCitedBy",
  response: citedByResult,
  errors: [notAuthorizedError]
});
const getSeqSetEndpoint = makeEndpoint({
  method: "get",
  path: "/get-seqset?seqSetId=:seqSetId&version=:version",
  alias: "getSeqSet",
  response: seqSets,
  errors: [notAuthorizedError]
});
const getSeqSetRecordsEndpoint = makeEndpoint({
  method: "get",
  path: "/get-seqset-records?seqSetId=:seqSetId&version=:version",
  alias: "getSeqSetRecords",
  response: seqSetRecords,
  errors: [notAuthorizedError]
});
const validateSeqSetRecords = makeEndpoint({
  method: "post",
  path: "/validate-seqset-records",
  alias: "validateSeqSetRecords",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: z.array(
        z.object({
          accession: z.string().optional(),
          type: z.string().optional(),
          isFocal: z.boolean()
        })
      ).optional()
    }
  ],
  response: z.object({
    valid: z.boolean()
  }),
  errors: [notAuthorizedError]
});
const createSeqSetEndpoint = makeEndpoint({
  method: "post",
  path: "/create-seqset",
  alias: "createSeqSet",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: z.object({
        name: z.string(),
        description: z.string().optional(),
        records: z.array(
          z.object({
            accession: z.string(),
            type: z.string(),
            isFocal: z.boolean()
          })
        )
      })
    }
  ],
  response: z.object({
    seqSetId: z.string(),
    seqSetVersion: z.number()
  }),
  errors: [notAuthorizedError]
});
const createSeqSetDOIEndpoint = makeEndpoint({
  method: "post",
  path: "/create-seqset-doi?seqSetId=:seqSetId&version=:seqSetVersion",
  alias: "createSeqSetDOI",
  parameters: [authorizationHeader],
  response: z.object({
    seqSetId: z.string(),
    seqSetVersion: z.number()
  }),
  errors: [notAuthorizedError]
});
const updateSeqSetEndpoint = makeEndpoint({
  method: "put",
  path: "/update-seqset",
  alias: "updateSeqSet",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: z.object({
        seqSetId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        records: z.array(
          z.object({
            accession: z.string(),
            type: z.string(),
            isFocal: z.boolean()
          })
        ).optional()
      })
    }
  ],
  response: z.object({
    seqSetId: z.string(),
    seqSetVersion: z.number()
  }),
  errors: [notAuthorizedError]
});
const deleteSeqSetEndpoint = makeEndpoint({
  method: "delete",
  path: "/delete-seqset?seqSetId=:seqSetId&version=:seqSetVersion",
  alias: "deleteSeqSet",
  parameters: [authorizationHeader],
  response: z.never(),
  errors: [notAuthorizedError]
});
const getAuthorEndpoint = makeEndpoint({
  method: "get",
  path: "/get-author?username=:username",
  alias: "getAuthor",
  response: authorProfile,
  errors: [notAuthorizedError]
});
const seqSetCitationApi = makeApi([
  getSeqSetsOfUserEndpoint,
  getUserCitedByEndpoint,
  getSeqSetCitedByEndpoint,
  getSeqSetEndpoint,
  getSeqSetRecordsEndpoint,
  validateSeqSetRecords,
  createSeqSetEndpoint,
  createSeqSetDOIEndpoint,
  updateSeqSetEndpoint,
  deleteSeqSetEndpoint,
  getAuthorEndpoint
]);

const unalignedSequenceSegment = (segmentName) => ({
  type: "nucleotide",
  aligned: false,
  name: segmentName
});
const alignedSequenceSegment = (segmentName) => ({
  type: "nucleotide",
  aligned: true,
  name: segmentName
});
const geneSequence = (gene) => ({
  type: "aminoAcid",
  aligned: true,
  name: gene
});
const isUnalignedSequence = (type) => type.type === "nucleotide" && !type.aligned;
const isAlignedSequence = (type) => type.type === "nucleotide" && type.aligned;
const isGeneSequence = (gene, type) => type.type === "aminoAcid" && type.name === gene;

function backendClientHooks(clientConfig) {
  return new ZodiosHooks("loculus", new Zodios(clientConfig.backendUrl, backendApi));
}
function lapisClientHooks(lapisUrl) {
  const zodiosHooks = new ZodiosHooks("lapis", new Zodios(lapisUrl, lapisApi, { transform: false }));
  return {
    zodiosHooks,
    utilityHooks: {
      useGetSequence(accessionVersion, sequenceType, isMultiSegmented) {
        const { data, error, isLoading } = getSequenceHook(
          zodiosHooks,
          {
            accessionVersion,
            dataFormat: "FASTA"
          },
          sequenceType,
          isMultiSegmented
        );
        if (data === void 0) {
          if (isAxiosError(error)) {
            const maybeProblemDetail = error.response?.data?.error ?? error.response?.data;
            const problemDetailParseResult = problemDetail.safeParse(maybeProblemDetail);
            if (problemDetailParseResult.success) {
              return { data: null, error: problemDetailParseResult.data, isLoading };
            }
          }
          return { data, error, isLoading };
        }
        const parseResult = fastaEntries.safeParse(data);
        if (parseResult.success) {
          return {
            data: parseResult.data.length > 0 ? parseResult.data[0] : null,
            error,
            isLoading
          };
        }
        return {
          data: void 0,
          error: parseResult.error,
          isLoading
        };
      }
    }
  };
}
function getSequenceHook(hooks, request, sequenceType, isMultiSegmented) {
  if (isUnalignedSequence(sequenceType)) {
    return isMultiSegmented ? hooks.useUnalignedNucleotideSequencesMultiSegment(request, { params: { segment: sequenceType.name } }) : hooks.useUnalignedNucleotideSequences(request);
  }
  if (isAlignedSequence(sequenceType)) {
    return isMultiSegmented ? hooks.useAlignedNucleotideSequencesMultiSegment(request, { params: { segment: sequenceType.name } }) : hooks.useAlignedNucleotideSequences(request);
  }
  return hooks.useAlignedAminoAcidSequences(request, { params: { gene: sequenceType.name } });
}
function seqSetCitationClientHooks(clientConfig) {
  return new ZodiosHooks("loculus", new Zodios(clientConfig.backendUrl, seqSetCitationApi));
}

export { SeqSetRecordType as S, isAlignedSequence as a, backendClientHooks as b, isGeneSequence as c, alignedSequenceSegment as d, seqSetCitationApi as e, backendApi as f, geneSequence as g, isUnalignedSequence as i, lapisClientHooks as l, seqSetCitationClientHooks as s, unalignedSequenceSegment as u };
