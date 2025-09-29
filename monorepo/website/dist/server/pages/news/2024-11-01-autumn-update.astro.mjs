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
  "title": "Pathoplexus Autumn Update"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "pathoplexus-autumn-update",
    "text": "Pathoplexus Autumn Update"
  }, {
    "depth": 3,
    "slug": "in-the-media",
    "text": "In the media:"
  }, {
    "depth": 3,
    "slug": "users-and-data",
    "text": "Users and data:"
  }, {
    "depth": 3,
    "slug": "executive-board-update",
    "text": "Executive Board update:"
  }, {
    "depth": 3,
    "slug": "scientific-advisory-board",
    "text": "Scientific Advisory Board:"
  }, {
    "depth": 3,
    "slug": "pathoplexus-association",
    "text": "Pathoplexus Association:"
  }, {
    "depth": 3,
    "slug": "software-updates",
    "text": "Software updates:"
  }, {
    "depth": 3,
    "slug": "important-changes",
    "text": "Important changes:"
  }, {
    "depth": 3,
    "slug": "past-events",
    "text": "Past events:"
  }, {
    "depth": 3,
    "slug": "upcoming-events",
    "text": "Upcoming events:"
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
          children: "Pathoplexus Autumn Update"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "pathoplexus-autumn-update",
      children: "Pathoplexus Autumn Update"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 1 November 2024"
      })
    }), "\n", createVNode(_components.p, {
      children: "Despite only being 2 months old, we at Pathoplexus have been excited to already contribute to discussions on data sharing, and start becoming part of the pathogen sharing community (see ‘past events’ below). In addition, we’ve continued to add new features and improvements to Pathoplexus - still largely powered by volunteer effort and donated time!"
    }), "\n", createVNode(_components.p, {
      children: "As the seasons turn, we wanted to share some of our recent news:"
    }), "\n", createVNode(_components.h3, {
      id: "in-the-media",
      children: "In the media:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://www.thelancet.com/journals/lanmic/article/PIIS2666-5247(24)00263-5/fulltext",
          children: "Lancet Microbe’s Elena Dalla Vecchia covered Pathoplexus"
        }), ", highlighting how Pathoplexus is aiming to improve data sharing through openness, credit, and transparency (13 Sept 2024)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "users-and-data",
      children: "Users and data:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Since launch, Pathoplexus has automatically ingested 53 newly released sequences from INSDC-member databases"
      }), "\n", createVNode(_components.li, {
        children: "We are excited to have hit 100 registered users! (Registration is only needed to upload data and create SeqSets but not to view data.)"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "executive-board-update",
      children: "Executive Board update:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["See recent minutes of ", createVNode(_components.a, {
          href: "/about/governance/minutes",
          children: "Pathoplexus Members meetings, Executive Board meetings, and Executive Board resolutions"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "scientific-advisory-board",
      children: "Scientific Advisory Board:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We’re incredibly pleased to welcome Meera Chand from the UKHSA to the ", createVNode(_components.a, {
          href: "/about/sab",
          children: "Scientific Advisory Board"
        }), "!"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "pathoplexus-association",
      children: "Pathoplexus Association:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The Pathoplexus association has been recognized as tax-exempt in Switzerland. This means any donations made by Swiss residents are now tax-deductible."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "software-updates",
      children: "Software updates:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["You can now use checkboxes to select exactly the sequences you’d like to download from the search/browse pages\n", createVNode(_components.img, {
          src: "/gifs/news/2024-11-01-autumn-update/checkbox.gif",
          alt: "GIF showing how to select sequences for download"
        })]
      }), "\n", createVNode(_components.li, {
        children: "It’s now possible to download both the sequence and metadata for individual sequences easily from their ‘detail view’ page"
      }), "\n", createVNode(_components.li, {
        children: "Group names and information are now easily editable"
      }), "\n", createVNode(_components.li, {
        children: "Multi-sequence downloads now have detailed file names, featuring the organism, date, and data type (amino-acid, aligned nucleotide, etc)"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "important-changes",
      children: "Important changes:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We now store first names and last names of all authors separately in line with INSDC standards. This will also allow us to display names more flexibly, but requires changing the way the author string needs to be formatted for upload. To see how authors should be formatted now, please see our ", createVNode(_components.a, {
          href: "/docs/concepts/metadataformat",
          children: "Metadata guidelines"
        }), "."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "past-events",
      children: "Past events:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft, Chaoran Chen, Theo Sanderson, and Cornelius Roemer were invited to give a presentation and live demo of Pathoplexus to ", createVNode(_components.a, {
          href: "https://www.cdc.gov/advanced-molecular-detection/php/spheres/index.html",
          children: "SPHERES"
        }), " on 11 Sept, which was positively received and sparked lively discussion"]
      }), "\n", createVNode(_components.li, {
        children: ["Emma Hodcroft and Cornelius Roemer, alongside Executive Board members Anderson Brito and George Githinji, were able to present Pathoplexus and give a live demo to the WHO IPSN COP Data (WHO ", createVNode(_components.a, {
          href: "https://www.who.int/initiatives/international-pathogen-surveillance-network",
          children: "International Pathogen Surveillance Network"
        }), " Community of Practice Pathogen Genomic Data) meeting on 17 Sept, with lots of interest and great questions from attendees"]
      }), "\n", createVNode(_components.li, {
        children: "Chaoran Chen and Theo Sanderson were able to attend a workshop on data sharing, to both learn more about current challenges and detail what Pathoplexus can offer to help"
      }), "\n", createVNode(_components.li, {
        children: ["Tanja Stadler spoke about Pathoplexus at ", createVNode(_components.a, {
          href: "https://www.embo.org/meeting-of-the-embo-communities/",
          children: "EMBO"
        }), " (25 Oct - 1 November, Heidelberg, Germany)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "upcoming-events",
      children: "Upcoming events:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft will present at ", createVNode(_components.a, {
          href: "https://coursesandconferences.wellcomeconnectingscience.org/event/virus-genomics-evolution-and-bioinformatics-20241106/",
          children: "VGEB"
        }), " on Pathoplexus (6-8 Nov, Hinxton, UK)"]
      }), "\n", createVNode(_components.li, {
        children: ["Chaoran Chen will present at ", createVNode(_components.a, {
          href: "https://coursesandconferences.wellcomeconnectingscience.org/event/virus-genomics-evolution-and-bioinformatics-20241106/",
          children: "VGEB"
        }), " on Loculus (6-8 Nov, Hinxton, UK)"]
      }), "\n", createVNode(_components.li, {
        children: "Anderson Brito, Emma Griffiths, and Peter van Heusden will attend the WHO IPSN Global Partners Forum (21-22 November, Bangkok, Thailand)"
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

const url = "/news/2024-11-01-autumn-update";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-11-01-autumn-update.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-11-01-autumn-update.mdx";
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
