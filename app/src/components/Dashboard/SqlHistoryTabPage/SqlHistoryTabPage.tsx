import React from 'react';
import { List } from 'antd';
import { SqlHistoryTab } from 'models';

interface Props {
  model: SqlHistoryTab;
}

function renderItem(item: any) {
  return <List.Item>{item}</List.Item>;
}

export default function SqlHistoryTabPage({ model }: Props) {
  return (
    <div>
      <List bordered dataSource={model.queries} renderItem={renderItem} />
    </div>
  );
}
