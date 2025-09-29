/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { c as createBackendClient } from '../../chunks/backendClientFactory_DhWS0NBG.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const PipelineStatisticsTable = ({ statistics }) => {
  const versions = Array.from(
    new Set(Object.values(statistics).flatMap((m) => Object.keys(m).map((v) => Number(v))))
  ).sort((a, b) => a - b);
  return /* @__PURE__ */ jsxs("table", { className: "table-auto border-collapse border border-gray-200 mt-4", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "border px-2 py-1", children: "Organism" }),
      versions.map((v) => /* @__PURE__ */ jsx("th", { className: "border px-2 py-1", children: v }, v))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: Object.entries(statistics).map(([organism, versionMap]) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { className: "border px-2 py-1 font-semibold", children: organism }),
      versions.map((v) => /* @__PURE__ */ jsx("td", { className: "border px-2 py-1 text-right", children: versionMap[v] }, v))
    ] }, organism)) })
  ] });
};

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const accessToken = getAccessToken(Astro2.locals.session);
  let statisticsResult;
  if (accessToken !== void 0) {
    statisticsResult = await createBackendClient().getPipelineStatistics(accessToken);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title mb-4">Admin dashboard</h1> ${accessToken === void 0 ? renderTemplate`<p>You must be logged in.</p>` : statisticsResult?.match(
    (statistics) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="mb-4">Processed sequence entries per pipeline version.</p> <div class="overflow-x-auto"> ${renderComponent($$result3, "PipelineStatisticsTable", PipelineStatisticsTable, { "statistics": statistics })} </div> ` })}`,
    (_error) => renderTemplate`<pre>Error: this may occur if you are not a superuser.</pre>`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/admin/dashboard.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Dashboard,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
