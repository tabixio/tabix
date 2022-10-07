import React from 'react';
import { observer } from 'mobx-react';
import DataDecorator from 'services/api/DataDecorator';
import ReactECharts from 'echarts-for-react';
import { Flex, FlexProps } from 'reflexy';
import { TableSheetProps } from '../TableSheet/TableSheet';
import { SpreadSheet } from '@antv/s2';
import { Button, Col, Dropdown, Menu, Popover, Row } from 'antd';
import { SettingOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { SwitcherHeader } from '../TableSheet/Switcher/header';
import { Export } from '../TableSheet/Export';

interface DrawProps {
  data: DataDecorator | null;
  dataUpdate?: number;
  title?: string;
}

/**
 * @ToDO:
 * [x] Size 100%
 * [ ] Поддержка данных из CH
 * [ ] Обновление данных?
 * [ ] Lines
 * [ ] Disable title space
 *
 */

interface State {
  width?: number;
  revision?: number;
}

export default function Draw({
  data,
  title,
  // defaultHeight = 600,
  // defaultWidth = 600,
  ...flexProps
}: DrawProps & FlexProps) {
  const chartRef = React.useRef<ReactECharts>();

  const xAxisData = [];
  const ddata: Array<number> = [];
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i);
    ddata.push(Math.ceil((Math.cos(i / 5) * (i / 5) + i / 6) * 5) + 10);
  }

  const option = {
    title: {
      text: '最近50天每天项目完成情况',
      left: 'center',
      textStyle: {
        color: '#ccc',
        fontSize: 10,
      },
    },
    backgroundColor: '#08263a',
    xAxis: [
      {
        show: true,
        data: xAxisData,
        axisLabel: {
          textStyle: {
            color: '#ccc',
          },
        },
      },
      {
        show: false,
        data: xAxisData,
      },
    ],
    tooltip: {},
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#ccc',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#08263f',
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: 'Simulate Shadow',
        type: 'line',
        data: data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: 'linear',
        animationDuration: 1200,
        lineStyle: {
          normal: {
            color: 'transparent',
          },
        },
        areaStyle: {
          normal: {
            color: '#08263a',
            shadowBlur: 50,
            shadowColor: '#000',
          },
        },
      },
      {
        name: '完成项目数',
        type: 'bar',
        data: ddata,
        xAxisIndex: 1,
        z: 3,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
          },
        },
      },
    ],
  };
  const options2 = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const menu = (
    <Menu
      selectable
      // defaultSelectedKeys={[currentSheet]}
      onSelect={(value) => {
        // Update setSheetType
        // console.log('Header -> SetSheetType:', value.key);
        // setSheetType(value.key);
        // setSheetTypeLocal(value.key);
      }}
    >
      {['Line', 'Bar'].map((i) => (
        <Menu.Item key={i} itemID={i}>
          {i}
        </Menu.Item>
      ))}
    </Menu>
  );
  const pop = [
    <Dropdown overlay={menu} placement="topLeft" arrow key="settingZ">
      <Button icon={<VerticalAlignMiddleOutlined />}>Type chart</Button>
    </Dropdown>,
  ];

  return (
    <div style={{ width: '100%', height: '100%', alignContent: 'end', minHeight: '200px' }}>
      <Popover content={pop} title="chart settings ...">
        <Button icon={<SettingOutlined />} size={'small'}>
          Setting chart
        </Button>
      </Popover>
      <ReactECharts
        // ref={chartRef}
        theme={'dark'}
        option={options2}
        // notMerge={true}
        // lazyUpdate={true}
        // theme={'dark'}
        // onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

//
//
//
// @observer
// export default class Draw extends React.Component<Props & FlexProps> {
//   private readonly rootRef = React.createRef<HTMLDivElement>();
//
//   private chartRef = React.createRef<ReactECharts>();
//
//   data: any;
//
//   state: State = {
//     width: undefined,
//     revision: 0,
//   };
//
//   componentDidMount() {
//     // Process data
//     // this.data = PlotlyCreator.create(this.props.data);
//     // // Resizer init
//     // sizeSensor.bind(this.rootRef.current, (el) => {
//     //   // @ToDo: move to react-sizeme, react-resize-detector[useResizeDetector], use call onResizeGrid?
//     //   // @ToDo: DataTable have to `sizeSensor`
//     //   // Warn! Плохая реализация происходит перерисовка
//     //   const width = el ? el.clientWidth : this.state.width;
//     //   if (width && width !== this.state.width) {
//     //     // For update Plotly when resizing
//     //     this.setState({ width });
//     //   }
//     // });
//   }
//
//   componentWillUnmount() {
//     // sizeSensor.clear(this.rootRef.current);
//   }
//
//   onResize() {
//     console.log('ON RESIZE DRAW!');
//     // this.setState(prevState:State => ({
//     //   revision: prevState.revision + 1,
//     // }));
//   }
//
//   render() {
//     const { data, className, ...flexProps } = this.props;
//     // const myChartAdvisor = new ChartAdvisor();
//     // const ddata = data.rows;
//     // // console.log('Draw-> render data', ddata);
//     // const results = myChartAdvisor.advise({ data: ddata });
//     // // console.log('results', results);
//     //
//     // const myAdvisor = new Advisor();
//     // const advices = myAdvisor.advise({
//     //   data: ddata,
//     //   // fields: ['number', 'ss', 'cc'],
//     //   options: { refine: true },
//     // });
//     // // console.log('advices', advices);
//
//     // console.log('DATA', data.rows);
//     return (
//       <Flex componentRef={this.rootRef} column {...flexProps}>
//         {/*<ReactECharts*/}
//         {/*  ref={this.chartRef}*/}
//         {/*  option={options}*/}
//         {/*  notMerge={true}*/}
//         {/*  lazyUpdate={true}*/}
//         {/*  style={{ width: '100%', height: '100%' }}*/}
//         {/*  // layout={{*/}
//         {/*  //   font: {*/}
//         {/*  //     size: 12,*/}
//         {/*  //     color: 'white',*/}
//         {/*  //     family: 'Menlo, Inconsolata, Courier New, monospace, Helvetica, arial, sans-serif',*/}
//         {/*  //   },*/}
//         {/*  //*/}
//         {/*  //   plot_bgcolor: '#404041',*/}
//         {/*  //   paper_bgcolor: '#404041',*/}
//         {/*  //   legend: { bgcolor: '#303030', orientation: 'h' },*/}
//         {/*  //   autosize: true,*/}
//         {/*  //*/}
//         {/*  //   // Dark*/}
//         {/*  //   // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/themes.py*/}
//         {/*  //   // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/palettes.py*/}
//         {/*  //   // https://github.com/plotly/plotly.py/blob/master/packages/python/plotly/templategen/definitions.py*/}
//         {/*  //   // colors: {*/}
//         {/*  //   //   increasing: '#00FF00',*/}
//         {/*  //   //   decreasing: '#FF9900',*/}
//         {/*  //   //   border_increasing: 'rgba(255, 255, 255, 0.05)',*/}
//         {/*  //   //   border_decreasing: 'rgba(255, 255, 255, 0.05)',*/}
//         {/*  //   //   primary: '#11AAEE',*/}
//         {/*  //   //   secondary: '#0084FF',*/}
//         {/*  //   //   tertiary: '#FC0D1B',*/}
//         {/*  //   //   quaternary: '#00FF00',*/}
//         {/*  //   //   grey: 'rgba(255, 255, 255, 0.25)',*/}
//         {/*  //   //   grey_light: 'rgba(255, 255, 255, 0.15)',*/}
//         {/*  //   //   grey_strong: 'rgba(255, 255, 255, 0.40)',*/}
//         {/*  //   //   fill: 'rgba(255, 255, 255, 0.10)',*/}
//         {/*  //   //   fill_light: 'rgba(255, 255, 255, 0.05)',*/}
//         {/*  //   //   fill_strong: 'rgba(255, 255, 255, 0.15)',*/}
//         {/*  //   // },*/}
//         {/*  // }}*/}
//         {/*  // config={{ responsive: true }}*/}
//         {/*/>*/}
//       </Flex>
//     );
//   }
//
//   //
// }
