/* empty css                         */
import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BcdccBRb.mjs';
import { $ as $$DocLayout } from './DocLayout_CrVrwZSR.mjs';
import { $ as $$InfoBox } from './InfoBox_IxH1oVvV.mjs';
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
  "title": "Authenticating via API",
  "order": 60
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "send-request-with-curl",
    "text": "Send request with cURL"
  }, {
    "depth": 2,
    "slug": "retrieve-token-from-browser",
    "text": "Retrieve token from browser"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Some of our endpoints require authentication in order to use them. In order to use these endpoints you need to get a JSON web token. You can obtain the token either by sending a request to our Keycloak authentication server or by retrieving the corresponding cookie from the browser."
    }), "\n", createVNode(_components.p, {
      children: "The retrieved token expires after 10 hours."
    }), "\n", createVNode(_components.h2, {
      id: "send-request-with-curl",
      children: "Send request with cURL"
    }), "\n", createVNode($$InfoBox, {
      children: createVNode(_components.p, {
        children: ["To use the ", createVNode(_components.a, {
          href: "https://demo.pathoplexus.org",
          children: "demo instance"
        }), " instead of the main instance, please replace ", createVNode(_components.code, {
          children: "authentication.pathoplexus.org"
        }), " with ", createVNode(_components.code, {
          children: "authentication-demo.pathoplexus.org"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The following script demonstrates how you can retrieve a token with a POST request using cURL. It only works if you use a simple username-password authentication. If you only use ORCiD for authentication and do not have a password, you need to add a password (see how to ", createVNode(_components.a, {
        href: "/docs/how-to/edit-account",
        children: "edit your account"
      }), "). This solution also does not work if you activated two-factor authentication. In these cases, you can retrieve a token from the browser (see section below)."]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "bash",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "KEYCLOAK_TOKEN_URL"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"https://authentication.pathoplexus.org/realms/loculus/protocol/openid-connect/token\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "KEYCLOAK_CLIENT_ID"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"backend-client\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "USERNAME_LOCULUS"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"MY_USERNAME_HERE\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "PASSWORD_LOCULUS"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"MY_PASSWORD_HERE\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "jwt_keycloak"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$("
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "curl"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " -X"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " POST"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$KEYCLOAK_TOKEN_URL"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " --fail-with-body"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " -H"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " 'Content-Type: application/x-www-form-urlencoded'"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " -d"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " \"username="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$USERNAME_LOCULUS"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "&password="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$PASSWORD_LOCULUS"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "&grant_type=password&client_id="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$KEYCLOAK_CLIENT_ID"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "jwt"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$("
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "echo"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$jwt_keycloak"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: " |"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " jq"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " -r"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " '.access_token'"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "echo"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "$jwt"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\""
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "retrieve-token-from-browser",
      children: "Retrieve token from browser"
    }), "\n", createVNode(_components.p, {
      children: ["After you have logged in on ", createVNode(_components.a, {
        href: "https://pathoplexus.org",
        children: "pathoplexus.org"
      }), " (or ", createVNode(_components.a, {
        href: "https://demo.pathoplexus.org",
        children: "demo.pathoplexus.org"
      }), " for the demo instance), an access token is stored in your browser as a cookie. The token is called ", createVNode(_components.code, {
        children: "access_token"
      }), " and you can manually retrieve it from the browser. Instructions on how to do it can be found in the documentation of the browsers: ", createVNode(_components.a, {
        href: "https://developer.chrome.com/docs/devtools/application/cookies",
        children: "Google Chrome"
      }), ", ", createVNode(_components.a, {
        href: "https://firefox-source-docs.mozilla.org/devtools-user/storage_inspector/index.html",
        children: "Firefox"
      }), " and ", createVNode(_components.a, {
        href: "https://www.cookieserve.com/knowledge-base/website-cookies/how-do-i-check-cookies-in-safari/",
        children: "Safari"
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

const url = "/docs/how-to/authentication-api";
const file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/authentication-api.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/docs/how-to/authentication-api.mdx";
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
