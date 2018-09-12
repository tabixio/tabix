import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import { Button, Select } from 'antd';
import { Option } from 'funfix-core';
import { ServerStructure } from 'services';
import { SelectValue } from 'antd/lib/select';
import css from './Toolbar.css';

interface Props extends FlexProps {
  databases: ReadonlyArray<ServerStructure.Database>;
  onDatabaseChange?: (db: ServerStructure.Database) => void;
}

export default class Toolbar extends React.Component<Props> {
  private onDatabaseChange = (value: SelectValue) => {
    const { onDatabaseChange } = this.props;
    if (!onDatabaseChange) return;

    const { databases } = this.props;
    const db = databases.find(_ => _.name === value.toString());
    db && onDatabaseChange(db);
  };

  render() {
    const { databases, ...rest } = this.props;

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

          <Select
            defaultValue={Option.of(databases[0])
              .map(_ => _.name)
              .orUndefined()}
            onChange={this.onDatabaseChange}
          >
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
