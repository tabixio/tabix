import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from './components/Story.jsx';
import Connections from '../components/Login/Connections.jsx';
import exampleMD from './example.md';
import { compose, withState, withHandlers } from 'recompose';
import styled from 'styled-components';
import * as R from 'ramda';

const connectionsHOC = compose(
    withState('items', 'change', [
        {
            id: 1,
            name: 'first connection',
            active: true
        },
        {
            id: 2,
            name: 'second connection'
        }
    ]),
    withHandlers({
        onActivateConnection: ({ items, change }) => id => {
            return (
                items |> R.map(x => R.assoc('active', x.id === id, x)) |> change
            );
        }
    })
);

const Component = connectionsHOC(({ items, onActivateConnection }) => (
    <Connections
        items={items}
        onNewConnection={f => f}
        onActivateConnection={onActivateConnection}
    />
));

const Wrapper = styled.div`
    width: 300px;
    padding: 16px;
`;

storiesOf('Example', module).add('example component', () => (
    <Story api={exampleMD}>
        <Wrapper>
            <Component />
        </Wrapper>
    </Story>
));
