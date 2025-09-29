/* empty css                                          */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { c as cleanOrganism } from '../../../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { p as parseUrlSearchParams, a as performLapisSearchQueries, S as SearchFullUI } from '../../../../chunks/serversideSearch_bJQP6tsp.mjs';
import { $ as $$SubmissionPageWrapper } from '../../../../chunks/SubmissionPageWrapper_D7EtueRX.mjs';
import { a as getRuntimeConfig, j as getSchema, T as getReferenceGenomesSequenceNames, G as GROUP_ID_FIELD, v as versionStatuses, b as getWebsiteConfig, V as VERSION_STATUS_FIELD, f as dataUseTermsAreEnabled } from '../../../../chunks/config_CQtV1zSN.mjs';
import { g as getAccessToken } from '../../../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getGroupsAndCurrentGroup } from '../../../../chunks/submissionPages_DJJXYWxq.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$Released = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Released;
  const groupsResult = await getGroupsAndCurrentGroup(Astro2.params, Astro2.locals.session);
  if (groupsResult.isErr()) {
    return new Response(void 0, { status: groupsResult.error.status });
  }
  const { currentGroup: group } = groupsResult.value;
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
  const referenceGenomeSequenceNames = getReferenceGenomesSequenceNames(cleanedOrganism.key);
  const hiddenFieldValues = {
    [VERSION_STATUS_FIELD]: versionStatuses.latestVersion,
    [GROUP_ID_FIELD]: String(group.groupId)
  };
  const initialQueryDict = parseUrlSearchParams(Astro2.url.searchParams);
  const { data, totalCount } = await performLapisSearchQueries(
    initialQueryDict,
    schema,
    referenceGenomeSequenceNames,
    hiddenFieldValues,
    cleanedOrganism.key
  );
  const sequenceFlaggingConfig = getWebsiteConfig().sequenceFlagging;
  return renderTemplate`${renderComponent($$result, "SubmissionPageWrapper", $$SubmissionPageWrapper, { "groupsResult": groupsResult, "title": "Released sequences" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title px-3 py-2 ml-1">Search</h1> ${renderComponent($$result2, "SearchFullUI", SearchFullUI, { "client:load": true, "clientConfig": clientConfig, "organism": cleanedOrganism.key, "schema": schema, "myGroups": [group], "accessToken": accessToken, "referenceGenomesSequenceNames": referenceGenomeSequenceNames, "hiddenFieldValues": hiddenFieldValues, "initialData": data, "initialCount": totalCount, "initialQueryDict": initialQueryDict, "dataUseTermsEnabled": dataUseTermsAreEnabled(), "sequenceFlaggingConfig": sequenceFlaggingConfig, "showEditDataUseTermsControls": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SearchPage/SearchFullUI", "client:component-export": "SearchFullUI" })} ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/released.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/released.astro";
const $$url = "/[organism]/submission/[groupId]/released";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Released,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
