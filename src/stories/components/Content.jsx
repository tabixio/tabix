import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    padding: 16px;
    h3 {
        color: #313131;
        margin-bottom: 16px;
    }
`;

export default ({ title, children, ...props }) => (
    <Content {...props}>
        <h3>{title}</h3>
        {children}
    </Content>
);