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
  "title": "Database Terms of Service",
  "order": 4
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
    "slug": "2-data-quality-data-rights-and-liability",
    "text": "2. Data quality, data rights and liability"
  }, {
    "depth": 1,
    "slug": "3-enforcement",
    "text": "3. Enforcement"
  }, {
    "depth": 1,
    "slug": "4-creation-and-use-of-an-account",
    "text": "4. Creation and Use of an Account"
  }, {
    "depth": 2,
    "slug": "5-pathoplexus-availability",
    "text": "5. Pathoplexus availability"
  }, {
    "depth": 2,
    "slug": "6-pathoplexus-code",
    "text": "6. Pathoplexus Code"
  }, {
    "depth": 2,
    "slug": "7-end-of-life",
    "text": "7. End of Life"
  }, {
    "depth": 2,
    "slug": "8-dispute-resolution",
    "text": "8. Dispute Resolution"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
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
      children: ["These terms constitute the terms of use for you (a “User”) of Pathoplexus, Basel-Stadt, Switzerland, governing the general use of the website, creation and use of accounts and groups, and data stored therein, as well as all services we provide. However, these terms do not govern the entirety of the data we store, and it is important that you also familiarize yourself with our ", createVNode(_components.a, {
        href: "/about/terms-of-use/privacy-policy",
        children: "Privacy Policy"
      }), " regarding how we store and process User data, and our ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " regarding the conditions under which you can access and use the pathogen data stored herein. If you do not agree to these terms, you may not use our website or services."]
    }), "\n", createVNode(_components.p, {
      children: ["This document is governed by the ", createVNode(_components.a, {
        href: "/about/governance/values",
        children: "Pathoplexus Values"
      }), " and should be interpreted in light of the Pathoplexus Values. The Executive Board can modify and make changes to this document, in line with the purpose and commitments of the Pathoplexus Values, via 2/3 majority vote of the entire Board. If the Board has 5 members, this is interpreted as 4/5 votes in favor."]
    }), "\n", createVNode(_components.p, {
      children: "The aim of Pathoplexus is to enable and encourage rapid sharing of genetic data for viral pathogens with human health impact, in order to encourage collaboration, facilitate genomic surveillance, and support research to combat these infectious diseases."
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
          href: "#2-data-quality-data-rights-and-liability",
          children: "2. Data quality, data rights, and liability"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#3-enforcement",
          children: "3. Enforcement"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#4-creation-and-use-of-an-account",
          children: "4. Creation and use of an account"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#5-pathoplexus-availability",
          children: "5. Pathoplexus Availability"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#6-pathoplexus-code",
          children: "6. Pathoplexus Code"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#7-end-of-life",
          children: "7. End of Life"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#8-dispute-resolution",
          children: "8. Dispute Resolution"
        })
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
          children: "1.3 The term “Curator” shall mean those who have elevated access in order to help detect and correct errors in the data"
        })]
      })
    }), "\n", createVNode(_components.h1, {
      id: "2-data-quality-data-rights-and-liability",
      children: "2. Data quality, data rights and liability"
    }), "\n", createVNode(_components.p, {
      children: ["By making use of Pathoplexus, Users understand and accept that it is provided ‘as-is,’ and that Pathoplexus accepts no responsibility for any inaccuracies in the data provided.\r\nPathoplexus is not providing any assistance or accepting any liability connected to any illegal activity or unethical use of data by Users, Submitters, or Curators.\r\nFurther, users accept that in accessing and viewing data via Pathoplexus, the users are agreeing to follow the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " with regard to any data which is labeled as Restricted-Use."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus aims to provide transparent, accurate access to data received from Submitters. Though Pathoplexus aims to identify and correct errors with the help of its Submitters, Curators, and Users, the quality and accuracy of the data submitted are ultimately the responsibility of the Submitters, not Pathoplexus.  Pathoplexus Curators will work with Submitters to provide feedback on data that may contain errors."
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus aims to provide and encourage access to viral pathogen sequences and metadata for scientific research. Pathoplexus does not claim any ownership of sequences submitted; intellectual property rights such as they may exist, remain with the Submitter. Users who access the data are subject to the conditions set out in the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ". Some Submitters may claim patent, copyright, or other intellectual property rights on their submitted data. Pathoplexus does not have a way to display such claims on sequences and is not in a position to assess their validity, and therefore cannot comment on or override any such claims. It is the responsibility of the User to ensure that their use of such data is not infringing on intellectual property rights, and Pathoplexus takes no liability in cases of infringement. Submitters recognise that Users making use of data as outlined by the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " is explicitly permitted, and should not upload data to Pathoplexus if such use would violate their perceived rights or intellectual property."]
    }), "\n", createVNode(_components.p, {
      children: "Submitters should ensure that they make their best efforts to provide good quality, accurate data, and ensure that they have the right to share and control this data."
    }), "\n", createVNode(_components.p, {
      children: ["Submitters must ensure that any data submitted ", createVNode(_components.strong, {
        children: "does not contain human reads, clinically sensitive data"
      }), ", or information that could ", createVNode(_components.strong, {
        children: "allow an individual to be publicly identified"
      }), ". Users must not attempt to identify specific individuals from data within Pathoplexus. If you come across any data that may violate any of the above within Pathoplexus, please report it immediately to ", createVNode(_components.a, {
        href: "mailto:submissions@pathoplexus.org",
        children: "submissions@pathoplexus.org"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus’ aim is to provide pathogen sequences from epidemiological and biological settings (sequences which have a sample setting (human, animal, cell, culture) and sample date). In this regard, we do ", createVNode(_components.em, {
        children: "not"
      }), " accept sequences that exist simply as in-silico or laboratory constructs, e.g. for patent purposes. Such synthetic sequences will be ", createVNode(_components.a, {
        href: "/docs/how-to/revoke-sequences",
        children: "revoked"
      }), ". We ", createVNode(_components.em, {
        children: "do"
      }), " accept vaccine-derived sequences (e.g. sequences obtained after vaccination)."]
    }), "\n", createVNode(_components.p, {
      children: "Submitters confirm by submitting data to Pathoplexus that they have the total and complete authority to do so. Submitters should not submit data if they are unsure whether it is permitted."
    }), "\n", createVNode(_components.p, {
      children: "It is highly recommended that Submitters keep a backup copy of any data they submit."
    }), "\n", createVNode(_components.p, {
      children: ["Users and Submitters should familiarize themselves with how we process submitted data and how it can be revised, revoked, and submitted onward, in ", createVNode(_components.a, {
        href: "/about/governance/data-submission",
        children: "Data Submission and Processing"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus cannot be held liable for the data that Submitters upload."
    }), "\n", createVNode(_components.h1, {
      id: "3-enforcement",
      children: "3. Enforcement"
    }), "\n", createVNode(_components.p, {
      children: "Users may, at their own expense and discretion, take action against any violations of the terms of compliance as set forth in this document. They may seek guidance from Pathoplexus on handling such compliance violations, and Pathoplexus will advise Users on these matters to the best of its ability. Pathoplexus remains at the disposal of users to discuss concerns about potential violations of the terms."
    }), "\n", createVNode(_components.h1, {
      id: "4-creation-and-use-of-an-account",
      children: "4. Creation and Use of an Account"
    }), "\n", createVNode(_components.p, {
      children: ["Any User over the age of 18 and not a minor in their country of residence can create an account in Pathoplexus.\r\nUsers must agree to comply with the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), " when they create an account.\r\nMoreover, everyone who accesses, views, or downloads Restricted-Use Data is bound by the ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "You are responsible for maintaining the confidentiality of your account, and are responsible for all activities that occur using your account. All actions carried out by any person through your account will be considered an act carried out by you. We recommend keeping your account access credentials confidential and not sharing them. We are not responsible for any loss, damage, or liability resulting from the wrongful, fraudulent, or illegal use of your account."
    }), "\n", createVNode(_components.p, {
      children: "By creating an account and submitting data, you confirm that you will supply legally correct and accurate information about yourself and the institutions that generated the data. If you submit data attributed to people and/or institutions that we are unable to verify are real, and are unable to reach you for clarification, your account may be terminated without warning and any data you have submitted may be removed from Pathoplexus."
    }), "\n", createVNode(_components.p, {
      children: "By creating an account you consent to being contactable in order to seek clarification about data you may Submit or be associated with. If you do not provide a valid email address through which you can be reached within a reasonable timeframe, your account may be terminated without warning."
    }), "\n", createVNode(_components.p, {
      children: "In cases of abuse, harassment, spam, or other activities that degrade our ability to provide our services, accounts may be removed without warning and IP addresses may be blocked from accessing Pathoplexus. In such cases we will attempt to contact the user to inform them of the ban, and the user can request a public statement detailing why their account was terminated and/or IP address was blocked, which will be issued within 2 weeks."
    }), "\n", createVNode(_components.p, {
      children: ["By creating an account you will provide information that we will process in order to create and provide you with account-related services.\r\nThis information is gathered in accordance with our ", createVNode(_components.a, {
        href: "/about/terms-of-use/privacy-policy",
        children: "Privacy Policy"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus will never share or sell your personal data.\r\nIn compliance with local and international law, we may grant access to User data in accordance with legally-enforced compliance requests."
    }), "\n", createVNode(_components.h2, {
      id: "5-pathoplexus-availability",
      children: "5. Pathoplexus availability"
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus aims to provide continuous access to our website and services, but cannot and does not guarantee that either Pathoplexus in its entirety or specific services may be available 100% of the time and will not be held liable in case services are not available."
    }), "\n", createVNode(_components.p, {
      children: "In case of foreseeable times of unavailability, we aim to notify all Users via a banner on the website of the date and duration of the expected downtime."
    }), "\n", createVNode(_components.h2, {
      id: "6-pathoplexus-code",
      children: "6. Pathoplexus Code"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus is built using an open-source software package, ", createVNode(_components.a, {
        href: "https://github.com/loculus-project",
        children: "Loculus"
      }), ".\r\nYou can find the open-source code behind Pathoplexus ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus",
        children: "here"
      }), ".\r\nIf you would like to contribute to improving the functionality of this website or fixing bugs, please contribute to the Loculus codebase ", createVNode(_components.a, {
        href: "https://github.com/loculus-project",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["If you identify bugs or have suggestions on how to improve Pathoplexus, please submit an issue ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/pathoplexus/issues",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "7-end-of-life",
      children: "7. End of Life"
    }), "\n", createVNode(_components.p, {
      children: ["In the event that Pathoplexus ceases to exist as a service, we reserve the right to store User, Submitter, and submitted data through all periods of Restricted Use (see ", createVNode(_components.a, {
        href: "/about/terms-of-use/data-use-terms",
        children: "Data Use Terms"
      }), ") until all data is submitted to INSDC members.\r\nAfter all data is submitted to INSDC, we will delete all remaining data."]
    }), "\n", createVNode(_components.p, {
      children: "We will aim to give Users, Submitters, and Curators as much notice as possible in the case that Pathoplexus would stop being able to provide services."
    }), "\n", createVNode(_components.h2, {
      id: "8-dispute-resolution",
      children: "8. Dispute Resolution"
    }), "\n", createVNode(_components.p, {
      children: "These Terms and any other Terms governing or relating to Pathoplexus, are governed by the law of Switzerland. In the event of any such dispute or claim in connection with these Terms, you agree to first engage in good faith discussion with us to resolve such a dispute or claim. If it cannot be resolved within sixty (60) days, settlement will be by arbitration under the courts of Switzerland."
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

const url = "/about/terms-of-use/terms-of-service";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/terms-of-service.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/terms-of-use/terms-of-service.mdx";
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
