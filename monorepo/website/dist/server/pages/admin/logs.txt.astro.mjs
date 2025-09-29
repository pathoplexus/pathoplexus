import { g as getInstanceLogger } from '../../chunks/logger_Dvk4x2et.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const logToAppend = await request.json();
  const message = logToAppend.message;
  if (message !== void 0) {
    switch (logToAppend.level) {
      case "info":
        getInstanceLogger(logToAppend.instance ?? "").info(message);
        break;
      default:
        getInstanceLogger(logToAppend.instance ?? "").error(message);
    }
  }
  return new Response(
    JSON.stringify({
      body: "ok"
    })
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
