import React, { RefObject } from 'react';
import { observer } from 'mobx-react';
import { HotTable } from '@handsontable/react';
import Handsontable, { contextMenu } from 'handsontable';
import DataDecorator, { ColumnMetadata } from 'services/api/DataDecorator';
import { contextMenuItems } from './handsontable/ContextMenuItems';
import HotTableHelper from './handsontable/Helper';
import 'handsontable/dist/handsontable.full.css';
import './handsontable/dark.css';
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

  protected gethotInstance = (): Handsontable => {
    if (!this.hotRef || !this.hotRef.current) throw new Error('Not found Handsontable Instance');
    return this.hotRef.current.hotInstance;
  };

  componentDidMount() {
    console.info('Inst', this.gethotInstance());
  }

  private getFormatForColumn(cell: ColumnMetadata) {
    return HotTableHelper.getFormatForColumn(cell);
  }

  private getColumnSorting(columns: ColumnMetadata[]) {
    let res: boolean | object;
    res = true;
    columns.forEach(col => {
      if (col.forceSort) {
        res = {
          sortOrder: col.forceSortOrder,
          column: col.forceSort,
        };
      }
    });
    return res;
  }

  private callContextMenu(key: string, options: contextMenu.Options) {
    console.info('CALL', key, options, this);
  }

  private fetchContextMenu(): contextMenu.Settings {
    const items: Object = contextMenuItems;
    Object.keys(items).forEach(key => {
      const value = items[key];
      if (value && value.submenu && value.submenu.items && Array.isArray(value.submenu.items)) {
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const i in value.submenu.items) {
          if (!items[key].submenu.items[i].key) items[key].submenu.items[i].key = `${key}:${i}`;
          items[key].submenu.items[i].callback = this.callContextMenu;
        }
      } else if (value.key) {
        items[key].callback = this.callContextMenu;
      }
    });
    return {
      callback: function sd() {
        return null;
      },
      items,
    };
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
          columnSorting={this.getColumnSorting(data.meta.columns)}
          contextMenu={this.fetchContextMenu()}
          manualColumnMove
          manualColumnResize
          manualColumnFreeze
          mergeCells
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
