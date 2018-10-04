import React from 'react';
import { observer } from 'mobx-react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import DataDecorator from 'services/api/DataDecorator';

interface Props {
  data: DataDecorator;
}

@observer
export default class DataTable extends React.Component<Props> {
  render() {
    const { data } = this.props;
    // console.log(data);

    // todo: refactor with DataDecorator?
    const columns = data.meta.columns.map(c => ({ data: c.name, title: c.name }));
    return (
      <HotTable
        rowHeaders
        colHeaders
        columns={columns}
        data={data.rows}
        allowEmpty
        allowInsertColumn={false}
        allowInsertRow={false}
        readOnly
        columnSorting
        contextMenu
        manualColumnMove
        manualColumnResize
        manualRowResize
        stretchH="all"
      />
    );
  }
}
