import styled from 'styled-components';
import { connect } from 'react-redux';
import { switchMode } from '../actions/login';
import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import Form, { validateServer, validateDirect } from 'Login/Form.jsx';
import SplitterLayout from 'react-splitter-layout';
import Connections from 'Login/Connections.jsx';
import { Wrapper } from 'Shared/styled';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > div,
    input {
        width: 300px;
    }
`;

function mapStateToProps(state) {
    return {
        mode: state.login.mode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSwitch: mode => mode |> switchMode |> dispatch
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Login extends Component {
    onSubmit = (dispatch, values) => {
        console.log(values);
    };

    render() {
        const { mode, onSwitch } = this.props;

        const formProps = {
            onSubmit: this.onSubmit
        };

        return (
            <SplitterLayout
                percentage
                primaryMinSize={12}
                secondaryInitialSize={80}
            >
                <Wrapper>
                    <Connections />
                </Wrapper>
                <Wrapper>
                    <Container key="form">
                        <Tabs
                            id="login"
                            selectedTabId={mode}
                            onChange={onSwitch}
                        >
                            <Tab
                                id="direct"
                                title="DIRECT CH"
                                panel={
                                    <Form
                                        {...formProps}
                                        mode="direct"
                                        form="directLogin"
                                        validate={validateDirect}
                                    />
                                }
                            />
                            <Tab
                                id="server"
                                title="TABIX.SERVER"
                                panel={
                                    <Form
                                        {...formProps}
                                        mode="server"
                                        form="serverLogin"
                                        validate={validateServer}
                                    />
                                }
                            />
                        </Tabs>
                    </Container>
                </Wrapper>
            </SplitterLayout>
        );
    }
}
