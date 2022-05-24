import React, { useState, useRef, useEffect } from 'react';
import { TableSheet } from 'components/TableSheet';
import DataDecorator from 'services/api/DataDecorator';
import { TabsStore } from '../../../stores';
import Draw from 'components/Draw';

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
      const sql =
        'SELECT toStartOfFifteenMinutes(event_time) as dt,\n' +
        '       median(ProfileEvent_ReadBufferFromFileDescriptorRead) as FileDescriptorRead,\n' +
        '       median(ProfileEvent_IOBufferAllocs) as IOBufferAllocs,\n' +
        '       median(ProfileEvent_DiskReadElapsedMicroseconds) as DiskReadElapsed,\n' +
        '       median(CurrentMetric_PartsActive) as PartsActive,\n' +
        '       median(ProfileEvent_InsertedBytes) as InsertedBytes,\n' +
        '       median(ProfileEvent_InsertedRows) as InsertedRows,\n' +
        '       median(ProfileEvent_SelectedBytes) as electedBytes,\n' +
        '       median(ProfileEvent_Query) as Query\n' +
        'FROM system.metric_log\n' +
        'WHERE event_date = today()    \n' +
        'group by dt\n' +
        'ORDER BY dt \n' +
        'LIMIT 4000';
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
      <Draw data={data2} fill />
      <TableSheet data={data} />
    </div>
  );
}
