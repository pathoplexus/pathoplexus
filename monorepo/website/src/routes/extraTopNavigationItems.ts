// The following code is in a separate file so that it can be overwritten by Pathoplexus.
import type { TopNavigationItems } from './navigationItems.ts';

export const extraStaticTopNavigationItems = [
    {
        text: 'News',
        path: '/news',
    },
    {
        text: 'About',
        path: '/about',
    },
    {
        text: 'Docs',
        path: '/docs/',
    },
];

export const extraSequenceRelatedTopNavigationItems = (organism: string | undefined): TopNavigationItems => {
    const tools = {
        text: 'Tools',
        path: organism === undefined ? '/external-tools/' : `/${organism}/external-tools/`,
    }
    return [tools];
}
