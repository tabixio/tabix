import React from 'react';
import { DataDecorator, RequestPool, ServerStructure } from 'services';
import { TableViewTabModel } from 'models';
import { TableOutlined } from '@ant-design/icons';
import { DataTable } from '../index';
import { Divider, Tabs } from 'antd';
import { typedInject } from '../../../module/mobx-utils';
import SimpleEditor from '../EditorTabPage/SqlEditor/SimpleEditor';
import css from '../EditorTabPage/SqlEditor/SqlEditor.css';

import { Flex } from 'reflexy';

import { Stores, TabsStore } from '../../../stores';

const { TabPane } = Tabs;
interface InjectedProps {
  store: TabsStore;
  serverStructure?: ServerStructure.Server;
  model: TableViewTabModel;
}

type Props = InjectedProps;

export class TableViewTabPage extends React.Component<Props> {
  state = {
    dataUpdate: Date.now(),
    describe: '',
  };
  private data: DataDecorator = new DataDecorator();

  private getPool = (tableName: string): RequestPool => {
    return {
      DESCRIBE: this.props.store.api.prepared().template('DESCRIBE TABLE ' + tableName),
      SHOWCREATE: this.props.store.api.prepared().template('SHOW CREATE TABLE ' + tableName),
    };
  };
  componentDidMount() {
    this.load();
  }
  onTab = () => {
    //
  };

  load = () => {
    this.requestTableDescribe().then((e) => {
      // console.log('ON TAB', e);
      let describe = 'Error can`t fetch:SHOW CREATE TABLE';

      if (!e['SHOWCREATE'].isError) {
        const d = new DataDecorator(e['SHOWCREATE']);
        describe = d.getStatementResponse();
      }
      if (!e['DESCRIBE'].isError) {
        this.data = new DataDecorator(e['DESCRIBE']);
      }

      this.setState({ describe: describe, dataUpdate: Date.now() });
    });
  };
  requestTableDescribe = async () => {
    const { api } = this.props.store;

    const { model } = this.props;
    const tableId = model.tableId;

    return await api.fetchPool(this.getPool(tableId));
  };
  render() {
    const { serverStructure, model } = this.props;
    const tableId = model.tableId;
    const { describe, dataUpdate } = this.state;

    return (
      <div>
        <Divider orientation="left" plain>
          <TableOutlined /> {tableId}
        </Divider>

        <Tabs type="card" defaultActiveKey="1" onChange={this.onTab}>
          <TabPane tab="DDL" key="1">
            <Flex column fill={true} style={{ maxHeight: 350 }}>
              <Flex grow fill className={css.editor}>
                <SimpleEditor content={describe} serverStructure={serverStructure} />
              </Flex>
            </Flex>
            <Flex column fill={true} style={{ maxHeight: 350 }}>
              <Flex grow fill className={css.editor}>
                <DataTable dataUpdate={dataUpdate} data={this.data} fill />
              </Flex>
            </Flex>
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

export default typedInject<InjectedProps, Props, Stores>(({ store }, { model }) => ({
  store: store.tabsStore,
  model,
}))(TableViewTabPage);
