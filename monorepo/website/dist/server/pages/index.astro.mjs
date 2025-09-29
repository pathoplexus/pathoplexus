/* empty css                                 */
import { _ as __astro_tag_component__, c as createVNode, F as Fragment, a as createComponent, d as createAstro, m as maybeRenderHead, ah as addAttribute, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import 'clsx';
import { r as routes } from '../chunks/routes_BftQyUXo.mjs';
import { f as formatNumberWithDefaultLocale } from '../chunks/formatNumber_pkmC1VHM.mjs';
import { g as getOrganismStatisticsMap } from '../chunks/getOrganismStatistics_iE8getmN.mjs';
import { b as getWebsiteConfig, g as getConfiguredOrganisms } from '../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
/* empty css                                            */
export { renderers } from '../renderers.mjs';

const frontmatter = {
  };
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h3: "h3",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode("div", {
    class: "faqWrapper",
    children: [createVNode(_components.h3, {
      id: "what-makes-pathoplexus-different",
      children: "What makes Pathoplexus different?"
    }), createVNode(_components.p, {
      children: "Pathoplexus offers flexible data-sharing options: users can choose to share their data openly, or with time-limited protections to help ensure proper attribution and credit.\r\nPathoplexus integrates smoothly with existing INSDC-member databases (NCBI, ENA, and DDBJ), enabling data that’s ‘open’ on Pathoplexus to also appear on INSDC, and INSDC data to be accessed through Pathoplexus.\r\nPathoplexus is built on the latest tools for filtering, searching, and accessing data, making data sharing and analysis more accessible (through both the website and API) and fostering a connected, collaborative global research community."
    }), createVNode(_components.h3, {
      id: "can-i-use-the-data-on-pathoplexus",
      children: "Can I use the data on Pathoplexus?"
    }), createVNode(_components.p, {
      children: ["Yes! Pathoplexus is designed to be used by everyone, and so all data is accessible.\r\nHowever, Pathoplexus does have restrictions on how some data (“Restricted-Use Data”) can be used, particularly in publications and preprints, and has requirements on how all Restricted-Use Data is acknowledged.\r\nYou can find out more about these protections and how you can use data by reading our ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ". We also have summaries on how you can use ", createVNode(_components.a, {
        href: "/about/terms-of-use/open-data",
        children: "Open Data"
      }), " and ", createVNode(_components.a, {
        href: "/about/terms-of-use/restricted-data",
        children: "Restricted-Use Data"
      }), "."]
    }), createVNode(_components.h3, {
      id: "how-can-i-contribute-data-to-pathoplexus",
      children: "How can I contribute data to Pathoplexus?"
    }), createVNode(_components.p, {
      children: "We’ve tried to make sharing your data as easy and flexible as possible!"
    }), createVNode(_components.p, {
      children: ["You can upload data to any of our supported pathogens by first ", createVNode(_components.a, {
        href: "/docs/how-to/create-account",
        children: "creating an account"
      }), " and then ", createVNode(_components.a, {
        href: "/docs/how-to/upload-sequences",
        children: "submitting your sequences"
      }), " on the website or via the API (useful for computational pipelines).\r\nAt submission, you can choose whether you’d like your data to be ", createVNode(_components.a, {
        href: "/about/terms-of-use/restricted-data",
        children: "protected for up to one year"
      }), ", or ", createVNode(_components.a, {
        href: "/about/terms-of-use/open-data",
        children: "open immediately"
      }), ".\r\nOnce the data is open, it also appears on INSDC-member databases."]
    }), createVNode(_components.h3, {
      id: "how-can-i-try-pathoplexus-out",
      children: "How can I try Pathoplexus out?"
    }), createVNode(_components.p, {
      children: ["If you don’t have sequences to upload for the pathogens we currently support - or just want to try out Pathoplexus before deciding if you want to use it - you\r\ncan always use our ", createVNode(_components.a, {
        href: "https://demo.pathoplexus.org/",
        children: "Demo Instance"
      }), "! Our Demo Instance works just like the ‘real’ Pathoplexus, but is wiped regularly and ", createVNode(_components.em, {
        children: "no data is sent onward to INSDC"
      }), "."]
    }), createVNode(_components.p, {
      children: ["It’s perfect for trying out Pathoplexus or testing your API requests. Do note that since it is wiped regularly, you will have to make a new account and group - but it’s ok if these aren’t as detailed\r\nas your ‘real’ accounts. Remember that the Demo Instance is public, so don’t upload data that you can’t or don’t want to share. If you’d like to try out Pathoplexus but don’t have any data to hand, you can use our\r\n", createVNode(_components.a, {
        href: "https://pathoplexus.github.io/example_data/",
        children: "example data"
      }), " for the pathogens we support!"]
    }), createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["(See our ", createVNode(_components.a, {
          href: "/docs",
          children: "Docs"
        }), " for more information on how to do things like create an account, upload sequences, and more in Pathoplexus!)"]
      })
    }), createVNode(_components.h3, {
      id: "who-is-behind-pathoplexus",
      children: "Who is behind Pathoplexus?"
    }), createVNode(_components.p, {
      children: ["Pathoplexus is a transparent, non-profit association with ", createVNode(_components.a, {
        href: "/about/members",
        children: "members"
      }), " from 10 countries in 5 continents, and an ", createVNode(_components.a, {
        href: "/about/eb",
        children: "Executive Board"
      }), " from around the globe.\r\nPathoplexus’ members and Executive Board are committed to running Pathoplexus according to our ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Values"
      }), ".\r\nPathoplexus is proud to work closely with ", createVNode(_components.a, {
        href: "https://pha4ge.org/",
        children: "PHA4GE"
      }), ", an international group working to establish better standards for public health and bioinformatics.\r\nPHA4GE was also key in helping to develop Pathoplexus from the ground up."]
    }), createVNode(_components.p, {
      children: ["At the moment, Pathoplexus is run almost entirely on donations and volunteer efforts, thus is independent of influence by larger players, and is truly a community-driven project.\r\nSee our ", createVNode(_components.a, {
        href: "/about",
        children: "About"
      }), " page for more information about Pathoplexus, and our ", createVNode(_components.a, {
        href: "/about/eb",
        children: "Executive Board"
      }), ", ", createVNode(_components.a, {
        href: "/about/sab",
        children: "Scientific Advisory Board"
      }), ", ", createVNode(_components.a, {
        href: "/about/members",
        children: "Members page"
      }), " and ", createVNode(_components.a, {
        href: "/about/development-team",
        children: "Development Team"
      }), " pages for more information\r\nabout some of the people involved."]
    }), createVNode(_components.h3, {
      id: "where-can-i-read-more",
      children: "Where can I read more?"
    }), createVNode("div", {
      class: "indent",
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: ["You can read more about the purpose of Pathoplexus and our pledges to the community in our ", createVNode(_components.a, {
            href: "/about/governance/values",
            children: "Pathoplexus Values"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: ["You can read about the legal structure of Pathoplexus and how it runs in our ", createVNode(_components.a, {
            href: "/about/governance/pathoplexus-statutes",
            children: "Statutes"
          })]
        }), "\n", createVNode(_components.li, {
          children: ["To find out more about how data in Pathoplexus can be used and must be credited, see our ", createVNode(_components.a, {
            href: "/about/terms-of-use/data-use-terms",
            children: "Data Use Terms"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: ["You can see our ", createVNode(_components.a, {
            href: "/about/eb",
            children: "Executive Board"
          }), ", ", createVNode(_components.a, {
            href: "/about/members",
            children: "Members"
          }), ", and ", createVNode(_components.a, {
            href: "/about/sab",
            children: "Scientific Advisory Board"
          })]
        }), "\n", createVNode(_components.li, {
          children: ["To find out more about our Governance, see our ", createVNode(_components.a, {
            href: "/about/governance",
            children: "list of Governance documents"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: ["To read more about how to use Pathoplexus, check out our ", createVNode(_components.a, {
            href: "/docs/how-to",
            children: "‘How-To’ documents"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: ["To become part of the scientific community that helps drive Pathoplexus, you can join ", createVNode(_components.a, {
            href: "https://pha4ge.org/",
            children: "PHA4GE"
          }), " and be part of the Data Repositories Working Group"]
        }), "\n"]
      })
    }), createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "/about/faq",
        children: createVNode(_components.em, {
          children: "See more of our Frequently Asked Questions here!"
        })
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/IndexPage/FAQ.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const $$Astro = createAstro();
const $$OrganismCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OrganismCard;
  const { key, image, displayName, organismStatistics, numberDaysAgoStatistics } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(routes.organismStartPage(key), "href")} class="shadow-[0_3px_10px_rgb(0,0,0,0.1)]
    block rounded-lg m-2 w-60
    hover:brightness-115
    hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
    hover:no-underline
    transition-all duration-200 ease-in-out
    mx-auto sm:mx-0"> ${image !== void 0 && renderTemplate`<img${addAttribute(image, "src")} class="h-40 w-full object-cover rounded-t-[8px]"${addAttribute(displayName, "alt")}>`} <div class="my-4 mx-4 h-28 flex flex-col justify-between text-slate-900"> <h3 class="font-semibold mb-2">${displayName}</h3> <p class="text-sm leading-7"> <span class="font-bold"> ${formatNumberWithDefaultLocale(organismStatistics.totalSequences)} </span>
sequences
<br> <span class="text-slate-400 text-sm"> <span class="text-slate-500">
+${formatNumberWithDefaultLocale(organismStatistics.recentSequences)} </span>
in last ${numberDaysAgoStatistics} days
</span> <span class="hidden">${organismStatistics.lastUpdatedAt && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`Last updated ${organismStatistics.lastUpdatedAt.toRelative()}` })}`}</span> </p> </div> </a>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/IndexPage/OrganismCard.astro", void 0);

const $$WelcomeMessage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h2 class="text-lg font-semibold text-main my-3 mt-6">Welcome to Pathoplexus!</h2> <p class="my-4">
Pathoplexus is a new, open-source database dedicated to the efficient sharing of human viral pathogen genomic data,
    fostering global collaboration and public health response.
</p>`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/IndexPage/WelcomeMessage.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const websiteConfig = getWebsiteConfig();
  const { name: websiteName, welcomeMessageHTML } = websiteConfig;
  const numberDaysAgoStatistics = 30;
  const organismStatisticsMap = await getOrganismStatisticsMap(
    getConfiguredOrganisms().map((organism) => organism.key),
    numberDaysAgoStatistics
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto"> ${renderComponent($$result2, "WelcomeMessage", $$WelcomeMessage, { "websiteName": websiteName, "welcomeMessageHTML": welcomeMessageHTML })} <div class="flex justify-center"> <div${addAttribute(`flex flex-wrap justify-center gap-x-5  gap-y-4 ${getConfiguredOrganisms().length === 5 ? "max-w-4xl" : ""}`, "class")}> ${getConfiguredOrganisms().map(({ key, displayName, image }) => renderTemplate`${renderComponent($$result2, "OrganismCard", $$OrganismCard, { "key": key, "image": image, "displayName": displayName, "organismStatistics": organismStatisticsMap.get(key), "numberDaysAgoStatistics": numberDaysAgoStatistics })}`)} </div> </div> <div class="mdContainer"> ${renderComponent($$result2, "Faq", Content, {})} </div> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
