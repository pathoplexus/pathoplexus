import { r as routes } from '../../chunks/routes_BftQyUXo.mjs';
import { L as LapisClient } from '../../chunks/lapisClient_DGgBUH0Y.mjs';
import { c as createDownloadAPIRoute } from '../../chunks/createDownloadAPIRoute_CgDXMx1q.mjs';
export { renderers } from '../../renderers.mjs';

const GET = createDownloadAPIRoute(
  "text/tab-separated-values",
  "tsv",
  routes.sequenceEntryTsvPage,
  (accessionVersion, organism) => {
    const lapisClient = LapisClient.createForOrganism(organism);
    return lapisClient.getSequenceEntryVersionDetailsTsv(accessionVersion);
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
