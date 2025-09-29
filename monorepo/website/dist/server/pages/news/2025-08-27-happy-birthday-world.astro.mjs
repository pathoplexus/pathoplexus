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
  "title": "Pathoplexus Turns One – and Adds Measles Virus!"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "pathoplexus-turns-one--and-adds-measles-virus",
    "text": "Pathoplexus Turns One – and Adds Measles Virus!"
  }, {
    "depth": 2,
    "slug": "a-year-of-milestones",
    "text": "A Year of milestones"
  }, {
    "depth": 2,
    "slug": "welcoming-measles-virus-to-pathoplexus",
    "text": "Welcoming Measles Virus to Pathoplexus"
  }, {
    "depth": 2,
    "slug": "other-updates",
    "text": "Other Updates:"
  }, {
    "depth": 3,
    "slug": "new-uploads",
    "text": "New uploads:"
  }, {
    "depth": 3,
    "slug": "grant-success",
    "text": "Grant success:"
  }, {
    "depth": 3,
    "slug": "technical-improvements",
    "text": "Technical improvements:"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    hr: "hr",
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
          children: "Pathoplexus Turns One – and Adds Measles Virus!"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "pathoplexus-turns-one--and-adds-measles-virus",
      children: "Pathoplexus Turns One – and Adds Measles Virus!"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 27 August 2025"
      })
    }), "\n", createVNode(_components.p, {
      children: "Today we celebrate the first anniversary of Pathoplexus! 🎉🎂"
    }), "\n", createVNode(_components.p, {
      children: ["Since ", createVNode(_components.a, {
        href: "https://pathoplexus.org/news/2024-08-27-hello-world",
        children: "launching on 27 August 2024"
      }), " with four pathogens – Ebolavirus Sudan, Ebolavirus Zaire, West Nile virus, and Crimean-Congo haemorrhagic fever virus – we’ve grown further into the truly global, community-driven platform for transparent, equitable, and impactful pathogen sequence sharing that we strive to be."]
    }), "\n", createVNode(_components.h2, {
      id: "a-year-of-milestones",
      children: "A Year of milestones"
    }), "\n", createVNode(_components.p, {
      children: "Over the past 12 months, together with our community, we have:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Expanded our supported pathogens"
          }), " - adding ", createVNode(_components.a, {
            href: "https://pathoplexus.org/news/2024-12-09-expanding-pathoplexus-mpox",
            children: "mpox in December 2024"
          }), ", and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/news/2025-05-22-pathoplexus-rsv-and-hmpv",
            children: "RSV & HMPV in May 2025"
          }), ", in response to community requests."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Enabled rapid, global sharing"
          }), " - receiving direct submissions from 5 continents, including more mpox sequences in 2025 than any other database, and large RSV datasets from international collaborations."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Introduced major software improvements"
          }), " - from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/news/2025-04-16-spring-update",
            children: "Excel metadata uploads"
          }), " and advanced search qualifiers, to ", createVNode(_components.a, {
            href: "https://pathoplexus.org/news/2025-07-14-july-update",
            children: "integrated “link-out” tools"
          }), " for quick phylogenetic and geographic context."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Showed the importance of protected sequence sharing"
          }), " - enabling rapid public health use while protecting publication rights, with uptake from partners in Africa and South America."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Engaged widely"
          }), " - presenting Pathoplexus at WHO IPSN events, major scientific conferences, and workshops on data sharing, as well as featuring in ", createVNode(_components.a, {
            href: "https://www.thelancet.com/journals/lanmic/article/PIIS2666-5247(24)00263-5/fulltext",
            children: createVNode(_components.em, {
              children: "Lancet Microbe"
            })
          }), ", ", createVNode(_components.a, {
            href: "https://www.science.org/content/article/new-scientist-run-virus-database-vows-be-transparently-run-and-simple-use",
            children: createVNode(_components.em, {
              children: "Science"
            })
          }), ", ", createVNode(_components.a, {
            href: "https://www.nature.com/articles/d41586-024-02864-x",
            children: createVNode(_components.em, {
              children: "Nature"
            })
          }), ", and national media."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Received recognition"
          }), " - including the ", createVNode(_components.a, {
            href: "https://ord.akademien-schweiz.ch/news/offene-wissenschaft-ausgezeichnet-vier-projekte-erhalten-den-nationalen-preis-fuer-offene-forschungsdaten",
            children: "2024 Swiss National Open Research Data Prize"
          }), " for our commitment to openness and community governance."]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "All of this has been achieved while being powered largely by volunteer effort - a testament to the dedication of our development team, members, curators, and Executive Board."
    }), "\n", createVNode(_components.h2, {
      id: "welcoming-measles-virus-to-pathoplexus",
      children: "Welcoming Measles Virus to Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: "We’re excited to mark our first birthday by adding measles virus (MeV) as our newest supported pathogen!"
    }), "\n", createVNode(_components.p, {
      children: ["Following strong community support and an ", createVNode(_components.a, {
        href: "https://pathoplexus.org/about/governance/minutes/2025-07-24_EB_Resolutions.pdf",
        children: "Executive Board resolution"
      }), ", Pathoplexus now offers streamlined, user-friendly MeV data submission, with the same sharing options as our other pathogens:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Open"
        }), " - sequences are shared immediately with INSDC-member databases."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Restricted-Use"
        }), " - sequences can be shared rapidly for public health use while reserving publication rights for up to 1 year."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Adding measles virus comes at a critical time:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Measles cases have surged dramatically in the US this year, making real-time genomic tracking vital in North America."
      }), "\n", createVNode(_components.li, {
        children: "Global travel and declining vaccination rates in some regions are increasing the risk of further outbreaks worldwide."
      }), "\n", createVNode(_components.li, {
        children: "More labs than ever are generating full-genome MeV sequences, offering opportunities for deeper insights into transmission, introductions, and viral evolution."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "We believe supporting rapid MeV sequence sharing will strengthen surveillance and research - and we’re eager to work with the measles community to make this happen."
    }), "\n", createVNode(_components.h2, {
      id: "other-updates",
      children: "Other Updates:"
    }), "\n", createVNode(_components.h3, {
      id: "new-uploads",
      children: "New uploads:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["We were pleased to receive 256 new direct mpox sequence uploads, from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1751984476&releasedAtTimestampTo=1751984478&isRevocation=&visibility_groupId=true&visibility_groupName=true&groupId=498",
            children: "National Public Health Agency (NPHA), Ministry of Health, and Kenema Government Hospital, Sierra Leone"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1755302400&releasedAtTimestampTo=1755464967&isRevocation=&visibility_groupId=true&groupId=499",
            children: "National Health Agency (NPHA), Central Public Health Reference Laboratory, Institute de Pasteur de Dakar, Sierra Leone"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1752485599&releasedAtTimestampTo=1752485601&isRevocation=&visibility_groupId=true&groupId=265",
            children: "Instituto Nacional de Saude Doutor Ricardo Jorge (INSA), Portugal"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1753192352&releasedAtTimestampTo=1753192354&isRevocation=&visibility_groupName=true&visibility_groupId=true&groupId=535",
            children: "Helmholtz Institute for One Health, Greifswalt Germany and Centre Suisse de Recherches Scientifiques, Cote d’Ivoire"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1751328000&releasedAtTimestampTo=1755160535&isRevocation=&visibility_groupName=true&visibility_groupId=true&groupId=232",
            children: "Cliniques Universitaires de Kinshasa and Institut National de Recherche Biomedicale, DRC"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1754409203&releasedAtTimestampTo=1754409205&isRevocation=&visibility_groupId=true&visibility_groupName=true&groupId=463",
            children: "National Virus Reference Laboratory, University College Dublin, Ireland"
          }), "; and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1755182568&releasedAtTimestampTo=1755182570&isRevocation=&visibility_groupId=true&groupId=544",
            children: "Institut Pasteur de Bangui, Central African Republic"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["For West Nile, we received 308 sequences from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/west-nile/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1755096672&releasedAtTimestampTo=1755096674&isRevocation=&visibility_groupName=true&visibility_groupId=true&groupId=547",
            children: "San Diego County Public Health Laboratory, California, USA"
          }), " and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/west-nile/search?visibility_releasedAtTimestamp=true&isRevocation=&visibility_groupName=true&visibility_groupId=true&groupId=548&releasedAtTimestampFrom=1754006400&releasedAtTimestampTo=1755734399",
            children: "University of Nebraska Medical Center, USA"
          })]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "grant-success",
      children: "Grant success:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We’re incredibly happy to announce a successful small grant from “", createVNode(_components.a, {
          href: "https://eth4d.ethz.ch/funding-opportunities/eth4d-research-grants/ETH4D-Challenges.html",
          children: "ETH4D Research Challenge"
        }), "” as a partnership between ETH Zurich, Pathoplexus, and Stephen Kanyerezi in Uganda. The aim of ETH4D is to aid collaborations between ETH research groups, non-​academic partners, and partners from low- and lower-middle ​income countries. Our grant will focus on further developing Pathoplexus and Loculus, creating workshops and training materials, gathering user feedback, and developing our community."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "technical-improvements",
      children: "Technical improvements:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["It’s now possible to add GISAID accessions to sequences uploaded to Pathoplexus to aid de-duplication efforts. Simply add the accession (either on initial upload, or in a revision later) to the ", createVNode(_components.code, {
            children: "gisaidIsolateId"
          }), " metadata field. (This is only available on organisms supported by GISAID.)"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Bulk selection made easier: You can now quickly select multiple sequences on the search page by clicking and dragging your mouse over the checkboxes —- no need to click each one individually."
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Links to sequences at any INSDC database: Pathoplexus now offers a dropdown menu on our links to INSDC accessions, allowing you to view sequences in your preferred INSDC partner database—whether that’s GenBank, ENA, or DDBJ—making it easier to work with the platform you’re most familiar with."
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Find a sequence faster than ever by using our new expanding search icon at the top of the front page - just paste in a Pathoplexus accession and go straight there!\n", createVNode(_components.img, {
            src: "/gifs/news/2025-08-27-happy-birthday-world/searchBar.gif",
            alt: "GIF showing how to use the search icon at the top-right of the Pathoplexus website"
          })]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["You can always keep track of all the ", createVNode(_components.a, {
        href: "https://github.com/loculus-project/loculus/pulls?q=+is%3Apr+is%3Amerged+in%3Atitle+sort%3Aupdated-desc+feat",
        children: "latest changes"
      }), " to the software that powers Pathoplexus in the ", createVNode(_components.a, {
        href: "https://github.com/loculus-project/loculus",
        children: "Loculus repository"
      }), "."]
    }), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n", createVNode(_components.hr, {}), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n", createVNode(_components.p, {
      children: "We are incredibly grateful to everyone who has contributed data, feedback, development, curation, and advocacy over the past year. Pathoplexus exists for - and because of - the global community working to understand and respond to viruses of public health importance."
    }), "\n", createVNode(_components.p, {
      children: "Here’s to our second year, and to building an even more connected, equitable future for pathogen genomics! 🎊"
    }), "\n", createVNode(_components.p, {
      children: ["🔗 ", createVNode(_components.strong, {
        children: "Explore measles virus data on Pathoplexus"
      }), ": ", createVNode(_components.a, {
        href: "https://pathoplexus.org/measles/search",
        children: "pathoplexus.org/measles/search"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["🔗 ", createVNode(_components.strong, {
        children: "See all supported pathogens"
      }), ": ", createVNode(_components.a, {
        href: "https://pathoplexus.org/",
        children: "pathoplexus.org"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["🔗 ", createVNode(_components.strong, {
        children: "Learn how to submit your data"
      }), ": ", createVNode(_components.a, {
        href: "https://pathoplexus.org/docs/how-to/upload-sequences",
        children: "pathoplexus.org/docs/how-to/upload-sequences"
      })]
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

const url = "/news/2025-08-27-happy-birthday-world";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-08-27-happy-birthday-world.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-08-27-happy-birthday-world.mdx";
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
