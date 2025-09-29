/* empty css                                       */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate } from '../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { u as useGroupEdit } from '../../../chunks/useGroupOperations_Bzl-eJMK.mjs';
import { r as routes } from '../../../chunks/routes_BftQyUXo.mjs';
import { a as getRuntimeConfig } from '../../../chunks/config_CQtV1zSN.mjs';
import { G as GroupForm } from '../../../chunks/GroupForm_CMIMvrss.mjs';
import { w as withQueryProvider } from '../../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { E as ErrorBox } from '../../../chunks/ErrorBox_Du3rMPgb.mjs';
import { $ as $$NeedToLogin } from '../../../chunks/NeedToLogin_BSx56War.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { G as GroupManagementClient } from '../../../chunks/groupManagementClient_DolhyIaL.mjs';
import { g as getAccessToken } from '../../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../../renderers.mjs';

const InnerGroupEditForm = ({ prefetchedGroupDetails, clientConfig, accessToken }) => {
  const { groupId, ...groupInfo } = prefetchedGroupDetails.group;
  const { editGroup } = useGroupEdit({
    clientConfig,
    accessToken
  });
  const handleEditGroup = async (group) => {
    const result = await editGroup(groupId, group);
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
  return /* @__PURE__ */ jsx(
    GroupForm,
    {
      title: "Edit group",
      buttonText: "Update group",
      onSubmit: handleEditGroup,
      defaultGroupData: groupInfo
    }
  );
};
const GroupEditForm = withQueryProvider(InnerGroupEditForm);

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const session = Astro2.locals.session;
  const accessToken = getAccessToken(session);
  const groupId = parseInt(Astro2.params.groupId, 10);
  const clientConfig = getRuntimeConfig().public;
  if (isNaN(groupId)) {
    return new Response(void 0, {
      status: 404
    });
  }
  const groupManagementClient = GroupManagementClient.create();
  const groupDetailsResult = await groupManagementClient.getGroupDetails(accessToken, groupId);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Edit group" }, { "default": async ($$result2) => renderTemplate`${!accessToken ? renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": "You need to be logged in to edit this group." })}` : groupDetailsResult.match(
    (groupDetails) => renderTemplate`${renderComponent($$result2, "GroupEditForm", GroupEditForm, { "prefetchedGroupDetails": groupDetails, "accessToken": accessToken, "clientConfig": clientConfig, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/User/GroupEditForm", "client:component-export": "GroupEditForm" })}`,
    () => renderTemplate`${renderComponent($$result2, "ErrorBox", ErrorBox, {}, { "default": async ($$result3) => renderTemplate`Failed to fetch group details, sorry for the inconvenience!` })}`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/group/[groupId]/edit.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/group/[groupId]/edit.astro";
const $$url = "/group/[groupId]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Edit,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
