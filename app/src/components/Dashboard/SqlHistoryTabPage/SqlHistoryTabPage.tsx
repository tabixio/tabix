import React, { useEffect } from 'react';
import { List } from 'antd';
import { SqlHistoryTab } from 'models';
import { DashboardStore } from 'stores';

interface Props {
  model: SqlHistoryTab;
  store: DashboardStore;
}

function renderItem(item: any) {
  return <List.Item>{item}</List.Item>;
}

export default function SqlHistoryTabPage({ model }: Props) {
  useEffect(() => {
    // store.
  }, []);

  return (
    <div>
      <List bordered dataSource={model.queries} renderItem={renderItem} />
    </div>
  );
}
