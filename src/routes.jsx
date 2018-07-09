import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Login from 'containers/Login.jsx';
import Sql from 'containers/Sql.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sql" component={Sql} />
        </Switch>
    </Layout>
);
