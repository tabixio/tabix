import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import { Button, Select } from 'antd';
import { ServerStructure } from 'services';
import { SelectValue } from 'antd/lib/select';
import css from './Toolbar.css';

export interface Props {
  databases: ReadonlyArray<ServerStructure.Database>;
  currentDatabase?: string;
  onDatabaseChange?: (db: ServerStructure.Database) => void;
}

export default class Toolbar extends React.Component<Props & FlexProps> {
  private onDatabaseChange = (value: SelectValue) => {
    const { onDatabaseChange } = this.props;
    if (!onDatabaseChange) return;

    const { databases } = this.props;
    const db = databases.find(_ => _.name === value.toString());
    db && onDatabaseChange(db);
  };

  render() {
    const { databases, currentDatabase, onDatabaseChange, ...rest } = this.props;

    return (
      <Flex alignItems="center" {...rest}>
        <Flex shrink={false}>
          <div className={css['space-h']} />

          <Button.Group>
            <Button icon="forward">Run all ⇧ + ⌘ + ⏎</Button>
            <Button icon="caret-right">Run current ⌘ + ⏎</Button>
          </Button.Group>

          <div className={css['space-h']} />

          <Button icon="save" />

          <div className={css['space-h']} />

          <Select value={currentDatabase} onChange={this.onDatabaseChange}>
            {databases.map(db => (
              <Select.Option key={db.name} value={db.name}>
                {db.name}
              </Select.Option>
            ))}
          </Select>

          <div className={css['space-h']} />
        </Flex>

        <Flex grow justifyContent="flex-end">
          <div className={css['space-h']} />
          <Button icon="fullscreen" />
          <div className={css['space-h']} />
        </Flex>
      </Flex>
    );
  }
}
