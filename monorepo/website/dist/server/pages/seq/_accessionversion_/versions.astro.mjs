/* empty css                                       */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from '../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { g as getVersionsData } from '../../../chunks/getVersionsData_D3D9XUZa.mjs';
import { E as ErrorBox } from '../../../chunks/ErrorBox_Du3rMPgb.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { r as routes } from '../../../chunks/routes_BftQyUXo.mjs';
import { p as parseAccessionVersionFromString, g as getAccessionVersionString, e as extractAccessionVersion } from '../../../chunks/extractAccessionVersion_CIVou_Oi.mjs';
import { g as getVersionStatusLabel, a as getVersionStatusColor } from '../../../chunks/getVersionStatusColor_CfRIEGJ4.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Versions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Versions;
  const accessionVersion = Astro2.params.accessionVersion;
  const { accession } = parseAccessionVersionFromString(accessionVersion);
  const { organism, versionListResult } = await getVersionsData(accession);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": accession + " versions", "implicitOrganism": organism }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row pb-2"> <h1 class="title">Versions for accession ${accession}</h1> </div> <ul class="p-3"> ${versionListResult.match(
    (list) => {
      return list.map((version) => renderTemplate`<li class="mb-4"> <div class="mb-2"> <div class="font-semibold">${version.submittedAtTimestamp}</div> <div class="flex flex-row gap-3 justify-start"> <a${addAttribute(routes.sequenceEntryDetailsPage(
        getAccessionVersionString(extractAccessionVersion(version))
      ), "href")} class="hover:no-underline"> ${getAccessionVersionString(extractAccessionVersion(version))} </a> <p${addAttribute(`${getVersionStatusColor(version.versionStatus, version.isRevocation)} ml-2`, "class")}> ${getVersionStatusLabel(version.versionStatus, version.isRevocation)} </p> </div> </div> </li>`);
    },
    (error) => {
      return renderTemplate`${renderComponent($$result2, "ErrorBox", ErrorBox, { "title": "Request for sequence history failed" }, { "default": async ($$result3) => renderTemplate`${error}` })}`;
    }
  )} </ul> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seq/[accessionVersion]/versions.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seq/[accessionVersion]/versions.astro";
const $$url = "/seq/[accessionVersion]/versions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Versions,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
