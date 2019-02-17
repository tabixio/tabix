import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import { Select, Menu, Icon, Dropdown } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ServerStructure } from 'services';
import { Statistics } from 'services/api/DataDecorator';
import { ClickParam } from 'antd/lib/menu';
import ActionButton, { Props as ActionButtonProps } from './ActionButton';
import RequestStats from '../../RequestStats';
import css from './Toolbar.css';

export enum ActionType {
  Save = 1,
  RunCurrent = 2,
  RunAll = 3,
  Fullscreen = 4,
}

export interface ToolbarProps extends Pick<ActionButtonProps<ActionType>, 'onAction'> {
  databases: ReadonlyArray<ServerStructure.Database>;
  currentDatabase: string;
  onDatabaseChange?: (db: ServerStructure.Database) => void;
  stats?: Statistics;
}

function SpaceH() {
  return <div className={css['space-h']} />;
}

export default class Toolbar extends React.Component<ToolbarProps & FlexProps> {
  private onDatabaseChange = (value: SelectValue) => {
    const { onDatabaseChange } = this.props;
    if (!onDatabaseChange) return;

    const { databases } = this.props;
    const db = databases.find(_ => _.name === value.toString());
    db && onDatabaseChange(db);
  };

  render() {
    const { databases, currentDatabase, onDatabaseChange, onAction, stats, ...rest } = this.props;

    const onActionMenuClick = (click: ClickParam) => {
      onAction(parseInt(click.key, 0), click.domEvent);
    };
    const onActionRunRunCurrent = (event: React.MouseEvent<HTMLElement>) => {
      console.log('onClickRunCurrent');
      onAction(ActionType.RunCurrent, event);
    };

    const menu = (
      <Menu onClick={onActionMenuClick}>
        <Menu.Item key={ActionType.RunAll}>
          <Icon type="forward" />
          Run all ⇧ + ⌘ + ⏎
        </Menu.Item>
      </Menu>
    );

    /*
    *
        <Menu.Item key="112">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="113">
          <Icon type="user" />
          3rd item
        </Menu.Item>
    * */

    return (
      <Flex alignItems="center" {...rest}>
        <Flex shrink={false}>
          <SpaceH />
          <Dropdown.Button size="small" onClick={onActionRunRunCurrent} overlay={menu}>
            <Icon type="caret-right" />
            Run current ⌘ + ⏎
          </Dropdown.Button>

          <SpaceH />

          <ActionButton icon="save" size="small" actionType={ActionType.Save} onAction={onAction} />

          <SpaceH />

          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={currentDatabase}
            onChange={this.onDatabaseChange}
          >
            {databases.map(db => (
              <Select.Option key={db.name} value={db.name}>
                {db.name}
              </Select.Option>
            ))}
          </Select>

          <SpaceH />
        </Flex>

        <Flex grow justifyContent="flex-end">
          {stats && (
            <>
              <SpaceH />
              <RequestStats {...stats} />
            </>
          )}

          <SpaceH />
          <ActionButton
            size="small"
            icon="fullscreen"
            actionType={ActionType.Fullscreen}
            onAction={onAction}
          />
          <SpaceH />
        </Flex>
      </Flex>
    );
  }
}
