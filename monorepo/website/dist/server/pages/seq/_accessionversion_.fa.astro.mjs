import { J as getReferenceGenome } from '../../chunks/config_CQtV1zSN.mjs';
import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { L as LapisClient } from '../../chunks/lapisClient_DGgBUH0Y.mjs';
import { c as createDownloadAPIRoute } from '../../chunks/createDownloadAPIRoute_CgDXMx1q.mjs';
export { renderers } from '../../renderers.mjs';

const GET = createDownloadAPIRoute(
  "text/x-fasta",
  "fa",
  routes.sequenceEntryFastaPage,
  async (accessionVersion, organism) => {
    const lapisClient = LapisClient.createForOrganism(organism);
    const referenceGenomes = getReferenceGenome(organism);
    const segmentNames = referenceGenomes.nucleotideSequences.map((s) => s.name);
    const isMultiSegmented = segmentNames.length > 1;
    return !isMultiSegmented ? lapisClient.getSequenceFasta(accessionVersion) : lapisClient.getMultiSegmentSequenceFasta(accessionVersion, segmentNames);
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
