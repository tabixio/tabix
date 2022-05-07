import React from 'react';
import { observer } from 'mobx-react';
import DataDecorator from 'services/api/DataDecorator';
import * as sizeSensor from 'size-sensor';
import ReactECharts from 'echarts-for-react';
import { Flex, FlexProps } from 'reflexy';
import { PlotlyCreator } from 'services';
import { AutoChart } from '@antv/auto-chart';
import { Advisor, Linter, ChartAdvisor } from '@antv/chart-advisor';

interface Props {
  data: DataDecorator;
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

@observer
export default class Draw extends React.Component<Props & FlexProps> {
  private readonly rootRef = React.createRef<HTMLDivElement>();

  private chartRef = React.createRef<ReactECharts>();

  data: any;

  state: State = {
    width: undefined,
    revision: 0,
  };

  componentDidMount() {
    // Process data
    this.data = PlotlyCreator.create(this.props.data);

    // Resizer init
    sizeSensor.bind(this.rootRef.current, (el) => {
      // @ToDo: move to react-sizeme, react-resize-detector[useResizeDetector], use call onResizeGrid?
      // @ToDo: DataTable have to `sizeSensor`
      // Warn! Плохая реализация происходит перерисовка
      const width = el ? el.clientWidth : this.state.width;
      if (width && width !== this.state.width) {
        // For update Plotly when resizing
        this.setState({ width });
      }
    });
  }

  componentWillUnmount() {
    sizeSensor.clear(this.rootRef.current);
  }

  onResize() {
    console.log('ON RESIZE DRAW!');
    // this.setState(prevState:State => ({
    //   revision: prevState.revision + 1,
    // }));
  }

  render() {
    const { data, className, ...flexProps } = this.props;
    const myChartAdvisor = new ChartAdvisor();
    const ddata = data.rows;
    console.log('DData', ddata);
    const results = myChartAdvisor.advise({ data: ddata });
    console.log('results', results);

    const myAdvisor = new Advisor();
    const advices = myAdvisor.advise({
      data: ddata,
      fields: ['number', 'ss', 'cc'],
      options: { refine: true },
    });
    console.log('advices', advices);
    const options = {
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
    const defaultData = [
      { price: 100, type: 'A' },
      { price: 120, type: 'B' },
      { price: 150, type: 'C' },
    ];
    console.log('DATA', data.rows);
    return (
      <Flex componentRef={this.rootRef} column {...flexProps}>
        <AutoChart
          title="CASE 1"
          description="auto chart analysis"
          data={data.rows}
          purpose={'Comparison'}
          language={'en-US'}
        />
        {/*<ReactECharts*/}
        {/*  ref={this.chartRef}*/}
        {/*  option={options}*/}
        {/*  notMerge={true}*/}
        {/*  lazyUpdate={true}*/}
        {/*  style={{ width: '100%', height: '100%' }}*/}
        {/*  // layout={{*/}
        {/*  //   font: {*/}
        {/*  //     size: 12,*/}
        {/*  //     color: 'white',*/}
        {/*  //     family: 'Menlo, Inconsolata, Courier New, monospace, Helvetica, arial, sans-serif',*/}
        {/*  //   },*/}
        {/*  //*/}
        {/*  //   plot_bgcolor: '#404041',*/}
        {/*  //   paper_bgcolor: '#404041',*/}
        {/*  //   legend: { bgcolor: '#303030', orientation: 'h' },*/}
        {/*  //   autosize: true,*/}
        {/*  //*/}
        {/*  //   // Dark*/}
        {/*  //   // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/themes.py*/}
        {/*  //   // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/palettes.py*/}
        {/*  //   // https://github.com/plotly/plotly.py/blob/master/packages/python/plotly/templategen/definitions.py*/}
        {/*  //   // colors: {*/}
        {/*  //   //   increasing: '#00FF00',*/}
        {/*  //   //   decreasing: '#FF9900',*/}
        {/*  //   //   border_increasing: 'rgba(255, 255, 255, 0.05)',*/}
        {/*  //   //   border_decreasing: 'rgba(255, 255, 255, 0.05)',*/}
        {/*  //   //   primary: '#11AAEE',*/}
        {/*  //   //   secondary: '#0084FF',*/}
        {/*  //   //   tertiary: '#FC0D1B',*/}
        {/*  //   //   quaternary: '#00FF00',*/}
        {/*  //   //   grey: 'rgba(255, 255, 255, 0.25)',*/}
        {/*  //   //   grey_light: 'rgba(255, 255, 255, 0.15)',*/}
        {/*  //   //   grey_strong: 'rgba(255, 255, 255, 0.40)',*/}
        {/*  //   //   fill: 'rgba(255, 255, 255, 0.10)',*/}
        {/*  //   //   fill_light: 'rgba(255, 255, 255, 0.05)',*/}
        {/*  //   //   fill_strong: 'rgba(255, 255, 255, 0.15)',*/}
        {/*  //   // },*/}
        {/*  // }}*/}
        {/*  // config={{ responsive: true }}*/}
        {/*/>*/}
      </Flex>
    );
  }

  //
}
