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
  // private renderText = (text: string) => <div className={css.error}>{text}</div>;

  return (
    <GridLayout items={items} getItemLayout={getItemLayout} {...rest}>
      {items.map(item => (
        <div key={item.id} className={css['grid-item']}>
          {item.result.fold(
            ex => (
              <textarea className={css.error} value={String(ex)} />
            ),
            data => {
              if (!data.isResultText) {
                return renderItem(data);
              }
              // Example query: SELECT * FROM system.tables format Vertical
              return <textarea className={css.text} value={data.text} />;
            }
          )}
        </div>
      ))}
    </GridLayout>
  );
}
