import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DM9waRza.mjs';
import { manifest } from './manifest_MwV2Rfej.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/-testpage.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/500.astro.mjs');
const _page4 = () => import('./pages/503.astro.mjs');
const _page5 = () => import('./pages/about/development-team.astro.mjs');
const _page6 = () => import('./pages/about/eb.astro.mjs');
const _page7 = () => import('./pages/about/faq.astro.mjs');
const _page8 = () => import('./pages/about/funding.astro.mjs');
const _page9 = () => import('./pages/about/governance/data-submission.astro.mjs');
const _page10 = () => import('./pages/about/governance/eb-guidelines.astro.mjs');
const _page11 = () => import('./pages/about/governance/minutes.astro.mjs');
const _page12 = () => import('./pages/about/governance/pathoplexus-statutes.astro.mjs');
const _page13 = () => import('./pages/about/governance/sab-guidelines.astro.mjs');
const _page14 = () => import('./pages/about/governance/values.astro.mjs');
const _page15 = () => import('./pages/about/governance.astro.mjs');
const _page16 = () => import('./pages/about/members.astro.mjs');
const _page17 = () => import('./pages/about/sab.astro.mjs');
const _page18 = () => import('./pages/about/terms-of-use/data-use-terms.astro.mjs');
const _page19 = () => import('./pages/about/terms-of-use/open-data.astro.mjs');
const _page20 = () => import('./pages/about/terms-of-use/privacy-policy.astro.mjs');
const _page21 = () => import('./pages/about/terms-of-use/restricted-data.astro.mjs');
const _page22 = () => import('./pages/about/terms-of-use/terms-of-service.astro.mjs');
const _page23 = () => import('./pages/about/terms-of-use.astro.mjs');
const _page24 = () => import('./pages/about.astro.mjs');
const _page25 = () => import('./pages/admin/dashboard.astro.mjs');
const _page26 = () => import('./pages/admin/logs.txt.astro.mjs');
const _page27 = () => import('./pages/api-documentation/authenticationapidocsurl.astro.mjs');
const _page28 = () => import('./pages/api-documentation.astro.mjs');
const _page29 = () => import('./pages/contact.astro.mjs');
const _page30 = () => import('./pages/custompage.astro.mjs');
const _page31 = () => import('./pages/docs/concepts/accession.astro.mjs');
const _page32 = () => import('./pages/docs/concepts/data-sharing-with-insdc.astro.mjs');
const _page33 = () => import('./pages/docs/concepts/insdc-submission.astro.mjs');
const _page34 = () => import('./pages/docs/concepts/metadataformat.astro.mjs');
const _page35 = () => import('./pages/docs/concepts/preprocessing.astro.mjs');
const _page36 = () => import('./pages/docs/concepts/seqset.astro.mjs');
const _page37 = () => import('./pages/docs/concepts/versioning.astro.mjs');
const _page38 = () => import('./pages/docs/concepts.astro.mjs');
const _page39 = () => import('./pages/docs/how-to/add-orcid-account.astro.mjs');
const _page40 = () => import('./pages/docs/how-to/add-remove-user-group.astro.mjs');
const _page41 = () => import('./pages/docs/how-to/approve-submissions.astro.mjs');
const _page42 = () => import('./pages/docs/how-to/authentication-api.astro.mjs');
const _page43 = () => import('./pages/docs/how-to/create-account.astro.mjs');
const _page44 = () => import('./pages/docs/how-to/create-group.astro.mjs');
const _page45 = () => import('./pages/docs/how-to/curator-sop.astro.mjs');
const _page46 = () => import('./pages/docs/how-to/edit-account.astro.mjs');
const _page47 = () => import('./pages/docs/how-to/edit-group.astro.mjs');
const _page48 = () => import('./pages/docs/how-to/edit-submissions.astro.mjs');
const _page49 = () => import('./pages/docs/how-to/generate-seqset.astro.mjs');
const _page50 = () => import('./pages/docs/how-to/remove-orcid-account.astro.mjs');
const _page51 = () => import('./pages/docs/how-to/report-sequence-issues.astro.mjs');
const _page52 = () => import('./pages/docs/how-to/revise-submissions.astro.mjs');
const _page53 = () => import('./pages/docs/how-to/revoke-sequences.astro.mjs');
const _page54 = () => import('./pages/docs/how-to/search-download-seqs-api.astro.mjs');
const _page55 = () => import('./pages/docs/how-to/search-sequences-website.astro.mjs');
const _page56 = () => import('./pages/docs/how-to/upload-sequences.astro.mjs');
const _page57 = () => import('./pages/docs/how-to/use-tools-and-add-new-ones.astro.mjs');
const _page58 = () => import('./pages/docs/how-to/view-submitted-sequences.astro.mjs');
const _page59 = () => import('./pages/docs/how-to.astro.mjs');
const _page60 = () => import('./pages/docs.astro.mjs');
const _page61 = () => import('./pages/group/_groupid_/edit.astro.mjs');
const _page62 = () => import('./pages/group/_groupid_.astro.mjs');
const _page63 = () => import('./pages/loculus-info.astro.mjs');
const _page64 = () => import('./pages/logout.astro.mjs');
const _page65 = () => import('./pages/news/2024-08-27-hello-world.astro.mjs');
const _page66 = () => import('./pages/news/2024-09-13-two-weeks.astro.mjs');
const _page67 = () => import('./pages/news/2024-11-01-autumn-update.astro.mjs');
const _page68 = () => import('./pages/news/2024-12-09-expanding-pathoplexus-mpox.astro.mjs');
const _page69 = () => import('./pages/news/2025-04-16-spring-update.astro.mjs');
const _page70 = () => import('./pages/news/2025-05-22-pathoplexus-rsv-and-hmpv.astro.mjs');
const _page71 = () => import('./pages/news/2025-07-14-july-update.astro.mjs');
const _page72 = () => import('./pages/news/2025-08-27-happy-birthday-world.astro.mjs');
const _page73 = () => import('./pages/news.astro.mjs');
const _page74 = () => import('./pages/organism-selector/_redirectto_.astro.mjs');
const _page75 = () => import('./pages/seq/_accessionversion_.fa.astro.mjs');
const _page76 = () => import('./pages/seq/_accessionversion_.tsv.astro.mjs');
const _page77 = () => import('./pages/seq/_accessionversion_/details.json.astro.mjs');
const _page78 = () => import('./pages/seq/_accessionversion_/findorganismanddata.astro.mjs');
const _page79 = () => import('./pages/seq/_accessionversion_/getsequencedetailstabledata.astro.mjs');
const _page80 = () => import('./pages/seq/_accessionversion_/getversionsdata.astro.mjs');
const _page81 = () => import('./pages/seq/_accessionversion_/versions.astro.mjs');
const _page82 = () => import('./pages/seq/_accessionversion_/_filecategory_/_filename_.astro.mjs');
const _page83 = () => import('./pages/seq/_accessionversion_.astro.mjs');
const _page84 = () => import('./pages/seqsets/_seqsetid_._version_.astro.mjs');
const _page85 = () => import('./pages/seqsets/_seqsetid_.astro.mjs');
const _page86 = () => import('./pages/seqsets.astro.mjs');
const _page87 = () => import('./pages/user/creategroup.astro.mjs');
const _page88 = () => import('./pages/user.astro.mjs');
const _page89 = () => import('./pages/_organism_/metadata-overview.astro.mjs');
const _page90 = () => import('./pages/_organism_/my_sequences.astro.mjs');
const _page91 = () => import('./pages/_organism_/search.astro.mjs');
const _page92 = () => import('./pages/_organism_/submission/edit/_accession_/_version_.astro.mjs');
const _page93 = () => import('./pages/_organism_/submission/metadataformat.astro.mjs');
const _page94 = () => import('./pages/_organism_/submission/template.astro.mjs');
const _page95 = () => import('./pages/_organism_/submission/_groupid_/released.astro.mjs');
const _page96 = () => import('./pages/_organism_/submission/_groupid_/review.astro.mjs');
const _page97 = () => import('./pages/_organism_/submission/_groupid_/revise.astro.mjs');
const _page98 = () => import('./pages/_organism_/submission/_groupid_/submit.astro.mjs');
const _page99 = () => import('./pages/_organism_/submission/_groupid_.astro.mjs');
const _page100 = () => import('./pages/_organism_/submission.astro.mjs');
const _page101 = () => import('./pages/_organism_/user.astro.mjs');
const _page102 = () => import('./pages/_organism_.astro.mjs');
const _page103 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/-testpage/index.mdx", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/500.astro", _page3],
    ["src/pages/503.astro", _page4],
    ["src/pages/about/development-team.mdx", _page5],
    ["src/pages/about/eb.mdx", _page6],
    ["src/pages/about/faq.mdx", _page7],
    ["src/pages/about/funding.mdx", _page8],
    ["src/pages/about/governance/data-submission.mdx", _page9],
    ["src/pages/about/governance/eb-guidelines.mdx", _page10],
    ["src/pages/about/governance/minutes.mdx", _page11],
    ["src/pages/about/governance/pathoplexus-statutes.mdx", _page12],
    ["src/pages/about/governance/sab-guidelines.mdx", _page13],
    ["src/pages/about/governance/values.mdx", _page14],
    ["src/pages/about/governance/index.mdx", _page15],
    ["src/pages/about/members.mdx", _page16],
    ["src/pages/about/sab.mdx", _page17],
    ["src/pages/about/terms-of-use/data-use-terms.mdx", _page18],
    ["src/pages/about/terms-of-use/open-data.mdx", _page19],
    ["src/pages/about/terms-of-use/privacy-policy.mdx", _page20],
    ["src/pages/about/terms-of-use/restricted-data.mdx", _page21],
    ["src/pages/about/terms-of-use/terms-of-service.mdx", _page22],
    ["src/pages/about/terms-of-use/index.mdx", _page23],
    ["src/pages/about/index.mdx", _page24],
    ["src/pages/admin/dashboard.astro", _page25],
    ["src/pages/admin/logs.txt.ts", _page26],
    ["src/pages/api-documentation/authenticationApiDocsUrl.ts", _page27],
    ["src/pages/api-documentation/index.astro", _page28],
    ["src/pages/contact/index.mdx", _page29],
    ["src/pages/custompage/index.mdx", _page30],
    ["src/pages/docs/concepts/accession.mdx", _page31],
    ["src/pages/docs/concepts/data-sharing-with-insdc.mdx", _page32],
    ["src/pages/docs/concepts/insdc-submission.mdx", _page33],
    ["src/pages/docs/concepts/metadataformat.mdx", _page34],
    ["src/pages/docs/concepts/preprocessing.mdx", _page35],
    ["src/pages/docs/concepts/seqset.mdx", _page36],
    ["src/pages/docs/concepts/versioning.mdx", _page37],
    ["src/pages/docs/concepts/index.mdx", _page38],
    ["src/pages/docs/how-to/add-orcid-account.mdx", _page39],
    ["src/pages/docs/how-to/add-remove-user-group.mdx", _page40],
    ["src/pages/docs/how-to/approve-submissions.mdx", _page41],
    ["src/pages/docs/how-to/authentication-api.mdx", _page42],
    ["src/pages/docs/how-to/create-account.mdx", _page43],
    ["src/pages/docs/how-to/create-group.mdx", _page44],
    ["src/pages/docs/how-to/curator-sop.mdx", _page45],
    ["src/pages/docs/how-to/edit-account.mdx", _page46],
    ["src/pages/docs/how-to/edit-group.mdx", _page47],
    ["src/pages/docs/how-to/edit-submissions.mdx", _page48],
    ["src/pages/docs/how-to/generate-seqset.mdx", _page49],
    ["src/pages/docs/how-to/remove-orcid-account.mdx", _page50],
    ["src/pages/docs/how-to/report-sequence-issues.mdx", _page51],
    ["src/pages/docs/how-to/revise-submissions.mdx", _page52],
    ["src/pages/docs/how-to/revoke-sequences.mdx", _page53],
    ["src/pages/docs/how-to/search-download-seqs-api.mdx", _page54],
    ["src/pages/docs/how-to/search-sequences-website.mdx", _page55],
    ["src/pages/docs/how-to/upload-sequences.mdx", _page56],
    ["src/pages/docs/how-to/use-tools-and-add-new-ones.mdx", _page57],
    ["src/pages/docs/how-to/view-submitted-sequences.mdx", _page58],
    ["src/pages/docs/how-to/index.mdx", _page59],
    ["src/pages/docs/index.mdx", _page60],
    ["src/pages/group/[groupId]/edit.astro", _page61],
    ["src/pages/group/[groupId]/index.astro", _page62],
    ["src/pages/loculus-info/index.ts", _page63],
    ["src/pages/logout.astro", _page64],
    ["src/pages/news/2024-08-27-hello-world.mdx", _page65],
    ["src/pages/news/2024-09-13-two-weeks.mdx", _page66],
    ["src/pages/news/2024-11-01-autumn-update.mdx", _page67],
    ["src/pages/news/2024-12-09-expanding-pathoplexus-mpox.mdx", _page68],
    ["src/pages/news/2025-04-16-spring-update.mdx", _page69],
    ["src/pages/news/2025-05-22-pathoplexus-rsv-and-hmpv.mdx", _page70],
    ["src/pages/news/2025-07-14-july-update.mdx", _page71],
    ["src/pages/news/2025-08-27-happy-birthday-world.mdx", _page72],
    ["src/pages/news/index.astro", _page73],
    ["src/pages/organism-selector/[redirectTo].astro", _page74],
    ["src/pages/seq/[accessionVersion].fa/index.ts", _page75],
    ["src/pages/seq/[accessionVersion].tsv/index.ts", _page76],
    ["src/pages/seq/[accessionVersion]/details.json.ts", _page77],
    ["src/pages/seq/[accessionVersion]/findOrganismAndData.ts", _page78],
    ["src/pages/seq/[accessionVersion]/getSequenceDetailsTableData.ts", _page79],
    ["src/pages/seq/[accessionVersion]/getVersionsData.ts", _page80],
    ["src/pages/seq/[accessionVersion]/versions.astro", _page81],
    ["src/pages/seq/[accessionVersion]/[fileCategory]/[fileName].ts", _page82],
    ["src/pages/seq/[accessionVersion]/index.astro", _page83],
    ["src/pages/seqsets/[seqSetId].[version].astro", _page84],
    ["src/pages/seqsets/[seqSetId].astro", _page85],
    ["src/pages/seqsets/index.astro", _page86],
    ["src/pages/user/createGroup.astro", _page87],
    ["src/pages/user/index.astro", _page88],
    ["src/pages/[organism]/metadata-overview/index.ts", _page89],
    ["src/pages/[organism]/my_sequences.astro", _page90],
    ["src/pages/[organism]/search/index.astro", _page91],
    ["src/pages/[organism]/submission/edit/[accession]/[version].astro", _page92],
    ["src/pages/[organism]/submission/metadataformat.astro", _page93],
    ["src/pages/[organism]/submission/template/index.ts", _page94],
    ["src/pages/[organism]/submission/[groupId]/released.astro", _page95],
    ["src/pages/[organism]/submission/[groupId]/review.astro", _page96],
    ["src/pages/[organism]/submission/[groupId]/revise.astro", _page97],
    ["src/pages/[organism]/submission/[groupId]/submit.astro", _page98],
    ["src/pages/[organism]/submission/[groupId]/index.astro", _page99],
    ["src/pages/[organism]/submission/index.astro", _page100],
    ["src/pages/[organism]/user/index.astro", _page101],
    ["src/pages/[organism]/index.astro", _page102],
    ["src/pages/index.astro", _page103]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/runner/work/pathoplexus/pathoplexus/monorepo/website/dist/client/",
    "server": "file:///home/runner/work/pathoplexus/pathoplexus/monorepo/website/dist/server/",
    "host": "0.0.0.0",
    "port": 3000,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
