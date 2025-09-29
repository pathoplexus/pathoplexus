import { a as getRuntimeConfig } from '../../../../chunks/config_CQtV1zSN.mjs';
import { p as parseAccessionVersionFromString } from '../../../../chunks/extractAccessionVersion_CIVou_Oi.mjs';
import { g as getAccessToken } from '../../../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  const runtimeConfig = getRuntimeConfig();
  const { accessionVersion, fileCategory, fileName } = params;
  const { accession, version } = parseAccessionVersionFromString(accessionVersion);
  const backendUrl = `${runtimeConfig.public.backendUrl}/files/get/${accession}/${version}/${encodeURIComponent(fileCategory)}/${encodeURIComponent(fileName)}`;
  const accessToken = getAccessToken(locals.session);
  const response = await fetch(backendUrl, {
    redirect: "manual",
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.status === 307 || response.status === 302) {
    const s3Url = response.headers.get("Location");
    if (!s3Url) {
      return new Response("Backend redirect missing Location header", { status: 500 });
    }
    return new Response(null, {
      status: response.status,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { Location: s3Url }
    });
  } else if (response.ok) {
    return new Response(response.body, { status: response.status });
  } else {
    return new Response(response.body, { status: response.status });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
