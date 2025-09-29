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
  "layout": "../../../layouts/AboutLayout.astro",
  "title": "Data Use Terms",
  "order": 1
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 1,
    "slug": "1-definitions",
    "text": "1. Definitions:"
  }, {
    "depth": 1,
    "slug": "2-data-submission-and-protection",
    "text": "2. Data Submission and Protection"
  }, {
    "depth": 1,
    "slug": "3-onward-submission-to-insdc",
    "text": "3. Onward Submission to INSDC"
  }, {
    "depth": 1,
    "slug": "4-terms",
    "text": "4. Terms"
  }, {
    "depth": 2,
    "slug": "41-open-data",
    "text": "4.1 Open Data"
  }, {
    "depth": 3,
    "slug": "411-third-party-data-sharing",
    "text": "4.1.1 Third Party Data Sharing"
  }, {
    "depth": 2,
    "slug": "42-restricted-data-use",
    "text": "4.2 Restricted Data Use"
  }, {
    "depth": 3,
    "slug": "421-unpublished-and-un-preprinted-work",
    "text": "4.2.1 Unpublished and Un-Preprinted Work"
  }, {
    "depth": 3,
    "slug": "422-publications-and-preprints",
    "text": "4.2.2 Publications and Preprints"
  }, {
    "depth": 3,
    "slug": "requirements-for-use-of-restricted-use-data-in-publications-and-preprints",
    "text": "Requirements for use of Restricted-Use Data in publications and preprints:"
  }, {
    "depth": 3,
    "slug": "423-deciding-if-restricted-use-data-is-part-of-a-focal-or-background-set",
    "text": "4.2.3 Deciding if Restricted-Use Data is part of a Focal or Background Set"
  }, {
    "depth": 3,
    "slug": "424-third-party-data-sharing",
    "text": "4.2.4 Third Party Data Sharing"
  }, {
    "depth": 2,
    "slug": "43-using-all-data",
    "text": "4.3 Using All Data"
  }, {
    "depth": 2,
    "slug": "44-how-to-create-a-seqset",
    "text": "4.4 How to Create a SeqSet"
  }, {
    "depth": 1,
    "slug": "5-how-to-check-a-seqset",
    "text": "5. How to Check a SeqSet"
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
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Summaries of our Data Use Terms for ", createVNode(_components.a, {
        href: "/about/terms-of-use/open-data",
        children: "Open Data"
      }), " and ", createVNode(_components.a, {
        href: "/about/terms-of-use/restricted-data",
        children: "Restricted-Use Data"
      }), " are also available. Note that only the ", createVNode(_components.strong, {
        children: "full"
      }), " Data Use Terms are used to interpret and arbitrate use."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode("br", {}), "\n", createVNode(_components.p, {
      children: "These Terms were updated on 24 July 2025 and are the current and valid version."
    }), "\n", createVNode(_components.p, {
      children: "These Terms constitute the legal agreement between you (a “User”) and Pathoplexus (“we”, “us”, “our”) (of Pathoplexus, Basel-Stadt, Switzerland), governing how Restricted-Use Data can be used and shared onward, as well as how it must be attributed when used."
    }), "\n", createVNode(_components.p, {
      children: ["This document is governed by the ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), " and should be interpreted in light of the Pathoplexus Values. The Executive Board can modify and make changes to this document, in line with the purpose and commitments of the Pathoplexus Values, via 2/3 majority vote of the entire Board. If the Board has 5 members, this is interpreted as 4/5 votes in favor."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus aims to encourage data sharing by providing multiple options for sequence sharing, with submitters choosing  whether to immediately provide data under open conditions, or to stipulate that its use is restricted for a period of time to mitigate concerns of “scooping” and use without appropriate acknowledgement. Pathoplexus believes that ethical use of all data is critical. This data is only available due to the hard work of data generators. Rapid data sharing, which allows the rapid assessment of pathogen characteristics and dynamics, will only be possible if trust is maintained that shared data will be used and acknowledged appropriately. By engaging in considerate, ethical, and fair use of the data shared with the community, Pathoplexus users can play an active role in building a community that fosters more data sharing."
    }), "\n", createVNode(_components.h2, {
      id: "contents",
      children: "Contents:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#1-definitions",
          children: "1. Definitions"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#2-data-submission-and-protection",
          children: "2. Data Submission and Protection"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#3-onward-submission-to-insdc",
          children: "3. Onward Submission to INSDC"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#4-terms",
          children: "4. Terms"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.a, {
              href: "#41-open-data",
              children: "4.1 Open data"
            }), "\n", createVNode(_components.ul, {
              children: ["\n", createVNode(_components.li, {
                children: createVNode(_components.a, {
                  href: "#411-third-party-data-sharing",
                  children: "4.1.1 Third party data sharing"
                })
              }), "\n"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.a, {
              href: "#42-restricted-data-use",
              children: "4.2 Restricted data use"
            }), "\n", createVNode(_components.ul, {
              children: ["\n", createVNode(_components.li, {
                children: createVNode(_components.a, {
                  href: "#421-unpublished-and-un-preprinted-work",
                  children: "4.2.1 Unpublished and un-preprinted work"
                })
              }), "\n", createVNode(_components.li, {
                children: createVNode(_components.a, {
                  href: "#422-publications-and-preprints",
                  children: "4.2.2 Publications and Preprints"
                })
              }), "\n", createVNode(_components.li, {
                children: createVNode(_components.a, {
                  href: "#423-deciding-if-restricted-use-data-is-part-of-a-focal-or-background-set",
                  children: "4.2.3 Deciding if Restricted-Use Data is part of a Focal or Background Set"
                })
              }), "\n", createVNode(_components.li, {
                children: createVNode(_components.a, {
                  href: "#424-third-party-data-sharing",
                  children: "4.2.4 Third party data sharing"
                })
              }), "\n"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#43-using-all-data",
              children: "4.3 Using all data"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#44-how-to-create-a-seqset",
              children: "4.4 How to create a SeqSet"
            })
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#5-how-to-check-a-seqset",
          children: "5. How to check a Seqset"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "1-definitions",
      children: "1. Definitions:"
    }), "\n", createVNode(_components.p, {
      children: "As used in Data Use Terms, the following terms shall have the following meanings:"
    }), "\n", createVNode("div", {
      class: "indent",
      children: createVNode("div", {
        class: "indent",
        children: [createVNode(_components.p, {
          children: ["1.1 The term “User” shall mean everyone who accesses the web service (", createVNode(_components.a, {
            href: "https://pathoplexus.org",
            children: "https://pathoplexus.org"
          }), ") in any form"]
        }), createVNode(_components.p, {
          children: "1.2 The term “Submitter shall mean those who submit data to Pathoplexus"
        }), createVNode(_components.p, {
          children: "1.3 The Term “Submitting Group” shall mean a group that a Submitter has submitted sequences on behalf of, and has control over all sequences submitted on behalf of that Submitting Group"
        }), createVNode(_components.p, {
          children: "1.4 The term “Curator” shall mean those who have elevated access in order to help detect and correct errors in the data"
        }), createVNode(_components.p, {
          children: "1.5 The term “SeqSet” shall mean collections of sequences indicated by their accession numbers, which provide unique identifiers that can be used to reference that set of sequences."
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "2-data-submission-and-protection",
      children: "2. Data Submission and Protection"
    }), "\n", createVNode(_components.p, {
      children: ["Users can submit sequences for supported pathogens with associated, non-sensitive metadata, (see the ", createVNode(_components.a, {
        href: "/docs/concepts/metadataformat",
        children: "metadata fields we accept"
      }), ",\r\nand ", createVNode(_components.a, {
        href: "/about/terms-of-use/terms-of-service#2-data-quality-data-rights-and-liability",
        children: "what data is sensitive"
      }), ")\r\neither without use restrictions (herein called “", createVNode(_components.strong, {
        children: "Open Data"
      }), "” for brevity) or with use restrictions (“", createVNode(_components.strong, {
        children: "Restricted-Use Data"
      }), "”) - both types of data together are referred to here as “Pathoplexus Data” or the “Data”."]
    }), "\n", createVNode(_components.p, {
      children: ["The Data are made available to all Users, at no cost, on condition of acceptance of the Data Use Terms (upon accessing the Data in any form, Users agree to ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ". The Data Use Terms are further explicitly linked to within the metadata."]
    }), "\n", createVNode(_components.p, {
      children: ["Restricted-Use Data can ", createVNode(_components.strong, {
        children: "only"
      }), " be used within the conditions of the Data Use Terms (see below).\r\nOpen Data is not subject to these terms, but should still be used ethically: data generators should be acknowledged and collaborations should be sought in some circumstances (see ", createVNode(_components.a, {
        href: "#41-open-data",
        children: "Open Data"
      }), " below).\r\nUsers are required to read the Data Use Terms in detail and note applicable restrictions and expectations of notification, offers of collaboration, and acknowledgement that should be followed."]
    }), "\n", createVNode(_components.h1, {
      id: "3-onward-submission-to-insdc",
      children: "3. Onward Submission to INSDC"
    }), "\n", createVNode(_components.p, {
      children: "Open Data submitted to Pathoplexus is immediately submitted to INSDC on behalf of the original Submitters, where it becomes additionally available on all INSDC platforms."
    }), "\n", createVNode(_components.p, {
      children: "Restricted-Use Data is displayed in Pathoplexus with a clear indication that its use is restricted, and is held under embargo at INSDC so that it is not accessible through the INSDC databases until the expiration of the Restricted-Use period of up to one year. Immediate embargoed submissions to INSDC allows Submitters to obtain accession numbers to be used in publication, whilst keeping their data subject to the Pathoplexus terms of use. After the Restricted Use period ends, Restricted-Use Data becomes Open Data."
    }), "\n", createVNode(_components.h1, {
      id: "4-terms",
      children: "4. Terms"
    }), "\n", createVNode(_components.h2, {
      id: "41-open-data",
      children: "4.1 Open Data"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus ", createVNode(_components.strong, {
        children: "expects"
      }), " correct acknowledgement and crediting of Open Data, via SeqSets and DOIs at a minimum, and through collaboration and co-authorship with sequence Submitters where appropriate. In particular, all efforts should be made to avoid “scooping” others’ work. This may include situations where you use extensive data from a country or region without involving and including any authors from that region or publishing analyses that may preclude the original data generators from publishing on their own data."]
    }), "\n", createVNode(_components.p, {
      children: ["Publications and preprints using any form of data from Pathoplexus must provide the accession numbers for the sequences used. Pathoplexus strongly encourages using SeqSets (see section ", createVNode(_components.a, {
        href: "#44-how-to-create-a-seqset",
        children: "4.4"
      }), "). It is also recommended to additionally list the INSDC accessions, to ensure data can be easily traced on both platforms."]
    }), "\n", createVNode(_components.h3, {
      id: "411-third-party-data-sharing",
      children: "4.1.1 Third Party Data Sharing"
    }), "\n", createVNode(_components.p, {
      children: "Data from Pathoplexus that is Open can be shared onward. Pathoplexus encourages the ethical crediting and onward sharing of data (see 4.1), and strongly suggests linking to section 4.1 of the Data Use Terms when making the data available. If displayed on a website or in another database, we encourage users to link each sequence to the original sequence page on Pathoplexus, and display the Pathoplexus accession or link to an INSDC database and display the INSDC accession, if available on INSDC."
    }), "\n", createVNode(_components.h2, {
      id: "42-restricted-data-use",
      children: "4.2 Restricted Data Use"
    }), "\n", createVNode(_components.p, {
      children: ["Restricted-Use Data can ", createVNode(_components.strong, {
        children: "only"
      }), " be used under the Data Use Terms outlined herein."]
    }), "\n", createVNode(_components.p, {
      children: "Data can remain ‘Restricted-Use’ for up to one year after submission. Submitters and Submitting Groups can set a shorter restricted-use period at submission, or choose to end, or shorten, the Restricted-Use period at any time. After this period ends, the data becomes Open Data."
    }), "\n", createVNode(_components.h3, {
      id: "421-unpublished-and-un-preprinted-work",
      children: "4.2.1 Unpublished and Un-Preprinted Work"
    }), "\n", createVNode(_components.p, {
      children: ["Data from Pathoplexus ", createVNode(_components.strong, {
        children: "can be used for unpublished and un-preprinted work"
      }), ", such as, but not limited to: graphical representations, blog posts, social media, public health and governmental reports, and web programs and applications (in this case, see if ", createVNode(_components.a, {
        href: "#424-third-party-data-sharing",
        children: "4.2.4 Third Party Data Sharing"
      }), ", below, is applicable)."]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["For Restricted-Use Data, it ", createVNode(_components.strong, {
          children: "must"
        }), " be acknowledged by providing a list of accession numbers used (or using a SeqSet which will contain all this data) and linking back to Pathoplexus so that users can view the original data and submitters. If all sequences used are from one institution, this institution and the leading author(s) should be credited explicitly. If more than 5 sequences are used, it’s highly recommended to create a SeqSet to easily link to all data used."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "422-publications-and-preprints",
      children: "4.2.2 Publications and Preprints"
    }), "\n", createVNode(_components.p, {
      children: ["In scientific publications and preprints, Restricted-Use data can ", createVNode(_components.strong, {
        children: "often only"
      }), " be used with explicit permission of the Submitting Group. It is ", createVNode(_components.em, {
        children: "vital"
      }), " that you read the conditions of use below."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus believes it is important that people who generate the sequences have the opportunity to complete and publish the analysis they intend with the context and expertise they possess. Thus, we provide guidelines to prevent Users from “telling the submitters’ story” when using others’ data. To aid in this interpretation we have created the categories of “Focal Set” and “Background Set”."
    }), "\n", createVNode(_components.p, {
      children: ["Users utilizing data from Pathoplexus in publications and preprints ", createVNode(_components.strong, {
        children: "must"
      }), " create a SeqSet (see section ", createVNode(_components.a, {
        href: "#44-how-to-create-a-seqset",
        children: "4.4"
      }), ") containing the Pathoplexus accession numbers and generate a DOI, dividing their sequence and metadata into two groups:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The “Focal Set” is defined as sequences that are key to the analysis and resulting conclusions of the manuscript - these sequences cannot be left out or replaced without changing the analysis significantly."
      }), "\n", createVNode(_components.li, {
        children: ["The “Background Set” is defined as sequences that provide context or background, but could be replaced or (partially) removed, without changing the results. In the circumstance where all available data is being used, the entire set may be equivalent to a “Background Set” - see ", createVNode(_components.a, {
          href: "#43-using-all-data",
          children: "Using All Data"
        }), ", below."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["For more a more detailed description of how to divide data into “Focal” and “Background Sets”, see ", createVNode(_components.a, {
        href: "#423-deciding-if-restricted-use-data-is-part-of-a-focal-or-background-set",
        children: "4.2.3 ‘Deciding’"
      }), ", below."]
    }), "\n", createVNode(_components.p, {
      children: ["The requirements for using Restricted-Use data in a Focal or Background Set differ - ", createVNode(_components.strong, {
        children: "please read carefully"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "requirements-for-use-of-restricted-use-data-in-publications-and-preprints",
      children: createVNode(_components.strong, {
        children: "Requirements for use of Restricted-Use Data in publications and preprints:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["If Restricted-Use Data is part of a Focal Set, you must satisfy the ", createVNode(_components.em, {
          children: "three"
        }), " points below"]
      }), "\n"]
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode("span", {
          class: "inline",
          children: ["One or more Submitters must be included as an author on the manuscript (as agreed with the Submitting Group) (“Authorship”)\r\n", createVNode("span", {
            class: "block py-2",
            children: createVNode(_components.strong, {
              children: "or"
            })
          }), "\r\nThe authors of the manuscript should include, as a supplemental document to the manuscript, explicit written permission of the Submitting Group, giving permission to publish and turning down Authorship (“Authorship Waiver”)."]
        }), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["The authors must create a SeqSet containing all Focal Set data from Pathoplexus, generate a DOI, and cite this DOI in the manuscript as a reference. ", createVNode("br", {}), createVNode("br", {})]
      }), "\n", createVNode(_components.li, {
        children: ["Add the following statement to the Acknowledgement section of the manuscript: “We confirm that we have adhered to the Data Use Terms of Pathoplexus.”", createVNode("br", {}), createVNode("br", {})]
      }), "\n"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["If Restricted-Use Data is part of a Background Set:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: ["Very carefully consider whether your Restricted-Data can, and should, be considered Background Set by reading the ", createVNode(_components.a, {
              href: "#423-deciding-if-restricted-use-data-is-part-of-a-focal-or-background-set",
              children: "4.2.3 ‘Deciding’"
            }), " guidelines below."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.a, {
              href: "#44-how-to-create-a-seqset",
              children: "Create a SeqSet"
            }), " containing all Background Set data from Pathoplexus, generate a DOI, and be sure to cite this DOI in the manuscript as a reference."]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "423-deciding-if-restricted-use-data-is-part-of-a-focal-or-background-set",
      children: "4.2.3 Deciding if Restricted-Use Data is part of a Focal or Background Set"
    }), "\n", createVNode(_components.p, {
      children: ["When deciding whether data should be part of the Focal Set, the ", createVNode(_components.em, {
        children: "intent"
      }), " of a Focal Set should be interpreted broadly: this is data without which the work would not be possible. Data that is part of a Focal Set is thus data that is critical to the analysis - it could not be removed or replaced with a randomly selected similar set without changing the results significantly and thus should be acknowledged appropriately."]
    }), "\n", createVNode(_components.p, {
      children: ["Focal Set - if you answer yes to ", createVNode(_components.strong, {
        children: "any"
      }), " of these, this data should be part of your “Focal Set”:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "If I removed these sequences from my analysis (but kept the Background Set), would the analysis be impossible and/or the result be completely different?"
      }), "\n", createVNode(_components.li, {
        children: "If I removed these sequences and replaced them with sequences from another country/time-period would my analysis not exist or be completely different?"
      }), "\n", createVNode(_components.li, {
        children: "Do I mention these accession IDs or sequence names in my paper explicitly?"
      }), "\n", createVNode(_components.li, {
        children: "Are these sequences from a specific geographic area that my analysis focuses on (either on purpose or by chance - ex: the location where a new variant/strain originated or where a mutation of interest is present, which is the subject of the manuscript)?"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["The ", createVNode(_components.em, {
        children: "intent"
      }), " of data in a Background Set is to provide context to the Focal Set. Including data in the Background Set implies that this data could be replaced with other data to a reasonable degree without impacting the analysis. Any data for which this is not true should be part of the Focal Set."]
    }), "\n", createVNode(_components.p, {
      children: ["Background Set - if you answer yes to ", createVNode(_components.strong, {
        children: "all"
      }), " of these, the data ", createVNode(_components.em, {
        children: "may"
      }), " be acceptable to include in a “Background Set”:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "If I removed these sequences from my analysis but replaced them with other, randomly selected sequences from the entire dataset, would my analysis still be meaningful and the result the same (even if weaker or less clear)?"
      }), "\n", createVNode(_components.li, {
        children: "If using sequences from multiple countries/regions, could I remove any one country/region from this analysis without affecting my main results? (If this is true for some geographical areas but not others, the ones for which it is not true should be part of your “Focal Set”)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["If unsure whether data should be in the Focal or Background Set, it is best practice to ", createVNode(_components.strong, {
        children: "consider the data part of a Focal Set"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "424-third-party-data-sharing",
      children: "4.2.4 Third Party Data Sharing"
    }), "\n", createVNode(_components.p, {
      children: ["Restricted-Use Data from Pathoplexus can be shared onward but the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " must be clearly communicated, and any data distributed must include the Data Use Terms columns (", createVNode(_components.code, {
        children: "dataUseTerms"
      }), ", ", createVNode(_components.code, {
        children: "dataUseTermsRestrictedUntil"
      }), " and ", createVNode(_components.code, {
        children: "dataUseTermsUrl"
      }), ") intact in the metadata. If displayed on a website or in another database, each sequence must have a direct link to the original sequence page on Pathoplexus and display the Pathoplexus accession."]
    }), "\n", createVNode(_components.p, {
      children: ["The focus of Pathoplexus is on open availability of data. If Users share Restricted-Use Pathoplexus data onward as a database or as part of a database it must be under the same circumstances as it has been provided to User: without access restrictions. An exception is made for private use for small groups or labs with up to 200 users. If Users wish to use Pathoplexus data in an access-restricted database with more than 200 users, Users must contact Pathoplexus to request permission (", createVNode(_components.a, {
        href: "mailto:help@pathoplexus.org",
        children: "help@pathoplexus.org"
      }), "). We generally support onward sharing for collaborative use (such as access within an institution for their employees, or sharing within a collaboration for joint downstream analysis) and encourage you to reach out. Requests will be considered and decided by the Executive Board."]
    }), "\n", createVNode(_components.h2, {
      id: "43-using-all-data",
      children: "4.3 Using All Data"
    }), "\n", createVNode(_components.p, {
      children: "In some cases there are a large number of data submitters that have contributed to the database and in these cases, analyses and applications that use all data from the database can consider this data as “Background Set” without explicit involvement of the submitters. In other cases, where only a small number of groups have contributed, it would not be ethical to use all data without contacting and involving the submitting groups."
    }), "\n", createVNode(_components.p, {
      children: "If a large number of submitters have contributed to the data, and you can answer yes to one of the scenarios below, it may be appropriate to treat your entire dataset as a “Background Set” and acknowledge it appropriately."
    }), "\n", createVNode(_components.p, {
      children: "Examples of what would be considered appropriate use of All Data:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Using every available sequence in order to look at overarching sequence properties (ex: frequencies of a mutation) that are found globally or across continents"
      }), "\n", createVNode(_components.li, {
        children: ["Using every sequence available in order to speak to only global/international trends with ", createVNode(_components.strong, {
          children: "no specific focus"
        }), " on a country or region, especially one where a virus/variant/strain/clade originated or where a mutation of interest is only found"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "44-how-to-create-a-seqset",
      children: "4.4 How to Create a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: ["Please see our how-to ", createVNode(_components.a, {
        href: "/docs/how-to/generate-seqset",
        children: "here"
      }), " for how to create a SeqSet."]
    }), "\n", createVNode(_components.p, {
      children: "If you are producing a publication or preprint, you MUST cite the DOI in the References section of your manuscript (as if it was another paper or resource) so that it is documented by CrossRef and the paper can be linked to the sequences used."
    }), "\n", createVNode(_components.h1, {
      id: "5-how-to-check-a-seqset",
      children: "5. How to Check a SeqSet"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "(Particularly for Editor, Reviewers, & Readers)"
      })
    }), "\n", createVNode(_components.p, {
      children: "We appreciate and value the efforts of publishers to encourage and promote the ethical behavior of publishing scientists, by checking for any restrictions on data they are publishing, as well as the geographical distribution of the data - particularly for the focal set."
    }), "\n", createVNode(_components.p, {
      children: "Anyone can easily check a SeqSet by following the pathoplexus.org SeqSet link or the DOI link provided to you."
    }), "\n", createVNode(_components.p, {
      children: "Editors and reviewers are always encouraged to reach out to authors in order to better understand their choice in sequences, authors, and focal/background split. Having written guidelines guiding data use is relatively new, and many authors may genuinely misunderstand or misinterpret them, and be happy to rectify issues that fall foul of the Data Use Terms."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Things to consider"
      }), " for publishers, reviewers, and others checking DOI sets:"]
    }), "\n", createVNode(_components.p, {
      children: "For a Focal Set:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Are any of the sequences Restricted Use Data? If so, they should have at least one Submitter of these sequences in their authorship list, or a letter giving permission to publish and waiving authorship. Editors and reviewers are encouraged to consider whether any submitting authors included are a fair representation, considering the analysis and the data used (does this seem like a genuine collaboration effort, or simply inclusion of a ‘token author’?) and to seek clarification before acceptance if helpful."
      }), "\n", createVNode(_components.li, {
        children: "What is the geographic distribution of the data, and does it match the geographic distribution of the authorship of the manuscript? If all authors are from or based in a region that is separate from where the majority of the focal data stems, is the data being used ethically? Editors and reviewers are encouraged to seek clarification in cases where no submitting, generating, or locally-involved persons have been included in the analysis."
      }), "\n", createVNode(_components.li, {
        children: "Does the Focal Set fully encompass the sequences that are the focal point of the manuscript? Does the total number of sequences in the Focal set and their geographic distribution match what they reference in the manuscript? Is there any possibility that their key analysis relies on sequences not included in the Focal set, and if so, why have they been excluded from the Focal set?"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "For Background Set:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Are any of the sequences Restricted Use Data? If so, they should only be included as background sequences if they pass the questions above. If not, they should be included in the Focal set and treated appropriately."
      }), "\n", createVNode(_components.li, {
        children: "How is the Background dataset used? Is the Background data truly playing only a contextualizing role, or have the authors focused on any sequences or countries within the Background set? If so, these sequences need to be part of the Focal Set."
      }), "\n", createVNode(_components.li, {
        children: "What is the geographic and time distribution of the data? Is the Background Set more broadly spread than the focal set? If the Background Set doesn’t seem to substantially differ from the Focal Set, should it be part of the Focal Set?"
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

const url = "/about/terms-of-use/data-use-terms";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/data-use-terms.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/data-use-terms.mdx";
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
