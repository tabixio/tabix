import { observable } from 'mobx';
import { StoreModel } from '@vzh/mobx-stores';
import { Option } from 'funfix-core';

export interface Tab {
  id: string;
  title: string;
  content: string;
  currentDatabase: Option<string>;
}

export default class TabModel extends StoreModel<Tab> implements Tab {
  @observable
  id: string;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  currentDatabase: Option<string>;

  constructor({ id, title, content, currentDatabase }: Tab) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.currentDatabase = currentDatabase;
  }
}
