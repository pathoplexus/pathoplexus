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
  "title": "Scientific Advisory Board Guidelines",
  "order": 5
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 1,
    "slug": "1-introduction",
    "text": "1. Introduction"
  }, {
    "depth": 1,
    "slug": "2-board-structure-and-composition",
    "text": "2. Board Structure and Composition"
  }, {
    "depth": 2,
    "slug": "21-scientific-advisory-board-membership-criteria",
    "text": "2.1 Scientific Advisory Board Membership Criteria"
  }, {
    "depth": 2,
    "slug": "22-scientific-advisory-board-member-independence",
    "text": "2.2 Scientific Advisory Board Member Independence"
  }, {
    "depth": 2,
    "slug": "23-scientific-advisory-board-member-tenure",
    "text": "2.3 Scientific Advisory Board Member Tenure"
  }, {
    "depth": 2,
    "slug": "24-scientific-advisory-board-member-resignations",
    "text": "2.4 Scientific Advisory Board Member Resignations"
  }, {
    "depth": 2,
    "slug": "25-scientific-advisory-board-member-recall",
    "text": "2.5 Scientific Advisory Board Member Recall"
  }, {
    "depth": 1,
    "slug": "3-principal-duties-of-the-scientific-advisory-board",
    "text": "3. Principal Duties of the Scientific Advisory Board"
  }, {
    "depth": 2,
    "slug": "31-to-uphold-the-pathoplexus-values",
    "text": "3.1 To uphold the Pathoplexus Values"
  }, {
    "depth": 2,
    "slug": "32-to-provide-scientific-and-technical-advice-to-the-executive-board",
    "text": "3.2 To provide scientific and technical advice to the Executive Board"
  }, {
    "depth": 2,
    "slug": "33-to-provide-advice-on-the-effectiveness-of-executive-board-governance-practices",
    "text": "3.3 To provide advice on the effectiveness of Executive Board Governance Practices"
  }, {
    "depth": 2,
    "slug": "34-to-provide-advice-on-social-ethical-and-governance-matters",
    "text": "3.4 To provide advice on Social, Ethical and Governance Matters"
  }, {
    "depth": 1,
    "slug": "4-scientific-advisory-board-procedures",
    "text": "4. Scientific Advisory Board Procedures"
  }, {
    "depth": 2,
    "slug": "41-scheduling-of-meetings-and-attendance",
    "text": "4.1 Scheduling of Meetings and Attendance"
  }, {
    "depth": 2,
    "slug": "42-agenda-and-minutes",
    "text": "4.2 Agenda and Minutes"
  }, {
    "depth": 2,
    "slug": "43-communications-with-the-scientific-advisory-board",
    "text": "4.3 Communications with the Scientific Advisory Board"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
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
      children: "These Guidelines were adopted by the General Assembly at the founding meeting of the Pathoplexus Verein on 12 Aug 2024."
    }), "\n", createVNode(_components.h2, {
      id: "contents",
      children: "Contents:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#1-introduction",
          children: "1. Introduction"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#2-board-structure-and-composition",
          children: "2. Board structure and composition"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#21-scientific-advisory-board-membership-criteria",
              children: "2.1 Scientific Advisory Board membership criteria"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#22-scientific-advisory-board-member-independence",
              children: "2.2 Scientific Advisory Board member independence"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#23-scientific-advisory-board-member-tenure",
              children: "2.3 Scientific Advisory Board member tenure"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#24-scientific-advisory-board-member-resignations",
              children: "2.4 Scientific Advisory Board member resignations"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#25-scientific-advisory-board-member-recall",
              children: "2.5 Scientific Advisory Board member recall"
            })
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#3-principal-duties-of-the-scientific-advisory-board",
          children: "3. Principal Duties of the Scientific Advisory Board"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#31-to-uphold-the-pathoplexus-values",
              children: "3.1 To uphold the pathoplexus values"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#32-to-provide-scientific-and-technical-advice-to-the-executive-board",
              children: "3.2 To provide scientific and technical advice to the executive board"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#33-to-provide-advice-on-the-effectiveness-of-executive-board-governance-practices",
              children: "3.3 To provide advice on the effectiveness of Executive Board governance practices"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#34-to-provide-advice-on-social-ethical-and-governance-matters",
              children: "3.4 To provide advice on social, ethical, and governance matters"
            })
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#4-scientific-advisory-board-procedures",
          children: "4. Scientific Advisory Board Procedures"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#41-scheduling-of-meetings-and-attendance",
              children: "4.1 Scheduling of meetings and attendance"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#42-agenda-and-minutes",
              children: "4.2 Agenda and minutes"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#43-communications-with-the-scientific-advisory-board",
              children: "4.3 Communications with the Scientific Advisory Board"
            })
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "1-introduction",
      children: "1. Introduction"
    }), "\n", createVNode(_components.p, {
      children: "These advisory board guidelines outline a framework for conveying useful advice to the Executive Board in order for the effective pursuit of the organisation’s objectives to improve openness and interoperability in bioinformatics for the benefit of public health and the community."
    }), "\n", createVNode(_components.p, {
      children: "The Scientific Advisory Board described herein is a board that serves only as an advisory function to the Executive Board of Pathoplexus."
    }), "\n", createVNode(_components.p, {
      children: "It is essential to interpret these guidelines with the Articles of Association, which shall prevail in the case of a conflict with these guidelines."
    }), "\n", createVNode(_components.p, {
      children: "This document is governed by the Pathoplexus Values and should be interpreted in light of the Pathoplexus Values. The Executive Board can modify and make changes to this document, in line with the purpose and commitments of the Pathoplexus Values, via 2/3 majority vote of the entire Board. If the Board has 5 members, this is interpreted as 4/5 votes in favor."
    }), "\n", createVNode(_components.h1, {
      id: "2-board-structure-and-composition",
      children: "2. Board Structure and Composition"
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: createVNode("div", {
        class: "indent",
        children: createVNode("div", {
          class: "indent",
          children: [createVNode(_components.h2, {
            id: "21-scientific-advisory-board-membership-criteria",
            children: "2.1 Scientific Advisory Board Membership Criteria"
          }), createVNode(_components.p, {
            children: "The size of the Scientific Advisory Board is between 3-8 individuals. The General Assembly is responsible for recommending SAB Members to the Executive Board. The Executive Board is responsible for screening and confirming individuals for the Scientific Advisory Board, who can be elected at any Executive Board Meeting by 2/3 vote. Such recommendations and confirmations shall be based on, among other things, a nominee’s demonstrated commitment to the ethos of the database, diversity in background, character, ability to exercise sound judgement, willingness to commit sufficient time to the Scientific Advisory Board, and relevant skills and experience in the context of the evolving needs of the Pathoplexus Association, existing Scientific Advisory Board, and Executive Board. Pathoplexus believes the group will benefit from having fresh contributions and advice over time."
          }), createVNode(_components.p, {
            children: "The Executive Board shall also consider the diversity of the Scientific Advisory Board composition overall with respect to age, disability, gender identity or expression, ethnicity, military veteran status, national origin, race, religion, sexual orientation, and other backgrounds and experiences. The Pathoplexus association is committed to actively seeking to identify such individuals who will contribute to such diversity and to be included in the pool of candidates from which nominees to the Scientific Advisory Board are selected."
          }), createVNode(_components.p, {
            children: "Pathoplexus expects that its Scientific Advisory Board as well as members and staff to act ethically. Each Scientific Advisory Board member must disclose any circumstance that could represent a potential conflict of interest to the Executive Board prior to election. Each Scientific Advisory Board member that experiences a change in circumstance during office that could represent a potential conflict of interest should deliver a notice of such to the Committee."
          }), createVNode(_components.h2, {
            id: "22-scientific-advisory-board-member-independence",
            children: "2.2 Scientific Advisory Board Member Independence"
          }), createVNode(_components.p, {
            children: "Scientific Advisory Board members are not to be a part of the Pathoplexus association. Indeed, drawing from the diversity of the community is a strength."
          }), createVNode(_components.h2, {
            id: "23-scientific-advisory-board-member-tenure",
            children: "2.3 Scientific Advisory Board Member Tenure"
          }), createVNode(_components.p, {
            children: "Scientific Advisory Board members serve for a 2 year term after election by the Executive Board. Should their expertise and advice continue to be a benefit to the Executive Board and General Assembly, the Executive Board may renew their service for any number of terms."
          }), createVNode(_components.h2, {
            id: "24-scientific-advisory-board-member-resignations",
            children: "2.4 Scientific Advisory Board Member Resignations"
          }), createVNode(_components.p, {
            children: "Scientific Advisory Board members who intend to resign from the Scientific Advisory Board must submit written notice to the Executive Board. Resignations must include the effective date of resignation."
          }), createVNode(_components.h2, {
            id: "25-scientific-advisory-board-member-recall",
            children: "2.5 Scientific Advisory Board Member Recall"
          }), createVNode(_components.p, {
            children: "Scientific Advisory Board members may be recalled from the Scientific Advisory Board by the Executive Board:"
          }), createVNode(_components.p, {
            children: ["If they are absent for ", createVNode(_components.strong, {
              children: "2"
            }), " consecutive Scientific Advisory Board meetings without mitigating circumstances; change in circumstance resulting in a conflict of interest; or a lack of professionalism such as a breach of confidentiality or ethical violation. They also may be released from service if their expertise is no longer required."]
          })]
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "3-principal-duties-of-the-scientific-advisory-board",
      children: "3. Principal Duties of the Scientific Advisory Board"
    }), "\n", createVNode(_components.p, {
      children: "The Scientific Advisory Board is responsible for providing advice and guidance to the Executive Board in the effective and ethical function of the Pathoplexus association and database. This involves Scientific Advisory Board members adopting a proactive and concentrated approach in its role to support the Board’s and General Assembly’s dedication to upholding elevated standards of responsibility, integrity and ethics while serving the community."
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: createVNode("div", {
        class: "indent",
        children: createVNode("div", {
          class: "indent",
          children: [createVNode(_components.h2, {
            id: "31-to-uphold-the-pathoplexus-values",
            children: "3.1 To uphold the Pathoplexus Values"
          }), createVNode(_components.p, {
            children: "The Scientific Advisory Board should be guided in their advice as pertinent to the tenets in the Pathoplexus Values, with the aim to preserve and further the mission and values (or purpose and commitments, depending on which draft we go with)."
          }), createVNode(_components.h2, {
            id: "32-to-provide-scientific-and-technical-advice-to-the-executive-board",
            children: "3.2 To provide scientific and technical advice to the Executive Board"
          }), createVNode(_components.p, {
            children: "The fundamental purpose of the Scientific Advisory Board is to provide their personal and professional expertise in matters related to data sharing, databases, ethics, privacy, pathogens, public health, and any other topics that the Executive Board seeks their advice on. They should provide this advice freely and openly, for the betterment in the function and purpose of the Executive Board and General Assembly."
          }), createVNode(_components.h2, {
            id: "33-to-provide-advice-on-the-effectiveness-of-executive-board-governance-practices",
            children: "3.3 To provide advice on the effectiveness of Executive Board Governance Practices"
          }), createVNode(_components.p, {
            children: "The Scientific Advisory Board will be available to evaluate and advise upon the governance practices under which the Executive Board operates."
          }), createVNode(_components.h2, {
            id: "34-to-provide-advice-on-social-ethical-and-governance-matters",
            children: "3.4 To provide advice on Social, Ethical and Governance Matters"
          }), createVNode(_components.p, {
            children: "The Scientific Advisory Board should provide advice on possible matters, reviewing actual and potential matters relating social, ethical and governance."
          })]
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "4-scientific-advisory-board-procedures",
      children: "4. Scientific Advisory Board Procedures"
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: createVNode("div", {
        class: "indent",
        children: createVNode("div", {
          class: "indent",
          children: [createVNode(_components.h2, {
            id: "41-scheduling-of-meetings-and-attendance",
            children: "4.1 Scheduling of Meetings and Attendance"
          }), createVNode(_components.p, {
            children: "Regular meetings of the Scientific Advisory Board shall be held at times and places as determined by the Scientific Advisory Board with at least 1 meeting per year, with at least two weeks’ notice of a meeting. The Executive Board or secretariat will coordinate the organisation of the regular meetings. The Executive Board attends regularly scheduled Scientific Advisory Board meetings to present questions for feedback and hear the Scientific Advisory Board’s advice. However, the Scientific Advisory Board is authorized to call and organize their own meetings at any time, which may not necessarily include Executive Board members. The Executive Board can also contact Scientific Advisory Board members individually or as a group for advice on specific topics at any time, but shall be mindful of the commitments of the Scientific Advisory Board members and their time.  Scientific Advisory Board members are expected to prepare for, attend, and contribute meaningfully in all meetings in order to discharge their obligations."
          }), createVNode(_components.h2, {
            id: "42-agenda-and-minutes",
            children: "4.2 Agenda and Minutes"
          }), createVNode(_components.p, {
            children: "An agenda for each Scientific Advisory Board meeting, along with minutes of the previous meeting; information and data that is important to the Scientific Advisory Board’s understanding of the tasks to be conducted at the meeting, will be distributed to Scientific Advisory Board members one week in advance of the meeting so that meeting time may be focused on feedback and questions that the Scientific Advisory Board has about the materials. At regularly scheduled meetings, the Executive Board will prepare and disseminate the agenda and relevant materials, based upon items of discussion raised by the Executive Board and General Assembly. Minutes of past meetings, once approved by the Scientific Advisory Board, are shared with the General Assembly. If the Scientific Advisory Board schedules additional meetings without Executive Board attendance, they will prepare and disseminate their own agenda and materials, and approve and distribute their own minutes to the Executive Board within 1 month of a meeting. Certain matters may be discussed at the meeting without advance distribution of written materials as deemed appropriate."
          }), createVNode(_components.h2, {
            id: "43-communications-with-the-scientific-advisory-board",
            children: "4.3 Communications with the Scientific Advisory Board"
          }), createVNode(_components.p, {
            children: "Regular meetings of the Scientific Advisory Board are also attended by the Executive Board, so that the Board can seek and receive advice from the Scientific Advisory Board. The Executive Board may additionally also contact the Scientific Advisory Board to provide information, report concerns, ask questions or request additional meetings."
          })]
        })
      })
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

const url = "/about/governance/sab-guidelines";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/sab-guidelines.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/sab-guidelines.mdx";
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
