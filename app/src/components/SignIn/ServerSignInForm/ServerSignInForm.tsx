import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormProps } from 'antd/lib/form';
import ButtonsContainer from '../ButtonsContainer';

export default function ServerSignInForm(props: FormProps) {
  return (
    <Form layout="vertical" {...props}>
      <Form.Item help="For example: dev">
        <Input name="name" placeholder="Connection name" />
      </Form.Item>

      <Form.Item help="For example: https://tabix.dev/s1">
        <Input name="url" placeholder="Connection url" />
      </Form.Item>

      <Form.Item>
        <Input name="configKey" placeholder="Config key" />
      </Form.Item>

      <Form.Item>
        <Input name="username" placeholder="Login" />
      </Form.Item>

      <Form.Item>
        <Input name="password" type="password" placeholder="Password" />
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
