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
  "title": "Privacy Policy",
  "order": 5
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "who-is-responsible",
    "text": "Who is responsible?"
  }, {
    "depth": 2,
    "slug": "principles-of-data-processing",
    "text": "Principles of data processing"
  }, {
    "depth": 2,
    "slug": "data-we-collect",
    "text": "Data we collect"
  }, {
    "depth": 2,
    "slug": "data-security",
    "text": "Data Security"
  }, {
    "depth": 2,
    "slug": "international-transfers",
    "text": "International transfers"
  }, {
    "depth": 2,
    "slug": "how-we-may-share-your-personal-data",
    "text": "How we may share your Personal Data"
  }, {
    "depth": 2,
    "slug": "what-we-do-not-do",
    "text": "What we do not do"
  }, {
    "depth": 2,
    "slug": "privacy-rights",
    "text": "Privacy Rights"
  }, {
    "depth": 2,
    "slug": "updating-your-information-and-withdrawing-your-consent",
    "text": "Updating your information and withdrawing your consent"
  }, {
    "depth": 2,
    "slug": "access-request",
    "text": "Access Request"
  }, {
    "depth": 2,
    "slug": "complaint-to-a-supervisory-authority",
    "text": "Complaint to a supervisory authority"
  }, {
    "depth": 2,
    "slug": "validity-and-questions",
    "text": "Validity and questions"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["We are pleased that you are visiting our website at ", createVNode(_components.a, {
        href: "https://pathoplexus.org",
        children: "https://pathoplexus.org"
      }), " and Pathoplexus our genomic sequence database (“Database”). Data protection and data security when using our website and Database are very important to us. We would therefore like to inform you which of your Personal Data we collect when you visit our website and use our Database and for what purposes it is used."]
    }), "\n", createVNode(_components.h2, {
      id: "who-is-responsible",
      children: "Who is responsible?"
    }), "\n", createVNode(_components.p, {
      children: ["The person responsible in the sense of Switzerland’s Federal Act on Data Protection, 2020 (“FADP”) and the EU’s General Data Protection Regulation (“GDPR”) is the Pathoplexus association, of Basel, Switzerland (“we”, “us”, “our”). If you have any questions about this policy or our data protection practices, please contact us using ", createVNode(_components.a, {
        href: "mailto:accounts@pathoplexus.org",
        children: "accounts@pathoplexus.org"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "principles-of-data-processing",
      children: "Principles of data processing"
    }), "\n", createVNode(_components.p, {
      children: ["a. ", createVNode(_components.em, {
        children: "Personal data"
      }), ":\r\nPersonal data is any information relating to an identified or identifiable natural person. This includes, for example, information such as your name, age, address, telephone number, date of birth, e-mail address, IP address or user behavior."]
    }), "\n", createVNode(_components.p, {
      children: ["b. ", createVNode(_components.em, {
        children: "Processing"
      }), ":\r\nThe processing of Personal Data (e.g. collection, retrieval, use, storage or transmission) always requires a legal basis."]
    }), "\n", createVNode(_components.p, {
      children: ["c. ", createVNode(_components.em, {
        children: "Legal basis"
      }), ":\r\nIn accordance with the FADP and the GDPR, we have to have at least one of the following legal bases to process your Personal Data: i) you have given your consent, ii) the data is necessary for the fulfillment of a contract / pre-contractual measures, iii) the data is necessary for the fulfillment of a legal obligation, or iv) the data is necessary to protect our legitimate interests, provided that your interests are not overridden."]
    }), "\n", createVNode(_components.p, {
      children: ["d. ", createVNode(_components.em, {
        children: "Retention"
      }), ":\r\nProcessed Personal Data will be deleted as soon as the purpose of the processing has been achieved and there are no longer any legally required retention obligations."]
    }), "\n", createVNode(_components.h2, {
      id: "data-we-collect",
      children: "Data we collect"
    }), "\n", createVNode(_components.p, {
      children: ["a. ", createVNode(_components.em, {
        children: "Provision and use of the website"
      }), ":\r\nWhen you access our website, we collect the Personal Data that your browser automatically transmits to our server. This is technically necessary for us to display our website and to ensure its stability and security. In this sense, we collect the following data: i) IP address of the requesting computer, ii) Date and time of access, iii) name and URL of the file accessed, iv) website from which the access was made (referrer URL), v) browser used and, if applicable, the operating system of your computer as well as the name of your access provider. The legal basis is our legitimate interest."]
    }), "\n", createVNode(_components.p, {
      children: ["b. ", createVNode(_components.em, {
        children: "Hosting"
      }), ":\r\nWe use the hosting services of Amazon Web Services (AWS) for the purpose of hosting and displaying our website. AWS does so on the basis of processing on our behalf, and that also means that all data collected on our website is processed on AWS’s servers in Europe. The legal basis for processing is our legitimate interest."]
    }), "\n", createVNode(_components.p, {
      children: ["c. ", createVNode(_components.em, {
        children: "Cookies"
      }), ":\r\nThe FADP and the EU counterpart the Privacy and Electronic Communications Directive (“PECD”), require us to ask for your consent when using specific cookies (in particular any cookie that is not strictly necessary for the operation of the website, for example, Functional cookies, Analysis and performance cookies and Advertising cookies or targeting cookies “Optional cookies”)."]
    }), "\n", createVNode(_components.p, {
      children: "Further and as the FADP and the GDPR also require a legal basis for the use of Personal Data in relation to cookies, the use of cookies would then be your consent as well as our legitimate interest.\r\nHowever, as we think it is important that you should have full control over your privacy online, we refrained from placing optional cookies on my website and as such we are not required to obtain any consents. Nonetheless, this may change, and we ask you to regularly check this policy for any updates."
    }), "\n", createVNode(_components.p, {
      children: ["d. ", createVNode(_components.em, {
        children: "Contacting Us"
      }), ":\r\nWe offer you the opportunity to contact us using various methods. We collect the data you submit such as your name, email address, telephone number and your message in order to process your enquiry and respond to you. The legal basis is both your consent and contract."]
    }), "\n", createVNode(_components.p, {
      children: ["e. ", createVNode(_components.em, {
        children: "User Account"
      }), ":\r\nFor the creation of an account, we require contact details, such as your Full Name, Username, Email address (preferably institutional), as well as information about the group you are joining or creating, and optional about your institution, the role and title and office details in your institution etc. and country, phone number, ORCiD, links to website(s), your bio in the about section. You can access this data in your user account. The legal bases for processing are contract and our legitimate interest."]
    }), "\n", createVNode(_components.p, {
      children: ["f. ", createVNode(_components.em, {
        children: "Our Database"
      }), ":\r\nWe process your sequence data uploaded to or involved in your use of our Database (“Service Data”) in order to be able to provide our services to you. Service Data may include Personal Data that is or can be associated with the sequence such as ‘authors’, ‘generators’ or ‘submitters’ names. You agree that, if you have provided us with Personal Data relating to a third party (i) you have in place all necessary appropriate consents and notices to enable lawful transfer of such Personal Data to us and (ii) that you have brought to the attention of any such third party our Privacy Policy."]
    }), "\n", createVNode(_components.p, {
      children: ["We provide you with complete control of your Service Data by providing you the ability to (i) access your Service Data, (ii) share your Service Data through supported third-party integrations such as the ", createVNode(_components.a, {
        href: "https://www.ebi.ac.uk/data-protection/privacy-notice/embl-ebi-public-website",
        children: "INSDC - International Nucleotide Sequence Database Collaboration"
      }), ", and (iii) request export or deletion of your Service Data stored in our Database."]
    }), "\n", createVNode(_components.p, {
      children: "Note that data that is associated publicly with submitted sequences cannot be deleted even if the associated account is deleted. This may include author name, institution, and revision/revocation actions by a user."
    }), "\n", createVNode(_components.p, {
      children: "Where we process Service Data as Data Processor or in other words on behalf of you, we will process the Service Data involved in your use of our services in accordance with your instructions and shall use it only for the purposes agreed between you and us."
    }), "\n", createVNode(_components.p, {
      children: "We ensure that access by our employees to your non-public data is only available on a need-to-know basis, restricted to specific individuals, and is monitored and audited. We communicate our privacy and security guidelines to our employees and enforce privacy and protection safeguards strictly."
    }), "\n", createVNode(_components.p, {
      children: "For the purpose of providing our services all Service Data processed by us will be stored using AWS’s servers as our sub-processor and take appropriate legal precautions and corresponding technical and organizational measures to ensure the protection of your Service Data."
    }), "\n", createVNode(_components.p, {
      children: ["g. ", createVNode(_components.em, {
        children: "Mailing list"
      }), ":"]
    }), "\n", createVNode(_components.p, {
      children: "When you subscribe to our mailing list, we will collect and process your email address—and, if provided, your name—for the sole purpose of sending you updates, news, and promotional materials related to Pathoplexus. The legal basis for processing your personal data for this purpose is your explicit consent."
    }), "\n", createVNode(_components.p, {
      children: ["By subscribing, you agree to receive periodic communications from us. You can withdraw your consent at any time by clicking the “unsubscribe” link in any of our emails or by contacting us directly at ", createVNode(_components.a, {
        href: "mailto:hello@pathoplexus.org",
        children: "hello@pathoplexus.org"
      }), ". Upon withdrawal, we will promptly remove your information from our mailing list."]
    }), "\n", createVNode(_components.p, {
      children: "We will retain your mailing list data only as long as necessary to provide you with these communications or until you request deletion. For further details about how we protect your data, please see our Data Security section."
    }), "\n", createVNode(_components.h2, {
      id: "data-security",
      children: "Data Security"
    }), "\n", createVNode(_components.p, {
      children: "We undertake to protect your privacy and to treat your Personal Data (excepting what is associated with public sequences such as author names) confidentiality. In order to prevent manipulation or loss or misuse of your data stored with us, we take extensive technical and organizational security precautions which are regularly reviewed and adapted to technological progress. These include, among other things, the use of recognised encryption procedures (SSL or TLS)."
    }), "\n", createVNode(_components.p, {
      children: "However, we would like to point out that, due to the structure of the Internet, it is possible that the rules of data protection and the above-mentioned security measures are not observed by other persons or institutions that are not in our area of responsibility. We have no technical influence on this. It is the user’s responsibility to protect the data he or she provides against misuse by encrypting it or in any other way."
    }), "\n", createVNode(_components.h2, {
      id: "international-transfers",
      children: "International transfers"
    }), "\n", createVNode(_components.p, {
      children: "We may transfer your Personal Data to other companies as necessary for the purposes described in this Privacy Policy. In order to provide adequate protection for your Personal Data when it is transferred, we have contractual arrangements regarding such transfers. We take all reasonable technical and organizational measures to protect the Personal Data we transfer."
    }), "\n", createVNode(_components.h2, {
      id: "how-we-may-share-your-personal-data",
      children: "How we may share your Personal Data"
    }), "\n", createVNode(_components.p, {
      children: "We may share your Personal Data with our Business Partners for the purposes described in this Privacy Policy, including (but not limited to) conducting the services you request, or customizing our business to better meet your needs. We share your Personal Data only with Business Partners who agree to protect and use your Personal Data solely for the purposes specified by us."
    }), "\n", createVNode(_components.p, {
      children: "We may also disclose your Personal Data for any purpose with your consent or for law enforcement, fraud prevention or other legal actions as required by law or regulation, or if we reasonably believe that we must protect us, our customers or other business interests. Except as described above of which you will be informed in advance, we will not disclose your Personal Data."
    }), "\n", createVNode(_components.h2, {
      id: "what-we-do-not-do",
      children: "What we do not do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "We do not request Personal Data from minors and children;"
      }), "\n", createVNode(_components.li, {
        children: "We do not use Automated decision-making including profiling; and"
      }), "\n", createVNode(_components.li, {
        children: "We do not sell your Personal Data."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "privacy-rights",
      children: "Privacy Rights"
    }), "\n", createVNode(_components.p, {
      children: "Under the FADP and the GDPR, you can exercise the following rights:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to information"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to rectification"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to deletion"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to data portability"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right of objection"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to withdraw consent"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right to complain to a supervisory authority"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Right not to be subject to a decision based solely on automated processing."
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "If you have any questions about the nature of the Personal Data we hold about you, or if you wish to exercise any of your rights, please contact us."
    }), "\n", createVNode(_components.h2, {
      id: "updating-your-information-and-withdrawing-your-consent",
      children: "Updating your information and withdrawing your consent"
    }), "\n", createVNode(_components.p, {
      children: "If you believe that the information we hold about you is inaccurate or that we are no longer entitled to use it and want to request its rectification, deletion (excepting what is associated with public sequences such as author names), or object to its processing or want to withdraw any consents you have given us, please contact us."
    }), "\n", createVNode(_components.h2, {
      id: "access-request",
      children: "Access Request"
    }), "\n", createVNode(_components.p, {
      children: "In the event that you wish to make a Data Subject Access Request, please inform us in writing. We will respond to requests regarding access and correction as soon as reasonably possible. Should we not be able to respond to your request within thirty (30) days, we will tell you why and when we will be able to respond to your request. If we are unable to provide you with any Personal Data or to make a correction requested by you, we will tell you why."
    }), "\n", createVNode(_components.h2, {
      id: "complaint-to-a-supervisory-authority",
      children: "Complaint to a supervisory authority"
    }), "\n", createVNode(_components.p, {
      children: "You have the right to complain about our processing of Personal Data to a supervisory authority responsible for data protection. However, we would appreciate the opportunity to address your concerns before you contact any supervisory authority."
    }), "\n", createVNode(_components.h2, {
      id: "validity-and-questions",
      children: "Validity and questions"
    }), "\n", createVNode(_components.p, {
      children: "This Privacy Policy was last updated on Tuesday, 27th of February 2024, and is the current and valid version. However, from time to time changes or a revision to this policy may be necessary. If you have any questions or comments about our Privacy Policy or wish to exercise your rights under applicable laws, please contact us using the details provided above."
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

const url = "/about/terms-of-use/privacy-policy";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/privacy-policy.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/privacy-policy.mdx";
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
