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
  "title": "Two Weeks of Pathoplexus"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "two-weeks-of-pathoplexus",
    "text": "Two Weeks of Pathoplexus"
  }, {
    "depth": 3,
    "slug": "in-the-media",
    "text": "In the media:"
  }, {
    "depth": 3,
    "slug": "visitors",
    "text": "Visitors:"
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
    "slug": "software-updates",
    "text": "Software updates:"
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
          children: "Two Weeks of Pathoplexus"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "two-weeks-of-pathoplexus",
      children: "Two Weeks of Pathoplexus"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "By the Pathoplexus Team - 13 September 2024"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Since Pathoplexus launched on 27 August, we’ve been humbled by the incredibly positive reaction from the pathogen research, bioinformatics, and public health communities. And it’s been a busy two weeks! We’re thrilled so many people have taken the time to explore the website\n& ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus",
        children: "GitHub"
      }), ", read about our aims & commitments, and also helped spread the word about Pathoplexus!"]
    }), "\n", createVNode(_components.p, {
      children: "Here’s a short list of updates from our side, to celebrate two weeks of being live!"
    }), "\n", createVNode(_components.h3, {
      id: "in-the-media",
      children: "In the media:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://www.science.org/content/article/new-scientist-run-virus-database-vows-be-transparently-run-and-simple-use",
          children: "Science Magazine’s Jon Cohen covered Pathoplexus"
        }), ", getting some reactions from the community, and a deep-dive to answer some common questions (29 Aug 2024)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://www.univadis.it/index.php/viewarticle/si-dice-villa-genomi-virali-nuova-piattaforma-garantire-2024a1000fx1",
          children: "UniVadis’ Roberta Villa gave some history on pathogen data sharing"
        }), " and how Pathoplexus might fit into the landscape (Italian, 3 Sept 2024)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://www.bbc.co.uk/sounds/play/w3ct5vd7",
          children: "BBC World Service’s Roland Pease spoke with Emma Hodcroft on Science in Action"
        }), " (starting at 8m30s) to find out more about Pathoplexus and what it aims to do (4 Sept 2024)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "https://www.nature.com/articles/d41586-024-02864-x",
          children: "Nature’s Smriti Mallapaty spoke to scientists around the world about Pathoplexus"
        }), " and how it could help build trust in data sharing (9 Sept 2024)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "visitors",
      children: "Visitors:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Since launch, Pathoplexus has had thousands of unique visitors from over 100 countries, with 65 creating accounts (necessary to upload, but not to view data)"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "executive-board-update",
      children: "Executive Board update:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["See a list of the most ", createVNode(_components.a, {
          href: "/about/governance/minutes/2024-09-12_EB_Resolutions.pdf",
          children: "recent resolutions passed by the Pathoplexus Executive Board"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "scientific-advisory-board",
      children: "Scientific Advisory Board:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["We’re incredibly pleased to welcome Pardis Sabeti from the Broad Institute, Harvard University, and HHMI to the ", createVNode(_components.a, {
          href: "/about/sab",
          children: "Scientific Advisory Board"
        }), "!"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "software-updates",
      children: "Software updates:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Our code is open-source and on ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus",
          children: "GitHub"
        }), ". Thank you to everyone from the community who have made suggestions for improvements to ", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus/issues",
          children: "Loculus"
        }), " (the software behind Pathoplexus). Since launch, we’ve added a few features and fixed some bugs. All enhancements and bug-fixes are documented on GitHub. Severe incidents with high impact will also be reported on this news page."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "past-talks",
      children: "Past talks:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Cornelius Roemer and Fabian Engelniederhammer gave a talk on Loculus at “TNG Big Techday 24” on 5 July 2024, which you can ", createVNode(_components.a, {
          href: "https://www.youtube.com/watch?v=wPtwH4siQyU",
          children: "watch on Youtube"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Tanja Stadler spoke about Pathoplexus and Loculus at ", createVNode(_components.a, {
          href: "https://www.sibe-iseb.it/napoli2024",
          children: "SIBE"
        }), " (8-11 Sept, Napoli) and at ", createVNode(_components.a, {
          href: "https://www.cscs.ch/events/upcoming-events/event-detail?tx_cscsevents_pi1%5Bcontroller%5D=Event&tx_cscsevents_pi1%5Bevent%5D=195&cHash=423f54c401a3f3f71b363a30ec0de932",
          children: "Inauguration of Alps Infrastructure"
        }), " (13 Sept, Hoenggerberg)"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "upcoming-talks",
      children: "Upcoming talks:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Now that we’ve launched, we’re keen to tell you more about Pathoplexus and Loculus! Look out for talks from our members at upcoming conferences:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: ["Emma Hodcroft at ", createVNode(_components.a, {
              href: "https://escv2024.org/",
              children: "ESCV"
            }), " (18-21 Sept, Frankfurt)"]
          }), "\n", createVNode(_components.li, {
            children: ["Chaoran Chen at 2024 ", createVNode(_components.a, {
              href: "https://asm.org/events/asm-ngs/home",
              children: "ASM NGS"
            }), " (13-16 Oct, Washington DC)"]
          }), "\n"]
        }), "\n"]
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

const url = "/news/2024-09-13-two-weeks";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-09-13-two-weeks.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/2024-09-13-two-weeks.mdx";
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
