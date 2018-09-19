import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import { Button, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ServerStructure } from 'services';
import ActionButton, { Props as ActionButtonProps } from './ActionButton';
import css from './Toolbar.css';

export enum ActionType {
  Save = 1,
  RunCurrent = 2,
  RunAll = 3,
  Fullscreen = 4,
}

export interface Props extends Pick<ActionButtonProps<ActionType>, 'onAction'> {
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
    const { databases, currentDatabase, onDatabaseChange, onAction, ...rest } = this.props;

    return (
      <Flex alignItems="center" {...rest}>
        <Flex shrink={false}>
          <div className={css['space-h']} />

          <Button.Group>
            <ActionButton icon="forward" actionType={ActionType.RunAll} onAction={onAction}>
              Run all ⇧ + ⌘ + ⏎
            </ActionButton>
            <ActionButton icon="caret-right" actionType={ActionType.RunCurrent} onAction={onAction}>
              Run current ⌘ + ⏎
            </ActionButton>
          </Button.Group>

          <div className={css['space-h']} />

          <ActionButton icon="save" actionType={ActionType.Save} onAction={onAction} />

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
          <ActionButton icon="fullscreen" actionType={ActionType.Fullscreen} onAction={onAction} />
          <div className={css['space-h']} />
        </Flex>
      </Flex>
    );
  }
}
