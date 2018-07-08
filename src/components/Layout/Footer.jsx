import styled from 'styled-components';
import React from 'react';
import { Card } from '@blueprintjs/core';

const StyledFooter = styled.div`
    position: relative;
    bottom: 0;
    width: 100%;
    & > div {
        font-size: 10px;
        padding: 10px;
        text-align: center;
    }
`;

export default ({ children }) => (
    <StyledFooter>
        <Card>{children}</Card>
    </StyledFooter>
);
