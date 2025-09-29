/* empty css                                    */
import { a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$UserPage } from '../../chunks/UserPage_DkKRtf-i.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "UserPage", $$UserPage, {})}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/user/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/user/index.astro";
const $$url = "/[organism]/user";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
