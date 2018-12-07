import React from 'react';
import { observer } from 'mobx-react';
import Tree, { Node } from 'react-virtualized-tree';
// import 'react-virtualized/styles.css';
// import 'react-virtualized-tree/lib/main.css';
import { SelectValue } from 'antd/lib/select';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import { TreeFilter } from 'models';
import { DashboardUIStore } from 'stores';
import { FilterResult } from 'stores/ServerStructureFilter';
import SearchInput from './SearchInput';
import renderNode, { defaultRenderers, NodeActions } from './renderNode';
import css from './ServerStructureTree.css';

interface Props extends NodeActions {
  store: DashboardUIStore;
  structure?: ServerStructure.Server;
  filterServerStructure: (filter: TreeFilter) => Promise<void>;
  filteredItems: FilterResult;
}

interface State {
  nodes: Node[];
  structure?: ServerStructure.Server;
}

@observer
export default class ServerStructureTree extends React.Component<Props, State> {
  state: State = {
    nodes: [],
    structure: undefined,
  };

  static getDerivedStateFromProps(
    { structure }: Readonly<Props>,
    prevState: State
  ): Partial<State> | null {
    if (prevState.structure !== structure) {
      console.log('*** generate nodes ***', !!structure);

      const nodes: Node[] =
        (structure && [
          {
            ...structure,
            state: { expanded: true },
            children: structure.databases.map<Node>(d => ({
              ...d,
              children: d.tables.map<Node>(t => ({
                ...t,
                children: t.columns.map<Node>(c => ({ ...c })),
              })),
            })),
          },
        ]) ||
        [];
      return { structure, nodes };
    }
    return null;
  }

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

  private onChange = (nodes: Node[]) => {
    console.log('onChange', nodes);
    this.setState({ nodes });
  };

  render() {
    const { store, structure, filteredItems, filterServerStructure, ...rest } = this.props;

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
          {/* <Tree nodes={store.treeNodes} onChange={this.onChange}> */}
          <Tree nodeMarginLeft={14} nodes={this.state.nodes} onChange={this.onChange}>
            {props => renderNode(defaultRenderers, { ...props, ...rest })}
          </Tree>
        </Flex>
      </Flex>
    );
  }
}
