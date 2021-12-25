import React from 'react';
import { Button, Select, Checkbox, Divider } from 'antd';
import { typedInject } from 'module/mobx-utils';
import { Stores, TabsStore } from 'stores';
import { observer } from 'mobx-react';
import { DataTable } from 'components/Dashboard';
import { DataDecorator } from 'services';

interface InjectedProps {
  store: TabsStore;
}

interface Props extends InjectedProps {}

const IOption = Select.Option;

const CheckboxGroup = Checkbox.Group;

const checkOptions = ['Log mode', 'Talk Cluster', 'Only SELECT', 'Show Profile', 'Show Settings'];
@observer
class ProcessesTabPage extends React.Component<Props> {
  protected data: DataDecorator = new DataDecorator();

  state = {
    intervalId: undefined,
    checkedList: checkOptions,
    dataUpdate: Date.now(),
    columns: [],
    interval: 0.1,
    isPlaying: false,
    countError: 0,
    countSuccess: 0,
  };

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  private handleChange = (value: string) => {
    const v = parseFloat(value);
    this.setState({ interval: v });
    // if (this.state.intervalId) {
    // this.runTimer(v);
    // }
  };

  private onChangeCheckbox = (checkedList: any) => {
    this.setState({ checkedList });
  };

  private megreData = (newData: any, _current: any) => {
    const current = _current;
    newData.forEach((_cell: any) => {
      const cell = _cell;
      if (current[cell.hash]) {
        let c = current[cell.hash].count;
        if (current[cell.hash].initial_query_id !== cell.initial_query_id) {
          c += 1;
        }
        cell.count = c;
      } else {
        cell.count = 1;
      }
      current[cell.hash] = cell;
    });
    return current;
  };

  private cleanTimer = () => {
    if (this.state.intervalId) {
      clearTimeout(this.state.intervalId);
    }
  };

  private stop = () => {
    this.setState({ isPlaying: false });
    this.cleanTimer();
  };

  private runTimer = (interval: number) => {
    // this.cleanTimer();
    const intervalId = setTimeout(this.update, 1000 * interval);
    this.setState({ intervalId });
  };

  private reset = () => {
    this.counterSet(0, 0);
    this.data.reset();
    this.setState({ dataUpdate: this.data.dataUpdate });
  };

  private playStop = () => {
    // if Play & Stop
    if (this.state.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  };

  private play = () => {
    this.reset();
    this.setState({ isPlaying: true });
    this.update();
  };

  private timerTic() {
    if (this.state.isPlaying) {
      this.runTimer(this.state.interval);
    }
  }

  private sortingSet = (coll: any) => {
    if (typeof coll === 'object') {
      const dcoll = coll;
      const sort = ['bytes', 'memory_usage', 'bytes_read', 'bytes_written'];
      if (sort.indexOf(dcoll.name) !== -1) {
        dcoll.useHumanSort = true;
      }
      return dcoll;
    }
    return true;
  };

  private counterSet(error: number, ok: number) {
    // Set
    this.setState({ countError: error, countSuccess: ok });
  }

  private update = () => {
    const isOnlySELECT: boolean = this.state.checkedList.indexOf('Only SELECT') !== -1;
    const isCluster: boolean = this.state.checkedList.indexOf('Talk Cluster') !== -1;
    const isLogMode: boolean = this.state.checkedList.indexOf('Log mode') !== -1;
    const { store } = this.props;

    store
      .getProcessLists(isOnlySELECT, isCluster)
      .then(data => {
        // Inc

        // console.info('this.data.isHaveData=',this.data.isHaveData);
        if (!this.data.isHaveData) {
          this.data.apply(data);
        } else {
          // Merge
          if (!isLogMode) {
            this.data.apply(data);
          } else {
            // Merge data
            if (data.data && data.data.length) {
              this.data.mergeByKey(data.data, 'hash');
              // console.log("Time",this.data.dataUpdate);
            }
          }
        }
        this.setState({ dataUpdate: this.data.dataUpdate });
        // INC
        this.counterSet(this.state.countError, this.state.countSuccess + 1);

        // Data
        // if (!this.state.columns.length) {
        //   this.setState({ columns: data.meta.map(this.sortingSet).map(getFormatForColumn) });
        // }
        // if (data.data.length) {
        //   const current = this.state.data;
        //   const setter = isLogMode ? this.megreData(data.data, current) : data.data;
        //   this.setState({ data: setter });
        // } else if (!isLogMode) {
        //   // Drop data, if result is empty
        //   this.setState({ data: [] });
        // }
        this.timerTic();
      })
      .catch(e => {
        console.log('Error', e);
        this.counterSet(this.state.countError + 1, this.state.countSuccess);
        if (this.state.countError > 19) {
          this.stop();
        } else {
          this.timerTic();
        }
      });
  };

  render() {
    const ratesOptions = [
      // { label: '0.1 seconds', value: 0.1 },
      { label: '0.5 seconds', value: 0.5 },
      { label: '1 seconds', value: 1 },
      { label: '2 seconds', value: 2 },
      { label: '5 seconds', value: 5 },
    ];
    const children: Array<any> = [];
    ratesOptions.forEach(item => {
      children.push(<IOption key={item.value.toString()}>{item.label}</IOption>);
    });

    return (
      <div>
        <Divider>Processes</Divider>
        <Select
          defaultValue="0.5"
          placeholder="Rate"
          style={{ width: 120 }}
          size="small"
          onChange={this.handleChange}
        >
          {children}
        </Select>
        <CheckboxGroup
          options={checkOptions}
          defaultValue={checkOptions}
          onChange={this.onChangeCheckbox}
        />
        <Button icon={this.state.isPlaying ? 'stop' : 'play-circle'} onClick={this.playStop}>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button icon="close" onClick={this.reset}>
          Clean
        </Button>
        <span>
          - Requests errors:
          {this.state.countError}
          ,Success:
          {this.state.countSuccess}
        </span>
        <Divider />
        <DataTable dataUpdate={this.state.dataUpdate} data={this.data} fill />
      </div>
    );
  }
}
export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.tabsStore,
}))(ProcessesTabPage);
