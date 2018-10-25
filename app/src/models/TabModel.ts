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
import { CodeEditor } from 'components/Dashboard';
import DataDecorator from 'services/api/DataDecorator';

export interface Tab {
  id: string;
  title: string;
  content: string;
  currentDatabase: Option<string>;
  codeEditor: Option<CodeEditor>;
  data: DataDecorator[];
}

export interface TabJsonModel extends Omit<Tab, 'codeEditor' | 'data'> {}

export default class TabModel extends StoreModel<Tab>
  implements Tab, SerializableModel<TabJsonModel> {
  static from({
    id = uuid(),
    title,
    content = '',
    currentDatabase,
  }: Partial<JSONModel<TabJsonModel>> & Pick<JSONModel<TabJsonModel>, 'title'>): TabModel {
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

  codeEditor: Option<CodeEditor>;

  protected constructor({ id, title, content, currentDatabase, data, codeEditor }: Tab) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.currentDatabase = currentDatabase;
    this.data = data;
    this.codeEditor = codeEditor;
  }

  toJSON(): JSONObjectModel<TabJsonModel> {
    const { codeEditor, data, ...jsonModel } = this as any;
    return serialize(jsonModel);
  }
}
