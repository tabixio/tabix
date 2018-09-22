import React from 'react';
import { Tree } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';
import { Option } from 'funfix-core';
import { ServerStructure } from 'services';
import ServerTitle, { ServerTitleProps } from './ServerTitle';
import DbTitle from './DbTitle';
import TableTitle from './TableTitle';
import { ContextMenuProps } from './TableTitle/ContextMenu';
import ColumnTitle from './ColumnTitle';
import css from './DbTree.css';

export enum ColumnAction {
  DoubleClick = 1,
}

interface Props extends Pick<ServerTitleProps, 'onReload'> {
  structure: ServerStructure.Structure;
  selectedDatabase?: string;
  onColumnAction?: (action: ColumnAction, column: ServerStructure.Column) => void;
  onTableAction?: ContextMenuProps['onContextMenuAction'];
}

/* eslint-disable react/jsx-wrap-multilines */
export default class DbTree extends React.Component<Props> {
  private onNodeDoubleClick = (_: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { onColumnAction } = this.props;
    if (!onColumnAction) return;

    const key = node.props.eventKey;
    if (!key) return;

    const names = key.split('.');
    if (names.length !== 3) return;

    const [dbName, tableName, columnName] = names;
    const { structure } = this.props;

    const db = structure.databases.find(d => d.name === dbName);
    if (!db) return;

    const table = db.tables.find(t => t.name === tableName);
    if (!table) return;

    const column = table.columns.find(c => c.name === columnName);
    if (!column) return;

    onColumnAction(ColumnAction.DoubleClick, column);
  };

  render() {
    const { selectedDatabase, structure, onReload, onTableAction } = this.props;

    return (
      <Tree
        className={css.root}
        defaultExpandedKeys={['root', 'ads']}
        selectedKeys={Option.of(selectedDatabase)
          .map(db => [db])
          .orUndefined()}
        onDoubleClick={this.onNodeDoubleClick}
      >
        <Tree.TreeNode
          key="root"
          title={<ServerTitle title="Clickhouse Server" onReload={onReload} />}
        >
          {/* databases */}
          {structure.databases.map(d => (
            <Tree.TreeNode
              key={d.id}
              title={<DbTitle name={d.name} tableCount={d.tables.length} />}
            >
              {/* tables */}
              {d.tables.map(t => (
                <Tree.TreeNode
                  key={t.id}
                  title={<TableTitle table={t} onContextMenuAction={onTableAction} />}
                >
                  {/* columns */}
                  {t.columns.map(c => (
                    <Tree.TreeNode
                      key={c.id}
                      title={<ColumnTitle name={c.name} type={c.type} />}
                      className={css.column}
                    />
                  ))}
                </Tree.TreeNode>
              ))}
            </Tree.TreeNode>
          ))}
        </Tree.TreeNode>
      </Tree>
    );
  }
}
