import React, { useState, useRef, useEffect } from 'react';
import { TableSheet } from 'components/TableSheet';
import DataDecorator from 'services/api/DataDecorator';
import { TabsStore } from '../../../stores';

interface Props {
  store: TabsStore;
}

export default function ServerOverviewTabPage({ store }: Props) {
  const [data, setData] = useState(null as DataDecorator | null);
  const [data2, setData2] = useState(null as DataDecorator | null);
  // const [load, setLoad] = useState(false);
  const { current: a } = useRef(['a']);
  useEffect(() => {
    const fetchData = async () => {
      // setLoad(true);
      const sql = store.api.prepared().databasesListAndSize();
      store.api.query(sql).then((data) => {
        setData(data);
      });
      const sql2 = store.api.prepared().queryLogFast(500);
      store.api.query(sql2).then((data) => {
        setData2(data);
      });
    }; // fetch
    fetchData();
  }, [a]);
  return (
    <div>
      <TableSheet data={data2} />
      <TableSheet data={data} />
    </div>
  );
}
