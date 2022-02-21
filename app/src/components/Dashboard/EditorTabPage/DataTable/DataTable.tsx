import React from 'react';
import { observer } from 'mobx-react';
// import { Icon } from 'antd';
import { HotTable } from '@handsontable/react';
import Handsontable, { contextMenu } from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './dark.css';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import * as sizeSensor from 'size-sensor'; // Use size-sensor because it already used by echarts-for-react
import DataDecorator from 'services/api/DataDecorator';
import getFormatForColumn from './utils';
import {
  ContextMenuItem,
  createContextMenu,
  isSubmenu,
  ResultActionType,
} from './contextMenuItems';
import css from './DataTable.css';

export interface DataTableProps {
  data: DataDecorator;
  dataUpdate?: number;
  height?: number;
  onAction?: (action: ResultActionType, data: any) => void;
}

interface State {
  width?: number;
  height?: number;
}

const hotTableSettings: Handsontable.DefaultSettings = {
  className: 'handsontable-dark',
  rowHeaders: true,
  allowEmpty: true,
  autoRowSize: false,
  // autoColumnSize: false,
  // autoColumnSize: { useHeaders: true },
  autoColumnSize: true,
  stretchH: 'all',
  preventOverflow: 'horizontal',

  allowInsertColumn: false,
  allowInsertRow: false,
  manualColumnMove: true,
  manualColumnResize: true,
  manualColumnFreeze: true,
  mergeCells: true,
  // manualRowResize: true,
  // stretchH: 'last',
  colWidths: 100,
  observeChanges: false /* =<!memory leak if true! */,
  observeDOMVisibility: true,
  fillHandle: false,
  customBorders: true,
  viewportColumnRenderingOffset: 'auto',
  wordWrap: false,
  // currentRowClassName="currentRowDark",
  // currentColClassName="currentCol",
  // sortIndicator,
  // fixedRowsTop: 1,
  renderAllRows: false,
  // visibleRows: 40,
  columnSorting: true,
  // contextMenu: contextMenu,
  // columnsMenu: columnsMenu,
};

@observer
export default class DataTable extends React.Component<DataTableProps & FlexProps, State> {
  private readonly rootRef = React.createRef<HTMLDivElement>();

  private tableRef = React.createRef<HotTable>();

  state: State = {
    width: undefined, // ширина
    height: undefined, // высота
  };

  componentDidMount() {
    // console.log('DataTableProps->componentDidMount');
    sizeSensor.bind(this.rootRef.current, (el) => {
      // Use callback only when parent resizing finished,
      // so callback will called only when resize finished.
      // Otherwise performance issue of hottable update.
      let f = false;
      const width = el ? el.clientWidth : this.state.width;
      const height = el ? el.clientHeight : this.state.height;
      if (width && width !== this.state.width) {
        // For update hottable when resizing [ширина]
        this.setState({ width });
        f = true;
      }
      // height [высота]
      if (height && height !== this.state.height) {
        // For update hottable when resizing
        this.setState({ height: height });
        f = true;
      }

      if (f) {
        this.tableRef?.current?.hotInstance.updateSettings(
          {
            height: height,
            width: width,
          },
          false
        );
        this.tableRef?.current?.hotInstance.render();
      }
    });
  }

  componentWillUnmount() {
    // console.log('DataTableProps->componentWillUnmount');
    sizeSensor.clear(this.rootRef.current);
  }

  private onContextMenuItemClick = (
    ht: Handsontable,
    item: ContextMenuItem,
    options: contextMenu.Options
  ) => {
    if (typeof item === 'string') return false;
    if (isSubmenu(item)) return false;

    const result = item.action(ht, options);
    const { onAction } = this.props;

    if (onAction && item.resultAction && typeof result === 'string') {
      onAction(item.resultAction, result);
    }

    return true;
  };

  // private onExportToExcel = () => {
  //   const hotTable = this.tableRef.current && this.tableRef.current.hotInstance;
  //   if (!hotTable) return;
  //   // Supports in PRO version.
  //   const exportPlugin = hotTable.getPlugin('exportFile');
  //   exportPlugin.downloadFile('csv', {
  //     bom: false,
  //     columnDelimiter: ',',
  //     columnHeaders: false,
  //     exportHiddenColumns: true,
  //     exportHiddenRows: true,
  //     fileExtension: 'csv',
  //     filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
  //     mimeType: 'text/csv',
  //     rowDelimiter: '\r\n',
  //     rowHeaders: true,
  //   });
  // };

  render() {
    const { data, onAction, className, height, dataUpdate, ...flexProps } = this.props;
    // todo: refactor with DataDecorator?

    const columns = data.meta?.columns?.map(getFormatForColumn);

    // <Flex shrink={false} justifyContent="flex-end" className={css.bar}>
    //  <RequestStats {...data.stats} className={css.stats} />
    //  <Icon type="file-excel" title="Export to Excel" onClick={this.onExportToExcel} />
    // </Flex>
    // hotTableSettings.update=123;
    return (
      <Flex
        componentRef={this.rootRef}
        column
        className={classNames(css.root, className)}
        hfill
        {...flexProps}
        style={{ minHeight: 150 }}
      >
        <HotTable
          style={{ minHeight: 150 }}
          ref={this.tableRef}
          settings={hotTableSettings}
          columns={columns}
          height={height}
          data={data.rows}
          contextMenu={createContextMenu(this.onContextMenuItemClick)}
        />
        {/*{dataUpdate}*/}
      </Flex>
    );
  }
}
