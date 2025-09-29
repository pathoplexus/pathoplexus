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
  "title": "Pathoplexus July Update"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "pathoplexus-july-update",
    "text": "Pathoplexus July Update"
  }, {
    "depth": 3,
    "slug": "direct-full-genome-submissions",
    "text": "Direct full-genome submissions:"
  }, {
    "depth": 3,
    "slug": "updates-on-funding-collaboration-and-sequences-accepted",
    "text": "Updates on funding, collaboration, and sequences accepted:"
  }, {
    "depth": 3,
    "slug": "technical-updates",
    "text": "Technical updates:"
  }, {
    "depth": 3,
    "slug": "in-the-media",
    "text": "In the media:"
  }, {
    "depth": 3,
    "slug": "past-talks",
    "text": "Past talks:"
  }, {
    "depth": 3,
    "slug": "meetings-minutes-and-resolutions",
    "text": "Meetings, Minutes, and Resolutions:"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
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
          children: "Pathoplexus July Update"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "pathoplexus-july-update",
      children: "Pathoplexus July Update"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 14 July 2025"
      })
    }), "\n", createVNode(_components.p, {
      children: "For many at Pathoplexus, summer is now in full swing (and winter well underway for many others) - and we’re happy to bring another news update! The past few months have been particularly exciting as we’ve seen an incredible increase in direct submissions from around the world, as well as the addition of some great new features - all against the backdrop of our continuous effort to improve Pathoplexus for the community."
    }), "\n", createVNode(_components.p, {
      children: "Grab your sunglasses (or woolly hat) and we’ll dive into the latest milestones, improvements, and events!"
    }), "\n", createVNode(_components.h3, {
      id: "direct-full-genome-submissions",
      children: "Direct full-genome submissions:"
    }), "\n", createVNode(_components.p, {
      children: "May and June have brought with them a surge in direct uploads to Pathoplexus, across 5 of our supported pathogens, 5 continents, and 8 countries! In fact, so far in 2025, Pathoplexus has received more direct mpox submissions than INSDC."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["We’ve received 128 mpox sequences from the ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_groupName=true&column_dataUseTerms=true&visibility_groupId=true&groupId=397",
            children: "National Microbiology Laboratory, Public Health Agency of Canada"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&visibility_groupId=true&groupId=265",
            children: "Instituto Nacional de Saude Doutor Ricardo Jorge (INSA), Portugal"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&visibility_groupId=true&groupId=463",
            children: "National Virus Reference Laboratory, University College Dublin, Ireland"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&isRevocation=false&visibility_groupName=true&groupName=KGHSL_VHF_LAB&releasedAtTimestampTo=1750982399",
            children: "National Public Health Agency (NPHA), Ministry of Health, and Kenema Government Hospital, Sierra Leone"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_groupName=true&visibility_groupId=true&groupId=499",
            children: "Central Public Health Reference Laboratory and National Public Health Agency (NPHA), Sierra Leone and Africa Centers for Disease Control and Prevention"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_groupName=true&visibility_groupId=true&groupId=500",
            children: "Cambodia Mpox Outbreak Surveillance and Research Team, Virology Unit, Institut Pasteur du Cambodge, Phnomn Penn, Cambodia"
          }), "; and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/mpox/search?visibility_releasedAtTimestamp=true&isRevocation=false&visibility_groupId=true&visibility_groupName=true&groupId=538",
            children: "the Centre de recherche de formation en infectiologie de Guinee (CERFIG), Guinea"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["For West Nile, we’ve received 15 sequences from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/west-nile/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1748031219&releasedAtTimestampTo=1748031221&visibility_groupId=true&groupId=497",
            children: "Unité des Virus Émergents (Aix-Marseille Université - IRD190 – Inserm1207 - EFS – IRBA), France"
          }), " and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/west-nile/search?visibility_releasedAtTimestamp=true&isRevocation=false&visibility_groupName=true&groupName=UVE+seq",
            children: "Pathogenesis and Control of Chronic and Emerging Infections (PCCEI), Altopictus, Unite des Virus emergents (Aix-Marseille Universite - IRD190, Inserm1207 - EFS, IRBA), France"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["For RSV-A, 1,089 sequences were shared from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-a/search?visibility_groupName=true&visibility_submittedAtTimestamp=true&submittedAtTimestampTo=1750982399&visibility_groupId=true&groupId=430",
            children: "Clinical Virology, Basel, Switzerland"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-a/search?visibility_groupName=true&visibility_groupId=true&groupId=463",
            children: "National Virus Reference Laboratory, University College Dublin, Dublin, Ireland"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-a/search?visibility_releasedAtTimestamp=true&visibility_groupName=true&visibility_groupId=true&groupId=531",
            children: "Laboratorio de Salud Publica, Facultad de Ciencias Exactas, Universidad Nacional de La Plata, Argentina"
          }), "; and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-a/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1751288450&isRevocation=&visibility_groupId=true&groupId=540&releasedAtTimestampTo=1752278399",
            children: "Institut de Recerca, Hospital Universitari Vall d’Hebron, Spain"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["For RSV-B, 1,060 sequences were shared from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-b/search?visibility_submittedAtTimestamp=true&visibility_groupName=true&column_submittedAtTimestamp=true&visibility_groupId=true&groupId=430",
            children: "Clinical Virology, University Hospital Basel, Basel, Switzerland"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-b/search?visibility_groupName=true&visibility_groupId=true&groupId=463",
            children: "National Virus Reference Laboratory, University College Dublin, Dublin, Ireland"
          }), "; ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-b/search?visibility_releasedAtTimestamp=true&visibility_groupName=true&visibility_groupId=true&groupId=531",
            children: "Laboratorio de Salud Publica, Facultad de Ciencias Exactas, Universidad Nacional de La Plata, Argentina"
          }), "; and ", createVNode(_components.a, {
            href: "https://pathoplexus.org/rsv-b/search?visibility_releasedAtTimestamp=true&releasedAtTimestampFrom=1751288992&releasedAtTimestampTo=1752278399&isRevocation=&visibility_groupName=true&visibility_groupId=true&groupId=540",
            children: "Institut de Recerca, Hospital Universitari Vall d’Hebron, Spain"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["And finally, we received 1 laboratory (not clinical) Ebola Zaire sequence from ", createVNode(_components.a, {
            href: "https://pathoplexus.org/ebola-zaire/search?visibility_releasedAtTimestamp=true&isRevocation=false&visibility_groupName=true&visibility_groupId=true&groupId=397",
            children: "Special Pathogens, National Microbiology Laboratory, Public Health Agency of Canada, Canada"
          })]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "updates-on-funding-collaboration-and-sequences-accepted",
      children: "Updates on funding, collaboration, and sequences accepted:"
    }), "\n", createVNode(_components.p, {
      children: ["If you’ve ever thought about donating to Pathoplexus, we’ve now added a new ", createVNode(_components.a, {
        href: "https://pathoplexus.org/about/funding",
        children: "Funding Page"
      }), " to help locate useful information - and to give directly! We’ll be adding additional donation methods soon. If your organization or department would like to offer institutional support, please do get in touch!"]
    }), "\n", createVNode(_components.p, {
      children: ["We’re also thrilled that ARTIC2 - the ", createVNode(_components.a, {
        href: "https://www.birmingham.ac.uk/news/2025/ambitious-project-to-develop-low-cost-genome-sequencing-for-pathogens-known-and-unknown",
        children: "next chapter of the hugely successful ARTIC project"
      }), " - has officially kicked-off! Pathoplexus co-founder Emma Hodcroft is part of the ARTIC2 consortium, and will focus on developing ", createVNode(_components.a, {
        href: "https://loculus.org/",
        children: "Loculus"
      }), " (the software underlying Pathoplexus) to integrate with ARTIC sequencing and analysis software - and make sending data from local Loculus instances to Pathoplexus easy and fast."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, to reflect that Pathoplexus is focused on sharing sequences from epidemiological and biological settings for research and surveillance, our ", createVNode(_components.a, {
        href: "https://pathoplexus.org/about/terms-of-use/terms-of-service",
        children: "Terms of Service"
      }), " have been updated to highlight that we do not accept in silico or laboratory construct sequences (e.g. for patent purposes). Such synthetic sequences will be revoked. Note that we do accept vaccine-derived sequences (e.g. sequences derived from real infections that originated from a vaccination)."]
    }), "\n", createVNode(_components.h3, {
      id: "technical-updates",
      children: "Technical updates:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Finding sequences from the lineage or clade you want is now even easier thanks to the ability to include sublineages in your search! For example in mpox, searching lineage ", createVNode(_components.code, {
            children: "A.2"
          }), " will return 83 sequences with exactly that lineage assignment, whereas turning on “include sublineages” will include ", createVNode(_components.code, {
            children: "A.2.1"
          }), ", ", createVNode(_components.code, {
            children: "A.2.2"
          }), ", and ", createVNode(_components.code, {
            children: "A.2.3"
          }), " in addition to ", createVNode(_components.code, {
            children: "A.2"
          }), " and return 356 sequences! In the API, you can append ", createVNode(_components.code, {
            children: "*"
          }), " - for example, ", createVNode(_components.code, {
            children: "A.2*"
          }), " or ", createVNode(_components.code, {
            children: "A.2.*"
          }), "\n", createVNode(_components.img, {
            src: "/gifs/news/2025-07-14-july-update/lineages.gif",
            alt: "GIF showing how to use the include sublineages checkbox in the Pathoplexus UI"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Ever wished you could quickly look at a few sequences in Pathoplexus in context - or see the distribution on a map? With our new ‘linkout’ feature (‘Tools’ on a search page), now you can! After selecting some sequences, select ‘Nextclade’ to run a quick analysis and place the sequences on a reference tree to see how they relate to each other, or ‘Country Map’ to see the distribution of sampling locations around the world. If you’d be interested in having your tool included, please ", createVNode(_components.a, {
            href: "https://pathoplexus.org/docs/how-to/use-tools-and-add-new-ones",
            children: "see our docs"
          }), "!\n", createVNode(_components.img, {
            src: "/gifs/news/2025-07-14-july-update/nextcladeLinkOut.gif",
            alt: "GIF showing how to send sequences from the Pathoplexus search page to Nextclade"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["When we download segmented virus sequences from NCBI Virus, it can sometimes be a challenge to link segments together as being from one sample. A recent update to NCBI Virus now also passes along a new metadata field (", createVNode(_components.code, {
            children: "strain"
          }), "), which has allowed us to more accurately group over 45 CCHF segments submitted from the Chinese Academy of Sciences, Wuhan and the Institut Pasteur, Dakar."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["It’s been great to see an uptick in people using our SeqSet feature! To help show off more of the information about the sequences in the SeqSet, we’ve added ", createVNode(_components.a, {
            href: "https://github.com/loculus-project/loculus/pull/4248",
            children: "metadata tables to SeqSets pages"
          }), ". We hope to add more features to these pages soon!\n", createVNode(_components.img, {
            src: "/gifs/news/2025-07-14-july-update/seqSets.jpg",
            alt: "Image showing the 2025 hMPXV SeqSet from Sierra Leone, highlighting a new table with more information about the sequences in the SeqSet"
          })]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Using the API to filter the data you need is even easier now, thanks to an update that adds support for advanced qualifiers to queries! For example:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: ["Logical expressions: You can now use ", createVNode(_components.code, {
              children: "and"
            }), ", ", createVNode(_components.code, {
              children: "or"
            }), " and ", createVNode(_components.code, {
              children: "not"
            }), " (also ", createVNode(_components.code, {
              children: "&"
            }), ", ", createVNode(_components.code, {
              children: "|"
            }), ", and ", createVNode(_components.code, {
              children: "!"
            }), ")"]
          }), "\n", createVNode(_components.li, {
            children: ["Support for regex: ex: ", createVNode(_components.code, {
              children: "host.regex=.*bos.*"
            })]
          }), "\n", createVNode(_components.li, {
            children: ["“N-of” and “exactly-of” to match sequences with at least N (or exactly N) of the desired parameters, e.g. ", createVNode(_components.code, {
              children: "[3-of: mutation1, mutation2, somethingelse…]"
            }), " or ", createVNode(_components.code, {
              children: "[exactly-3-of:...]"
            })]
          }), "\n", createVNode(_components.li, {
            children: ["See the full documentation on using these advanced queries ", createVNode(_components.a, {
              href: "https://lapis.cov-spectrum.org/open/v2/docs/concepts/advanced-query",
              children: "here"
            }), "!"]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "in-the-media",
      children: "In the media:"
    }), "\n", createVNode(_components.p, {
      children: ["We were thrilled to see Pathoplexus co-founder and Chair of the Executive Board Emma Hodcroft ", createVNode(_components.a, {
        href: "https://www.unibas.ch/en/News-Events/Uni-Nova/Uni-Nova-145/Uni-Nova-145-Conversation-Emma-Hodcroft-Interview-Pathoplexus-Virus-Research-Data-US-Politics.html",
        children: "featured in the University of Basel ‘UniNova’ magazine"
      }), ", in an interview that featured Pathoplexus, underscored the importance of working together in science, and highlighted how shifts in global science policy could impede our ability to counter infectious diseases."]
    }), "\n", createVNode(_components.h3, {
      id: "past-talks",
      children: "Past talks:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Emma Hodcroft spoke about Pathoplexus at at ", createVNode(_components.a, {
          href: "https://dynamicsevolution.org/event/5/",
          children: "Dynamics & Evolution of Human Viruses"
        }), " (6-9 May, Asnières-sur-Oise, France)"]
      }), "\n", createVNode(_components.li, {
        children: ["Chaoran Chen spoke about Loculus at ", createVNode(_components.a, {
          href: "https://coursesandconferences.wellcomeconnectingscience.org/event/applied-bioinformatics-public-health-microbiology-20250521/",
          children: "Applied Bioinformatics & Public Health Microbiology (ABPHM)"
        }), " (21-23 May, Hinxton, UK)"]
      }), "\n", createVNode(_components.li, {
        children: "Emma Hodcroft spoke about data sharing with Pathoplexus at the Swiss Pathogen Surveillance Platform (SPSP) annual meeting (10 June, Bern, Switzerland)"
      }), "\n", createVNode(_components.li, {
        children: ["Pathoplexus was excited to be invited to speak about the importance of enabling fast, federated pathogen data sharing at ", createVNode(_components.a, {
          href: "https://lemonade.social/e/iumyMgJE",
          children: "d/acc Berlin"
        }), ", where Emma Hodcroft spoke (11 June, Berlin, Germany - ", createVNode(_components.a, {
          href: "https://x.com/i/broadcasts/1jMJgkOdMnwJL",
          children: "livestream recording"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Finally the ", createVNode(_components.a, {
          href: "https://www.swiss-sarcoma.net/",
          children: "Swiss Sarcoma Society"
        }), " was excited to hear about novel forms of data sharing during a talk on Pathoplexus by Emma Hodcroft (26 June, Lucerne, Switzerland)"]
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

const url = "/news/2025-07-14-july-update";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-07-14-july-update.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2025-07-14-july-update.mdx";
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
