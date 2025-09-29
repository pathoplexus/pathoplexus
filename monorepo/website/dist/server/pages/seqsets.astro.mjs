/* empty css                                 */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { E as ErrorFeedback } from '../chunks/ErrorFeedback_TZcsGLkd.mjs';
import { S as SeqSetCitationClient, A as AuthorDetails, C as CitationPlot } from '../chunks/seqSetCitationClient_Dy6NbOXP.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useEffect, forwardRef } from 'react';
import { u as useClientFlag } from '../chunks/isClient_EhWp56WR.mjs';
import { r as routes } from '../chunks/routes_BftQyUXo.mjs';
import { F as ForwardRef$1, a as ForwardRef$2, B as BasicModal } from '../chunks/Modal_BU_T5B71.mjs';
import { P as Pagination } from '../chunks/Pagination_DxF1OMvg.mjs';
import { AxiosError } from 'axios';
import { capitalCase } from 'change-case';
import { toast } from 'react-toastify';
import { g as getClientLogger } from '../chunks/clientLogger_iKuJ-UyB.mjs';
import { S as SeqSetRecordType, s as seqSetCitationClientHooks } from '../chunks/serviceHooks_DslcN1kS.mjs';
import { a as createAuthorizationHeader } from '../chunks/backendClientFactory_DhWS0NBG.mjs';
import { w as withQueryProvider } from '../chunks/withQueryProvider_BqTp-ccD.mjs';
import { $ as $$NeedToLogin } from '../chunks/NeedToLogin_BSx56War.mjs';
import { a6 as seqSetsAreEnabled, a as getRuntimeConfig } from '../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
import { K as KeycloakClientManager } from '../chunks/getAuthUrl_CP-cK5RK.mjs';
import { g as getAccessToken } from '../chunks/getAccessToken_D0lD1so3.mjs';
import { u as urlForKeycloakAccountPage } from '../chunks/urlForKeycloakAccountPage_BNHL3x2Q.mjs';
export { renderers } from '../renderers.mjs';

const SeqSetListHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const headCells = [
    {
      id: "createdAt",
      label: "Last Updated"
    },
    {
      id: "name",
      label: "Name"
    },
    {
      id: "seqSetVersion",
      label: "Version"
    },
    {
      id: "seqSetDOI",
      label: "DOI"
    }
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsx("tr", { children: headCells.map((headCell, index) => /* @__PURE__ */ jsx(
    "th",
    {
      className: `px-2 py-5 text-xs w-1/12 font-medium tracking-wider uppercase ${index === 0 ? "pl-6" : "last:pr-6 text-left"}`,
      children: /* @__PURE__ */ jsxs(
        "span",
        {
          className: `cursor-pointer ${orderBy === headCell.id ? "active" : ""}`,
          onClick: createSortHandler(headCell.id),
          children: [
            headCell.label,
            orderBy === headCell.id ? /* @__PURE__ */ jsx("span", { children: order === "desc" ? /* @__PURE__ */ jsx(ForwardRef$1, { className: "w-3 h-3 ml-1 inline" }) : /* @__PURE__ */ jsx(ForwardRef$2, { className: "w-3 h-3 ml-1 inline" }) }) : null
          ]
        }
      )
    },
    headCell.id
  )) }) });
};
const SeqSetList = ({ seqSets }) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const isClient = useClientFlag();
  const rowsPerPage = 5;
  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleClick = (_, seqSetId, seqSetVersion) => {
    window.location.href = routes.seqSetPage(seqSetId, seqSetVersion);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const getMaxPages = () => {
    return Math.ceil(seqSets.length / rowsPerPage);
  };
  const getComparator = (order2, orderBy2) => {
    if (orderBy2 === void 0) {
      return () => 0;
    }
    const descendingComparator = (a, b, orderBy3) => {
      if (b[orderBy3] < a[orderBy3]) {
        return -1;
      }
      if (b[orderBy3] > a[orderBy3]) {
        return 1;
      }
      return 0;
    };
    return order2 === "desc" ? (a, b) => descendingComparator(a, b, orderBy2) : (a, b) => -descendingComparator(a, b, orderBy2);
  };
  const emptyRows = page > 1 ? Math.max(0, page * rowsPerPage - seqSets.length) : 0;
  const visibleRows = useMemo(() => {
    return seqSets.sort(getComparator(order, orderBy)).slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [seqSets, order, orderBy, page, rowsPerPage]);
  const maxCellLength = 25;
  const truncateCell = (cell) => {
    if (cell === void 0 || cell === null) {
      return "N/A";
    }
    if (cell.length > maxCellLength) {
      return cell.substring(0, maxCellLength) + "...";
    }
    return cell;
  };
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };
  return /* @__PURE__ */ jsxs("div", { className: "shadow-md", children: [
    /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
      seqSets.length > 0 ? /* @__PURE__ */ jsx(
        SeqSetListHead,
        {
          order,
          orderBy,
          onRequestSort: handleRequestSort,
          rowCount: seqSets.length
        }
      ) : null,
      /* @__PURE__ */ jsxs("tbody", { className: "bg-white", children: [
        visibleRows.map((row, index) => {
          const labelId = `table-row-${index}`;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              id: labelId,
              className: "hover:bg-primary-100 border-gray-100 cursor-pointer",
              onClick: (event) => handleClick(event, row.seqSetId, row.seqSetVersion.toString()),
              "data-testid": isClient ? row.name : "disabled",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-2 whitespace-nowrap text-primary-900 pl-6", children: formatDate(row.createdAt) }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-2 text-primary-900 last:pr-6", children: truncateCell(row.name) }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-2 text-primary-900 last:pr-6", children: row.seqSetVersion }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-2 text-primary-900 last:pr-6", children: row.seqSetDOI !== void 0 ? truncateCell(row.seqSetDOI) : "N/A" })
              ]
            },
            `${row.seqSetId}.${row.seqSetVersion}`
          );
        }),
        emptyRows > 0 ? /* @__PURE__ */ jsx("tr", { style: { height: 40 * emptyRows }, children: /* @__PURE__ */ jsx("td", { colSpan: 8 }) }) : null
      ] })
    ] }),
    seqSets.length === 0 ? /* @__PURE__ */ jsx("p", { className: "px-8 py-8", children: " You have no SeqSets yet. " }) : /* @__PURE__ */ jsx(
      Pagination,
      {
        className: "py-4 w-full flex justify-center",
        page,
        count: getMaxPages(),
        color: "primary",
        variant: "outlined",
        shape: "rounded",
        onChange: handleChangePage
      }
    )
  ] });
};

const deserializeAccessionInput = (input, isFocal, type = SeqSetRecordType.loculus, delimiter = /[,\s]/) => {
  return input.split(delimiter).map((accession) => accession.trim()).filter(Boolean).map((accession) => ({ accession, type, isFocal }));
};
const serializeSeqSetRecords = (records, isFocal = true, delimiter = ",") => {
  if (!records || records.length === 0) {
    return "";
  }
  const filteredRecords = records.filter((record) => record.isFocal === isFocal);
  if (filteredRecords.length === 0) {
    return "";
  }
  return filteredRecords.map((record) => record.accession).join(`${delimiter} `);
};

const logger = getClientLogger("SeqSetForm");
const SeqSetForm = ({ clientConfig, accessToken, editSeqSet, editSeqSetRecords }) => {
  const [seqSetName, setSeqSetName] = useState(editSeqSet?.name ?? "");
  const [seqSetNameValidation, setSeqSetNameValidation] = useState("");
  const [seqSetDescription, setSeqSetDescription] = useState(editSeqSet?.description ?? "");
  const [focalAccessionsInput, setFocalAccessionsInput] = useState(serializeSeqSetRecords(editSeqSetRecords, true));
  const [backgroundAccessionsInput, setBackgroundAccessionsInput] = useState(
    serializeSeqSetRecords(editSeqSetRecords, false)
  );
  const [seqSetRecordValidation, setSeqSetRecordValidation] = useState("");
  const { createSeqSet, updateSeqSet, validateSeqSetRecords, isLoading } = useActionHooks(
    clientConfig,
    accessToken,
    (message) => toast.error(message, { position: "top-center", autoClose: false }),
    setSeqSetRecordValidation
  );
  useEffect(() => {
    const validationDelay = setTimeout(() => {
      const seqSetRecords = [
        ...deserializeAccessionInput(focalAccessionsInput, true),
        ...deserializeAccessionInput(backgroundAccessionsInput, false)
      ];
      if (seqSetRecords.length === 0) {
        setSeqSetRecordValidation("");
        return;
      }
      validateSeqSetRecords(seqSetRecords);
    }, 1e3);
    return () => clearTimeout(validationDelay);
  }, [focalAccessionsInput, backgroundAccessionsInput, validateSeqSetRecords]);
  const setAccessionInput = (accessionInput, isFocal) => {
    if (isFocal) {
      setFocalAccessionsInput(accessionInput);
    } else {
      setBackgroundAccessionsInput(accessionInput);
    }
  };
  const getSeqSetFromInput = () => {
    return {
      name: seqSetName,
      description: seqSetDescription,
      records: [
        ...deserializeAccessionInput(focalAccessionsInput, true),
        ...deserializeAccessionInput(backgroundAccessionsInput, false)
      ]
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const seqSet = getSeqSetFromInput();
    if (seqSet.name === "") {
      setSeqSetNameValidation("SeqSet name is required");
      return;
    }
    if (focalAccessionsInput === "" && backgroundAccessionsInput === "") {
      setSeqSetRecordValidation("At least one Loculus accession is required");
      return;
    }
    if (editSeqSet !== void 0) {
      updateSeqSet({
        seqSetId: editSeqSet.seqSetId,
        ...seqSet
      });
    } else {
      createSeqSet(seqSet);
    }
  };
  const getTextAreaStyles = (validationMessage = "") => {
    if (validationMessage === "") {
      return "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    }
    return "block w-full p-4 text-gray-900 border border-red-300 rounded-lg bg-gray-50 text-base focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
  };
  const getInputFieldStyles = (validationMessage = "") => {
    if (validationMessage === "") {
      return "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    }
    return "bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
  };
  const renderAccessionInputField = (isFocal) => {
    const isFocalStr = isFocal ? "focal" : "background";
    const accessionsInput = isFocal ? focalAccessionsInput : backgroundAccessionsInput;
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: `loculus-${isFocalStr}-accession-input`,
          className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
          children: `${isFocal ? "* " : ""}${capitalCase(isFocalStr)} accessions (separated by comma or whitespace)`
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: `loculus-${isFocalStr}-accession-input`,
          className: getTextAreaStyles(seqSetRecordValidation),
          value: accessionsInput,
          onChange: (event) => {
            setAccessionInput(event.target.value, isFocal);
          },
          rows: 4,
          cols: 40
        }
      )
    ] }, `loculus-${isFocalStr}-input`) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center  overflow-auto-y w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-start items-center py-5", children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold py-4", children: `${editSeqSet ? "Edit" : "Create a"} SeqSet` }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-lg w-full", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "seqSet-name",
            className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            children: "* SeqSet name"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "seqSet-name",
            className: getInputFieldStyles(seqSetNameValidation),
            value: seqSetName,
            onChange: (e) => {
              setSeqSetName(e.target.value);
              setSeqSetNameValidation("");
            },
            maxLength: 255,
            required: true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pb-6 max-w-md w-full", children: /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm italic", children: seqSetNameValidation }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "seqSet-description",
            className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            children: "SeqSet description"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "seqSet-description",
            className: getInputFieldStyles(),
            value: seqSetDescription,
            onChange: (e) => {
              setSeqSetDescription(e.target.value);
            },
            maxLength: 255
          }
        )
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold py-4", children: "Accessions" }),
      renderAccessionInputField(true),
      renderAccessionInputField(false),
      /* @__PURE__ */ jsx("div", { className: "max-w-md w-full", children: seqSetRecordValidation !== "" ? /* @__PURE__ */ jsx("p", { className: "pb-4 text-red-500 text-sm italic", children: seqSetRecordValidation }) : null }),
      /* @__PURE__ */ jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxs("span", { className: "label-text", children: [
        "Review",
        /* @__PURE__ */ jsx("a", { href: routes.datauseTermsPage(), target: "_blank", className: "underline ml-1", children: "data use terms" }),
        "."
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "flex items-center btn loculusColor text-white hover:bg-primary-700",
        disabled: isLoading || seqSetRecordValidation !== "" || seqSetNameValidation !== "",
        onClick: handleSubmit,
        children: isLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm mr-2 relative top-1" }) : "Save"
      }
    )
  ] });
};
function useActionHooks(clientConfig, accessToken, openErrorFeedback, setSeqSetRecordValidation) {
  const hooks = seqSetCitationClientHooks(clientConfig);
  const create = hooks.useCreateSeqSet(
    { headers: createAuthorizationHeader(accessToken) },
    {
      onSuccess: async (response) => {
        await logger.info(`Successfully created seqSet with seqSetId: ${response.seqSetId}`);
        const redirectUrl = `/seqsets/${response.seqSetId}.${response.seqSetVersion}`;
        location.href = redirectUrl;
      },
      onError: async (error) => {
        await logger.info(`Failed to create seqSet. Error: '${JSON.stringify(error)})}'`);
        if (error instanceof AxiosError) {
          const responseData = error.response?.data;
          if (responseData !== void 0) {
            openErrorFeedback(`Failed to create seqSet. ${responseData.title}. ${responseData.detail}`);
          }
        }
      }
    }
  );
  const update = hooks.useUpdateSeqSet(
    { headers: createAuthorizationHeader(accessToken) },
    {
      onSuccess: async (response) => {
        await logger.info(`Successfully updated seqSet with seqSetId: ${response.seqSetId}`);
        const redirectUrl = `/seqsets/${response.seqSetId}.${response.seqSetVersion}`;
        location.href = redirectUrl;
      },
      onError: async (error) => {
        await logger.info(`Failed to update seqSet. Error: '${JSON.stringify(error)})}'`);
        if (error instanceof AxiosError) {
          const responseData = error.response?.data;
          if (responseData !== void 0) {
            openErrorFeedback(`Failed to update seqSet. ${responseData.title}. ${responseData.detail}`);
          }
        }
      }
    }
  );
  const validateRecords = hooks.useValidateSeqSetRecords(
    { headers: createAuthorizationHeader(accessToken) },
    {
      onSuccess: () => {
        setSeqSetRecordValidation("");
      },
      onError: async (error) => {
        await logger.info(`Failed to validate seqSet records. Error: '${JSON.stringify(error)})}'`);
        if (error instanceof AxiosError && error.response?.data !== void 0) {
          const responseData = error.response.data;
          const message = `${responseData.title}. ${responseData.detail}`;
          setSeqSetRecordValidation(message);
        }
      }
    }
  );
  return {
    createSeqSet: create.mutate,
    updateSeqSet: update.mutate,
    validateSeqSetRecords: validateRecords.mutate,
    isLoading: create.isLoading || update.isLoading
  };
}

const icBaselineLibraryAdd = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-1 9h-4v4h-2v-4H9V9h4V5h2v4h4z" }) });
const ForwardRef = forwardRef(icBaselineLibraryAdd);

const SeqSetListActionsInner = ({ clientConfig, accessToken }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "pl-2 ml-auto", children: /* @__PURE__ */ jsxs(
      "button",
      {
        "data-testid": "AddIcon",
        className: "btn btn-sm loculusColor text-white flex items-center gap-1",
        onClick: () => setCreateModalVisible(true),
        children: [
          /* @__PURE__ */ jsx(ForwardRef, { fontSize: "large" }),
          "Create SeqSet"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(BasicModal, { isModalVisible: createModalVisible, setModalVisible: setCreateModalVisible, children: /* @__PURE__ */ jsx(SeqSetForm, { clientConfig, accessToken }) })
  ] });
};
const SeqSetListActions = withQueryProvider(SeqSetListActionsInner);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (!seqSetsAreEnabled()) {
    return Astro2.rewrite("/404");
  }
  const session = Astro2.locals.session;
  const accessToken = getAccessToken(session);
  const username = session.user?.username ?? "";
  const clientConfig = getRuntimeConfig().public;
  const seqSetClient = SeqSetCitationClient.create();
  const keycloakClient = await KeycloakClientManager.getClient();
  const seqSetsResponse = await seqSetClient.getSeqSetsOfUser(accessToken);
  const authorResponse = await seqSetClient.getAuthor(username);
  const editAccountUrl = urlForKeycloakAccountPage(keycloakClient) + "/#/personal-info";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "SeqSets", "data-testid": "seqSets-list-container" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center items-center"> ${!accessToken ? renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": "You need to be logged in to create new SeqSets." })}` : renderTemplate`<div class="flex flex-row justify-center w-5/6 divide-x max-w-7xl"> <div class="w-3/4 flex flex-col justify-start"> ${authorResponse.match(
    (authorProfile) => renderTemplate`${renderComponent($$result2, "AuthorDetails", AuthorDetails, { "displayFullDetails": true, "firstName": authorProfile.firstName, "lastName": authorProfile.lastName, "emailDomain": authorProfile.emailDomain, "university": authorProfile.university, "editAccountUrl": editAccountUrl })}`,
    (error) => renderTemplate`${renderComponent($$result2, "ErrorFeedback", ErrorFeedback, { "message": "Error while fetching author profile: " + JSON.stringify(error), "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`
  )} <hr> <div class="flex justify-start"> <div class="w-11/12"> <div class="flex justify-between items-center py-8"> <h1 class="text-2xl font-semibold">SeqSets</h1> ${renderComponent($$result2, "SeqSetListActions", SeqSetListActions, { "clientConfig": clientConfig, "accessToken": accessToken, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SeqSetCitations/SeqSetListActions", "client:component-export": "SeqSetListActions" })} </div> <div> <p>
SeqSets are collections of sequences with a unique identifier that can be used
                                        to reference that set of sequences. SeqSets can also be used to generate DOIs,
                                        which can in turn be used in publications, public communications etc.
</p> <p class="py-4">
You can learn how to generate SeqSets
<a href="/docs/how-to/generate-seqset" class="text-primary-700  opacity-90">
here.
</a> </p> </div> <div> ${seqSetsResponse.match(
    (seqSets) => renderTemplate`${renderComponent($$result2, "SeqSetList", SeqSetList, { "seqSets": seqSets, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SeqSetCitations/SeqSetList", "client:component-export": "SeqSetList" })}`,
    (error) => renderTemplate`${renderComponent($$result2, "ErrorFeedback", ErrorFeedback, { "message": "Error while fetching seqSets: " + JSON.stringify(error), "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/ErrorFeedback", "client:component-export": "ErrorFeedback" })}`
  )} </div> </div> </div> </div> <div class="w-1/4 flex flex-col justify-start items-start pl-4"> <span class="text-xl">Cited by</span>  <div> ${renderComponent($$result2, "CitationPlot", CitationPlot, { "citedByData": { years: [2020, 2021, 2022, 2023, 2024], citations: [0, 0, 0, 0, 0] }, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SeqSetCitations/CitationPlot", "client:component-export": "CitationPlot" })} <p class="text-sm text-center text-gray-500 my-4 ml-8 max-w-64">
Number of times your sequences have been cited in publications
</p> </div> </div> </div>`} </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/index.astro";
const $$url = "/seqsets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
