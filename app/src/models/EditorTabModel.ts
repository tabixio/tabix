import { observable } from 'mobx';
import {
  StoreModel,
  SerializableModel,
  JSONObjectModel,
  serialize,
  JSONModel,
} from '@vzh/mobx-stores';
import { Option, None, Try } from 'funfix-core';
import uuid from 'uuid';
import { Omit } from 'typelevel-ts';
import DataDecorator from 'services/api/DataDecorator';
import SqlEditor from 'components/Dashboard/EditorTabPage/SqlEditor'; // refactor: use interface of sqleditor and not ref to component type?
import Tab, { TabType } from './Tab';

export interface EditorTab extends Tab {
  readonly type: TabType.Editor;
  content: string;
  currentDatabase: Option<string>;
  codeEditor: Option<SqlEditor>;
  queriesResult: QueryResult[];
}

export interface EditorTabJsonEntity extends Omit<EditorTab, 'codeEditor' | 'data'> {}

export interface QueryResult {
  id: string;
  result: Try<DataDecorator>;
}

export default class EditorTabModel extends StoreModel<EditorTab>
  implements Tab, SerializableModel<EditorTabJsonEntity> {
  static from({
    id = uuid(),
    title,
    content = '',
    currentDatabase,
  }: Partial<JSONModel<EditorTabJsonEntity>> &
    Pick<JSONModel<EditorTabJsonEntity>, 'title'>): EditorTabModel {
    return new EditorTabModel({
      type: TabType.Editor,
      id,
      title,
      content,
      currentDatabase: Option.of(currentDatabase),
      codeEditor: None,
      queriesResult: [],
    });
  }

  readonly type: TabType.Editor;

  @observable
  id: string;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  currentDatabase: Option<string>;

  @observable
  queriesResult: QueryResult[];

  codeEditor: Option<SqlEditor>;

  protected constructor({
    type,
    id,
    title,
    content,
    currentDatabase,
    queriesResult,
    codeEditor,
  }: EditorTab) {
    super();
    this.type = type;
    this.id = id;
    this.title = title;
    this.content = content;
    this.currentDatabase = currentDatabase;
    this.queriesResult = queriesResult;
    this.codeEditor = codeEditor;
  }

  toJSON(): JSONObjectModel<EditorTabJsonEntity> {
    const { codeEditor, data, ...jsonModel } = this as any;
    return serialize(jsonModel);
  }
}
