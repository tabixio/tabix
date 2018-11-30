import React, { useCallback } from 'react';
import { Flex } from 'reflexy';
import { Icon } from 'antd';
import css from './Actions.css';

export enum ActionType {
  TogglePin = 1,
}

export interface ActionsProps {
  pinned?: boolean;
  onAction: (action: ActionType) => void;
}

export default function Actions({ pinned, onAction }: ActionsProps) {
  const onTogglePin = useCallback(() => onAction(ActionType.TogglePin), [onAction]);

  return (
    <Flex grow hfill alignItems="center" justifyContent="flex-end" className={css.root}>
      <Icon
        type="pushpin"
        theme={pinned ? 'filled' : 'outlined'}
        onClick={onTogglePin}
        title={pinned ? 'Pinned' : 'Unpinned'}
      />
    </Flex>
  );
}
