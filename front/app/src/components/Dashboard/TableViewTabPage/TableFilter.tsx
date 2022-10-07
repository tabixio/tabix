import {
  Table,
  Row,
  Tag,
  InputNumber,
  Dropdown,
  Popover,
  Button,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { Flex } from 'reflexy';
import { FilterOutlined } from '@ant-design/icons';
import React from 'react';
import { ServerStructure } from '../../../services';
interface InjectedProps {
  // store: TabsStore;
  table: Readonly<ServerStructure.Table> | undefined;
  // model: TableViewTabModel;
}
interface ColumnFilter extends ServerStructure.Column {
  isSelect: boolean;
  filterEqType?: string;
  filterValue?: string;
}

const { Option } = Select;
const { RangePicker } = DatePicker;
type Props = InjectedProps;
export class TableFilter extends React.Component<Props> {
  state = {
    selectedColumns: [] as Array<ServerStructure.Column>, // Check here to configure the default column
    columns: [] as Array<ColumnFilter>,
  };
  componentDidMount() {
    console.log('Mounter');
    const { table } = this.props;

    const columns: Array<ColumnFilter> = [];
    table?.columns.forEach((_) => {
      columns.push({
        ..._,
        isSelect: true,
        filterEqType: undefined,
        filterValue: undefined,
      });
    });
    this.setState({ columns });
  }
  renderInput = (type: string, col: ServerStructure.Column) => {
    // col.type
    // String
    // UInt16
    // Array(LowCardinality(String))
    // Date
    // DateTime

    if (col.type.indexOf('UInt') === 0 || col.type.indexOf('Int') === 0) return <InputNumber />;

    if (col.type.indexOf('DateTime') === 0)
      return <DatePicker format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }} />;
    // return <RangePicker showTime={{ format: 'HH:mm' }}/>;
    if (col.type.indexOf('Date') === 0) return <DatePicker />;
    return <Input placeholder={col.type} />;

    //
  };
  renderEq = (type: string, col: ServerStructure.Column) => {
    // Select
    // ===   -   equals
    // =/=   -   not equal

    return (
      <Select defaultValue="Eq">
        <Option value="Eq"> = </Option>
        <Option value="notEq"> !=</Option>
        <Option value="GTe"> {'>='} </Option>
        <Option value="LTe"> {'<='} </Option>
        <Option value="IN"> IN </Option>
        <Option value="NULL"> NULL </Option>
        <Option value="EMPTY"> empty </Option>
      </Select>
    );
  };

  private load = () => {
    //
  };
  render() {
    const renderTableColumns = [
      {
        dataIndex: 'name',
        title: 'Name',
        render: (name: string) => {
          let showname = name;
          if (showname.length > 20) showname = showname.slice(0, 20) + '...';
          return (
            <Popover content={name}>
              <Tag>{showname}</Tag>
            </Popover>
          );
        },
      },
      {
        dataIndex: 'type',
        title: 'TT',
        render: (type: string) => {
          let showType = type;
          if (showType.length > 14) showType = showType.slice(0, 14) + '...';
          return (
            <Popover content={type}>
              <Tag>{showType}</Tag>
            </Popover>
          );
        },
      },
      {
        dataIndex: 'type',
        title: ' Eq. ',
        render: (type: string, col: ServerStructure.Column) => this.renderEq(type, col),
      },
      {
        dataIndex: 'type',
        title: 'Value',
        render: (type: string, col: ServerStructure.Column) => this.renderInput(type, col),
      },
    ];
    const rowSelection = {
      // getCheckboxProps: (item: any) => ({ disabled: false }),
      // onSelect: (record, selected, selectedRows) => {
      //   console.log(record, selected, selectedRows);
      // },
      // onSelectAll(selected: boolean, selectedRows: any) {
      //   console.log(selected, selectedRows);
      //   // const treeSelectedKeys = selectedRows
      //   //   .filter((item) => !item.disabled)
      //   //   .map(({ key }) => key);
      //   // const diffKeys = selected
      //   //   ? difference(treeSelectedKeys, listSelectedKeys)
      //   //   : difference(listSelectedKeys, treeSelectedKeys);
      //   // onItemSelectAll(diffKeys, selected);
      // },
      onSelect: (record: ColumnFilter, selected: boolean) => {
        // onItemSelect(key, selected);
      },
      // selectedRowKeys: [],
    };
    // const [checkStrictly, setCheckStrictly] = React.useState(false);
    return (
      <Flex fill>
        <Flex fill style={{ border: '1px solid silver' }}>
          <Table
            rowSelection={rowSelection}
            columns={renderTableColumns}
            dataSource={this.state.columns}
            pagination={false}
            scroll={{ x: '400px' }}
            size="small"
            style={{ height: '100%', width: '100%' }}
            rowKey="id"
            // style={{ pointerEvents: listDisabled ? 'none' : null }}
            // onRow={({ key, disabled: itemDisabled }) => ({
            //   onClick: () => {
            //     if (itemDisabled || listDisabled) return;
            //     onItemSelect(key, !listSelectedKeys.includes(key));
            //   },
            // })}
          />
        </Flex>
      </Flex>
    );
  }
}
