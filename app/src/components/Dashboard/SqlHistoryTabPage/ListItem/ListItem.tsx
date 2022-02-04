import React, { useCallback } from 'react';
import { List } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export interface ListItemProps {
  content: string;
  onEdit: (content: string) => void;
}

export default function ListItem({ content, onEdit }: ListItemProps) {
  const edit = useCallback(() => {
    onEdit(content);
  }, [content, onEdit]);

  return <List.Item actions={[<EditOutlined onClick={edit} />]}>{content}</List.Item>;
}
