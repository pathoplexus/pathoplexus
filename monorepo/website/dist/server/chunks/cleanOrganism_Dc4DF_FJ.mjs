import { g as getConfiguredOrganisms } from './config_CQtV1zSN.mjs';

function cleanOrganism(organism) {
  const knownOrganisms = getConfiguredOrganisms();
  return {
    knownOrganisms,
    organism: knownOrganisms.find((it) => it.key === organism)
  };
}

export { cleanOrganism as c };
