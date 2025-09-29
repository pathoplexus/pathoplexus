/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { c as cleanOrganism } from '../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { G as GroupManagementClient } from '../../chunks/groupManagementClient_DolhyIaL.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$MySequences = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MySequences;
  const accessToken = getAccessToken(Astro2.locals.session);
  const groupsResult = await GroupManagementClient.create().getGroupsOfUser(accessToken);
  const { organism: _organism } = cleanOrganism(Astro2.params.organism);
  let noGroups = false;
  let errorMessage = "";
  if (groupsResult.isOk()) {
    if (groupsResult.value.length > 0) {
      return Astro2.redirect(routes.mySequencesPage(_organism.key, groupsResult.value[0].groupId));
    }
    noGroups = true;
  } else {
    errorMessage = groupsResult.error.detail;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "My sequences" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <p> ${noGroups && renderTemplate`<div>
To access sequence-management pages your account needs to be part of a submitting group. Please${" "} <a${addAttribute(routes.createGroup(), "href")}>create a submitting group</a>, or ask an existing group admin to
                        add you to their group.
</div>`} ${errorMessage && renderTemplate`<div class="bg-red-500">${errorMessage}</div>`} </p> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/my_sequences.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/my_sequences.astro";
const $$url = "/[organism]/my_sequences";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MySequences,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
