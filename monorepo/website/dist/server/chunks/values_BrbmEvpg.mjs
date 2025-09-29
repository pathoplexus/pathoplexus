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
  "title": "Pathoplexus Values",
  "order": 2
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 2,
    "slug": "preamble",
    "text": "Preamble"
  }, {
    "depth": 2,
    "slug": "purpose-and-scope",
    "text": "Purpose and Scope"
  }, {
    "depth": 2,
    "slug": "commitments",
    "text": "Commitments"
  }, {
    "depth": 3,
    "slug": "article-1-transparency",
    "text": "Article 1: Transparency"
  }, {
    "depth": 3,
    "slug": "article-2-recognitions",
    "text": "Article 2: Recognitions"
  }, {
    "depth": 3,
    "slug": "article-3-fair-principles",
    "text": "Article 3: FAIR principles"
  }, {
    "depth": 3,
    "slug": "article-4-beneficial-sharing",
    "text": "Article 4: Beneficial Sharing"
  }, {
    "depth": 2,
    "slug": "organization",
    "text": "Organization"
  }, {
    "depth": 3,
    "slug": "article-5-governance",
    "text": "Article 5: Governance"
  }, {
    "depth": 3,
    "slug": "article-6-pathoplexus-values-modification",
    "text": "Article 6: Pathoplexus Values Modification"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    h3: "h3",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h3, {
      id: "contents",
      children: "Contents:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#preamble",
          children: "Preamble"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#purpose-and-scope",
          children: "Purpose and Scope"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#commitments",
          children: "Commitments"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-1-transparency",
              children: "Article 1: Transparency"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-2-recognitions",
              children: "Article 2: Recognitions"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-3-fair-principles",
              children: "Article 3: FAIR Principles"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-4-beneficial-sharing",
              children: "Article 4: Beneficial Sharing"
            })
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.a, {
          href: "#organization",
          children: "Organization"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-5-governance",
              children: "Article 5: Governance"
            })
          }), "\n", createVNode(_components.li, {
            children: createVNode(_components.a, {
              href: "#article-6-pathoplexus-values-modification",
              children: "Article 6: Pathoplexus Values Modification"
            })
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "These Terms were updated on 4 Aug 2024 and are the current and valid version."
    }), "\n", createVNode(_components.p, {
      children: "The Pathoplexus Values were adopted by the General Assembly at the founding meeting of Pathoplexus on 12 Aug 2024."
    }), "\n", createVNode(_components.h2, {
      id: "preamble",
      children: "Preamble"
    }), "\n", createVNode(_components.p, {
      children: "Pathoplexus is a public pathogen sequence and metadata database built"
    }), "\n", createVNode(_components.p, {
      children: ["     ", createVNode(_components.em, {
        children: "to provide"
      }), " a transparent platform for sharing pathogen genome data,"]
    }), "\n", createVNode(_components.p, {
      children: ["     ", createVNode(_components.em, {
        children: "to foster"
      }), " collaboration, empower scientific discoveries, and assist in swift public health responses,"]
    }), "\n", createVNode(_components.p, {
      children: ["     ", createVNode(_components.em, {
        children: "to serve"
      }), " as a steward of community data, owing its utility to its users,"]
    }), "\n", createVNode(_components.p, {
      children: ["     ", createVNode(_components.em, {
        children: "to operate"
      }), " in a transparent manner, seeking feedback from the community and welcoming both commendations and critiques,"]
    }), "\n", createVNode(_components.p, {
      children: ["     ", createVNode(_components.em, {
        children: "to maximize"
      }), " the sharing and utility of pathogen genomic data in order to benefit research and public health."]
    }), "\n", createVNode("div", {
      class: "alternative-lists",
      children: [createVNode(_components.h2, {
        id: "purpose-and-scope",
        children: "Purpose and Scope"
      }), createVNode(_components.p, {
        children: "The purpose of Pathoplexus is:"
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: "To provide high-quality infrastructure for the submission and downloading of pathogen genetic sequencing data and non-sensitive metadata;"
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: ["To process, manage, and store data uploaded by Submitters and to make them available to Users via the website and a web API under specific ", createVNode(_components.a, {
                href: "/about/terms-of-use/data-use-terms",
                children: "Data Use Terms"
              }), ";"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: "To offer features tailored to the needs of the pathogen genomics community."
            }), "\n"]
          }), "\n"]
        })
      }), createVNode(_components.h2, {
        id: "commitments",
        children: "Commitments"
      }), createVNode(_components.p, {
        children: createVNode(_components.em, {
          children: "Pathoplexus commits:"
        })
      }), createVNode(_components.h3, {
        id: "article-1-transparency",
        children: "Article 1: Transparency"
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: [createVNode(_components.strong, {
                children: "Governance:"
              }), " To operate transparently in service of the scientific and public health communities, with clear documents detailing how its boards operate, and the powers they have, how members are elected and dismissed, how decisions are made, how conflicts are resolved, and to keep and disseminate meeting minutes;"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: [createVNode(_components.strong, {
                children: "Data integrity:"
              }), " To record and disclose any changes to data in version histories;"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: [createVNode(_components.strong, {
                children: "Data use terms:"
              }), " To provide clear explanations on how restricted-use data can be used in the Data Use Terms, with these explanations being further expanded and clarified as questions arise, and to provide clear labeling of what restrictions (if any) apply to each sequence;"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: [createVNode(_components.strong, {
                children: "Open development:"
              }), " To develop user-friendly interfaces to make submitting and accessing data straightforward, publish the entire code base under an open source license, to publicly discuss known issues and envisioned solutions, to seek and incorporate feedback from the community, to engage users using public forums, discussions and meetings, and to not impose sanctions via the database in relation to criticism of the database or its operation or governance."]
            }), "\n"]
          }), "\n"]
        })
      }), createVNode(_components.h3, {
        id: "article-2-recognitions",
        children: "Article 2: Recognitions"
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "To ensure that those who generate sequence data are properly recognised for their contributions, both through the development of new technologies tracking and reporting contributions and through changing community practices. To that end, Pathoplexus may provide mechanisms for sharing data with a time-limited protection that restricts how it can be used, before it is made available on fully open databases (e.g. INSDC). However, this should be provided within the overarching aim towards eventually creating a research atmosphere where all sequence generators feel empowered to share openly."
          }), "\n"]
        })
      }), createVNode(_components.h3, {
        id: "article-3-fair-principles",
        children: "Article 3: FAIR principles"
      }), createVNode("div", {
        class: "indent",
        children: [createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "To adhere to the FAIR principles:"
          }), "\n"]
        }), createVNode("div", {
          class: "roman-list",
          children: createVNode("div", {
            class: "indent",
            children: createVNode(_components.ol, {
              children: ["\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: ["Data will be ", createVNode("b", {
                    children: "F"
                  }), "indable: by providing unique, persistent identifiers with complete version histories, annotating sequences with additional metadata items, and providing rich search functionality, tailored to pathogen use-cases."]
                }), "\n"]
              }), "\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: ["Data will be ", createVNode("b", {
                    children: "A"
                  }), "ccessible: all data in Pathoplexus will be provided free-of-charge to any user who agrees to the terms of use; all data will be available both through a web interface and an API available to all users; and Pathoplexus will strive to update access methods in line with technological advances."]
                }), "\n"]
              }), "\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: ["Data will be ", createVNode("b", {
                    children: "I"
                  }), "nteroperable: metadata will be standardized where possible, using FAIR-standard vocabularies; all data will be available in file formats that enable broad reuse; and all data within Pathoplexus will ultimately be submitted to fully open standardized international genomic databases, such as those that make up INSDC."]
                }), "\n"]
              }), "\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: ["Data will be ", createVNode("b", {
                    children: "R"
                  }), "eusable: users are encouraged to include information on where and how data was collected and generated; data is clearly labeled to indicate whether it has restrictions in how it can be used; and sequences originating from or uploaded to other databases have their provenance and alternative identifiers clearly indicated."]
                }), "\n"]
              }), "\n"]
            })
          })
        })]
      }), createVNode(_components.h3, {
        id: "article-4-beneficial-sharing",
        children: "Article 4: Beneficial Sharing"
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "To encourage data sharing with the primary aim of fostering scientific research, public health improvement, and the common good.\r\nData sharing should prioritize positive outcomes, including but not limited to, enhancing global health knowledge, facilitating timely and effective responses to health threats, and supporting equitable access to scientific advancements."
          }), "\n", createVNode(_components.li, {
            children: "To comply with, endorse and adhere to consensus-driven, international efforts aimed at decreasing disparities and improving equitable global benefits from pathogen sequence sharing."
          }), "\n"]
        })
      }), createVNode(_components.h2, {
        id: "organization",
        children: "Organization"
      }), createVNode(_components.h3, {
        id: "article-5-governance",
        children: "Article 5: Governance"
      }), createVNode("div", {
        class: "indent",
        children: [createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "Pathoplexus shall always have in place a diverse, active Executive Board."
          }), "\n"]
        }), createVNode("div", {
          class: "roman-list",
          children: createVNode("div", {
            class: "indent",
            children: createVNode(_components.ol, {
              children: ["\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: "The primary purpose of the Executive Board is to guide the implementation and running of Pathoplexus to achieve the aims and goals outlined in these Values."
                }), "\n"]
              }), "\n", createVNode(_components.li, {
                children: ["\n", createVNode(_components.p, {
                  children: "The Executive Board should be particularly attentive to Article 1.1 - Transparency in Governance."
                }), "\n"]
              }), "\n"]
            })
          })
        })]
      }), createVNode(_components.h3, {
        id: "article-6-pathoplexus-values-modification",
        children: "Article 6: Pathoplexus Values Modification"
      }), createVNode("div", {
        class: "indent",
        children: createVNode(_components.ol, {
          children: ["\n", createVNode(_components.li, {
            children: "This Charter can be modified only via 2/3 vote of all of the Executive Board members. If the Executive Board has 5 members, this is interpreted as 4/5 votes in favor."
          }), "\n"]
        })
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

const url = "/about/governance/values";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/values.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/about/governance/values.mdx";
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
