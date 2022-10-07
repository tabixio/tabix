import { JSONModel } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface SqlHistoryTab extends Tab<TabType.SqlHistory> {}

export default class SqlHistoryTabModel extends TabModel<SqlHistoryTab> implements SqlHistoryTab {
  private static tabId = 'SqlHistoryTabId';

  static from({
    title = 'SqlHistory',
  }: Pick<JSONModel<Partial<SqlHistoryTab>>, 'title'>): SqlHistoryTabModel {
    return new SqlHistoryTabModel({ type: TabType.SqlHistory, id: this.tabId, title });
  }
}
