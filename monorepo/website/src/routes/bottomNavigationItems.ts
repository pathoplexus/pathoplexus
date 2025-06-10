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
