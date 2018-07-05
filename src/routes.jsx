import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Login from 'containers/Login.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Login} />
        </Switch>
    </Layout>
);
