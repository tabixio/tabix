import React from 'react';
import { Flex } from 'reflexy';
import { notification } from 'antd';
import css from './AppErrorBoundary.css';

interface Props {
  error?: string;
}

interface State {
  hasError: boolean;
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null {
    if (!!nextProps.error !== prevState.hasError) {
      return { hasError: !!nextProps.error };
    }
    return null;
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidMount() {
    const { error } = this.props;
    error && this.showErrorIfHas(error);
  }

  componentDidUpdate() {
    const { error } = this.props;
    error && this.showErrorIfHas(error);
  }

  componentDidCatch(error: Error) {
    this.showErrorIfHas(error.message);
  }

  private showErrorIfHas(error: string) {
    notification.open({
      key: 'appErrorId',
      type: 'error',
      message: error,
      description: '',
      duration: 10,
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Flex column center fill className={css.root}>
        <h1>An error has occurred.</h1>
        <h2>See console log for more information.</h2>
        <a href="/signout">Try `sign out`</a>
      </Flex>
    );
  }
}
