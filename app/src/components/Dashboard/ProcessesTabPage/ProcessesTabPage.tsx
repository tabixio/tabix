import React from 'react';
import { Button, Select, Checkbox, Divider } from 'antd';

// push
interface Props {}

const Option = Select.Option;

const CheckboxGroup = Checkbox.Group;

export default class ProcessesTabPage extends React.Component<Props> {
  public handleChange(value: string): void {
    console.log(`selected ${value}`);
  }

  render() {
    const checkOptions = ['Log mode', 'Cluster mode', 'Select query only'];
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
