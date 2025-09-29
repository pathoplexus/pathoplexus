/* empty css                                          */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate } from '../../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { c as cleanOrganism } from '../../../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { toast } from 'react-toastify';
import { D as DataUploadForm } from '../../../../chunks/DataUploadForm_CcXTJqEA.mjs';
import { r as routes } from '../../../../chunks/routes_BftQyUXo.mjs';
import { T as getReferenceGenomesSequenceNames, j as getSchema, h as getGroupedInputFields, a as getRuntimeConfig, f as dataUseTermsAreEnabled } from '../../../../chunks/config_CQtV1zSN.mjs';
import { $ as $$SubmissionPageWrapper } from '../../../../chunks/SubmissionPageWrapper_D7EtueRX.mjs';
import { g as getAccessToken } from '../../../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getGroupsAndCurrentGroup } from '../../../../chunks/submissionPages_DJJXYWxq.mjs';
export { renderers } from '../../../../renderers.mjs';

const SubmissionForm = ({
  accessToken,
  organism,
  clientConfig,
  group,
  inputMode,
  referenceGenomeSequenceNames,
  metadataTemplateFields,
  submissionDataTypes,
  dataUseTermsEnabled
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsx(
    DataUploadForm,
    {
      accessToken,
      organism,
      referenceGenomeSequenceNames,
      metadataTemplateFields,
      clientConfig,
      action: "submit",
      inputMode,
      onError: (message) => toast.error(message, { position: "top-center", autoClose: false }),
      group,
      onSuccess: () => {
        window.location.href = routes.userSequenceReviewPage(organism, group.groupId);
      },
      submissionDataTypes,
      dataUseTermsEnabled
    }
  ) });
};

const $$Astro = createAstro();
const $$Submit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Submit;
  const organism = Astro2.params.organism;
  const { organism: cleanedOrganism } = cleanOrganism(Astro2.params.organism);
  const inputMode = Astro2.url.searchParams.get("inputMode") === "form" ? "form" : "bulk";
  const title = inputMode === "bulk" ? "Submit sequences" : "Submit sequence";
  if (!cleanedOrganism) {
    return {
      statusCode: 404,
      body: "Organism not found"
    };
  }
  const referenceGenomeSequenceNames = getReferenceGenomesSequenceNames(cleanedOrganism.key);
  const schema = getSchema(cleanedOrganism.key);
  const groupedInputFields = getGroupedInputFields(cleanedOrganism.key, "submit", true);
  const groupsResult = await getGroupsAndCurrentGroup(Astro2.params, Astro2.locals.session);
  const clientConfig = getRuntimeConfig().public;
  Astro2.response.headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
  Astro2.response.headers.append("Pragma", "no-cache");
  Astro2.response.headers.append("Expires", "0");
  return renderTemplate`${renderComponent($$result, "SubmissionPageWrapper", $$SubmissionPageWrapper, { "title": title, "disablePageTitle": true, "groupsResult": groupsResult }, { "default": async ($$result2) => renderTemplate`${groupsResult.match(
    ({ currentGroup: group }) => renderTemplate`${renderComponent($$result2, "SubmissionForm", SubmissionForm, { "accessToken": getAccessToken(Astro2.locals.session), "referenceGenomeSequenceNames": referenceGenomeSequenceNames, "metadataTemplateFields": groupedInputFields, "organism": organism, "clientConfig": clientConfig, "group": group, "inputMode": inputMode, "submissionDataTypes": schema.submissionDataTypes, "dataUseTermsEnabled": dataUseTermsAreEnabled(), "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Submission/SubmissionForm", "client:component-export": "SubmissionForm" })}`,
    () => void 0
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/submit.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/[groupId]/submit.astro";
const $$url = "/[organism]/submission/[groupId]/submit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Submit,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
