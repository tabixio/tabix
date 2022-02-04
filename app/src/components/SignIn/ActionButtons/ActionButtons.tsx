import React from 'react';
import { Button, Popconfirm } from 'antd';
import { Flex } from 'reflexy';
import css from './ActionButtons.css';

export interface ActionButtonsProps {
  signInEnabled?: boolean;
  deleteEnabled?: boolean;
  onSignIn?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  signInEnabled = true,
  deleteEnabled,
  onSignIn,
  onDelete,
}: ActionButtonsProps) {
  return (
    <Flex className={css.root}>
      <Button type="primary" htmlType="submit" onClick={onSignIn} disabled={!signInEnabled}>
        SIGN IN
      </Button>

      <Popconfirm
        title="Are you sure delete this connection?"
        onConfirm={onDelete}
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
