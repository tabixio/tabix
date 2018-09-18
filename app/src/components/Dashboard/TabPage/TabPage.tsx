import React from 'react';
import { observer } from 'mobx-react';
import { Option } from 'funfix-core';
import { Flex } from 'reflexy';
import { Props as SplitPaneProps } from 'react-split-pane';
import { ServerStructure } from 'services';
import Splitter from 'components/Splitter';
import { TabModel } from 'models';
import SqlEditor from '../SqlEditor';
// import css from './Toolbar.css';

interface Props extends SplitPaneProps {
  model: TabModel;
  databases: ReadonlyArray<ServerStructure.Database>;
}

@observer
export default class TabPage extends React.Component<Props> {
  private onContentChange = (content: string) => {
    const { model } = this.props;
    model.changeField({ target: { name: 'content', value: content } });
  };

  private onDatabaseChange = (db: ServerStructure.Database) => {
    const { model } = this.props;
    model.changeField({ target: { name: 'currentDatabase', value: Option.of(db.name) } });
  };

  render() {
    const { model, databases, ...rest } = this.props;

    return (
      <Splitter split="horizontal" minSize={100} defaultSize={350} {...rest}>
        <SqlEditor
          content={model.content}
          onContentChange={this.onContentChange}
          databases={databases}
          currentDatabase={model.currentDatabase.orUndefined()}
          onDatabaseChange={this.onDatabaseChange}
          fill
        />

        <Flex>123</Flex>
      </Splitter>
    );
  }
}
