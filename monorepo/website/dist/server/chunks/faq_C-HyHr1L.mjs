/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$AboutLayout } from './AboutLayout_DgTKlaqR.mjs';
import 'clsx';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$AboutLayout, {
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
  "layout": "../../layouts/AboutLayout.astro",
  "title": "Frequently Asked Questions (FAQ)",
  "order": 4
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "questions-about-pathoplexus",
    "text": "Questions about Pathoplexus"
  }, {
    "depth": 2,
    "slug": "questions-about-the-pathogens-we-support",
    "text": "Questions about the pathogens we support"
  }, {
    "depth": 2,
    "slug": "questions-about-data",
    "text": "Questions about data"
  }, {
    "depth": 2,
    "slug": "questions-about-our-future-and-plans",
    "text": "Questions about our future and plans"
  }, {
    "depth": 2,
    "slug": "questions-about-our-code",
    "text": "Questions about our code"
  }, {
    "depth": 2,
    "slug": "questions-about-our-website",
    "text": "Questions about our website"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["For questions about how to use Pathoplexus, or what certain terms mean, please see our ", createVNode(_components.a, {
        href: "/docs/concepts/accession",
        children: "Documentation"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["For questions about our governance, please see our ", createVNode(_components.a, {
        href: "/about/governance",
        children: "Governance pages"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-pathoplexus",
      children: "Questions about Pathoplexus"
    }), "\n", createVNode("details", {
      children: createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: " What makes Pathoplexus different? "
          }), " "]
        }), "\r\nPathoplexus offers flexible data-sharing options: users can choose to share their data openly, or with time-limited protections to help ensure proper attribution and credit.\r\nPathoplexus integrates smoothly with existing INSDC-member databases (NCBI, ENA, and DDBJ), enabling data that’s ‘open’ on Pathoplexus to also appear on INSDC, and INSDC data to be accessed through Pathoplexus.\r\nPathoplexus is built on the latest tools for filtering, searching, and accessing data, making data sharing and analysis more accessible (through both the website and API) and fostering a connected, collaborative global research community."]
      })
    }), "\n", createVNode("details", {
      children: createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "How can I get involved?"
          }), " "]
        }), "\r\nTo become part of the scientific community that helps drive Pathoplexus, you can join ", createVNode(_components.a, {
          href: "https://pha4ge.org/",
          children: "PHA4GE"
        }), " and be part of the Data Repositories Working Group. You can also contribute code and feature suggestions to ", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus",
          children: "Loculus"
        }), ", the custom-built open-source software that powers Pathoplexus."]
      })
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "Who is behind Pathoplexus? Who funds it?"
          }), " "]
        }), "\r\nPathoplexus is a transparent, non-profit association with ", createVNode(_components.a, {
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
        children: ["At the moment, Pathoplexus is run almost entirely on donations and volunteer efforts, thus is independent of influence by larger players, and is truly a community-driven project.\r\nWe have received the following monetary assistance: support for one software developer working on Loculus via a ", createVNode(_components.a, {
          href: "https://www.swissuniversities.ch/en/",
          children: "swissuniversities"
        }), " Open Research Data grant; legal advice for our GDPR statement via PHA4GE; contribution of contracted software developers via Prof Tanja Stadler, ETH Zurich; and donation of AWS compute time via Prof Artem Babian, University of Toronto.\r\nAside from this, Pathoplexus has been created by and is powered by thousands of hours of donated time and effort by members of the bioinformatics community (see our ", createVNode(_components.a, {
          href: "../../about/members",
          children: "members"
        }), " and ", createVNode(_components.a, {
          href: "../../about/development-team",
          children: "development team"
        }), ")."]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "How does Pathoplexus fit in among existing pathogen sequence sharing databases?"
          }), " "]
        }), "\r\nPathoplexus is designed to be complementary to the existing pathogen sequence database ecosystem.\r\nData from Pathoplexus, as long as it is used and acknowledged according to the ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), ", can be analyzed alongside any other dataset\r\n(if the other dataset also permits this), and always retains a link to the original source (where applicable), so that mixing data and deduplication are fully supported."]
      }), createVNode(_components.p, {
        children: "In addition, Pathoplexus is purposefully complementary to INSDC-member databases, as all data in Pathoplexus eventually goes to INSDC.\r\nFor Open Data submitted to Pathoplexus, this means Pathoplexus can be used as simply another way to send data to INSDC, as it is passed on immediately.\r\nFor Restricted-Use Data submitted to Pathoplexus, Pathoplexus serves as a ‘temporary protected home’ before it eventually becomes Open."
      }), createVNode(_components.p, {
        children: "Pathoplexus sequences are annotated with cross-references to the corresponding INSDC and GISAID accessions if available."
      })]
    }), "\n", createVNode("details", {
      children: createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "What is Pathoplexus doing about issues around pathogen access and benefits?"
          }), " "]
        }), "\r\nWhile developing Pathoplexus, the issue of countries and regions sharing sequences but not receiving an equitable share of the benefit that can be derived from those sequences (e.g. vaccines), was a topic we discussed deeply. This is also a topic that’s currently under debate globally, with efforts to develop pathogen access and benefits sharing (“PABS”) agreements. After much consideration, we don’t feel a singular database is the place to try and fix this inequity - but we do want to be part of the eventual solution. This is why we ", createVNode(_components.a, {
          href: "../../about/governance/values#article-4-beneficial-sharing",
          children: "commit to adhering to future consensus-driven international PABS agreements"
        }), "."]
      })
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: " How can I try Pathoplexus out?"
          }), " "]
        }), "\r\nIf you don’t have sequences to upload for the pathogens we currently support - or just want to try out Pathoplexus before deciding if you want to use it - you\r\ncan always use our ", createVNode(_components.a, {
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
      })]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-the-pathogens-we-support",
      children: "Questions about the pathogens we support"
    }), "\n", createVNode("details", {
      children: [createVNode("summary", {
        children: [" ", createVNode("span", {
          class: "faq",
          children: "I’d like my virus of interest to be on Pathoplexus, how can I ask for it to be added?"
        }), " "]
      }), createVNode(_components.p, {
        children: ["If communities that work on a particular virus believe it would be helpful to add this to Pathoplexus, we’d love to hear about it!\r\nWe’re keen to add viruses while working ", createVNode(_components.em, {
          children: "with"
        }), " those who study those viruses, so that we can ensure it’s of maximum value to the community.\r\nWe may not have the resources to add additional viruses immediately, so we ask for your patience while we try to get\r\nfunding to build up and support our development."]
      }), createVNode(_components.p, {
        children: ["However, we’re still keen to build a list of viruses that the community is keen to see on Pathoplexus. Please search our ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/pathoplexus/issues",
          children: "GitHub Issues"
        }), "\r\nto see if anyone has already proposed the virus you’d like to suggest - if so, comment to support their proposal! If not, please create a new issue, outlining why\r\nyou think it would be a great addition, and if possible, listing others in the community who support adding that virus!"]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "How do you choose the pathogens to include?"
          }), " "]
        }), "\r\nIn future, we aim to prioritize viruses that have a high public health interest and currently have a less-than-ideal sequence sharing situation, for any reason.\r\nFor example, the community may not be sharing much data because of fear of ‘scooping,’ or they may find uploading the data too difficult.\r\nAlternatively, it could currently be fragmented and shared in different places, and Pathoplexus could be a way to bring it together."]
      }), createVNode(_components.p, {
        children: "We are also keen to add pathogens where there’s support in that pathogen community - where the community feels like having the pathogen on Pathoplexus will be a benefit."
      }), createVNode(_components.p, {
        children: "Finally, we will also consider the technical difficulty of including a new virus in prioritization.\r\nFor example, multi-segmented viruses require more work to ensure we’re matching up segments correctly, and some viruses may be more difficult to write robust quality-control metrics for.\r\nHowever, none of this rules out adding a new virus completely - it may just have to wait a bit longer until we have sufficient resources!"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-data",
      children: "Questions about data"
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: " Can I use the data on Pathoplexus?"
          }), " "]
        }), "\r\nYes! Pathoplexus is designed to be used by everyone, and so all data is accessible.\r\nHowever, Pathoplexus does have restrictions on how some data (“Restricted-Use Data”) can be used, particularly in publications and preprints, and has requirements on how all Restricted-Use Data is acknowledged."]
      }), createVNode(_components.p, {
        children: ["You can find out more about these protections and how you can use data by reading our ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), ". We also have summaries on how you can use ", createVNode(_components.a, {
          href: "/about/terms-of-use/open-data",
          children: "Open Data"
        }), " and ", createVNode(_components.a, {
          href: "/about/terms-of-use/restricted-data",
          children: "Restricted-Use Data"
        }), "."]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: " How can I contribute data to Pathoplexus?"
          }), " "]
        }), "\r\nWe’ve tried to make sharing your data as easy and flexible as possible!"]
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
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "Where does my data go when I submit it to Pathoplexus?"
          }), " "]
        }), "\r\nWhen you submit your data to Pathoplexus, it gets securely stored in our database, hosted on AWS in Europe (under GDPR)."]
      }), createVNode(_components.p, {
        children: "If you’ve chosen for your data to be open straight away, it will be submitted to the European Nucleotide Archive (ENA). It can take up to a week for data to appear on ENA, due to processing delays on their side."
      }), createVNode(_components.p, {
        children: "It will then be synchronised across all INSDC-member databases (i.e. GenBank and DDBJ) in a short time, and will continue to be available on Pathoplexus."
      }), createVNode(_components.p, {
        children: ["If you’ve selected the ", createVNode(_components.em, {
          children: "Restricted-Use"
        }), " data terms, your data will not be submitted to the INSDC until it becomes ", createVNode(_components.em, {
          children: "Open"
        }), "."]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "Should I submit my data to both INSDC-member databases (Genbank, ENA, etc) and Pathoplexus?"
          }), " "]
        }), "\r\nNo, you should ", createVNode(_components.em, {
          children: "not"
        }), " submit your data to both INSDC and Pathoplexus, as it may result in your data being duplicated in both places.\r\nIf you submit to INSDC, we will pull your data into Pathoplexus, so there’s no need to submit it here!\r\nIf you submit to Pathoplexus, the data will go to INSDC when you specify (and immediately, if you select the data is open), so there’s no need to upload it to INSDC yourself - we’ll take care of that!"]
      }), createVNode(_components.p, {
        children: "Since we keep a record of all the data we pass onto INSDC, we ensure we don’t duplicate it - but we can’t do this if users upload to both place separately!"
      })]
    }), "\n", createVNode("details", {
      children: createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "I originally submitted my data to GISAID. Can I now submit it to Pathoplexus as well?"
          }), " "]
        }), "\r\nYes, you can, as long as you have not shared your sequences to INSDC databases (Genbank, ENA, DDBJ).\r\nIn contrast to Pathoplexus, GISAID does not submit data to the INSDC on your behalf.\r\nSo unless you yourself submitted your sequences to the INSDC, you can submit them to Pathoplexus.\r\nTo ensure data integrity, we encourage you to add your sequences’ GISAID Isolate ID (EPI_ISL) to the ", createVNode(_components.code, {
          children: "gisaidIsolateId"
        }), " metadata field when you submit your sequences to Pathoplexus."]
      })
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "How is data use restricted in Pathoplexus?"
          }), " "]
        }), "\r\nWhen you submit your data to Pathoplexus, you have the option to restrict how it can be used for a limited time, or make it fully open straight away.\r\nIf you choose to keep your data restricted in how it can be used, it will have these protections for up to a year, giving you time to publish your research.\r\nAfter this period, or if you choose to share it openly immediately, your data will be released on international databases (INSDC-member databases)."]
      }), createVNode(_components.p, {
        children: ["If you want to use data from Pathoplexus, it’s critical you familiarize yourself with our ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), ",\r\nso you know how you can use sequences and how you must acknowledge them."]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "Where does Pathoplexus get its data?"
          }), " "]
        }), "\r\nWe get our data two ways: ingesting (‘pulling’) open data from INSDC-member databases, and the data the Pathoplexus users upload to us directly."]
      }), createVNode(_components.p, {
        children: ["Pathoplexus ingests data from INSDC-member databases (specifically, from ", createVNode(_components.a, {
          href: "https://www.ncbi.nlm.nih.gov/datasets",
          children: "NCBI Datasets"
        }), ") for all the Pathogens it supports.\r\nWe do this automatically at regular intervals, but always preserve the link back to the INSDC source.\r\nYou can easily tell if a sequence originated from INSDC if the ‘Submitting group’ is ", createVNode(_components.code, {
          children: "Automated Ingest from INSDC/NCBI Virus"
        }), "."]
      }), createVNode(_components.p, {
        children: ["Users can also submit data to us directly, which we eventually pass on to the INSDC network. All Restricted-Use data is directly submitted.\r\nYou can easily tell if Open data was submitted to us directly by seeing if the ‘Submitting group’ is anyone other than ", createVNode(_components.code, {
          children: "Automated Ingest from INSDC/NCBI Virus"
        }), "."]
      })]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-our-future-and-plans",
      children: "Questions about our future and plans"
    }), "\n", createVNode("details", {
      children: createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "I’m a funding agency or organization interested in helping Pathoplexus, who should I contact?"
          }), " "]
        }), "\r\nWe are incredibly grateful for support in turning Pathoplexus into a long-term project that can help improve pathogen sequence sharing!\r\nWe’re currently looking for support in all forms and sizes, and we’d love to chat with you.\r\nPlease send an email to ", createVNode(_components.a, {
          href: "mailto:funding@pathoplexus.org",
          children: "funding@pathoplexus.org"
        }), ", and we’ll be in touch!"]
      })
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "What are Pathoplexus’ current priorities?"
          }), " "]
        }), "\r\nCurrently we’re in our ‘Initial Phase’. We’re focusing on introducing ourselves to the community,\r\ngetting feedback on Pathoplexus, and starting conversations about how Pathoplexus could help improve pathogen sequence sharing."]
      }), createVNode(_components.p, {
        children: "We’re also focused on attracting funding. Pathoplexus has been developed, and is currently running, thanks to volunteer efforts and donations of\r\nprogrammers and infrastructure. However, to turn Pathoplexus into something that can run for years to come, we need support in infrastructure\r\n(to run the computational side of the database), administration (to help manage and run Pathoplexus), and developers (to add features and make\r\nPathoplexus a fully-fledged database)."
      }), createVNode(_components.p, {
        children: ["Pathoplexus hopes to be a long-term player in the pathogen sequence sharing space for as long as it’s needed.\r\nHowever, it’s also been purposefully designed to be able to ", createVNode(_components.em, {
          children: "stop"
        }), " existing without any data being lost.\r\nIf there comes a day when Pathoplexus isn’t needed (because fear around data sharing has been alleviated via other methods, or because better solutions become available),\r\nit is bound to remain in existence long enough to ensure all remaining data is uploaded to INSDC, at which point it can ‘fold gracefully,’ with no data being lost."]
      })]
    }), "\n", createVNode("details", {
      children: [createVNode("summary", {
        children: [" ", createVNode("span", {
          class: "faq",
          children: "What are Pathoplexus’ future plans?"
        }), " "]
      }), createVNode(_components.p, {
        children: "Once we secure funding, some of our top priorities are:"
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "Improve our SeqSet visualization to give even more information about the sequences it includes"
        }), "\n", createVNode(_components.li, {
          children: "Add tracking of DOIs via CrossRef and link this to sequences to show their contribution to all publications"
        }), "\n", createVNode(_components.li, {
          children: "Start working with journals to add ethical sequence use to the consideration of submitted manuscripts"
        }), "\n", createVNode(_components.li, {
          children: "Perfect a system to quickly add new pathogens in crisis (or potential crisis) scenarios"
        }), "\n", createVNode(_components.li, {
          children: "Add more viral pathogens, as asked for by those pathogen communities"
        }), "\n", createVNode(_components.li, {
          children: "Expand our features, additional data we can provide to sequences, and our API"
        }), "\n", createVNode(_components.li, {
          children: "Enable federalization, allowing a ‘Pathoplexus Network’ that exchanges data on the same principles, but allows shared data ‘ownership’ and continued existence if any one ‘node’ goes down"
        }), "\n"]
      })]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-our-code",
      children: "Questions about our code"
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "What is the code underlying Pathoplexus? What is Loculus?"
          }), " "]
        }), "\r\nPathoplexus is an instance of the broader pathogen data sequence sharing software Loculus.\r\nThis means that Pathoplexus runs on Loculus code, with specific features, personalization, and most importantly, surrounding governance, that make it ‘Pathoplexus.’\r\nAll of the Pathoplexus code is open-source and you can view it ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/pathoplexus",
          children: "here"
        }), "."]
      }), createVNode(_components.p, {
        children: "Loculus was designed at the same time as Pathoplexus, but is intended to be a flexible, customizable generic pathogen sequence-sharing database.\r\nFor example, a lab might use Loculus to store the samples they sequence locally and be able to easily search and access them,\r\nor a university may have a Loculus instance to gather all the sequences they generate together in one place.\r\nAlternatively, someone could create another Loculus instance to serve bacterial pathogens, much like Pathoplexus!"
      }), createVNode(_components.p, {
        children: ["All of the Loculus code is also open-source, and you can view it ", createVNode(_components.a, {
          href: "https://github.com/loculus-project/loculus",
          children: "here"
        }), "."]
      })]
    }), "\n", createVNode(_components.h2, {
      id: "questions-about-our-website",
      children: "Questions about our website"
    }), "\n", createVNode("details", {
      children: [createVNode(_components.p, {
        children: [createVNode("summary", {
          children: [" ", createVNode("span", {
            class: "faq",
            children: "Where do the images of pathogens on the front page come from?"
          }), " "]
        }), "\r\nWe’re incredibly grateful to ", createVNode(_components.a, {
          href: "https://www.niaid.nih.gov/",
          children: "NIAID"
        }), " for providing fantastic images of pathogens. You can check out their incredible ", createVNode(_components.a, {
          href: "https://www.flickr.com/photos/niaid/",
          children: "Flickr account"
        }), " to see more great images."]
      }), createVNode(_components.p, {
        children: "The images we use from NIAID are:"
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "https://www.flickr.com/photos/niaid/40689899455/",
            children: "CCHF"
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "https://www.nih.gov/sites/default/files/styles/featured_media_breakpoint-medium/public/news-events/news-releases/2023/niaid-03.jpg?itok=m4wFNGkn&timestamp=1675437186",
            children: "Ebola Sudan"
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "https://www.flickr.com/photos/niaid/14440817981/in/album-72157646274075631/",
            children: "Ebola Zaire"
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "https://www.flickr.com/photos/niaid/52453988775/",
            children: "RSV"
          })
        }), "\n"]
      }), createVNode(_components.p, {
        children: ["We are grateful to use this ", createVNode(_components.a, {
          href: "https://pixnio.com/science/microscopy-images/west-nile-disease/micrograph-of-the-west-nile-virus",
          children: "West Nile Virus image"
        }), " from Cynthia Goldsmith at USCDCP."]
      }), createVNode(_components.p, {
        children: ["We are grateful to use this ", createVNode(_components.a, {
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3016779/figure/F3/",
          children: "HMPV image"
        }), " from Paul Chan."]
      }), createVNode(_components.p, {
        children: ["Lastly, we are grateful to use this ", createVNode(_components.a, {
          href: "https://cdn.who.int/media/images/default-source/health-topics/monkeypox/12763.tmb-1200v.jpg?sfvrsn=cd044fbd_3",
          children: "Mpox Virus image"
        }), " from the WHO."]
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

const url = "/about/faq";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/faq.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/faq.mdx";
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

export { _page as _ };
