import React from 'react';
import { Layout } from 'antd';
import { Flex, FlexProps } from 'reflexy';
import { LocalUIStore } from '@vzh/mobx-stores';
import { RootStore } from 'stores';
import Loader from 'components/Loader';
import { observer } from 'mobx-react';
import NavBar from './NavBar';
import PageFooter from './PageFooter';
import css from './Page.css';

export interface Props extends FlexProps {
  uiStore?: LocalUIStore<RootStore>;
  children?: React.ReactNode;
}

function Page({ uiStore, ...rest }: Props) {
  const showLoader = uiStore && uiStore.loading;
  // hide page loader while showing app loader to avoid double loaders
  // (!store.uiStore.loading || uiStore === store.uiStore);
  return (
    <Layout className={css['root']}>
      {showLoader && <Loader />}

      <NavBar />

      <Flex
        column
        hfill
        grow
        shrink={false}
        tagName="main"
        className={css['main-container']}
        {...rest}
      />

      <PageFooter />
    </Layout>
  );
}

export default observer(Page);
