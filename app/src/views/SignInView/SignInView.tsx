import React from 'react';
import { Flex } from 'reflexy';
import { Layout } from 'antd';
import Page from 'components/Page';
// import { SignInBox } from 'components/SignIn';
// import css from './SignInView.css';

export default function SignInView() {
  return (
    <Page column={false}>
      <Flex alignItems="stretch">
        <Layout>
          <Layout.Sider>123</Layout.Sider>
        </Layout>
      </Flex>

      <Flex column grow shrink={false} alignItems="center" justifyContent="center">
        {/* <SignInBox className={css['box']} /> */}
      </Flex>
    </Page>
  );
}
