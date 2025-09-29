import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { e as seqSetCitationApi } from './serviceHooks_DslcN1kS.mjs';
import { Z as ZodiosWrapperClient } from './zodiosWrapperClient_B5oplz-4.mjs';
import { a as getRuntimeConfig } from './config_CQtV1zSN.mjs';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';
import { a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';

const icBaselineAccountCircle = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20" }) });
const ForwardRef$1 = forwardRef(icBaselineAccountCircle);

const icBaselineEdit = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" }) });
const ForwardRef = forwardRef(icBaselineEdit);

const AuthorDetails = ({
  displayFullDetails,
  firstName,
  lastName,
  emailDomain,
  university,
  editAccountUrl
}) => {
  const renderName = () => {
    return [firstName, lastName].filter((name) => name !== null).join(" ");
  };
  const renderEmail = () => {
    if (emailDomain === null) {
      return "Unknown email";
    }
    return `Registered email @${emailDomain}`;
  };
  const renderPartialDetails = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center text-sm text-gray-500", children: [
    /* @__PURE__ */ jsx(ForwardRef$1, { fontSize: 20, className: "mr-1" }),
    /* @__PURE__ */ jsx("span", { children: renderName() })
  ] });
  const renderFullDetails = () => /* @__PURE__ */ jsxs("div", { className: "flex self-start my-4 flex-row", children: [
    /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(ForwardRef$1, { fontSize: 120 }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col pl-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-start items-center pt-2 pb-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "flex text-xl font-semibold pr-2", children: renderName() }),
        editAccountUrl !== null ? /* @__PURE__ */ jsx("a", { href: editAccountUrl, "data-testid": "EditIcon", className: "btn btn-sm btn-circle btn-ghost", children: /* @__PURE__ */ jsx(ForwardRef, { fontSize: "large" }) }) : null
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "flex text-base", children: university !== null && university !== "" ? university : "Unknown affiliation" }),
      renderEmail()
    ] })
  ] });
  return /* @__PURE__ */ jsx("div", { children: displayFullDetails ? renderFullDetails() : renderPartialDetails() });
};

const CitationPlot = ({ citedByData }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    setIsRegistered(true);
  }, []);
  if (!isRegistered) {
    return null;
  }
  const emptyCitedByData = {
    years: [2020, 2021, 2022, 2023, 2024],
    citations: [0, 0, 0, 0, 0]
  };
  const renderData = citedByData.years.length > 0 ? citedByData : emptyCitedByData;
  return /* @__PURE__ */ jsx(
    Bar,
    {
      data: {
        labels: renderData.years,
        datasets: [
          {
            data: renderData.citations,
            label: "Citation count",
            backgroundColor: "#54858c"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
          title: {
            display: true
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            suggestedMax: 10,
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        }
      }
    }
  );
};

const myLogger = getInstanceLogger("SeqSetCitationClient");
class SeqSetCitationClient extends ZodiosWrapperClient {
  static create(backendUrl = getRuntimeConfig().serverSide.backendUrl, logger = myLogger) {
    return new SeqSetCitationClient(
      backendUrl,
      seqSetCitationApi,
      (axiosError) => axiosError.data,
      // eslint-disable-line @typescript-eslint/no-unsafe-return
      logger,
      "backend"
    );
  }
  getSeqSetsOfUser(accessToken) {
    return this.call("getSeqSetsOfUser", {
      headers: createAuthorizationHeader(accessToken)
    });
  }
  getUserCitedBy(username, accessToken) {
    return this.call("getUserCitedBy", {
      params: { username },
      headers: createAuthorizationHeader(accessToken)
    });
  }
  getAuthor(username) {
    return this.call("getAuthor", { params: { username } });
  }
}

export { AuthorDetails as A, CitationPlot as C, SeqSetCitationClient as S };
