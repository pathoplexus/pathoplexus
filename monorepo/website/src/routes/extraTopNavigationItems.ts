// The following code is in a separate file so that it can be overwritten by Pathoplexus.
import type { TopNavigationItems } from './navigationItems.ts';
import PresentationIcon from '~icons/tabler/presentation';

export const extraStaticTopNavigationItems = [
    {
        text: 'News',
        path: '/news/',
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
    const resources = {
        text: 'Resources',
        path: `/${organism}/external-resources`,
        icon: PresentationIcon,
    }
    return [resources];
}
