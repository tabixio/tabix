import { JSONModel } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface ProcessesTab extends Tab<TabType.Processes> {}

export default class ProcessesTabModel extends TabModel<ProcessesTab> implements ProcessesTab {
  private static tabId = 'ProcessesTabId';

  static from({
    title = 'Processes',
  }: Pick<JSONModel<Partial<ProcessesTab>>, 'title'>): ProcessesTabModel {
    return new ProcessesTabModel({ type: TabType.Processes, id: this.tabId, title });
  }
}
