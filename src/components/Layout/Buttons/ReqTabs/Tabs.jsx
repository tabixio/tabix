import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import DirectTab from './DirectTab.jsx';
import ProxyTab from './ProxyTab.jsx';
import ReqTab from './ReqTab.jsx';

export default () => (
    <Tabs id="req-tabs">
        <Tab id="req" title="REQUIREMENTS" panel={<ReqTab />} />
        <Tab id="dc" title="DIRECT CONNECT" panel={<DirectTab />} />
        <Tab id="tp" title="TABIX.PROXY" panel={<ProxyTab />} />
    </Tabs>
);
