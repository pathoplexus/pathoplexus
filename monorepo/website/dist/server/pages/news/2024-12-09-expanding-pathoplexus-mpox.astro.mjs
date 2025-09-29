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
  "title": "Expanding Pathoplexus: mpox added"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "expanding-pathoplexus-mpox-added",
    "text": "Expanding Pathoplexus: mpox added"
  }, {
    "depth": 3,
    "slug": "milestones",
    "text": "Milestones:"
  }, {
    "depth": 3,
    "slug": "awards",
    "text": "Awards:"
  }, {
    "depth": 3,
    "slug": "software-improvements",
    "text": "Software improvements:"
  }, {
    "depth": 3,
    "slug": "pathoplexus-association-update",
    "text": "Pathoplexus Association Update:"
  }, {
    "depth": 3,
    "slug": "meetings-minutes-and-resolutions",
    "text": "Meetings, Minutes, and Resolutions:"
  }, {
    "depth": 3,
    "slug": "past-events",
    "text": "Past events:"
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
          children: "Expanding Pathoplexus: mpox added"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "expanding-pathoplexus-mpox-added",
      children: "Expanding Pathoplexus: mpox added"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 9 December 2024"
      })
    }), "\n", createVNode(_components.p, {
      children: "Today Pathoplexus launches its first additional viral pathogen: mpox, or MPXV (previously known as monkeypox). In the context of the current mpox outbreaks and ongoing health concerns, Pathoplexus aims to support sequence sharing to improve both understanding and response."
    }), "\n", createVNode(_components.p, {
      children: ["Our Executive Board decided to ", createVNode(_components.a, {
        href: "/about/governance/minutes/2024-12-09_EB_Resolutions.pdf",
        children: "prioritize adding mpox"
      }), " to Pathoplexus based on feedback from the community, having received a letter from those working on mpox & in areas affected by mpox asking that the virus be added. Ensuring that the pathogens we add are concretely useful to the involved scientific and public health community is a principle enshrined in a ", createVNode(_components.a, {
        href: "/about/governance/minutes/2024-09-12_EB_Resolutions.pdf",
        children: "Resolution by the Executive Board"
      }), " on 4 September 2024 and reflects our commitment to community involvement."]
    }), "\n", createVNode(_components.p, {
      children: ["As with other organisms, you can share mpox data as “", createVNode(_components.a, {
        href: "/about/terms-of-use/open-data",
        children: "Open"
      }), "” immediately or specify that data be “", createVNode(_components.a, {
        href: "/about/terms-of-use/restricted-data",
        children: "Restricted-Use"
      }), "” for up to 1 year, before becoming Open. Restricted-Use data is still available but is restricted in how it can be used in publications or preprints. All Open data is sent on to INSDC-member databases."]
    }), "\n", createVNode(_components.p, {
      children: ["With this new addition, we are keen to ensure that everyone who may be interested in uploading to Pathoplexus has all the information they need to make that happen. To help, we’re hoping to run an online introduction session in early 2025, covering all the viruses we currently support. If you’re interested in participating please let us know using ", createVNode(_components.a, {
        href: "https://forms.gle/a5FvyWhfTbgdUigk8",
        children: "this form"
      }), "!"]
    }), "\n", createVNode(_components.p, {
      children: "Launching with a new pathogen is an achievement we’re proud of, but it’s certainly not all we’ve been up to! Here’s a few more highlights since our last update:"
    }), "\n", createVNode(_components.h3, {
      id: "milestones",
      children: "Milestones:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Another big first for Pathoplexus: our first direct sequence submission! The ", createVNode(_components.a, {
          href: "https://grubaughlab.com/",
          children: "Grubaugh Lab"
        }), " at Yale School of Public Health uploaded ", createVNode(_components.a, {
          href: "/west-nile/search?visibility_authorAffiliations=true&authorAffiliations=Grubaugh+Lab%2C+Yale+University%2C+CT%2C+USA",
          children: "630 full-genome West Nile Virus sequences in November"
        }), ". These sequences were Open, and so have passed to INSDC-member databases and are ", createVNode(_components.a, {
          href: "https://www.ncbi.nlm.nih.gov/bioproject/PRJEB80643/",
          children: "visible there"
        }), "!"]
      }), "\n", createVNode(_components.li, {
        children: ["And one last first - we’ve had our first “curation” to correct erroneous data! Anyone can ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/curation_reports/issues",
          children: "report an issue"
        }), " where data may be incorrect, and our ", createVNode(_components.a, {
          href: "/about/development-team#curators",
          children: "team of curators"
        }), " will ", createVNode(_components.a, {
          href: "/docs/how-to/curator-sop",
          children: "assess the reported error"
        }), " and, if the data has come from INSDC, make a correction directly! (All changes are tracked through versioning).\nBig thanks to Peter van Heusden for ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/curation_reports/issues/2",
          children: "spotting the error"
        }), ", and Emily Smith and Michael Martin for putting our ", createVNode(_components.a, {
          href: "/ebola-sudan/search?accession=PP_00000UB",
          children: "first curation into action"
        }), "!"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "awards",
      children: "Awards:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We were absolutely honoured to receive the ", createVNode(_components.a, {
          href: "https://ord.akademien-schweiz.ch/news/offene-wissenschaft-ausgezeichnet-vier-projekte-erhalten-den-nationalen-preis-fuer-offene-forschungsdaten",
          children: "2024 National Prize for Open Research Data by the Swiss Academies of Arts & Sciences"
        }), ", which comes with a prize of approximately 5,000CHF. You can check out information about the award and some photos on ", createVNode(_components.a, {
          href: "https://x.com/pathoplexus/status/1862176720553480376",
          children: "Twitter"
        }), ", ", createVNode(_components.a, {
          href: "https://bsky.app/profile/pathoplexus.org/post/3lbzjlj3ixk2z",
          children: "Bluesky"
        }), ", and ", createVNode(_components.a, {
          href: "https://mstdn.science/@pathoplexus/113561606902400622",
          children: "Mastodon"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "software-improvements",
      children: "Software improvements:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We now support date ranges for sequences that don’t have exact dates: a sequence with a sampling date of “2010” will now be assigned a date range of 1 Jan to 31 Dec 2010, while a sequence with a year and month will be given the range of that month, greatly improving date filtering! We aim to support specifying custom dates ranges in future!\n", createVNode(_components.img, {
          src: "/gifs/news/2024-12-09-expanding-pathoplexus-mpox/date-range.jpg",
          alt: "screenshot highlighting how filtering works with date ranges"
        })]
      }), "\n", createVNode(_components.li, {
        children: "You might have noticed that we’ve spruced up our main page to more easily show new sequences added and make more space for the pathogen pictures"
      }), "\n", createVNode(_components.li, {
        children: ["Additionally, we’ve added a few improvements to the review page - it’s faster, there are more filters to easily find those with errors and warnings, and the field names are displayed more clearly\n", createVNode(_components.img, {
          src: "/gifs/news/2024-12-09-expanding-pathoplexus-mpox/review-filter.jpg",
          alt: "screenshot showing error, warning, and no issues categories on review page"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "pathoplexus-association-update",
      children: "Pathoplexus Association Update:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["In a ", createVNode(_components.a, {
          href: "/about/governance/minutes/2024-11-25_PathoplexusGAmeeting.pdf",
          children: "recent General Assembly"
        }), ", we adapted our Statutes to include the role of Treasurer, to aid us in opening a bank account and for helping to monitor (future!) finances"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "meetings-minutes-and-resolutions",
      children: "Meetings, Minutes, and Resolutions:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Remember that you can always ", createVNode(_components.a, {
          href: "/about/governance/minutes",
          children: "check our minutes from General Assemblies and Executive Board meetings, as well as Executive Board resolutions"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "past-events",
      children: "Past events:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft and Chaoran Chen presented on Pathoplexus and Loculus at ", createVNode(_components.a, {
          href: "https://coursesandconferences.wellcomeconnectingscience.org/event/virus-genomics-evolution-and-bioinformatics-20241106/",
          children: "VGEB"
        }), " (6-8 Nov, Hinxton, UK)"]
      }), "\n", createVNode(_components.li, {
        children: "Tanja Stadler spoke about Pathoplexus at ECDC’s “Autumn 2024 Modelling Perspectives” (14 Nov, online)"
      }), "\n", createVNode(_components.li, {
        children: "Anderson Brito, Emma Griffiths, and Peter van Heusden attended the WHO IPSN Global Partners Forum (21-22 November, Bangkok, Thailand)"
      }), "\n", createVNode(_components.li, {
        children: "Theo Sanderson, Cornelius Roemer, and Anna Parker attended ENA Facilities Day on behalf of Pathoplexus (28-29 Nov, Hinxton, UK)"
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

const url = "/news/2024-12-09-expanding-pathoplexus-mpox";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-12-09-expanding-pathoplexus-mpox.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-12-09-expanding-pathoplexus-mpox.mdx";
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
