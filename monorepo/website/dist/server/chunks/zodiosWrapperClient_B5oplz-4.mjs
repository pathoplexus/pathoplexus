import { Zodios } from '@zodios/core';
import { ok, err } from 'neverthrow';
import 'winston';
import { m as problemDetail } from './config_CQtV1zSN.mjs';

class ZodiosWrapperClient {
  constructor(url, api, tryToExtractProblemDetail, logger, serviceName) {
    this.tryToExtractProblemDetail = tryToExtractProblemDetail;
    this.logger = logger;
    this.serviceName = serviceName;
    this.zodios = new Zodios(url, api);
  }
  zodios;
  /**
   *
   * @param method An alias as defined in makeEndpoint()
   * @param args Arguments such as params and headers; it's best to ask TypeScript/your IDE for the available options
   */
  async call(method, ...args) {
    const zodiosMethod = this.zodios[method];
    const zodiosResponse = zodiosMethod(...args);
    return zodiosResponse.then(
      (response) => ok(response),
      (error) => err(this.createProblemDetail(error, method))
      // eslint-disable-line @typescript-eslint/use-unknown-in-catch-callback-variable
    );
  }
  createProblemDetail(error, method) {
    if (error.response?.status === 401) {
      const message2 = error.response.headers["www-authenticate"] ?? "Not authorized";
      return {
        type: "about:blank",
        title: "Not authorized",
        status: 401,
        detail: message2,
        instance: method
      };
    }
    const message = error.message;
    if (error.response !== void 0) {
      const requestId = error.response.headers["x-request-id"] !== void 0 ? `(request id ${error.response.headers["x-request-id"]}) ` : "";
      let problemDetailResponse;
      try {
        problemDetailResponse = problemDetail.parse(this.tryToExtractProblemDetail(error.response));
      } catch (_) {
        this.logger.error(
          `Unknown error from ${this.serviceName} ${requestId}: ${JSON.stringify(error.response.data)}`
        );
        return {
          type: "about:blank",
          title: error.message,
          status: 0,
          detail: `Unknown error from ${this.serviceName}`,
          instance: method
        };
      }
      this.logger.info(`${requestId}${message}: ${problemDetailResponse.detail}`);
      return problemDetailResponse;
    }
    this.logger.error(`Unknown error from ${this.serviceName}: ${JSON.stringify(error)}`);
    return {
      type: "about:blank",
      title: error.message,
      status: 0,
      detail: `Unknown error from ${this.serviceName}`,
      instance: method
    };
  }
}

export { ZodiosWrapperClient as Z };
