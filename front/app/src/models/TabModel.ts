import { StoreModel, SerializableModel, JSONModel, JSONObject, serialize } from 'module/mobx-utils';
import { observable } from 'mobx';

export enum TabType {
  Editor = 'Editor',
  Processes = 'Processes',
  TableView = 'TableView',
  Metrics = 'Metrics',
  ServerOverview = 'ServerOverview',
  DbOverview = 'DbOverview',
  SqlHistory = 'SqlHistory',
}

export interface Tab<T extends TabType = TabType> {
  readonly type: T;
  id: string;
  title: string;
}

export const Tab = {};

export function isTabOfType<T extends Tab>(tab: Tab, type: T['type']): tab is T {
  return tab.type === type;
}

export default abstract class TabModel<T extends Tab>
  extends StoreModel<T>
  implements Tab, SerializableModel<Tab>
{
  readonly type: T['type'];

  @observable
  id: string;

  @observable
  title: string;

  protected constructor({ type, id, title }: T) {
    super();
    this.type = type;
    this.id = id;
    this.title = title;
  }

  toJSON(): JSONModel<Tab> {
    return serialize<Tab>(this);
  }
}
