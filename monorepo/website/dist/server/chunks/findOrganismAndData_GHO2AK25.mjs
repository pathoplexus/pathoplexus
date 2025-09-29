import { ok, err } from 'neverthrow';
import { g as getSequenceDetailsTableData, S as SequenceDetailsTableResultType } from './getSequenceDetailsTableData_D8N3JjGW.mjs';
import { g as getConfiguredOrganisms } from './config_CQtV1zSN.mjs';

async function findOrganismAndData(accessionVersion) {
  const organisms = getConfiguredOrganisms();
  const promises = organisms.map(
    ({ key }) => getSequenceDetailsTableData(accessionVersion, key).then(
      (result) => result.isOk() ? ok({ organism: key, result: result.value }) : Promise.reject(new Error(result.error.detail))
    )
  );
  try {
    const firstSuccess = await Promise.any(promises);
    return firstSuccess;
  } catch (_) {
    return err({ type: SequenceDetailsTableResultType.ERROR });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    findOrganismAndData
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, findOrganismAndData as f };
