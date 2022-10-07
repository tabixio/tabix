import React from 'react';
import { observer } from 'mobx-react';
import { Option } from 'funfix-core';
import { FieldChangeHandler } from 'module/mobx-utils';
import { EditorTab } from 'models';
import { TabsStore } from 'stores';
import { ServerStructure } from 'services';
import DataDecorator from 'services/api/DataDecorator';
import Splitter from 'components/Splitter';
import SqlEditor from './SqlEditor';
import { ActionType as EditorActionType } from './SqlEditor/Toolbar';
import { TextInsertType } from './SqlEditor/types';
import SaveModal from './SaveModal';
import { Tabs, ResultTabActionType } from './Tabs';
import DataItemsLayout from './DataItemsLayout';
// import DataTable, { ExportData, DataTableProps, ResultTableActionType } from './DataTable';
import { TableSheet } from 'components/TableSheet';
import Draw from 'components/Draw';
import Progress from './Progress';
import { TabsTabPane } from './Tabs/Tabs';
import FullScreener from './FullScreener';

interface Props {
  store: TabsStore;
  serverStructure?: ServerStructure.Server;
  model: EditorTab;
  onModelFieldChange: FieldChangeHandler<EditorTab>;
  width?: number;
}

@observer
export default class EditorTabPage extends React.Component<Props> {
  state = {
    enterFullScreen: false,
  };

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

  private onResultTabAction = (action: ResultTabActionType, subEvent = '') => {
    const { model } = this.props;
    switch (action) {
      case ResultTabActionType.TogglePin: {
        const { onModelFieldChange: onTabModelFieldChange, model } = this.props;
        onTabModelFieldChange({ name: 'pinnedResult', value: !model.pinnedResult });
        break;
      }
      case ResultTabActionType.Fullscreen: {
        const v = this.state.enterFullScreen;
        this.setState({ enterFullScreen: !v });
        console.log('FULLSCREEN', this.state.enterFullScreen);
        break;
      }
      // case ResultTabActionType.Export: {
      //   let counter = 0;
      //   model.queriesResult.value?.list?.map((_) => {
      //     if (
      //       _.result.isSuccess() &&
      //       !_.result.value.isResultText &&
      //       !_.result.value.error &&
      //       _.result.value.isHaveData
      //     ) {
      //       counter++;
      //       const title = `ResultTable-${counter}-${model.title}`;
      //       ExportData(_.result.value, subEvent, title);
      //     }
      //   });
      //   break;
      // }
      default:
        break;
    }
  };

  private copyToClipboard(text: string) {
    // const textarea = React.createElement(
    //   'textarea',
    //   { value: text, type: 'url', autoFocus: true },
    //   'body'
    // );
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    // if (textarea.style) {
    // textarea.style.width = 0;
    // textarea.style.height = 0;
    // textarea.style.border = 0;
    // textarea.style.position = 'absolute';
    // textarea.style.top = 0;
    // }
    // textarea.innerText = text;
    document.body.appendChild(textarea);
    textarea.value = text;
    // textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textarea);
    console.log(text);
    return true;
  }

  //
  // private onDataTableAction: DataTableProps['onAction'] = (action, data) => {
  //   if (action === ResultTableActionType.Insert) {
  //     // to insert result to editor ( where cursor )
  //     console.log('insert result:');
  //     console.info(`%c${data}`, 'color: #bada55');
  //     const { model } = this.props;
  //     model.codeEditor.forEach((editor) => editor.insertText(data, TextInsertType.Sql));
  //   }
  //   if (action === ResultTableActionType.Show) {
  //     // to show result in elements
  //     console.log('show result:');
  //     console.info(`%c${data}`, 'color: #bada55');
  //     const { onModelFieldChange } = this.props;
  //     onModelFieldChange({ name: 'tableData', value: Option.of(data) });
  //   }
  //   if (action === ResultTableActionType.Clipboard) {
  //     // to clipboard text
  //     console.log('to Clipboard result:');
  //     console.info(`%c${data}`, 'color: #bada55');
  //     this.copyToClipboard(data);
  //   }
  // };

  private renderTable = (data: DataDecorator) => <TableSheet data={data} />;

  private renderDraw = (data: DataDecorator) => <Draw data={data} fill />;

  private onResizeGrid = () => {
    //
    console.log('on Resize Grid');
    //
  };

  render() {
    const { store, serverStructure, model, width } = this.props;
    const resultList = model.queriesResult.map((r) => r.list).getOrElse([]);

    return (
      <React.Fragment>
        <FullScreener enter={this.state.enterFullScreen}>
          <Splitter split="horizontal" minSize={100} defaultSize={300}>
            <SqlEditor
              content={model.content}
              onContentChange={this.onContentChange}
              serverStructure={serverStructure}
              currentDatabase={model.currentDatabase.getOrElse('')}
              onDatabaseChange={this.onDatabaseChange}
              onAction={this.onEditorAction}
              stats={model.queriesResult.map((_) => _.totalStats).orUndefined()}
              ref={this.setEditorRef}
              fill
            />

            <div>
              {model.tableData.map((data) => <div>{data}</div>).orUndefined()}

              <Tabs
                defaultActiveKey="table"
                pinned={model.pinnedResult}
                onAction={this.onResultTabAction}
              >
                <TabsTabPane key="table" tab="Data / Table" style={{ overflowY: 'auto' }}>
                  {!!store.uiStore.executingQueries.length && (
                    <Progress queries={store.uiStore.executingQueries} />
                  )}

                  <DataItemsLayout
                    onResize={this.onResizeGrid}
                    cols={4}
                    itemWidth={4}
                    itemHeight={10}
                    items={resultList}
                    width={width}
                    renderItem={this.renderTable}
                    locked={model.pinnedResult}
                  />
                </TabsTabPane>

                {/*<TabsTabPane key="draw" tab="Chart / Draw">*/}
                {/*  {!!store.uiStore.executingQueries.length && (*/}
                {/*    <Progress queries={store.uiStore.executingQueries} />*/}
                {/*  )}*/}

                {/*  <DataItemsLayout*/}
                {/*    onResize={this.onResizeGrid}*/}
                {/*    cols={4}*/}
                {/*    itemWidth={4}*/}
                {/*    itemHeight={6}*/}
                {/*    items={resultList}*/}
                {/*    width={width}*/}
                {/*    renderItem={this.renderDraw}*/}
                {/*  />*/}
                {/*</TabsTabPane>*/}
              </Tabs>
            </div>
          </Splitter>

          {store.editedTab
            .filter((t) => t.model === model)
            .map((editedTab) => (
              <SaveModal
                fieldName="title"
                fieldValue={editedTab.title}
                onFieldChange={editedTab.changeField}
                onSave={store.saveEditedTab}
                onCancel={store.hideSaveModal}
              />
            ))
            .orUndefined()}
        </FullScreener>
      </React.Fragment>
    );
  }
}
