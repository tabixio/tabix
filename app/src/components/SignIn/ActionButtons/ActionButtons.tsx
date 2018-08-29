import React from 'react';
import { Button } from 'antd';
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
      <Button block type="primary" htmlType="submit" onClick={onSignIn} disabled={!signInEnabled}>
        SIGN IN
      </Button>
      <Button block type="danger" onClick={onDelete} disabled={!deleteEnabled}>
        DELETE
      </Button>
    </Flex>
  );
}
