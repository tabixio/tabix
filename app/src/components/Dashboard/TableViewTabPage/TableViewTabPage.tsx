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

        <Tabs type="card" defaultActiveKey="2" onChange={this.onTab} style={{ height: '100%' }}>
          <TabPane tab="DDL" key="1">
            <Col>
              <Row style={{ height: '40vh' }}>
                <SimpleEditor content={describe} serverStructure={serverStructure} />
              </Row>
              <Row style={{ height: '48vh', border: '2px solid orange' }}>
                <DataTable dataUpdate={dataUpdate} data={this.data} fill />
              </Row>
            </Col>
          </TabPane>

          <TabPane tab="Stats" key="2">
            <Flex row fill={true} style={{ border: '1px solid orange' }}>
              F2
            </Flex>

            <Flex row fill style={{ border: '1px solid orange', height: '40px' }}>
              <DataTable dataUpdate={dataUpdate} data={this.data} />
            </Flex>
          </TabPane>

          <TabPane tab="Data" key="3">
            <Row style={{ height: '40vh' }} justify="space-around">
              <Col flex="200px">
                <Button size="large">
                  <CaretRightOutlined style={{ color: 'orange' }} /> Load
                </Button>
              </Col>
            </Row>
            <Row style={{ alignItems: 'stretch', border: '2px solid orange' }}>
              <DataTable dataUpdate={dataUpdate} data={this.data} />
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
