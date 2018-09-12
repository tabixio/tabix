import React from 'react';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import Splitter from 'components/Splitter';
import SqlEditor from '../SqlEditor';
// import css from './Toolbar.css';

interface Props {
  databases: ReadonlyArray<ServerStructure.Database>;
}

export default class TabPage extends React.Component<Props> {
  render() {
    const { databases } = this.props;

    return (
      <Splitter split="horizontal" minSize={100} defaultSize={350}>
        <SqlEditor content="" databases={databases} fill />

        <Flex>123</Flex>
      </Splitter>
    );
  }
}
