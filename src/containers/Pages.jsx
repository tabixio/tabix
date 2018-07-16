import { getConnection } from '../selectors';
import { connect } from 'react-redux';
import { logout, expandStructure } from '../actions/app';
import { push } from 'react-router-redux';
import React, { Component } from 'react';
import { Button, Spinner } from '@blueprintjs/core';
import SplitterLayout from 'Service/SplitterLayout.jsx';
import { Tree } from '@blueprintjs/core';

function mapStateToProps(state) {
    return {
        connection: getConnection(state),
        fetching: state.login.fetching,
        structure: state.app.structure
    };
}

function mapDispatchToProps(disaptch) {
    return {
        onLogout: () => {
            disaptch(logout());
            disaptch(push('/login'));
        },
        onExpand: (id, expand) => disaptch(expandStructure(id, expand))
    };
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Pages extends Component {
    render() {
        const { onLogout, connection, fetching, structure } = this.props;
        return (
            <SplitterLayout>
                <Tree
                    contents={structure}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                />
                <div>
                    <h2>PAGES</h2>
                    {fetching && <Spinner />}
                    <p>{connection |> JSON.stringify}</p>
                    <Button text="logout" onClick={onLogout} />
                </div>
            </SplitterLayout>
        );
    }

    handleNodeCollapse = node => this.props.onExpand(node.id, false);

    handleNodeExpand = node => this.props.onExpand(node.id, true);
}
