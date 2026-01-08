import { routes } from './routes.ts';
export const bottomNavigationItems = [
    {
        text: 'API docs',
        path: routes.apiDocumentationPage(),
    },
    {
        text: 'Governance',
        path: '/about/governance',
    },
    {
        text: 'Legal notice',
        path: '/about/governance/legal-notice',
    },
    {
        text: 'Funding',
        path: '/about/funding',
    },
    {
        text: 'Contact',
        path: '/contact',
    },
    {
        text: 'Status',
        path: 'https://status.pathoplexus.org/',
    },
];
