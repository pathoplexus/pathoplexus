import { G as GroupManagementClient } from './groupManagementClient_DolhyIaL.mjs';

const getMyGroups = async (accessToken) => {
  try {
    const groups = await GroupManagementClient.create().getGroupsOfUser(accessToken);
    return groups.match(
      (groups2) => groups2,
      () => []
    );
  } catch (_) {
    return [];
  }
};

export { getMyGroups as g };
