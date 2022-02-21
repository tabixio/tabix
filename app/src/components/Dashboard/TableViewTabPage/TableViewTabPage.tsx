import React from 'react';
import { DataDecorator, RequestPool, ServerStructure } from 'services';
import { TableViewTabModel } from 'models';
import { TableOutlined } from '@ant-design/icons';
import { DataTable } from '../index';
import { Row, Col, Button, Drawer, Select, Checkbox, Table, Tabs, Divider } from 'antd';
import { typedInject } from '../../../module/mobx-utils';
import SimpleEditor from '../EditorTabPage/SqlEditor/SimpleEditor';
import { CaretRightOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons';
import { TableFilter } from './TableFilter';
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
    visibleTableFilter: false,
  };
  private data: DataDecorator = new DataDecorator();

  private getPool = (tableName: string): RequestPool => {
    const { api } = this.props.store;
    return {
      DESCRIBE: api.prepared().template('DESCRIBE TABLE ' + tableName),
      SHOWCREATE: api.prepared().template('SHOW CREATE TABLE ' + tableName),
    };
  };
  componentDidMount() {
    this.loadDescribe();
  }
  onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
  };

  private loadDescribe = () => {
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
  private requestTableDescribe = async () => {
    const { api } = this.props.store;
    const { model } = this.props;
    const tableId = model.tableId;
    return await api.fetchPool(this.getPool(tableId));
  };
  render() {
    const { serverStructure, model } = this.props;
    const tableId = model.tableId;
    const { describe, dataUpdate } = this.state;
    const showTableFilter = () => {
      this.setState({ visibleTableFilter: true });
    };
    const onCloseTableFilter = () => {
      this.setState({ visibleTableFilter: false });
    };
    // const children = server.databases.map((d) => ({
    //   ...d,
    //   children: d.tables.map((t) => ({
    //     ...t,
    //     children: t.columns.map((c) => ({ ...c })),
    //   })),
    // }));
    const tb: Readonly<ServerStructure.Table> | undefined = serverStructure?.databases
      .find((_) => _.name === 'system')
      ?.tables.find((_) => _.name === 'query_log');

    return (
      <div style={{ height: '100%' }}>
        <Divider orientation="left" style={{ margin: ' 5px 0' }} plain>
          <TableOutlined /> {tableId}
        </Divider>

        <Tabs
          type="card"
          defaultActiveKey="3"
          onTabClick={this.onTab}
          onChange={this.onTab}
          style={{ height: '100%' }}
        >
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
              <Flex row hfill style={{ height: '30%', border: '1px solid orange' }}>
                <Button type="primary" onClick={showTableFilter}>
                  Open
                </Button>
                <Drawer
                  title="Select Filter"
                  placement="right"
                  onClose={onCloseTableFilter}
                  visible={this.state.visibleTableFilter}
                  size="large"
                >
                  <TableFilter table={tb} />
                </Drawer>
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
