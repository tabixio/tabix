/*global describe, it, expect */
import { expandStructure } from 'reducers/app.js';
import R from 'ramda';

const structure = [
    {
        id: '0',
        isExpanded: true,
        childNodes: [
            {
                id: '0,0',
                isExpanded: false
            },
            {
                id: '0,1',
                isExpanded: true
            }
        ]
    }
];

describe.only('test reducers/app.js', () => {
    //write your test
    it.only('expand structure must expand/collapse array', () => {
        const mainExpand = expandStructure(structure, [0], false);

        expect(mainExpand).toEqual(
            expect.arrayContaining([
                {
                    id: '0',
                    isExpanded: false,
                    childNodes: [
                        {
                            id: '0,0',
                            isExpanded: false
                        },
                        {
                            id: '0,1',
                            isExpanded: true
                        }
                    ]
                }
            ])
        );

        const childExpand = expandStructure(structure, [0, 1], false);
        expect(childExpand).toEqual(
            expect.arrayContaining([
                {
                    id: '0',
                    isExpanded: true,
                    childNodes: [
                        {
                            id: '0,0',
                            isExpanded: false
                        },
                        {
                            id: '0,1',
                            isExpanded: false
                        }
                    ]
                }
            ])
        );
    });
});
