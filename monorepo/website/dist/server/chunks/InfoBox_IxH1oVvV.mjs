import { a as createComponent, m as maybeRenderHead, r as renderComponent, e as renderSlot, b as renderTemplate } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { F as ForwardRef } from './info-outline_DvO6qTrv.mjs';
/* empty css                             */

const $$InfoBox = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-primary-200 p-3 my-4 rounded-lg mx-auto box text-sm info-box-link"> <span class="text-base inline-flex items-center"> <span class="inline-block mr-2"> ${renderComponent($$result, "MaterialSymbolsInfoOutline", ForwardRef, {})} </span>
Note
</span> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/asides/InfoBox.astro", void 0);

export { $$InfoBox as $ };
