import { a as createComponent, d as createAstro, m as maybeRenderHead, r as renderComponent, ah as addAttribute, b as renderTemplate } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { g as getAuthUrl } from './getAuthUrl_CP-cK5RK.mjs';
import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';

const icOutlineLogin = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z" }) });
const ForwardRef = forwardRef(icOutlineLogin);

const $$Astro = createAstro();
const $$NeedToLogin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NeedToLogin;
  const loginUrl = await getAuthUrl(Astro2.url.toString());
  let { message } = Astro2.props;
  if (message === void 0) {
    message = "You need to log in to access this page.";
  }
  return renderTemplate`${maybeRenderHead()}<div class="mt-6 message max-w-4xl mx-auto"> ${renderComponent($$result, "IcOutlineLogin", ForwardRef, { "className": "w-12 h-12 inline-block mr-2" })} <div> <p>${message}</p> <a${addAttribute(loginUrl, "href")} class="btn mt-3 bg-white hover:bg-gray-50">Login or register</a> <p class="mt-1"></p> </div> </div>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/common/NeedToLogin.astro", void 0);

export { $$NeedToLogin as $ };
