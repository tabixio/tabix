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

export type TypedNode = FlattenedNode &
  (
    | ServerStructure.Server
    | ServerStructure.Database
    | ServerStructure.Table
    | ServerStructure.Column);

type NodeRendererProps = RendererProps<any> & { node: TypedNode };

type RenderNodeProps = NodeRendererProps & NodeActions & Pick<ServerTitleProps, 'onCollapse'>;

type Renderer = (props: RenderNodeProps) => JSX.Element | null;

export function SelectableRenderer({ node: { state }, children }: RenderNodeProps) {
  const selected: boolean = state && state.selected;
  return (
    <Flex hfill className={classNames(css.selectable, selected && css.selected)}>
      {children}
    </Flex>
  );
}

// function collapseAll(node: Node, {onChange}: RendererProps<any>) {
//   const isExpanded = node.state && node.state.expanded;
//   onChange(selectors.updateNode(node, { expanded: !isExpanded }));
//   node.children && node.children.forEach(collapseAll);
// }

export function NodeRenderer({
  node,
  // onChange,
  onReload,
  // onCollapse,
  onServerAction,
  onTableAction,
  onColumnAction,
}: RenderNodeProps) {
  // const i = Date.now();
  // console.log(i);

  // const collapse = useCallback(
  //   () => {
  //     console.log(i);
  //     // onCollapse && onCollapse();
  //   },
  //   [onCollapse]
  // );

  if (ServerStructure.isServer(node)) {
    return (
      <ServerTitle
        title={node.name}
        server={node}
        onReload={onReload}
        // onCollapse={collapse}
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

export function ExpandableRenderer({ node, onChange, children }: RenderNodeProps) {
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
