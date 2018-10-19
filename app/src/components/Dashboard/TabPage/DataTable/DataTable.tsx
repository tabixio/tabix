import React, { RefObject } from 'react';
import { observer } from 'mobx-react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import DataDecorator, { ColumnMetadata } from 'services/api/DataDecorator';
import css from './DataTable.css';

interface Props {
  data: DataDecorator;
}

@observer
export default class DataTable extends React.Component<Props> {
  protected hotRef: RefObject<HotTable>;

  constructor(props: Readonly<Props>) {
    super(props);
    this.hotRef = React.createRef();
    // Handsontable.plugins.registerPlugin();
  }

  componentDidMount() {
    if (this.hotRef && this.hotRef.current) {
      const hotInstance: Handsontable = this.hotRef.current.hotInstance;
      console.info('hotInstance.countCols:', hotInstance.countCols());
      if (hotInstance) {
        console.info('hotInstance', hotInstance, hotInstance.countRows());
      }
    }
  }

  getFormatForColumn(cell: ColumnMetadata) {
    // @todo cell: ColumnMetadata

    let c: any = {};

    c = {
      type: 'text',
      width: 100,
      typeOriginal: cell.type,
      isDark: true,
      data: cell.name,
      title: cell.name,
      // renderer : this._handsRenderer;
    };

    if (cell.useHumanSort) {
      // c.sortFunction=function (sortOrder) {....}
    }

    if (cell.type.includes('Int64')) {
      // if DataProvider.prepareInt64() convert String->Int64, use numeric type
      if (!cell.unsafe64Bit) {
        c.type = 'numeric';
      }
    } else if (cell.type.includes('Int')) {
      c.width = 80;
      c.type = 'numeric';
    }
    // other type
    switch (cell.type) {
      case 'Date':
        c.width = 90;
        c.type = 'date';
        c.dateFormat = 'YYYY-MM-DD';
        break;
      case 'DateTime':
        c.width = 150;
        c.type = 'time';
        c.timeFormat = 'YYYY-MM-DD HH:mm:ss';
        break;
      case 'Float32':
        c.width = 80;
        c.type = 'numeric';
        c.format = '0.[0000000]';
        break;
      case 'Float64':
        c.width = 80;
        c.type = 'numeric';
        c.format = '0.[0000000]';
        break;
      case 'String':
        c.width = 180;
        break;
      default:
        break;
    }
    return c;
  }

  render() {
    const { data } = this.props;
    // console.log(data);

    // todo: refactor with DataDecorator?
    const isDark: boolean = true;
    const columns = data.meta.columns.map(c => this.getFormatForColumn(c));
    return (
      <div className={css.table}>
        <HotTable
          className={isDark ? 'handsontable-dark' : ''}
          rowHeaders
          columns={columns}
          data={data.rows}
          allowEmpty
          allowInsertColumn={false}
          allowInsertRow={false}
          columnSorting
          contextMenu
          manualColumnMove
          manualColumnResize
          manualRowResize
          stretchH="all"
          observeChanges={false} /* =<!memory leak if true! */
          observeDOMVisibility
          colWidths={100}
          fillHandle={false}
          customBorders
          viewportColumnRenderingOffset="auto"
          wordWrap={false}
          autoColumnSize={{ samplingRatio: 23 }}
          ref={this.hotRef}
          // currentRowClassName="currentRowDark"
          // currentColClassName="currentCol"
          // sortIndicator
          // fixedRowsTop={1}
          // renderAllRows={false}
          // visibleRows={1000}
          // contextMenu={contextMenu}
          // columnsMenu={columnsMenu}
        />
      </div>
    );
  }
}
