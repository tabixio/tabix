import React, { useCallback } from 'react';
import { RendererProps, selectors, FlattenedNode } from 'react-virtualized-tree';
import classNames from 'classnames';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import ServerTitle, { ServerTitleProps, ServerContextMenuProps } from './ServerTitle';
import DbTitle from './DbTitle';
import TableTitle, { TableContextMenuProps } from './TableTitle';
import ColumnTitle, { ColumnTitleProps } from './ColumnTitle';
import css from './ServerStructureTree.css';

export interface NodeActions extends Pick<ServerTitleProps, 'onReload'> {
  onColumnAction?: ColumnTitleProps['onAction'];
  onServerAction?: ServerContextMenuProps['onContextMenuAction'];
  onTableAction?: TableContextMenuProps['onContextMenuAction'];
}

type RenderNodeProps = RendererProps<any> & NodeActions;

type Renderer = (props: RendererProps<any>) => JSX.Element | null;

export function SelectableRenderer({ node: { state }, children }: RenderNodeProps) {
  const selected: boolean = state && state.selected;
  return (
    <Flex hfill className={classNames(selected && css.selectable)}>
      {children}
    </Flex>
  );
}

export function NodeRenderer({
  node,
  onReload,
  onServerAction,
  onTableAction,
  onColumnAction,
}: RenderNodeProps) {
  if (!node.parents.length) {
    return (
      <ServerTitle
        title={node.name}
        server={node as any}
        onReload={onReload}
        onContextMenuAction={onServerAction}
      />
    );
  }

  const typeNode = node as FlattenedNode &
    (ServerStructure.Database | ServerStructure.Table | ServerStructure.Column);

  if (ServerStructure.isDatabase(typeNode)) {
    return <DbTitle name={typeNode.name} tableCount={typeNode.tables.length} />;
  }

  if (ServerStructure.isTable(typeNode)) {
    return <TableTitle table={typeNode} onContextMenuAction={onTableAction} />;
  }

  return <ColumnTitle column={typeNode} onAction={onColumnAction} />;
}

export function ExpandableRenderer({ node, onChange, children }: RendererProps<any>) {
  const toggle = useCallback(() => {
    const { isExpanded } = selectors.getNodeRenderOptions(node);
    onChange(selectors.updateNode(node, { expanded: !isExpanded }));
  }, []);

  const { hasChildren, isExpanded } = selectors.getNodeRenderOptions(node);

  return (
    <Flex wrap={false} alignItems="center" onDoubleClick={toggle}>
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
