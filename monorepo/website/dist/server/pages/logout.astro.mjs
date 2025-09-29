/* empty css                                 */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
import { A as ACCESS_TOKEN_COOKIE, R as REFRESH_TOKEN_COOKIE } from '../chunks/authMiddleware_DLP4dulR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete(ACCESS_TOKEN_COOKIE, { path: "/" });
  Astro2.cookies.delete(REFRESH_TOKEN_COOKIE, { path: "/" });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Logout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>You have been logged out</div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/logout.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Logout,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
