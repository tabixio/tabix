import React from 'react';
import { Icon, Dropdown } from 'antd';
import { Flex } from 'reflexy';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import css from './TableTitle.css';

interface Props extends ContextMenuProps {
  // name: string;
}

export default function TableTitle({ table, ...rest }: Props) {
  return (
    <Dropdown overlay={<ContextMenu table={table} {...rest} />} trigger={['contextMenu']}>
      <Flex alignItems="center" hfill className={css.root}>
        <Icon type="table" theme="outlined" />
        <div>{table.name}</div>
      </Flex>
    </Dropdown>
  );
}
