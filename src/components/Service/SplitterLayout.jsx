import React from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import Scrollbar from './Scrollbar.jsx';

const scrollbarConfig = {
    top: '53px',
    bottom: '35px'
};

const SplitterContent = styled.div`
    & > div {
        & > div:first-child, & > div:last-child {
            overflow: hidden;
        }
    }
`;

export default ({ children }) => (
    <SplitterContent>
        <SplitterLayout
            percentage
            primaryMinSize={12}
            secondaryInitialSize={80}
        >
            <Scrollbar {...scrollbarConfig}>{children[0]}</Scrollbar>
            <Scrollbar {...scrollbarConfig} toRight>
                {children[1]}
            </Scrollbar>
        </SplitterLayout>
    </SplitterContent>
);
