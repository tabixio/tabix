import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import { typedInject } from 'module/mobx-utils';
import { ServerStructure } from 'services';
import { routePaths } from 'routes';
import { Stores, TabsStore, TreeStore } from 'stores';
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
  TabsTabPane,
  SqlHistoryTabPage,
} from 'components/Dashboard';
import { TextInsertType } from 'components/Dashboard/EditorTabPage';
import Page from 'components/Page';
import { ActionType } from 'components/Dashboard/Tabs';
import {
  RowActionTypeAction,
  ColumnAction,
  ServerAction,
  TableAction,
} from 'components/Dashboard/ServerStructureTree';
import Splitter from 'components/Splitter';
import css from './DashboardView.css';

interface InjectedProps {
  treeStore: TreeStore;
  tabsStore: TabsStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class DashboardView extends React.Component<RoutedProps> {
  componentDidMount() {
    this.props.tabsStore.loadData();
  }

  private onServerAction = (action: ServerAction) => {
    switch (action) {
      case ServerAction.OpenProcesses: {
        this.props.tabsStore.openProcessesTab();
        break;
      }
      case ServerAction.OpenMetrics: {
        this.props.tabsStore.openMetricsTab();
        break;
      }
      case ServerAction.OpenServerOverview: {
        this.props.tabsStore.openServerOverviewTab();
        break;
      }
      case ServerAction.OpenDbOverview: {
        this.props.tabsStore.openDbOverviewTab();
        break;
      }
      case ServerAction.OpenSqlHistory: {
        this.props.tabsStore.openSqlHistoryTab();
        break;
      }
      default:
        break;
    }
  };

  private onTableAction = (action: TableAction, table: ServerStructure.Table) => {
    // https://github.com/tabixio/tabix/blob/master/src/app/base/sidebar.js#L233
    switch (action) {
      case TableAction.CodeSelectFrom:
        this.props.tabsStore.insertSelectFrom(table);
        break;
      case TableAction.MakeSQLDescribe:
        this.props.tabsStore.insertTableSQLDescribe(table);
        break;
      case TableAction.InsertTableName:
        this.props.tabsStore.insertTextToEditor(table.name, TextInsertType.Table);
        break;
      default:
        break;
    }
  };

  // (action: RowActionTypeAction, column: ServerStructure.SpecialItem)
  private onCommandAction = (action: RowActionTypeAction, command: ServerStructure.SpecialItem) => {
    if (action === RowActionTypeAction.DoubleClick || action === RowActionTypeAction.Click) {
      console.log(command);
      switch (command.command) {
        case ServerStructure.PagesCommands.Processes: {
          this.props.tabsStore.openProcessesTab();
          break;
        }
        case ServerStructure.PagesCommands.Metrics: {
          this.props.tabsStore.openMetricsTab();
          break;
        }
        // case ServerStructure.PagesCommands.ServerOverview: {
        //   this.props.tabsStore.openServerOverviewTab();
        //   break;
        // }
        // case ServerStructure.PagesCommands.DbOverview: {
        //   this.props.tabsStore.openDbOverviewTab();
        //   break;
        // }
        // case ServerStructure.PagesCommands.SqlHistory: {
        //   this.props.tabsStore.openSqlHistoryTab();
        //   break;
        // }
        default:
          break;
      }

      // this.props.tabsStore.insertColumnToEditor(column);
    }
  };

  private onColumnAction = (action: ColumnAction, column: ServerStructure.Column) => {
    if (action === ColumnAction.DoubleClick || action === ColumnAction.Click) {
      this.props.tabsStore.insertColumnToEditor(column);
    }
  };

  private onEditTabs = (eventOrKey: string | React.MouseEvent<any>, action: 'remove' | 'add') => {
    const { tabsStore: store } = this.props;
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

  render() {
    const { tabsStore, treeStore } = this.props;
    const { uiStore } = tabsStore;
    const isBlocking = tabsStore
      .getActiveTabOfType<EditorTabModel>(TabType.Editor)
      .map(t => !!t.content)
      .getOrElse(false);

    return (
      <Page column={false} uiStore={tabsStore.uiStore}>
        <NavPrompt when={isBlocking} message="Do you want to leave this page?" />

        <Splitter
          primary="second"
          minSize={100}
          maxSize={-100}
          defaultSize="calc(100vw - 225px)"
          size={uiStore.primaryPaneSize}
          onDragFinished={uiStore.updatePrimaryPaneSize}
        >
          <Flex alignItems="flex-start" vfill className={css['sider-container']}>
            <ServerStructureTree
              onServerAction={this.onServerAction}
              onTableAction={this.onTableAction}
              onColumnAction={this.onColumnAction}
              onCommandAction={this.onCommandAction}
            />
          </Flex>

          <Tabs
            activeKey={tabsStore.activeTab.map(_ => _.id).orUndefined()}
            onEdit={this.onEditTabs}
            onChange={tabsStore.setActiveTab}
            onMenuAction={this.onMenuAction}
          >
            {tabsStore.tabs.map(t => (
              <TabsTabPane
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
                    store={tabsStore}
                    serverStructure={treeStore.serverStructure.orUndefined()}
                    model={t}
                    onModelFieldChange={t.changeField}
                    width={uiStore.primaryPaneSize}
                  />
                )}

                {isTabOfType<ProcessesTabModel>(t, TabType.Processes) && <ProcessesTabPage />}

                {isTabOfType<MetricsTabModel>(t, TabType.Metrics) && <MetricsTabPage />}

                {isTabOfType<ServerOverviewTab>(t, TabType.ServerOverview) && (
                  <ServerOverviewTabPage />
                )}

                {isTabOfType<DbOverviewTab>(t, TabType.DbOverview) && <DbOverviewTabPage />}

                {isTabOfType<SqlHistoryTab>(t, TabType.SqlHistory) && (
                  <SqlHistoryTabPage onEdit={tabsStore.openNewEditorTab} />
                )}
              </TabsTabPane>
            ))}
          </Tabs>
        </Splitter>
      </Page>
    );
  }
}

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({
    tabsStore: store.tabsStore,
    treeStore: store.treeStore,
  }))(DashboardView)
);
