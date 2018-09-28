import { observable } from 'mobx';
import { StoreModel } from '@vzh/mobx-stores';
import { Option, None } from 'funfix-core';
import uuid from 'uuid';
import { CodeEditor } from 'components/Dashboard';
import DataDecorator from 'services/api/DataDecorator';
import { Omit } from 'typelevel-ts';

export interface Tab {
  id: string;
  title: string;
  content: string;
  currentDatabase: Option<string>;
  codeEditor: Option<CodeEditor>;
  data: Option<DataDecorator>;
}

export default class TabModel extends StoreModel<Tab> implements Tab {
  static from({
    id = uuid(),
    title,
    content = '',
    currentDatabase,
    codeEditor = None,
    data = None,
  }: Omit<Tab, 'id' | 'content' | 'codeEditor' | 'data'> & Partial<Tab>): TabModel {
    return new TabModel({
      id,
      title,
      content,
      currentDatabase,
      codeEditor,
      data,
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
  data: Option<DataDecorator>;

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
}
