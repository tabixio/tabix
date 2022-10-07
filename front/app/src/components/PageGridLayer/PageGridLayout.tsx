/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import { Layout, Layouts, Responsive as ReactGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Childrenable } from 'reflexy';

const MOBILE_BREAKPOINT = 752;
export const GRID_WIDTH = 18;
export const GRID_ASPECT_RATIO = 4 / 3;
export const GRID_COLUMNS = {
  desktop: GRID_WIDTH,
  mobile: 1,
};
export const MIN_ROW_HEIGHT = 54;

export const GRID_BREAKPOINTS = {
  desktop: MOBILE_BREAKPOINT + 1,
  mobile: MOBILE_BREAKPOINT,
};

export type GridLayout = ReactGridLayout.Layout;
export interface PageGridLayoutProps<Item = any> extends Childrenable {
  // cols: number;
  items: Array<any>;
  itemRenderer: (item: {
    item: any;
    gridItemWidth: number;
    breakpoint: string;
    totalCols: number;
  }) => React.ReactNode;

  layouts: { mobile: Layout[]; desktop: Layout[] };
  width: number;
  isEditing: boolean;
  onLayoutChange: (item: any) => void;
  //getItemLayout?: (index: number, item: Item, props: ItemLayoutProps) => ReactGridLayout.Layout;
  //onResizeStop?: ItemCallback | undefined;
}
export interface PageGridCellSize {
  width: number;
  height: number;
}
function generateGridBackground(
  cellSize: PageGridCellSize,
  margin: Array<number>,
  cols: any,
  gridWidth: number
) {
  const XMLNS = 'http://www.w3.org/2000/svg';
  const [horizontalMargin, verticalMargin] = margin;
  const rowHeight = cellSize.height + 4; //verticalMargin;
  const cellStrokeColor = '#403031';

  const y = 0;
  const w = cellSize.width;
  const h = cellSize.height;

  const rectangles = Array.from({ length: cols }, (n, i) => {
    const x = i * (cellSize.width + horizontalMargin);
    return `<rect stroke='${cellStrokeColor}' stroke-width='1' fill='none' x='${x}' y='${y}' width='${w}' height='${h}'/>`;
  });

  const svg = [
    `<svg xmlns='${XMLNS}' width='${gridWidth}' height='${rowHeight}'>`,
    ...rectangles,
    `</svg>`,
  ].join('');

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

function getRowHeight(width: number) {
  const hasScroll = window.innerWidth > document.documentElement.offsetWidth;
  const aspectHeight = width / GRID_WIDTH / GRID_ASPECT_RATIO;
  const actualHeight = Math.max(aspectHeight, MIN_ROW_HEIGHT);

  // prevent infinite re-rendering when the scroll bar appears/disappears
  // https://github.com/metabase/metabase/issues/17229
  return hasScroll ? Math.ceil(actualHeight) : Math.floor(actualHeight);
}

function PageGridLayout({
  items,
  itemRenderer,

  layouts,
  width: gridWidth,

  isEditing,
  onLayoutChange,
  ...props
}: PageGridLayoutProps) {
  // Preset
  console.log('PageGridLayout->');
  const rowHeight = getRowHeight(gridWidth);
  const breakpoints = GRID_BREAKPOINTS;
  const columnsMap = GRID_COLUMNS;
  const marginMap = { desktop: [6, 6], mobile: [6, 10] };
  //
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    // @ts-ignore
    ReactGridLayout.utils.getBreakpointFromWidth(breakpoints, gridWidth)
  );

  console.log('PageGridLayout->currentBreakpoint', currentBreakpoint);

  const onLayoutChangeWrapped = useCallback(
    (nextLayout) => {
      onLayoutChange({
        layout: nextLayout,
        // Calculating the breakpoint right here,
        // so we're definitely passing the most recent one
        // Workaround for https://github.com/react-grid-layout/react-grid-layout/issues/889
        // @ts-ignore
        breakpoint: ReactGridLayout.utils.getBreakpointFromWidth(breakpoints, gridWidth),
      });
    },
    [onLayoutChange, breakpoints, gridWidth]
  );

  const onBreakpointChange = useCallback((newBreakpoint) => {
    setCurrentBreakpoint(newBreakpoint);
  }, []);

  const margin = useMemo(() => marginMap[currentBreakpoint], [marginMap, currentBreakpoint]);

  console.log('margin', margin);
  const layout = useMemo(() => layouts[currentBreakpoint], [layouts, currentBreakpoint]);

  const cols = useMemo(() => columnsMap[currentBreakpoint], [columnsMap, currentBreakpoint]);

  const cellSize = useMemo(() => {
    const marginSlotsCount = cols - 1;
    const [horizontalMargin] = margin;
    const totalHorizontalMargin = marginSlotsCount * horizontalMargin;
    const freeSpace = gridWidth - totalHorizontalMargin;
    return {
      width: freeSpace / cols,
      height: rowHeight,
    };
  }, [cols, gridWidth, rowHeight, margin]);

  const renderItem = useCallback(
    (item) => {
      const itemLayout = layout.find((l: GridLayout) => String(l.i) === String(item.id));
      if (!itemLayout) {
        console.warn('Not find renderItem for item = ', item);
      }
      const gridItemWidth = cellSize.width * (itemLayout ? itemLayout.w : 1);
      return itemRenderer({
        item,
        gridItemWidth,
        breakpoint: currentBreakpoint,
        totalCols: cols,
      });
    },
    [layout, cellSize, itemRenderer, currentBreakpoint, cols]
  );
  const height = useMemo(() => {
    let lowestLayoutCellPoint = Math.max(...layout.map((l: GridLayout) => l.y + l.h));
    if (isEditing) {
      lowestLayoutCellPoint += Math.ceil(window.innerHeight / cellSize.height);
    }
    // eslint-disable-next-line no-unused-vars
    const [horizontalMargin, verticalMargin] = margin;
    return (cellSize.height + verticalMargin) * lowestLayoutCellPoint;
  }, [cellSize.height, layout, margin, isEditing]);

  const background = useMemo(
    () => generateGridBackground(cellSize, margin, cols, gridWidth),
    [cellSize, gridWidth, margin, cols]
  );
  console.log('ReactGridLayout-> Recall', cellSize, gridWidth, margin, cols);
  const style = useMemo(
    () => ({
      width: gridWidth,
      height,
      background: isEditing ? background : '',
    }),
    [gridWidth, height, background, isEditing]
  );

  // console.log('ReactGridLayout-> Recall', gridWidth, height, background, isEditing);
  // console.log('ReactGridLayout-> Style', style);

  const isMobile = currentBreakpoint === 'mobile';

  // https://github.com/react-grid-layout/react-grid-layout#performance
  const children = useMemo(() => items.map(renderItem), [items, renderItem]);
  console.log('ReactGridLayout-> Style', style);

  return (
    <ReactGridLayout
      breakpoints={breakpoints}
      cols={columnsMap}
      layouts={layouts}
      width={gridWidth}
      margin={margin}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
      isDraggable={isEditing && !isMobile}
      isResizable={isEditing && !isMobile}
      {...props}
      compactType="vertical"
      autoSize={false}
      onLayoutChange={onLayoutChangeWrapped}
      onBreakpointChange={onBreakpointChange}
      style={style}
    >
      {children}
    </ReactGridLayout>
  );
}

export default PageGridLayout;
