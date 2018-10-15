import React from 'react';
import { observer } from 'mobx-react';
import ReactEcharts from 'echarts-for-react';
import DataDecorator from 'services/api/DataDecorator';

interface Props {
  data: DataDecorator;
}

@observer
export default class Draw extends React.Component<Props> {
  render() {
    const { data } = this.props;
    console.log(data.rows);

    // const dataset = data.meta.columns.map(c => ({ data: c.name, title: c.name }));
    const options = {
      title: {
        text: 'ECharts ',
      },
      legend: {},
      tooltip: {},
      dataset: {
        // dimensions: data.meta.columns.map(c => c.name),
        source: data.rows,
        sourceHeader: false,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: {
        type: 'bar',
        // dimensions: ['date', { name: 'nums' }],
        encode: {
          x: 0,
          y: [1, 2, 3],
        },
      },
    };

    return <ReactEcharts option={options} />;
  }
}
