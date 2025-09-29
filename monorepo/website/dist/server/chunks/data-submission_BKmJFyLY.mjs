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
  "title": "Data Submission and Processing",
  "order": 3
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 1,
    "slug": "1-definitions",
    "text": "1. Definitions"
  }, {
    "depth": 1,
    "slug": "2-data-submission-and-access",
    "text": "2. Data Submission and Access"
  }, {
    "depth": 1,
    "slug": "3-data-processing",
    "text": "3. Data Processing"
  }, {
    "depth": 1,
    "slug": "4-data-fields",
    "text": "4. Data Fields"
  }, {
    "depth": 2,
    "slug": "5-persistence",
    "text": "5. Persistence"
  }, {
    "depth": 1,
    "slug": "6-curation",
    "text": "6. Curation"
  }, {
    "depth": 1,
    "slug": "7-revision",
    "text": "7. Revision"
  }, {
    "depth": 1,
    "slug": "8-revocation-and-deletion",
    "text": "8. Revocation and Deletion"
  }, {
    "depth": 2,
    "slug": "81-revocation",
    "text": "8.1 Revocation"
  }, {
    "depth": 2,
    "slug": "82-deletion",
    "text": "8.2 Deletion:"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "These Terms were updated on 4 Aug 2024 and are the current and valid version."
    }), "\n", createVNode(_components.p, {
      children: "These Terms constitute the legal agreement between you (a “User”) and Pathoplexus (“we”, “us”, “our”) (of Pathoplexus, Basel-Stadt, Switzerland), governing what data can be submitted to Pathoplexus and how it is processed and can be changed."
    }), "\n", createVNode(_components.p, {
      children: ["This document is governed by the ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), " and should be interpreted in light of the Pathoplexus Values. The Executive Board can modify and make changes to this document, in line with the purpose and commitments of the Pathoplexus Values, via 2/3 majority vote of the entire Board. If the Board has 5 members, this is interpreted as 4/5 votes in favor."]
    }), "\n", createVNode(_components.h3, {
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
          href: "#2-data-submission-and-access",
          children: "2. Data Submission and Access"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#3-data-processing",
          children: "3. Data Processing"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#4-data-fields",
          children: "4. Data Fields"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#5-persistence",
          children: "5. Persistence"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#6-curation",
          children: "6. Curation"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#7-revision",
          children: "7. Revision"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#8-revocation-and-deletion",
          children: "8. Revocation and Deletion"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#81-revocation",
              children: "8.1 Revocation"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#82-deletion",
              children: "8.2 Deletion"
            })
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "1-definitions",
      children: "1. Definitions"
    }), "\n", createVNode(_components.p, {
      children: "As used in Database Terms of Service, the following terms shall have the following meanings:"
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
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "2-data-submission-and-access",
      children: "2. Data Submission and Access"
    }), "\n", createVNode(_components.p, {
      children: "Submitters can submit sequences to Pathoplexus for supported pathogens with associated, non-sensitive metadata, either with time-limited restrictions on its use (“Restricted-Use Data”) or openly (“Open Data”).\r\nOpen Data (whether open from submission or becoming open after the period of restriction ends) is also submitted by Pathoplexus to INSDC (via ENA), where it becomes additionally available on all INSDC platforms.\r\nOpen Data also includes data pulled in from INSDC for supported pathogens to make it available to all Users alongside Restricted-Use Data."
    }), "\n", createVNode(_components.p, {
      children: ["Restricted-Use Data may also be submitted to INSDC soon after submission to Pathoplexus, but is held under Embargo (see ENA data availability policies ", createVNode(_components.a, {
        href: "https://ena-docs.readthedocs.io/en/latest/faq/release/data-availability-policy.html",
        children: "here"
      }), " and ", createVNode(_components.a, {
        href: "https://ena-docs.readthedocs.io/en/latest/faq/release.html",
        children: "here"
      }), ") until it becomes Open Data; this means it is not visible on any INSDC platform until it becomes Open Data."]
    }), "\n", createVNode(_components.p, {
      children: ["Restricted-Use Data is available only within Pathoplexus, and can only be used in accordance with the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ".\r\nIt is ", createVNode(_components.strong, {
        children: "critical"
      }), " that all Users familiarize themselves with the Data Use Terms, and in particular requirements for authorship and acknowledgement.\r\nPathoplexus expects ethical use of all data (see ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ")."]
    }), "\n", createVNode(_components.p, {
      children: "Users can specify the time period for which data is “Restricted-Use Data”, up to a maximum of one year, and also manually release data from Restricted Use before the time period expires. When the Restricted Use period has ended, Restricted-Use Data becomes Open Data within this database, and is released from embargo on INSDC (making it visible on INSDC platforms)."
    }), "\n", createVNode(_components.p, {
      children: ["All data within Pathoplexus must be used ethically, and in accordance with scientific and community etiquette (see ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), "), and accession numbers should always be provided (see ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ")."]
    }), "\n", createVNode(_components.h1, {
      id: "3-data-processing",
      children: "3. Data Processing"
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus processes submitted data to validate, harmonize, and standardize the data and maximize utility. After initial submission and processing, data is available as version 1, and subsequent changes are reflected in incremented versions. By default, the latest version of all data is displayed unless another version is explicitly requested"
    }), "\n", createVNode(_components.p, {
      children: "To allow Users maximum flexibility in accessing data that is most useful for them, only data without the minimum required metadata values and sequences that fail to be identified (via seed-matching) as specified pathogen are rejected."
    }), "\n", createVNode(_components.p, {
      children: "Data processing includes measures such as:"
    }), "\n", createVNode(_components.p, {
      children: "Sequences:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Checks that the sequence matches the virus specified by the user"
      }), "\n", createVNode(_components.li, {
        children: "Alignment with the reference genome"
      }), "\n", createVNode(_components.li, {
        children: "Translation of genes/coding regions"
      }), "\n", createVNode(_components.li, {
        children: "Quantification of mutations in number and type (both nucleotide and AA)"
      }), "\n", createVNode(_components.li, {
        children: "Labeling of deletions and insertions"
      }), "\n", createVNode(_components.li, {
        children: "Quality control scoring"
      }), "\n", createVNode(_components.li, {
        children: "Assignment of clades/lineages (where applicable)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Metadata:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "All dates are converted to standard ISO format"
      }), "\n", createVNode(_components.li, {
        children: "Location information is standardized"
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "4-data-fields",
      children: "4. Data Fields"
    }), "\n", createVNode(_components.p, {
      children: ["You can see a full list of the data fields we support ", createVNode(_components.a, {
        href: "/docs/concepts/metadataformat",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "5-persistence",
      children: "5. Persistence"
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus is not designed to be the sole final resting place for sequence data. Instead, it is designed to add value to existing public data and to facilitate sharing of additional data. In particular, it provides easy access to datasets via API, allows easy upload of data to public repositories, and provides a temporary, protected holding-place for data allowing data generators time to analyze and publish their work. Thus, Users and Submitters should understand that all submitted sequences will be submitted onward to INSDC databases eventually (after a maximum of one year). This allows data to persist and be reused by others in a sustainable, long-term framework."
    }), "\n", createVNode(_components.h1, {
      id: "6-curation",
      children: "6. Curation"
    }), "\n", createVNode(_components.p, {
      children: ["Curation is a process to flag and rectify errors in sequences and metadata.\r\nThis process is performed by Users with elevated access: Curators.\r\nYou can find a list of our current Curators ", createVNode(_components.a, {
        href: "/about/development-team#curators",
        children: "here"
      }), ".\r\nThis is linked to the process of ", createVNode(_components.a, {
        href: "#7-revision",
        children: "Revision"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Curators follow a well-described procedure, which can be viewed ", createVNode(_components.a, {
        href: "../../docs/how-to/curator-sop",
        children: "here"
      }), ", in deciding when to flag errors and when to suggest, and accept, revisions.\r\nAs also described in the ", createVNode(_components.a, {
        href: "#7-revision",
        children: "Revision"
      }), " section, this works differently depending on whether data was uploaded directly to Pathoplexus, or was obtained from an INSDC database."]
    }), "\n", createVNode(_components.p, {
      children: ["In either case, an error is only considered likely if ", createVNode(_components.strong, {
        children: "two"
      }), " curators independently agree that the evidence presented in our ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/curation_reports",
        children: "‘Curation reports’"
      }), " GitHub repository strongly supports the error."]
    }), "\n", createVNode(_components.p, {
      children: "At this point, the data is flagged as being ‘questioned raised’.  This flag will remain until a Curator is satisfied that the issue is resolved."
    }), "\n", createVNode(_components.p, {
      children: ["In the case where the error cannot be corrected (it’s clear there’s an error but unclear what the correct data is), the sequence will only be flagged. In cases where the error cannot be corrected and the error may cause confusion or be misleading, the Curator can propose to ", createVNode(_components.a, {
        href: "#81-revocation",
        children: "Revoke"
      }), " the sequence. If another Curator agrees, the sequence will be Revoked."]
    }), "\n", createVNode(_components.h1, {
      id: "7-revision",
      children: "7. Revision"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "By submitting group:"
      })
    }), "\n", createVNode("div", {
      class: "indent",
      children: [createVNode(_components.p, {
        children: "Submitters, and the Submitting Group, can correct a submission anytime by submitting a Revision. Revisions by submitters can edit either the metadata or the sequence itself, and allow incorrect data to be fixed, data to be improved (perhaps a better-quality sequence or changing a date from year-only to year-month-day), or data to be added (perhaps symptom information has become available). Revisions of any kind increment the version of a sequence, and the previous states of the data are preserved in previous revisions, which can be accessed at any time."
      }), createVNode(_components.p, {
        children: ["You can find out how to submit a Revision ", createVNode(_components.a, {
          href: "/docs/how-to/revise-submissions",
          children: "here"
        }), "."]
      })]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "By curator:"
      })
    }), "\n", createVNode("div", {
      class: "indent",
      children: [createVNode(_components.p, {
        children: "Curators can also submit Revisions, which work slightly differently depending on whether the data was submitted directly to Pathoplexus or whether it comes from an INSDC database."
      }), createVNode(_components.p, {
        children: "For data submitted directly to Pathoplexus, curators can flag suspected errors (if two curators agree an error is likely to exist), and propose Revisions. However, only Users from the Group that submitted these sequences can accept any proposed Revisions. Directly submitted sequences are never Revised by Pathoplexus without the Submitting Group accepting the Revision."
      }), createVNode(_components.p, {
        children: createVNode(_components.strong, {
          children: "For data directly uploaded to Pathoplexus:"
        })
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.p, {
          children: "Curators will not accept Revisions for directly-uploaded data - only the Submitter and Submitting Group can accept such Revisions. A Curator will flag the sequence(s) in question, and prepare the Revision, and the Submitting Group will be notified. They can accept or reject the Revision. Note that if the Submitting Group reject the Revision, the data will remain ‘flagged’ unless they submit another Revision that a Curator feels corrects the error."
        })
      }), createVNode(_components.p, {
        children: createVNode(_components.strong, {
          children: "For data received from an INSDC database:"
        })
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.p, {
          children: "Once one Curator prepares the Revision, a separate Curator can accept it, resolving the error and removing the flag."
        })
      }), createVNode(_components.p, {
        children: ["More detail about how data can be edited and curated is available ", createVNode(_components.a, {
          href: "../../docs/how-to/curator-sop",
          children: "here"
        }), ".\r\nSee also the section on ", createVNode(_components.a, {
          href: "#6-curation",
          children: "Curation"
        }), ", above."]
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Anyone can flag a suspected error to the attention of Curators, by detailing the nature of the possible error and the supporting evidence ", createVNode(_components.a, {
        href: "/docs/how-to/report-sequence-issues",
        children: "as a GitHub issue in ‘Curation Reports’"
      }), " (preferred) or in an email to ", createVNode(_components.a, {
        href: "mailto:submissions@pathoplexus.org",
        children: "submissions@pathoplexus.org"
      }), "."]
    }), "\n", createVNode(_components.h1, {
      id: "8-revocation-and-deletion",
      children: "8. Revocation and Deletion"
    }), "\n", createVNode(_components.p, {
      children: "If a sequence is incorrect, and cannot immediately be corrected (especially if the error may be misleading or cause confusion), the sequence should be Revoked."
    }), "\n", createVNode(_components.h2, {
      id: "81-revocation",
      children: "8.1 Revocation"
    }), "\n", createVNode(_components.p, {
      children: ["Groups that have submitted data may Revoke a sequence at any time, if there are errors which cannot be corrected. We ask this be done only in situations where the sequence cannot be corrected via a ", createVNode(_components.a, {
        href: "#7-revision",
        children: "Revision"
      }), " (see above) immediately."]
    }), "\n", createVNode(_components.p, {
      children: "Some (non-exhaustive) examples of when a sequence should be Revoked:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["The sequence is an artificial (lab-based) recombination or contamination that could or will lead to misinformation or confusion (during the SARS-CoV-2 pandemic, “", createVNode(_components.a, {
          href: "https://www.nature.com/articles/d41586-022-00149-9",
          children: "Deltacron"
        }), "”)"]
      }), "\n", createVNode(_components.li, {
        children: "In the same vein as the above, the sequence is bad quality in any manner that may lead to misinformation or confusion"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "In all of these cases, a Revision could be submitted instead, if it is available immediately and will rectify the problem.\r\nHowever, if a new version of the sequence or metadata is not yet available (or will never become available), please Revoke the sequence. It is always possible to revert the Revocation by submitting a Revision later, with the correct information."
    }), "\n", createVNode(_components.p, {
      children: "Note that Revocation does not delete the sequence from the database - it is still visible and can be downloaded. However, it is clearly marked as Revoked, is by default excluded from searches, and will not be included in any default data downloads.  It is always possible to revert the Revocation by submitting a Revision later, with the correct information."
    }), "\n", createVNode(_components.p, {
      children: ["You can read how to revoke a sequence ", createVNode(_components.a, {
        href: "/docs/how-to/revoke-sequences",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "82-deletion",
      children: "8.2 Deletion:"
    }), "\n", createVNode(_components.p, {
      children: "Generally, Pathoplexus does not permit the permanent removal of sequences, since this is intransparent and causes confusion when a record cannot be traced. Thus, this can only be done through the intervention of a Pathoplexus administrator and under very specific circumstances."
    }), "\n", createVNode(_components.p, {
      children: "Some cases where this may be permitted:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The sequences contain clinically sensitive or identifiable information"
      }), "\n", createVNode(_components.li, {
        children: "The sequences contain human reads"
      }), "\n", createVNode(_components.li, {
        children: "The sequences were uploaded without permission of those who generated them"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["If you wish to request a consideration of having sequences permanently removed, please contact ", createVNode(_components.a, {
        href: "mailto:submissions@pathoplexus.org",
        children: "submissions@pathoplexus.org"
      }), "."]
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

const url = "/about/governance/data-submission";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/data-submission.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/data-submission.mdx";
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
