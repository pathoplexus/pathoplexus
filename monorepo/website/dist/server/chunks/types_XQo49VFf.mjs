import { z } from 'zod';
import { L as metadataPossibleTypes, M as customDisplay } from './config_CQtV1zSN.mjs';

const tableDataEntryTypeSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("metadata"), metadataType: metadataPossibleTypes }),
  z.object({ kind: z.literal("mutation") })
]);
const tableDataEntrySchema = z.object({
  label: z.string(),
  name: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
  header: z.string(),
  customDisplay: customDisplay.optional(),
  type: tableDataEntryTypeSchema,
  orderOnDetailsPage: z.number().optional()
});

export { tableDataEntrySchema as t };
