/* empty css                                 */
import { a as createComponent, d as createAstro } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import 'clsx';
import { c as cleanOrganism } from '../chunks/cleanOrganism_Dc4DF_FJ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { organism: _organism } = cleanOrganism(Astro2.params.organism);
  return Astro2.redirect(`/${_organism.key}/search`);
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/index.astro";
const $$url = "/[organism]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
