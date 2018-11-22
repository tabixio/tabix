import { SerializableModel, JSONObjectModel, serialize, JSONModel } from '@vzh/mobx-stores';
import TabModel, { Tab, TabType } from './TabModel';

export interface ProcessesTab extends Tab<TabType.Processes> {}

export default class ProcessesTabModel extends TabModel<ProcessesTab>
  implements ProcessesTab, SerializableModel<ProcessesTab> {
  private static tabId = 'ProcessesTabId';

  static from({
    title = 'Processes',
  }: Pick<JSONModel<Partial<ProcessesTab>>, 'title'>): ProcessesTabModel {
    return new ProcessesTabModel({ type: TabType.Processes, id: this.tabId, title });
  }

  toJSON(): JSONObjectModel<ProcessesTab> {
    return serialize(this);
  }
}
