import React from 'react';
import { Flex } from 'reflexy';
import { Layout, Tabs } from 'antd';
import queryProps from 'react-query-props';
import Page from 'components/Page';
import { DirectSignInForm, ServerSignInForm } from 'components/SignIn';
import { RouteComponentProps, withRouter } from 'react-router';
import css from './SignInView.css';

export interface Props extends RouteComponentProps<any> {
  query: any;
}

const SignInView = queryProps()((props: Props) => {
  console.log(props);

  return (
    <Page column={false}>
      <Flex alignItems="stretch">
        <Layout>
          <Layout.Sider>123</Layout.Sider>
        </Layout>
      </Flex>

      <Flex column grow shrink={false} alignItems="center" justifyContent="center">
        <Tabs type="line" defaultActiveKey="1" className={css['form']}>
          <Tabs.TabPane tab="DIRECT CH" key="1">
            <DirectSignInForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="TABIX.SERVER" key="2">
            <ServerSignInForm />
          </Tabs.TabPane>
        </Tabs>
      </Flex>
    </Page>
  );
});
SignInView.displayName = 'SignInView';

export default withRouter(SignInView);
