import React, { useCallback } from 'react';
import { List, Icon } from 'antd';

export interface ListItemProps {
  content: string;
  onEdit: (content: string) => void;
}

export default function ListItem({ content, onEdit }: ListItemProps) {
  const edit = useCallback(
    () => {
      onEdit(content);
    },
    [content, onEdit]
  );

  return <List.Item actions={[<Icon type="edit" onClick={edit} />]}>{content}</List.Item>;
}
