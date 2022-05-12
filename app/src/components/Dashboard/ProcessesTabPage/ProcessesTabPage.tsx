import React from 'react';
import { Row, Col, Button, Select, Checkbox, Divider } from 'antd';
import { typedInject } from 'module/mobx-utils';
import { Stores, TabsStore } from 'stores';
import { observer } from 'mobx-react';
import { Flex } from 'reflexy';
import { TableSheet } from 'components/TableSheet';
import { DataDecorator } from 'services';
import { CaretRightOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons';

//
interface InjectedProps {
  store: TabsStore;
}

enum ListOptions {
  LOG = 'Log mode',
  CLUSTER = 'Talk Cluster',
  SELECT = 'Only Select',
  PROFILE = 'Detail Profile',
}

type Props = InjectedProps;

const IOption = Select.Option;

@observer
class ProcessesTabPage extends React.Component<Props> {
  protected data: DataDecorator = new DataDecorator();

  PresetOptions = {
    [ListOptions.LOG]: true,
    [ListOptions.CLUSTER]: false,
    [ListOptions.SELECT]: true,
    [ListOptions.PROFILE]: false,
  };

  state = {
    intervalId: undefined,
    settingsOptions: [] as Array<string>,
    dataUpdate: Date.now(),
    columns: [],
    interval: 0.1,
    isPlaying: false,
    countError: 0,
    countSuccess: 0,
  };

  constructor(props: any) {
    super(props);

    const set: Array<string> = [];
    for (const [key, value] of Object.entries(this.PresetOptions)) {
      if (value) set.push(key);
    }
    this.state.settingsOptions = set;
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  private handleChange = (value: string) => {
    const v = parseFloat(value);
    this.setState({ interval: v });
  };

  private onChangeSettings = (settingsOptions: any) => {
    this.setState({ settingsOptions });
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

  private is(n: string): boolean {
    return this.state.settingsOptions.indexOf(n) !== -1;
  }

  private update = () => {
    const { store } = this.props;
    store
      .getProcessLists(this.is(ListOptions.SELECT), this.is(ListOptions.CLUSTER))
      .then((data) => {
        // Inc
        if (data.isError) {
          throw Error(data.error ?? 'Error1');
        }
        if (!this.data.isHaveData) {
          this.data.apply(data.response);
        } else {
          // Merge
          if (!this.is(ListOptions.LOG)) {
            this.data.apply(data.response);
          } else {
            // Merge data
            if (data.response.data && data.response.data.length) {
              this.data.mergeByKey(data.response.data, 'hash');
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
      .catch((e) => {
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
    //
    const { isPlaying, countError, settingsOptions, countSuccess, dataUpdate } = this.state;

    const children: Array<React.ReactElement> = [];
    const settings: Array<React.ReactElement> = [];

    ratesOptions.forEach((item) => {
      children.push(<IOption key={item.value.toString()}>{item.label}</IOption>);
    });
    for (const [key] of Object.entries(this.PresetOptions)) {
      settings.push(<IOption key={key}>{key}</IOption>);
    }

    return (
      <div>
        <Flex column>
          <Divider style={{ margin: ' 5px 0' }}>Processes</Divider>
          <Row justify="space-around">
            <Col flex="200px">
              <Button size="large" onClick={this.playStop}>
                {isPlaying ? (
                  <PauseOutlined style={{ color: 'orange' }} />
                ) : (
                  <CaretRightOutlined style={{ color: 'orange' }} />
                )}
                {isPlaying ? ' Pause' : ' Play'}
              </Button>

              <Button size="large" onClick={this.reset}>
                <CloseOutlined style={{ color: 'red' }} />
                Clean
              </Button>
            </Col>

            <Col flex="auto">
              <Select
                defaultValue="0.5"
                placeholder="Rate"
                style={{ width: 120 }}
                size="large"
                onChange={this.handleChange}
              >
                {children}
              </Select>
              <Select
                mode="multiple"
                size="large"
                placeholder="Please select"
                // @ts-ignore (need update rc-select ts type? )
                defaultValue={settingsOptions}
                onChange={this.onChangeSettings}
                style={{ width: '50%' }}
              >
                {settings}
              </Select>
            </Col>
          </Row>
          <Divider dashed={true} style={{ margin: ' 5px 0' }} />

          <span>
            &nbsp;&nbsp;&nbsp;Requests errors:
            {countError}
            ,Success:
            {countSuccess}
          </span>
          <Divider dashed={true} style={{ margin: ' 5px 0' }} />
        </Flex>
        <Flex vfill={true} hfill={true}>
          <TableSheet dataUpdate={dataUpdate} data={this.data} fill />
        </Flex>
      </div>
    );
  }
}

export default typedInject<InjectedProps, Props, Stores>(({ store }) => ({
  store: store.tabsStore,
}))(ProcessesTabPage);
