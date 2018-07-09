import styled from 'styled-components';
import React from 'react';
import Markdown from './Markdown.jsx';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import './styles.css';

const Story = styled.div`
    padding: 16px;
`;

const style = {
    margin: '16px 0'
};

export default ({ api, children }) => {
    return (
        <Story>
            <Tabs
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="RESULT" key="1" style={style}>
                    {children}
                </TabPane>
                <TabPane tab="API" key="2" style={style}>
                    <Markdown source={api} />
                </TabPane>
            </Tabs>
        </Story>
    );
};
