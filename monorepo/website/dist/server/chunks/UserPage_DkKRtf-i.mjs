import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
import { r as routes } from './routes_BftQyUXo.mjs';
import { E as ErrorFeedback } from './ErrorFeedback_TZcsGLkd.mjs';
import { w as withQueryProvider } from './withQueryProvider_BqTp-ccD.mjs';
import { $ as $$BaseLayout } from './BaseLayout_C5Fsgcd-.mjs';
import { G as GroupManagementClient } from './groupManagementClient_DolhyIaL.mjs';
import { K as KeycloakClientManager } from './getAuthUrl_CP-cK5RK.mjs';
import { g as getAccessToken } from './getAccessToken_D0lD1so3.mjs';
import { u as urlForKeycloakAccountPage } from './urlForKeycloakAccountPage_BNHL3x2Q.mjs';
import { E as ErrorBox } from './ErrorBox_Du3rMPgb.mjs';
import { F as ForwardRef$3 } from './groups_B9ncEdH9.mjs';

const streamlineUserMultipleGroup = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 14 14", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", d: "M5 6.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-4.5 7h9v-.542A4.51 4.51 0 0 0 4.796 8.5A4.51 4.51 0 0 0 .5 12.958zm8.5-7a2.5 2.5 0 0 0 0-5m2.5 12h2v-.542A4.51 4.51 0 0 0 10 8.61" }) });
const ForwardRef$2 = forwardRef(streamlineUserMultipleGroup);

const InnerListOfGroupsOfUser = ({ groupsOfUser }) => {
  const [errorMessage, setErrorMessage] = useState(void 0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    errorMessage !== void 0 && /* @__PURE__ */ jsx(ErrorFeedback, { message: errorMessage, onClose: () => setErrorMessage(void 0) }),
    /* @__PURE__ */ jsx("ul", { children: groupsOfUser.length > 0 ? groupsOfUser.map((group) => /* @__PURE__ */ jsx("li", { className: "flex items-center gap-6 bg-gray-100 p-2 mb-2 rounded", children: /* @__PURE__ */ jsxs("a", { className: "text-lg", href: routes.groupOverviewPage(group.groupId), children: [
      /* @__PURE__ */ jsx(ForwardRef$2, { className: "w-6 h-6 inline-block mr-2" }),
      group.groupName
    ] }) }, group.groupName)) : /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "You are not currently a member of a submitting group. If you intend to submit sequences, please create a group or ask an administrator of an existing group to add you to their group." }) })
  ] });
};
const ListOfGroupsOfUser = withQueryProvider(InnerListOfGroupsOfUser);

const iconoirOpenNewWindow = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 1.5, children: [
  /* @__PURE__ */ jsx("path", { strokeLinejoin: "round", d: "M21 3h-6m6 0l-9 9m9-9v6" }),
  /* @__PURE__ */ jsx("path", { d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" })
] }) });
const ForwardRef$1 = forwardRef(iconoirOpenNewWindow);

const materialSymbolsLightPersonOutline = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.215-.625q-.214-.292-.593-.494q-1.234-.598-2.546-.916T12 14.616t-2.646.318t-2.546.916q-.38.202-.593.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.384t-.587-1.412T12 6.384t-1.412.588T10 8.384t.588 1.413t1.412.587m0 7.232" }) });
const ForwardRef = forwardRef(materialSymbolsLightPersonOutline);

const $$Astro = createAstro();
const $$UserPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserPage;
  const session = Astro2.locals.session;
  const user = session.user;
  const username = user.username;
  const name = user.name;
  const accessToken = getAccessToken(session);
  const logoutUrl = new URL(Astro2.request.url);
  logoutUrl.pathname = routes.logout();
  const keycloakClient = await KeycloakClientManager.getClient();
  const keycloakLogoutUrl = keycloakClient.endSessionUrl({
    post_logout_redirect_uri: logoutUrl.href
    // eslint-disable-line @typescript-eslint/naming-convention
  });
  const accountPageUrl = urlForKeycloakAccountPage(keycloakClient);
  const groupOfUsersResult = await GroupManagementClient.create().getGroupsOfUser(accessToken);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "My account" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto"> <div class="flex mt-4"> <div class="flex text-gray-500"> ${renderComponent($$result2, "MaterialSymbolsLightPersonOutline", ForwardRef, { "className": "-mt-2 -ml-2 mr-2", "style": {
    width: "4.5rem",
    height: "4.5rem"
  } })} </div> <div> <h1 class="text-gray-900 text-xl font-semibold">${name}</h1> <h2 class="text-gray-700 font-semibold"> ${username} </h2> </div> </div> <div class="my-2 flex gap-2"> <a${addAttribute(keycloakLogoutUrl, "href")} class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-sm">Logout</a> <a${addAttribute(accountPageUrl, "href")} target="_blank" rel="noopener noreferrer" class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center">
Edit account information
${renderComponent($$result2, "IconoirOpenNewWindow", ForwardRef$1, { "className": "ml-1 w-4 h-4" })} </a> </div> <div class="font-bold mt-12 text-lg mb-2 text-primary-700"> ${renderComponent($$result2, "DashiconsGroups", ForwardRef$3, { "className": "w-6 h-6 inline-block mr-2" })}My groups
</div> ${groupOfUsersResult.match(
    (groups) => renderTemplate`${renderComponent($$result2, "ListOfGroupsOfUser", ListOfGroupsOfUser, { "groupsOfUser": groups, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/User/ListOfGroupsOfUser.tsx", "client:component-export": "ListOfGroupsOfUser" })}`,
    (error) => renderTemplate`${renderComponent($$result2, "ErrorBox", ErrorBox, { "title": "Failed loading list of groups" }, { "default": async ($$result3) => renderTemplate`${error.detail}` })}`
  )} <div class="mt-4"> <a${addAttribute(routes.createGroup(), "href")} class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-sm">Create a new submitting group</a> </div> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/User/UserPage.astro", void 0);

export { $$UserPage as $ };
