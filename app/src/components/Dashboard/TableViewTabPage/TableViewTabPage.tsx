import React from 'react';
import { DataDecorator, RequestPool, ServerStructure } from 'services';
import { TableViewTabModel } from 'models';
import { TableOutlined } from '@ant-design/icons';
import { DataTable } from '../index';
import { Row, Col, Button, Select, Checkbox, Tabs, Divider } from 'antd';
import { typedInject } from '../../../module/mobx-utils';
import SimpleEditor from '../EditorTabPage/SqlEditor/SimpleEditor';
import css from '../EditorTabPage/SqlEditor/SqlEditor.css';
import { CaretRightOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons';
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
      <div style={{ height: '100%' }}>
        <Divider orientation="left" style={{ margin: ' 5px 0' }} plain>
          <TableOutlined /> {tableId}
        </Divider>

        <Tabs type="card" defaultActiveKey="3" onChange={this.onTab} style={{ height: '100%' }}>
          <TabPane tab="DDL" key="1">
            <Row style={{ height: 'calc(90vh - 30px)' }}>
              <Flex row hfill style={{ height: '40%' }}>
                <SimpleEditor content={describe} serverStructure={serverStructure} />
              </Flex>

              <Flex row hfill style={{ height: '60%' }}>
                <DataTable dataUpdate={dataUpdate} data={this.data} />
              </Flex>
            </Row>
          </TabPane>

          <TabPane tab="Stats" key="2">
            <Flex row fill={true} style={{ height: 'calc(50vh-40px)', border: '1px solid orange' }}>
              calc(50vh-40px)
            </Flex>

            <Flex row style={{ border: '1px solid orange', height: 'calc(50vh-40px)' }}>
              <DataTable dataUpdate={dataUpdate} data={this.data} />
            </Flex>
          </TabPane>

          <TabPane tab="Data" key="3">
            <Row style={{ height: 'calc(90vh - 30px)', border: '1px solid orange' }}>
              <Flex row hfill style={{ height: '10%', border: '1px solid orange' }}>
                calc(50vh-40px)
              </Flex>

              <Flex row hfill style={{ border: '1px solid orange', height: '90%' }}>
                <DataTable dataUpdate={dataUpdate} data={this.data} />
              </Flex>
            </Row>
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
