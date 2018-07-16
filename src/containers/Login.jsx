import styled from 'styled-components';
import propsToComponent from 'libs/components/propsToComponent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getFormValues } from 'redux-form';
import {
    switchMode,
    updateConnection,
    newConnection,
    activateConnection,
    loginApp,
    deleteConnetion
} from '../actions/login';
import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import Form, { validateServer, validateDirect } from 'Login/Form.jsx';
import SplitterLayout from 'Service/SplitterLayout.jsx';
import Connections from 'Login/Connections.jsx';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 16px;
    & > div,
    input {
        width: 300px;
    }
`;

function mapStateToProps(state) {
    return {
        mode: state.login.mode,
        connections: state.login.connections || [],
        connectionSelect:
            state.login.connections.find(x => x.active) !== undefined,
        getValuesFrom: form => getFormValues(form)(state),
        fetching: state.login.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSwitch: mode => mode |> switchMode |> dispatch,
        onUpdateConnection: data => data |> updateConnection |> dispatch,
        onNewConnection: () => newConnection() |> dispatch,
        onActivateConnection: id => id |> activateConnection |> dispatch,
        onLogin: connection => connection |> loginApp |> dispatch,
        onDeleteConnection: id => id |> deleteConnetion |> dispatch,
        onChangeRoute: () => '/pages' |> push |> dispatch
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Login extends Component {
    componentDidMount() {
        const { connections, onActivateConnection } = this.props;

        const activeConnection = connections.find(x => x.active);
        activeConnection && onActivateConnection(activeConnection.id);
    }

    render() {
        const { mode, onSwitch, connectionSelect, fetching } = this.props;

        const formProps = {
            onSubmit: this.onSubmit,
            connectionSelect,
            fetching,
            onDelete: this.onDelete
        };

        return (
            <SplitterLayout>
                <Connections
                    {...propsToComponent(this.props, [
                        'connections',
                        'onNewConnection',
                        'onActivateConnection'
                    ])}
                />
                <Container>
                    <Tabs id="login" selectedTabId={mode} onChange={onSwitch}>
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
            </SplitterLayout>
        );
    }

    onSubmit = async values => {
        const { onUpdateConnection, onLogin, onChangeRoute } = this.props;
        onUpdateConnection(values);
        const result = await onLogin(values);
        result && onChangeRoute();
    };

    onDelete = () => {
        const { onDeleteConnection, getValuesFrom, mode } = this.props;
        const values = getValuesFrom(`${mode}Login`);
        onDeleteConnection(values.id);
    };
}
