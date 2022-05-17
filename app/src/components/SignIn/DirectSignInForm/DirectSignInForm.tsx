import React from 'react';
import { observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import { DirectConnectionModel, ConnectionMode } from 'models';
import { error2status } from 'components/utils';
import ActionButtons, { ActionButtonsProps } from '../ActionButtons';
import css from './Form.css';
import classNames from 'classnames';

const { Option } = Select;

export interface Props extends ActionButtonsProps {
  model: DirectConnectionModel;
}

@observer
export default class DirectSignInForm extends React.Component<Props> {
  render() {
    const {
      model,
      model: { changeField, errors },
      ...rest
    } = this.props;
    const changeReadOnlyField = (v: ConnectionMode) => {
      changeField({ name: 'mode', value: v });
    };

    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={classNames(css['main-container'])}
      >
        <Form.Item
          label="Title"
          help="For example: dev"
          validateStatus={error2status(errors.connectionName.error.nonEmpty())}
          tooltip={'Title / Name service connection'}
        >
          <Input
            name="connectionName"
            placeholder="Connection name"
            value={model.connectionName}
            onChange={changeField}
          />
        </Form.Item>
        <Form.Item
          label="URL"
          help="http[s]://<host>:<port>"
          validateStatus={error2status(errors.connectionUrl.error.nonEmpty())}
        >
          <Input
            name="connectionUrl"
            placeholder="Connection url"
            value={model.connectionUrl}
            onChange={changeField}
          />
        </Form.Item>
        <Form.Item label={'User'} validateStatus={error2status(errors.username.error.nonEmpty())}>
          <Input
            name="username"
            placeholder="Login"
            value={model.username}
            onChange={changeField}
          />
        </Form.Item>
        <Form.Item label={'Password'}>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={model.password}
            onChange={changeField}
          />
        </Form.Item>
        <Form.Item label={'Mode'}>
          <Select
            value={model.mode}
            defaultValue={ConnectionMode.normal}
            onChange={changeReadOnlyField}
          >
            <Option value={ConnectionMode.normal}>Normal mode</Option>
            <Option value={ConnectionMode.readOnly}>Use readOnly user,not recommended</Option>
          </Select>
          {/*  <Input*/}
          {/*    name="params"*/}
          {/*    placeholder="Extend params query"*/}
          {/*    readOnly={true}*/}
          {/*    value={model.params}*/}
          {/*    onChange={changeField}*/}
          {/*  />*/}
        </Form.Item>
        <Form.Item>
          <ActionButtons {...rest} />
        </Form.Item>
      </Form>
    );
  }
}
