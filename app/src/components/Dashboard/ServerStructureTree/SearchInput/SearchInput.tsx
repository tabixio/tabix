import React from 'react';
import { observer } from 'mobx-react';
import { AutoComplete, Input } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import { FieldChangeHandler } from '@vzh/mobx-stores';
import { ServerStructure } from 'services';
import { FilteredNodes } from 'stores/TreeStore';
import { TreeFilter, TreeFilterModel } from 'models';
import DbTitle from '../DbTitle';
import TableTitle from '../TableTitle';
import ColumnTitle from '../ColumnTitle';

interface Props extends Pick<AutoCompleteProps, 'onSelect'> {
  model: TreeFilter;
  onModelFieldChange: FieldChangeHandler<TreeFilter>;
  doFilter: () => Promise<void>;
  filteredItems: FilteredNodes;
}

@observer
export default class SearchInput extends React.Component<Props> {
  private filterTimeout: number = 0;

  private search = (value: string) => {
    const { onModelFieldChange, doFilter } = this.props;

    onModelFieldChange({ name: 'text', value });
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

  private renderAutoCompleteOptions = () => {
    const { filteredItems } = this.props;

    return filteredItems.map(i => {
      const title =
        (ServerStructure.isColumn(i) && <ColumnTitle column={i} />) ||
        (ServerStructure.isTable(i) && <TableTitle table={i} />) ||
        (ServerStructure.isDatabase(i) && <DbTitle name={i.name} tableCount={i.tables.length} />) ||
        i.name;

      return (
        <AutoComplete.Option key={i.id} value={i.id} title={i.name}>
          {title}
        </AutoComplete.Option>
      );
    });
  };

  private getNotFoundContent() {
    const { model } = this.props;
    if (model.text.length === 0) return undefined;
    if (model.text.length < TreeFilterModel.MIN_SEARCH_LENGTH) return 'Type more symbols to search';
    if (model.isFiltering) return 'Filtering...';
    return 'Not found';
  }

  render() {
    const { onSelect } = this.props;

    return (
      <AutoComplete
        dataSource={this.renderAutoCompleteOptions()}
        optionLabelProp="title"
        onSearch={this.search}
        onSelect={onSelect}
        placeholder="Search"
        notFoundContent={this.getNotFoundContent()}
      >
        <Input.Search />
      </AutoComplete>
    );
  }
}
