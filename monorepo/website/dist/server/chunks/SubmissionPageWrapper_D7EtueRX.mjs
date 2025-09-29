import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, F as Fragment$1, e as renderSlot, m as maybeRenderHead } from './astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import 'react';
import { S as SubmissionRouteUtils } from './routes_BftQyUXo.mjs';
import { F as ForwardRef } from './groups_B9ncEdH9.mjs';
import { F as ForwardRef$1, $ as $$BaseLayout } from './BaseLayout_C5Fsgcd-.mjs';
import { $ as $$NeedToLogin } from './NeedToLogin_BSx56War.mjs';

const SubmissionGroupSelector = ({ groups, selectedGroupId, pathname, search }) => {
  const selectedGroup = groups.find((group) => group.groupId === selectedGroupId);
  if (selectedGroup === void 0) {
    return null;
  }
  const groupNameElement = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ForwardRef, { className: "w-6 h-6 inline-block mr-1 -mt-1 text-gray-600" }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: selectedGroup.groupName })
  ] });
  if (groups.length === 1) {
    return /* @__PURE__ */ jsx("div", { className: "mb-2", children: groupNameElement });
  }
  return /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxs("div", { className: "dropdown", children: [
    /* @__PURE__ */ jsxs("div", { tabIndex: 0, role: "button", className: "", children: [
      groupNameElement,
      " ",
      /* @__PURE__ */ jsx(ForwardRef$1, { className: "inline-block -mt-1 h-5 w-5" })
    ] }),
    /* @__PURE__ */ jsx("ul", { tabIndex: 0, className: "dropdown-content z-20 menu p-2 shadow bg-base-100 w-52 text-gray-700", children: groups.map((group) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: (() => {
          const currentRoute = SubmissionRouteUtils.parseToRoute(pathname, search);
          const newRoute = { ...currentRoute, groupId: group.groupId };
          return SubmissionRouteUtils.toUrl(newRoute);
        })(),
        children: group.groupName
      }
    ) }, group.groupId)) })
  ] }) });
};

const $$Astro = createAstro();
const $$SubmissionPageWrapper = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SubmissionPageWrapper;
  const { title, disablePageTitle = false, groupsResult } = Astro2.props;
  const { pathname, search } = Astro2.url;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate`${groupsResult.match(
    ({ currentGroup: group, groupsOfUser }) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SubmissionGroupSelector", SubmissionGroupSelector, { "groups": groupsOfUser, "selectedGroupId": group.groupId, "pathname": pathname, "search": search, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Submission/SubmissionGroupSelector", "client:component-export": "SubmissionGroupSelector" })} ${!disablePageTitle && renderTemplate`${maybeRenderHead()}<h1 class="title">${title}</h1>`}${renderSlot($$result3, $$slots["default"])} ` })}`,
    ({ type }) => {
      switch (type) {
        case "not_logged_in":
          return renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": "You need to be logged in to submit sequences." })}`;
        case "group_not_found":
          return renderTemplate`<p class="text-red-500">Group not found</p>`;
        default:
          return renderTemplate`<p class="text-red-500">Unexpected error: Failed to load groups</p>`;
      }
    }
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Submission/SubmissionPageWrapper.astro", void 0);

export { $$SubmissionPageWrapper as $ };
