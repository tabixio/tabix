import React from 'react';
import { Dropdown, Tooltip } from 'antd';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import ContextMenu, { ContextMenuProps, TableAction } from './ContextMenu';
import css from './TableTitle.css';

import { TableOutlined } from '@ant-design/icons';

type Props = ContextMenuProps;

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

  private getIconTable = (table: ServerStructure.Table): JSX.Element => {
    return <TableOutlined />;
    // let classEngine = 'table';
    // if (table.engine.match(/Dictionary.*/)) classEngine = 'book';
    // if (table.engine.match(/Distributed.*/)) classEngine = 'cloud';
    // if (table.engine.match(/AggregatingMergeTree.*/)) classEngine = 'fork';
    // if (table.engine.match(/MaterializedView.*/)) classEngine = 'eye';
    // if (table.engine.match(/SummingMergeTree.*/)) classEngine = 'read';
    // if (table.engine.match(/CollapsingMergeTree.*/)) classEngine = 'gateway';
    // if (table.engine.match(/$Merge^/)) classEngine = 'source-fork';
    // if (table.engine.match(/$TinyLog^/)) classEngine = 'fire';
    // return classEngine;
  };

  render() {
    const { table, onContextMenuAction, ...rest } = this.props;
    const br = '\n';
    return (
      <Tooltip title={`${table.engine}${br}${table.size}`} placement="right">
        <Dropdown
          overlay={
            <ContextMenu table={table} onContextMenuAction={this.onContextMenuAction} {...rest} />
          }
          trigger={['contextMenu']}
          visible={this.state.visible}
          onVisibleChange={this.changeVisible}
        >
          <Flex alignItems="center" hfill className={css.root}>
            {this.getIconTable(table)}
            <div>{table.name}</div>
          </Flex>
        </Dropdown>
      </Tooltip>
    );
  }
}
