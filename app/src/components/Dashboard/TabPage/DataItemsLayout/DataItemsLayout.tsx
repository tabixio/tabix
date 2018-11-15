import React from 'react';
import { QueryResult } from 'models';
import DataDecorator from 'services/api/DataDecorator';
import GridLayout, { GridLayoutProps, ItemLayoutProps, getItemLayoutDefault } from '../GridLayout';
import css from './DataItemsLayout.css';

interface Props extends GridLayoutProps {
  items: QueryResult[];
  renderItem: (data: DataDecorator) => React.ReactNode;
}

function getItemLayout(
  index: number,
  item: QueryResult,
  props: ItemLayoutProps
): ReactGridLayout.Layout {
  return {
    ...getItemLayoutDefault(index, item, props),
    h: item.result.map(() => props.itemHeight).getOrElse(2),
    i: item.id,
  };
}

export default function DataItemsLayout({ items, renderItem, ...rest }: Props) {
  return (
    <GridLayout items={items} getItemLayout={getItemLayout} {...rest}>
      {items.map(item => (
        <div key={item.id} className={css['grid-item']}>
          {item.result.fold(
            ex => (
              <div className={css.error}>{ex}</div>
            ),
            data => renderItem(data)
          )}
        </div>
      ))}
    </GridLayout>
  );
}
