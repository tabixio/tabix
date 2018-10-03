import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Input } from 'antd';
import { Option } from 'funfix-core';
import { Flex } from 'reflexy';
import { Props as SplitPaneProps } from 'react-split-pane';
import { ChangeFieldHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { Tab } from 'models';
import { DashboardStore } from 'stores';
import Splitter from 'components/Splitter';
import SqlEditor, { CodeEditor } from './SqlEditor';
import { ActionType } from './SqlEditor/Toolbar';
import DataTable from './DataTable';

interface Props extends SplitPaneProps {
  model: Tab;
  changeTabModelField: ChangeFieldHandler<Tab>;
  databases: ReadonlyArray<ServerStructure.Database>;
  store: DashboardStore;
}

@observer
export default class TabPage extends React.Component<Props> {
  private onContentChange = (content: string) => {
    const { changeTabModelField } = this.props;
    changeTabModelField({ name: 'content', value: content });
  };

  private onDatabaseChange = (db: ServerStructure.Database) => {
    const { changeTabModelField } = this.props;
    changeTabModelField({ name: 'currentDatabase', value: Option.of(db.name) });
  };

  private setEditorRef = (editor?: CodeEditor) => {
    const { changeTabModelField } = this.props;
    changeTabModelField({ name: 'codeEditor', value: Option.of(editor) });
  };

  private onAction = (action: ActionType) => {
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
        store.execCode();
        break;
      }
      case ActionType.RunAll:
        break;
      default:
        break;
    }
  };

  render() {
    const { store, model, changeTabModelField, databases, ...rest } = this.props;

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

          <Flex hfill>{model.data.map(data => <DataTable data={data} />).orUndefined()}</Flex>
        </Splitter>

        {store.uiStore.editedTab
          .filter(t => t.model === model)
          .map(editedTab => (
            <Modal
              visible
              title="Save"
              onOk={store.saveEditedTab}
              onCancel={store.uiStore.hideSaveModal}
            >
              <Input
                placeholder="New name"
                autoFocus
                name="title"
                value={editedTab.title}
                onChange={editedTab.changeField}
              />
            </Modal>
          ))
          .orUndefined()}
      </React.Fragment>
    );
  }
}
