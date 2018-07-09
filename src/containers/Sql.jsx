import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(disaptch) {
    return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Sql extends Component {
    render() {
        return (<h2>SQL</h2>);
    }
}