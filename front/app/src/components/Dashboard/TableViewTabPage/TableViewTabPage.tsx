import React from 'react';
import { DataDecorator, RequestPool, ServerStructure } from 'services';
import { TableViewTabModel } from 'models';
import { TableOutlined } from '@ant-design/icons';
import { Row, Col, Button, Drawer, Select, Checkbox, Table, Tabs, Divider } from 'antd';
import { typedInject } from '../../../module/mobx-utils';
import SimpleEditor from '../EditorTabPage/SqlEditor/SimpleEditor';
import { CaretRightOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons';
import { TableFilter } from './TableFilter';
import { Flex } from 'reflexy';
import { TableSheet } from 'components/TableSheet';

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
    dataTableUpdated: 0,
    dataUpdate: Date.now(),
    describe: '',
    visibleTableFilter: false,
  };
  private data: DataDecorator = new DataDecorator();
  private dataTable: DataDecorator = new DataDecorator();
  private COLS: DataDecorator = new DataDecorator();
  private PARTS: DataDecorator = new DataDecorator();

  /**
   *
   * @param tableName `db.tb` like `ads.block_views_sharded`
   */
  private getPool = (tableName: string): RequestPool => {
    const { api } = this.props.store;
    // console.log('LOad ', tableName);
    const [db, tb] = tableName.split('.');
    const pool = {
      DESCRIBE: api.prepared().template('DESCRIBE TABLE ' + tableName),
      SHOWCREATE: api.prepared().template('SHOW CREATE TABLE ' + tableName),
    };

    if (db.length && tb.length) {
      pool['COLS'] = api.prepared().columnsPerOneTable(500, db, tb);
      pool['PARTS'] = api.prepared().partsPerOneTable(500, db, tb);
    }

    return pool;
  };

  componentDidMount() {
    this.loadDescribe();
  }

  onTab = (activeKey: string) => {
    // console.log('ON TAB Open', activeKey);
  };
  loadData = async () => {
    // console.log('loadData->loadData');
    const { api } = this.props.store;
    const { model } = this.props;
    const tableId = model.tableId;
    return await api.query('SELECT * FROM ' + tableId + ' LIMIT 200').then((e) => {
      this.dataTable = e;
      this.setState({ dataTableUpdated: e.dataUpdate });
    });
  };
  private loadDescribe = () => {
    this.requestTableDescribe().then((e) => {
      // console.log('ON TAB', e);
      let describe = 'Error can`t fetch:SHOW CREATE TABLE';

      if (!e.pool['SHOWCREATE'].isError) {
        const d = new DataDecorator(e.pool['SHOWCREATE']);
        describe = d.getStatementResponse();
      }
      //
      if (!e.pool['PARTS'].isError) {
        this.PARTS = new DataDecorator(e.pool['PARTS']);
      }
      if (!e.pool['DESCRIBE'].isError) {
        this.data = new DataDecorator(e.pool['DESCRIBE']);
      }
      if (!e.pool['COLS'].isError) {
        this.COLS = new DataDecorator(e.pool['COLS']);
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
    const { describe, dataUpdate, dataTableUpdated } = this.state;
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
          defaultActiveKey="1"
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
                <TableSheet dataUpdate={dataUpdate} data={this.data} title="DESCRIBE" />
              </Flex>
            </Row>
          </TabPane>

          <TabPane tab="Stats" key="2">
            <Row style={{ height: 'calc(50vh - 30px)' }}>
              <TableSheet dataUpdate={dataUpdate} data={this.PARTS} title="System.parts" />
            </Row>
            <Row>
              <Divider></Divider>
              <TableSheet dataUpdate={dataUpdate} data={this.COLS} title="System.columns" />
            </Row>
          </TabPane>

          <TabPane tab="Data" key="3">
            <Row style={{ height: 'calc(50vh - 30px)' }}>
              <Flex row hfill style={{ height: '30%' }}>
                <Button type="dashed" onClick={showTableFilter}>
                  Filter
                </Button>
                <Button type="primary" onClick={this.loadData}>
                  Load data
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

              <Flex row hfill>
                {dataTableUpdated > 0 && (
                  <TableSheet dataUpdate={dataUpdate} data={this.dataTable} />
                )}
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
