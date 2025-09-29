/* empty css                                 */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute, F as Fragment, al as unescapeHTML } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { $ as $$MdLayout } from '../chunks/MdLayout_B0ntFVX4.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const newsItems = [
    {
      slug: "2025-08-27-happy-birthday-world",
      title: "Pathoplexus Turns One \u2013 and Adds Measles Virus!",
      date: "27 August 2025",
      excerpt: "Today we celebrate the first anniversary of Pathoplexus! \u{1F389}\u{1F382} Since launching on 27 August 2024 with four pathogens \u2013 Ebolavirus sudan, Ebolavirus zaire, West Nile virus, and Crimean-Congo haemorrhagic fever virus \u2013 we've grown further into the truly global, community-driven\u2026"
    },
    {
      slug: "2025-07-14-july-update",
      title: "Pathoplexus July Update",
      date: "14 July 2025",
      excerpt: "For many at Pathoplexus, summer is now in full swing (and winter well underway for many others) - and we\u2019re happy to bring another news update! The past few months have been particularly exciting as we\u2019ve seen an incredible increase in direct submissions from around the world\u2026"
    },
    {
      slug: "2025-05-22-pathoplexus-rsv-and-hmpv",
      title: "Expanding Pathoplexus: RSV and HMPV added",
      date: "22 May 2025",
      excerpt: "Today, Pathoplexus launches two additional viral pathogens: RSV and HMPV. RSV, which includes the RSV-A and RSV-B subtypes, and HMPV are two related respiratory viruses which are known to cause severe illness in infants and other vulnerable patient groups, making them\u2026"
    },
    {
      slug: "2025-04-16-spring-update",
      title: "Pathoplexus Spring Update",
      date: "16 April 2025",
      excerpt: "As we move into another change of the seasons, Pathoplexus continues to grow, with exciting developments across sequence submissions, platform improvements, and community engagement. February and March saw new Ebola and mpox sequence submissions, including our first-ever\u2026"
    },
    {
      slug: "2024-12-09-expanding-pathoplexus-mpox",
      title: "Expanding Pathoplexus: mpox added",
      date: "9 December 2024",
      excerpt: "Today Pathoplexus launches its first additional viral pathogen: mpox, or MPXV (previously known as monkeypox). In the context of the current mpox outbreaks and ongoing health concerns, Pathoplexus aims to support sequence sharing to improve both understanding and response\u2026"
    },
    {
      slug: "2024-11-01-autumn-update",
      title: "Pathoplexus Autumn Update",
      date: "1 November 2024",
      excerpt: "Despite only being 2 months old, we at Pathoplexus have been excited to already contribute to discussions on data sharing, and start becoming part of the pathogen sharing community (see 'past events' below). In addition, we've continued to add new features and improvements\u2026"
    },
    {
      slug: "2024-09-13-two-weeks",
      title: "Two Weeks of Pathoplexus",
      date: "13 September 2024",
      excerpt: "Since Pathoplexus launched on 27 August, we've been humbled by the incredibly positive reaction from the pathogen research, bioinformatics, and public health communities. And it's been a busy two weeks! We're thrilled so many people have taken the time to explore the website\u2026"
    },
    {
      slug: "2024-08-27-hello-world",
      title: "Introducing Pathoplexus",
      date: "27 August 2024",
      excerpt: "We are announcing <b>Pathoplexus</b>, a specialised genomic database for viruses of public health importance. By combining modern open-source software with transparent governance structures, Pathoplexus fills a niche within the existing genomic sequencing database landscape, aiming to meet requests from both data submitters and users and striving to improve equity\u2026"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MdLayout", $$MdLayout, { "frontmatter": { title: "News" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>News</h1> ${newsItems.map((item) => renderTemplate`<div class="mt-8"> <h2> <a${addAttribute(`/news/${item.slug}`, "href")}>${item.title}</a> </h2> <div class="italic mb-4">By the Pathoplexus Team - ${item.date}</div> <div> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(item.excerpt)}` })} <a${addAttribute(`/news/${item.slug}`, "href")}>Read more</a> </div> </div>`)}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/news/index.astro";
const $$url = "/news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
