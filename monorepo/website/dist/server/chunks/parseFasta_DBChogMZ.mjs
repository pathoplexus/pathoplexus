import { makeEndpoint, makeApi } from '@zodios/core';
import z from 'zod';
import { x as detailsResponse, y as lapisBaseRequest, z as aggregatedResponse, B as mutationsResponse, C as mutationsRequest, D as insertionsResponse, E as sequenceRequest, H as lineageDefinition } from './config_CQtV1zSN.mjs';

function withSample(path) {
  return `/sample${path}`;
}
const detailsEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/details"),
  alias: "details",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: lapisBaseRequest
    }
  ],
  response: detailsResponse
});
const aggregatedEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/aggregated"),
  alias: "aggregated",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: lapisBaseRequest
    }
  ],
  response: aggregatedResponse
});
const nucleotideMutationsEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/nucleotideMutations"),
  alias: "nucleotideMutations",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: mutationsRequest
    }
  ],
  response: mutationsResponse
});
const aminoAcidMutationsEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/aminoAcidMutations"),
  alias: "aminoAcidMutations",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: mutationsRequest
    }
  ],
  response: mutationsResponse
});
const nucleotideInsertionsEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/nucleotideInsertions"),
  alias: "nucleotideInsertions",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: lapisBaseRequest
    }
  ],
  response: insertionsResponse
});
const aminoAcidInsertionsEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/aminoAcidInsertions"),
  alias: "aminoAcidInsertions",
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: lapisBaseRequest
    }
  ],
  response: insertionsResponse
});
const alignedNucleotideSequencesEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/alignedNucleotideSequences"),
  alias: "alignedNucleotideSequences",
  immutable: true,
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: sequenceRequest
    }
  ],
  response: z.string()
});
const alignedNucleotideSequencesMultiSegmentEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/alignedNucleotideSequences/:segment"),
  alias: "alignedNucleotideSequencesMultiSegment",
  immutable: true,
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: sequenceRequest
    }
  ],
  response: z.string()
});
const unalignedNucleotideSequencesMultiSegmentEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/unalignedNucleotideSequences/:segment"),
  alias: "unalignedNucleotideSequencesMultiSegment",
  immutable: true,
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: sequenceRequest
    }
  ],
  response: z.string()
});
const unalignedNucleotideSequencesEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/unalignedNucleotideSequences"),
  alias: "unalignedNucleotideSequences",
  immutable: true,
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: sequenceRequest
    }
  ],
  response: z.string()
});
const alignedAminoAcidSequencesEndpoint = makeEndpoint({
  method: "post",
  path: withSample("/alignedAminoAcidSequences/:gene"),
  alias: "alignedAminoAcidSequences",
  immutable: true,
  parameters: [
    {
      name: "request",
      type: "Body",
      schema: sequenceRequest
    }
  ],
  response: z.string()
});
const lineageDefinitionEndpoint = makeEndpoint({
  method: "get",
  path: withSample("/lineageDefinition/:column"),
  alias: "lineageDefinition",
  immutable: true,
  response: lineageDefinition
});
const lapisApi = makeApi([
  detailsEndpoint,
  aggregatedEndpoint,
  nucleotideMutationsEndpoint,
  aminoAcidMutationsEndpoint,
  nucleotideInsertionsEndpoint,
  aminoAcidInsertionsEndpoint,
  alignedNucleotideSequencesEndpoint,
  alignedNucleotideSequencesMultiSegmentEndpoint,
  unalignedNucleotideSequencesEndpoint,
  unalignedNucleotideSequencesMultiSegmentEndpoint,
  alignedAminoAcidSequencesEndpoint,
  lineageDefinitionEndpoint
]);

function parseFasta(fasta) {
  if (fasta === "") {
    return [];
  }
  const fastaEntries2 = [];
  let currentEntry = null;
  const lines = fasta.split("\n");
  for (const line of lines) {
    if (line.startsWith(">")) {
      const name = line.slice(1).trim();
      currentEntry = { name, sequence: "" };
      fastaEntries2.push(currentEntry);
    } else {
      const sequence = line.trim();
      if (currentEntry) {
        currentEntry.sequence += sequence;
      } else {
        throw new Error("Fasta parsing error: encountered a sequence line without a preceding name line");
      }
    }
  }
  return fastaEntries2;
}
const fastaEntryToString = (fastaEntries2) => fastaEntries2.map((entry) => `>${entry.name}
${entry.sequence}
`).join("\n");
const fastaEntries = z.string().transform(parseFasta);

export { fastaEntries as a, fastaEntryToString as f, lapisApi as l, parseFasta as p };
