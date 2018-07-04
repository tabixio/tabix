import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Main from 'containers/Main.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Main} />
        </Switch>
    </Layout>
);
