import React from 'react';
import { Icon, Dropdown } from 'antd';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import ContextMenu, { ContextMenuProps, TableAction } from './ContextMenu';
import css from './TableTitle.css';

interface Props extends ContextMenuProps {}

export default class TableTitle extends React.Component<Props> {
  state = { visible: false };

  private onContextMenuAction = (action: TableAction, table: ServerStructure.Table) => {
    this.changeVisible(false);
    const { onContextMenuAction } = this.props;
    onContextMenuAction && onContextMenuAction(action, table);
  };

  private changeVisible = (visible?: boolean) => {
    this.setState({ visible: !!visible });
  };

  render() {
    const { table, onContextMenuAction, ...rest } = this.props;
    return (
      <Dropdown
        overlay={
          <ContextMenu table={table} onContextMenuAction={this.onContextMenuAction} {...rest} />
        }
        trigger={['contextMenu']}
        visible={this.state.visible}
        onVisibleChange={this.changeVisible}
      >
        <Flex alignItems="center" hfill className={css.root}>
          <Icon type="table" theme="outlined" />
          <div>{table.name}</div>
        </Flex>
      </Dropdown>
    );
  }
}
