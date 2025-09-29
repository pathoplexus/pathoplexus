import { DateTime, FixedOffsetZone } from 'luxon';
import { L as LapisClient } from './lapisClient_DGgBUH0Y.mjs';
import { v as versionStatuses, I as IS_REVOCATION_FIELD, V as VERSION_STATUS_FIELD, R as RELEASED_AT_FIELD } from './config_CQtV1zSN.mjs';

const TIMEOUT_MS = 500;
const getOrganismStatisticsMap = async (organismNames, numberDaysAgo) => {
  const statistics = await Promise.all(
    organismNames.map((organism) => getOrganismStatistics(organism, numberDaysAgo))
  );
  const result = /* @__PURE__ */ new Map();
  for (let i = 0; i < organismNames.length; i++) {
    result.set(organismNames[i], statistics[i]);
  }
  return result;
};
const getOrganismStatistics = async (organism, numberDaysAgo) => {
  const [{ total, lastUpdatedAt }, recent] = await Promise.all([
    withTimeout(getTotalAndLastUpdatedAt(organism), TIMEOUT_MS, { total: -1, lastUpdatedAt: void 0 }),
    withTimeout(getRecent(organism, numberDaysAgo), TIMEOUT_MS, 0)
  ]);
  return {
    totalSequences: total,
    recentSequences: recent,
    lastUpdatedAt
  };
};
const withTimeout = (promise, ms, defaultValue) => {
  const timeout = new Promise((resolve) => setTimeout(() => resolve(defaultValue), ms));
  return Promise.race([promise, timeout]);
};
const getTotalAndLastUpdatedAt = async (organism) => {
  const client = LapisClient.createForOrganism(organism);
  return (await client.call("aggregated", {
    [VERSION_STATUS_FIELD]: versionStatuses.latestVersion,
    [IS_REVOCATION_FIELD]: "false"
  })).map((x) => ({
    total: x.data[0].count,
    lastUpdatedAt: DateTime.fromSeconds(Number.parseInt(x.info.dataVersion, 10), {
      zone: FixedOffsetZone.utcInstance
    })
  })).unwrapOr({
    total: 0,
    lastUpdatedAt: void 0
  });
};
const getRecent = async (organism, numberDaysAgo) => {
  const recentTimestamp = Math.floor(Date.now() / 1e3 - numberDaysAgo * 24 * 60 * 60);
  const client = LapisClient.createForOrganism(organism);
  const recentlyReleasedTotal = (await client.call("aggregated", {
    [`${RELEASED_AT_FIELD}From`]: recentTimestamp,
    version: 1
  })).map((x) => x.data[0].count).unwrapOr(0);
  const recentlyReleasedThenRevokedTotal = (await client.call("aggregated", {
    [`${RELEASED_AT_FIELD}From`]: recentTimestamp,
    version: 1,
    [VERSION_STATUS_FIELD]: versionStatuses.revoked
  })).map((x) => x.data[0].count).unwrapOr(0);
  return recentlyReleasedTotal - recentlyReleasedThenRevokedTotal;
};

export { getOrganismStatisticsMap as g };
