import React, { useState, useCallback } from 'react';
import { Icon, Dropdown } from 'antd';
import { Flex } from 'reflexy';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import css from './ServerTitle.css';

export interface ServerTitleProps extends ContextMenuProps {
  title: string;
  onReload?: () => void;
  onCollapse?: (server: ServerTitleProps['server']) => void;
}

export default function ServerTitle({
  title,
  onReload,
  onCollapse,
  server,
  onContextMenuAction,
}: ServerTitleProps) {
  const [visible, setVisible] = useState<boolean | undefined>(false);

  const onAction = useCallback<NonNullable<ContextMenuProps['onContextMenuAction']>>(
    (action, srv) => {
      setVisible(false);
      onContextMenuAction && onContextMenuAction(action, srv);
    },
    [onContextMenuAction]
  );
  const collapse = useCallback(() => onCollapse && onCollapse(server), [onCollapse, server]);

  return (
    <Flex alignItems="center" hfill>
      <Dropdown
        overlay={<ContextMenu server={server} onContextMenuAction={onAction} />}
        trigger={['contextMenu']}
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Flex grow alignItems="center" className={css.dropdown}>
          <Icon type="home" theme="outlined" />
          <div>{title}</div>
        </Flex>
      </Dropdown>

      <Flex justifyContent="flex-end">
        <Icon
          type="reload"
          theme="outlined"
          title="Reload"
          onClick={onReload}
          className={css.action}
        />
        <Icon
          type="switcher"
          theme="outlined"
          title="Collapse"
          onClick={collapse}
          className={css.action}
        />
      </Flex>
    </Flex>
  );
}
