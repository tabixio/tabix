import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { DirectSignInStore, Stores } from 'stores';
import { typedInject } from '@vzh/mobx-stores';
import { error2status } from 'components/utils';
import ButtonsContainer from '../ButtonsContainer';

interface InjectedProps {
  store: DirectSignInStore;
}

export interface Props extends InjectedProps {
  className?: string;
}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class DirectSignInForm extends React.Component<RoutedProps> {
  private submit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    const { store, history } = this.props;
    if (store.model.validate()) {
      store.signIn(history);
    }
  };

  render() {
    const {
      store,
      store: {
        model: { changeField, errors },
      },
      className,
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
            value={store.model.connectionName}
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
            value={store.model.connectionUrl}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.username.error.nonEmpty())}>
          <Input
            name="username"
            placeholder="Login"
            value={store.model.username}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.password.error.nonEmpty())}>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={store.model.password}
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
            value={store.model.params}
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

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({
    store: store.directSignInStore,
  }))(DirectSignInForm)
);
