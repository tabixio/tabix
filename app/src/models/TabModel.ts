import { observable } from 'mobx';
import {
  StoreModel,
  SerializableModel,
  JSONObjectModel,
  serialize,
  JSONModel,
} from '@vzh/mobx-stores';
import { Option, None } from 'funfix-core';
import uuid from 'uuid';
import { Omit } from 'typelevel-ts';
import DataDecorator from 'services/api/DataDecorator';
import SqlEditor from 'components/Dashboard/TabPage/SqlEditor';

export interface Tab {
  id: string;
  title: string;
  content: string;
  currentDatabase: Option<string>;
  codeEditor: Option<SqlEditor>;
  data: DataDecorator[];
}

export interface TabJsonEntity extends Omit<Tab, 'codeEditor' | 'data'> {}

export default class TabModel extends StoreModel<Tab>
  implements Tab, SerializableModel<TabJsonEntity> {
  static from({
    id = uuid(),
    title,
    content = '',
    currentDatabase,
  }: Partial<JSONModel<TabJsonEntity>> & Pick<JSONModel<TabJsonEntity>, 'title'>): TabModel {
    return new TabModel({
      id,
      title,
      content,
      currentDatabase: Option.of(currentDatabase),
      codeEditor: None,
      data: [],
    });
  }

  @observable
  id: string;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  currentDatabase: Option<string>;

  @observable
  data: DataDecorator[];

  codeEditor: Option<SqlEditor>;

  protected constructor({ id, title, content, currentDatabase, data, codeEditor }: Tab) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.currentDatabase = currentDatabase;
    this.data = data;
    this.codeEditor = codeEditor;
  }

  toJSON(): JSONObjectModel<TabJsonEntity> {
    const { codeEditor, data, ...jsonModel } = this as any;
    return serialize(jsonModel);
  }
}
