import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Input } from 'antd';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import { List } from 'react-virtualized/dist/es/List';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { FieldChangeHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { FilteredNodes, TypedNode } from 'stores/TreeStore';
import { TreeFilter, TreeFilterModel } from 'models';
import DbTitle from '../DbTitle';
import TableTitle from '../TableTitle';
import ColumnTitle from '../ColumnTitle';

interface Props {
  model: TreeFilter;
  onModelFieldChange: FieldChangeHandler<TreeFilter>;
  doFilter: () => Promise<void>;
  filteredItems: FilteredNodes;
  onSelect: (node: TypedNode) => void;
}

@observer
export default class SearchInput extends React.Component<Props> {
  private filterTimeout: number = 0;

  private search = (value: string) => {
    const { onModelFieldChange, doFilter } = this.props;

    onModelFieldChange({ name: 'text', value: value || '' });
    // if (!value) {
    //   doFilter({ search: value }); // clear filtered results
    //   return;
    // }

    onModelFieldChange({ name: 'isFiltering', value: true });
    if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
    this.filterTimeout = window.setTimeout(
      () =>
        doFilter().finally(() => {
          onModelFieldChange({ name: 'isFiltering', value: false });
        }),
      300
    );
  };

  private renderAutoCompleteOptions = ({
    getItemProps,
    highlightedIndex,
  }: Pick<
    ControllerStateAndHelpers<any>,
    'getItemProps' | 'highlightedIndex' | 'selectedItem'
  >) => {
    const { filteredItems } = this.props;

    const rowHeight = 40;
    const fullHeight = filteredItems.length * rowHeight;

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            rowCount={filteredItems.length}
            rowHeight={rowHeight}
            height={fullHeight > 280 ? 280 : fullHeight}
            width={width}
            rowRenderer={({ index, style }) => {
              const item = filteredItems[index];

              const title =
                (ServerStructure.isColumn(item) && <ColumnTitle column={item} />) ||
                (ServerStructure.isTable(item) && <TableTitle table={item} />) ||
                (ServerStructure.isDatabase(item) && (
                  <DbTitle name={item.name} tableCount={item.tables.length} />
                )) ||
                item.name;

              return (
                <li
                  {...getItemProps({
                    key: item.id,
                    index,
                    item,
                    role: 'option',
                    className: classNames(
                      'ant-select-dropdown-menu-item',
                      highlightedIndex === index && 'ant-select-dropdown-menu-item-active'
                      // highlightedIndex === index && 'ant-select-dropdown-menu-item-selected'
                    ),
                    'aria-selected': highlightedIndex === index,
                    style: {
                      ...style,
                      // backgroundColor: highlightedIndex === index ? 'lightgray' : 'unset',
                      // fontWeight: selectedItem === item ? 'bold' : 'unset',
                    },
                  })}
                >
                  {title}
                </li>
              );
              // <AutoComplete.Option key={i.id} value={i.id} title={i.name}>
              //   {title}
              // </AutoComplete.Option>
            }}
            noRowsRenderer={() => <li>{this.getNotFoundContent()}</li>}
          />
        )}
      </AutoSizer>
    );
  };

  /* private */ getNotFoundContent() {
    const { model } = this.props;
    if (model.text.length === 0) return undefined;
    if (model.text.length < TreeFilterModel.MIN_SEARCH_LENGTH) return 'Type more symbols to search';
    if (model.isFiltering) return 'Filtering...';
    return 'Not found';
  }

  render() {
    const { model, onSelect } = this.props;

    return (
      <Downshift
        inputValue={model.text}
        itemToString={item => (item ? item.name : '')}
        onInputValueChange={this.search}
        onSelect={onSelect}
        initialHighlightedIndex={0}
      >
        {({
          getInputProps,
          getMenuProps,
          isOpen,
          // inputValue,
          getItemProps,
          highlightedIndex,
          selectedItem,
        }) => (
          <div style={{ position: 'relative' }}>
            <Input.Search placeholder="Search" {...getInputProps()} />
            {/* {isOpen && <Menu {...getMenuProps()}>{this.renderAutoCompleteOptions()}</Menu>} */}
            {isOpen && (
              <div
                className="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"
                style={{
                  width: '100%',
                  top: '100%',
                  left: 0,
                }}
              >
                <ul
                  {...getMenuProps({
                    className:
                      'ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical',
                  })}
                >
                  {this.renderAutoCompleteOptions({ getItemProps, highlightedIndex, selectedItem })}
                </ul>
              </div>
            )}
            {/* <Menu {...getMenuProps()}>
              {this.renderAutoCompleteOptions({ getItemProps, highlightedIndex, selectedItem })}
            </Menu> */}
          </div>
        )}
      </Downshift>

      /* <AutoComplete
          dataSource={this.renderAutoCompleteOptions()}
          optionLabelProp="title"
          onSearch={this.search}
          onSelect={onSelect}
          placeholder="Search"
          notFoundContent={this.getNotFoundContent()}
          dropdownRender={this.dropdownRender}
        >
          <Input.Search />
        </AutoComplete> */
    );
  }
}
