import React from 'react';
import { typedInject } from '../../../module/mobx-utils';
import { Stores, TabsStore } from '../../../stores';
import { Button, Collapse } from 'antd';
import { RequestPool } from '../../../services/api/provider/CoreProvider';
import { DataTable } from 'components/Dashboard';
import { observer } from 'mobx-react';
import { DataDecorator } from 'services';

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

  request = async () => {
    const { api } = this.props.store;
    // Pool of requests

    // Send conCur.
    return await api.fetchPool(this.pool);
  };

  private go = () => {
    const { store } = this.props;
    this.request().then((e) => {
      console.log(e);
      for (const key in e) {
        if (!this.data[key]) {
          this.data[key] = new DataDecorator();
        }
        if (!e[key].isError) {
          this.data[key].apply(e[key].response);
        }
      }
      this.setState({ dataUpdate: Date.now() });
      console.log('RESP:', e);
    });
  };
  renderTable(table: string) {
    if (this.data[table]) {
      return (
        <DataTable dataUpdate={this.state.dataUpdate} height={300} data={this.data[table]} fill />
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
        <Panel header={title} key={title}>
          {this.renderTable(key)}
        </Panel>
      );
    }

    return items;
  }

  render() {
    return (
      <div>
        <b>MetricsTabPage</b>
        <hr />
        <Button onClick={this.go}>GOG</Button>
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
