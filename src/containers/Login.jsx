import { connect } from 'react-redux';
import { switchMode } from '../actions/login';
import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
export default class Main extends Component {
    render() {
        const { mode, onSwitch } = this.props;
        return (
            <Row middle="xs">
                <Col xs={12}>
                    <Tabs id="login" selectedTabId={mode} onChange={onSwitch}>
                        <Tab
                            id="direct"
                            title="DIRECT CH"
                            panel={<h1>direct</h1>}
                        />
                        <Tab
                            id="server"
                            title="TABIX.SERVER"
                            panel={<h1>server</h1>}
                        />
                    </Tabs>
                </Col>
            </Row>
        );
    }
}
