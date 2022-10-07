import React from 'react';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import { FieldChangeHandler } from 'module/mobx-utils';
import { TypedNode } from 'stores/TreeStore';
import { TreeFilter } from 'models';
import AutoCompleteOptions, { AutoCompleteOptionsProps } from './AutoCompleteOptions';
import css from './SearchInput.css';

interface Props extends Pick<AutoCompleteOptionsProps, 'model' | 'items'> {
  onModelFieldChange: FieldChangeHandler<TreeFilter>;
  doFilter: () => Promise<void>;
  onSelect: (node: TypedNode) => void;
}

@observer
export default class SearchInput extends React.Component<Props> {
  private filterTimeout: number = 0;

  private search = (value: string, { isOpen, selectedItem }: ControllerStateAndHelpers<any>) => {
    if (!isOpen && !selectedItem) return;

    const { onModelFieldChange, doFilter } = this.props;
    onModelFieldChange({ name: 'text', value: value || '' });
    // if (!value) {
    //   doFilter({ search: value }); // clear filtered results
    //   return;
    // }
    onModelFieldChange({ name: 'isFiltering', value: true });
    if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
    this.filterTimeout = window.setTimeout(
      () => doFilter().finally(() => onModelFieldChange({ name: 'isFiltering', value: false })),
      300
    );
  };

  private itemToString = (item: TypedNode) => (item ? item.name : '');

  render() {
    const { model, items, onSelect } = this.props;

    return (
      <Downshift
        inputValue={model.text}
        itemToString={this.itemToString}
        onInputValueChange={this.search}
        onSelect={onSelect}
        selectedItem={null}
        itemCount={items.length}
        initialHighlightedIndex={0}
      >
        {({ getInputProps, getMenuProps, isOpen, getItemProps, highlightedIndex }) => (
          <div className={css.root}>
            <Input.Search placeholder="Search" {...getInputProps()} />

            {isOpen && (
              <AutoCompleteOptions
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                model={model}
                items={items}
              />
            )}
          </div>
        )}
      </Downshift>
    );
  }
}
