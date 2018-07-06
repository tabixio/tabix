import React from 'react';
import styled from 'styled-components';
import { Button, Classes } from '@blueprintjs/core';
import { Fill } from 'Shared/styled';

const Content = styled.div`
    margin: 14px;
`;

export default () => (
    <Content>
        <Fill>
            <Button icon="add" className={Classes.FILL}>
                Add new
            </Button>
        </Fill>
    </Content>
);
