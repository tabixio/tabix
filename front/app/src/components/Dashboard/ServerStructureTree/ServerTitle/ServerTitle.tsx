import React, { useCallback, useState } from 'react';
import { Dropdown } from 'antd';
import { Flex } from 'reflexy';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import css from './ServerTitle.css';
import { SwitcherOutlined, ReloadOutlined, DatabaseOutlined } from '@ant-design/icons';

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
  const preventPropagation = useCallback(
    (event: React.SyntheticEvent<any>) => event.stopPropagation(),
    []
  );

  return (
    <Flex alignItems="center" hfill>
      <Dropdown
        overlay={<ContextMenu server={server} onContextMenuAction={onAction} />}
        trigger={['contextMenu']}
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Flex grow alignItems="center" className={css.dropdown}>
          <DatabaseOutlined />
          <div className={css.title}>{title}</div>
        </Flex>
      </Dropdown>

      <Flex justifyContent="flex-end" onDoubleClick={preventPropagation}>
        <ReloadOutlined title="Reload" onClick={onReload} className={css.action} />
        <SwitcherOutlined title="Collapse" onClick={collapse} className={css.action} />
      </Flex>
    </Flex>
  );
}
