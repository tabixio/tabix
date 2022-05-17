import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Space, Form, Select, message, Input } from 'antd';
import { DirectConnectionModel, ConnectionMode } from 'models';
import { error2status } from 'components/utils';
import ActionButtons, { ActionButtonsProps } from '../ActionButtons';
import css from './Form.css';
import classNames from 'classnames';

const { Option } = Select;

export interface Props extends ActionButtonsProps {
  model: DirectConnectionModel;
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

//
// model, model: { changeField; errors }, ...rest
// @observer
export const DirectSignInForm = ({ model, onSignIn, onDelete, onFinish, ...rest }: Props) => {
  const [form] = Form.useForm();
  const getFields = () => [
    { name: 'connectionName', value: model.connectionName },
    { name: 'username', value: model.username },
    { name: 'connectionUrl', value: model.connectionUrl },
    { name: 'password', value: model.password },
    { name: 'mode', value: model.mode },
  ];
  React.useEffect(() => {
    setFields(getFields);
  }, [model]);

  const onFinishFailed = () => {
    message.error('Submit failed, form error!');
  };
  const [fields, setFields] = useState<FieldData[]>(getFields);

  return (
    <Form
      size={'large'}
      form={form}
      fields={fields}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className={classNames(css['main-container'])}
    >
      <Form.Item
        label="Title"
        help="For example: dev/prod"
        tooltip={'Title / Name service connection'}
        rules={[{ required: true }, { type: 'string', min: 3 }]}
        name="connectionName"
      >
        <Input placeholder="Connection name" />
      </Form.Item>
      <Form.Item
        name="connectionUrl"
        label="URL"
        help="http[s]://<host>:<port>"
        rules={[{ required: true }, { type: 'url' }, { type: 'string', min: 6 }]}
      >
        <Input
          placeholder="Connection clickhouse, http[s]://host:port"
          // onChange={model.changeField}
        />
      </Form.Item>

      <Form.Item name="username" label="User" rules={[{ required: true }]}>
        <Input placeholder="Login" />
      </Form.Item>

      <Form.Item label={'Password'} name="password">
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item label={'Mode'} name="mode">
        <Select>
          <Option value={ConnectionMode.normal}>Normal mode</Option>
          <Option value={ConnectionMode.readOnly}>Use readOnly user,not recommended</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <ActionButtons onDelete={onDelete} {...rest} />
      </Form.Item>
    </Form>
  );
};
