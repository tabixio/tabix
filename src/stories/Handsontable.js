import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from './components/Story.jsx';
import HotTable from '../components/Handsontable/HotTable.jsx';

import HandsontableMD from './Handsontable.md';
import { compose, withState, withHandlers } from 'recompose';
// import styled from 'styled-components';
const R = require('ramda');

// const connectionsHOC = compose(
//     withState('items', 'change', [
//         {
//             id: 1,
//             name: 'first connection',
//             active: true
//         },
//         {
//             id: 2,
//             name: 'second connection'
//         }
//     ]),
//     withHandlers({
//         QueryData: () =>  {
//             // load data
//             async connect()
//             {
//                 let connection={host:'http://tabix.dev7:8123/',login:'default',password:''};
//                 let a=new API(connection);
//                 return await a.fetch('select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100');
//             }
//         }
//     })
// );
// load data
async connect()
{
    let connection={host:'http://tabix.dev7:8123/',login:'default',password:''};
    let a=new API(connection);
    return await a.fetch('select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100');
}

const Component = (
    <HotTable dark='true' data={QueryData} width='100%' height='100%' />
);


storiesOf('Handsontable', module).add('Table', () => (
    <Story api={HandsontableMD}>
           <Component/>
    </Story>
));
