import React from 'react';
import { Button, Select, Checkbox, Divider } from 'antd';
import { typedInject } from 'module/mobx-utils';
import { Stores, TabsStore } from 'stores';
import { observer } from 'mobx-react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import '../EditorTabPage/DataTable/dark.css';
import getFormatForColumn from '../EditorTabPage/DataTable/utils';

interface InjectedProps {
  store: TabsStore;
}

interface Props extends InjectedProps {}

const hotTableSettings: Handsontable.DefaultSettings = {
  className: 'handsontable-dark',
  rowHeaders: true,
  // allowEmpty: false,
  autoRowSize: false,
  // autoColumnSize: { samplingRatio: 23 },
  allowInsertColumn: false,
  allowInsertRow: false,
  manualColumnMove: false,
  manualColumnResize: true,
  manualColumnFreeze: true,
  stretchH: 'all',
  colWidths: 100,
  observeChanges: true /* =<!memory leak if true! */,
  observeDOMVisibility: true,
  fillHandle: false,
  viewportColumnRenderingOffset: 'auto',
  wordWrap: false,
  // renderAllRows: false,
  visibleRows: 140,
  columnSorting: {
    initialConfig: {
      column: 3,
      sortOrder: 'desc',
    },
  },
};

const IOption = Select.Option;

const CheckboxGroup = Checkbox.Group;

const checkOptions = ['Log mode', 'Talk Cluster', 'Only SELECT'];
@observer
class ProcessesTabPage extends React.Component<Props> {
  state = {
    intervalId: undefined,
    checkedList: checkOptions,
    data: [],
    columns: [],
    interval: 0.1,
    isPlaying: false,
    countError: 0,
    countSuccess: 0,
  };

  private tableRef = React.createRef<HotTable>();

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  private handleChange = (value: string) => {
    const v = parseFloat(value);
    this.setState({ interval: v });
    if (this.state.intervalId) {
      this.runTimer(v);
    }
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
      clearInterval(this.state.intervalId);
    }
  };

  private stop = () => {
    this.setState({ isPlaying: false });
    this.cleanTimer();
  };

  private runTimer = (interval: number) => {
    this.cleanTimer();
    const intervalId = setInterval(this.update, 1000 * interval);
    this.setState({ intervalId });
  };

  private reset = () => {
    this.counterSet(0, 0);
    this.setState({ data: [] });
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
    this.runTimer(this.state.interval);
  };

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
        this.counterSet(this.state.countError, this.state.countSuccess + 1);
        if (!this.state.columns.length) {
          this.setState({ columns: data.meta.map(this.sortingSet).map(getFormatForColumn) });
        }
        if (data.data.length) {
          const current = this.state.data;
          const setter = isLogMode ? this.megreData(data.data, current) : data.data;
          this.setState({ data: setter });
        } else if (!isLogMode) {
          // Drop data, if result is empty
          this.setState({ data: [] });
        }
      })
      .catch(e => {
        console.log('Error', e);
        this.counterSet(this.state.countError + 1, this.state.countSuccess);

        if (this.state.countError > 19) {
          this.stop();
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
        <HotTable
          ref={this.tableRef}
          settings={hotTableSettings}
          columns={this.state.columns}
          data={Object.values(this.state.data)}
        />
      </div>
    );
  }
}
export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.tabsStore,
}))(ProcessesTabPage);
