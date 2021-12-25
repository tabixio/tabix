import { JSONModel } from 'module/mobx-utils';
import { Tab, TabType, isTabOfType } from './TabModel';
import EditorTabModel, { EditorTabJsonEntity } from './EditorTabModel';
import ProcessesTabModel, { ProcessesTab } from './ProcessesTabModel';
import MetricsTabModel, { MetricsTab } from './MetricsTabModel';
import ServerOverviewTabModel, { ServerOverviewTab } from './ServerOverviewTabModel';
import DbOverviewTabModel, { DbOverviewTab } from './DbOverviewTabModel';
import SqlHistoryTabModel, { SqlHistoryTab } from './SqlHistoryTabModel';
import TableViewTabModel, { TableViewTab } from './TableViewTabModel';

export default function createTabFrom<T extends JSONModel<Tab>>(tab: T) {
  if (isTabOfType<JSONModel<EditorTabJsonEntity>>(tab, TabType.Editor)) {
    return EditorTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<ProcessesTab>>(tab, TabType.Processes)) {
    return ProcessesTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<MetricsTab>>(tab, TabType.Metrics)) {
    return MetricsTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<ServerOverviewTab>>(tab, TabType.ServerOverview)) {
    return ServerOverviewTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<DbOverviewTab>>(tab, TabType.DbOverview)) {
    return DbOverviewTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<SqlHistoryTab>>(tab, TabType.SqlHistory)) {
    return SqlHistoryTabModel.from(tab);
  }

  if (isTabOfType<JSONModel<TableViewTab>>(tab, TabType.TableView)) {
    return TableViewTabModel.from(tab);
  }

  throw new Error(`Unknown tab type '${tab.type}'`);
}
