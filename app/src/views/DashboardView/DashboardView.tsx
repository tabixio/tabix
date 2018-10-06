import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Layout, Tabs } from 'antd';
import { Flex } from 'reflexy';
import { typedInject, ChangeFieldHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { Stores, DashboardStore } from 'stores';
import Page from 'components/Page';
import { ServerStructureTree, TabPage } from 'components/Dashboard';
import { TableAction, ColumnAction } from 'components/Dashboard/ServerStructureTree';
import Splitter from 'components/Splitter';
// import { Range } from 'monaco-editor';
import { TreeFilter } from 'models';
import css from './DashboardView.css';

interface InjectedProps {
  store: DashboardStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class DashboardView extends React.Component<RoutedProps> {
  // private codeEditor?: CodeEditor;
  constructor(props: RoutedProps) {
    super(props);
    this.load();
  }

  private load = () => {
    const { store } = this.props;
    store.loadData();
  };

  private insertText(text: string) {
    const { store } = this.props;
    store.activeTab.flatMap(t => t.codeEditor).forEach(editor => {
      editor.focus();
      editor.trigger('keyboard', 'type', { text });
    });
  }

  private onTableAction = (action: TableAction, table: ServerStructure.Table) => {
    switch (action) {
      case TableAction.InsertTableName:
        this.insertText(table.name);
        break;
      default:
        break;
    }
  };

  private onColumnAction = (action: ColumnAction, column: ServerStructure.Column) => {
    if (action === ColumnAction.DoubleClick) {
      this.insertText(column.name);
    }
  };

  private onTabChange = (id: string) => {
    const { store } = this.props;
    store.setActiveTab(id);
  };

  private onEditTabs = (eventOrKey: string | React.MouseEvent<any>, action: 'remove' | 'add') => {
    const { store } = this.props;
    if (action === 'remove' && typeof eventOrKey === 'string') {
      store.removeTab(eventOrKey);
    } else if (action === 'add') {
      store.addNewTab();
    }
  };

  private filterTimeout: number = 0;

  private onTreeFilterChange: ChangeFieldHandler<TreeFilter> = event => {
    const { store } = this.props;
    store.treeFilter.changeField(event);
    // tree search
    if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
    this.filterTimeout = window.setTimeout(() => store.filterServerStructure(), 300);
  };

  render() {
    const { store } = this.props;
    const databases = store.serverStructure.map(_ => _.databases).getOrElse([]);

    return (
      <Page column={false} uiStore={store.uiStore}>
        <Splitter>
          <Flex alignItems="stretch" vfill className={css['sider-container']}>
            <Layout>
              <Layout.Sider width="100%">
                <ServerStructureTree
                  store={store.uiStore}
                  structure={store.filteredServerStructure
                    .orElse(store.serverStructure)
                    .orUndefined()}
                  onReload={this.load}
                  onTableAction={this.onTableAction}
                  onColumnAction={this.onColumnAction}
                  treeFilter={store.treeFilter}
                  onChangeTreeFilterField={this.onTreeFilterChange}
                />
              </Layout.Sider>
            </Layout>
          </Flex>

          <Tabs
            type="editable-card"
            className={css.tabs}
            activeKey={store.activeTab.map(_ => _.id).orUndefined()}
            onEdit={this.onEditTabs}
            onChange={this.onTabChange}
          >
            {store.tabs.map(t => (
              <Tabs.TabPane key={t.id} closable tab={t.title} className={css.tabpane}>
                <TabPage
                  store={store}
                  model={t}
                  changeTabModelField={t.changeField}
                  databases={databases}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Splitter>
      </Page>
    );
  }
}

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.dashboardStore }))(
    DashboardView
  )
);
