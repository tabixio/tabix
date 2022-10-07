import React from 'react';
import { Dropdown, Tooltip } from 'antd';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import ContextMenu, { ContextMenuProps, TableAction } from './ContextMenu';
import css from './TableTitle.css';
import {
  BookOutlined,
  CloudOutlined,
  EyeOutlined,
  FireOutlined,
  ForkOutlined,
  GatewayOutlined,
  ReadOutlined,
  ShopOutlined,
  SmallDashOutlined,
  TableOutlined,
} from '@ant-design/icons';

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
    // let classEngine = 'table';
    if (table.engine.match(/Dictionary.*/)) return <BookOutlined />;
    if (table.engine.match(/Distributed.*/)) return <CloudOutlined />;
    if (table.engine.match(/AggregatingMergeTree.*/)) return <ForkOutlined />;
    if (table.engine.match(/MaterializedView.*/)) return <EyeOutlined />;
    if (table.engine.match(/SummingMergeTree.*/)) return <ReadOutlined />;
    if (table.engine.match(/CollapsingMergeTree.*/)) return <GatewayOutlined />;
    if (table.engine.match(/$Merge^/)) return <ShopOutlined />;
    if (table.engine.match(/$TinyLog^/)) return <FireOutlined />;
    return <TableOutlined />;
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
