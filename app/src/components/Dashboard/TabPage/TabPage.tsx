import React from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import { Option } from 'funfix-core';
import { Props as SplitPaneProps } from 'react-split-pane';
import { FieldChangeHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { Tab } from 'models';
import { DashboardStore } from 'stores';
import Splitter from 'components/Splitter';
import SqlEditor, { CodeEditor } from './SqlEditor';
import { ActionType } from './SqlEditor/Toolbar';
import SaveModal from './SaveModal';
import DataTable from './DataTable';
import Draw from './Draw';
import css from './TabPage.css';

interface Props extends SplitPaneProps {
  model: Tab;
  onTabModelFieldChange: FieldChangeHandler<Tab>;
  databases: ReadonlyArray<ServerStructure.Database>;
  store: DashboardStore;
}

@observer
export default class TabPage extends React.Component<Props> {
  private onContentChange = (content: string) => {
    const { onTabModelFieldChange } = this.props;
    onTabModelFieldChange({ name: 'content', value: content });
  };

  private onDatabaseChange = (db: ServerStructure.Database) => {
    const { onTabModelFieldChange } = this.props;
    onTabModelFieldChange({ name: 'currentDatabase', value: Option.of(db.name) });
  };

  private setEditorRef = (editor?: CodeEditor) => {
    const { onTabModelFieldChange } = this.props;
    onTabModelFieldChange({ name: 'codeEditor', value: Option.of(editor) });
  };

  private onAction = (action: ActionType, eventData?: any) => {
    switch (action) {
      case ActionType.Save: {
        const { store } = this.props;

        store.uiStore.showSaveModal();
        break;
      }
      case ActionType.Fullscreen:
        break;
      case ActionType.RunCurrent: {
        const { store } = this.props;
        store.execQueries(eventData);
        break;
      }
      case ActionType.RunAll:
        break;
      default:
        break;
    }
  };

  render() {
    const { store, model, onTabModelFieldChange, databases, ...rest } = this.props;

    return (
      <React.Fragment>
        <Splitter split="horizontal" minSize={100} defaultSize={350} {...rest}>
          <SqlEditor
            content={model.content}
            onContentChange={this.onContentChange}
            serverStructure={store.serverStructure.getOrElse(ServerStructure.EMPTY)}
            currentDatabase={model.currentDatabase.orUndefined()}
            onDatabaseChange={this.onDatabaseChange}
            onAction={this.onAction}
            editorRef={this.setEditorRef}
            fill
          />

          <Tabs size="small" animated={false} defaultActiveKey="table" className={css.tabs}>
            <Tabs.TabPane key="table" tab="Table view">
              {/* {model.data.map(data => <DataTable data={data} />).orUndefined()} */}
              {model.data.map(data => (
                <DataTable data={data} key={1} />
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane key="draw" tab="Draw view">
              {/* {model.data.map(data => <Draw data={data} />).orUndefined()} */}
              {model.data.map(data => (
                <Draw data={data} key={2} />
              ))}
            </Tabs.TabPane>
          </Tabs>
        </Splitter>

        {store.uiStore.editedTab
          .filter(t => t.model === model)
          .map(editedTab => (
            <SaveModal
              fieldName="title"
              fieldValue={editedTab.title}
              onFieldChange={editedTab.changeField}
              onSave={store.saveEditedTab}
              onCancel={store.uiStore.hideSaveModal}
            />
          ))
          .orUndefined()}
      </React.Fragment>
    );
  }
}
