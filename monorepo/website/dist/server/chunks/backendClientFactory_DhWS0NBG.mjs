import { c as sequenceEntryToEdit, d as dataUseTermsHistoryEntry, e as getSequencesResponse, r as requestUploadResponse, i as info, p as pipelineVersionStatistics, a as getRuntimeConfig } from './config_CQtV1zSN.mjs';
import axios from 'axios';
import { ok, err } from 'neverthrow';
import { z } from 'zod';

function createAuthorizationHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

class BackendClient {
  constructor(url) {
    this.url = url;
  }
  getDataToEdit(organism, token, accession, version) {
    return this.request(
      `/${organism}/get-data-to-edit/${accession}/${version}`,
      "GET",
      sequenceEntryToEdit,
      createAuthorizationHeader(token),
      void 0,
      void 0
    );
  }
  getDataUseTermsHistory(accession) {
    return this.request(
      `/data-use-terms/${accession}`,
      "GET",
      z.array(dataUseTermsHistoryEntry),
      void 0,
      void 0,
      void 0
    );
  }
  getSequences(token, organism, params) {
    return this.request(
      `/${organism}/get-sequences`,
      "GET",
      getSequencesResponse,
      createAuthorizationHeader(token),
      void 0,
      params
    );
  }
  /**
   * Request presigned URLs to upload files to.
   * @param token The bearer token.
   * @param groupId The group ID of the group that will own the uploaded files.
   * @param numberFiles How many file IDs and URLs to generate.
   * @returns A list of file IDs and presigned URLs to upload the files to.
   */
  requestUpload(token, groupId, numberFiles) {
    return this.request(
      "/files/request-upload",
      "POST",
      requestUploadResponse,
      createAuthorizationHeader(token),
      void 0,
      {
        groupId,
        numberFiles
      }
    );
  }
  async isInDebugMode() {
    const infoResponse = await this.request("/", "GET", info, void 0, void 0, void 0);
    return infoResponse.match(
      (info2) => info2.isInDebugMode,
      () => false
    );
  }
  getPipelineStatistics(token) {
    return this.request(
      "/admin/pipeline-statistics",
      "GET",
      pipelineVersionStatistics,
      createAuthorizationHeader(token),
      void 0,
      void 0
    );
  }
  async request(endpoint, method, responseSchema, headers, request, params) {
    try {
      const response = await axios.request({
        url: `${this.url}${endpoint}`,
        method,
        headers,
        params,
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
        detail: `Failed to parse backend response: ${responseDataResult.error.toString()}`
      });
    } catch (e) {
      const axiosError = e;
      return err({
        type: "about:blank",
        title: "bad response",
        status: 0,
        detail: `Failed to make request: ${axiosError.cause?.message}`
      });
    }
  }
}

function createBackendClient() {
  return new BackendClient(getRuntimeConfig().serverSide.backendUrl);
}

export { BackendClient as B, createAuthorizationHeader as a, createBackendClient as c };
