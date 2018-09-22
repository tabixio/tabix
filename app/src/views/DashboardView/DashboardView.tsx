import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Layout, Tabs } from 'antd';
import { Flex } from 'reflexy';
import { typedInject } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { Stores, DashboardStore } from 'stores';
import Page from 'components/Page';
import { DBTree, TabPage, CodeEditor } from 'components/Dashboard';
import Splitter from 'components/Splitter';
// import { Range } from 'monaco-editor';
import { TableAction, ColumnAction } from 'components/Dashboard/DbTree';
import css from './DashboardView.css';

interface InjectedProps {
  store: DashboardStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class DashboardView extends React.Component<RoutedProps> {
  private codeEditor?: CodeEditor;

  componentWillMount() {
    this.load();
  }

  private keepEditorRef = (editor: CodeEditor) => {
    this.codeEditor = editor;
  };

  private load = () => {
    const { store } = this.props;
    store.loadData();
  };

  private insertText(text: string) {
    if (!this.codeEditor) return;
    this.codeEditor.focus();
    this.codeEditor.trigger('keyboard', 'type', { text });
    // const pos = this.codeEditor.getPosition();
    // this.codeEditor.executeEdits('', [
    //   {
    //     range: new Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
    //     text: column.name,
    //   },
    // ]);
  }

  private onTableAction = (action: TableAction, table: ServerStructure.Table) => {
    // console.log(action, tableId);
    switch (action) {
      case TableAction.InsertTableName:
        this.insertText(table.name);
        break;
      default:
        break;
    }
  };

  private onColumnAction = (action: ColumnAction, column: ServerStructure.Column) => {
    // console.log(column);
    if (action === ColumnAction.DoubleClick) {
      this.insertText(column.name);
    }
  };

  private onTabChange = (key: string) => {
    const { store } = this.props;
    store.setActiveTab(key);
  };

  private onEditTabs = (eventOrKey: string | React.MouseEvent<any>, action: 'remove' | 'add') => {
    // console.log(eventOrKey, action);
    const { store } = this.props;
    if (action === 'remove' && typeof eventOrKey === 'string') {
      store.removeTab(eventOrKey);
    } else if (action === 'add') {
      store.addNewTab();
    }
  };

  render() {
    const { store } = this.props;
    const databases = store.serverStructure.map(_ => _.databases).getOrElse([]);

    return (
      <Page column={false} uiStore={store.uiStore}>
        <Splitter>
          <Flex alignItems="stretch" vfill>
            <Layout>
              <Layout.Sider width="100%">
                {store.serverStructure
                  .map(s => (
                    <DBTree
                      selectedDatabase={store.activeTab
                        .flatMap(t => t.currentDatabase)
                        .orUndefined()}
                      structure={s}
                      onReload={this.load}
                      onTableAction={this.onTableAction}
                      onColumnAction={this.onColumnAction}
                    />
                  ))
                  .orUndefined()}
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
                  changeField={t.changeField}
                  databases={databases}
                  editorRef={this.keepEditorRef}
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
