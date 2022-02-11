import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Flex } from 'reflexy';
import { Button, Layout, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { typedInject } from 'module/mobx-utils';
import { SignInStore, Stores } from 'stores';
import { Connection, ConnectionType, isDirectConnection } from 'services';
import { ConnectionModel } from 'models';
import Page from 'components/Page';
import Splitter from 'components/Splitter';
import { ConnectionList, DirectSignInForm } from 'components/SignIn';
import css from './SignInView.css';

interface InjectedProps {
  store: SignInStore;
}
export type Props = InjectedProps;

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class SignInView extends React.Component<RoutedProps> {
  componentDidMount() {
    const { store } = this.props;
    store.loadConnections();
  }

  private onSelectConnection = (connection: Connection) => {
    const { store } = this.props;
    store.setSelectedConnection(connection);
  };

  private onChangeTab = (key: string) => {
    const con =
      key === ConnectionType.Direct ? ConnectionModel.DirectEmpty : ConnectionModel.ServerEmpty;
    const { store } = this.props;
    store.setSelectedConnection(con);
  };

  private signIn = () => {
    const { store, history } = this.props;
    store.signIn(history);
  };

  render() {
    const { store } = this.props;

    return (
      <Page column={false} showHeader={true} uiStore={store.uiStore}>
        <Splitter>
          <Flex alignItems="stretch" className={css['layout-connection-list']} vfill>
            <Layout>
              <Layout.Sider width="100%">
                <ConnectionList
                  selectedConnection={store.selectedConnection}
                  connections={store.connectionList}
                  onSelect={this.onSelectConnection}
                />
                <Flex center>
                  <Button
                    type="primary"
                    style={{ float: 'left' }}
                    className={css['add-connection-btn']}
                    onClick={store.addNewConnection}
                  >
                    ADD NEW
                  </Button>
                </Flex>
              </Layout.Sider>
            </Layout>
          </Flex>

          <Flex shrink={false} center fill>
            <Tabs
              type="line"
              activeKey={
                isDirectConnection(store.selectedConnection)
                  ? ConnectionType.Direct
                  : ConnectionType.Server
              }
              onChange={this.onChangeTab}
              className={css.form}
            >
              <Tabs.TabPane tab="DIRECT CH" key={ConnectionType.Direct}>
                {isDirectConnection(store.selectedConnection) && (
                  <DirectSignInForm
                    model={store.selectedConnection}
                    onDelete={store.deleteSelectedConnection}
                    onSignIn={this.signIn}
                    deleteEnabled={!!store.selectedConnection.connectionName}
                  />
                )}
              </Tabs.TabPane>
              {/*<Tabs.TabPane tab="TABIX.SERVER" key={ConnectionType.Server}>*/}
              {/*  {!isDirectConnection(store.selectedConnection) && (*/}
              {/*    <ServerSignInForm*/}
              {/*      model={store.selectedConnection}*/}
              {/*      onDelete={store.deleteSelectedConnection}*/}
              {/*      onSignIn={this.signIn}*/}
              {/*      deleteEnabled={!!store.selectedConnection.connectionName}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</Tabs.TabPane>*/}
            </Tabs>
          </Flex>
        </Splitter>
      </Page>
    );
  }
}

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.signInStore }))(
    SignInView
  )
);
