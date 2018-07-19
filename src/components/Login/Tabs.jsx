import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import Form, { validateServer, validateDirect } from './Form.jsx';

export default ({ mode, onChangeMode, formProps }) => (
    <Tabs id="login" selectedTabId={mode} onChange={onChangeMode}>
        <Tab
            id="direct"
            title="DIRECT CH"
            panel={
                <Form
                    {...formProps}
                    mode="direct"
                    form="directLogin"
                    validate={validateDirect}
                />
            }
        />
        <Tab
            id="server"
            title="TABIX.SERVER"
            panel={
                <Form
                    {...formProps}
                    mode="server"
                    form="serverLogin"
                    validate={validateServer}
                />
            }
        />
    </Tabs>
);
