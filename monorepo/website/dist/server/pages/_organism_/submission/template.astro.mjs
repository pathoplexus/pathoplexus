import * as XLSX from '@lokalise/xlsx';
import { c as cleanOrganism } from '../../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { ai as getMetadataTemplateFields } from '../../../chunks/config_CQtV1zSN.mjs';
export { renderers } from '../../../renderers.mjs';

const VALID_FILE_TYPES = ["tsv", "xlsx"];
const CONTENT_TYPES = /* @__PURE__ */ new Map([
  ["tsv", "text/tab-separated-values"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
]);
const GET = ({ params, request }) => {
  const rawOrganism = params.organism;
  const { organism } = cleanOrganism(rawOrganism);
  if (organism === void 0) {
    return new Response(void 0, {
      status: 404
    });
  }
  const searchParams = new URL(request.url).searchParams;
  const action = searchParams.get("format") === "revise" ? "revise" : "submit";
  const fileTypeStr = searchParams.get("fileType")?.toLowerCase() ?? "";
  const fileType = VALID_FILE_TYPES.includes(fileTypeStr) ? fileTypeStr : "tsv";
  const filename = `${organism.displayName.replaceAll(" ", "_")}_metadata_${action === "revise" ? "revision_" : ""}template.${fileType}`;
  const headers = {
    "Content-Type": CONTENT_TYPES.get(fileType),
    "Content-Disposition": `attachment; filename="${filename}"`
  };
  const columnNames = Array.from(getMetadataTemplateFields(organism.key, action).keys());
  const fileBuffer = createTemplateFile(fileType, columnNames);
  return new Response(fileBuffer, {
    headers
  });
};
function createTemplateFile(fileType, columnNames) {
  if (fileType === "tsv") {
    const content = columnNames.join("	") + "\n";
    return new TextEncoder().encode(content).buffer;
  }
  const worksheetData = [columnNames];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  const buffer = XLSX.write(workbook, { type: "array", bookType: fileType });
  return new Uint8Array(buffer).buffer;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
