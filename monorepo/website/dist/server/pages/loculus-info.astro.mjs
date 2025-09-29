import { a as getRuntimeConfig, b as getWebsiteConfig } from '../chunks/config_CQtV1zSN.mjs';
import { a as getAuthBaseUrl } from '../chunks/getAuthUrl_CP-cK5RK.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({ request }) => {
  const runtime = getRuntimeConfig();
  const website = getWebsiteConfig();
  const keycloakUrl = await getAuthBaseUrl();
  const response = {
    hosts: {
      backend: runtime.public.backendUrl,
      lapis: runtime.public.lapisUrls,
      keycloak: keycloakUrl,
      website: new URL(request.url).origin
    },
    minCliVersion: "0.0.0",
    title: website.name,
    organisms: website.organisms
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json"
      // eslint-disable-line @typescript-eslint/naming-convention
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
