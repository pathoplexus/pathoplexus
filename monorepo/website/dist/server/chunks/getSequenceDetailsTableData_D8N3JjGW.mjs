import { Result, err } from 'neverthrow';
import { sentenceCase } from 'change-case';
import './parseFasta_DBChogMZ.mjs';
import '@zodios/core';
import 'winston';
import { K as parseUnixTimestamp, j as getSchema } from './config_CQtV1zSN.mjs';
import './types_XQo49VFf.mjs';
import { r as routes } from './routes_BftQyUXo.mjs';
import { c as createBackendClient } from './backendClientFactory_DhWS0NBG.mjs';
import { L as LapisClient } from './lapisClient_DGgBUH0Y.mjs';
import { p as parseAccessionVersionFromString } from './extractAccessionVersion_CIVou_Oi.mjs';

async function getTableData(accessionVersion, schema, lapisClient) {
  return Promise.all([
    lapisClient.getSequenceEntryVersionDetails(accessionVersion),
    lapisClient.getSequenceMutations(accessionVersion, "nucleotide"),
    lapisClient.getSequenceMutations(accessionVersion, "aminoAcid"),
    lapisClient.getSequenceInsertions(accessionVersion, "nucleotide"),
    lapisClient.getSequenceInsertions(accessionVersion, "aminoAcid")
  ]).then((results) => Result.combine(results)).then(validateDetailsAreNotEmpty(accessionVersion)).then(
    (result) => result.map(
      ([
        details,
        nucleotideMutations,
        aminoAcidMutations,
        nucleotideInsertions,
        aminoAcidInsertions
      ]) => ({
        details: details.data[0],
        nucleotideMutations: nucleotideMutations.data,
        aminoAcidMutations: aminoAcidMutations.data,
        nucleotideInsertions: nucleotideInsertions.data,
        aminoAcidInsertions: aminoAcidInsertions.data
      })
    ).map((data) => ({
      data: toTableData(schema)(data),
      isRevocation: isRevocationEntry(data.details)
    }))
  );
}
function isRevocationEntry(details) {
  return details.isRevocation === true;
}
function validateDetailsAreNotEmpty(accessionVersion) {
  return (result) => {
    if (result.isOk()) {
      const detailsResult = result.value[0];
      if (detailsResult.data.length === 0) {
        return err({
          type: "about:blank",
          title: "Not Found",
          status: 0,
          detail: "No data found for accession version " + accessionVersion,
          instance: "/seq/" + accessionVersion
        });
      }
    }
    return result;
  };
}
function mutationDetails(nucleotideMutations, aminoAcidMutations, nucleotideInsertions, aminoAcidInsertions) {
  const data = [
    {
      label: "Substitutions",
      name: "nucleotideSubstitutions",
      value: "",
      header: "Nucleotide mutations",
      customDisplay: { type: "badge", value: substitutionsMap(nucleotideMutations) },
      type: { kind: "mutation" }
    },
    {
      label: "Deletions",
      name: "nucleotideDeletions",
      value: deletionsToCommaSeparatedString(nucleotideMutations),
      header: "Nucleotide mutations",
      type: { kind: "mutation" }
    },
    {
      label: "Insertions",
      name: "nucleotideInsertions",
      value: insertionsToCommaSeparatedString(nucleotideInsertions),
      header: "Nucleotide mutations",
      type: { kind: "mutation" }
    },
    {
      label: "Substitutions",
      name: "aminoAcidSubstitutions",
      value: "",
      header: "Amino acid mutations",
      customDisplay: { type: "badge", value: substitutionsMap(aminoAcidMutations) },
      type: { kind: "mutation" }
    },
    {
      label: "Deletions",
      name: "aminoAcidDeletions",
      value: deletionsToCommaSeparatedString(aminoAcidMutations),
      header: "Amino acid mutations",
      type: { kind: "mutation" }
    },
    {
      label: "Insertions",
      name: "aminoAcidInsertions",
      value: insertionsToCommaSeparatedString(aminoAcidInsertions),
      header: "Amino acid mutations",
      type: { kind: "mutation" }
    }
  ];
  return data;
}
function toTableData(config) {
  return ({
    details,
    nucleotideMutations,
    aminoAcidMutations,
    nucleotideInsertions,
    aminoAcidInsertions
  }) => {
    const data = config.metadata.filter((metadata) => metadata.hideOnSequenceDetailsPage !== true).filter((metadata) => details[metadata.name] !== null && metadata.name in details).map((metadata) => ({
      label: metadata.displayName ?? sentenceCase(metadata.name),
      name: metadata.name,
      customDisplay: metadata.customDisplay,
      value: mapValueToDisplayedValue(details[metadata.name], metadata),
      header: metadata.header ?? "",
      type: { kind: "metadata", metadataType: metadata.type },
      orderOnDetailsPage: metadata.orderOnDetailsPage
    }));
    if (config.submissionDataTypes.consensusSequences) {
      const mutations = mutationDetails(
        nucleotideMutations,
        aminoAcidMutations,
        nucleotideInsertions,
        aminoAcidInsertions
      );
      data.push(...mutations);
    }
    return data;
  };
}
function mapValueToDisplayedValue(value, metadata) {
  if (value === null || value === void 0) {
    return "N/A";
  }
  if (metadata.type === "timestamp" && typeof value === "number") {
    return parseUnixTimestamp(value);
  }
  return value;
}
function substitutionsMap(mutationData) {
  const result = [];
  const substitutionData = mutationData.filter((m) => m.mutationTo !== "-");
  const segmentMutationsMap = /* @__PURE__ */ new Map();
  for (const entry of substitutionData) {
    let sequenceName = "";
    if (entry.sequenceName !== null) {
      sequenceName = entry.sequenceName;
    }
    if (!segmentMutationsMap.has(sequenceName)) {
      segmentMutationsMap.set(sequenceName, []);
    }
    segmentMutationsMap.get(sequenceName).push(entry);
  }
  for (const [segment, mutations] of segmentMutationsMap.entries()) {
    result.push({ segment, mutations });
  }
  return result;
}
function deletionsToCommaSeparatedString(mutationData) {
  const segmentPositions = /* @__PURE__ */ new Map();
  mutationData.filter((m) => m.mutationTo === "-").forEach((m) => {
    const segment = m.sequenceName;
    const position = m.position;
    if (!segmentPositions.has(segment)) {
      segmentPositions.set(segment, []);
    }
    segmentPositions.get(segment).push(position);
  });
  const segmentRanges = [...segmentPositions.entries()].map(([segment, positions]) => {
    const sortedPositions = positions.sort((a, b) => a - b);
    const ranges = [];
    let rangeStart = null;
    for (let i = 0; i < sortedPositions.length; i++) {
      const current = sortedPositions[i];
      const next = sortedPositions[i + 1];
      rangeStart ??= current;
      if (next === void 0 || next !== current + 1) {
        if (current - rangeStart >= 2) {
          ranges.push(`${rangeStart}-${current}`);
        } else {
          ranges.push(rangeStart.toString());
          if (current !== rangeStart) {
            ranges.push(current.toString());
          }
        }
        rangeStart = null;
      }
    }
    return { segment, ranges };
  });
  segmentRanges.sort((a, b) => {
    const safeA = a.segment ?? "";
    const safeB = b.segment ?? "";
    if (safeA <= safeB) {
      return -1;
    } else {
      return 1;
    }
  });
  return segmentRanges.map(({ segment, ranges }) => ranges.map((range) => `${segment !== null ? segment + ":" : ""}${range}`)).flat().join(", ");
}
function insertionsToCommaSeparatedString(insertionData) {
  return insertionData.map((m) => m.insertion).join(", ");
}

var SequenceDetailsTableResultType = /* @__PURE__ */ ((SequenceDetailsTableResultType2) => {
  SequenceDetailsTableResultType2["TABLE_DATA"] = "tableData";
  SequenceDetailsTableResultType2["REDIRECT"] = "redirect";
  SequenceDetailsTableResultType2["ERROR"] = "error";
  return SequenceDetailsTableResultType2;
})(SequenceDetailsTableResultType || {});
const getSequenceDetailsTableData = async (accessionVersion, organism) => {
  const { accession, version } = parseAccessionVersionFromString(accessionVersion);
  const lapisClient = LapisClient.createForOrganism(organism);
  const backendClient = createBackendClient();
  if (version === void 0) {
    const latestVersionResult = await lapisClient.getLatestAccessionVersion(accession);
    return latestVersionResult.map((latestVersion) => ({
      type: "redirect" /* REDIRECT */,
      redirectUrl: routes.sequenceEntryDetailsPage(latestVersion)
    }));
  }
  const schema = getSchema(organism);
  const [tableDataResult, sequenceEntryHistoryResult, dataUseHistoryResult] = await Promise.all([
    getTableData(accessionVersion, schema, lapisClient),
    lapisClient.getAllSequenceEntryHistoryForAccession(accession),
    backendClient.getDataUseTermsHistory(accession)
  ]);
  return Result.combine([tableDataResult, sequenceEntryHistoryResult, dataUseHistoryResult]).map(
    ([tableData, sequenceEntryHistory, dataUseTermsHistory]) => ({
      type: "tableData" /* TABLE_DATA */,
      tableData: tableData.data,
      sequenceEntryHistory,
      dataUseTermsHistory,
      isRevocation: tableData.isRevocation
    })
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    SequenceDetailsTableResultType,
    getSequenceDetailsTableData
}, Symbol.toStringTag, { value: 'Module' }));

export { SequenceDetailsTableResultType as S, _page as _, getSequenceDetailsTableData as g };
