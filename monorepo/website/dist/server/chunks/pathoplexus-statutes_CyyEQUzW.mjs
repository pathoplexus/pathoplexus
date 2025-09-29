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
  "title": "Pathoplexus Statutes",
  "order": 1
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "articles-of-association-pathoplexus",
    "text": "Articles of Association: Pathoplexus"
  }, {
    "depth": 2,
    "slug": "definitions",
    "text": "Definitions"
  }, {
    "depth": 2,
    "slug": "1-name-and-headquarters",
    "text": "1. Name and headquarters"
  }, {
    "depth": 2,
    "slug": "2-objective-and-purpose",
    "text": "2. Objective and purpose"
  }, {
    "depth": 2,
    "slug": "3-resources",
    "text": "3. Resources"
  }, {
    "depth": 2,
    "slug": "4-membership",
    "text": "4. Membership"
  }, {
    "depth": 3,
    "slug": "41-active-and-passive-membership",
    "text": "4.1 Active and passive membership"
  }, {
    "depth": 3,
    "slug": "42-termination",
    "text": "4.2. Termination"
  }, {
    "depth": 2,
    "slug": "5-bodies-of-the-association",
    "text": "5. Bodies of the Association"
  }, {
    "depth": 3,
    "slug": "51-the-general-assembly",
    "text": "5.1. The General Assembly"
  }, {
    "depth": 3,
    "slug": "52-the-executive-board",
    "text": "5.2. The Executive Board"
  }, {
    "depth": 3,
    "slug": "53-the-treasurer",
    "text": "5.3. The Treasurer"
  }, {
    "depth": 3,
    "slug": "54-the-auditors",
    "text": "5.4. The Auditors"
  }, {
    "depth": 3,
    "slug": "55-the-secretariat",
    "text": "5.5. The Secretariat"
  }, {
    "depth": 3,
    "slug": "56-the-scientific-advisory-board",
    "text": "5.6. The Scientific Advisory Board"
  }, {
    "depth": 2,
    "slug": "6-exclusion-from-voting",
    "text": "6. Exclusion from voting"
  }, {
    "depth": 2,
    "slug": "7-signing-authority",
    "text": "7. Signing authority"
  }, {
    "depth": 2,
    "slug": "8-liability",
    "text": "8. Liability"
  }, {
    "depth": 2,
    "slug": "9-data-protection",
    "text": "9. Data protection"
  }, {
    "depth": 2,
    "slug": "10-dissolution-of-the-association",
    "text": "10. Dissolution of the Association"
  }, {
    "depth": 2,
    "slug": "11-entry-into-force",
    "text": "11. Entry into force"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    ol: "ol",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "These statutes are the founding document of the Pathoplexus Verein."
    }), "\n", createVNode(_components.h1, {
      id: "articles-of-association-pathoplexus",
      children: "Articles of Association: Pathoplexus"
    }), "\n", createVNode(_components.h2, {
      id: "definitions",
      children: "Definitions"
    }), "\n", createVNode(_components.p, {
      children: "In the below document the following definitions apply:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The term “Absolute Majority” means one more vote than half the valid votes (including abstentions)."
      }), "\n", createVNode(_components.li, {
        children: "The term “Absolute Supermajority” means at least 66% of votes (including abstentions)."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "1-name-and-headquarters",
      children: "1. Name and headquarters"
    }), "\n", createVNode(_components.p, {
      children: "Under the name “Pathoplexus” there exists an Association pursuant to Article 60 et seqq. of the Swiss Civil Code headquartered in Basel-Stadt, Switzerland (hereinafter referred to as the ‘Association’). It is politically independent and denominationally neutral."
    }), "\n", createVNode(_components.h2, {
      id: "2-objective-and-purpose",
      children: "2. Objective and purpose"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The purpose of the Association is to enable swift, fair and transparent sharing of pathogen genome data in order to facilitate research and benefit public health."
      }), "\n", createVNode(_components.li, {
        children: "The Association is exclusively non-profit and does not pursue any commercial purpose and does not seek to make a profit. The Executive Board acts in a voluntary capacity."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "3-resources",
      children: "3. Resources"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The Association has the following resources at its disposal for the pursuit of its objectives:"
      }), "\n"]
    }), "\n", createVNode("div", {
      class: "lettered-list",
      children: createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "donations and grants of all kinds;"
          }), "\n", createVNode(_components.li, {
            children: "subsidies;"
          }), "\n", createVNode(_components.li, {
            children: "income generated from service level agreements."
          }), "\n"]
        })
      })
    }), "\n", createVNode(_components.ol, {
      start: "2",
      children: ["\n", createVNode(_components.li, {
        children: "The financial year is identical to the calendar year."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "4-membership",
      children: "4. Membership"
    }), "\n", createVNode(_components.h3, {
      id: "41-active-and-passive-membership",
      children: "4.1 Active and passive membership"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Membership is open to (i) natural persons in the form of active membership with voting rights and or passive members without voting rights and (ii) legal entities in the form of passive members without voting rights.\nAdmission to the Association may be made at any time. Applications for admission will be addressed to the Executive Board, and the final decision on admission will be taken by the Executive Board."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "42-termination",
      children: "4.2. Termination"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Membership terminates or expires in the case of:"
      }), "\n"]
    }), "\n", createVNode("div", {
      class: "lettered-list",
      children: createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "natural persons, by resignation, exclusion or death;"
          }), "\n", createVNode(_components.li, {
            children: "legal entities, by resignation, exclusion or dissolution of the legal entity."
          }), "\n"]
        })
      })
    }), "\n", createVNode(_components.ol, {
      start: "2",
      children: ["\n", createVNode(_components.li, {
        children: "Resignation from the Association is possible at any time by notifying the Executive Board without cause."
      }), "\n", createVNode(_components.li, {
        children: "A member can be excluded from the Association by the Executive Board at any time without cause. The excluded member may appeal against such a decision to the next General Assembly within 30 days. Membership rights will be suspended until the General Assembly considers and decides the appeal."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "5-bodies-of-the-association",
      children: "5. Bodies of the Association"
    }), "\n", createVNode(_components.p, {
      children: "The bodies that make up the Association are:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "the General Assembly;"
      }), "\n", createVNode(_components.li, {
        children: "the Executive Board;"
      }), "\n", createVNode(_components.li, {
        children: "the Scientific Advisory Board;"
      }), "\n", createVNode(_components.li, {
        children: "the Treasurer;"
      }), "\n", createVNode(_components.li, {
        children: "the Auditors; and"
      }), "\n", createVNode(_components.li, {
        children: "optionally a Secretariat."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "51-the-general-assembly",
      children: "5.1. The General Assembly"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The supreme body of the Association is the General Assembly."
      }), "\n", createVNode(_components.li, {
        children: "The General Assembly is duly constituted if at least 5 active members are present."
      }), "\n", createVNode(_components.li, {
        children: "The General Assembly convenes annually. It is held virtually. Votes are taken electronically."
      }), "\n", createVNode(_components.li, {
        children: "The members are invited to the General Assembly 14 days in advance by e-mail. The invitation must include the preliminary agenda."
      }), "\n", createVNode(_components.li, {
        children: "Motions from members for items not covered by the preliminary agenda must be submitted in writing to the Executive Board no later than 12 days before the meeting stating the reasons for the motion. New motions will be communicated to the members no later than 10 days before the meeting."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board or one-fifth of the members may at any time request that an extraordinary General Assembly be convened, stating the purpose of the meeting. Such a meeting must be held no later than 4 weeks after receipt of the request."
      }), "\n", createVNode(_components.li, {
        children: "The General Assembly has the following inalienable duties and powers:"
      }), "\n"]
    }), "\n", createVNode("div", {
      class: "lettered-list",
      children: createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "Approval of the minutes of the last General Assembly"
          }), "\n", createVNode(_components.li, {
            children: "Approval of the annual report of the Executive Board"
          }), "\n", createVNode(_components.li, {
            children: "Acceptance of the Auditors’ report and approval of the annual accounts"
          }), "\n", createVNode(_components.li, {
            children: "Grant discharge to the Executive Board"
          }), "\n", createVNode(_components.li, {
            children: "Election of members of the Executive Board, the Treasurer, and the Auditors"
          }), "\n", createVNode(_components.li, {
            children: "Acknowledgement of annual budget"
          }), "\n", createVNode(_components.li, {
            children: "Acknowledgement of the programme of activities"
          }), "\n", createVNode(_components.li, {
            children: "Resolutions on motions of the Executive Board and members"
          }), "\n", createVNode(_components.li, {
            children: "Amendment of the articles of Association"
          }), "\n", createVNode(_components.li, {
            children: "Decision on exclusion appeals"
          }), "\n", createVNode(_components.li, {
            children: "Resolutions on the dissolution of the Association and the use of the liquidation proceeds."
          }), "\n"]
        })
      })
    }), "\n", createVNode(_components.ol, {
      start: "8",
      children: ["\n", createVNode(_components.li, {
        children: "The active members present pass resolutions by an Absolute Majority."
      }), "\n", createVNode(_components.li, {
        children: "Amendments to these articles of Association require the approval of Absolute Supermajority of the active members present."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board shares the draft minutes by email with all members within 2 weeks after a General Assembly. Attendants of the General Assembly may object to the minutes within 2 weeks. If there are no objections, the minutes are approved."
      }), "\n", createVNode(_components.li, {
        children: "Minutes of passed resolutions must be kept for at least 2 years and made available to members of the Association. The Executive Board is responsible for keeping the minutes."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "52-the-executive-board",
      children: "5.2. The Executive Board"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The Executive Board consists of at least 3 persons and at most 7 persons."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board shall not have more than 2 persons employed in the same country at the time of their election."
      }), "\n", createVNode(_components.li, {
        children: "The term of office is 2 years. Reelection is allowed."
      }), "\n", createVNode(_components.li, {
        children: "A board member may resign from the Executive Board at any time by notifying the board."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board is elected by the General Assembly with an Absolute Majority."
      }), "\n", createVNode(_components.li, {
        children: "A member of the Executive Board can be removed by the General Assembly prior to the end of the regular term with an Absolute Supermajority."
      }), "\n", createVNode(_components.li, {
        children: "The term of the outgoing board ends 60 days after the election. The newly elected board must be given insight into the affairs of the current board until they take office, to ensure a proper handover."
      }), "\n", createVNode(_components.li, {
        children: "If a board member resigns from the Executive Board, the board may appoint a replacement. At the next General Assembly, the appointment of the new board member will be submitted to the assembly for confirmation."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board is responsible for managing the day-to-day business and representing the Association externally."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board issues regulations."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board may set up work groups (groups of specialists)."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board may employ or commission persons against appropriate remuneration (in accordance with labor law) to achieve the objectives of the Association."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board has all powers not delegated to another body by law or under these articles of Association."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board constitutes itself. The Executive Board chooses a member of the Executive Board to be the chairperson."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board meets as often as business requires. Any member of the Executive Board may request a meeting, stating the reasons."
      }), "\n", createVNode(_components.li, {
        children: "Unless a member of the Executive Board requests oral deliberation, resolutions may be passed by circular letter (including e-mail and messaging platforms)."
      }), "\n", createVNode(_components.li, {
        children: "In general, the members of the Executive Board work in a voluntary capacity and are not paid. They are, however, entitled to reimbursement of effective expenses."
      }), "\n", createVNode(_components.li, {
        children: "Any decision to be taken by the board, not explicitly referred to herein, shall be taken by Absolute Majority."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "53-the-treasurer",
      children: "5.3. The Treasurer"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The term of office is 2 years. Reelection is allowed."
      }), "\n", createVNode(_components.li, {
        children: "The Treasurer is elected by the General Assembly with an Absolute Majority."
      }), "\n", createVNode(_components.li, {
        children: "If the Treasurer resigns, the Executive Board may appoint a replacement. At the next General Assembly, the appointment of the new Treasurer will be submitted to the assembly for confirmation."
      }), "\n", createVNode(_components.li, {
        children: "The Treasurer shall be responsible for managing the finances of the Association, keeping appropriate records of transactions, and updating the Executive Board."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "54-the-auditors",
      children: "5.4. The Auditors"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The General Assembly elects 2 Auditors or a legal entity to audit the accounts and conduct random checks at least once a year."
      }), "\n", createVNode(_components.li, {
        children: "The Auditors report to the executive committee for the attention of the General Assembly."
      }), "\n", createVNode(_components.li, {
        children: "Their term of office is 2 years. Reelection is allowed."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "55-the-secretariat",
      children: "5.5. The Secretariat"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The management of operational business may be delegated by the Executive Board to the Secretariat."
      }), "\n", createVNode(_components.li, {
        children: "The Executive Board determines the membership of the Secretariat."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "56-the-scientific-advisory-board",
      children: "5.6. The Scientific Advisory Board"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The Scientific Advisory Board advises the Executive Board."
      }), "\n", createVNode(_components.li, {
        children: "Members are elected by the Executive Board with an Absolute Supermajority of the Executive Board members."
      }), "\n", createVNode(_components.li, {
        children: "The guidelines for the scientific advisory board are defined in the Scientific Advisory Board Guidelines."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "6-exclusion-from-voting",
      children: "6. Exclusion from voting"
    }), "\n", createVNode(_components.p, {
      children: "In order to avoid any decisions based on any kind of conflict of interests, members of the executive board and/or the general assembly are by law excluded from voting on any resolution concerning a transaction or dispute between him or her, his or her spouse or a lineal relative on the one hand and the association on the other."
    }), "\n", createVNode(_components.h2, {
      id: "7-signing-authority",
      children: "7. Signing authority"
    }), "\n", createVNode(_components.p, {
      children: "The association is bound by the collective signature of (1) two members of the Executive Board or (2) one member of the Executive Board together with the Treasurer."
    }), "\n", createVNode(_components.h2, {
      id: "8-liability",
      children: "8. Liability"
    }), "\n", createVNode(_components.p, {
      children: "Only the assets of the Association are liable for the debts of the Association. Personal liability of the members is excluded."
    }), "\n", createVNode(_components.h2, {
      id: "9-data-protection",
      children: "9. Data protection"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The Association exclusively gathers the personal data of the members required to fulfil the purpose of the Association. The Executive Board ensures data security appropriate to that of the risk."
      }), "\n", createVNode(_components.li, {
        children: "The member data, particularly name, affiliation and email address, will be disclosed to all Association members upon request."
      }), "\n", createVNode(_components.li, {
        children: "The member data of board members, particularly name, picture and affiliation, will be published on the website. Otherwise, data will only be disclosed to third parties within the scope of legally permissible order processing, and if this should be required by law or ordered by the authorities."
      }), "\n", createVNode(_components.li, {
        children: "Otherwise, member data is processed in accordance with the provisions of Swiss data protection legislation and the privacy policy on the Association’s website."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "10-dissolution-of-the-association",
      children: "10. Dissolution of the Association"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The Association may be dissolved by resolution of the General Assembly or an extraordinary General Assembly by an Absolute Supermajority of votes."
      }), "\n", createVNode(_components.li, {
        children: "In the event that the Association is dissolved, the assets of the Association will be transferred to a tax-exempt organization in Switzerland. The distribution of the Association’s assets among the members is excluded. The recipient is determined by the General Assembly at the same time as the resolution to dissolve the Association."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "11-entry-into-force",
      children: "11. Entry into force"
    }), "\n", createVNode(_components.p, {
      children: "These articles of Association were adopted by the constitutive meeting on 12 August 2024 and entered with effect on such date."
    }), "\n", createVNode(_components.p, {
      children: "The articles of Association were adapted by the extraordinary General Assembly on 25 November 2024 to add the role of the Treasurer."
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

const url = "/about/governance/pathoplexus-statutes";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/pathoplexus-statutes.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/pathoplexus-statutes.mdx";
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
