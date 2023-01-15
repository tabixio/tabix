import { INPUT_TYPE, PageModel } from '../../PageGridLayer/PageModel';

describe('page-model', () => {
  test('should export correct data with showSeriesNumber', () => {
    // ---- Source
    const dash = new PageModel({
      id: 'ServerOverview',
      title: 'Page - server overview',
      edit: false,
    });
    const source1_id = dash.addSource('SELECT * FROM system.metric_log LIMIT 40');
    const source2_id = dash.addSource(
      'select event_date,   event_time,   query_duration_ms,   read_rows,   read_bytes,   memory_usage,        from system.query_log        where event_date = today()          and read_bytes > 0        order by event_date desc        LIMIT 40'
    );

    const row_id1 = dash.addRow({
      title: 'First row',
      w: 'fill', // ширину заполнить
      h: 2, // высота 2
    });
    const row_id2 = dash.addRow({
      title: 'Second row',
      h: 4, // высота 2
    });
    dash.addInput(row_id1, { type: INPUT_TYPE.dateTime, name: 'timeInput', title: 'Time' });
    dash.addInput(row_id1, { type: INPUT_TYPE.string, name: 'query_id' });
    dash.addInput(row_id1, { type: INPUT_TYPE.int, name: 'limit' });

    const graph_ids = dash.addRowGraph(row_id1, [
      {
        // Первый график
        title: 'File Descriptor Read & Parts Active',
        type: 'line',
        edit: false,
        x: 'dt',
        y: ['FileDescriptorRead', 'PartsActive'],
        source: source1_id,
      },
      {
        // Второй график
        type: 'line',
        edit: false,
        x: 'dt',
        y: ['ProfileEvent_PerfBranchMisses', 'ProfileEvent_SelectedBytes'],
        source: source1_id,
      },
      {
        // Третий на всю ширину, график
        type: 'line',
        edit: false,
        w: 'fill', // ширину заполнить
        x: 'event_time',
        y: ['memory_usage', 'read_rows'],
        source: source2_id,
      },
    ]);

    // ---- END
  });
});
