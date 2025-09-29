/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import 'clsx';

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
  "title": "Search & download sequences via API",
  "order": 61
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "contents",
    "text": "Contents:"
  }, {
    "depth": 1,
    "slug": "main-query-types-covered",
    "text": "Main Query Types Covered"
  }, {
    "depth": 3,
    "slug": "basic-counts",
    "text": "Basic counts"
  }, {
    "depth": 3,
    "slug": "metadata",
    "text": "Metadata"
  }, {
    "depth": 3,
    "slug": "sequences",
    "text": "Sequences"
  }, {
    "depth": 1,
    "slug": "how-to-call-queries-via-api",
    "text": "How to Call Queries via API"
  }, {
    "depth": 1,
    "slug": "download-all-sequences-of-an-organism",
    "text": "Download All Sequences of an Organism"
  }, {
    "depth": 1,
    "slug": "download-specific-sequences-by-accession",
    "text": "Download Specific Sequences by Accession"
  }, {
    "depth": 2,
    "slug": "with-the-website",
    "text": "With the website"
  }, {
    "depth": 2,
    "slug": "with-the-lapis-api",
    "text": "With the LAPIS API"
  }, {
    "depth": 1,
    "slug": "download-sequences-by-search",
    "text": "Download Sequences by Search"
  }, {
    "depth": 1,
    "slug": "searching-by-mutations-via-api",
    "text": "Searching by Mutations via API"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
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
          href: "#main-query-types-covered",
          children: "Main Query Types Covered"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#how-to-call-queries-via-api",
          children: "How to Call Queries via API"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#download-all-sequences-of-an-organism",
          children: "Download all Sequences of an Organism"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#download-specific-sequences-by-accession",
          children: "Download Specific Sequences by Accession"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#download-sequences-by-search",
          children: "Download Sequences by Search"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "#searching-by-mutations-via-api",
          children: "Searching by Mutations via API"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: ["By using our API you agree to our ", createVNode(_components.a, {
          href: "/about/terms-of-use/data-use-terms",
          children: "Data Use Terms"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: ["For full instructions on how to use our API, you should read our ", createVNode(_components.a, {
        href: "/api-documentation",
        children: "Swagger API documentation"
      }), ".\r\nThe instructions below use what are called ", createVNode(_components.code, {
        children: "GET"
      }), " requests, but you can also use ", createVNode(_components.code, {
        children: "POST"
      }), " requests. For example, if you would like to retrieve sequences for a long list of accessions you would need to use a ", createVNode(_components.code, {
        children: "POST"
      }), " request, as this size of request would not fit in a URL."]
    }), "\n", createVNode(_components.p, {
      children: "If you’re interested in using the API more completely, you’ll need to learn more about these types of requests."
    }), "\n", createVNode(_components.p, {
      children: ["Here we describe how to search and download sequences using our generalized Lightweight API for Sequences (", createVNode(_components.a, {
        href: "https://github.com/GenSpectrum/LAPIS",
        children: "LAPIS"
      }), ").\r\nRemember to always specify the organism that you are searching within in the URL. This could be ", createVNode(_components.code, {
        children: "cchf"
      }), ", ", createVNode(_components.code, {
        children: "west-nile"
      }), ", ", createVNode(_components.code, {
        children: "ebola-zaire"
      }), ", ", createVNode(_components.code, {
        children: "ebola-sudan"
      }), ", ", createVNode(_components.code, {
        children: "mpox"
      }), ", ", createVNode(_components.code, {
        children: "hmpv"
      }), ", ", createVNode(_components.code, {
        children: "rsv-a"
      }), " or ", createVNode(_components.code, {
        children: "rsv-b"
      }), ".\r\nBelow, this will sometimes be shown with ", createVNode(_components.code, {
        children: "[ORG]"
      }), " in examples - the whole thing (including brackets) should be replaced with one of the above options."]
    }), "\n", createVNode(_components.p, {
      children: ["Note that for CCHF, and any other multi-segmented virus, you need to specify the segment (ex: ", createVNode(_components.code, {
        children: "S"
      }), ", ", createVNode(_components.code, {
        children: "M"
      }), ", ", createVNode(_components.code, {
        children: "L"
      }), ") that you want after the main part of the URL in most queries."]
    }), "\n", createVNode(_components.h1, {
      id: "main-query-types-covered",
      children: "Main Query Types Covered"
    }), "\n", createVNode(_components.p, {
      children: ["As noted above, for full details on the range of requests that can be processed via the API, you should see the ", createVNode(_components.a, {
        href: "/api-documentation",
        children: "Swagger API documentation"
      }), ".\r\nThis page is intended as a starting page for a few simple requests that may be useful, but does not cover all functionality."]
    }), "\n", createVNode(_components.p, {
      children: "Here, we’ll focus on getting basic counts, metadata, and sequences from the API."
    }), "\n", createVNode(_components.h3, {
      id: "basic-counts",
      children: "Basic counts"
    }), "\n", createVNode(_components.p, {
      children: ["For ", createVNode(_components.strong, {
        children: "basic counts"
      }), " one can use the ", createVNode(_components.code, {
        children: "aggregated"
      }), " endpoint. Without any search terms, this will return the total number of sequences.\r\nCombined with a single accession, the resulting count will be one. Combined with search terms, it will return the number of sequences that meet the specified criteria."]
    }), "\n", createVNode(_components.p, {
      children: "Example of all Ebola-Zaire sequences from Uganda:"
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/aggregated?geoLocCountry=Uganda"
          })
        })
      })
    }), "\n", createVNode(_components.h3, {
      id: "metadata",
      children: "Metadata"
    }), "\n", createVNode(_components.p, {
      children: ["For ", createVNode(_components.strong, {
        children: "metadata"
      }), " one can use the ", createVNode(_components.code, {
        children: "details"
      }), " endpoint. Without any search terms, this will return all available metadata (", createVNode(_components.strong, {
        children: "Caution!"
      }), " this could be a very large file!).\r\nCombined with a single accession, it will return the metadata for that sample. Combined with search terms, it will return the metadata of all\r\nsequences that meet the specified criteria."]
    }), "\n", createVNode(_components.p, {
      children: "Note that data is returned in JSON format and will often need to be parsed before use."
    }), "\n", createVNode(_components.p, {
      children: "Example of all Ebola-Zaire sequences from the USA:"
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/details?geoLocCountry=USA"
          })
        })
      })
    }), "\n", createVNode(_components.h3, {
      id: "sequences",
      children: "Sequences"
    }), "\n", createVNode(_components.p, {
      children: ["For ", createVNode(_components.strong, {
        children: "sequences"
      }), " one can use either the ", createVNode(_components.code, {
        children: "unalignedNucleotideSequences"
      }), " or ", createVNode(_components.code, {
        children: "alignedNucleotideSequences"
      }), " endpoints, to return\r\nunaligned or aligned sequences, respectively. Without any search terms, this will return all available sequences (", createVNode(_components.strong, {
        children: "Caution!"
      }), " this could be a very large file!) (see ", createVNode(_components.a, {
        href: "#download-all-sequences-of-an-organism",
        children: "here"
      }), ").\r\nCombined with a single accession, it will return a single sequence. Combined with search terms, it will return all\r\nsequences that meet the specified criteria."]
    }), "\n", createVNode(_components.p, {
      children: "Example of all Ebola-Zaire sequences from the USA:"
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?geoLocCountry=USA"
          })
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "how-to-call-queries-via-api",
      children: "How to Call Queries via API"
    }), "\n", createVNode(_components.p, {
      children: ["As mentioned previously, here we use ", createVNode(_components.code, {
        children: "GET"
      }), " requests, but for more intense and comprehensive use, you may want to learn more about ", createVNode(_components.code, {
        children: "GET"
      }), " and ", createVNode(_components.code, {
        children: "POST"
      }), " requests, as well as the ", createVNode(_components.a, {
        href: "/api-documentation",
        children: "Swagger API"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Most of the examples given here can be tested out in the browser, if that’s easiest.\r\nFor simple and quick searches (especially counts), calling them via the browser may also be enough. However, for more routine calls, and also for metadata and sequences, you will very likely want\r\nto have the results of your query saved in a file."
    }), "\n", createVNode(_components.p, {
      children: ["The easiest way to do this is use the ", createVNode(_components.code, {
        children: "curl"
      }), " command in your terminal/command line (across all operating systems).\r\nFormat your command by putting ", createVNode(_components.code, {
        children: "curl"
      }), " first, then the URL you want to call in quotes, and then ", createVNode(_components.code, {
        children: "-o OUTPUTFILE"
      }), " where OUTPUTFILE is whatever file you’d like the results saved into."]
    }), "\n", createVNode(_components.p, {
      children: ["For ", createVNode(_components.code, {
        children: "aggregated"
      }), " and ", createVNode(_components.code, {
        children: "metadata"
      }), " it’s most sensible to save these as ", createVNode(_components.code, {
        children: ".json"
      }), " files (JSON format). For ", createVNode(_components.code, {
        children: "unalignedNucleotideSequences"
      }), " or ", createVNode(_components.code, {
        children: "alignedNucleotideSequences"
      }), " it makes sense to save these as ", createVNode(_components.code, {
        children: ".fasta"
      }), " files."]
    }), "\n", createVNode(_components.p, {
      children: ["Here’s an example of how one might download all Ebola Zaire sequences from Uganda into a ", createVNode(_components.code, {
        children: "fasta"
      }), " file:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "curl \"https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?geoLocCountry=Uganda\" -o uganda_ebola_zaire.fasta"
          })
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "download-all-sequences-of-an-organism",
      children: "Download All Sequences of an Organism"
    }), "\n", createVNode(_components.p, {
      children: ["To download all ", createVNode(_components.strong, {
        children: "unaligned"
      }), " sequences, use the URL:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/[ORG]/sample/unalignedNucleotideSequences"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["To download all ", createVNode(_components.strong, {
        children: "aligned"
      }), " sequences, use the URL:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/[ORG]/sample/alignedNucleotideSequences"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note that for CCHF"
      }), ", you need to specify the segment (", createVNode(_components.code, {
        children: "S"
      }), ", ", createVNode(_components.code, {
        children: "M"
      }), ", ", createVNode(_components.code, {
        children: "L"
      }), ") that you want after the main part of the URL:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/cchf/sample/alignedNucleotideSequences/L"
          })
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "download-specific-sequences-by-accession",
      children: "Download Specific Sequences by Accession"
    }), "\n", createVNode(_components.h2, {
      id: "with-the-website",
      children: "With the website"
    }), "\n", createVNode(_components.p, {
      children: ["The website provides a simple URL for downloading sequences by accession number: ", createVNode(_components.code, {
        children: "https://pathoplexus.org/seq/[PP_ACCESS].fa"
      }), " will provide the sequence in FASTA format. ", createVNode(_components.code, {
        children: "https://pathoplexus.org/seq/[PP_ACCESS].fa?download"
      }), " will trigger a download in the browser."]
    }), "\n", createVNode(_components.h2, {
      id: "with-the-lapis-api",
      children: "With the LAPIS API"
    }), "\n", createVNode(_components.p, {
      children: ["These search terms can also be used with the ", createVNode(_components.code, {
        children: "details"
      }), " endpoint to get metadata information."]
    }), "\n", createVNode(_components.p, {
      children: ["To download the latest version of a particular accession, use the accession number without the version ending (here ", createVNode(_components.code, {
        children: "[PP_ACCESS]"
      }), ").\r\nUse the URL format:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/[ORG]/sample/alignedNucleotideSequences?accession=[PP_ACCESS]"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["To download a specific version of a particular accession, use the accession number with the version ending, and use ", createVNode(_components.code, {
        children: "accessionVersion"
      }), " in the URL:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/[ORG]/sample/alignedNucleotideSequences?accessionVersion=[PP_ACCESS.1]"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note that for CCHF"
      }), ", you need to specify the segment (", createVNode(_components.code, {
        children: "S"
      }), ", ", createVNode(_components.code, {
        children: "M"
      }), ", ", createVNode(_components.code, {
        children: "L"
      }), ") that you want after the main part of the URL. For example:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/cchf/sample/alignedNucleotideSequences/L?accession=[PP_ACCESS]"
          })
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "download-sequences-by-search",
      children: "Download Sequences by Search"
    }), "\n", createVNode(_components.p, {
      children: ["You can also download alignments based on search criteria. You can search on any metadata field, and many combinations of metadata fields.\r\nFor full details, you should review the ", createVNode(_components.a, {
        href: "/api-documentation",
        children: "Swagger API documentation"
      }), ". However, some basic examples are given below:"]
    }), "\n", createVNode(_components.p, {
      children: "As previously, if searching CCHF, you will need to specify the segment that you want at the end of the main URL."
    }), "\n", createVNode(_components.p, {
      children: ["All of the examples below use Ebola Zaire and ask for aligned sequences, but modifying the URL will allow you to also ask for unaligned sequences and different organisms.\r\nYou can also use ", createVNode(_components.code, {
        children: "aggregated"
      }), " and ", createVNode(_components.code, {
        children: "details"
      }), " to get counts or metadata, respectively."]
    }), "\n", createVNode(_components.p, {
      children: "Examples:"
    }), "\n", createVNode(_components.p, {
      children: ["You can search by sample collection date exactly using ", createVNode(_components.code, {
        children: "sampleCollectionDate"
      }), ", or between two sample collection dates using ", createVNode(_components.code, {
        children: "sampleCollectionDateFrom"
      }), " and ", createVNode(_components.code, {
        children: "sampleCollectionDateTo"
      }), ", as shown in the search below for\r\nEbola Zaire samples in September 2020:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?sampleCollectionDateFrom=2020-09-01&sampleCollectionDateTo=2020-09-30"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["You can use ", createVNode(_components.code, {
        children: "geoLocCountry"
      }), " to search by country - here’s an example with the UK:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?geoLocCountry=United%20Kingdom"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["You can use ", createVNode(_components.code, {
        children: "length"
      }), ", ", createVNode(_components.code, {
        children: "lengthFrom"
      }), ", and ", createVNode(_components.code, {
        children: "lengthTo"
      }), " to search for sequences by length:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?lengthFrom=100&lengthTo=500"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["If searching CCHF, you need to specify the length per segment, using terms like ", createVNode(_components.code, {
        children: "length_L"
      }), ", ", createVNode(_components.code, {
        children: "length_LFrom"
      }), ", and ", createVNode(_components.code, {
        children: "length_LTo"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "You can also combine search terms together to make a search more specific:"
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/alignedNucleotideSequences?geoLocCountry=Uganda&geoLocCountry=United%20Kingdom&dataUseTerms=OPEN"
          })
        })
      })
    }), "\n", createVNode(_components.h1, {
      id: "searching-by-mutations-via-api",
      children: "Searching by Mutations via API"
    }), "\n", createVNode(_components.p, {
      children: ["You can search the API by specific nucleotide and amino-acid mutations as well as metadata.\r\nAs with with other search queries, these can be used with ", createVNode(_components.code, {
        children: "details"
      }), ", ", createVNode(_components.code, {
        children: "aggregated"
      }), ", ", createVNode(_components.code, {
        children: "alignedNucleotideSequences"
      }), " and ", createVNode(_components.code, {
        children: "unalignedNucleotideSequences"
      }), ", as well as\r\ncombined with other search queries."]
    }), "\n", createVNode(_components.p, {
      children: ["To specify nucleotide mutations, use ", createVNode(_components.code, {
        children: "nucleotideMutations"
      }), " as the query type. The format for searching nucleotide mutations is to specify the ‘from nucleotide’, ‘position’, and ‘to nucleotide’ as one string, like: ", createVNode(_components.code, {
        children: "C180T"
      }), ".\r\nYou can also leave out the ‘from nucleotide’ to find results for all sequences with the resulting ‘to nucleotide’, and can leave out the ‘to nucleotide’ to specify\r\nthat the query should return sequences with any mutation at the given position."]
    }), "\n", createVNode(_components.p, {
      children: ["An example searching for the count of sequences with nucleotide mutations from ", createVNode(_components.code, {
        children: "C"
      }), " to ", createVNode(_components.code, {
        children: "T"
      }), " at position 180:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/aggregated?nucleotideMutations=C180T"
          })
        })
      })
    }), "\n", createVNode(_components.p, {
      children: ["Specifying amino-acid mutations is similar, but requires also specifying the gene, and does not require the ‘from amino-acid’. (Though providing it is ok.)\r\nThe URL should use ", createVNode(_components.code, {
        children: "aminoAcidMutations"
      }), ".\r\nThe format is thus ‘gene’:‘position”to amino-acid’, such as ", createVNode(_components.code, {
        children: "GP:440G"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "As with the nucleotide mutations, you can also leave out the ‘to amino-acid’ to specify that the query should return sequences with any mutation at the given position in the gene."
    }), "\n", createVNode(_components.p, {
      children: ["An example searching for the count of sequences with amino-acid mutations to ", createVNode(_components.code, {
        children: "G"
      }), " in the ", createVNode(_components.code, {
        children: "GP"
      }), " gene at position 440:"]
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
        children: createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "https://lapis.pathoplexus.org/ebola-zaire/sample/aggregated?aminoAcidMutations=GP:440G"
          })
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

const url = "/docs/how-to/search-download-seqs-api";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/search-download-seqs-api.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/search-download-seqs-api.mdx";
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
