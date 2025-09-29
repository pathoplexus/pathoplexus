import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as renderSlot } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
/* empty css                                    */
import { $ as $$BaseLayout } from './BaseLayout_C5Fsgcd-.mjs';

const $$Astro = createAstro();
const $$MdLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MdLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": frontmatter.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mdContainer mdContainerItself"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/layouts/MdLayout.astro", void 0);

export { $$MdLayout as $ };
