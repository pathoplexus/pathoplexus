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
  "title": "Executive Board Guidelines",
  "order": 4
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
    "slug": "2-principal-duties-of-the-executive-board",
    "text": "2. Principal Duties of the Executive Board"
  }, {
    "depth": 2,
    "slug": "21-to-uphold-the-pathoplexus-values",
    "text": "2.1 To Uphold the Pathoplexus Values"
  }, {
    "depth": 2,
    "slug": "22-to-define-strategy-and-guide-and-oversee-pathoplexus-activities",
    "text": "2.2 To Define Strategy and Guide and Oversee Pathoplexus Activities"
  }, {
    "depth": 2,
    "slug": "23-to-monitor-the-effectiveness-of-executive-board-governance-practices",
    "text": "2.3 To Monitor the Effectiveness of Executive Board Governance Practices"
  }, {
    "depth": 2,
    "slug": "24-to-oversee-social-ethical-and-governance-matters",
    "text": "2.4 To Oversee Social, Ethical, and Governance Matters"
  }, {
    "depth": 1,
    "slug": "3-board-procedures",
    "text": "3. Board Procedures"
  }, {
    "depth": 2,
    "slug": "31-scheduling-of-board-meetings-and-attendance",
    "text": "3.1 Scheduling of Board Meetings and Attendance"
  }, {
    "depth": 2,
    "slug": "32-agenda-and-minutes",
    "text": "3.2 Agenda and Minutes"
  }, {
    "depth": 2,
    "slug": "33-communications-with-the-executive-board",
    "text": "3.3 Communications with the Executive Board"
  }, {
    "depth": 2,
    "slug": "34-resolving-conflict",
    "text": "3.4 Resolving Conflict"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
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
          href: "#2-principal-duties-of-the-executive-board",
          children: "2. Principal duties of the Executive Board"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#21-to-uphold-the-pathoplexus-values",
              children: "2.1 To uphold the Pathoplexus Values"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#22-to-define-strategy-and-guide-and-oversee-pathoplexus-activities",
              children: "2.2 To define strategy and guide and oversee Pathoplexus activities"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#23-to-monitor-the-effectiveness-of-executive-board-governance-practices",
              children: "2.3 To monitor the effectiveness of Executive Board governance practices"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#24-to-oversee-social-ethical-and-governance-matters",
              children: "2.4 To oversee social, ethical, and governance matters"
            })
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#3-board-procedures",
          children: "3. Board Procedures"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#31-scheduling-of-board-meetings-and-attendance",
              children: "3.1 Scheduling of Board meetings and attendance"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#32-agenda-and-minutes",
              children: "3.2 Agenda and minutes"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#33-communications-with-the-executive-board",
              children: "3.3 Communications with the Executive Board"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#34-resolving-conflict",
              children: "3.4 Resolving conflict"
            })
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "1-introduction",
      children: "1. Introduction"
    }), "\n", createVNode(_components.p, {
      children: "The Executive Board is defined in the Pathoplexus Articles of Association (“the Articles”), and the Articles are the complete and final document that governs the Executive Board. This document, the Pathoplexus Executive Board Guidelines (“the Guidelines”), serves to provide more structure to some of the Board’s duties and functions. However, the Guidelines are always superseded by the Articles in any point of contention."
    }), "\n", createVNode(_components.p, {
      children: "This document is governed by the Pathoplexus Values and should be interpreted in light of the Pathoplexus Values."
    }), "\n", createVNode(_components.p, {
      children: "The Executive Board can modify and make changes to this document, in line with the purpose and commitments of the Pathoplexus Values, via 2/3 majority vote of the entire Executive Board. If the Executive Board has 5 members, this is interpreted as 4/5 votes in favor."
    }), "\n", createVNode(_components.h1, {
      id: "2-principal-duties-of-the-executive-board",
      children: "2. Principal Duties of the Executive Board"
    }), "\n", createVNode(_components.p, {
      children: "The Executive Board is responsible for overseeing the effective and ethical running of the Pathoplexus database and association on behalf of the Pathoplexus General Assembly. This involves Executive Board members adopting a proactive and concentrated approach in their roles to assure Pathoplexus’ dedication to upholding elevated standards of responsibility, integrity and ethics while serving the community."
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: createVNode("div", {
        class: "indent",
        children: createVNode("div", {
          class: "indent",
          children: [createVNode(_components.h2, {
            id: "21-to-uphold-the-pathoplexus-values",
            children: "2.1 To Uphold the Pathoplexus Values"
          }), createVNode(_components.p, {
            children: "The Executive Board is guided in their decisions and role by the tenets in the Pathoplexus Values, with the aim to preserve and further the mission, purpose, and commitments."
          }), createVNode(_components.h2, {
            id: "22-to-define-strategy-and-guide-and-oversee-pathoplexus-activities",
            children: "2.2 To Define Strategy and Guide and Oversee Pathoplexus Activities"
          }), createVNode(_components.p, {
            children: "The fundamental purpose of the Executive Board is to exercise their judgment to act in what they reasonably believe to be in the best interests of the public health community. It is their duty to guide and oversee the Pathoplexus association and database. This includes the addition of new supported pathogens, clarifications of the Data Use Terms, and directing the improvement and expansion of Pathoplexus database features and functionality."
          }), createVNode(_components.h2, {
            id: "23-to-monitor-the-effectiveness-of-executive-board-governance-practices",
            children: "2.3 To Monitor the Effectiveness of Executive Board Governance Practices"
          }), createVNode(_components.p, {
            children: "The Executive Board will review and evaluate the effectiveness of the governance practices under which the Board operates and make changes to these practices as needed."
          }), createVNode(_components.h2, {
            id: "24-to-oversee-social-ethical-and-governance-matters",
            children: "2.4 To Oversee Social, Ethical, and Governance Matters"
          }), createVNode(_components.p, {
            children: "The Executive Board is responsible for providing oversight in considering and reviewing actual and potential matters relating social, ethical and governance within the Pathoplexus database and association."
          })]
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "3-board-procedures",
      children: "3. Board Procedures"
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: createVNode("div", {
        class: "indent",
        children: createVNode("div", {
          class: "indent",
          children: [createVNode(_components.h2, {
            id: "31-scheduling-of-board-meetings-and-attendance",
            children: "3.1 Scheduling of Board Meetings and Attendance"
          }), createVNode(_components.p, {
            children: "Regular meetings of the Executive Board shall be held at times and places as determined by the Board. The Executive Board can schedule additional Executive Board meetings, or communicate on Pathoplexus business via other means, as it chooses.  Meetings of the General Assembly must be scheduled by the Executive Board as described in the Articles. Executive Board members are expected to prepare for, attend, and contribute meaningfully in all Executive Board and General Assembly meetings in order to discharge their obligations."
          }), createVNode(_components.h2, {
            id: "32-agenda-and-minutes",
            children: "3.2 Agenda and Minutes"
          }), createVNode(_components.p, {
            children: "An agenda for each General Assembly meeting, along with minutes of the previous meeting; information and data that is important to the understanding of the tasks to be conducted at the meeting, will be distributed by the Executive Board  in advance of the meeting, as described in the Articles. A summary of minutes of General Assembly meetings shall be made public after they are approved by the General Assembly; sensitive points such as names of people and organisations may be redacted. In addition, for Executive Board activities, minutes must be kept of all resolutions passed by the Executive Board, whether via meeting or through other communications, and must be made available to the General Assembly. A summary of these minutes will also be made publicly available."
          }), createVNode(_components.h2, {
            id: "33-communications-with-the-executive-board",
            children: "3.3 Communications with the Executive Board"
          }), createVNode(_components.p, {
            children: "Pathoplexus association members may contact the Executive Board to provide comments, report concerns or to ask questions. Such communications shall be directly directed to the Executive Board."
          }), createVNode(_components.h2, {
            id: "34-resolving-conflict",
            children: "3.4 Resolving Conflict"
          }), createVNode(_components.p, {
            children: "The Executive Board shall serve as an arbitrator and decision maker when conflicts arise between users with regards to appropriate use of data in the Pathoplexus database according to the Data Use Terms. Such conflicts should be resolved through interpretation of the Data Use Terms and the Values, and should encourage Users to find mutually agreeable resolutions where possible. After a resolution or decision has been made about a conflict, the Data Use Terms examples and clarifications should be expanded, if appropriate, to avoid similar conflicts in the future."
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

const url = "/about/governance/eb-guidelines";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/eb-guidelines.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/eb-guidelines.mdx";
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
