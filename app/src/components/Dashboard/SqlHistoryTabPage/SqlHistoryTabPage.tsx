import React from 'react';
import { observer } from 'mobx-react';
import { typedInject } from '@vzh/mobx-stores';
import { List } from 'antd';
import { SqlHistoryStore, Stores } from 'stores';
import { eventBus, EventType } from 'services/sqlHistoryStorage';

interface InjectedProps {
  store: SqlHistoryStore;
}

interface Props extends InjectedProps {}

function renderItem(item: any) {
  return <List.Item>{item}</List.Item>;
}

@observer
class SqlHistoryTabPage extends React.Component<Props> {
  componentDidMount() {
    this.load();
    eventBus.on(EventType.UpdateHistory, this.load);
  }

  componentWillUnmount() {
    eventBus.off(EventType.UpdateHistory, this.load);
  }

  private load = () => {
    this.props.store.loadData();
  };

  render() {
    const { store } = this.props;

    return (
      <div>
        <List bordered dataSource={store.history} renderItem={renderItem} />
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.sqlHistoryStore,
}))(SqlHistoryTabPage);
