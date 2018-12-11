import React from 'react';
import { observer } from 'mobx-react';
import Tree from 'react-virtualized-tree';
// import 'react-virtualized/styles.css';
// import 'react-virtualized-tree/lib/main.css';
import { SelectValue } from 'antd/lib/select';
import { Flex } from 'reflexy';
import { ServerStructure, FilterResult } from 'services';
import { TreeFilter } from 'models';
import { DashboardUIStore } from 'stores';
import SearchInput from './SearchInput';
import renderNode, { defaultRenderers, NodeActions, TypedNode } from './renderNode';
import css from './ServerStructureTree.css';

interface Props extends NodeActions {
  store: DashboardUIStore;
  structure?: ServerStructure.Server;
  filterServerStructure: (filter: TreeFilter) => Promise<void>;
  filteredItems: FilterResult;
}

@observer
export default class ServerStructureTree extends React.Component<Props> {
  private expand = (keys: string[]) => {
    const { store } = this.props;
    store.updateTreeExpandedKeys(keys);
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

    // const { store, filterServerStructure } = this.props;
    // filterServerStructure({ search: '' }); // clear filtered results
    const { store } = this.props;
    store.updateTreeHighlightedKey(item.id);
    this.expandParentsOf(item.id); // add parents of highlighted node to expanded nodes
  };

  render() {
    const { store, structure, filteredItems, filterServerStructure, ...actions } = this.props;
    console.log('render');

    return (
      <Flex column fill className={css.root}>
        <SearchInput
          store={store}
          filteredItems={filteredItems}
          filterServerStructure={filterServerStructure}
          onSelect={this.updateHighlightedNode}
        />

        <Flex grow className={css.tree}>
          <Tree nodeMarginLeft={0} nodes={store.treeNodes} onChange={store.updateTreeNodes as any}>
            {({ node, ...rest }) =>
              renderNode(defaultRenderers, {
                node: node as TypedNode,
                onCollapse: store.collapseAll,
                ...rest,
                ...actions,
              })
            }
          </Tree>
        </Flex>
      </Flex>
    );
  }
}
