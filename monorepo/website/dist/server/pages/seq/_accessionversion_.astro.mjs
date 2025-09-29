/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute, F as Fragment } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { f as findOrganismAndData } from '../../chunks/findOrganismAndData_GHO2AK25.mjs';
import { S as SequenceDetailsTableResultType } from '../../chunks/getSequenceDetailsTableData_D8N3JjGW.mjs';
import { g as getDataTableData, D as DataTableComponent, S as SequenceEntryHistoryMenu, a as SequenceDataUI, b as SequencesBanner } from '../../chunks/SequenceEntryHistoryMenu_BU5Rpt1P.mjs';
import { u as ACCESSION_VERSION_FIELD, A as ACCESSION_FIELD, I as IS_REVOCATION_FIELD, R as RELEASED_AT_FIELD, N as VERSION_COMMENT_FIELD, V as VERSION_STATUS_FIELD, S as SUBMITTED_AT_FIELD, O as SUBMITTER_FIELD, q as VERSION_FIELD, P as GROUP_NAME_FIELD, G as GROUP_ID_FIELD, Q as DATA_USE_TERMS_FIELD, a as getRuntimeConfig, b as getWebsiteConfig, T as getReferenceGenomesSequenceNames, j as getSchema } from '../../chunks/config_CQtV1zSN.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { F as ForwardRef$1 } from '../../chunks/baseline-download_B32u_4WX.mjs';
import { F as ForwardRef, $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { E as ErrorBox } from '../../chunks/ErrorBox_Du3rMPgb.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
import { g as getMyGroups } from '../../chunks/getMyGroups_4YrIOtp2.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$RevocationEntryDataTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$RevocationEntryDataTable;
  const { tableData, dataUseTermsHistory, referenceGenomeSequenceNames } = Astro2.props;
  const relevantFieldsForRevocationVersions = [
    ACCESSION_VERSION_FIELD,
    ACCESSION_FIELD,
    IS_REVOCATION_FIELD,
    RELEASED_AT_FIELD,
    VERSION_COMMENT_FIELD,
    VERSION_STATUS_FIELD,
    SUBMITTED_AT_FIELD,
    SUBMITTER_FIELD,
    VERSION_FIELD,
    GROUP_NAME_FIELD,
    GROUP_ID_FIELD,
    DATA_USE_TERMS_FIELD
  ];
  const relevantData = tableData.filter((entry) => relevantFieldsForRevocationVersions.includes(entry.name));
  const dataTableData = getDataTableData(relevantData);
  const reference = referenceGenomeSequenceNames.insdcAccessionFull;
  return renderTemplate`${renderComponent($$result, "DataTable", DataTableComponent, { "dataTableData": dataTableData, "dataUseTermsHistory": dataUseTermsHistory, "reference": reference })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SequenceDetailsPage/RevocationEntryDataTable.astro", void 0);

const $$Astro$1 = createAstro();
const $$SequencesDataTableTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SequencesDataTableTitle;
  const { sequenceEntryHistory, accessionVersion, showDownload } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between flex-wrap"> <div class="flex flex-row pb-6"> <h1 class="title">${accessionVersion}</h1> </div> <div class="pt-2"> ${sequenceEntryHistory !== void 0 && sequenceEntryHistory.length > 1 && renderTemplate`${renderComponent($$result, "SequenceEntryHistoryMenu", SequenceEntryHistoryMenu, { "sequenceEntryHistory": sequenceEntryHistory, "accessionVersion": accessionVersion })}`} ${showDownload && renderTemplate`<div class="inline-block dropdown dropdown-hover dropdown-end"> <label tabindex="0" class="hidden sm:block py-1 text-primary-700 cursor-pointer">
Download
<span class="text-primary"> ${" "} ${renderComponent($$result, "IwwaArrowDown", ForwardRef, { "className": "inline-block -mt-1 ml-1 h-4 w-4" })} </span> </label> <span tabindex="0" class="sm:hidden inline text-xl cursor-pointer"> ${renderComponent($$result, "IcBaselineDownload", ForwardRef$1, {})} </span> <ul class="dropdown-content z-20 menu p-1 shadow bg-base-100 rounded-btn top-full -left-44 sm:-left-24 w-52"> <li> <a${addAttribute(routes.sequenceEntryFastaPage(accessionVersion, true), "href")} class="block px-4 py-2 outlineButtonDropdownItem">
Download FASTA
</a> </li> <li> <a${addAttribute(routes.sequenceEntryTsvPage(accessionVersion, true), "href")} class="block px-4 py-2 outlineButtonDropdownItem">
Download metadata TSV
</a> </li> </ul> </div>`} </div> </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SequenceDetailsPage/SequencesDataTableTitle.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const accessionVersion = Astro2.params.accessionVersion;
  const sequenceDetailsTableData = await findOrganismAndData(accessionVersion);
  if (sequenceDetailsTableData.isOk() && sequenceDetailsTableData.value.result.type === SequenceDetailsTableResultType.REDIRECT) {
    return Astro2.redirect(sequenceDetailsTableData.value.result.redirectUrl);
  }
  const session = Astro2.locals.session;
  const accessToken = getAccessToken(session);
  const clientConfig = getRuntimeConfig().public;
  let myGroups = [];
  if (accessToken !== void 0) {
    myGroups = await getMyGroups(accessToken);
  }
  const sequenceFlaggingConfig = getWebsiteConfig().sequenceFlagging;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": sequenceDetailsTableData.isOk() ? accessionVersion : "Sequence not found", "implicitOrganism": sequenceDetailsTableData.isOk() ? sequenceDetailsTableData.value.organism : void 0 }, { "banner": async ($$result2) => renderTemplate`${sequenceDetailsTableData.isOk() && sequenceDetailsTableData.value.result.type === SequenceDetailsTableResultType.TABLE_DATA && renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result2, "SequencesBanner", SequencesBanner, { "sequenceEntryHistory": sequenceDetailsTableData.value.result.sequenceEntryHistory, "accessionVersion": accessionVersion })} </div>`}`, "default": async ($$result2) => renderTemplate`${sequenceDetailsTableData.match(
    ({ organism, result }) => {
      const showDownloadAndReport = result.type === SequenceDetailsTableResultType.TABLE_DATA && !result.isRevocation;
      return renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "SequencesDataTableTitle", $$SequencesDataTableTitle, { "accessionVersion": accessionVersion, "sequenceEntryHistory": result.type === SequenceDetailsTableResultType.TABLE_DATA ? result.sequenceEntryHistory : void 0, "showDownload": showDownloadAndReport })} ${result.type === SequenceDetailsTableResultType.TABLE_DATA && (result.isRevocation ? renderTemplate`${renderComponent($$result3, "RevocationEntryDataTable", $$RevocationEntryDataTable, { "tableData": result.tableData, "dataUseTermsHistory": result.dataUseTermsHistory, "referenceGenomeSequenceNames": getReferenceGenomesSequenceNames(organism) })}` : renderTemplate`${renderComponent($$result3, "SequenceDataUI", SequenceDataUI, { "tableData": result.tableData, "organism": organism, "referenceGenomeSequenceNames": getReferenceGenomesSequenceNames(organism), "accessionVersion": accessionVersion, "dataUseTermsHistory": result.dataUseTermsHistory, "schema": getSchema(organism), "clientConfig": clientConfig, "myGroups": myGroups, "accessToken": accessToken, "sequenceFlaggingConfig": showDownloadAndReport ? sequenceFlaggingConfig : void 0, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/SequenceDetailsPage/SequenceDataUI.tsx", "client:component-export": "SequenceDataUI" })}`)}` })}`;
    },
    () => renderTemplate`${renderComponent($$result2, "ErrorBox", ErrorBox, { "title": "Sequence entry not found" }, { "default": async ($$result3) => renderTemplate`
No data found for accession version ${accessionVersion}` })}`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seq/[accessionVersion]/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seq/[accessionVersion]/index.astro";
const $$url = "/seq/[accessionVersion]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
