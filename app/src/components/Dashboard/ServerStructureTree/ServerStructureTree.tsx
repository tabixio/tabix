import React from 'react';
import { observer } from 'mobx-react';
import { Tree, Input } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';
import { ServerStructure } from 'services';
import { Flex } from 'reflexy';
import { ChangeFieldHandler } from '@vzh/mobx-stores';
import { TreeFilter } from 'models';
import { DashboardUIStore } from 'stores';
import ServerTitle, { ServerTitleProps } from './ServerTitle';
import DbTitle from './DbTitle';
import TableTitle from './TableTitle';
import { ContextMenuProps } from './TableTitle/ContextMenu';
import ColumnTitle from './ColumnTitle';
import css from './ServerStructureTree.css';

export enum ColumnAction {
  DoubleClick = 1,
}

interface Props extends Pick<ServerTitleProps, 'onReload'> {
  store: DashboardUIStore;
  structure?: ServerStructure.Server;
  // selectedIds?: string[];
  onColumnAction?: (action: ColumnAction, column: ServerStructure.Column) => void;
  onTableAction?: ContextMenuProps['onContextMenuAction'];
  treeFilter: TreeFilter;
  onChangeTreeFilterField: ChangeFieldHandler<TreeFilter>;
  // filteredIds: string[];
}

// @inject()
@observer
export default class ServerStructureTree extends React.Component<Props> {
  private onNodeDoubleClick = (_: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { onColumnAction, structure } = this.props;
    if (!onColumnAction || !structure) return;

    const key = node.props.eventKey;
    if (!key) return;

    const names = key.split('.');
    if (names.length !== 3) return;

    const [dbName, tableName, columnName] = names;

    const db = structure.databases.find(d => d.name === dbName);
    if (!db) return;

    const table = db.tables.find(t => t.name === tableName);
    if (!table) return;

    const column = table.columns.find(c => c.name === columnName);
    if (!column) return;

    onColumnAction(ColumnAction.DoubleClick, column);
  };

  private onChangeTreeFilterField: ChangeFieldHandler<TreeFilter> = event => {
    this.props.onChangeTreeFilterField(event);
  };

  private onExpand = (keys: string[]) => {
    // console.log('onExpand', keys);
    const { store } = this.props;
    store.updateExpandedKeys(keys);
  };

  private onCollapse = () => {
    this.onExpand([]);
  };

  render() {
    const {
      store,
      // selectedIds,
      structure,
      onReload,
      onTableAction,
      // onChangeTreeFilterField,
      treeFilter,
      // filteredIds,
    } = this.props;

    // console.log(store.treeExpandedKeys);

    return (
      <Flex column>
        <Input.Search
          placeholder="Search"
          name="search"
          value={treeFilter.search}
          onChange={this.onChangeTreeFilterField}
        />

        <Tree
          // autoExpandParent
          // expandedKeys={['ads']}
          // defaultExpandedKeys={['root']}
          // defaultExpandedKeys={filteredIds}
          expandedKeys={store.treeExpandedKeys}
          // defaultExpandAll // very slowly on filtering
          onExpand={this.onExpand}
          selectedKeys={store.treeSelectedKeys}
          onDoubleClick={this.onNodeDoubleClick}
          className={css.root}
        >
          {structure && (
            <Tree.TreeNode
              key={structure.id}
              title={
                <ServerTitle
  title={structure.name}
  onReload={onReload}
  onCollapse={this.onCollapse}
/>
              }
            >
              {/* databases */}
              {structure.databases.map(d => (
                <Tree.TreeNode
                  key={d.id}
                  isLeaf={!d.tables.length}
                  title={<DbTitle name={d.name} tableCount={d.tables.length} />}
                >
                  {/* tables */}
                  {d.tables.map(t => (
                    <Tree.TreeNode
                      key={t.id}
                      isLeaf={!t.columns.length}
                      title={<TableTitle table={t} onContextMenuAction={onTableAction} />}
                    >
                      {/* columns */}
                      {t.columns.map(c => (
                        <Tree.TreeNode
                          key={c.id}
                          // isLeaf
                          title={<ColumnTitle name={c.name} type={c.type} />}
                          className={css.column}
                        />
                      ))}
                    </Tree.TreeNode>
                  ))}
                </Tree.TreeNode>
              ))}
            </Tree.TreeNode>
          )}
        </Tree>
      </Flex>
    );
  }
}
