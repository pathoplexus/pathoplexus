/* empty css                                    */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { forwardRef, useState } from 'react';
import { a as useGroupPageHooks } from '../../chunks/useGroupOperations_Bzl-eJMK.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { G as GROUP_ID_FIELD, I as IS_REVOCATION_FIELD, V as VERSION_STATUS_FIELD, v as versionStatuses, a as getRuntimeConfig, g as getConfiguredOrganisms, b as getWebsiteConfig } from '../../chunks/config_CQtV1zSN.mjs';
import { d as displayConfirmationDialog } from '../../chunks/ConfirmationDialog_BWzbBNGK.mjs';
import { D as DisabledUntilHydrated } from '../../chunks/DisabledUntilHydrated_Cq3qsxAK.mjs';
import { E as ErrorFeedback } from '../../chunks/ErrorFeedback_TZcsGLkd.mjs';
import { w as withQueryProvider } from '../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { F as ForwardRef$1 } from '../../chunks/groups_B9ncEdH9.mjs';
import { F as ForwardRef$2, $ as $$BaseLayout } from '../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { E as ErrorBox } from '../../chunks/ErrorBox_Du3rMPgb.mjs';
import { $ as $$NeedToLogin } from '../../chunks/NeedToLogin_BSx56War.mjs';
import { G as GroupManagementClient } from '../../chunks/groupManagementClient_DolhyIaL.mjs';
import { g as getAccessToken } from '../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../renderers.mjs';

const dashiconsPlus = (props, ref) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", width: "1.2em", height: "1.2em", ref, ...props, children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M17 7v3h-5v5H9v-5H4V7h5V2h3v5z" }) });
const ForwardRef = forwardRef(dashiconsPlus);

const InnerGroupPage = ({
  prefetchedGroupDetails,
  clientConfig,
  accessToken,
  username,
  userGroups,
  organisms,
  databaseName
}) => {
  const groupName = prefetchedGroupDetails.group.groupName;
  const groupId = prefetchedGroupDetails.group.groupId;
  const [newUserName, setNewUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(void 0);
  const { groupDetails, removeFromGroup, addUserToGroup } = useGroupPageHooks({
    clientConfig,
    accessToken,
    setErrorMessage,
    prefetchedGroupDetails
  });
  const handleAddUser = async (e) => {
    e.preventDefault();
    await addUserToGroup(newUserName);
    setNewUserName("");
  };
  const userIsGroupMember = groupDetails.data?.users.some((user) => user.name === username) ?? false;
  const userHasEditPrivileges = userGroups.some((group) => group.groupId === prefetchedGroupDetails.group.groupId);
  const { data: sequenceCounts, isLoading: sequenceCountsLoading } = useQuery({
    queryKey: ["group-sequence-counts", groupId, clientConfig, organisms],
    queryFn: () => fetchSequenceCounts(groupId, clientConfig, organisms)
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full p-4", children: [
    errorMessage !== void 0 && /* @__PURE__ */ jsx(ErrorFeedback, { message: errorMessage, onClose: () => setErrorMessage(void 0) }),
    userHasEditPrivileges ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "flex flex-row gap-4 title flex-grow", children: [
        /* @__PURE__ */ jsx("label", { className: "mt-1.5", children: /* @__PURE__ */ jsx(ForwardRef$1, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "dropdown dropdown-hover hidden sm:flex relative", children: [
          /* @__PURE__ */ jsxs("label", { tabIndex: 0, className: "py-1 block cursor-pointer title", children: [
            groupName,
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: /* @__PURE__ */ jsx(ForwardRef$2, { className: "inline-block -mt-1 ml-1 h-4 w-4 " }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "ul",
            {
              tabIndex: 0,
              className: "dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-btn absolute top-full -left-4 min-w-60",
              children: [
                userGroups.map(
                  (group) => group.groupId !== prefetchedGroupDetails.group.groupId && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: routes.groupOverviewPage(group.groupId), children: [
                    /* @__PURE__ */ jsx(ForwardRef$1, { className: "w-6 h-6 inline-block mr-2" }),
                    group.groupName
                  ] }) }, group.groupId)
                ),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: routes.createGroup(), children: [
                  /* @__PURE__ */ jsx(ForwardRef, { className: "w-6 h-6 inline-block mr-2" }),
                  "Create a new group..."
                ] }) })
              ]
            }
          )
        ] })
      ] }),
      userIsGroupMember && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: routes.editGroupPage(groupId),
            className: "object-right p-2 loculusColor text-white rounded px-4 mr-2",
            children: "Edit group"
          }
        ),
        /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "object-right p-2 loculusColor text-white rounded px-4",
            onClick: () => {
              const isLastMember = (groupDetails.data?.users.length ?? 0) <= 1;
              const lastMemberWarning = "You are the last user in this group. Leaving will leave the group without any members, meaning that nobody is able to add future members. ";
              const dialogText = `${isLastMember ? lastMemberWarning : ""}Are you sure you want to leave the ${groupName} group?`;
              displayConfirmationDialog({
                dialogText,
                onConfirmation: async () => {
                  await removeFromGroup(username);
                  window.location.href = routes.userOverviewPage();
                }
              });
            },
            children: "Leave group"
          }
        ) })
      ] })
    ] }) : /* @__PURE__ */ jsxs("h1", { className: "flex flex-row gap-4 title flex-grow", children: [
      /* @__PURE__ */ jsx("label", { className: "block title", children: "Group:" }),
      groupName
    ] }),
    /* @__PURE__ */ jsx("div", { className: " max-w-2xl mx-auto px-10 py-4 bg-gray-100 rounded-md my-4", children: /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsx(TableRow, { label: "Group ID", children: groupDetails.data?.group.groupId }),
      /* @__PURE__ */ jsx(TableRow, { label: "Institution", children: groupDetails.data?.group.institution }),
      /* @__PURE__ */ jsx(TableRow, { label: "Contact email", children: groupDetails.data?.group.contactEmail }),
      /* @__PURE__ */ jsx(TableRow, { label: "Address", children: /* @__PURE__ */ jsx(PostalAddress, { address: groupDetails.data?.group.address }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: " max-w-2xl mx-auto px-10 py-4 bg-gray-100 rounded-md my-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold mb-2", children: [
        "Sequences available in ",
        databaseName
      ] }),
      /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsx("tbody", { children: organisms.map((organism) => /* @__PURE__ */ jsx(TableRow, { label: organism.displayName, children: sequenceCountsLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : /* @__PURE__ */ jsx(
        "a",
        {
          href: `${routes.searchPage(organism.key)}?${GROUP_ID_FIELD}=${groupId}`,
          className: "underline",
          children: sequenceCounts?.[organism.key] ?? 0
        }
      ) }, organism.key)) }) })
    ] }),
    userHasEditPrivileges && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold py-4", children: " Users " }),
      /* @__PURE__ */ jsx("form", { onSubmit: (event) => void handleAddUser(event), children: /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: newUserName,
            onChange: (e) => setNewUserName(e.target.value.trim()),
            placeholder: "Enter new user name",
            className: "p-2 border border-gray-300 rounded mr-2",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 loculusColor text-white rounded", children: "Add user" }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx("ul", { children: groupDetails.data?.users.map((user) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-6 bg-gray-100 p-2 mb-2 rounded", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg", children: user.name }),
        user.name !== username && /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              displayConfirmationDialog({
                dialogText: `Are you sure you want to remove ${user.name} from the group ${groupName}?`,
                onConfirmation: async () => {
                  await removeFromGroup(user.name);
                }
              });
            },
            className: "px-2 py-1 loculusColor text-white rounded",
            title: "Remove user from group",
            "aria-label": `Remove User ${user.name}`,
            children: "Remove user"
          }
        ) })
      ] }, user.name)) }) })
    ] })
  ] });
};
async function fetchSequenceCounts(groupId, clientConfig, organisms) {
  const counts = {};
  await Promise.all(
    organisms.map(async ({ key }) => {
      const url = clientConfig.lapisUrls[key];
      if (!url) {
        counts[key] = 0;
        return;
      }
      try {
        const response = await axios.post(`${url}/sample/aggregated`, {
          [GROUP_ID_FIELD]: groupId,
          [VERSION_STATUS_FIELD]: versionStatuses.latestVersion,
          [IS_REVOCATION_FIELD]: "false",
          fields: []
        });
        const count = response.data.data?.[0]?.count ?? 0;
        counts[key] = count;
      } catch {
        counts[key] = 0;
      }
    })
  );
  return counts;
}
const GroupPage = withQueryProvider(InnerGroupPage);
const PostalAddress = ({ address }) => {
  if (address === void 0) {
    return "";
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    address.line1,
    " ",
    /* @__PURE__ */ jsx("br", {}),
    address.line2 !== "" ? `${address.line2}` : null,
    address.line2 !== "" ? /* @__PURE__ */ jsx("br", {}) : null,
    " ",
    address.postalCode,
    " ",
    address.city,
    " ",
    /* @__PURE__ */ jsx("br", {}),
    address.state !== "" ? `${address.state}` : null,
    address.state !== "" ? /* @__PURE__ */ jsx("br", {}) : null,
    address.country
  ] });
};
const TableRow = ({ label, children }) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
  /* @__PURE__ */ jsx("td", { className: "py-2 pr-4 text-right align-top", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: label }) }),
  /* @__PURE__ */ jsx("td", { className: "py-2 pl-4", children: /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-900", children }) })
] });

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = Astro2.locals.session;
  const accessToken = getAccessToken(session);
  const username = session.user?.username ?? "";
  const groupId = parseInt(Astro2.params.groupId, 10);
  const clientConfig = getRuntimeConfig().public;
  const organisms = getConfiguredOrganisms();
  const databaseName = getWebsiteConfig().name;
  if (isNaN(groupId)) {
    return new Response(void 0, {
      status: 404
    });
  }
  const groupManagementClient = GroupManagementClient.create();
  const groupDetailsResult = await groupManagementClient.getGroupDetails(accessToken, groupId);
  const userGroupsResponse = await groupManagementClient.getGroupsOfUser(accessToken);
  const userGroups = userGroupsResponse.match(
    (groups) => groups,
    () => []
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": groupDetailsResult.match(
    (groupDetails) => groupDetails.group.groupName,
    () => "Group error"
  ) }, { "default": async ($$result2) => renderTemplate`${!accessToken ? renderTemplate`${renderComponent($$result2, "NeedToLogin", $$NeedToLogin, { "message": "You need to be logged in to view group information." })}` : groupDetailsResult.match(
    (groupDetails) => renderTemplate`${renderComponent($$result2, "GroupPage", GroupPage, { "prefetchedGroupDetails": groupDetails, "accessToken": accessToken, "clientConfig": clientConfig, "username": username, "userGroups": userGroups, "organisms": organisms, "databaseName": databaseName, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/User/GroupPage", "client:component-export": "GroupPage" })}`,
    () => renderTemplate`${renderComponent($$result2, "ErrorBox", ErrorBox, {}, { "default": async ($$result3) => renderTemplate`Failed to fetch group details, sorry for the inconvenience!` })}`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/group/[groupId]/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/group/[groupId]/index.astro";
const $$url = "/group/[groupId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
