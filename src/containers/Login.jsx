import styled from 'styled-components';
import propsToComponent from 'libs/components/propsToComponent';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
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
import Tabs from 'Login/Tabs.jsx';
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
        onChangeMode: mode => mode |> changeMode |> dispatch,
        onUpdateConnection: data => data |> updateConnection |> dispatch,
        onNewConnection: () => newConnection() |> dispatch,
        onPushConnection: connection =>
            connection |> pushConnection |> dispatch,
        onActivateConnection: id => id |> activateConnection |> dispatch,
        onLogin: (connection, route) => dispatch(loginApp(connection, route)),
        onDeleteConnection: id => id |> deleteConnection |> dispatch
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

    componentWillReceiveProps(nextProps) {
        const { connections, onActivateConnection } = this.props;

        //активация в форме подключения
        if (
            connections.length === 0 &&
            connections.length !== nextProps.connections.length
        ) {
            const activeConnection = nextProps.connections.find(x => x.active);
            activeConnection && onActivateConnection(activeConnection.id);
        }
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
                    <Tabs {...{ mode, onChangeMode, formProps }} />
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

    onSubmit = values => {
        const { onUpdateConnection, onLogin } = this.props;
        onUpdateConnection(values);
        onLogin(values, '/pages');
    };

    onDelete = () => {
        const {
            onDeleteConnection,
            getValuesFrom,
            mode,
            onActivateConnection,
            connections
        } = this.props;
        const connection = getValuesFrom(`${mode}Login`);
        onDeleteConnection(connection.id);

        //активируем подключение после удаления
        connections.filter(x => x.id !== connection.id)
            |> (_ => (_.length > 0 ? _[0] : {}))
            |> (_ =>
                Object.keys(_).length
                    ? onActivateConnection(_.id)
                    : this.onAddNewConnection());
    };
}
