import React from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { ServerStructure } from 'services';

export enum TableAction {
  OpenTable = 1,
  CodeSelectFrom = 2,
  InsertTableName = 3,
  MakeSQLDescribe = 4,
  MakeSQLDropTable = 5,
}

export interface ContextMenuProps {
  table: ServerStructure.Table;
  onContextMenuAction?: (action: TableAction, table: ServerStructure.Table) => void;
}

export default class ContextMenu extends React.Component<ContextMenuProps> {
  private onItemClick = (param: ClickParam) => {
    const { onContextMenuAction, table } = this.props;
    onContextMenuAction &&
      TableAction[param.key] &&
      onContextMenuAction(+param.key as TableAction, table);
  };

  render() {
    return (
      <Menu onClick={this.onItemClick}>
        <Menu.Item key={TableAction.OpenTable}>Open table</Menu.Item>
        <Menu.Item key={TableAction.CodeSelectFrom}>Code select from</Menu.Item>
        <Menu.Item key={TableAction.InsertTableName}>Insert table name</Menu.Item>
        <Menu.Item key={TableAction.MakeSQLDescribe}>Make SQL Describe</Menu.Item>
        <Menu.Item key={TableAction.MakeSQLDropTable}>Make SQL Drop Table</Menu.Item>
      </Menu>
    );
  }
}
