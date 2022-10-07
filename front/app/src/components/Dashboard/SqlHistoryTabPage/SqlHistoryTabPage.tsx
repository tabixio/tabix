import React from 'react';
import { observer } from 'mobx-react';
import { typedInject } from 'module/mobx-utils';
import { List } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { SqlHistoryStore, Stores } from 'stores';
import { eventBus, EventType } from 'services/sqlHistoryStorage';
import ListItem, { ListItemProps } from './ListItem';
import css from './SqlHistoryTabPage.css';

const paginationConfig: PaginationConfig = {
  pageSize: 5,
  hideOnSinglePage: true,
  size: 'small',
};

interface InjectedProps {
  store: SqlHistoryStore;
}

interface Props extends InjectedProps, Pick<ListItemProps, 'onEdit'> {}

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

  private renderItem = (item: string) => <ListItem content={item} onEdit={this.props.onEdit} />;

  render() {
    const { store } = this.props;

    return (
      <div className={css.root}>
        <List
          dataSource={store.history}
          renderItem={this.renderItem}
          pagination={paginationConfig}
        />
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.sqlHistoryStore,
}))(SqlHistoryTabPage);
