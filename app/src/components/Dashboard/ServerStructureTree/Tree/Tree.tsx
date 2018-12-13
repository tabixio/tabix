import React from 'react';
import { Flex } from 'reflexy';
import { observer } from 'mobx-react';
import VirtualizedTree, { FlattenedNode } from 'react-virtualized-tree';
import { TreeStore } from 'stores';
import { TypedNode } from 'stores/TreeStore';
import renderNode, { defaultRenderers, NodeActions, TreeActions } from './renderNode';
import css from './Tree.css';

export interface TreeProps extends NodeActions, TreeActions {
  nodes: TypedNode[];
  onChange: TreeStore['updateTreeNodes'];
}

function Tree({ nodes, onChange, onCollapse, ...actions }: TreeProps) {
  console.log('render tree');

  return (
    <Flex grow className={css.root}>
      <VirtualizedTree nodeMarginLeft={0} nodes={nodes} onChange={onChange as any}>
        {({ node, ...rest }) =>
          renderNode(defaultRenderers, {
            node: node as FlattenedNode & TypedNode,
            onCollapse,
            ...rest,
            ...actions,
          })
        }
      </VirtualizedTree>
    </Flex>
  );
}

export default observer(Tree);
