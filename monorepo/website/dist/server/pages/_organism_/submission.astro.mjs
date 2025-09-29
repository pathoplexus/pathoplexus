/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { c as cleanOrganism } from '../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { N as NeedAGroup } from '../../chunks/NeedAGroup_DaLcrCWB.mjs';
import { $ as $$NeedToLogin } from '../../chunks/NeedToLogin_BSx56War.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { a as getGroups } from '../../chunks/submissionPages_DJJXYWxq.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { organism: _organism } = cleanOrganism(Astro2.params.organism);
  const groupsResult = await getGroups(Astro2.locals.session);
  if (groupsResult.isOk()) {
    const groups = groupsResult.value;
    if (groups.length > 0) {
      return Astro2.redirect(routes.submissionPage(_organism.key, groups[0].groupId));
    }
  }
  Astro2.response.headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
  Astro2.response.headers.append("Pragma", "no-cache");
  Astro2.response.headers.append("Expires", "0");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Submission portal" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title">Submission portal</h1> ${groupsResult.match(
    () => renderTemplate`${renderComponent($$result2, "NeedAGroup", NeedAGroup, {})}`,
    () => renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": "You need to be logged in to access the submission portal." })}`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/index.astro";
const $$url = "/[organism]/submission";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
