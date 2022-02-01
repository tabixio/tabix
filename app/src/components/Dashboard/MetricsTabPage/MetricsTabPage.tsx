import React from 'react';
import {typedInject} from '../../../module/mobx-utils';
import {Stores, TabsStore} from '../../../stores';
import {Button} from "antd";

interface InjectedProps {
  store: TabsStore;
}

type Props = InjectedProps;

class MetricsTabPage extends React.Component<Props> {
  private go = () => {
    //
    const {store} = this.props;
    // console.info('GO!>>>', store.api.provider.prepared().databasesListAndSize());
    // store.api.query().then((r) => console.log(r.toString()));
    //store.api.query('SELECT sleep(2), 2 as a1').then((r) => console.log(r.toString()));
    //store.api.query('SELECT sleep(1), 3 as a1').then((r) => console.log(r.toString()));
    // store.api.query(store.api.prepared().databasesListAndSize()).then((r) => console.log(r.toString()));
    // store.api.query(store.api.prepared().dictionariesList(13)).then((r) => console.log(r.toString()));
    // store.api.query(store.api.prepared().replicaQueue()).then((r) => console.log(r.toString()));

  }

  render() {
    return (
      <div>
        <b>MetricsTabPage</b>
        <br/>
        <Button icon="close" onClick={this.go}>
          GOG
        </Button>
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({store}) => ({
  store: store.tabsStore,
}))(MetricsTabPage);
