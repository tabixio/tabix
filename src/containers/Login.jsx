import lsConst from '../constants/localStorage';
import { saveInStorage } from '../helpers/storage';
import styled from 'styled-components';
import propsToComponent from 'libs/components/propsToComponent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getFormValues, initialize, reset } from 'redux-form';
import {
    updateConnection,
    newConnection,
    activateConnection,
    loginApp,
    deleteConnection,
    pushConnection,
    changeMode
} from '../reducers/login';
import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import Form, { validateServer, validateDirect } from 'Login/Form.jsx';
import SplitterLayout from 'Service/SplitterLayout.jsx';
import Connections from 'Login/Connections.jsx';

// const initializeForm = tuple => initialize(`${tuple[0]}Login`, tuple[1]);

// const changeMode = tuple => tuple[0] |> changeModeAction;

// /**
//  * Get mode
//  * @param {Object} item
//  */
// const getMode = item => {
//     return [item?.server ? 'server' : 'direct', item];
// };

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
        getConnections: () => state.login.connections,
        fetching: state.login.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeMode: mode => mode |> changeMode |> dispatch,
        onUpdateConnection: data => data |> updateConnection |> dispatch,
        onNewConnection: () => newConnection() |> dispatch,
        onPushConnection: connection =>
            connection |> pushConnection |> dispatch,
        onActivateConnection: id => id |> activateConnection |> dispatch,
        onLogin: connection => connection |> loginApp |> dispatch,
        onDeleteConnection: id => id |> deleteConnection |> dispatch,
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
        const { mode, onChangeMode, connectionSelect, fetching } = this.props;

        const formProps = {
            onSubmit: this.onSubmit,
            connectionSelect,
            fetching,
            onDelete: this.onDelete
        };

        return (
            <SplitterLayout>
                <Connections
                    onNewConnection={this.onAddNewConnection}
                    {...propsToComponent(this.props, [
                        'connections',
                        'onActivateConnection'
                    ])}
                />
                <Container>
                    <Tabs
                        id="login"
                        selectedTabId={mode}
                        onChange={onChangeMode}
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
            </SplitterLayout>
        );
    }

    onAddNewConnection = () => {
        const { onPushConnection, onActivateConnection } = this.props;

        const connection = {
            id: new Date().valueOf(),
            name: 'New connection'
        };

        connection |> onPushConnection;
        connection.id |> onActivateConnection;
    };

    onSubmit = async values => {
        const {
            onUpdateConnection,
            onLogin,
            onChangeRoute,
            getConnections
        } = this.props;
        onUpdateConnection(values);
        const result = await onLogin(values);
        result && onChangeRoute();

        //сохраним в local storage
        getConnections() |> saveInStorage(lsConst.CONNECTIONS);
    };

    onDelete = () => {
        const {
            onDeleteConnection,
            getValuesFrom,
            mode,
            getConnections,
            onActivateConnection
        } = this.props;
        const connection = getValuesFrom(`${mode}Login`);
        onDeleteConnection(connection.id);

        //сохраним в local storage
        const connections = getConnections();
        connections |> saveInStorage(lsConst.CONNECTIONS);

        const activeItem = connections.length > 0 ? connections[0] : {};
        Object.keys(activeItem).length
            ? (activeItem.id |> onActivateConnection)
            : this.onAddNewConnection();
    };
}
