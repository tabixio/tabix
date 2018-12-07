import React, { useCallback } from 'react';
import { RendererProps, selectors, FlattenedNode } from 'react-virtualized-tree';
import classNames from 'classnames';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import ServerTitle from './ServerTitle';
import DbTitle from './DbTitle';
import css from './ServerStructureTree.css';
import TableTitle from './TableTitle';
import ColumnTitle from './ColumnTitle';

type Renderer = (props: RendererProps<any>) => JSX.Element | null;

export function NodeRenderer({ node }: RendererProps<any>) {
  // console.log(node.parents);
  if (!node.parents.length) {
    return <ServerTitle title={node.name} server={node as any} />;
  }

  const typeNode = node as FlattenedNode &
    (ServerStructure.Database | ServerStructure.Table | ServerStructure.Column);

  if (ServerStructure.isDatabase(typeNode)) {
    return <DbTitle name={typeNode.name} tableCount={typeNode.tables.length} />;
  }

  if (ServerStructure.isTable(typeNode)) {
    return <TableTitle table={typeNode} />;
  }

  return <ColumnTitle name={typeNode.name} type={typeNode.type} />;

  // return (
  //   <span>
  //     {name}
  //     {children}
  //   </span>
  // );
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

export function renderNode(
  renderers: Renderer[],
  props: RendererProps<any>
): React.ReactElement<any> {
  // console.log('render node', props.node.name);
  /* const nextProps = props.iconsClassNameMap
    ? props
    : {
        ...props,
        iconsClassNameMap: {
          expanded: 'anticon anticon-caret-down',
          collapsed: 'anticon anticon-caret-right',
          // expanded: css['arrow-down'],
          // collapsed: css['arrow-right'],
          lastChild: '',
        },
      }; */
  const [nextRenderer, ...restRenderers] = renderers;
  const children = restRenderers.length === 0 ? [] : renderNode(restRenderers, props);
  return React.createElement(nextRenderer, props, children);
}

export const defaultRenderers: Renderer[] = [ExpandableRenderer, NodeRenderer];
