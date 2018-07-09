import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Login from 'containers/Login.jsx';
import Sql from 'containers/Sql.jsx';
import Handsontable from 'containers/Handsontable.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sql" component={Sql} />
            <Route path="/hot" component={Handsontable} />
        </Switch>
    </Layout>
);
