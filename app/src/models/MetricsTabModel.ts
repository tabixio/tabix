import { JSONModel } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface MetricsTab extends Tab<TabType.Metrics> {}

export default class MetricsTabModel extends TabModel<MetricsTab> implements MetricsTab {
  private static tabId = 'MetricsTabId';

  static from({
    title = 'Metrics',
  }: Pick<JSONModel<Partial<MetricsTab>>, 'title'>): MetricsTabModel {
    return new MetricsTabModel({ type: TabType.Metrics, id: this.tabId, title });
  }
}
