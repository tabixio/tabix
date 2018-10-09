import React from 'react';
import { observer } from 'mobx-react';
import { Tree, Input, AutoComplete } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';
import { DataSourceItemObject } from 'antd/lib/auto-complete';
import { SelectValue } from 'antd/lib/select';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import { TreeFilter, MIN_SEARCH_LENGTH } from 'models';
import { DashboardUIStore } from 'stores';
import { FilterResult } from 'stores/ServerStructureFilter';
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
  onColumnAction?: (action: ColumnAction, column: ServerStructure.Column) => void;
  onTableAction?: ContextMenuProps['onContextMenuAction'];
  filterServerStructure: (filter: TreeFilter) => Promise<void>;
  filteredItems: FilterResult;
}

/* eslint-disable no-nested-ternary */

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

  private expand = (keys: string[]) => {
    const { store } = this.props;
    store.updateTreeExpandedKeys(keys);
  };

  private collapse = () => this.expand([]);

  private filterTimeout: number = 0;

  private search = (value: string) => {
    const { store, filterServerStructure } = this.props;
    store.updateFiltering(true);
    store.treeFilter.changeField({ name: 'search', value });
    store.updateTreeHighlightedKey(undefined); // remove highlighted node when search value changed

    if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
    this.filterTimeout = window.setTimeout(
      () =>
        filterServerStructure(store.treeFilter).finally(() => {
          store.updateFiltering(false);
        }),
      300
    );
  };

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

    const { store, filterServerStructure } = this.props;
    filterServerStructure({ search: '' }); // clear filtered results
    store.updateTreeHighlightedKey(item.id);
    this.expandParentsOf(item.id); // add parents of highlighted node to expanded nodes
  };

  private highlightTreeNode = ({ props: { eventKey } }: AntTreeNode) =>
    !!(eventKey && this.props.store.treeHighlightedKey.contains(eventKey));

  render() {
    const { store, structure, onReload, onTableAction, filteredItems } = this.props;
    // todo: add table name and db to list
    const found = filteredItems.map<DataSourceItemObject>(i => ({ value: i.id, text: i.name }));

    const notFoundContent =
      store.treeFilter.search.length === 0
        ? undefined
        : store.treeFilter.search.length < MIN_SEARCH_LENGTH
          ? 'Type more symbols to search'
          : store.isFiltering
            ? 'Filtering...'
            : 'Not found';

    return (
      <Flex column>
        <AutoComplete
          dataSource={found}
          onSearch={this.search}
          onSelect={this.updateHighlightedNode}
          placeholder="Search"
          notFoundContent={notFoundContent}
        >
          <Input.Search />
        </AutoComplete>

        <Tree
          autoExpandParent={false}
          expandedKeys={store.treeExpandedKeys}
          onExpand={this.expand}
          filterTreeNode={this.highlightTreeNode}
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
                  onCollapse={this.collapse}
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
