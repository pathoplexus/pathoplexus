/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { b as useGroupCreation } from '../../chunks/useGroupOperations_Bzl-eJMK.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { a as getRuntimeConfig } from '../../chunks/config_CQtV1zSN.mjs';
import { G as GroupForm } from '../../chunks/GroupForm_CMIMvrss.mjs';
import { w as withQueryProvider } from '../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const InnerGroupCreationForm = ({ clientConfig, accessToken }) => {
  const { createGroup } = useGroupCreation({
    clientConfig,
    accessToken
  });
  const handleCreateGroup = async (group) => {
    const result = await createGroup(group);
    if (result.succeeded) {
      return {
        succeeded: true,
        nextPageHref: routes.groupOverviewPage(result.group.groupId)
      };
    } else {
      return {
        succeeded: false,
        errorMessage: result.errorMessage
      };
    }
  };
  return /* @__PURE__ */ jsx(GroupForm, { title: "Create a new submitting group", buttonText: "Create group", onSubmit: handleCreateGroup });
};
const GroupCreationForm = withQueryProvider(InnerGroupCreationForm);

const $$Astro = createAstro();
const $$CreateGroup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreateGroup;
  const accessToken = getAccessToken(Astro2.locals.session);
  const clientConfig = getRuntimeConfig().public;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Create group" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "GroupCreationForm", GroupCreationForm, { "clientConfig": clientConfig, "accessToken": accessToken, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/User/GroupCreationForm.tsx", "client:component-export": "GroupCreationForm" })} ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/user/createGroup.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/user/createGroup.astro";
const $$url = "/user/createGroup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$CreateGroup,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
