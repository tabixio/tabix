import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Login from 'containers/Login.jsx';
import Pages from 'containers/Pages.jsx';
// import AceTest from 'containers/AceTest.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/pages" component={Pages} />
            {/* <Route path="/acetest" component={AceTest} /> */}
        </Switch>
    </Layout>
);
