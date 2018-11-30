import React from 'react';
import { Button, Select, Checkbox, Divider } from 'antd';
// import {DashboardStore} from "../../../stores";

interface Props {}

const Option = Select.Option;

const CheckboxGroup = Checkbox.Group;

export default class ProcessesTabPage extends React.Component<Props> {
  public handleChange(value: string): void {
    console.log(`selected ${value}`);
  }

  getQueryProcessesList(
    isOnlySELECT: boolean,
    isCluster: boolean,
    clusterList: Array<string>,
    login: string,
    password: string
  ): string {
    let sql = `SELECT  now() as dt, query,  1 as count,
                toUInt64(toUInt64(read_rows) + toUInt64(written_rows)) as rows,
                round(elapsed,1) as elapsed ,
                formatReadableSize(toUInt64(read_bytes)+toUInt64(written_bytes)) as bytes, 
                formatReadableSize(memory_usage) as memory_usage,
                formatReadableSize(read_bytes) as bytes_read,
                formatReadableSize(written_bytes) as bytes_written,  
                * ,     
                cityHash64(query) as hash,  
                hostName()`;
    if (isCluster) {
      sql = `${sql} FROM remote('${clusterList.join(
        ','
      )}',system.processes, '${login}','${password}')`;
    } else {
      sql = `${sql} FROM system.processes `;
    }
    // исключить запрос
    sql = `${sql} /* 12XQWE3X1X2XASDF */ WHERE query not like '%12XQWE3X1X2XASDF%'`;
    if (isOnlySELECT) {
      sql = `${sql} AND read_rows>0`;
    }
    return sql;
  }

  render() {
    const checkOptions = ['Log mode', 'Talk Cluster', 'Only SELECT'];
    const ratesOptions = [
      { label: '0.1 seconds', value: 0.1 },
      { label: '0.5 seconds', value: 0.5 },
      { label: '1 seconds', value: 1 },
      { label: '2 seconds', value: 2 },
      { label: '5 seconds', value: 5 },
    ];
    const children: Array<any> = [];
    ratesOptions.forEach(item => {
      children.push(<Option key={item.value.toString()}>{item.label}</Option>);
    });

    return (
      <div>
        <Divider>Processes</Divider>
        <Select
          defaultValue="0.1"
          placeholder="Rate"
          style={{ width: 120 }}
          size="small"
          onChange={this.handleChange}
        >
          {children}
        </Select>
        <CheckboxGroup options={checkOptions} />
        <Button type="primary" icon="play-circle" size="small" />
      </div>
    );
  }
}
