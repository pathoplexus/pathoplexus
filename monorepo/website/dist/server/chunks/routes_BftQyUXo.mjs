import { F as FileType } from './config_CQtV1zSN.mjs';
import { g as getAccessionVersionString } from './extractAccessionVersion_CIVou_Oi.mjs';

const SubmissionRouteUtils = {
  /**
   * @param pathname window.location.pathname
   * @param search window.location.search
   */
  parseToRoute(pathname, search) {
    if (!pathname.startsWith("/")) {
      return void 0;
    }
    const [organism, urlConst, groupIdStr, ...remaining] = pathname.substring(1).split("/");
    if (organism === void 0 || urlConst !== "submission" || groupIdStr === null || !/^\d+$/.test(groupIdStr)) {
      return void 0;
    }
    const baseRoute = { organism, groupId: parseInt(groupIdStr, 10) };
    const [subpage, ...remaining2] = remaining;
    if (subpage === void 0) {
      return { ...baseRoute, name: "portal" };
    }
    if (remaining2.length > 0) {
      return void 0;
    }
    const searchParams = new URLSearchParams(search);
    switch (subpage) {
      case "submit":
        return {
          ...baseRoute,
          name: "submit",
          inputMode: searchParams.get("inputMode") === "form" ? "form" : "bulk"
        };
      case "revise":
        return { ...baseRoute, name: "revise" };
      case "review":
        return { ...baseRoute, name: "review" };
      case "released": {
        return { ...baseRoute, name: "released", searchParams };
      }
    }
    return void 0;
  },
  toUrl(route) {
    const baseUrl = `/${route.organism}/submission/${route.groupId}`;
    switch (route.name) {
      case "portal":
        return baseUrl;
      case "revise":
      case "review":
        return `${baseUrl}/${route.name}`;
      case "submit":
        return `${baseUrl}/${route.name}?inputMode=${route.inputMode}`;
      case "released":
        return `${baseUrl}/released?${route.searchParams}`;
    }
  }
};

const approxMaxAcceptableUrlLength = 1900;
const routes = {
  apiDocumentationPage: () => "/api-documentation",
  organismStartPage: (organism) => `/${organism}`,
  searchPage: (organism) => withOrganism(organism, `/search`),
  metadataTemplate: (organism, format, fileType) => withOrganism(organism, `/submission/template?format=${format}&fileType=${fileType}`),
  metadataOverview: (organism) => withOrganism(organism, `/metadata-overview`),
  mySequencesPage: (organism, groupId) => SubmissionRouteUtils.toUrl({
    name: "released",
    organism,
    groupId,
    searchParams: new URLSearchParams({})
  }),
  sequenceEntryDetailsPage: (accessionVersion) => `/seq/${getAccessionVersionString(accessionVersion)}`,
  sequenceEntryVersionsPage: (accessionVersion) => `/seq/${getAccessionVersionString(accessionVersion)}/versions`,
  sequenceEntryFastaPage: (accessionVersion, download = false) => sequenceEntryDownloadUrl(accessionVersion, FileType.FASTA, download),
  sequenceEntryTsvPage: (accessionVersion, download = false) => sequenceEntryDownloadUrl(accessionVersion, FileType.TSV, download),
  createGroup: () => "/user/createGroup",
  submissionPageWithoutGroup: (organism) => withOrganism(organism, "/submission"),
  submissionPage: (organism, groupId) => SubmissionRouteUtils.toUrl({ name: "portal", organism, groupId }),
  submitPage: (organism, groupId, inputMode = "bulk") => SubmissionRouteUtils.toUrl({ name: "submit", organism, groupId, inputMode }),
  revisePage: (organism, groupId) => SubmissionRouteUtils.toUrl({ name: "revise", organism, groupId }),
  editPage: (organism, accessionVersion) => withOrganism(organism, `/submission/edit/${accessionVersion.accession}/${accessionVersion.version}`),
  userOverviewPage: (organism) => {
    const userPagePath = `/user`;
    return organism === void 0 ? userPagePath : withOrganism(organism, userPagePath);
  },
  groupOverviewPage: (groupId) => `/group/${groupId}`,
  editGroupPage: (groupId) => `/group/${groupId}/edit`,
  userSequenceReviewPage: (organism, groupId) => SubmissionRouteUtils.toUrl({ name: "review", organism, groupId }),
  versionPage: (accession) => `/seq/${accession}/versions`,
  seqSetsPage: (username) => {
    const seqSetPagePath = `/seqsets`;
    return username === void 0 ? seqSetPagePath : seqSetPagePath + `?user=${username}`;
  },
  seqSetPage: (seqSetId, seqSetVersion) => {
    return `/seqsets/${seqSetId}.${seqSetVersion}`;
  },
  logout: () => "/logout",
  organismSelectorPage: (redirectTo) => `/organism-selector/${redirectTo}`,
  datauseTermsPage: () => "/about/terms-of-use/data-use-terms"
};
function withOrganism(organism, path) {
  return `/${organism}${path}`;
}
function sequenceEntryDownloadUrl(accessionVersion, fileType, download = false) {
  let url = `${routes.sequenceEntryDetailsPage(accessionVersion)}.${fileType}`;
  if (download) {
    url += "?download";
  }
  return url;
}

export { SubmissionRouteUtils as S, approxMaxAcceptableUrlLength as a, routes as r };
