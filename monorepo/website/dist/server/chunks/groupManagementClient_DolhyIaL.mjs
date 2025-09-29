import { g as groupManagementApi } from './groupManagementApi_DPURfY7K.mjs';
import { Z as ZodiosWrapperClient } from './zodiosWrapperClient_B5oplz-4.mjs';
import { a as getRuntimeConfig } from './config_CQtV1zSN.mjs';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';
import { a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';

const instanceLogger = getInstanceLogger("GroupManagementClient");
class GroupManagementClient extends ZodiosWrapperClient {
  static create(backendUrl = getRuntimeConfig().serverSide.backendUrl, logger = instanceLogger) {
    return new GroupManagementClient(
      backendUrl,
      groupManagementApi,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      (axiosError) => axiosError.data,
      logger,
      "backend"
    );
  }
  getGroupsOfUser(token) {
    return this.call("getGroupsOfUser", {
      headers: createAuthorizationHeader(token)
    });
  }
  getGroupDetails(token, groupId) {
    return this.call("getGroupDetails", {
      headers: createAuthorizationHeader(token),
      params: { groupId }
    });
  }
  createGroup(token, data) {
    return this.call("createGroup", data, { headers: createAuthorizationHeader(token) });
  }
}

export { GroupManagementClient as G };
