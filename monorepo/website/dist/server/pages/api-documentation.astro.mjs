/* empty css                                 */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, ah as addAttribute } from '../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { a as authenticationApiDocsUrl } from '../chunks/authenticationApiDocsUrl_2zO3aU6Z.mjs';
import { a as getRuntimeConfig, b as getWebsiteConfig, f as dataUseTermsAreEnabled } from '../chunks/config_CQtV1zSN.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C5Fsgcd-.mjs';
import { r as routes } from '../chunks/routes_BftQyUXo.mjs';
import { a as getAuthBaseUrl } from '../chunks/getAuthUrl_CP-cK5RK.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const clientConfig = getRuntimeConfig().public;
  const keycloakUrl = getAuthBaseUrl();
  const websiteConfig = getWebsiteConfig();
  const organismKeys = Object.keys(websiteConfig.organisms);
  const organismToDisplayName = Object.fromEntries(
    organismKeys.map((organism) => {
      return [organism, websiteConfig.organisms[organism].schema.organismName];
    })
  );
  const BUTTON_CLASS = "inline-block px-6 py-3 bg-primary-400 text-white font-semibold rounded-lg shadow-md hover:bg-primary-500  mr-2 hover:no-underline";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "API documentation" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto p-8"> <h1 class="title">API documentation</h1> <div class="mb-10"> <p class="mt-4 mb-4">
There is a
<a href="https://swagger.io/tools/swagger-ui/" class="underline text-primary-900 hover:text-primary-800 hover:no-underline">
Swagger UI
</a>
for documentation and direct interaction with the APIs. For more tips on how to use the API, it is recommended
                to start with the
<a${addAttribute(authenticationApiDocsUrl, "href")} class="underline text-primary-900 hover:text-primary-800 hover:no-underline">
API Authentication documentation.
</a> </p> <p class="mt-4 mb-4">
WARNING: Swagger incorrectly displays NDJSON examples in JSON format. For endpoints that require NDJSON
                as input you must convert the JSON examples to NDJSON (e.g. by removing new lines) prior to testing.
</p> ${dataUseTermsAreEnabled() && renderTemplate`<p class="mt-4 mb-4">
By using our API you agree to our
<a${addAttribute(routes.datauseTermsPage(), "href")} class="underline text-primary-900 hover:text-primary-800 hover:no-underline">
Data use terms
</a>
.
</p>`} </div> <div class="mb-10"> <h2 class="text-xl font-semibold text-primary-400 mb-4">Backend server</h2> <div class="mb-4">
Please note that Loculus is under continuous development and the endpoints are subject to change.
</div> <a${addAttribute(BUTTON_CLASS, "class")}${addAttribute(clientConfig.backendUrl + "/swagger-ui/index.html", "href")}>
View backend API documentation
</a> <div class="mt-8"> <span class="font-medium">URL of backend server:</span> <code>${clientConfig.backendUrl}</code> </div> </div> <div class="mb-10"> <h2 class="text-xl font-semibold text-primary-400 mb-4">LAPIS query engines</h2> <div class="space-y-4"> ${Object.entries(clientConfig.lapisUrls).map(([organism, url]) => renderTemplate`<a${addAttribute(BUTTON_CLASS, "class")}${addAttribute(url + "/swagger-ui/index.html", "href")}> ${organismToDisplayName[organism]} LAPIS API documentation
</a>`)} </div> <div class="mt-8"> <span class="font-medium">URLs of LAPIS query engines:</span> <ul class="list-disc ml-6"> ${Object.entries(clientConfig.lapisUrls).map(([organism, url]) => renderTemplate`<li> ${organismToDisplayName[organism]}: <code>${url}</code> </li>`)} </ul> </div> </div> <div> <h2 class="text-xl font-semibold text-primary-400 mb-4">Keycloak server</h2> <div>
We use the open source software <a href="https://www.keycloak.org/">Keycloak</a> for authentication.
</div> <div class="mt-2"> <span class="font-medium">URL of Keycloak server:</span> <code>${keycloakUrl}</code> </div> </div> </div> ` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/api-documentation/index.astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/api-documentation/index.astro";
const $$url = "/api-documentation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
