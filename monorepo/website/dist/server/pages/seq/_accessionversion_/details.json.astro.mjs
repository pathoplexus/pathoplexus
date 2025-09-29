import { f as findOrganismAndData } from '../../../chunks/findOrganismAndData_GHO2AK25.mjs';
import { S as SequenceDetailsTableResultType } from '../../../chunks/getSequenceDetailsTableData_D8N3JjGW.mjs';
import { a as getRuntimeConfig, j as getSchema } from '../../../chunks/config_CQtV1zSN.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async (req) => {
  const params = req.params;
  const { accessionVersion } = params;
  const sequenceDetailsTableData = await findOrganismAndData(accessionVersion);
  if (sequenceDetailsTableData.isErr()) {
    return new Response(`Error detected`, {
      status: 404
    });
  }
  const { organism, result } = sequenceDetailsTableData.value;
  if (result.type !== SequenceDetailsTableResultType.TABLE_DATA) {
    return new Response(`Error detected - could not find table data`, {
      status: 404
    });
  }
  const clientConfig = getRuntimeConfig().public;
  const schema = getSchema(organism);
  const detailsDataUIProps = {
    tableData: result.tableData,
    organism,
    accessionVersion,
    dataUseTermsHistory: result.dataUseTermsHistory,
    schema,
    clientConfig,
    isRevocation: result.isRevocation,
    sequenceEntryHistory: result.sequenceEntryHistory
  };
  return new Response(JSON.stringify(detailsDataUIProps), {
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-line @typescript-eslint/naming-convention
      "Access-Control-Allow-Origin": "*"
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
