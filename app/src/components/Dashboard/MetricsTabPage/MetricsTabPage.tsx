import React from 'react';
import { typedInject } from '../../../module/mobx-utils';
import { Stores, TabsStore } from '../../../stores';
import { Button, Collapse, Divider } from 'antd';
import { RequestPool } from 'services/api/provider/CoreProvider';
import { observer } from 'mobx-react';
import { DataDecorator } from 'services';
import { TableSheet } from 'components/TableSheet';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface InjectedProps {
  store: TabsStore;
}

type Props = InjectedProps;

@observer
class MetricsTabPage extends React.Component<Props> {
  protected data: { [key: string]: DataDecorator } = {};
  private pool: RequestPool = {
    replicas: this.props.store.api.prepared().replicas(),
    replicaQueue: this.props.store.api.prepared().replicaQueue(),
    replicatedFetches: this.props.store.api.prepared().replicatedFetches(),
    partsPerTable: this.props.store.api.prepared().partsPerTable(),
    merges: this.props.store.api.prepared().merges(),
    recentDataParts: this.props.store.api.prepared().recentDataParts(),
    mutations: this.props.store.api.prepared().mutations(),
    crashLog: this.props.store.api.prepared().crashLog(),
    detachedDataParts: this.props.store.api.prepared().detachedDataParts(),
    failedQueries: this.props.store.api.prepared().failedQueries(),
    stackTraces: this.props.store.api.prepared().stackTraces(),
  };
  state = {
    intervalId: undefined,
    dataUpdate: Date.now(),
  };

  componentDidMount() {
    //
    this.go();
  }

  request = async () => {
    const { api } = this.props.store;
    // Pool of requests

    // Send conCur.
    return await api.fetchPool(this.pool);
  };

  private go = () => {
    const { store } = this.props;
    this.request().then((e) => {
      for (const key in e.pool) {
        if (!this.data[key]) {
          this.data[key] = new DataDecorator();
        }
        if (!e.pool[key].isError) {
          this.data[key].apply(e.pool[key].response);
        }
      }
      this.setState({ dataUpdate: Date.now() });
    });
  };

  renderTable(table: string) {
    if (this.data[table]) {
      return (
        <TableSheet
          dataUpdate={this.state.dataUpdate}
          defaultHeight={300}
          data={this.data[table]}
          fill
        />
      );
    } else {
      return <b>{table} not ready</b>;
    }
  }

  //
  renderItems() {
    const items = [];
    for (const key in this.pool) {
      const title: string = key;
      items.push(
        <Panel header={title} key={title} style={{ overflow: 'auto' }}>
          {this.renderTable(key)}
        </Panel>
      );
    }

    return items;
  }

  render() {
    return (
      <div>
        <Divider style={{ margin: ' 5px 0' }}>Metrics & Diagnostic </Divider>
        <Button onClick={this.go}>
          <CaretRightOutlined style={{ color: 'orange' }} /> Reload
        </Button>
        <Divider />
        <Collapse>{this.renderItems()}</Collapse>
        {/*{this.renderTable('replicas')}*/}
        {/*{this.renderTable('replicaQueue')}*/}
        {/*{this.renderTable('replicatedFetches')}*/}
        {/*{this.renderTable('partsPerTable')}*/}
        {/*{this.renderTable('merges')}*/}
        {/*{this.renderTable('recentDataParts')}*/}
        {/*{this.renderTable('mutations')}*/}
        {/*{this.renderTable('crashLog')}*/}
        {/*{this.renderTable('detachedDataParts')}*/}
        {/*{this.renderTable('failedQueries')}*/}
        {/*{this.renderTable('stackTraces')}*/}
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.tabsStore,
}))(MetricsTabPage);
