import React from 'react';
import { Tree } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';
import { ServerStructure } from 'services';
import RootTitle, { RootTitleProps } from './RootTitle';
import DbTitle from './DbTitle';
import TableTitle from './TableTitle';
import ColumnTitle from './ColumnTitle';
import css from './DbTree.css';

interface Props extends Pick<RootTitleProps, 'onReload'> {
  structure: ServerStructure.Structure;
  onColumnClick?: (column: ServerStructure.Column) => void;
}

export default class DbTree extends React.Component<Props> {
  private onNodeClick = (_: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { onColumnClick } = this.props;
    if (!onColumnClick) return;

    const key = node.props.eventKey;
    if (!key) return;

    const names = key.split('.');
    if (names.length !== 3) return;

    const { structure } = this.props;

    const db = structure.databases.find(d => d.name === names[0]);
    if (!db) return;

    const table = db.tables.find(t => t.name === names[1]);
    if (!table) return;

    const column = table.columns.find(c => c.name === names[2]);
    if (!column) return;

    onColumnClick(column);
  };

  render() {
    const { structure, onReload } = this.props;

    return (
      <Tree
        className={css.root}
        defaultExpandedKeys={['root']}
        selectable={false}
        onClick={this.onNodeClick}
      >
        <Tree.TreeNode
          key="root"
          title={<RootTitle title="Clickhouse Server" onReload={onReload} />}
        >
          {/* databases */}
          {structure.databases.map(d => (
            <Tree.TreeNode
              key={d.name}
              title={<DbTitle name={d.name} tableCount={d.tables.length} />}
            >
              {/* tables */}
              {d.tables.map(t => (
                <Tree.TreeNode key={`${t.database}.${t.name}`} title={<TableTitle name={t.name} />}>
                  {/* columns */}
                  {t.columns.map(c => (
                    <Tree.TreeNode
                      key={`${c.database}.${c.table}.${c.name}`}
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
