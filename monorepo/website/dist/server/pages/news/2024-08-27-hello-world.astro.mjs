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
  "title": "Introducing Pathoplexus"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "introducing-pathoplexus",
    "text": "Introducing Pathoplexus"
  }, {
    "depth": 2,
    "slug": "ease-of-submission",
    "text": "Ease of submission"
  }, {
    "depth": 2,
    "slug": "pathogen-tailored-tools-for-search-and-retrieval",
    "text": "Pathogen-tailored tools for search and retrieval"
  }, {
    "depth": 2,
    "slug": "as-open-as-possible-as-closed-as-necessary",
    "text": "As open as possible, as closed as necessary"
  }, {
    "depth": 2,
    "slug": "new-tools-for-recognising-contributions",
    "text": "New tools for recognising contributions"
  }, {
    "depth": 2,
    "slug": "open-source-and-community-focused",
    "text": "Open source and community-focused"
  }, {
    "depth": 2,
    "slug": "transparency-and-governance",
    "text": "Transparency and governance"
  }, {
    "depth": 2,
    "slug": "commitment-to-equity",
    "text": "Commitment to equity"
  }, {
    "depth": 2,
    "slug": "going-forward",
    "text": "Going forward…"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h1: "h1",
    h2: "h2",
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
          children: "Introducing Pathoplexus"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "introducing-pathoplexus",
      children: "Introducing Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 27 August 2024"
      })
    }), "\n", createVNode(_components.p, {
      children: ["We are announcing ", createVNode(_components.strong, {
        children: "Pathoplexus"
      }), ", a specialised genomic database for viruses of public health importance. By combining modern open-source software with transparent governance structures, Pathoplexus fills a niche within the existing genomic sequencing database landscape, aiming to meet requests from both data submitters and users and striving to improve equity. Today we launch with four virus species, Ebolavirus sudan, Ebolavirus zaire, West Nile virus and Crimean-Congo haemorrhagic fever virus."]
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus aims to offer the best features of existing platforms, and to supplement these with new approaches that optimise data utility and preserve data autonomy. In particular, data submitters can easily ", createVNode(_components.a, {
        href: "#ease-of-submission",
        children: "share"
      }), " their data via Pathoplexus and receive credit through ", createVNode(_components.a, {
        href: "#new-tools-for-recognising-contributions",
        children: "citable Pathoplexus datasets"
      }), ". Submitters can choose to have their data immediately deposited in the International Nucleotide Sequence Database Collaboration (INSDC) databases, without additional effort. Alternatively, submitters can choose to submit ", createVNode(_components.a, {
        href: "#as-open-as-possible-as-closed-as-necessary",
        children: "data with a time-limited restriction"
      }), ", during which use in publications is not permitted without involvement of the submitters. Only after this restriction ends is the data released to the INSDC. However, all users can freely access, explore, and download all data hosted in Pathoplexus. ", createVNode(_components.a, {
        href: "#pathogen-tailored-tools-for-search-and-retrieval",
        children: "Data querying"
      }), " can be done both in an interactive and programmable fashion, the latter enabling the embedding of Pathoplexus into other tools."]
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus is powered by a new ", createVNode(_components.a, {
        href: "#open-source-and-community-focused",
        children: "open-source software"
      }), " package, ", createVNode(_components.strong, {
        children: "Loculus"
      }), ". Loculus is a general purpose tool for running virus sequence databases: anyone can use it to launch their own database for their pathogens of interest. These might include internal laboratory databases, or databases for collaborations or consortia."]
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus is a ", createVNode(_components.a, {
        href: "#transparency-and-governance",
        children: "transparent"
      }), ", non-profit association with members from 10 countries in 5 continents. The ", createVNode(_components.a, {
        href: "/about/eb",
        children: "Executive Board"
      }), " of Pathoplexus consists of five members from North and South America, Africa, Asia, and Europe. We are really excited to engage with the community - please check out our ", createVNode(_components.a, {
        href: "https://pathoplexus.org",
        children: "website"
      }), ", connect with us on ", createVNode(_components.a, {
        href: "https://mstdn.science/@pathoplexus",
        children: "Mastodon"
      }), ", ", createVNode(_components.a, {
        href: "https://bsky.app/profile/pathoplexus.org",
        children: "Bluesky"
      }), ", or ", createVNode(_components.a, {
        href: "https://x.com/pathoplexus",
        children: "Twitter"
      }), ", or join our open-source community on ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus",
        children: "GitHub"
      }), "."]
    }), "\n", createVNode("br", {}), "\n", createVNode(_components.p, {
      children: "Here’s an introduction to the key features of Pathoplexus:"
    }), "\n", createVNode(_components.h2, {
      id: "ease-of-submission",
      children: "Ease of submission"
    }), "\n", createVNode(_components.p, {
      children: "Submission can be carried out either through a web interface or an API to support automated workflows. After submission, the website aligns sequences to a publicly available reference genome, and provides quality control (QC) metrics. Automated QC is also performed in seconds on the submitted metadata, allowing submitters the opportunity to correct any issues identified before completing the submission, and users the chance to evaluate sequence quality."
    }), "\n", createVNode(_components.h2, {
      id: "pathogen-tailored-tools-for-search-and-retrieval",
      children: "Pathogen-tailored tools for search and retrieval"
    }), "\n", createVNode(_components.p, {
      children: "Within Pathoplexus, each reference-aligned genome is stored in an easily queryable database. This makes it straightforward to identify all the sequences that have a particular mutation, or to find all the sequences from a particular country over a certain time period. Any of these searches - and more - can be performed either interactively from an intuitive website or from an API that enables programmatic access, and interfaces well with other tools."
    }), "\n", createVNode(_components.h2, {
      id: "as-open-as-possible-as-closed-as-necessary",
      children: "As open as possible, as closed as necessary"
    }), "\n", createVNode(_components.p, {
      children: "All users have access to all Pathoplexus data, but data submitters specify how they want their sequences to be used. Users can select “open” conditions of use, which means that Pathoplexus will share the data immediately with the open INSDC databases (Genbank, EMBL-EBI, and Database of Japan), ensuring the maximum potential for data re-use — though open data should still be used ethically and in accordance with scientific etiquette."
    }), "\n", createVNode(_components.p, {
      children: "However, we recognise that there are legitimate concerns from some submitters that immediate open sharing may prevent them from receiving appropriate credit for their contributions. To mitigate this, users can choose to delay the open release of their sequences on the INSDC databases until a specified date, ensuring that they have time, for example, to submit a manuscript about their findings to a journal. If users choose this option their sequences will only be available under the Pathoplexus restricted terms of use until their release date. During this time, others cannot publish or preprint using restricted data as “focal data”, i.e. the data can only be used for bulk analyses or to provide a context in which to understand other sequences. At any time, e.g. upon early publication, users can choose to shift their sequences into the open model."
    }), "\n", createVNode(_components.h2, {
      id: "new-tools-for-recognising-contributions",
      children: "New tools for recognising contributions"
    }), "\n", createVNode(_components.p, {
      children: "In addition to allowing submitters to restrict the use of their data for a period, we also want to allow new ways for those who build on sequence data to give credit to those who generated the data that their analyses are based on. We achieve this by allowing them to create Pathoplexus “SeqSets” (pronounced “seek-sets”). These represent a set of sequences used in an analysis, and are cited in publications using a DOI. Importantly, these DOIs will allow us to display how each submitter’s contributions have been used by other researchers and have enabled their analyses. Imagine it as Google Scholar, but for genome sequences – offering a clear measure of the impact made by those who contribute sequencing data."
    }), "\n", createVNode(_components.h2, {
      id: "open-source-and-community-focused",
      children: "Open source and community-focused"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus is an open source project. All the code that powers our software is available on ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus",
        children: "GitHub"
      }), ". We welcome bug reports to that repository, and would be especially grateful to volunteers who want to make improvements to the code, or to help add new features."]
    }), "\n", createVNode(_components.p, {
      children: ["Our belief is that core scholarly infrastructure should be open and should welcome feedback. We are very keen to engage with the community: you can get involved on our ", createVNode(_components.a, {
        href: "https://discussion.pathoplexus.org",
        children: "Discussion board"
      }), " and discuss anything related to sequence submission, retrieval, and much more. You can also connect with us on ", createVNode(_components.a, {
        href: "https://mstdn.science/@pathoplexus",
        children: "Mastodon"
      }), ", ", createVNode(_components.a, {
        href: "https://bsky.app/profile/pathoplexus.org",
        children: "Bluesky"
      }), ", or ", createVNode(_components.a, {
        href: "https://x.com/pathoplexus",
        children: "Twitter"
      }), " ."]
    }), "\n", createVNode(_components.h2, {
      id: "transparency-and-governance",
      children: "Transparency and governance"
    }), "\n", createVNode(_components.p, {
      children: ["Ultimately, the value of a database comes from the research and public health community that uses it to deposit and retrieve data. We believe it is crucial that we are accountable to that community. Our members, dedicated to furthering public health pathogen genomics worldwide, are at the heart of Pathoplexus, and are tasked with electing our Executive Board and overseeing our strategy and decisions. Similarly, our Executive Board is chosen to reflect the diversity of the community we aim to represent. The minutes of our meetings are available on our ", createVNode(_components.a, {
        href: "/about/governance",
        children: "governance page"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Transparency is a priority throughout Pathoplexus: all sequence history is versioned so that users can see when and why sequences or metadata were updated over time. Full links are made between Pathoplexus and the INSDC databases to establish provenance, whether that’s an INSDC sequence that was ingested into Pathoplexus, or a case where a Pathoplexus sequence was deposited in INSDC."
    }), "\n", createVNode(_components.h2, {
      id: "commitment-to-equity",
      children: "Commitment to equity"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus recognises that the decision to share pathogen sequences is inextricably tied to global science and public health equity. Sequence generators may choose not to share sequences both due to fears of being ‘scooped’ (having their data used before they can publish on it) and concerns about whether their region or country will benefit from innovations and advances that stem from those sequences, such as vaccines. Pathoplexus aims to immediately address the first problem, by allowing sequences to be made publicly available for public health use while being protected from publication by others. Pathoplexus is also dedicated to the larger goal of finding better ways for global, equitable pathogen access and benefit sharing (“PABS”), and commits to ", createVNode(_components.a, {
        href: "/about/governance/values#article-4-beneficial-sharing",
        children: "adhering to future"
      }), " consensus-driven international PABS agreements."]
    }), "\n", createVNode(_components.p, {
      children: "Further, Pathoplexus recognises that it’s important that sequence generators are both represented by and intrinsically involved in databases where they chose to share their data. One of our most important future plans is to actualise this via a ‘Pathoplexus Network’ of globally-distributed Pathoplexus nodes, each operating under the same data-sharing rules and exchanging sequences in a federated manner. As well as allowing regional ‘ownership’ of shared data, this federated network prevents loss if any one node fails and ensures long-term availability of the data and resilience against both technical and organisational risks."
    }), "\n", createVNode(_components.h2, {
      id: "going-forward",
      children: "Going forward…"
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus is committed to fostering a transparent, open, and equitable environment for pathogen sequence sharing, addressing both immediate concerns of data protection and the broader issues of global access and benefit sharing. By combining cutting-edge tools, community-driven governance, and a commitment to fairness, we aim to build a platform that supports not only scientific progress but also the values of collaboration and inclusion. We are excited to see Pathoplexus grow and evolve with input from users, contributors, and curators across the globe."
    }), "\n", createVNode(_components.p, {
      children: "Further reading:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Check out ", createVNode(_components.a, {
          href: "https://pathoplexus.org",
          children: "Pathoplexus.org"
        }), " to view our pathogens!"]
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://pathoplexus.org/about/governance/values",
          children: "Pathoplexus Values"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        })
      }), "\n", createVNode(_components.li, {
        children: ["Contribute to our code on ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/pathoplexus",
          children: "GitHub"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Connect with us: ", createVNode(_components.a, {
        href: "https://mstdn.science/@pathoplexus",
        children: "Mastodon"
      }), ", ", createVNode(_components.a, {
        href: "https://bsky.app/profile/pathoplexus.org",
        children: "Bluesky"
      }), ", ", createVNode(_components.a, {
        href: "https://x.com/pathoplexus",
        children: "Twitter"
      }), ", ", createVNode(_components.a, {
        href: "https://discussion.pathoplexus.org",
        children: "Discussion Board"
      }), ", ", createVNode(_components.a, {
        href: "mailto:hello@pathoplexus.org",
        children: "email"
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

const url = "/news/2024-08-27-hello-world";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-08-27-hello-world.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-08-27-hello-world.mdx";
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
