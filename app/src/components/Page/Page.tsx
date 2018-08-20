import React from 'react';
import { Layout } from 'antd';
import { Flex, FlexProps } from 'reflexy';
import NavBar from './NavBar';
import PageFooter from './PageFooter';
import css from './Page.css';

export interface Props extends FlexProps {
  children?: React.ReactNode;
}

export default function Page(props: Props) {
  return (
    <Layout className={css['root']}>
      <NavBar />

      <Flex
        column
        hfill
        grow
        shrink={false}
        tagName="main"
        className={css['main-container']}
        {...props}
      />

      <PageFooter />
    </Layout>
  );
}
