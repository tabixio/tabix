import React, { useMemo } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Omit } from 'typelevel-ts';
import { Childrenable } from 'reflexy';

const ReactGridLayoutFilled = WidthProvider(ReactGridLayout);

export type ItemLayoutProps = Omit<GridLayoutProps, 'items' | 'getItemLayout' | 'width'>;

export interface GridLayoutProps extends Childrenable {
  items: any[];
  cols: number;
  itemWidth: number;
  itemHeight: number;
  rowHeight?: number;
  width?: number;
  getItemLayout?: (index: number, item: any, props: ItemLayoutProps) => ReactGridLayout.Layout;
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
    getItemLayout,
  } = props;

  if (!items.length) return null;

  const layout = useMemo(() => calculateLayout(props), [
    cols,
    items,
    itemHeight,
    itemWidth,
    getItemLayout,
  ]);

  // refactor: detect initial width through props
  const Layout = width ? ReactGridLayout : ReactGridLayoutFilled;

  return (
    <Layout
      layout={layout}
      cols={cols}
      width={width}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
    >
      {children}
    </Layout>
  );
}
