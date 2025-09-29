/* empty css                                 */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { capitalCase } from 'change-case';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$503 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$503;
  const allowedServiceNames = ["authentication"];
  const serviceParam = Astro2.url.searchParams.get("service");
  let service = "Internal";
  let bodyService = "internal service you are trying to access";
  if (serviceParam !== null && serviceParam !== "" && allowedServiceNames.includes(serviceParam.toLowerCase())) {
    service = capitalCase(serviceParam);
    bodyService = `${service.toLowerCase()} service`;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${service} service unavailable` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bc"> <h1 class="title">${`${service} service unavailable`}</h1> <p>
The ${bodyService} is currently unavailable. Please check back later.
</p> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/503.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/503.astro";
const $$url = "/503";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$503,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
