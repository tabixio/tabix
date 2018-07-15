/*global describe, it, expect */
import { nodeId } from 'helpers/sql/toTreeStructure.js';

describe('test helpers/sql/toTreeStructure.js', () => {
    it('should make current id', () => {

        expect(nodeId(1)).toBe('0,1');
        expect(nodeId(1,2)).toBe('0,1,2');
        expect(nodeId(1,2,3)).toBe('0,1,2,3');

    });
});