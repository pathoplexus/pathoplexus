import { describe, expect, it } from 'vitest';

import { FieldFilterSet } from './SequenceFilters';
import { MetadataFilterSchema } from '../../../utils/search.ts';

describe('FieldFilterSet', () => {
    describe('toApiParams', () => {
        it('converts single string value to number for int type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'groupId', type: 'int' }]);
            const fieldValues = { groupId: '498' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.groupId).toBe(498);
            expect(typeof apiParams.groupId).toBe('number');
        });

        it('converts array of string values to array of numbers for int type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'groupId', type: 'int' }]);
            const fieldValues = { groupId: ['498', '562'] };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.groupId).toEqual([498, 562]);
            expect(typeof apiParams.groupId[0]).toBe('number');
            expect(typeof apiParams.groupId[1]).toBe('number');
        });

        it('converts single string value to number for float type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'temperature', type: 'float' }]);
            const fieldValues = { temperature: '37.5' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.temperature).toBe(37.5);
            expect(typeof apiParams.temperature).toBe('number');
        });

        it('converts array of string values to array of numbers for float type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'temperature', type: 'float' }]);
            const fieldValues = { temperature: ['37.5', '38.2'] };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.temperature).toEqual([37.5, 38.2]);
            expect(typeof apiParams.temperature[0]).toBe('number');
            expect(typeof apiParams.temperature[1]).toBe('number');
        });

        it('preserves null values in arrays for int type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'groupId', type: 'int' }]);
            const fieldValues = { groupId: ['498', null, '562'] };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.groupId).toEqual([498, null, 562]);
        });

        it('does not convert string type fields', () => {
            const schema = new MetadataFilterSchema([{ name: 'country', type: 'string' }]);
            const fieldValues = { country: 'USA' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.country).toBe('USA');
            expect(typeof apiParams.country).toBe('string');
        });

        it('handles numeric string values for int fields with number already as number', () => {
            const schema = new MetadataFilterSchema([{ name: 'age', type: 'int' }]);
            const fieldValues = { age: '25' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.age).toBe(25);
            expect(typeof apiParams.age).toBe('number');
        });

        it('handles mixed int and string fields', () => {
            const schema = new MetadataFilterSchema([
                { name: 'groupId', type: 'int' },
                { name: 'country', type: 'string' },
            ]);
            const fieldValues = { groupId: ['498', '562'], country: 'USA' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            expect(apiParams.groupId).toEqual([498, 562]);
            expect(apiParams.country).toBe('USA');
        });

        it('handles invalid numeric strings by keeping original value', () => {
            const schema = new MetadataFilterSchema([{ name: 'groupId', type: 'int' }]);
            const fieldValues = { groupId: 'not-a-number' };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            // Invalid values are kept as-is; LAPIS will return an error
            expect(apiParams.groupId).toBe('not-a-number');
        });

        it('handles array with invalid numeric strings by keeping original values', () => {
            const schema = new MetadataFilterSchema([{ name: 'groupId', type: 'int' }]);
            const fieldValues = { groupId: ['498', 'invalid', '562'] };
            const filter = new FieldFilterSet(
                schema,
                fieldValues,
                {},
                { nucleotideSegmentInfos: [], geneInfos: [], isMultiSegmented: false },
            );

            const apiParams = filter.toApiParams();

            // Valid numbers are converted, invalid kept as-is
            expect(apiParams.groupId).toEqual([498, 'invalid', 562]);
        });
    });
});
