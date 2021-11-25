import { JSONModel } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface ServerOverviewTab extends Tab<TabType.ServerOverview> {}

export default class ServerOverviewTabModel extends TabModel<ServerOverviewTab>
  implements ServerOverviewTab {
  private static tabId = 'ServerOverviewTabId';

  static from({
    title = 'ServerOverview',
  }: Pick<JSONModel<Partial<ServerOverviewTab>>, 'title'>): ServerOverviewTabModel {
    return new ServerOverviewTabModel({ type: TabType.ServerOverview, id: this.tabId, title });
  }
}
