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
  "title": "Report issues with sequences",
  "order": 62
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "to-report-sequence-issues",
    "text": "To report sequence issues"
  }, {
    "depth": 2,
    "slug": "submit-your-issue-and-assessment",
    "text": "Submit your issue and assessment"
  }, {
    "depth": 2,
    "slug": "how-issues-are-actioned",
    "text": "How issues are actioned"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "If you believe that a sequence or its metadata has a possible mistake or error, you can\npropose that the sequence or metadata is corrected.\nTo do this, you should prepare:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "A complete list of the sequences to be changed"
      }), "\n", createVNode(_components.li, {
        children: "Evidence for why there is an issue"
      }), "\n", createVNode(_components.li, {
        children: "Proposal for what should be changed to fix the issue"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Remember that you should be able to show some strong reasons\nfor why the current data is incorrect, such as phylogenies, links to articles, or other\ninformation or knowledge about the pathogen or sequences."
    }), "\n", createVNode(_components.h2, {
      id: "to-report-sequence-issues",
      children: "To report sequence issues"
    }), "\n", createVNode(_components.p, {
      children: ["Create a new issue in the GitHub repository ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/curation_reports",
        children: "‘Curation Reports’"
      }), ".\nIf you don’t have a GitHub account, you will need to create one in order to do this."]
    }), "\n", createVNode(_components.p, {
      children: ["To create an issue, use the button on the top-left in the above repository,\nor ", createVNode(_components.a, {
        href: "https://github.com/pathoplexus/curation_reports/issues/new/choose",
        children: "click here"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Follow each step in the issue template to provide as much information as possible:"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Describe the issue"
      }), ": Please detail why or how the sequences/metadata seem to be incorrect,\nand what issues this may cause."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Provide evidence"
      }), ": Post links or images showing analyses performed, such as phylogenies,\ntime-association, or similar, that highlights the issue, or links to articles, manuscripts, or other\nreputable sources that show why the information is likely not correct."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Suggest the change"
      }), ": Propose what should be done to fix the issue(s), in as much detail as possible.\nIf possible and appropriate, you can provide a table or file that shows the accession numbers and what the value in question should be changed to."]
    }), "\n", createVNode(_components.p, {
      children: "If the suspected error is potentially significantly misleading and no correction is possible, you can propose the sequence be revoked."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Full list of sequences affected"
      }), ": Please provide a ", createVNode(_components.em, {
        children: "full"
      }), " list of sequences that are impacted\nby this suspected issue, so that all can be corrected if appropriate.\nPlease only list sequences affected by this particular issue - if there is another problem with other sequences,\nplease create a new issue."]
    }), "\n", createVNode(_components.h2, {
      id: "submit-your-issue-and-assessment",
      children: "Submit your issue and assessment"
    }), "\n", createVNode(_components.p, {
      children: "After writing your issue, please submit it, and it will be publicly viewable."
    }), "\n", createVNode(_components.p, {
      children: "Issues will be considered by Pathoplexus Curators.\nTwo curators will need to agree that the issue is real, and that the solution you propose is correct, for the issue to be taken further.\nHowever, anyone can comment on and discuss the issue to debate whether the correction is appropriate or not."
    }), "\n", createVNode(_components.p, {
      children: "If it is deemed there’s not yet sufficient evidence but more information may come, Curators may leave the issue open for further discussion."
    }), "\n", createVNode(_components.p, {
      children: "However, if Curators determine there that the issue is not supported by sufficient evidence, or that there is unlikely to be enough evidence to support it in the near future, the issue may be closed."
    }), "\n", createVNode(_components.h2, {
      id: "how-issues-are-actioned",
      children: "How issues are actioned"
    }), "\n", createVNode(_components.p, {
      children: "If two Curators decide an issue should be corrected, how it is flagged and fixed will depend\non whether it was submitted directly or came from INSDC."
    }), "\n", createVNode(_components.p, {
      children: ["You can read about how Curators make these decisions in the ", createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "/docs/how-to/curator-sop",
          children: "Curator SOP"
        })
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

const url = "/docs/how-to/report-sequence-issues";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/report-sequence-issues.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/report-sequence-issues.mdx";
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
