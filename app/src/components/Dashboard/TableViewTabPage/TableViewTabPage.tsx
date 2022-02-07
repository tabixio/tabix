import React from 'react';
import { DataDecorator, ServerStructure } from 'services';
import { TableViewTabModel } from 'models';
import { DataTable } from '../index';
import { Tabs } from 'antd';
import SqlEditor from '../EditorTabPage/SqlEditor';

const { TabPane } = Tabs;

interface Props {
  serverStructure?: ServerStructure.Server;
  model: TableViewTabModel;
}

export default class TableViewTabPage extends React.Component<Props> {
  state = {
    dataUpdate: Date.now(),
  };
  private data: DataDecorator = new DataDecorator();

  render() {
    const { serverStructure, model } = this.props;
    const tableId = model.tableId;

    // console.warn(serverStructure, model);
    const content = 'SELECT * FROM system.tables';
    return (
      <div>
        <b>{tableId}</b>
        <hr />
        <Tabs defaultActiveKey="1">
          <TabPane tab="DDL" key="1">
            <SqlEditor
              content={content}
              serverStructure={serverStructure}
              currentDatabase="NULL"
              fill
            />
            <DataTable dataUpdate={this.state.dataUpdate} data={this.data} fill />
          </TabPane>
          <TabPane tab="Stats" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Data" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
