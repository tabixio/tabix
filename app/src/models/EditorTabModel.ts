import { observable } from 'mobx';
import { SerializableModel, serialize, JSONModel } from 'module/mobx-utils';
import { Option, None, Try } from 'funfix-core';
import { v4 as UUIDv4 } from 'uuid';
import { Omit } from 'typelevel-ts';
import DataDecorator, { Statistics } from 'services/api/DataDecorator';
import SqlEditor from 'components/Dashboard/EditorTabPage/SqlEditor'; // refactor: use interface of sqleditor and not ref to component type?
import TabModel, { Tab, TabType } from './TabModel';

export interface QueryResult {
  id: string;
  result: Try<DataDecorator>;
}

export interface QueryResultList {
  readonly list: ReadonlyArray<QueryResult>;
  readonly totalStats: Statistics;
}

export interface EditorTab extends Tab<TabType.Editor> {
  content: string;
  currentDatabase: Option<string>;
  codeEditor: Option<SqlEditor>;
  queriesResult: Option<QueryResultList>;
  pinnedResult: boolean;
  tableData: Option<string>;
}

export type EditorTabJsonEntity = Omit<EditorTab, 'codeEditor' | 'queriesResult' | 'tableData'>;

export default class EditorTabModel
  extends TabModel<EditorTab>
  implements EditorTab, SerializableModel<EditorTabJsonEntity>
{
  static from({
    id = UUIDv4(),
    title,
    content = '',
    currentDatabase,
    pinnedResult = true,
  }: Partial<JSONModel<EditorTabJsonEntity>> &
    Pick<JSONModel<EditorTabJsonEntity>, 'title'>): EditorTabModel {
    return new EditorTabModel({
      type: TabType.Editor,
      id,
      title,
      content,
      currentDatabase: Option.of(currentDatabase),
      codeEditor: None,
      queriesResult: None,
      pinnedResult,
      tableData: None,
    });
  }

  @observable
  content: string;

  @observable
  currentDatabase: Option<string>;

  codeEditor: Option<SqlEditor>;

  @observable
  queriesResult: Option<QueryResultList>;

  @observable
  pinnedResult: boolean;

  @observable
  tableData: Option<string>;

  protected constructor(data: EditorTab) {
    super(data);
    this.content = data.content;
    this.currentDatabase = data.currentDatabase;
    this.codeEditor = data.codeEditor;
    this.queriesResult = data.queriesResult;
    this.pinnedResult = data.pinnedResult;
    this.tableData = data.tableData;
  }

  toJSON(this: EditorTabModel): JSONModel<EditorTabJsonEntity> {
    const { codeEditor, queriesResult, ...jsonModel } = this;
    return serialize(jsonModel);
  }
}
