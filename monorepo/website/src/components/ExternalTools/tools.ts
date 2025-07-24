export type Tool = {
    name: string;
    description: string;
    image?: string;
    url: string | ((organism: string) => string);
    organisms: string[];
}

export const tools: Tool[] = [
    {
        name: 'GenSpectrum',
        description: 'GenSpectrum is an interactive dashboard that visualizes the spatio-temporal distribution of sequences and in-depth analysis of variants and mutations.',
        image: '/images/external-tools/genspectrum.svg',
        url: organism => `https://genspectrum.org/${organism}`,
        organisms: ['cchf', 'ebola-sudan', 'ebola-zaire', 'mpox', 'rsv-a', 'rsv-b', 'west-nile'],
    },
    {
        name: 'Nextstrain',
        description: 'TODO',
        image: '/images/external-tools/nextstrain.png',
        url: _ => `TODO`,
        organisms: ['cchf', 'ebola-sudan', 'ebola-zaire', 'hmpv', 'mpox', 'rsv-a', 'rsv-b', 'west-nile'],
    },
    {
        name: 'Pathogen Sequence Counts and Maps',
        description: 'A simple dashboard visualizing the number of sequences over time, data use terms and the geographic distribution',
        url: organism => `https://hodcroftlab.github.io/ppx-plots/#${organism}`,
        organisms: ['cchf', 'ebola-sudan', 'ebola-zaire', 'hmpv', 'mpox', 'rsv-a', 'rsv-b', 'west-nile'],
    },
    {
        name: 'VIRUS-MVP',
        description: 'VIRUS-MVP is a modular, open-source platform for visualizing, annotating, and interpreting viral genomic variation across diverse sample types and pathogens.',
        url: 'https://virusmvp.org/pox-mvp/',
        organisms: ['mpox'],
    }
]

export const getToolUrl = (tool: Tool, organism: string): string => {
    return typeof tool.url === 'function' ? tool.url(organism) : tool.url;
}
