import React from 'react';
import { QueryResult } from 'models';
import DataDecorator from 'services/api/DataDecorator';
import { ItemCallback } from 'react-grid-layout';
import GridLayout, { getItemLayoutDefault, GridLayoutProps, ItemLayoutProps } from '../GridLayout';
import css from './DataItemsLayout.css';

interface Props extends GridLayoutProps<QueryResult> {
  renderItem: (data: DataDecorator) => React.ReactNode;
  onResize: ItemCallback | undefined;
}

function getItemLayout(
  index: number,
  item: QueryResult,
  props: ItemLayoutProps
): ReactGridLayout.Layout {
  return {
    ...getItemLayoutDefault(index, item, props),
    h: item.result.map(() => props.itemHeight).getOrElse(2), // if result has error
    i: item.id,
  };
}
export default function DataItemsLayout({ items, renderItem, onResize, ...rest }: Props) {
  return (
    <GridLayout items={items} onResizeStop={onResize} getItemLayout={getItemLayout} {...rest}>
      {items.map((item) => (
        <div key={item.id} className={css['grid-item']}>
          {item.result.fold(
            (ex) => (
              <textarea className={css.error} defaultValue={String(ex)} />
            ),
            (data) => {
              if (!data.isResultText) {
                return renderItem(data);
              }
              // Example query: SELECT * FROM system.tables format Vertical

              if (data.error) {
                return <textarea className={css.error} defaultValue={data.text} />;
              }

              return <textarea className={css.text} defaultValue={data.text} />;
            }
          )}
        </div>
      ))}
    </GridLayout>
  );
}
