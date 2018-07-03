import { connect } from 'react-redux';
import React, { Component } from 'react';

function mapStateToProps(state) {
    return {
        msg: state.app.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    render() {

        const { msg } = this.props;
        return (
            <h1>{msg}</h1>
        );
    }
}