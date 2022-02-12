import React from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexy';
import { typedInject } from 'module/mobx-utils';
import { Stores, TreeStore } from 'stores';
import { TypedNode } from 'stores/TreeStore';
import { ServerStructure } from 'services';
import SearchInput from './SearchInput';
import Tree, { NodeActions } from './Tree';

interface InjectedProps {
  store: TreeStore;
}

interface Props extends InjectedProps, NodeActions {}
@observer
class ServerStructureTree extends React.Component<Props> {
  attachItems: ServerStructure.SpecialArrayGroupItem = {
    children: [
      {
        id: 'Server overview',
        name: '# Info overview',
        type: 'server.overview',
        children: [
          {
            id: 'Processes',
            name: 'Processes',
            command: ServerStructure.PagesCommands.Processes,
          } as ServerStructure.SpecialItem,
          {
            id: 'Metrics',
            name: 'Metrics',
            command: ServerStructure.PagesCommands.Metrics,
          } as ServerStructure.SpecialItem,
          {
            id: 'Server overview',
            name: 'Server overview',
            command: ServerStructure.PagesCommands.ServerOverview,
          } as ServerStructure.SpecialItem,
          {
            id: 'Server query history',
            name: 'Server query history',
            command: ServerStructure.PagesCommands.SqlHistory,
          } as ServerStructure.SpecialItem,
        ],
      } as ServerStructure.SpecialGroupItem,
    ],
  };

  private load = () => {
    const { store } = this.props;
    store.loadData(this.attachItems);
  };

  componentDidMount() {
    this.load();
  }

  private highlightNode = (node: TypedNode) => {
    const { store } = this.props;
    store.highlightNode(node.id);
  };

  render() {
    const { store, children, ...actions } = this.props;

    return (
      <Flex column fill>
        <SearchInput
          model={store.treeFilter}
          onModelFieldChange={store.treeFilter.changeField}
          items={store.filteredNodes}
          doFilter={store.filter}
          onSelect={this.highlightNode}
        />

        <Tree
          highlightedId={store.highlightedId}
          nodes={store.treeNodes}
          onChange={store.updateTreeNodes}
          onCollapse={store.collapseAll}
          onReload={this.load}
          {...actions}
        />
      </Flex>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.treeStore,
}))(ServerStructureTree);
