import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import { Icon, Layout } from 'antd';
import { Flex } from 'reflexy';
import { typedInject } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { DashboardStore, Stores } from 'stores';
import { routePaths } from 'routes';
import {
  DbOverviewTab,
  EditorTabModel,
  isTabOfType,
  MetricsTabModel,
  ProcessesTabModel,
  ServerOverviewTab,
  Tab,
  TabType,
  SqlHistoryTab,
} from 'models';
import {
  DbOverviewTabPage,
  EditorTabPage,
  MetricsTabPage,
  NavPrompt,
  ProcessesTabPage,
  ServerOverviewTabPage,
  ServerStructureTree,
  Tabs,
  SqlHistoryTabPage,
} from 'components/Dashboard';
import Page from 'components/Page';
import { ActionType } from 'components/Dashboard/Tabs';
import { ColumnAction, ServerAction, TableAction } from 'components/Dashboard/ServerStructureTree';
import Splitter from 'components/Splitter';
import css from './DashboardView.css';

interface InjectedProps {
  store: DashboardStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

interface State {
  /** Needed for resizing GridLayout */
  primaryPaneSize?: number;
}

@observer
class DashboardView extends React.Component<RoutedProps, State> {
  state: State = {
    primaryPaneSize: undefined,
  };

  componentDidMount() {
    this.load();
  }

  private load = () => {
    const { store } = this.props;
    store.loadData();
  };

  private insertTextToEditor(text: string, typeInsert: string = 'sql') {
    const { store } = this.props;
    store
      .activeTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap(t => t.codeEditor)
      .forEach(editor => editor.insertText(text, typeInsert));
  }

  private onServerAction = (action: ServerAction) => {
    switch (action) {
      case ServerAction.OpenProcesses: {
        this.props.store.openProcessesTab();
        break;
      }
      case ServerAction.OpenMetrics: {
        this.props.store.openMetricsTab();
        break;
      }
      case ServerAction.OpenServerOverview: {
        this.props.store.openServerOverviewTab();
        break;
      }
      case ServerAction.OpenDbOverview: {
        this.props.store.openDbOverviewTab();
        break;
      }
      case ServerAction.OpenSqlHistory: {
        this.props.store.openSqlHistoryTab();
        break;
      }
      default:
        break;
    }
  };

  private makeCodeSelectFrom = (table: ServerStructure.Table) => {
    this.props.store.getTableColumns(table.database, table.name).then(cols => {
      let tableName: string = table.name;
      const fields: Array<string> = [];
      const where: Array<string> = [];

      cols.data.forEach((item: any) => {
        if (!item) return;
        fields.push(item.name);
        if (item.type === 'Date') {
          where.push(`${item.name}=today()`);
        }
      });
      if (tableName.indexOf('.') !== -1) tableName = `"${tableName}"`;

      let sql = `\nSELECT\n\t${fields.join(',\n\t')}\nFROM\n\t${table.database}.${tableName}\n`;
      if (where.length) {
        sql = `${sql}\nWHERE\n\t${where.join('\n AND \n')}`;
      }
      sql = `${sql}\nLIMIT 100\n\n`;
      this.insertTextToEditor(sql, 'sql');
    });
  };

  private onTableAction = (action: TableAction, table: ServerStructure.Table) => {
    // https://github.com/tabixio/tabix/blob/master/src/app/base/sidebar.js#L233

    switch (action) {
      case TableAction.CodeSelectFrom:
        this.makeCodeSelectFrom(table);
        break;
      case TableAction.MakeSQLDescribe:
        this.props.store.getTableSQLDescribe(table.database, table.name).then(sql => {
          this.insertTextToEditor(sql, 'sql');
        });
        break;
      case TableAction.InsertTableName:
        this.insertTextToEditor(table.name, 'table');
        break;
      default:
        break;
    }
  };

  private onColumnAction = (action: ColumnAction, column: ServerStructure.Column) => {
    if (action === ColumnAction.DoubleClick) {
      this.insertTextToEditor(column.name, 'column');
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
      store.openNewEditorTab();
    }
  };

  private onMenuAction = (action: ActionType) => {
    switch (action) {
      case ActionType.SignOut: {
        const { history } = this.props;
        history.push(routePaths.signOut.path);
        break;
      }
      default:
        break;
    }
  };

  private getTabIcon = (tab: Tab): string => {
    let icon = 'code';
    if (tab.type === TabType.Processes) icon = 'hdd';
    if (tab.type === TabType.Metrics) icon = 'line-chart';
    if (tab.type === TabType.DbOverview) icon = 'radar-chart';
    if (tab.type === TabType.ServerOverview) icon = 'database';

    return icon;
  };

  private onSplitterResizeFinished = (newSize: number) => {
    this.setState({ primaryPaneSize: newSize });
  };

  render() {
    const { store } = this.props;
    const { primaryPaneSize } = this.state;
    const isBlocking = store
      .activeTabOfType<EditorTabModel>(TabType.Editor)
      .map(t => !!t.content)
      .getOrElse(false);

    return (
      <Page column={false} uiStore={store.uiStore} className={css.root}>
        <NavPrompt when={isBlocking} message="Do you want to leave this page?" />

        <Splitter
          primary="second"
          minSize={550}
          maxSize={-300}
          defaultSize="calc(100vw - 325px)"
          size={primaryPaneSize}
          onDragFinished={this.onSplitterResizeFinished}
        >
          <Flex alignItems="flex-start" vfill className={css['sider-container']}>
            <Layout>
              <Layout.Sider width="100%" className={css['sider-tree']}>
                <ServerStructureTree
                  store={store.uiStore}
                  structure={store.serverStructure.orUndefined()}
                  onReload={this.load}
                  onServerAction={this.onServerAction}
                  onTableAction={this.onTableAction}
                  onColumnAction={this.onColumnAction}
                  filterServerStructure={store.filterServerStructure}
                  filteredItems={store.filteredItems}
                />
              </Layout.Sider>
            </Layout>
          </Flex>

          <Tabs
            activeKey={store.activeTab.map(_ => _.id).orUndefined()}
            onEdit={this.onEditTabs}
            onChange={this.onTabChange}
            onMenuAction={this.onMenuAction}
          >
            {store.tabs.map(t => (
              <Tabs.TabPane
                key={t.id}
                closable
                tab={
                  <span>
                    <Icon type={this.getTabIcon(t)} />
                    {t.title}
                  </span>
                }
              >
                {isTabOfType<EditorTabModel>(t, TabType.Editor) && (
                  <EditorTabPage
                    store={store}
                    model={t}
                    onTabModelFieldChange={t.changeField}
                    width={primaryPaneSize}
                  />
                )}

                {isTabOfType<ProcessesTabModel>(t, TabType.Processes) && <ProcessesTabPage />}

                {isTabOfType<MetricsTabModel>(t, TabType.Metrics) && <MetricsTabPage />}

                {isTabOfType<ServerOverviewTab>(t, TabType.ServerOverview) && (
                  <ServerOverviewTabPage />
                )}

                {isTabOfType<DbOverviewTab>(t, TabType.DbOverview) && <DbOverviewTabPage />}

                {isTabOfType<SqlHistoryTab>(t, TabType.SqlHistory) && (
                  <SqlHistoryTabPage onEdit={store.openNewEditorTab} />
                )}
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
