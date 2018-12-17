import React from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexy';
import { SelectValue } from 'antd/lib/select';
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
    const { store } = this.props;
    store.loadData();
  }

  private highlightNode = (key: SelectValue) => {
    const { store } = this.props;
    store.highlightNode(key.toString());
  };

  render() {
    const { store, children, ...actions } = this.props;

    return (
      <Flex column fill>
        <SearchInput
          model={store.treeFilter}
          onModelFieldChange={store.treeFilter.changeField}
          filteredItems={store.filteredNodes}
          doFilter={store.filter}
          onSelect={this.highlightNode}
        />

        <Tree
          highlightedId={store.highlightedId}
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
