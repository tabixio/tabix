import { JSONModel } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface DbOverviewTab extends Tab<TabType.DbOverview> {}

export default class DbOverviewTabModel extends TabModel<DbOverviewTab> implements DbOverviewTab {
  private static tabId = 'DbOverviewTabId';

  static from({
    title = 'DbOverview',
  }: Pick<JSONModel<Partial<DbOverviewTab>>, 'title'>): DbOverviewTabModel {
    return new DbOverviewTabModel({ type: TabType.DbOverview, id: this.tabId, title });
  }
}
