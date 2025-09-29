import { a as createComponent, d as createAstro, m as maybeRenderHead, r as renderComponent, b as renderTemplate } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$Image } from './_astro_assets_GucvUgu0.mjs';

const $$Astro = createAstro();
const $$Team = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Team;
  const { members } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-row flex-wrap gap-6 justify-center"> ${members.map((member) => renderTemplate`<div class="w-40 "> ${renderComponent($$result, "Image", $$Image, { "src": member.picture, "alt": "Picture of " + member.name, "width": 160, "height": 160 })} <div class="text-lg font-semibold">${member.name}</div> <div class="text-sm">${member.description}</div> ${member.affiliation !== void 0 && renderTemplate`<div class="text-sm italic pt-1">${member.affiliation}</div>`} </div>`)} </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Team.astro", void 0);

export { $$Team as $ };
