/* empty css                                    */
import { a as createComponent, d as createAstro } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$seqSetId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$seqSetId;
  const { seqSetId: _seqSetId = "" } = Astro2.params;
  return Astro2.redirect(`/seqsets/${_seqSetId}.1`);
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/[seqSetId].astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/seqsets/[seqSetId].astro";
const $$url = "/seqsets/[seqSetId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$seqSetId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
