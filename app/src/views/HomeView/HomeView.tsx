import React from 'react';
import { Layout } from 'antd';
// import css from './HomeView.css';

const { Header, Footer, Content } = Layout;

const version = 1;

export default function HomeView() {
  return (
    <Layout>
      <Header>header</Header>

      <Content>HOME</Content>

      <Footer>
        <a href="https://tabix.io/" target="_blank" rel="noopener noreferrer">
          Tabix.IO
        </a>
        by Tabix LLC ©, all rights reserved. Build {version}
      </Footer>
    </Layout>
  );
}
