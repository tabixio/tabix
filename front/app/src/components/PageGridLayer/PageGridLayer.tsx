import { Childrenable, FlexProps } from 'reflexy';
import React, { useState, useRef, useEffect, useMemo } from 'react';
// import ReactGridLayout, { ItemCallback, WidthProvider } from 'react-grid-layout';
// import GridLayout, {
//   GridLayoutProps,
//   ItemLayoutProps,
// } from '../Dashboard/EditorTabPage/GridLayout';
import DataDecorator from '../../services/api/DataDecorator';
import { TableSheet } from '../TableSheet';
import { AutoSizer } from 'react-virtualized';
import PageGridLayout, { GridLayout } from './PageGridLayout';
import { Layout } from 'antd';
import { v4 as uuid } from 'uuid';

//
// getLayouts({ dashboard }) {
//   const desktop = dashboard.ordered_cards.map(this.getLayoutForDashCard);
//   const mobile = generateMobileLayout({
//     desktopLayout: desktop,
//     // We want to keep the heights for all visualizations equal not to break the visual rhythm
//     // Exceptions are text cards (can take too much vertical space)
//     // and scalar value cards (basically a number and some text on a big card)
//     heightByDisplayType: {
//       text: 2,
//       scalar: 4,
//     },
//     defaultCardHeight: 6,
//   });
//   return { desktop, mobile };
// }
class PageCard {
  public id = '';

  constructor(id = '') {
    this.id = id || uuid();
  }

  public getGridLayout(): GridLayout {
    const initialSize = { width: 4, height: 4 };
    const minSize = initialSize; //visualization.minSize || DEFAULT_CARD_SIZE;

    return {
      i: String('_ID_' + Date.now()), //,dashcard.id),
      x: /* dashcard.col || */ 0,
      y: /* dashcard.row || */ 0,
      w: /* dashcard.sizeX || */ initialSize.width,
      h: /* dashcard.sizeY || */ initialSize.height,
      minW: minSize.width,
      minH: minSize.height,
      // card: this,
    };
  }
}

export interface PageMeta {
  id?: string;
}

export class PageModel {
  private id = '';
  private cards: Array<PageCard> = [];

  constructor(data: PageMeta) {
    this.id = data.id || uuid();
  }

  public addCard() {
    const card = new PageCard();
    this.cards.push(card);
  }
}

export default function PageGridLayer({
  // data,
  // defaultSheetType,
  // title,
  // dataUpdate,
  // defaultHeight = 600,
  // defaultWidth = 600,
  ...flexProps
}: FlexProps) {
  console.log('PageGridLayer->Render');
  // getLayouts

  // const [currentBreakpoint, setCurrentBreakpoint] = useState(
  //   ReactGridLayout.utils.getBreakpointFromWidth(breakpoints, gridWidth),
  // );
  // pinnedResult
  const pinnedResult = false;
  const onLayoutChange = (item: any): void => {
    console.log('ON-onLayoutChange', item);
  };
  const renderGridItem = (item: {
    item: any;
    gridItemWidth: number;
    breakpoint: string;
    totalCols: number;
  }): React.ReactNode => {
    console.log('renderGridItem', item);
    return <div>{item.gridItemWidth}</div>;
  };
  const layouts = () => {
    const desktop = [];

    const dd = new PageCard();
    desktop.push(dd.getGridLayout());
    //
    return { desktop, mobile: desktop };
  };

  const items = [1, 2, 3, 4];
  const editPanel = true;
  return (
    <div
      style={{
        border: '1px solid silver',
        flex: '1 1 auto',
        display: undefined,
      }}
    >
      <AutoSizer>
        {({ width, height }) => {
          if (width === 0) {
            return null;
          }

          const draggable = width <= 769 ? false : editPanel;
          /*
             Disable draggable if mobile device, solving an issue with unintentionally
             moving panels. https://github.com/grafana/grafana/issues/18497
             theme.breakpoints.md = 769
           */

          return (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                border: '1px solid #FF1100',
              }}
            >
              {width} xx {height}
              <PageGridLayout
                onLayoutChange={onLayoutChange}
                items={items}
                // onResizeStop={onResize}
                // getItemLayout={getItemLayout}
                layouts={layouts()}
                isEditing={true}
                width={width}
                itemRenderer={renderGridItem}
                {...flexProps}
              ></PageGridLayout>
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
}
/**
 * - https://github.com/ylacaute/ez-Dashing
 * - https://github.com/metabase/metabase/blob/master/frontend/src/metabase/dashboard/components/grid/GridLayout.jsx
 *
 *
 *
 * Уровень данных, Q1,Q2,L1 - названия DataSource
 * DataSource : [Q1:<DataDecorator|SQL>,Q2:<DataDecorator|SQL>,L1:<...>]
 *
 * Описание сетки:
 * Grid:
 *
 * 1 row - [type: text] - текстовый элемент
 * 2 row - [type: inputs , elements: xxx] - какие элементы `inputs`
 * 3 row - [type: draws , col1: draw,col2 : draw]
 *
 *
 *
 *
 *
 *
 * -----
 *
 * DashboardGrid.tsx
 *
 *
 *
 */
