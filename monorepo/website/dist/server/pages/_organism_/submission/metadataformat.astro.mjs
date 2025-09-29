/* empty css                                       */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
/* empty css                                                  */
import { c as cleanOrganism } from '../../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { O as OrganismMetadataTable } from '../../../chunks/OrganismMetadataTable_XPem5HTs.mjs';
import { h as getGroupedInputFields, j as getSchema } from '../../../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_C5Fsgcd-.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Metadataformat = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Metadataformat;
  const organism = cleanOrganism(Astro2.params.organism).organism;
  const organismMetadata = {
    key: organism.key,
    displayName: organism.displayName,
    metadata: getSchema(organism.key).metadata,
    groupedInputFields: getGroupedInputFields(organism.key, "submit")
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Metadata format for submissions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title">Metadata format for submissions</h1> <div class="mdContainer mdContainerItself"> ${renderComponent($$result2, "OrganismMetadataTable", OrganismMetadataTable, { "organism": organismMetadata, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/OrganismMetadataTable/OrganismMetadataTable", "client:component-export": "OrganismMetadataTable" })} </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/metadataformat.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/metadataformat.astro";
const $$url = "/[organism]/submission/metadataformat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Metadataformat,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
