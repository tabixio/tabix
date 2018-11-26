import { observable } from 'mobx';
import { SerializableModel, JSONObjectModel, serialize, JSONModel } from '@vzh/mobx-stores';
import TabModel, { Tab, TabType } from './TabModel';

export interface SqlHistoryTab extends Tab<TabType.SqlHistory> {
  queries: ReadonlyArray<string>;
}

export default class SqlHistoryTabModel extends TabModel<SqlHistoryTab>
  implements SqlHistoryTab, SerializableModel<SqlHistoryTab> {
  private static tabId = 'SqlHistoryTabId';

  @observable
  queries: ReadonlyArray<string>;

  static from({
    title = 'SqlHistory',
  }: Pick<JSONModel<Partial<SqlHistoryTab>>, 'title'>): SqlHistoryTabModel {
    return new SqlHistoryTabModel({
      type: TabType.SqlHistory,
      id: this.tabId,
      title,
      queries: ['sql1', 'sql2', 'sql3', 'sql4'],
    });
  }

  protected constructor(data: SqlHistoryTab) {
    super(data);
    this.queries = data.queries;
  }

  toJSON(): JSONObjectModel<SqlHistoryTab> {
    return serialize(this);
  }
}
