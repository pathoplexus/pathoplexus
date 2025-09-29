/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { E as ErrorFeedback } from '../../chunks/ErrorFeedback_TZcsGLkd.mjs';
import { C as CitationPlot, S as SeqSetCitationClient, A as AuthorDetails } from '../../chunks/seqSetCitationClient_Dy6NbOXP.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import axios, { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { S as SeqSetRecordType, s as seqSetCitationClientHooks } from '../../chunks/serviceHooks_DslcN1kS.mjs';
import { g as getClientLogger } from '../../chunks/clientLogger_iKuJ-UyB.mjs';
import { a as createAuthorizationHeader } from '../../chunks/backendClientFactory_DhWS0NBG.mjs';
import { d as displayConfirmationDialog } from '../../chunks/ConfirmationDialog_BWzbBNGK.mjs';
import { w as withQueryProvider } from '../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { P as Pagination } from '../../chunks/Pagination_DxF1OMvg.mjs';
import { a as getRuntimeConfig, b as getWebsiteConfig, a6 as seqSetsAreEnabled } from '../../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const fetchRecordsMetadata = async (records, clientConfig, fieldsToDisplay) => {
  const accessions = records.map((record) => record.accession);
  if (accessions.length === 0) {
    return /* @__PURE__ */ new Map();
  }
  const fields = fieldsToDisplay.map((f) => f.field);
  const lapisUrlsWithoutDummies = Object.fromEntries(
    Object.entries(clientConfig.lapisUrls).filter(([organism]) => !organism.includes("organism"))
  );
  const lapisPromises = Object.entries(lapisUrlsWithoutDummies).map(async ([organism, lapisUrl]) => {
    try {
      const detailsResponse = await axios.post(`${lapisUrl}/sample/details`, {
        accessionVersion: accessions,
        fields: ["accessionVersion", ...fields],
        dataFormat: "json"
      });
      const responseData = detailsResponse.data;
      const data = responseData?.data ?? [];
      return data.map((record) => ({
        ...record,
        organism
      }));
    } catch (_error) {
      return [];
    }
  });
  const allResults = await Promise.all(lapisPromises);
  const combinedData = allResults.flat();
  const metadataMap = /* @__PURE__ */ new Map();
  combinedData.forEach((record) => {
    const recordData = record;
    const metadata = {
      accession: String(recordData.accessionVersion),
      organism: String(recordData.organism)
    };
    fields.forEach((field) => {
      metadata[field] = recordData[field];
    });
    metadataMap.set(String(recordData.accessionVersion), metadata);
  });
  return metadataMap;
};
const SeqSetRecordsTableWithMetadata = ({
  seqSetRecords,
  clientConfig,
  fieldsToDisplay = [
    { field: "geoLocCountry", displayName: "Country" },
    { field: "sampleCollectionDate", displayName: "Collection Date" },
    { field: "authors", displayName: "Authors" }
  ],
  sortByKey = "isFocal",
  organismDisplayNames = {}
}) => {
  const { data: metadataMap, isLoading } = useQuery({
    queryKey: ["seqset-records-metadata", seqSetRecords, clientConfig, fieldsToDisplay],
    queryFn: () => fetchRecordsMetadata(seqSetRecords, clientConfig, fieldsToDisplay),
    staleTime: 5 * 60 * 1e3
    // 5 minutes
  });
  if (seqSetRecords.length === 0) {
    return null;
  }
  const accessionOutlink = {
    [SeqSetRecordType.loculus]: (acc) => `/seq/${acc}`
  };
  const sortedSeqRecords = useMemo(() => {
    return [...seqSetRecords].sort((a, b) => {
      const x = a[sortByKey];
      const y = b[sortByKey];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }, [seqSetRecords, sortByKey]);
  return /* @__PURE__ */ jsxs("table", { className: "table-fixed w-full", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "text-left font-medium w-1/6", children: "Accession" }),
      /* @__PURE__ */ jsx("th", { className: "text-left font-medium w-1/4", children: "Organism" }),
      /* @__PURE__ */ jsx("th", { className: "text-left font-medium w-1/6", children: "Context" }),
      fieldsToDisplay.map((fieldConfig) => /* @__PURE__ */ jsx("th", { className: "text-left font-medium", children: fieldConfig.displayName }, fieldConfig.field))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: sortedSeqRecords.map((seqSetRecord, index) => {
      const metadata = metadataMap?.get(seqSetRecord.accession);
      const handleRowClick = () => {
        window.location.href = accessionOutlink[seqSetRecord.type](seqSetRecord.accession);
      };
      return /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "hover:bg-primary-100 border-gray-100 cursor-pointer",
          onClick: handleRowClick,
          children: [
            /* @__PURE__ */ jsx("td", { className: "text-left pr-4 truncate max-w-0", title: seqSetRecord.accession, children: seqSetRecord.accession }),
            /* @__PURE__ */ jsx(
              "td",
              {
                className: "text-left pr-4 truncate max-w-0",
                title: metadata?.organism ? organismDisplayNames[metadata.organism] ?? metadata.organism : "N/A",
                children: isLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : metadata?.organism ? organismDisplayNames[metadata.organism] ?? metadata.organism : "N/A"
              }
            ),
            /* @__PURE__ */ jsx("td", { className: "text-left pr-4 truncate max-w-0", children: seqSetRecord.isFocal ? "Focal" : "Background" }),
            fieldsToDisplay.map((fieldConfig) => /* @__PURE__ */ jsx(
              "td",
              {
                className: "text-left pr-4 truncate max-w-0",
                title: (
                  // eslint-disable-next-line @typescript-eslint/no-base-to-string
                  String(metadata?.[fieldConfig.field] ?? "")
                ),
                children: isLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : (
                  // eslint-disable-next-line @typescript-eslint/no-base-to-string
                  String(metadata?.[fieldConfig.field] ?? "")
                )
              },
              fieldConfig.field
            ))
          ]
        },
        `accessionData-${index}`
      );
    }) })
  ] });
};

const logger = getClientLogger("SeqSetItem");
const SeqSetItemInner = ({
  clientConfig,
  accessToken,
  seqSet,
  seqSetRecords,
  citedByData,
  isAdminView = false,
  fieldsToDisplay,
  organismDisplayNames
}) => {
  const [page, setPage] = useState(1);
  const sequencesPerPage = 10;
  const { mutate: createSeqSetDOI } = useCreateSeqSetDOIAction(
    clientConfig,
    accessToken,
    seqSet.seqSetId,
    seqSet.seqSetVersion,
    (message) => toast.error(message, { position: "top-center", autoClose: false })
  );
  const handleCreateDOI = () => {
    createSeqSetDOI(void 0);
  };
  const getCrossRefUrl = () => {
    return `https://search.crossref.org/search/works?from_ui=yes&q=${seqSet.seqSetDOI}`;
  };
  const formatDate = (date) => {
    if (date === void 0) {
      return "N/A";
    }
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };
  const renderDOI = () => {
    if (seqSet.seqSetDOI !== void 0 && seqSet.seqSetDOI !== null) {
      return `https://doi.org/${seqSet.seqSetDOI}`;
    }
    if (!isAdminView) {
      return "N/A";
    }
    return /* @__PURE__ */ jsx(
      "a",
      {
        className: "mr-4 cursor-pointer font-medium text-blue-600 hover:text-blue-800",
        onClick: () => displayConfirmationDialog({
          dialogText: `Are you sure you want to create a DOI for this version of your seqSet?`,
          onConfirmation: handleCreateDOI
        }),
        children: "Generate a DOI"
      }
    );
  };
  const getMaxPages = () => {
    return Math.ceil(seqSetRecords.length / sequencesPerPage);
  };
  const getPaginatedSeqSetRecords = () => {
    return seqSetRecords.slice((page - 1) * sequencesPerPage, page * sequencesPerPage);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-left", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold pb-4", children: seqSet.name }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "Description" }),
        /* @__PURE__ */ jsx("p", { className: "text max-w-lg", children: seqSet.description ?? "N/A" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "Version" }),
        /* @__PURE__ */ jsx("p", { className: "text max-w-lg", children: seqSet.seqSetVersion })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "Created date" }),
        /* @__PURE__ */ jsx("p", { className: "text max-w-lg", children: formatDate(seqSet.createdAt) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "Size" }),
        /* @__PURE__ */ jsx("p", { className: "text max-w-lg", children: `${seqSetRecords.length} sequence${seqSetRecords.length === 1 ? "" : "s"}` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "DOI" }),
        renderDOI()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row py-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-8 w-[120px] text-gray-500 text-right", children: "Total citations" }),
        seqSet.seqSetDOI === void 0 || seqSet.seqSetDOI === null ? /* @__PURE__ */ jsx("p", { className: "text", children: "Cited by 0" }) : /* @__PURE__ */ jsx(
          "a",
          {
            className: "mr-4 cursor-pointer font-medium text-blue-600 hover:text-blue-800",
            href: getCrossRefUrl(),
            target: "_blank",
            children: "Cited by 0"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row", children: [
        /* @__PURE__ */ jsx("p", { className: "mr-0 w-[120px]" }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx(CitationPlot, { citedByData }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-center text-gray-500 my-4 ml-8 max-w-64", children: "Number of times this SeqSet has been cited by a publication" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col my-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xl my-4 font-semibold", children: "Sequences" }),
      /* @__PURE__ */ jsx(
        SeqSetRecordsTableWithMetadata,
        {
          seqSetRecords: getPaginatedSeqSetRecords(),
          clientConfig,
          fieldsToDisplay,
          organismDisplayNames
        }
      ),
      getMaxPages() > 1 ? /* @__PURE__ */ jsx(
        Pagination,
        {
          className: "my-4 w-full flex justify-center",
          page,
          count: getMaxPages(),
          color: "primary",
          variant: "outlined",
          shape: "rounded",
          onChange: (_, newPage) => {
            setPage(newPage);
          }
        }
      ) : null
    ] })
  ] });
};
function useCreateSeqSetDOIAction(clientConfig, accessToken, seqSetId, seqSetVersion, onError) {
  return seqSetCitationClientHooks(clientConfig).useCreateSeqSetDOI(
    { headers: createAuthorizationHeader(accessToken), params: { seqSetId, seqSetVersion } },
    {
      onSuccess: async () => {
        await logger.info(
          `Successfully created seqSet DOI for seqSetId: ${seqSetId}, version ${seqSetVersion}`
        );
        location.reload();
      },
      onError: async (error) => {
        await logger.info(`Failed to create seqSet DOI with error: '${JSON.stringify(error)})}'`);
        if (error instanceof AxiosError) {
          const responseData = error.response?.data;
          if (error.response?.data !== void 0) {
            onError(`Failed to update seqSet. ${responseData?.title}. ${responseData?.detail}`);
          }
        }
      }
    }
  );
}
const SeqSetItem = withQueryProvider(SeqSetItemInner);

const $$Astro = createAstro();
const $$seqSetId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$seqSetId;
  const clientConfig = getRuntimeConfig().public;
  const websiteConfig = getWebsiteConfig();
  const session = Astro2.locals.session;
  const accessToken = getAccessToken(session);
  const seqSetId = Astro2.params.seqSetId;
  const version = Astro2.params.version;
  const username = session?.user?.username;
  const organismDisplayNames = Object.fromEntries(
    Object.entries(websiteConfig.organisms).map(([key, config]) => [key, config.schema.organismName])
  );
  if (!seqSetsAreEnabled()) {
    return Astro2.rewrite("/404");
  }
  const seqSetClient = SeqSetCitationClient.create();
  const seqSetResponse = await seqSetClient.call("getSeqSet", {
    params: { seqSetId, version }
  });
  const seqSetRecordsResponse = await seqSetClient.call("getSeqSetRecords", {
    params: { seqSetId, version }
  });
  const seqSetCitedByResponse = await seqSetClient.call("getSeqSetCitedBy", {
    params: { seqSetId, version }
  });
  const getSeqSetByVersion = (seqSetVersions, version2) => {
    const matchedVersion = seqSetVersions.find((obj) => {
      return obj.seqSetVersion === parseInt(version2, 10);
    });
    if (matchedVersion === void 0) {
      return seqSetVersions[seqSetVersions.length - 1];
    }
    return matchedVersion;
  };
  const seqSet = seqSetResponse.isOk() ? getSeqSetByVersion(seqSetResponse.value, version) : void 0;
  const authorResponse = seqSet !== void 0 ? await seqSetClient.getAuthor(seqSet.createdBy) : void 0;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "SeqSets", "data-testid": "seqSets-item-container" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center max-w-7xl"> ${seqSet !== void 0 ? renderTemplate`<div class="flex flex-col md:flex-row items-left"> <div class="w-full md:w-1/5 flex flex-col justify-start items-center"> ${authorResponse?.isOk() ? renderTemplate`${renderComponent($$result2, "AuthorDetails", AuthorDetails, { "displayFullDetails": false, "firstName": authorResponse.value.firstName, "lastName": authorResponse.value.lastName })}` : renderTemplate`${renderComponent($$result2, "ErrorFeedback", ErrorFeedback, { "message": "Error while fetching author profile: " + JSON.stringify(authorResponse?.isErr() ? authorResponse.error : "unknown"), "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`} </div> <div class="w-full md:w-4/5 md:pl-6 mt-6 md:mt-0"> ${seqSetRecordsResponse.isOk() ? renderTemplate`${renderComponent($$result2, "SeqSetItemActions", null, { "clientConfig": clientConfig, "accessToken": accessToken, "seqSet": {
    ...seqSet,
    createdBy: authorResponse?.isOk() ? [authorResponse.value?.firstName, authorResponse.value?.lastName].filter((name) => name !== null).join(" ") : seqSet.createdBy
  }, "seqSetRecords": seqSetRecordsResponse.value, "isAdminView": seqSet.createdBy === username, "databaseName": websiteConfig.name, "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SeqSetCitations/SeqSetItemActions", "client:component-export": "SeqSetItemActions" })}` : renderTemplate`${renderComponent($$result2, "ErrorFeedback", null, { "message": "Error while fetching seqSet records: " + JSON.stringify(seqSetRecordsResponse.error), "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`} ${seqSetRecordsResponse.isOk() && seqSetCitedByResponse.isOk() ? renderTemplate`${renderComponent($$result2, "SeqSetItem", SeqSetItem, { "clientConfig": clientConfig, "accessToken": accessToken, "seqSet": seqSet, "seqSetRecords": seqSetRecordsResponse.value, "citedByData": seqSetCitedByResponse.value, "isAdminView": seqSet.createdBy === username, "fieldsToDisplay": websiteConfig.seqSetsFieldsToDisplay, "organismDisplayNames": organismDisplayNames, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SeqSetCitations/SeqSetItem", "client:component-export": "SeqSetItem" })}` : renderTemplate`${renderComponent($$result2, "ErrorFeedback", null, { "message": "Error while fetching seqSet citations: " + JSON.stringify(
    seqSetRecordsResponse.isErr() ? seqSetRecordsResponse.error : seqSetCitedByResponse.isErr() ? seqSetCitedByResponse.error : "unknown"
  ), "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`} </div> </div>` : renderTemplate`${renderComponent($$result2, "ErrorFeedback", null, { "message": "Error while fetching seqSet: " + JSON.stringify(seqSetResponse.isErr() ? seqSetResponse.error : "unknown"), "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`} </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/[seqSetId].[version].astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/[seqSetId].[version].astro";
const $$url = "/seqsets/[seqSetId].[version]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$seqSetId,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
