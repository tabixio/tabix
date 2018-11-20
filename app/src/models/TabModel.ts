import { StoreModel } from '@vzh/mobx-stores';
import { observable } from 'mobx';

export enum TabType {
  Editor = 'Editor',
  Custom = 'Custom',
  Processes = 'Processes',
  Metrics = 'Metrics',
  ServerOverview = 'ServerOverview',
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

export default class TabModel<T extends Tab> extends StoreModel<T> implements Tab {
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
}
