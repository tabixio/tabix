import React from 'react';
import { observer } from 'mobx-react';
import { Tree } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';
import { SelectValue } from 'antd/lib/select';
import { Flex } from 'reflexy';
import { Option } from 'funfix-core';
import { ServerStructure } from 'services';
import { TreeFilter } from 'models';
import { DashboardUIStore } from 'stores';
import { FilterResult } from 'stores/ServerStructureFilter';
import ServerTitle, { ServerTitleProps } from './ServerTitle';
import DbTitle from './DbTitle';
import TableTitle from './TableTitle';
import { ContextMenuProps } from './TableTitle/ContextMenu';
import ColumnTitle from './ColumnTitle';
import SearchInput from './SearchInput';
import css from './ServerStructureTree.css';

export enum ColumnAction {
  DoubleClick = 1,
}

interface Props extends Pick<ServerTitleProps, 'onReload'> {
  store: DashboardUIStore;
  structure?: ServerStructure.Server;
  onColumnAction?: (action: ColumnAction, column: ServerStructure.Column) => void;
  onTableAction?: ContextMenuProps['onContextMenuAction'];
  filterServerStructure: (filter: TreeFilter) => Promise<void>;
  filteredItems: FilterResult;
}

@observer
export default class ServerStructureTree extends React.Component<Props> {
  private onNodeDoubleClick = (_: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const key = node.props.eventKey;
    if (!key) return;

    // Expand node.
    if (node.props.children) {
      const { store } = this.props;
      const expandedKeys = node.props.expanded
        ? store.treeExpandedKeys.filter(k => k !== key)
        : store.treeExpandedKeys.concat(key);
      this.expand(expandedKeys);
      return;
    }

    // Try invoke onColumnAction.

    const { onColumnAction, structure } = this.props;
    if (!onColumnAction || !structure) return;

    const names = key.split('.');
    if (names.length !== 3) return;

    const [dbName, tableName, columnName] = names;

    Option.of(structure.databases.find(d => d.name === dbName))
      .flatMap(db => Option.of(db.tables.find(t => t.name === tableName)))
      .flatMap(table => Option.of(table.columns.find(c => c.name === columnName)))
      .forEach(onColumnAction.bind(undefined, ColumnAction.DoubleClick));
  };

  private expand = (keys: string[]) => {
    const { store } = this.props;
    store.updateTreeExpandedKeys(keys);
  };

  private collapse = () => this.expand([]);

  private expandParentsOf = (key: string) => {
    const { structure, store } = this.props;
    if (!structure) return;

    const [dbName, tableName, columnName] = key.split('.');
    const expandedKeys = new Set(store.treeExpandedKeys);

    if (dbName) expandedKeys.add(structure.id);

    const db = tableName && structure.databases.find(d => d.name === dbName);
    if (db) expandedKeys.add(db.id);

    const table = db && columnName && db.tables.find(t => t.name === tableName);
    if (table) expandedKeys.add(table.id);

    this.expand(Array.from(expandedKeys));
  };

  private updateHighlightedNode = (key: SelectValue) => {
    const { filteredItems } = this.props;
    const item = filteredItems.find(i => i.id === key);
    if (!item) return;

    // const { store, filterServerStructure } = this.props;
    // filterServerStructure({ search: '' }); // clear filtered results
    const { store } = this.props;
    store.updateTreeHighlightedKey(item.id);
    this.expandParentsOf(item.id); // add parents of highlighted node to expanded nodes
  };

  private highlightTreeNode = ({ props: { eventKey } }: AntTreeNode) =>
    !!(eventKey && this.props.store.treeHighlightedKey.contains(eventKey));

  render() {
    const {
      store,
      structure,
      onReload,
      onTableAction,
      filteredItems,
      filterServerStructure,
    } = this.props;

    return (
      <Flex column>
        <SearchInput
          store={store}
          filteredItems={filteredItems}
          filterServerStructure={filterServerStructure}
          onSelect={this.updateHighlightedNode}
        />

        <Tree
          autoExpandParent={false}
          expandedKeys={store.treeExpandedKeys}
          onExpand={this.expand}
          filterTreeNode={this.highlightTreeNode}
          selectedKeys={store.treeSelectedKeys}
          onClick={this.onNodeDoubleClick}
          className={css.root}
        >
          {structure && (
            <Tree.TreeNode
              key={structure.id}
              title={
                <ServerTitle
                  title={structure.name}
                  onReload={onReload}
                  onCollapse={this.collapse}
                />
              }
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
          )}
        </Tree>
      </Flex>
    );
  }
}
