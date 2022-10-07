import { JSONModel, JSONObject, serialize } from 'module/mobx-utils';
import TabModel, { Tab, TabType } from './TabModel';

export interface TableViewTab extends Tab<TabType.TableView> {
  tableName: string;
  tableId: string;
}

export default class TableViewTabModel extends TabModel<TableViewTab> implements TableViewTab {
  private static tabId = 'TableViewTabModelTabId';

  tableName = '';

  tableId = '';

  static id(tableId: string) {
    return `${this.tabId}:${tableId}`;
  }

  static from({
    tableName = 'NA_NULL',
    tableId = 'NA_NULL',
  }: Pick<JSONModel<Partial<TableViewTab>>, 'tableId' | 'tableName'>): TableViewTabModel {
    const r = new TableViewTabModel({
      type: TabType.TableView,
      id: TableViewTabModel.id(tableId),
      title: tableName,
      tableId,
      tableName,
    });
    console.warn(r);
    return r;
  }

  protected constructor(data: TableViewTab) {
    super(data);
    const { ...jsonModel } = this;
    this.tableId = data.tableId;
    this.tableName = data.tableName;
  }

  toJSON(this: TableViewTabModel): JSONModel<TableViewTab> {
    const { ...jsonModel } = this;
    return serialize(jsonModel);
  }
}
