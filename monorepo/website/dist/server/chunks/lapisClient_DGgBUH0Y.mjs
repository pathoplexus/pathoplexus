import axios from 'axios';
import { err, ok, Result } from 'neverthrow';
import { l as lapisApi, p as parseFasta, f as fastaEntryToString } from './parseFasta_DBChogMZ.mjs';
import { Z as ZodiosWrapperClient } from './zodiosWrapperClient_B5oplz-4.mjs';
import { o as getLapisUrl, a as getRuntimeConfig, j as getSchema, A as ACCESSION_FIELD, q as VERSION_FIELD, v as versionStatuses, t as accessionVersion, u as ACCESSION_VERSION_FIELD, V as VERSION_STATUS_FIELD, I as IS_REVOCATION_FIELD, S as SUBMITTED_AT_FIELD, w as sequenceEntryHistory, x as detailsResponse } from './config_CQtV1zSN.mjs';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';

class LapisClient extends ZodiosWrapperClient {
  constructor(url, api, logger, schema) {
    super(
      url,
      api,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      (axiosError) => typeof axiosError.data?.error === "object" ? axiosError.data?.error : axiosError.data,
      logger,
      "LAPIS"
    );
    this.url = url;
    this.schema = schema;
  }
  static createForOrganism(organism) {
    return this.create(getLapisUrl(getRuntimeConfig().serverSide, organism), getSchema(organism));
  }
  static create(lapisUrl, schema, logger = getInstanceLogger("lapisClient")) {
    return new LapisClient(lapisUrl, lapisApi, logger, schema);
  }
  getSequenceEntryVersionDetails(accessionVersion2) {
    return this.call("details", {
      [this.schema.primaryKey]: accessionVersion2
    });
  }
  async getSequenceEntryVersionDetailsTsv(accessionVersion2) {
    const result = await this.call("details", {
      [this.schema.primaryKey]: accessionVersion2,
      dataFormat: "TSV"
    });
    return result.map((data) => data);
  }
  async getLatestAccessionVersion(accession) {
    const result = await this.call("details", {
      accession,
      versionStatus: versionStatuses.latestVersion,
      fields: [ACCESSION_FIELD, VERSION_FIELD]
    });
    return result.andThen(({ data }) => {
      if (data.length !== 1) {
        return err({
          type: "about:blank",
          title: "Unexpected number of results",
          detail: `Expected 1 result, got ${data.length}`,
          status: 500,
          instance: "LapisClient/getLatestAccessionVersion"
        });
      }
      const parsedAccessionversion = accessionVersion.safeParse(data[0]);
      if (!parsedAccessionversion.success) {
        return err({
          type: "about:blank",
          title: "Could not parse accession version",
          detail: `Expected 1 result, got ${data.length}`,
          status: 500,
          instance: "LapisClient/getLatestAccessionVersion"
        });
      }
      return ok(parsedAccessionversion.data);
    });
  }
  async getAllSequenceEntryHistoryForAccession(accession) {
    const request = {
      accession,
      fields: [
        ACCESSION_VERSION_FIELD,
        ACCESSION_FIELD,
        VERSION_FIELD,
        VERSION_STATUS_FIELD,
        IS_REVOCATION_FIELD,
        SUBMITTED_AT_FIELD
      ],
      orderBy: [{ field: VERSION_FIELD, type: "ascending" }]
    };
    const result = await this.call("details", request);
    const createSequenceHistoryProblemDetail = (detail) => ({
      type: "about:blank",
      title: "Could not get sequence entry history",
      status: 500,
      instance: "LapisClient/getAllSequenceEntryHistoryForAccession",
      detail
    });
    return result.andThen(({ data }) => {
      const parseResult = sequenceEntryHistory.safeParse(data);
      return parseResult.success ? ok(parseResult.data) : err(
        createSequenceHistoryProblemDetail(
          `Validation error for ${accession}: ${parseResult.error.toString()}`
        )
      );
    });
  }
  getSequenceMutations(accessionVersion2, type) {
    const endpoint = type === "nucleotide" ? "nucleotideMutations" : "aminoAcidMutations";
    return this.call(endpoint, {
      [this.schema.primaryKey]: accessionVersion2
    });
  }
  getSequenceInsertions(accessionVersion2, type) {
    const endpoint = type === "nucleotide" ? "nucleotideInsertions" : "aminoAcidInsertions";
    const request = {
      [this.schema.primaryKey]: accessionVersion2,
      orderBy: [
        { field: "sequenceName", type: "ascending" },
        { field: "position", type: "ascending" }
      ]
    };
    return this.call(endpoint, request);
  }
  getUnalignedSequences(accessionVersion2) {
    return this.call("unalignedNucleotideSequences", {
      [this.schema.primaryKey]: accessionVersion2,
      dataFormat: "FASTA"
    });
  }
  async getUnalignedSequencesMultiSegment(accessionVersion2, segmentNames) {
    const results = await Promise.all(
      segmentNames.map(
        (segment) => this.call(
          "unalignedNucleotideSequencesMultiSegment",
          {
            [this.schema.primaryKey]: accessionVersion2,
            dataFormat: "FASTA"
          },
          { params: { segment } }
        )
      )
    );
    return Result.combine(results);
  }
  getSequenceFasta(accessionVersion2) {
    return this.getUnalignedSequences(accessionVersion2);
  }
  async getMultiSegmentSequenceFasta(accessionVersion2, segmentNames) {
    const segments = await this.getUnalignedSequencesMultiSegment(accessionVersion2, segmentNames);
    return segments.map(
      (segmentFastas) => segmentFastas.map((fasta, i) => {
        const parsed = parseFasta(fasta);
        if (parsed.length === 0) {
          return "";
        }
        const withSegmentSuffix = {
          name: `${parsed[0].name}_${segmentNames[i]}`,
          sequence: parsed[0].sequence
        };
        return fastaEntryToString([withSegmentSuffix]);
      }).join("")
    );
  }
  streamSequences(segment, request) {
    const baseUrl = `${this.url}/sample/unalignedNucleotideSequences`;
    const url = segment === void 0 ? baseUrl : `${baseUrl}/${segment}`;
    return axios.post(url, request, { responseType: "stream" });
  }
  async getDetails(request) {
    return this.request("/sample/details", "post", { ...request, dataFormat: "json" }, detailsResponse);
  }
  async request(endpoint, method, request, responseSchema) {
    try {
      const response = await axios.request({
        url: `${this.url}${endpoint}`,
        method,
        data: request
      });
      const responseDataResult = responseSchema.safeParse(response.data);
      if (responseDataResult.success) {
        return ok(responseDataResult.data);
      }
      return err({
        type: "about:blank",
        title: "bad response",
        status: 0,
        detail: `Failed to parse LAPIS response: ${responseDataResult.error.toString()}`,
        instance: "/sample/details"
      });
    } catch (e) {
      const axiosError = e;
      return err(this.createProblemDetail(axiosError, endpoint));
    }
  }
}

export { LapisClient as L };
