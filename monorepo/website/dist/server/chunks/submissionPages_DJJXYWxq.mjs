import { err, ok } from 'neverthrow';
import { g as getAccessToken } from './getAccessToken_D0lD1so3.mjs';
import { G as GroupManagementClient } from './groupManagementClient_DolhyIaL.mjs';

const getGroups = async (session) => {
  const accessToken = getAccessToken(session);
  if (accessToken === void 0) {
    return err({
      type: "not_logged_in",
      status: 200
    });
  }
  const groupsResult = await GroupManagementClient.create().getGroupsOfUser(accessToken);
  if (groupsResult.isErr()) {
    return err({
      type: "could_not_load_groups",
      status: 500
    });
  }
  const groupsOfUser = groupsResult.value;
  return ok(groupsOfUser);
};
const getGroupsAndCurrentGroup = async (astroParams, session) => {
  const groupsOfUserResult = await getGroups(session);
  if (groupsOfUserResult.isErr()) {
    return err(groupsOfUserResult.error);
  }
  const groupsOfUser = groupsOfUserResult.value;
  const groupId = parseInt(astroParams.groupId ?? "", 10);
  if (isNaN(groupId)) {
    return err({
      type: "missing_group_id",
      status: 400
    });
  }
  const currentGroup = groupsOfUser.find((group) => group.groupId === groupId);
  if (currentGroup === void 0) {
    return err({
      type: "group_not_found",
      status: 404
    });
  }
  return ok({ currentGroup, groupsOfUser });
};

export { getGroups as a, getGroupsAndCurrentGroup as g };
