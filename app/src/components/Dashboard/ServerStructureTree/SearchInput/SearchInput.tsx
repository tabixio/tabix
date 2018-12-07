import React from 'react';
import { observer } from 'mobx-react';
import { AutoComplete, Input } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import { ServerStructure } from 'services';
import { FilterResult } from 'stores/ServerStructureFilter';
import { DashboardUIStore } from 'stores';
import { TreeFilter, MIN_SEARCH_LENGTH } from 'models';
import DbTitle from '../DbTitle';
import TableTitle from '../TableTitle';
import ColumnTitle from '../ColumnTitle';

interface Props extends Pick<AutoCompleteProps, 'onSelect'> {
  store: DashboardUIStore;
  filterServerStructure: (filter: TreeFilter) => Promise<void>;
  filteredItems: FilterResult;
}

@observer
export default class SearchInput extends React.Component<Props> {
  private filterTimeout: number = 0;

  private search = (value: string) => {
    const { store, filterServerStructure } = this.props;

    store.treeFilter.changeField({ name: 'search', value });
    store.updateTreeHighlightedKey(undefined); // remove highlighted node when search value changed

    if (!value) {
      filterServerStructure({ search: value }); // clear filtered results
      return;
    }

    store.updateFiltering(true);
    if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
    this.filterTimeout = window.setTimeout(
      () =>
        filterServerStructure(store.treeFilter).finally(() => {
          store.updateFiltering(false);
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
    const { store } = this.props;
    if (store.treeFilter.search.length === 0) return undefined;
    if (store.treeFilter.search.length < MIN_SEARCH_LENGTH) return 'Type more symbols to search';
    if (store.isFiltering) return 'Filtering...';
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
