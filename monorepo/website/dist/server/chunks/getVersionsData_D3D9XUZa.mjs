import { ok, err } from 'neverthrow';
import { g as getConfiguredOrganisms } from './config_CQtV1zSN.mjs';
import { L as LapisClient } from './lapisClient_DGgBUH0Y.mjs';

const getVersionsData = async (accession) => {
  const organisms = getConfiguredOrganisms();
  const promises = organisms.map(async ({ key }) => {
    const lapisClient = LapisClient.createForOrganism(key);
    const versionListResult2 = (await lapisClient.getAllSequenceEntryHistoryForAccession(accession)).mapErr((error) => error.detail).andThen((result) => result.length > 0 ? ok(result) : err("Sequence not found"));
    return {
      organism: key,
      result: versionListResult2
    };
  });
  const queries = await Promise.all(promises);
  let versionListResult = queries[0].result;
  let organism;
  for (const query of queries) {
    if (query.result.isOk()) {
      versionListResult = query.result;
      organism = query.organism;
      break;
    }
  }
  return { versionListResult, organism };
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    getVersionsData
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, getVersionsData as g };
