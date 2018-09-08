import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Layout } from 'antd';
import { Flex } from 'reflexy';
import { typedInject } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { Stores, DashboardStore } from 'stores';
import Page from 'components/Page';
import { DBTree, SqlEditor } from 'components/Dashboard';

interface InjectedProps {
  store: DashboardStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class DashboardView extends React.Component<RoutedProps> {
  componentWillMount() {
    this.load();
  }

  private load = () => {
    const { store } = this.props;
    store.loadData();
  };

  private onColumnClick = (column: ServerStructure.Column) => {
    console.log(column);
  };

  render() {
    const { store } = this.props;

    return (
      <Page column={false} uiStore={store.uiStore}>
        <Flex alignItems="stretch">
          <Layout>
            <Layout.Sider width="300">
              {store.serverStructure
                .map(s => (
                  <DBTree structure={s} onReload={this.load} onColumnClick={this.onColumnClick} />
                ))
                .orUndefined()}
            </Layout.Sider>
          </Layout>
        </Flex>

        <Flex column grow shrink={false}>
          <SqlEditor />
        </Flex>
      </Page>
    );
  }
}

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.dashboardStore }))(
    DashboardView
  )
);
