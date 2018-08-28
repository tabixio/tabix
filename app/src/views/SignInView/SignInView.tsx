import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Flex } from 'reflexy';
import { Layout, Tabs, Button } from 'antd';
import { observer } from 'mobx-react';
import queryProps from 'react-query-props';
import { typedInject } from '@vzh/mobx-stores';
import Page from 'components/Page';
import { DirectSignInForm, ServerSignInForm, ConnectionList } from 'components/SignIn';
import { AppStore, Stores } from 'stores';
import css from './SignInView.css';

interface InjectedProps {
  store: AppStore;
}

export interface Props extends InjectedProps {
  query: any;
}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class SignInView extends React.Component<RoutedProps> {
  render() {
    console.log(this.props);
    const { store } = this.props;

    return (
      <Page column={false}>
        <Flex alignItems="stretch">
          <Layout>
            <Layout.Sider>
              <ConnectionList connections={store.connectionList} />
              <Flex center>
                <Button type="primary" className={css['add-connection-btn']}>
                  ADD NEW
                </Button>
              </Flex>
            </Layout.Sider>
          </Layout>
        </Flex>

        <Flex column grow shrink={false} alignItems="center" justifyContent="center">
          <Tabs type="line" defaultActiveKey="1" className={css['form']}>
            <Tabs.TabPane tab="DIRECT CH" key="1">
              <DirectSignInForm connection={store.connection.orUndefined()} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="TABIX.SERVER" key="2">
              <ServerSignInForm />
            </Tabs.TabPane>
          </Tabs>
        </Flex>
      </Page>
    );
  }
}

export default withRouter(
  queryProps()(
    typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({
      store: store.appStore,
    }))(SignInView)
  )
);
