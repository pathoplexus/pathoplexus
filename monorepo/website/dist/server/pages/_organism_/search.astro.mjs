/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { c as cleanOrganism } from '../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { p as parseUrlSearchParams, a as performLapisSearchQueries, S as SearchFullUI } from '../../chunks/serversideSearch_bJQP6tsp.mjs';
import { a as getRuntimeConfig, j as getSchema, T as getReferenceGenomesSequenceNames, b as getWebsiteConfig, v as versionStatuses, I as IS_REVOCATION_FIELD, V as VERSION_STATUS_FIELD, f as dataUseTermsAreEnabled } from '../../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getMyGroups } from '../../chunks/getMyGroups_4YrIOtp2.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const hiddenFieldValues = {
    [VERSION_STATUS_FIELD]: versionStatuses.latestVersion,
    [IS_REVOCATION_FIELD]: "false"
  };
  const { organism: cleanedOrganism } = cleanOrganism(Astro2.params.organism);
  if (!cleanedOrganism) {
    return {
      statusCode: 404,
      body: "Organism not found"
    };
  }
  const clientConfig = getRuntimeConfig().public;
  const schema = getSchema(cleanedOrganism.key);
  const accessToken = getAccessToken(Astro2.locals.session);
  const myGroups = accessToken !== void 0 ? await getMyGroups(accessToken) : [];
  const referenceGenomeSequenceNames = getReferenceGenomesSequenceNames(cleanedOrganism.key);
  const initialQueryDict = parseUrlSearchParams(Astro2.url.searchParams);
  const { data, totalCount } = await performLapisSearchQueries(
    initialQueryDict,
    schema,
    referenceGenomeSequenceNames,
    hiddenFieldValues,
    cleanedOrganism.key
  );
  const sequenceFlaggingConfig = getWebsiteConfig().sequenceFlagging;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${cleanedOrganism.displayName} - Browse`, "noHorizontalPadding": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title px-3 py-2 ml-1">Search</h1> ${renderComponent($$result2, "SearchFullUI", SearchFullUI, { "client:load": true, "clientConfig": clientConfig, "organism": cleanedOrganism.key, "schema": schema, "myGroups": myGroups, "accessToken": accessToken, "referenceGenomesSequenceNames": referenceGenomeSequenceNames, "hiddenFieldValues": hiddenFieldValues, "initialData": data, "initialCount": totalCount, "initialQueryDict": initialQueryDict, "dataUseTermsEnabled": dataUseTermsAreEnabled(), "sequenceFlaggingConfig": sequenceFlaggingConfig, "linkOuts": schema.linkOuts, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SearchPage/SearchFullUI", "client:component-export": "SearchFullUI" })} ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/search/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/search/index.astro";
const $$url = "/[organism]/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
