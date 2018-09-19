import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Input } from 'antd';
import { Option } from 'funfix-core';
import { Flex } from 'reflexy';
import { Props as SplitPaneProps } from 'react-split-pane';
import { ChangeFieldHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import Splitter from 'components/Splitter';
import { Tab } from 'models';
// import SqlEditor, { Props as SqlEditorProps } from '../SqlEditor';
import { DashboardStore } from 'stores';
import SqlEditor from '../SqlEditor';
import { ActionType } from '../SqlEditor/Toolbar';
// import css from './Toolbar.css';

// interface Props extends SplitPaneProps, Pick<SqlEditorProps, 'onAction'> {
interface Props extends SplitPaneProps {
  model: Tab;
  changeField: ChangeFieldHandler;
  databases: ReadonlyArray<ServerStructure.Database>;
  store: DashboardStore;
}

@observer
export default class TabPage extends React.Component<Props> {
  private onContentChange = (content: string) => {
    const { changeField } = this.props;
    changeField({ name: 'content', value: content });
  };

  private onDatabaseChange = (db: ServerStructure.Database) => {
    const { changeField } = this.props;
    changeField({ name: 'currentDatabase', value: Option.of(db.name) });
  };

  private onAction = (action: ActionType) => {
    // console.log(action);
    switch (action) {
      case ActionType.Save: {
        const { store } = this.props;
        store.uiStore.showSaveModal();
        break;
      }
      case ActionType.Fullscreen:
        break;
      case ActionType.RunCurrent:
        break;
      case ActionType.RunAll:
        break;
      default:
        break;
    }
  };

  render() {
    const { store, model, changeField, databases, ...rest } = this.props;

    return (
      <React.Fragment>
        <Splitter split="horizontal" minSize={100} defaultSize={350} {...rest}>
          <SqlEditor
            content={model.content}
            onContentChange={this.onContentChange}
            databases={databases}
            currentDatabase={model.currentDatabase.orUndefined()}
            onDatabaseChange={this.onDatabaseChange}
            onAction={this.onAction}
            fill
          />

          <Flex>123</Flex>
        </Splitter>

        {store.uiStore.tabViewState.showSaveModal && (
          <Modal
            visible={store.uiStore.tabViewState.showSaveModal}
            title="Save"
            onOk={store.saveTab}
            onCancel={store.uiStore.hideSaveModal}
          >
            <Input placeholder="New name" name="title" value={model.title} onChange={changeField} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
