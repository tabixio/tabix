import React from 'react';
import { Button, Popconfirm } from 'antd';
import { Flex } from 'reflexy';
import css from './ActionButtons.css';

export interface ActionButtonsProps {
  signInEnabled?: boolean;
  deleteEnabled?: boolean;
  onSignIn?: () => void;
  onDelete?: () => void;
  onFinish?: (values: any) => void;
}

export default function ActionButtons({
  signInEnabled = true,
  deleteEnabled,
  onSignIn,
  onDelete,
}: ActionButtonsProps) {
  const drop = () => {
    console.log('DELELELT', onDelete);
    onDelete && onDelete();
  };
  return (
    <Flex className={css.root}>
      <Button type="primary" htmlType="submit" disabled={!signInEnabled}>
        SIGN IN
      </Button>

      <Popconfirm
        title="Are you sure delete this connection?"
        onConfirm={drop}
        okText="Yes"
        cancelText="No"
      >
        <Button danger disabled={!deleteEnabled}>
          DELETE
        </Button>
      </Popconfirm>
    </Flex>
  );
}
