import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface Props<A> {
  actionType: A;
  // onAction: (action: A, event: React.MouseEvent<HTMLElement>) => void;
  onAction: (action: A, eventData?: any) => void;
}

export default class ActionButton<A> extends React.Component<Props<A> & ButtonProps> {
  private onClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onAction, actionType } = this.props;
    onAction(actionType, event);
  };

  render() {
    const { onAction, actionType, ...rest } = this.props;
    return <Button onClick={this.onClick} {...rest} />;
  }
}
