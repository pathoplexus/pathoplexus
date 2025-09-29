/* empty css                                 */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
export { renderers } from '../renderers.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Internal server error" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bc"> <h1 class="title">An error occurred</h1> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/500.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$500,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
