import { makeEndpoint, makeApi } from '@zodios/core';
import z from 'zod';
import { n as notAuthorizedError, c as conflictError, a as authorizationHeader } from './commonApiTypes_DLGEfh_V.mjs';
import { k as group, n as newGroup, l as groupDetails } from './config_CQtV1zSN.mjs';

const createGroupEndpoint = makeEndpoint({
  method: "post",
  path: "/groups",
  alias: "createGroup",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: newGroup
    }
  ],
  response: group,
  errors: [notAuthorizedError, conflictError]
});
const editGroupEndpoint = makeEndpoint({
  method: "put",
  path: "/groups/:groupId",
  alias: "editGroup",
  parameters: [
    authorizationHeader,
    {
      name: "data",
      type: "Body",
      schema: newGroup
    }
  ],
  response: group,
  errors: [notAuthorizedError]
});
const addUserToGroupEndpoint = makeEndpoint({
  method: "put",
  path: "/groups/:groupId/users/:userToAdd",
  alias: "addUserToGroup",
  parameters: [authorizationHeader],
  response: z.never(),
  errors: [notAuthorizedError, conflictError]
});
const removeUserFromGroupEndpoint = makeEndpoint({
  method: "delete",
  path: "/groups/:groupId/users/:userToRemove",
  alias: "removeUserFromGroup",
  parameters: [authorizationHeader],
  response: z.never(),
  errors: [notAuthorizedError]
});
const getGroupDetailsEndpoint = makeEndpoint({
  method: "get",
  path: "/groups/:groupId",
  alias: "getGroupDetails",
  parameters: [authorizationHeader],
  response: groupDetails,
  errors: [notAuthorizedError]
});
const getGroupsOfUserEndpoint = makeEndpoint({
  method: "get",
  path: "/user/groups",
  alias: "getGroupsOfUser",
  parameters: [authorizationHeader],
  response: z.array(group),
  errors: [notAuthorizedError]
});
const getAllGroupsEndpoint = makeEndpoint({
  method: "get",
  path: "/groups",
  alias: "getAllGroups",
  parameters: [authorizationHeader],
  response: z.array(group),
  errors: [notAuthorizedError]
});
const groupManagementApi = makeApi([
  createGroupEndpoint,
  editGroupEndpoint,
  addUserToGroupEndpoint,
  removeUserFromGroupEndpoint,
  getGroupDetailsEndpoint,
  getGroupsOfUserEndpoint,
  getAllGroupsEndpoint
]);

export { groupManagementApi as g };
