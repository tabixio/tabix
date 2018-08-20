import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { FormProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import { DirectSignInStore } from 'stores';
import ButtonsContainer from '../ButtonsContainer';

interface InjectedProps {
  store: DirectSignInStore;
}

export interface Props extends InjectedProps {
  className?: string;
}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
export default class DirectSignInForm extends React.Component<FormProps> {
  render() {
    return (
      <Form layout="vertical" {...this.props}>
        <Form.Item help="For example: dev">
          <Input name="name" placeholder="Connection name" />
        </Form.Item>

        <Form.Item help="http://<host>:<port>">
          <Input name="url" placeholder="Connection url" />
        </Form.Item>

        <Form.Item>
          <Input name="username" placeholder="Login" />
        </Form.Item>

        <Form.Item>
          <Input name="password" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item help="key1=value&key2=value">
          <Input name="params" placeholder="Extend params query" />
        </Form.Item>

        <Form.Item>
          <ButtonsContainer>
            <Button block type="primary">
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
