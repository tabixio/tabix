import React from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

export enum TableActions {
  OpenTable = 1,
  CodeSelectFrom = 2,
  InsertTableName = 3,
  MakeSQLDescribe = 4,
  MakeSQLDropTable = 5,
}

export interface ContextMenuProps {
  onAction?: (action: TableActions) => void;
}

export default class ContextMenu extends React.Component<ContextMenuProps> {
  private onItemClick = (param: ClickParam) => {
    const { onAction } = this.props;
    onAction && TableActions[param.key] && onAction(+param.key as TableActions);
  };

  render() {
    return (
      <Menu onClick={this.onItemClick}>
        <Menu.Item key={TableActions.OpenTable}>Open table</Menu.Item>
        <Menu.Item key={TableActions.CodeSelectFrom}>Code select from</Menu.Item>
        <Menu.Item key={TableActions.InsertTableName}>Insert table name</Menu.Item>
        <Menu.Item key={TableActions.MakeSQLDescribe}>Make SQL Describe</Menu.Item>
        <Menu.Item key={TableActions.MakeSQLDropTable}>Make SQL Drop Table</Menu.Item>
      </Menu>
    );
  }
}
