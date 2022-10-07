import React, { useMemo } from 'react';
import { Childrenable } from 'reflexy';
import ReactGridLayout, { ItemCallback, WidthProvider } from 'react-grid-layout';
import { Omit } from 'typelevel-ts';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayoutFilled = WidthProvider(ReactGridLayout);

export type ItemLayoutProps = Omit<GridLayoutProps, 'items' | 'getItemLayout' | 'width'>;

export interface GridLayoutProps<Item = any> extends Childrenable {
  items: ReadonlyArray<Item>;
  cols: number;
  itemWidth: number;
  itemHeight: number;
  rowHeight?: number;
  width?: number;
  locked?: boolean;
  getItemLayout?: (index: number, item: Item, props: ItemLayoutProps) => ReactGridLayout.Layout;
  onResizeStop?: ItemCallback | undefined;
}

export function getItemLayoutDefault(
  index: number,
  _item: any,
  { itemWidth, itemHeight, cols }: ItemLayoutProps
): ReactGridLayout.Layout {
  return {
    x: (index * itemWidth) % cols,
    y: 0,
    w: itemWidth,
    h: itemHeight,
    minH: 2,
    i: index.toString(),
  };
}

function calculateLayout({
  items,
  cols,
  itemWidth,
  itemHeight,
  getItemLayout = getItemLayoutDefault,
}: GridLayoutProps): ReactGridLayout.Layout[] {
  return items.map<ReactGridLayout.Layout>((item, i) =>
    getItemLayout(i, item, { itemHeight, itemWidth, cols })
  );
}

export default function GridLayout(props: GridLayoutProps) {
  const {
    width,
    rowHeight = 50,
    children,
    items,
    cols,
    itemHeight,
    itemWidth,
    locked,
    getItemLayout,
    onResizeStop,
  } = props;

  if (!items.length) return null;

  const layout = useMemo(
    () => calculateLayout(props),
    [cols, items, itemHeight, itemWidth, getItemLayout]
  );

  // refactor: detect initial width through props
  const GLayout = width ? ReactGridLayout : ReactGridLayoutFilled;
  // const Layout = ReactGridLayoutFilled;

  return (
    <GLayout
      onResizeStop={onResizeStop}
      layout={layout}
      cols={cols}
      width={width}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
      isDraggable={!locked}
      isResizable={!locked}
      // isRearrangeable={!locked}
      useCSSTransforms={false}
    >
      {children}
    </GLayout>
  );
}
