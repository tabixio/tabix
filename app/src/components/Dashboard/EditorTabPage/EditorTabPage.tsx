import React from 'react';
import { observer } from 'mobx-react';
import { Option } from 'funfix-core';
import { FieldChangeHandler } from '@vzh/mobx-stores';
import { EditorTab } from 'models';
import { TabsStore } from 'stores';
import { ServerStructure } from 'services';
import DataDecorator from 'services/api/DataDecorator';
import Splitter from 'components/Splitter';
import SqlEditor from './SqlEditor';
import { ActionType as EditorActionType } from './SqlEditor/Toolbar';
import SaveModal from './SaveModal';
import Tabs from './Tabs';
import { ActionType as ResultActionType } from './Tabs/Actions';
import DataItemsLayout from './DataItemsLayout';
import DataTable from './DataTable';
import Draw from './Draw';
import Progress from './Progress';

interface Props {
  store: TabsStore;
  serverStructure?: ServerStructure.Server;
  model: EditorTab;
  onModelFieldChange: FieldChangeHandler<EditorTab>;
  width?: number;
}

@observer
export default class EditorTabPage extends React.Component<Props> {
  private onContentChange = (content: string) => {
    this.props.onModelFieldChange({ name: 'content', value: content });
  };

  private onDatabaseChange = (db: ServerStructure.Database) => {
    this.props.onModelFieldChange({ name: 'currentDatabase', value: Option.of(db.name) });
  };

  private setEditorRef = (editor: SqlEditor | null) => {
    this.props.onModelFieldChange({ name: 'codeEditor', value: Option.of(editor) });
  };

  private onEditorAction = (action: EditorActionType, eventData?: any) => {
    switch (action) {
      case EditorActionType.Save: {
        const { store } = this.props;
        store.showSaveModal();
        break;
      }
      case EditorActionType.Fullscreen:
        break;
      case EditorActionType.RunCurrent:
      case EditorActionType.RunAll: {
        const { store } = this.props;
        store.execQueries(eventData);
        break;
      }
      default:
        break;
    }
  };

  private onResultAction = (action: ResultActionType) => {
    switch (action) {
      case ResultActionType.TogglePin: {
        const { onModelFieldChange: onTabModelFieldChange, model } = this.props;
        onTabModelFieldChange({ name: 'pinnedResult', value: !model.pinnedResult });
        break;
      }
      default:
        break;
    }
  };

  private renderTable = (data: DataDecorator) => <DataTable data={data} fill />;

  private renderDraw = (data: DataDecorator) => <Draw data={data} />;

  render() {
    const { store, serverStructure, model, width } = this.props;
    const resultList = model.queriesResult.map(r => r.list).getOrElse([]);

    return (
      <React.Fragment>
        <Splitter split="horizontal" minSize={100} defaultSize={350}>
          <SqlEditor
            content={model.content}
            onContentChange={this.onContentChange}
            serverStructure={serverStructure}
            currentDatabase={model.currentDatabase.orUndefined()}
            onDatabaseChange={this.onDatabaseChange}
            onAction={this.onEditorAction}
            stats={model.queriesResult.map(_ => _.totalStats).orUndefined()}
            ref={this.setEditorRef}
            fill
          />

          <Tabs defaultActiveKey="table" pinned={model.pinnedResult} onAction={this.onResultAction}>
            <Tabs.TabPane key="table" tab="Table view">
              {!!store.uiStore.executingQueries.length && (
                <Progress queries={store.uiStore.executingQueries} />
              )}

              <DataItemsLayout
                cols={4}
                itemWidth={4}
                itemHeight={14}
                items={resultList}
                width={width}
                renderItem={this.renderTable}
                locked={model.pinnedResult}
              />
            </Tabs.TabPane>

            <Tabs.TabPane key="draw" tab="Draw view">
              {!!store.uiStore.executingQueries.length && (
                <Progress queries={store.uiStore.executingQueries} />
              )}

              <DataItemsLayout
                cols={4}
                itemWidth={4}
                itemHeight={6}
                items={resultList}
                width={width}
                renderItem={this.renderDraw}
              />
            </Tabs.TabPane>
          </Tabs>
        </Splitter>

        {store.editedTab
          .filter(t => t.model === model)
          .map(editedTab => (
            <SaveModal
              fieldName="title"
              fieldValue={editedTab.title}
              onFieldChange={editedTab.changeField}
              onSave={store.saveEditedTab}
              onCancel={store.hideSaveModal}
            />
          ))
          .orUndefined()}
      </React.Fragment>
    );
  }
}
