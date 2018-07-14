import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/app';
import { push } from 'react-router-redux';
import { Button, Spinner } from '@blueprintjs/core';

function mapStateToProps(state) {
    return {
        connection: state.login.connections.find(x => x.authorized),
        fetching: state.login.fetching
    };
}

function mapDispatchToProps(disaptch) {
    return {
        onLogout: () => {
            disaptch(logout());
            disaptch(push('/login'));
        }
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Sql extends Component {
    render() {
        const { onLogout, connection, fetching  } = this.props;
        return (
            <div>
                <h2>SQL</h2>
                {fetching && <Spinner />}
                <p>{connection |> JSON.stringify}</p>
                <Button text="logout" onClick={onLogout} />
            </div>
        );
    }
}
