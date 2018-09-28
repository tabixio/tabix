import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import DataDecorator, { Row } from 'services/api/DataDecorator';

interface Props {
  data: DataDecorator;
}

class TableColumn extends Table.Column<Row> {}

@observer
export default class DataTable extends React.Component<Props> {
  render() {
    const { data } = this.props;

    console.log(data);

    return (
      <Table style={{ width: '100%' }} size="small" rowKey="id" dataSource={data.data}>
        {data.meta.columns.map(col => (
          <TableColumn key={col.name} dataIndex={col.name} title={col.name} />
        ))}
      </Table>
    );
  }
}
