import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { DirectConnectionModel } from 'models';
import { error2status } from 'components/utils';
import ActionButtons, { ActionButtonsProps } from '../ActionButtons';

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

    return (
      <Form layout="vertical">
        <Form.Item
          help="For example: dev"
          validateStatus={error2status(errors.connectionName.error.nonEmpty())}
        >
          <Input
            name="connectionName"
            placeholder="Connection name"
            value={model.connectionName}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item
          help="http://<host>:<port>"
          validateStatus={error2status(errors.connectionUrl.error.nonEmpty())}
        >
          <Input
            name="connectionUrl"
            placeholder="Connection url"
            value={model.connectionUrl}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.username.error.nonEmpty())}>
          <Input
            name="username"
            placeholder="Login"
            value={model.username}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={model.password}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item
          help="key1=value&key2=value"
          validateStatus={error2status(errors.params.error.nonEmpty())}
        >
          <Input
            name="params"
            placeholder="Extend params query"
            value={model.params}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item>
          <ActionButtons {...rest} />
        </Form.Item>
      </Form>
    );
  }
}
