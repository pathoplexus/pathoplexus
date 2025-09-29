/* empty css                                       */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from '../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$SubmissionPageWrapper } from '../../../chunks/SubmissionPageWrapper_D7EtueRX.mjs';
import { r as routes } from '../../../chunks/routes_BftQyUXo.mjs';
import { c as createBackendClient } from '../../../chunks/backendClientFactory_DhWS0NBG.mjs';
import { g as getAccessToken } from '../../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getGroupsAndCurrentGroup } from '../../../chunks/submissionPages_DJJXYWxq.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
export { renderers } from '../../../renderers.mjs';

const f7Arrow2Circlepath = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 56 56", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M53.949 26.303h-3.087c-1.24-11.47-11.11-20.597-22.873-20.597c-6.851 0-13.07 3.11-17.307 8c-.857.97-.722 2.163.157 2.794c.902.631 1.96.429 2.705-.405a19.12 19.12 0 0 1 14.445-6.558a19.074 19.074 0 0 1 18.997 16.766h-3.358c-1.6 0-2.028 1.082-1.15 2.321l5.026 7.189c.721 1.037 1.803 1.06 2.547 0l5.047-7.166c.902-1.262.474-2.344-1.149-2.344m-51.898 4.8h3.087c1.24 11.47 11.11 20.575 22.85 20.575c6.896 0 13.116-3.133 17.353-8c.811-.97.698-2.186-.158-2.817c-.901-.631-1.96-.406-2.704.428c-3.47 4.034-8.654 6.558-14.49 6.558A19.05 19.05 0 0 1 9.014 31.103h3.358c1.6 0 2.028-1.104 1.15-2.32l-5.049-7.19c-.72-1.036-1.78-1.059-2.524 0L.901 28.76C0 30 .428 31.104 2.051 31.104" }) });
const ForwardRef$3 = forwardRef(f7Arrow2Circlepath);

const ggCheckO = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "currentColor", children: [
  /* @__PURE__ */ jsx("path", { d: "M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z" }),
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18", clipRule: "evenodd" })
] }) });
const ForwardRef$2 = forwardRef(ggCheckO);

const icOutlineUpload = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M9 16h6v-6h4l-7-7l-7 7h4zm3-10.17L14.17 8H13v6h-2V8H9.83zM5 18h14v2H5z" }) });
const ForwardRef$1 = forwardRef(icOutlineUpload);

const mdiViewListOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M3 5v14h17V5zm4 2v2H5V7zm-2 6v-2h2v2zm0 2h2v2H5zm13 2H9v-2h9zm0-4H9v-2h9zm0-4H9V7h9z" }) });
const ForwardRef = forwardRef(mdiViewListOutline);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = Astro2.locals.session;
  const organism = Astro2.params.organism;
  const accessToken = getAccessToken(session);
  const groupsResult = await getGroupsAndCurrentGroup(Astro2.params, Astro2.locals.session);
  async function getSequenceCounts(organism2, groupId) {
    const backendClient = createBackendClient();
    try {
      const response = await backendClient.getSequences(accessToken, organism2, {
        groupIdsFilter: groupId.toString(),
        // We only need the counts, so we can set the page and size to 0
        // to avoid fetching the actual sequences (slow part of the endpoint)
        page: 0,
        size: 0
      });
      if (response.isErr()) {
        throw new Error("Failed to fetch sequences");
      }
      const statusCounts = response.value.statusCounts;
      const { APPROVED_FOR_RELEASE, ...others } = statusCounts;
      const othersTotal = Object.values(others).reduce((sum, count) => sum + count, 0);
      const approvedTotal = APPROVED_FOR_RELEASE || 0;
      return { othersTotal, approvedTotal };
    } catch (_) {
      return { othersTotal: -1, approvedTotal: -1 };
    }
  }
  return renderTemplate`${renderComponent($$result, "SubmissionPageWrapper", $$SubmissionPageWrapper, { "title": "Submission portal", "groupsResult": groupsResult }, { "default": async ($$result2) => renderTemplate`${groupsResult.match(
    async ({ currentGroup: group }) => {
      const { othersTotal, approvedTotal } = await getSequenceCounts(organism, group.groupId);
      const options = [
        {
          title: "Submit",
          description: "Upload new sequences.",
          route: routes.submitPage(organism, group.groupId),
          icon: ForwardRef$1
        },
        {
          title: "Revise",
          description: "Upload revisions for existing sequences.",
          route: routes.revisePage(organism, group.groupId),
          icon: ForwardRef$3
        },
        {
          title: "Review",
          description: "Review your group's unreleased submissions.",
          route: routes.userSequenceReviewPage(organism, group.groupId),
          icon: ForwardRef$2,
          count: othersTotal,
          countClass: "text-primary-600 font-semibold",
          countType: "awaiting review"
        },
        {
          title: "View",
          description: "View your group's released sequences.",
          route: routes.mySequencesPage(organism, group.groupId),
          icon: ForwardRef,
          count: approvedTotal,
          countClass: "text-gray-500 hidden"
        }
      ];
      return renderTemplate`${maybeRenderHead()}<div class="max-w-2xl mx-auto p-8"> <div class="flex flex-wrap"> ${options.map((option) => renderTemplate`<a${addAttribute(option.route, "href")} class="block rounded border border-gray-300 p-8 m-2 w-64 text-center hover:bg-gray-100 hover:no-underline"> <h3 class="font-semibold text-gray-700 mb-3"> ${renderComponent($$result2, "option.icon", option.icon, { "className": "inline-block w-5 h-5 mr-1.5" })} ${option.title} </h3> <p class="text-gray-700 text-sm">${option.description}</p> ${option.count !== void 0 && option.count > 0 && renderTemplate`<p${addAttribute(`text-sm mt-2 ${option.countClass || ""}`, "class")}> ${option.count} sequences${" "} ${option.countType !== void 0 ? option.countType : ""} </p>`} </a>`)} </div> </div>`;
    },
    () => void 0
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/index.astro";
const $$url = "/[organism]/submission/[groupId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
