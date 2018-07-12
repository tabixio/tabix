import React from 'react';
import Routes from './routes.jsx';
import Toastr from 'Service/Toastr.jsx';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return [
            <ConnectedRouter key="app" history={this.props.history}>
                <Routes />
            </ConnectedRouter>,
            <Toastr key="toaster"/>
        ];
    }
}

export default hot(module)(App);
