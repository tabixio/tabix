import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Classes, Card, Colors } from '@blueprintjs/core';
import { Fill } from 'Shared/styled';

const Content = styled.div`
    margin: 14px;
`;

const CardArea = styled.div`
    margin: 10px;
    cursor: pointer;
    ${props =>
        props.active &&
        css`
            font-weight: bold;
        `};
`;

const ButtonArea = Fill.extend`
    margin-top: 12px;
`;

export default ({ items, onNewConnection, onActivateConnection }) => (
    <Content>
        {items.map((x, ind) => (
            <CardArea
                key={ind}
                active={x.active}
                onClick={() => onActivateConnection(x.id)}
            >
                <Card elevation={x.active ? 0 : 3}>{x.name}</Card>
            </CardArea>
        ))}
        <ButtonArea>
            <Button
                icon="add"
                className={Classes.FILL}
                onClick={onNewConnection}
            >
                Add new
            </Button>
        </ButtonArea>
    </Content>
);
