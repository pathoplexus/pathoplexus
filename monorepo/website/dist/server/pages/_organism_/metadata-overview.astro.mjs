import { c as cleanOrganism } from '../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { j as getSchema, a7 as SUBMISSION_ID_INPUT_FIELD } from '../../chunks/config_CQtV1zSN.mjs';
export { renderers } from '../../renderers.mjs';

const GET = ({ params }) => {
  const rawOrganism = params.organism;
  const { organism } = cleanOrganism(rawOrganism);
  if (organism === void 0) {
    return new Response(void 0, {
      status: 404
    });
  }
  const extraFields = [SUBMISSION_ID_INPUT_FIELD];
  const tableHeader = "Field Name	Required	Definition	Guidance	Example";
  const { inputFields } = getSchema(organism.key);
  const headers = {
    "Content-Type": "text/tsv"
    // eslint-disable-line @typescript-eslint/naming-convention
  };
  const filename = `${organism.displayName.replaceAll(" ", "_")}_metadata_overview.tsv`;
  headers["Content-Disposition"] = `attachment; filename="${filename}"`;
  const fieldNames = inputFields.map(
    (field) => `${field.name}	${field.required ?? ""}	${field.definition ?? ""} ${field.guidance ?? ""}	${field.example ?? ""}`
  );
  const tsvTemplate = [tableHeader, ...extraFields, ...fieldNames].join("\n");
  return new Response(tsvTemplate, {
    headers
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
