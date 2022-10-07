import React from 'react';
import { observer } from 'mobx-react';
import { ControllerStateAndHelpers } from 'downshift';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer, ListProps } from 'react-virtualized';
import classNames from 'classnames';
import { FilteredNodes } from 'stores/TreeStore';
import { ServerStructure } from 'services';
import { TreeFilter, TreeFilterModel } from 'models';
import ActionTitle from '../../ColumnTitle';
import TableTitle from '../../TableTitle';
import DbTitle from '../../DbTitle';
import css from './AutoCompleteOptions.css';

export interface AutoCompleteOptionsProps
  extends Pick<
    ControllerStateAndHelpers<any>,
    'getMenuProps' | 'getItemProps' | 'highlightedIndex'
  > {
  model: TreeFilter;
  items: FilteredNodes;
}

@observer
export default class AutoCompleteOptions extends React.Component<AutoCompleteOptionsProps> {
  private cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 32,
  });

  private getNoRowsContent() {
    const { model } = this.props;
    if (model.text.length < TreeFilterModel.MIN_SEARCH_LENGTH) return 'Type more symbols to search';
    if (model.isFiltering) return 'Filtering...';
    return 'Not found';
  }

  private rowRenderer: ListProps['rowRenderer'] = ({ key, index, style, parent }) => {
    const { items, getItemProps, highlightedIndex } = this.props;
    const item = items[index];

    const title =
      (ServerStructure.isColumn(item) && <ActionTitle column={item} />) ||
      (ServerStructure.isTable(item) && <TableTitle table={item} />) ||
      (ServerStructure.isDatabase(item) && (
        <DbTitle name={item.name} tableCount={item.tables.length} />
      )) ||
      item.name;

    return (
      <CellMeasurer key={key} parent={parent} rowIndex={index} cache={this.cellMeasurerCache}>
        <li
          {...getItemProps({
            key: item.id,
            index,
            item,
            role: 'option',
            'aria-selected': highlightedIndex === index,
            className: classNames(
              'ant-select-dropdown-menu-item',
              highlightedIndex === index && 'ant-select-dropdown-menu-item-active'
            ),
            style,
          })}
        >
          {title}
        </li>
      </CellMeasurer>
    );
  };

  private calcListHeight = (items: AutoCompleteOptionsProps['items']) =>
    Math.min(items.length * this.cellMeasurerCache.getHeight(0, 0), 250);

  render() {
    const { items, getMenuProps, highlightedIndex } = this.props;

    return (
      <div
        className={classNames(
          'ant-select-dropdown',
          'ant-select-dropdown--single',
          'ant-select-dropdown-placement-bottomLeft',
          css.root
        )}
      >
        <ul
          {...getMenuProps({
            unselectable: 'on',
            className: classNames(
              'ant-select-dropdown-menu',
              'ant-select-dropdown-menu-root',
              'ant-select-dropdown-menu-vertical',
              css.menu
            ),
          })}
        >
          {items.length === 0 && (
            <li
              role="option"
              aria-selected="false"
              aria-disabled="true"
              className="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-disabled"
            >
              {this.getNoRowsContent()}
            </li>
          )}

          {items.length > 0 && (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  rowCount={items.length}
                  rowHeight={this.cellMeasurerCache.rowHeight}
                  height={this.calcListHeight(items)}
                  width={width}
                  rowRenderer={this.rowRenderer}
                  // For force rerender to highlight row. Its slow, maybe refactor?
                  highlightedIndex={highlightedIndex}
                />
              )}
            </AutoSizer>
          )}
        </ul>
      </div>
    );
  }
}
