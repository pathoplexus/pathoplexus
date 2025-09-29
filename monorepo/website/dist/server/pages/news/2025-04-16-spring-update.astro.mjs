/* empty css                                    */
import { _ as __astro_tag_component__, c as createVNode, F as Fragment } from '../../chunks/astro/server_BcdccBRb.mjs';
import { $ as $$MdLayout } from '../../chunks/MdLayout_B0ntFVX4.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$MdLayout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    'server:root': true,
    children
  });
};
const frontmatter = {
  "layout": "../../layouts/MdLayout.astro",
  "title": "Pathoplexus Spring Update"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "pathoplexus-spring-update",
    "text": "Pathoplexus Spring Update"
  }, {
    "depth": 3,
    "slug": "highlights",
    "text": "Highlights"
  }, {
    "depth": 3,
    "slug": "software-improvements",
    "text": "Software improvements:"
  }, {
    "depth": 3,
    "slug": "meetings-minutes-and-resolutions",
    "text": "Meetings, Minutes, and Resolutions:"
  }, {
    "depth": 3,
    "slug": "past-talks",
    "text": "Past talks:"
  }, {
    "depth": 3,
    "slug": "upcoming-talks",
    "text": "Upcoming talks:"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h1: "h1",
    h3: "h3",
    img: "img",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode("div", {
      children: createVNode(_components.p, {
        children: [createVNode("a", {
          href: "/news",
          children: "News"
        }), " > ", createVNode("b", {
          children: "Pathoplexus Spring Update"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "pathoplexus-spring-update",
      children: "Pathoplexus Spring Update"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 16 April 2025"
      })
    }), "\n", createVNode(_components.p, {
      children: "As we move into another change of the seasons, Pathoplexus continues to grow, with exciting developments across sequence submissions, platform improvements, and community engagement. February and March saw new Ebola and mpox sequence submissions, including our first-ever Restricted-use Sequences and some impressively fast turnaround sequencing. We’ve also rolled out key software enhancements, making data uploads and searches more intuitive."
    }), "\n", createVNode(_components.p, {
      children: "Read on for the latest milestones, updates, and upcoming events!"
    }), "\n", createVNode(_components.h3, {
      id: "highlights",
      children: "Highlights"
    }), "\n", createVNode(_components.p, {
      children: "February and March have been exciting months for Pathoplexus, with several important sequence submissions:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Ebola outbreak response:"
          }), " On 3 Feb, the ", createVNode(_components.a, {
            href: "https://pathoplexus.org/seq/PP_0011CQ4.2",
            children: "first sequence from the Ebola outbreak"
          }), " in Kampala, Uganda, was uploaded to Pathoplexus, thanks to ", createVNode(_components.a, {
            href: "https://www.cphl.go.ug/",
            children: "Uganda’s Central Public Health Laboratory"
          }), ", ", createVNode(_components.a, {
            href: "https://health.go.ug/",
            children: "Uganda Ministry of Health"
          }), ", ", createVNode(_components.a, {
            href: "https://uvri.go.ug/",
            children: "UVRI"
          }), ", ", createVNode(_components.a, {
            href: "https://africacdc.org/",
            children: "Africa CDC"
          }), ", ", createVNode(_components.a, {
            href: "https://www.sanbi.org/",
            children: "SANBI"
          }), " and ", createVNode(_components.a, {
            href: "https://www.uwc.ac.za/",
            children: "UWC"
          }), ". A full analysis can be seen on ", createVNode(_components.a, {
            href: "https://virological.org/t/near-real-time-genomic-characterization-of-the-2025-sudan-ebolavirus-outbreak-in-uganda-s-index-case-insights-into-evolutionary-origins/990",
            children: "Virological.org"
          }), "."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "First Restricted-use Sequences:"
          }), " We were thrilled to also have our first submission of Restricted-use Sequences on 4 Feb, with ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_groupName=true&groupName=Pathogen+Genomic+Lab",
            children: "703 mpox genomes"
          }), " uploaded from the Democratic Republic of the Congo, thanks to the Institut National de Recherche Biomedicale (", createVNode(_components.a, {
            href: "https://inrb.itg.be/",
            children: "INRB"
          }), ")."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Rapid turnaround sequencing:"
          }), " We additionally had ", createVNode(_components.a, {
            href: "https://pathoplexus.org/seq/PP_0013N8P.1",
            children: "an mpox sequence"
          }), " submitted from Portugal on 7th Feb thanks to the efforts of ", createVNode(_components.a, {
            href: "https://www.insa.min-saude.pt/",
            children: "INSA"
          }), ", which, incredibly, was sequenced that same day. We later had an additional ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1741022931&releasedAtTimestampTo=1741022933",
            children: "4 mpox sequences"
          }), " submitted from the same institute on 3rd March."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Central African Republic contributions:"
          }), " We also had ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1740132968&releasedAtTimestampTo=1740132970",
            children: "41 mpox sequences"
          }), " submitted on 21 Feb from the Central African Republic, thanks to the ", createVNode(_components.a, {
            href: "https://pasteur-network.org/who-we-are/our-network/institute/institut-pasteur-de-bangui/",
            children: "Institut Pasteur de Bangui"
          }), ", ", createVNode(_components.a, {
            href: "https://www.helmholtz-hioh.de/en/",
            children: "Helmholtz Institute for One Health"
          }), ", and ", createVNode(_components.a, {
            href: "https://www.sante.gouv.cf/",
            children: "Ministère de la Santé et de la Population, Bengui"
          }), "."]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "software-improvements",
      children: "Software improvements:"
    }), "\n", createVNode(_components.p, {
      children: "We’ve been hard at work refining the Pathoplexus platform to enhance usability and streamline data submission. Some of our recent software improvements include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["The reference genome for each pathogen is now more prominently visible on the sequence view page (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3640",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["We now support uploading metadata in Excel files - making it easier than ever to get your data into the right format (and we have Excel templates too) (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3469",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["In the same vein, we now allow users to specify what columns in metadata files should be mapped to - no more worries if your column names differ! (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3478",
          children: "Link"
        }), ")\n", createVNode(_components.img, {
          src: "/gifs/news/2025-04-16-spring-update/columnmatching.gif",
          alt: "GIF showing how to map columns when uploading metadata"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Our submission templates have been also streamlined to reduce complexity. (", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/pathoplexus/pull/364",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["A new “Report an Issue” button on sequence pages allows users to flag potential concerns more easily than ever (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3681",
          children: "Link"
        }), ")\n", createVNode(_components.img, {
          src: "/gifs/news/2025-04-16-spring-update/reportIssue.jpg",
          alt: "screenshot showing the 'Create GitHub Issue' button at the bottom of a sequence information page"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["And if you just have one sequence to submit, that’s now simple too, as users can now submit individual sequences via an easy-to-use web form (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3710",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Thanks to user feedback, a display issue with the DUT column was identified and quickly resolved (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3604",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Seeing what filters you’ve applied to your search is now straightforward, as they appear above the search results, improving visibility and usability (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3777",
          children: "Link"
        }), ")\n", createVNode(_components.img, {
          src: "/gifs/news/2025-04-16-spring-update/filtersOnSearch.gif",
          alt: "GIF showing how search criteria is displayed at the top of the page"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["It’s now possible to download unaligned sequences with the country and date in the fasta-header (select ‘Display name’ when downloading) (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3814",
          children: "Link"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Revising sequences is now easier thanks to file uploads for sequences (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3812",
          children: "Link"
        }), ") and drop-down country-selection (", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/pull/3842",
          children: "Link"
        }), ")"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "meetings-minutes-and-resolutions",
      children: "Meetings, Minutes, and Resolutions:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Remember that you can always check our ", createVNode(_components.a, {
          href: "https://pathoplexus.org/about/governance/minutes",
          children: "minutes from General Assemblies and Executive Board meetings, as well as Executive Board resolutions"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "past-talks",
      children: "Past talks:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft spoke about Pathoplexus and Loculus at the ", createVNode(_components.a, {
          href: "https://www.sib.swiss/news/the-centre-for-pathogen-bioinformatics-epidemic-preparedness-beyond-covid-19",
          children: "Center for Pathogen Bioinformatics Launch"
        }), " (23 Jan, Bern, CH)"]
      }), "\n", createVNode(_components.li, {
        children: "Emma Hodcroft spoke about Pathoplexus at “Cloud Computing Africa” (26 Mar, The Gambia (remote))"
      }), "\n", createVNode(_components.li, {
        children: ["Theo Sanderson, Anderson Brito, Anna Parker, and Danny Park attended ", createVNode(_components.a, {
          href: "https://www.ga4gh.org/event/april-connect-2025/",
          children: "GA4GH Connect 2025"
        }), " to coordinate with the global genomics community on standards and connectivity (1-4 April 2025, Boston, USA)"]
      }), "\n", createVNode(_components.li, {
        children: ["Cornelius Roemer spoke about Pathoplexus at ", createVNode(_components.a, {
          href: "https://www.unige.ch/emerging-virus-symposium/",
          children: "Emerging viruses and new vaccines - from research to public health"
        }), " (7-9 April 2025, Geneva, CH)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "upcoming-talks",
      children: "Upcoming talks:"
    }), "\n", createVNode(_components.p, {
      children: "Hear more about Pathoplexus & Loculus at these upcoming meetings!"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft and Chaoran Chen will present at ", createVNode(_components.a, {
          href: "https://dynamicsevolution.org/event/5/",
          children: "Dynamics & Evolution of Human Viruses"
        }), " - 6-9 May, Asnières-sur-Oise, France"]
      }), "\n", createVNode(_components.li, {
        children: ["Chaoran Chen will present at ", createVNode(_components.a, {
          href: "https://coursesandconferences.wellcomeconnectingscience.org/event/applied-bioinformatics-public-health-microbiology-20250521/",
          children: "Applied Bioinformatics & Public Health Microbiology (ABPHM)"
        }), " - 21-23 May, Hinxton, UK"]
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

const url = "/news/2025-04-16-spring-update";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-04-16-spring-update.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-04-16-spring-update.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Content,
    default: Content,
    file,
    frontmatter,
    getHeadings,
    url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
