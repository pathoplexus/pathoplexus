import { ok, err } from 'neverthrow';
import { p as parseAccessionVersionFromString } from './extractAccessionVersion_CIVou_Oi.mjs';
import { g as getConfiguredOrganisms } from './config_CQtV1zSN.mjs';
import { L as LapisClient } from './lapisClient_DGgBUH0Y.mjs';

function createDownloadAPIRoute(contentType, fileSuffix, undefinedVersionRedirectUrl, getData) {
  return async ({ params, redirect, request }) => {
    const accessionVersion = params.accessionVersion ?? "";
    const isDownload = new URL(request.url).searchParams.has("download");
    const result = await getSequenceData(accessionVersion, fileSuffix, undefinedVersionRedirectUrl, getData);
    if (!result.isOk()) {
      return new Response(void 0, {
        status: 404
      });
    }
    if (result.value.type === "redirect" /* REDIRECT */) {
      return redirect(result.value.redirectUrl);
    }
    const headers = {
      "Content-Type": contentType,
      // eslint-disable-line @typescript-eslint/naming-convention
      "Access-Control-Allow-Origin": "*"
      // eslint-disable-line @typescript-eslint/naming-convention
    };
    if (isDownload) {
      const filename = `${accessionVersion}.${fileSuffix}`;
      headers["Content-Disposition"] = `attachment; filename="${filename}"`;
    }
    return new Response(result.value.data, {
      headers
    });
  };
}
const getSequenceDataWithOrganism = async (accessionVersion, organism, fileSuffix, undefinedVersionRedirectUrl, getter) => {
  const { accession, version } = parseAccessionVersionFromString(accessionVersion);
  const lapisClient = LapisClient.createForOrganism(organism);
  if (version === void 0) {
    const latestVersionResult = await lapisClient.getLatestAccessionVersion(accession);
    return latestVersionResult.map((latestVersion) => ({
      type: "redirect" /* REDIRECT */,
      redirectUrl: undefinedVersionRedirectUrl(latestVersion)
    }));
  }
  const dataResult = await getter(accessionVersion, organism);
  if (dataResult.isOk()) {
    if (dataResult.value.trim().length === 0) {
      return err({
        type: "about:blank",
        title: "Not Found",
        status: 0,
        detail: "No data found for accession version " + accessionVersion,
        instance: "/seq/" + accessionVersion + `.${fileSuffix}`
      });
    }
  }
  return dataResult.map((data) => ({
    type: "data" /* DATA */,
    data
  }));
};
const getSequenceData = async (accessionVersion, fileSuffix, undefinedVersionRedirectUrl, getter) => {
  const organisms = getConfiguredOrganisms();
  const promises = organisms.map(
    ({ key }) => getSequenceDataWithOrganism(accessionVersion, key, fileSuffix, undefinedVersionRedirectUrl, getter).then(
      (result) => {
        if (result.isOk()) {
          if (result.value.type === "redirect" /* REDIRECT */) {
            return ok(result.value);
          } else {
            if (result.value.data.trim().split("\n").length > 1) {
              return ok(result.value);
            } else {
              return Promise.reject(new Error("Result is empty - expected data."));
            }
          }
        } else {
          return Promise.reject(new Error(result.error.detail));
        }
      }
    )
  );
  try {
    const firstSuccess = await Promise.any(promises);
    return firstSuccess;
  } catch (_) {
    return err("Could not find accessionVersion in any organism.");
  }
};

export { createDownloadAPIRoute as c };
