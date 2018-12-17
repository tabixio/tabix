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
  highlightedId?: TypedNode['id'];
}

// Tweak wrong typed VirtualizedTree propTypes.
/* eslint-disable dot-notation, react/forbid-foreign-prop-types */
if (VirtualizedTree['propTypes'] && VirtualizedTree['propTypes'].scrollToId) {
  const { scrollToId, ...rest } = VirtualizedTree['propTypes'];
  VirtualizedTree['propTypes'] = rest;
}
/* eslint-enable */

function Tree({ nodes, onChange, highlightedId, onCollapse, ...actions }: TreeProps) {
  return (
    <Flex grow className={css.root}>
      <VirtualizedTree
        nodeMarginLeft={0}
        nodes={nodes}
        onChange={onChange as any}
        scrollToId={highlightedId as any}
      >
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
