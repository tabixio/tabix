import React from 'react';
import { typedInject } from '../../../module/mobx-utils';
import { Stores, TabsStore } from '../../../stores';
import { Button } from 'antd';

interface InjectedProps {
  store: TabsStore;
}

type Props = InjectedProps;

class MetricsTabPage extends React.Component<Props> {
  private go = () => {
    const { store } = this.props;
    const e = store.api.metricsTabStructure();
    console.log('EEEEE', e);
    // store.api.metricsTabStructure().then((data) => {
    //   console.log(data);
    // });
  };

  render() {
    return (
      <div>
        <b>MetricsTabPage</b>
        <br />
        <Button icon="close" onClick={this.go}>
          GOG
        </Button>
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.tabsStore,
}))(MetricsTabPage);
