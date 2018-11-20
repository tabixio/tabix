import { SerializableModel, JSONObjectModel, serialize, JSONModel } from '@vzh/mobx-stores';
import TabModel, { Tab, TabType } from './TabModel';

export interface ProcessesTab extends Tab<TabType.Processes> {}

const defaultTabId = 'ProcessesTabId';

export default class ProcessesTabModel extends TabModel<ProcessesTab>
  implements ProcessesTab, SerializableModel<ProcessesTab> {
  static from({ title }: Pick<JSONModel<ProcessesTab>, 'title'>): ProcessesTabModel {
    return new ProcessesTabModel({ type: TabType.Processes, id: defaultTabId, title });
  }

  toJSON(): JSONObjectModel<ProcessesTab> {
    return serialize(this);
  }
}
