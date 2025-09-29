import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { useCallback, useMemo } from 'react';
import { g as groupManagementApi } from './groupManagementApi_DPURfY7K.mjs';
import { a as createAuthorizationHeader } from './backendClientFactory_DhWS0NBG.mjs';
import { s as stringifyMaybeAxiosError } from './stringifyMaybeAxiosError_D1gzvjBG.mjs';

const useGroupPageHooks = ({
  clientConfig,
  accessToken,
  setErrorMessage,
  prefetchedGroupDetails
}) => {
  const groupName = prefetchedGroupDetails.group.groupName;
  const groupId = prefetchedGroupDetails.group.groupId;
  const { zodios, zodiosHooks } = useGroupManagementClient(clientConfig);
  const groupDetails = zodiosHooks.useGetGroupDetails(
    {
      headers: createAuthorizationHeader(accessToken),
      params: { groupId }
    },
    { enabled: false, initialData: prefetchedGroupDetails }
  );
  if (groupDetails.error) {
    setErrorMessage(`Failed to query Group ${groupName}: ${stringifyMaybeAxiosError(groupDetails.error)}`);
  }
  const addUserToGroup = useCallback(
    async (username) => {
      await callAddToGroup(accessToken, setErrorMessage, zodios, groupDetails.refetch)(groupId, username);
    },
    [accessToken, setErrorMessage, groupDetails.refetch, zodios, groupId]
  );
  const removeFromGroup = useCallback(
    async (username) => {
      await callRemoveFromGroup(accessToken, setErrorMessage, zodios, groupDetails.refetch)(groupId, username);
    },
    [accessToken, setErrorMessage, groupDetails.refetch, zodios, groupId]
  );
  return {
    addUserToGroup,
    removeFromGroup,
    groupDetails
  };
};
const useGroupCreation = ({
  clientConfig,
  accessToken
}) => {
  const { zodios } = useGroupManagementClient(clientConfig);
  const createGroup = useCallback(
    async (group) => callCreateGroup(accessToken, zodios)(group),
    [accessToken, zodios]
  );
  return {
    createGroup
  };
};
const useGroupEdit = ({ clientConfig, accessToken }) => {
  const { zodios } = useGroupManagementClient(clientConfig);
  const editGroup = useCallback(
    async (groupId, group) => callEditGroup(accessToken, zodios)(groupId, group),
    [accessToken, zodios]
  );
  return {
    editGroup
  };
};
const useGroupManagementClient = (clientConfig) => {
  const zodios = useMemo(() => new Zodios(clientConfig.backendUrl, groupManagementApi), [clientConfig]);
  const zodiosHooks = useMemo(() => new ZodiosHooks("loculus", zodios), [zodios]);
  return {
    zodios,
    zodiosHooks
  };
};
function callCreateGroup(accessToken, zodios) {
  return async (group) => {
    try {
      const groupResult = await zodios.createGroup(group, {
        headers: createAuthorizationHeader(accessToken)
      });
      return {
        succeeded: true,
        group: groupResult
      };
    } catch (error) {
      const message = `Failed to create group: ${stringifyMaybeAxiosError(error)}`;
      return {
        succeeded: false,
        errorMessage: message
      };
    }
  };
}
function callEditGroup(accessToken, zodios) {
  return async (groupId, group) => {
    try {
      const groupResult = await zodios.editGroup(group, {
        headers: createAuthorizationHeader(accessToken),
        params: {
          groupId
        }
      });
      return {
        succeeded: true,
        group: groupResult
      };
    } catch (error) {
      const message = `Failed to edit group: ${stringifyMaybeAxiosError(error)}`;
      return {
        succeeded: false,
        errorMessage: message
      };
    }
  };
}
function callRemoveFromGroup(accessToken, openErrorFeedback, zodios, refetchGroups) {
  return async (groupId, username) => {
    try {
      await zodios.removeUserFromGroup(void 0, {
        headers: createAuthorizationHeader(accessToken),
        params: {
          groupId,
          userToRemove: username
        }
      });
      await refetchGroups();
    } catch (error) {
      const message = `Failed to leave group: ${stringifyMaybeAxiosError(error)}`;
      openErrorFeedback(message);
    }
  };
}
function callAddToGroup(accessToken, openErrorFeedback, zodios, refetchGroups) {
  return async (groupId, username) => {
    try {
      await zodios.addUserToGroup(void 0, {
        headers: createAuthorizationHeader(accessToken),
        params: {
          groupId,
          userToAdd: username
        }
      });
      await refetchGroups();
    } catch (error) {
      const message = `Failed to add user to group: ${stringifyMaybeAxiosError(error)}`;
      openErrorFeedback(message);
    }
  };
}

export { useGroupPageHooks as a, useGroupCreation as b, useGroupEdit as u };
