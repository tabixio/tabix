/*global describe, it, expect */
import classname from 'libs/components/classname.js';

describe('test libs/components/classname.js', () => {
    it('should have current keys in key classname', () => {
        const obj = {
            key1: true,
            key2: false
        };
        const result1 = classname(obj);
        const result2 = classname(obj, 'key0');

        expect(result1).toHaveProperty('className', 'key1');
        expect(result1).not.toHaveProperty('classname', 'key2');
        expect(result2).toHaveProperty('className', 'key0 key1');
    });
});
