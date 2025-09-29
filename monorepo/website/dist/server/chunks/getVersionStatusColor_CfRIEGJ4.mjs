import { v as versionStatuses } from './config_CQtV1zSN.mjs';

const getVersionStatusColor = (versionStatus, isRevocation) => {
  if (isRevocation) {
    return "text-red-500";
  }
  switch (versionStatus) {
    case versionStatuses.latestVersion:
      return "text-green-500";
    default:
      return "text-gray-400";
  }
};
const getVersionStatusLabel = (versionStatus, isRevocation) => {
  switch (versionStatus) {
    case versionStatuses.latestVersion:
      return isRevocation ? "Sequence revoked" : "Latest version";
    default:
      return "Previous version";
  }
};

export { getVersionStatusColor as a, getVersionStatusLabel as g };
