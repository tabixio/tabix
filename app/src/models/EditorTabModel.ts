import { observable } from 'mobx';
import { SerializableModel, JSONObjectModel, serialize, JSONModel } from '@vzh/mobx-stores';
import { Option, None, Try } from 'funfix-core';
import uuid from 'uuid';
import { Omit } from 'typelevel-ts';
import DataDecorator from 'services/api/DataDecorator';
import SqlEditor from 'components/Dashboard/EditorTabPage/SqlEditor'; // refactor: use interface of sqleditor and not ref to component type?
import TabModel, { Tab, TabType } from './TabModel';

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

export default class EditorTabModel extends TabModel<EditorTab>
  implements EditorTab, SerializableModel<EditorTabJsonEntity> {
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

  @observable
  content: string;

  @observable
  currentDatabase: Option<string>;

  @observable
  queriesResult: QueryResult[];

  codeEditor: Option<SqlEditor>;

  protected constructor(data: EditorTab) {
    super(data);
    this.content = data.content;
    this.currentDatabase = data.currentDatabase;
    this.queriesResult = data.queriesResult;
    this.codeEditor = data.codeEditor;
  }

  toJSON(): JSONObjectModel<EditorTabJsonEntity> {
    const { codeEditor, data, ...jsonModel } = this as any;
    return serialize(jsonModel);
  }
}
