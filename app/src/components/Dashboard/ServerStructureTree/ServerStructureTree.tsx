import React from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexy';
import { typedInject } from '@vzh/mobx-stores';
import { Stores, TreeStore } from 'stores';
import SearchInput from './SearchInput';
import Tree, { NodeActions } from './Tree';

interface InjectedProps {
  store: TreeStore;
}

interface Props extends InjectedProps, NodeActions {}

@observer
class ServerStructureTree extends React.Component<Props> {
  componentDidMount() {
    this.props.store.loadData();
  }
  // private expand = (keys: string[]) => {
  //   const { store } = this.props;
  //   store.updateTreeExpandedKeys(keys);
  // };

  // private expandParentsOf = (key: string) => {
  //   const { structure, store } = this.props;
  //   if (!structure) return;

  //   const [dbName, tableName, columnName] = key.split('.');
  //   const expandedKeys = new Set(store.treeExpandedKeys);

  //   if (dbName) expandedKeys.add(structure.id);

  //   const db = tableName && structure.databases.find(d => d.name === dbName);
  //   if (db) expandedKeys.add(db.id);

  //   const table = db && columnName && db.tables.find(t => t.name === tableName);
  //   if (table) expandedKeys.add(table.id);

  //   this.expand(Array.from(expandedKeys));
  // };

  // private updateHighlightedNode = (key: SelectValue) => {
  //   const { filteredItems } = this.props;
  //   const item = filteredItems.find(i => i.id === key);
  //   if (!item) return;

  //   // const { store, filterServerStructure } = this.props;
  //   // filterServerStructure({ search: '' }); // clear filtered results
  //   const { store } = this.props;
  //   store.updateTreeHighlightedKey(item.id);
  //   this.expandParentsOf(item.id); // add parents of highlighted node to expanded nodes
  // };

  render() {
    const { store, children, ...actions } = this.props;
    console.log('render');

    return (
      <Flex column fill>
        <SearchInput
          model={store.treeFilter}
          onModelFieldChange={store.treeFilter.changeField}
          filteredItems={store.filteredNodes}
          doFilter={store.filter}
          // onSelect={this.updateHighlightedNode}
        />

        <Tree
          nodes={store.treeNodes}
          onChange={store.updateTreeNodes}
          onCollapse={store.collapseAll}
          onReload={store.loadData}
          {...actions}
        />
      </Flex>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.treeStore,
}))(ServerStructureTree);
