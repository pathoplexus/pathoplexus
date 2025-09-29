/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import { $ as $$Image } from './_astro_assets_GucvUgu0.mjs';
import 'clsx';

const __0__________images_CurationReviseButton_png__ = new Proxy({"src":"/_astro/CurationReviseButton.DaJk37oT.png","width":1110,"height":828,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/CurationReviseButton.png";
							}
							
							return target[name];
						}
					});

const __1__________images_CurationRevisionForm_png__ = new Proxy({"src":"/_astro/CurationRevisionForm.DHPA-0hD.png","width":1626,"height":1112,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/CurationRevisionForm.png";
							}
							
							return target[name];
						}
					});

const __2__________images_CurationVersionComment_png__ = new Proxy({"src":"/_astro/CurationVersionComment.DfjOXDkN.png","width":1578,"height":610,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/CurationVersionComment.png";
							}
							
							return target[name];
						}
					});

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$DocLayout, {
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
  "layout": "../../../layouts/DocLayout.astro",
  "title": "Curator Standard Operating Procedure (SOP)",
  "order": 70
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "overview",
    "text": "Overview"
  }, {
    "depth": 2,
    "slug": "accessing-reported-problems",
    "text": "Accessing reported problems"
  }, {
    "depth": 2,
    "slug": "login-as-curator",
    "text": "Login as curator"
  }, {
    "depth": 2,
    "slug": "steps-for-reviewing-github-issues",
    "text": "Steps for Reviewing GitHub Issues"
  }, {
    "depth": 3,
    "slug": "1-initial-review",
    "text": "1. Initial Review"
  }, {
    "depth": 3,
    "slug": "2-assess-the-github-issue",
    "text": "2. Assess the GitHub Issue"
  }, {
    "depth": 3,
    "slug": "3-decision-making",
    "text": "3. Decision Making"
  }, {
    "depth": 3,
    "slug": "4-handling-disagreements-between-curators",
    "text": "4. Handling Disagreements Between Curators"
  }, {
    "depth": 2,
    "slug": "actioning-approved-corrections",
    "text": "Actioning approved corrections"
  }, {
    "depth": 3,
    "slug": "direct-submission",
    "text": "Direct submission:"
  }, {
    "depth": 3,
    "slug": "insdc-submission",
    "text": "INSDC submission:"
  }, {
    "depth": 2,
    "slug": "bulk-curations",
    "text": "Bulk curations"
  }, {
    "depth": 2,
    "slug": "documentation-and-communication",
    "text": "Documentation and communication"
  }, {
    "depth": 2,
    "slug": "ongoing-responsibilities",
    "text": "Ongoing responsibilities"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    "astro-image": "astro-image",
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "This document provides guidelines for curators on how to review, evaluate, and act upon potential problems reported by users regarding sequence data or metadata errors."
    }), "\n", createVNode(_components.p, {
      children: ["You can see a list of our curators ", createVNode(_components.a, {
        href: "/about/development-team#curators",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "overview",
      children: "Overview"
    }), "\n", createVNode(_components.p, {
      children: "Curators are responsible for ensuring the accuracy and integrity of the Pathoplexus database. This SOP outlines the steps to follow when reviewing reported problems, the type of evidence to look for, and the process for making decisions on whether to correct, leave open, or close an issue."
    }), "\n", createVNode(_components.h2, {
      id: "accessing-reported-problems",
      children: "Accessing reported problems"
    }), "\n", createVNode(_components.p, {
      children: ["All reported problems are submitted by users to the ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/curation_reports",
        children: "Pathoplexus Curation Reports GitHub repository"
      }), ". Curators should regularly monitor this repository for new GitHub issues."]
    }), "\n", createVNode(_components.h2, {
      id: "login-as-curator",
      children: "Login as curator"
    }), "\n", createVNode(_components.p, {
      children: ["For day-to-day use of Pathoplexus please ensure you use your regular user account. When undertaking curation, please log in as a curator. ", createVNode(_components.em, {
        children: "Ensure you log out after you finish curating!"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "steps-for-reviewing-github-issues",
      children: "Steps for Reviewing GitHub Issues"
    }), "\n", createVNode(_components.h3, {
      id: "1-initial-review",
      children: ["1. ", createVNode(_components.strong, {
        children: "Initial Review"
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Read the GitHub Issue:"
        }), " Carefully read the description provided by the user. Understand the nature of the reported problem with the sequence or metadata."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Check the Evidence:"
        }), " Assess the evidence provided by the user. This may include:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Phylogenetic trees or analyses"
          }), "\n", createVNode(_components.li, {
            children: "Time-association data"
          }), "\n", createVNode(_components.li, {
            children: "Links to peer-reviewed articles or manuscripts"
          }), "\n", createVNode(_components.li, {
            children: "Any other reputable sources or data supporting the claim"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "2-assess-the-github-issue",
      children: ["2. ", createVNode(_components.strong, {
        children: "Assess the GitHub Issue"
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Evaluate the Validity:"
        }), " Determine whether the evidence presented sufficiently supports the claim of an error."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Identify Potential Impact:"
        }), " Consider the potential implications if the problem raised is true. Does it affect a single sequence, a group of sequences, or have broader implications?"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Document Any Additional Information:"
        }), " If needed, conduct your own analysis or research to supplement the information provided."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Add Your Thoughts to the GitHub Issue:"
        }), " Write up your assessment of the evidence and potential impact and add this to the issue chain for the visibility of other users and curators. If you have questions or are requesting additional information, be sure to include this clearly and visibly."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "3-decision-making",
      children: ["3. ", createVNode(_components.strong, {
        children: "Decision Making"
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Collaborate with Other Curators:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "At least two curators"
            }), " must agree on the validity of a GitHub issue and the proposed correction."]
          }), "\n", createVNode(_components.li, {
            children: "If you believe the GitHub issue has merit, wait for another curator to review and confirm your assessment. You can tag other reviewers to ensure they see the issue."
          }), "\n", createVNode(_components.li, {
            children: "Engage in discussion with other curators if there are differing opinions on the GitHub issue."
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Determine the Outcome:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Correct the Problem:"
            }), " If you and at least one other curator agree that the problem is valid and the proposed correction is appropriate, the problem should be tagged for correction."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Leave the GitHub Issue Open:"
            }), " If more evidence is needed or further discussion is warranted, leave the issue open for additional input. Add to the issue thread to make clear what additional data or information is needed."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Close the GitHub Issue:"
            }), " If the evidence is insufficient, or the reported problem is not supported after thorough review, the issue may be closed with a clear explanation provided to the user and public."]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "4-handling-disagreements-between-curators",
      children: ["4. ", createVNode(_components.strong, {
        children: "Handling Disagreements Between Curators"
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Discussion and Review:"
        }), " If two curators disagree on the validity of a suspected problem or the proposed correction, they should engage in a detailed discussion within the GitHub issue thread or through another agreed-upon communication channel. The goal is to collaboratively examine the evidence, share perspectives, and reach a consensus."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Involve a Third Curator:"
        }), " If the disagreement persists after discussion, a third curator should be brought in to review the problem. The third curator will provide an independent assessment and help to mediate the disagreement."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Majority Decision:"
        }), " If after involving a third curator the disagreement continues, the decision should be based on a majority vote. If two out of three curators agree on the course of action, that decision will be implemented."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Escalation:"
        }), " In rare cases where consensus cannot be reached, the suspected problem may be escalated to the Pathoplexus Executive Board for final arbitration. The Board will make a binding decision based on the curators’ input and the available evidence."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "This process ensures that all curators’ viewpoints are considered and that decisions are made fairly and collaboratively, maintaining the integrity of the Pathoplexus database."
    }), "\n", createVNode(_components.h2, {
      id: "actioning-approved-corrections",
      children: "Actioning approved corrections"
    }), "\n", createVNode(_components.p, {
      children: "Once a GitHub issue is approved for correction you can proceed with revision - note that the procedure differs slightly for sequences submitted directly to Pathoplexus and those submitted to an INSDC database visible on Pathoplexus."
    }), "\n", createVNode(_components.p, {
      children: ["In both cases is important that you revise sequences using the originally submitted, unprocessed metadata. At the moment this means that unless you have access to the originally submitted metadata (for example if you are the original submitter) you should always revise sequences using the ", createVNode(_components.strong, {
        children: "Revise this Sequence"
      }), " button at the bottom of a sequence’s details page and ", createVNode(_components.em, {
        children: "not"
      }), " using the revise option on the submission portal where you are asked to re-upload all data. We are working on making it easier for curators to download the original metadata."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Revise Button.",
        src: __0__________images_CurationReviseButton_png__
      })
    }), "\n", createVNode(_components.h3, {
      id: "direct-submission",
      children: "Direct submission:"
    }), "\n", createVNode(_components.p, {
      children: ["If the problem involves sequences submitted directly to Pathoplexus, contact the submitting group via the email address provided and alert them to the suspected problem. Coordinate with them on whether they can prepare the revision, or if you (or another curator) should. ", createVNode(_components.em, {
        children: "Be sure"
      }), " you or they include a link to the GitHub issue discussing the revision in the ", createVNode(_components.code, {
        children: "versionComment"
      }), " field of the metadata, so that the reason for the revision can be easily traced."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Revision Form.",
        src: __1__________images_CurationRevisionForm_png__
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Version Comment.",
        src: __2__________images_CurationVersionComment_png__
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Do not prepare a revision without establishing contact with the submitting group, as they could accept it without realizing."
      }), " If they would like you to prepare the revision, do so by signing into your curator account and clicking the revise button at the bottom of the sequence details page (see image above). This will allow you to edit the originally submitted metadata. Revise the submission as agreed upon in the GitHub issue and add a link to that issue in the ", createVNode(_components.code, {
        children: "Version Comment"
      }), " metadata field. Alert the submitting group when the revision is ready to be accepted."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Do not accept the revision. Only the submitting group can do this."
      })
    }), "\n", createVNode(_components.p, {
      children: "Once the revision is accepted you can close the GitHub issue."
    }), "\n", createVNode(_components.h3, {
      id: "insdc-submission",
      children: "INSDC submission:"
    }), "\n", createVNode(_components.p, {
      children: ["If the sequence data originates from INSDC, ", createVNode(_components.strong, {
        children: "two different curators"
      }), " should prepare and accept revisions. When both curators are ready, the first should sign into their curator account and click the revise button at the bottom of the sequence details page (see image above). They should revise the agreed upon fields and add a link to the GitHub issue in the ", createVNode(_components.code, {
        children: "Version Comment"
      }), " metadata field (see image above). They should not approve the revision themselves. The second curator should then review the revision and ensure it is as agreed to resolve the problem. The second curator can then accept the revision."]
    }), "\n", createVNode(_components.p, {
      children: "Once the revision is accepted you can close the GitHub issue."
    }), "\n", createVNode(_components.h2, {
      id: "bulk-curations",
      children: "Bulk curations"
    }), "\n", createVNode(_components.p, {
      children: ["Bulk revisions should only be made if a curator has access to the original metadata. As this will not be the case for most curators, please ", createVNode(_components.em, {
        children: "contact us"
      }), " at ", createVNode(_components.a, {
        href: "mailto:revisions@pathoplexus.org",
        children: "revisions@pathoplexus.org"
      }), " if you need to perform a bulk curation and using the revise button is insufficient."]
    }), "\n", createVNode(_components.h2, {
      id: "documentation-and-communication",
      children: "Documentation and communication"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Document Decisions:"
        }), " Record all decisions, including the rationale, in the GitHub issue thread for transparency."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Communicate with Users:"
        }), " Provide feedback to the user who reported the problem, informing them of the outcome, whether their proposed correction was accepted, and any further actions that will be taken. If the data was directly submitted to Pathoplexus, ensure you also communicate with the submitting group."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "ongoing-responsibilities",
      children: "Ongoing responsibilities"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Continuous Monitoring:"
        }), " Curators should continually monitor the ", createVNode(_components.a, {
          href: "https://github.com/pathoplexus/curation_reports",
          children: "Curation Reports GitHub repository"
        }), " for new issues."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Review Open Issues:"
        }), " Periodically review open GitHub issues to determine if new evidence has surfaced or if additional curatorial input is needed."]
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: "By following this SOP, curators will help maintain the high standards of accuracy and reliability that are critical to the Pathoplexus database."
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

const url = "/docs/how-to/curator-sop";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/curator-sop.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/curator-sop.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	__usesAstroImage,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
