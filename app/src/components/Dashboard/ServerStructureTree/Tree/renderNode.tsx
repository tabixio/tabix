import React, { useCallback } from 'react';
import { RendererProps, selectors } from 'react-virtualized-tree';
import classNames from 'classnames';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import { TypedNode } from 'stores/TreeStore';
import ServerTitle, { ServerTitleProps, ServerContextMenuProps } from '../ServerTitle';
import DbTitle from '../DbTitle';
import TableTitle, { TableContextMenuProps } from '../TableTitle';
import ColumnTitle, { ColumnTitleProps } from '../ColumnTitle';
import css from './Tree.css';

export interface NodeActions {
  onColumnAction?: ColumnTitleProps['onAction'];
  onServerAction?: ServerContextMenuProps['onContextMenuAction'];
  onTableAction?: TableContextMenuProps['onContextMenuAction'];
}

export interface TreeActions extends Pick<ServerTitleProps, 'onReload' | 'onCollapse'> {}

type NodeRendererProps = RendererProps<any> & { node: TypedNode };

type RenderNodeProps = NodeRendererProps & NodeActions & TreeActions;

type Renderer = (props: RenderNodeProps) => JSX.Element | null;

function SelectableRenderer({ node: { state }, children }: RenderNodeProps) {
  const selected: boolean = !!state && state.selected;
  const highlighted: boolean = !!state && state.highlighted;
  return (
    <Flex
      hfill
      className={classNames(
        css.selectable,
        selected && css.selected,
        highlighted && css.highlighted
      )}
    >
      {children}
    </Flex>
  );
}

function NodeRenderer({
  node,
  onReload,
  onCollapse,
  onServerAction,
  onTableAction,
  onColumnAction,
}: RenderNodeProps) {
  if (ServerStructure.isServer(node)) {
    return (
      <ServerTitle
        title={node.name}
        server={node}
        onReload={onReload}
        onCollapse={onCollapse}
        onContextMenuAction={onServerAction}
      />
    );
  }

  if (ServerStructure.isDatabase(node)) {
    return <DbTitle name={node.name} tableCount={node.tables.length} />;
  }

  if (ServerStructure.isTable(node)) {
    return <TableTitle table={node} onContextMenuAction={onTableAction} />;
  }

  return <ColumnTitle column={node} onAction={onColumnAction} />;
}

function ExpandableRenderer({ node, onChange, children }: RenderNodeProps) {
  const toggle = useCallback(() => {
    const isExpanded = node.state && node.state.expanded;
    onChange(selectors.updateNode(node, { expanded: !isExpanded }));
  }, []);

  const { hasChildren, isExpanded } = selectors.getNodeRenderOptions(node);

  return (
    <Flex
      wrap={false}
      alignItems="center"
      onDoubleClick={toggle}
      style={{ paddingLeft: `calc(${node.deepness} * 1em)` }}
    >
      <i
        className={classNames(
          css.expandable,
          hasChildren && !isExpanded && css.collapsed,
          hasChildren && isExpanded && css.expanded
        )}
        onClick={toggle}
      />
      {children}
    </Flex>
  );
}

export default function renderNode(
  renderers: Renderer[],
  props: RenderNodeProps
): React.ReactElement<any> {
  const [nextRenderer, ...restRenderers] = renderers;
  const children = restRenderers.length === 0 ? [] : renderNode(restRenderers, props);
  return React.createElement(nextRenderer, props, children);
}

export const defaultRenderers: Renderer[] = [ExpandableRenderer, SelectableRenderer, NodeRenderer];
