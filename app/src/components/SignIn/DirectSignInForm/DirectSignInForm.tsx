import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { error2status } from 'components/utils';
import { DirectConnectionModel } from 'models';
import ButtonsContainer from '../ButtonsContainer';

export interface Props {
  model: DirectConnectionModel;
  className?: string;
}

@observer
export default class DirectSignInForm extends React.Component<Props> {
  private submit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    const { model } = this.props;
    model.validate();
    // const { store, history } = this.props;
    // store.signIn(history);
  };

  render() {
    const {
      className,
      model,
      model: { changeField, errors },
    } = this.props;

    return (
      <Form layout="vertical" className={className} onSubmit={this.submit}>
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

        <Form.Item validateStatus={error2status(errors.password.error.nonEmpty())}>
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
          <ButtonsContainer>
            <Button block type="primary" htmlType="submit">
              SIGN IN
            </Button>
            <Button block type="danger">
              DELETE
            </Button>
          </ButtonsContainer>
        </Form.Item>
      </Form>
    );
  }
}
