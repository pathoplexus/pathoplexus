/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import { $ as $$Image } from './_astro_assets_GucvUgu0.mjs';
import { $ as $$InfoBox } from './InfoBox_IxH1oVvV.mjs';
import 'clsx';

const __0__________images_MetadataTemplate_png__ = new Proxy({"src":"/_astro/MetadataTemplate.C1qI4qMg.png","width":1774,"height":660,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/images/MetadataTemplate.png";
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
  "title": "Uploading sequences",
  "order": 40
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "multi-segmented-pathogens",
    "text": "Multi-segmented Pathogens"
  }, {
    "depth": 2,
    "slug": "website",
    "text": "Website"
  }, {
    "depth": 2,
    "slug": "uploading-raw-reads",
    "text": "Uploading raw reads"
  }, {
    "depth": 4,
    "slug": "submission-scenarios",
    "text": "Submission Scenarios:"
  }, {
    "depth": 2,
    "slug": "api",
    "text": "API"
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
    h4: "h4",
    li: "li",
    ol: "ol",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["You can only upload sequences if you have ", createVNode(_components.a, {
        href: "create-account",
        children: "created an account"
      }), " and are part of a ", createVNode(_components.a, {
        href: "create-group",
        children: "group"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Before you begin this process, you should ensure your data is in the correct format. Each sequence should have a unique id that can be used to associate it with its corresponding metadata entry."
    }), "\n", createVNode(_components.p, {
      children: "The expected data format is as follows:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Sequence data in ", createVNode(_components.code, {
          children: "fasta"
        }), " format with each header containing the unique ", createVNode(_components.code, {
          children: "id"
        }), " of the sequence.\r\n", createVNode(_components.em, {
          children: ["Please, note that ", createVNode(_components.strong, {
            children: "terminal Ns will be automatically removed"
          }), " during sequence preprocessing and will not be included in the submitted sequences."]
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Metadata in ", createVNode(_components.code, {
          children: "tsv"
        }), " format for each sequence. You can read more about the required metadata fields ", createVNode(_components.a, {
          href: "../concepts/metadataformat",
          children: "here"
        }), ". A metadata template is provided for each organism on the submission page."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Metadata template.",
        src: __0__________images_MetadataTemplate_png__
      })
    }), "\n", createVNode(_components.p, {
      children: "The files can also be compressed: accepted formats are .zst, .gz, .zip and .xz."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["You can try out uploading sequences to our ", createVNode(_components.a, {
          href: "https://demo.pathoplexus.org/",
          children: "Demo Instance"
        }), " - it works just like the ‘real’ Pathoplexus, but is wiped regularly and ", createVNode(_components.strong, {
          children: "no data is sent onward to INSDC"
        }), ". We also have some ", createVNode(_components.a, {
          href: "https://pathoplexus.github.io/example_data/",
          children: "example data"
        }), " you can upload to the Demo Instance."]
      })
    }), "\n", createVNode(_components.h3, {
      id: "multi-segmented-pathogens",
      children: "Multi-segmented Pathogens"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus expects multi-segmented pathogen sequence data to have one unique id per ", createVNode(_components.strong, {
        children: "isolate"
      }), " (pathogen sample containing all segments). However, ", createVNode(_components.code, {
        children: "fasta"
      }), " files should still have a separate entry/record per segment. Therefore, each record id should include the unique id of the isolate and the segment name, for example: ", createVNode(_components.code, {
        children: "id + '_' + segmentName"
      }), ". The metadata is uploaded per isolate, i.e. there will be only one row for each ", createVNode(_components.code, {
        children: "id"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "website",
      children: "Website"
    }), "\n", createVNode(_components.p, {
      children: "Uploading sequences via the website is an easy way to submit sequences without having to worry about any code."
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Log into your account, and then click ‘Submit’ in the top-right corner of the website"
      }), "\n", createVNode(_components.li, {
        children: "Select the organism that you’d like to submit sequences for"
      }), "\n", createVNode(_components.li, {
        children: ["Drag-and-drop a ", createVNode(_components.code, {
          children: "fasta"
        }), " file with the sequences and a metadata file with the associated metadata into the box on the website, or click the ‘Upload a file’ link within the boxes to open a file-selection box"]
      }), "\n", createVNode(_components.li, {
        children: ["Select the Terms of Use that you would like for your data. You can read more about the ", createVNode(_components.strong, {
          children: "Terms of Use"
        }), " ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "here"
        }), ". If you choose ‘Restricted’ - set the time limit for the restriction, up to 1 year"]
      }), "\n", createVNode(_components.li, {
        children: "Select ‘Submit sequences’ at the bottom of the page"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["The data will now be processed, and you will have to approve your submission before it is finalized. You can see how to do this ", createVNode(_components.a, {
        href: "approve-submissions",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "uploading-raw-reads",
      children: "Uploading raw reads"
    }), "\n", createVNode(_components.p, {
      children: ["Pathoplexus currently only accepts consensus sequence submissions. If you wish to upload raw reads, you can do so directly through the ", createVNode(_components.a, {
        href: "https://ena-docs.readthedocs.io/en/latest/submit/reads.html",
        children: "INSDC submission portal"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "To ensure your raw reads are linked to your consensus sequence in the INSDC, both should be associated with the same BioSample and BioProject at the time of submission. We suggest you submit consensus sequences first to ensure metadata consistency."
    }), "\n", createVNode(_components.h4, {
      id: "submission-scenarios",
      children: "Submission Scenarios:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Submitting the Consensus Sequence First (via Pathoplexus):\r\nAfter submitting your consensus sequence to Pathoplexus, use the biosample and bioproject accessions we provide (e.g., Bioproject Accession: PRJEB80643, Biosample Accession: SAMEA116354847) when submitting your raw reads to the INSDC."
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Submitting Raw Reads First (via INSDC):\r\nIf you submit raw reads to the INSDC first, create a biosample and bioproject during the upload process. Then, provide the raw reads accession in the metadata.tsv (e.g., insdcRawReadsAccession=SRR27477368) when submitting your consensus sequence to Pathoplexus. This allows us to link your consensus sequence to the raw reads in the INSDC."
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Please contact us at ", createVNode(_components.code, {
        children: "submission@pathoplexus.org"
      }), " if you have any questions about submitting raw reads."]
    }), "\n", createVNode(_components.h2, {
      id: "api",
      children: "API"
    }), "\n", createVNode($$InfoBox, {
      children: createVNode(_components.p, {
        children: ["To use the ", createVNode(_components.a, {
          href: "https://demo.pathoplexus.org",
          children: "demo instance"
        }), " instead of the main instance, please replace ", createVNode(_components.code, {
          children: "backend.pathoplexus.org"
        }), " with ", createVNode(_components.code, {
          children: "backend-demo.pathoplexus.org"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: ["By using our API you agree to our ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: "It is currently possible to upload sequences through an HTTP API. We also plan to release a command-line interface."
    }), "\n", createVNode(_components.p, {
      children: "To upload sequences through the HTTP API you will need to:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["Retrieve an authentication JSON web token: see the ", createVNode(_components.a, {
          href: "/docs/how-to/authentication-api",
          children: "Authenticating via API guide"
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: ["Identify the Group ID of your group: you can find it on the page of your group (which can be reached from your ", createVNode(_components.a, {
          href: "/user",
          children: "user page"
        }), ")."]
      }), "\n", createVNode(_components.li, {
        children: ["Send a POST request:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: ["To upload sequences with the ", createVNode(_components.strong, {
                children: "open use terms"
              }), ": ", createVNode(_components.code, {
                children: "https://backend.pathoplexus.org/<organism>/submit?groupId=<   group id>&dataUseTermsType=OPEN"
              })]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: ["To upload sequences with the ", createVNode(_components.strong, {
                children: "restricted use terms"
              }), ": ", createVNode(_components.code, {
                children: "https://backend.pathoplexus.org/<organism>/submit?groupId=<group id>&dataUseTermsType=RESTRICTED&restrictedUntil=<restricted-until-date>"
              })]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: ["API upload is available for all pathogens on Pathoplexus. You can find the correct term to use in place of ", createVNode(_components.code, {
                children: "<organism>"
              }), " by using the value in the URL when you navigate to browse sequences from that Pathogen. For example, for West Nile Virus, the URL is ", createVNode(_components.code, {
                children: "https://pathoplexus.org/west-nile/search?"
              }), " and thus ", createVNode(_components.code, {
                children: "<organism>"
              }), " is ", createVNode(_components.code, {
                children: "west-nile"
              }), "."]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: "The restricted-until date must be provided in the ISO format (e.g., 2024-08-27)."
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: "The header should contain"
            }), "\n", createVNode(_components.ul, {
              children: ["\n", createVNode(_components.li, {
                children: createVNode(_components.code, {
                  children: "Authorization: Bearer <authentication-token>"
                })
              }), "\n", createVNode(_components.li, {
                children: createVNode(_components.code, {
                  children: "Content-Type: multipart/form-data"
                })
              }), "\n"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: ["\n", createVNode(_components.p, {
              children: ["The request body should contain the FASTA and metadata TSV files with the keys ", createVNode(_components.code, {
                children: "sequenceFile"
              }), " and ", createVNode(_components.code, {
                children: "metadataFile"
              })]
            }), "\n"]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "With cURL, the corresponding command for sending the POST request can be:"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "curl -X 'POST' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  'https://backend.pathoplexus.org/<organism>/submit?groupId=<group id>&dataUseTermsType=OPEN' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'accept: application/json' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'Authorization: Bearer <authentication token>' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -H 'Content-Type: multipart/form-data' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -F 'metadataFile=@<metadata file name>' \\"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  -F 'sequenceFile=@<fasta file name>'"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Further information can be found in our ", createVNode(_components.a, {
        href: "https://backend.pathoplexus.org/swagger-ui/index.html#/submission-controller/submit",
        children: "Swagger API documentation"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["As with the website, data will now be processed, and you will have to approve your submission before it is finalized. You can see how to do this ", createVNode(_components.a, {
        href: "approve-submissions",
        children: "here"
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

const url = "/docs/how-to/upload-sequences";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/upload-sequences.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/upload-sequences.mdx";
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
