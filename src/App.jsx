import React from 'react';
import Routes from './routes.jsx';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <Routes />
            </ConnectedRouter>
        );
    }
}

export default hot(module)(App);
