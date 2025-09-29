/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { g as getOrganismStatisticsMap } from '../../chunks/getOrganismStatistics_iE8getmN.mjs';
import { N as NeedAGroup } from '../../chunks/NeedAGroup_DaLcrCWB.mjs';
import { $ as $$NeedToLogin } from '../../chunks/NeedToLogin_BSx56War.mjs';
import { b as getWebsiteConfig, g as getConfiguredOrganisms } from '../../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { G as GroupManagementClient } from '../../chunks/groupManagementClient_DolhyIaL.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$redirectTo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$redirectTo;
  const purposes = {
    search: "to browse data"
  };
  if (getWebsiteConfig().enableSubmissionPages) {
    purposes.submission = "to access the submission portal";
  }
  if (Astro2.params.redirectTo === void 0 || !(Astro2.params.redirectTo in purposes)) {
    return Astro2.rewrite("/404");
  }
  const redirectTo = Astro2.params.redirectTo;
  const accessToken = getAccessToken(Astro2.locals.session);
  const groupsResult = await GroupManagementClient.create().getGroupsOfUser(accessToken);
  const myRoutes = {
    submission: routes.submissionPageWithoutGroup,
    search: routes.searchPage
  };
  const purpose = purposes[redirectTo];
  Astro2.response.headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
  Astro2.response.headers.append("Pragma", "no-cache");
  Astro2.response.headers.append("Expires", "0");
  const requiresLogin = redirectTo === "submission";
  const requiresGroup = redirectTo === "submission";
  const numberDaysAgoStatistics = 30;
  const configuredOrganisms = getConfiguredOrganisms();
  const organismStatisticsMap = await getOrganismStatisticsMap(
    configuredOrganisms.map((o) => o.key),
    numberDaysAgoStatistics
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Select organism" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto"> ${!accessToken && requiresLogin ? renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": `You need to be logged in to an account ${purpose}.` })}` : requiresGroup && (!groupsResult.isOk() || groupsResult.value.length === 0) ? renderTemplate`${renderComponent($$result2, "NeedAGroup", NeedAGroup, {})}` : renderTemplate`<section class="py-4"> <div class="mb-5 px-1"> <h2 class="text-base sm:text-lg font-medium text-slate-800">
Please select the organism for which you want ${purpose}:
</h2> </div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"> ${configuredOrganisms.map(({ key, displayName, image }) => {
    const stats = organismStatisticsMap.get(key);
    return renderTemplate`<a${addAttribute(myRoutes[redirectTo](key), "href")} class="group block rounded-2xl border border-base-200/70 bg-base-100 p-6 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 no-underline hover:no-underline"> <div class="flex items-start justify-between gap-4 min-w-0"> <div class="flex items-start gap-4 min-w-0"> ${image && renderTemplate`<img${addAttribute(image, "src")}${addAttribute(displayName, "alt")} class="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/30 transition-colors">`} <h3 class="text-lg font-medium text-slate-900 leading-6 whitespace-normal break-words pr-2"> ${displayName} </h3> </div> <div class="text-primary/70 text-xl transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary/80 flex-shrink-0">
→
</div> </div> ${redirectTo === "search" && renderTemplate`<div class="mt-4 text-slate-600"> <span class="text-xl font-semibold text-primary"> ${stats?.totalSequences ?? "\u2014"} </span> <span class="ml-2 text-xs text-slate-500">sequences</span> </div>`} </a>`;
  })} </div> </section>`} </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/organism-selector/[redirectTo].astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/organism-selector/[redirectTo].astro";
const $$url = "/organism-selector/[redirectTo]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$redirectTo,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
