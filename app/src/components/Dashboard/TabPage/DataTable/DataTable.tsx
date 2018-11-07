import React from 'react';
import { observer } from 'mobx-react';
import { HotTable } from '@handsontable/react';
import Handsontable, { contextMenu } from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import * as sizeSensor from 'size-sensor'; // Use size-sensor because it already used by echarts-for-react
import DataDecorator, { ColumnMetadata } from 'services/api/DataDecorator';
import contextMenuItems from './handsontable/ContextMenuItems';
import HotTableHelper from './handsontable/Helper';
import './handsontable/dark.css';
import css from './DataTable.css';

interface Props {
  data: DataDecorator;
}

interface State {
  width?: number;
}

@observer
export default class DataTable extends React.Component<Props & FlexProps, State> {
  private readonly rootRef = React.createRef<HTMLDivElement>();

  state: State = {
    width: undefined,
  };

  componentDidMount() {
    sizeSensor.bind(this.rootRef.current, el => {
      // Use callback only when parent resizing finished,
      // so callback will called only when resize finished.
      // Otherwise performance issue of hottable update.
      const width = el ? el.clientWidth : this.state.width;
      if (width && width !== this.state.width) {
        // For update hottable when resizing
        this.setState({ width });
      }
    });
  }

  componentWillUnmount() {
    sizeSensor.clear(this.rootRef.current);
  }

  private getFormatForColumn(cell: ColumnMetadata) {
    return HotTableHelper.getFormatForColumn(cell);
  }

  // @ts-ignore: TS6133: 'getColumnSorting' is declared but its value is never read.
  private getColumnSorting(_columns: ColumnMetadata[]) {
    // @Error in handsontable:columnSorting, use handsontable@5.0.2, check new version 6.2...

    // For forceSortOrder
    const res = {
      sortEmptyCells: true,
      indicator: false,
      headerAction: true,
      initialConfig: {},
    };
    _columns.forEach(col => {
      if (col.forceSort) {
        res.initialConfig = {
          sortOrder: col.forceSortOrder,
          column: col.forceSort,
        };
      }
    });
    // return res;
    return true;
  }

  private pushToClipboardText(text: string) {
    // @todo : Reweire to react code

    // const textarea = React.createElement(
    //   'textarea',
    //   { value: text, type: 'url', autoFocus: true },
    //   'body'
    // );

    // const textarea: HTMLElement = document.createElement('textarea');
    // if (textarea.style) {
    //   textarea.style.width = 0;
    //   textarea.style.height = 0;
    //   textarea.style.border = 0;
    //   textarea.style.position = 'absolute';
    //   textarea.style.top = 0;
    // }
    // document.body.append(textarea);
    // textarea.value = outText;
    // textarea.focus();
    // textarea.select();
    // try {
    //   const successful = document.execCommand('copy');
    // } catch (err) {
    //   console.log('Oops, unable to copy');
    // }
    // document.body.removeChild(textarea);
    console.log(text);
  }

  private onCallContextMenu(_ht: Handsontable, item: any, key: string, options: any) {
    // console.log('callContextMenu', _ht, item, key, options);
    const result = HotTableHelper.manipulations(_ht, key, options);
    if (!result) return false;
    if (item.result === 'insert') {
      // to insert result to editor ( where cursor )
      console.log('insert result:');
      console.info(`%c${result}`, 'color: #bada55');
    }
    if (item.result === 'show') {
      // to show result in elements
      console.log('show result:');
      console.info(`%c${result}`, 'color: #bada55');
    }

    if (item.result === 'clipboard') {
      // to clipboard text
      console.log('to Clipboard result:');
      console.info(`%c${result}`, 'color: #bada55');
      this.pushToClipboardText(result);
    }
    return true;
  }

  private onCheckDisabledContextMenu(_ht: Handsontable, filter: any) {
    if (typeof filter !== 'string') return false;
    return !HotTableHelper.isFormatColl(_ht, filter);
  }

  private processContextMenuItems(items: any, parentId: string = '') {
    const self = this;
    Object.entries(items).map(([idItem, valObject]) => {
      const value: any = valObject;
      // if object is empty or string - skip
      if (!value) return value;
      if (typeof value !== 'object') return value;
      if (!value.name) return value;
      // Item have name, need check key or subItems;
      const { key, filter } = value;
      if (key) {
        value.key = `${idItem}:${key}`;
      } else if (parentId) {
        value.key = `${parentId}:${idItem}`;
      }
      // item filter:->onCheckDisabledContextMenu()
      if (filter) {
        value.disabled = function() {
          return self.onCheckDisabledContextMenu(this, filter);
        };
        delete value.filter;
      }
      // item submenu:->recursive()
      if (value.submenu) {
        value.submenu = {
          items: Object.values(this.processContextMenuItems(value.submenu, idItem)),
        };
        return value;
      }
      // item without submenu -> add callback
      value.callback = function(callkey: string, options: any) {
        return self.onCallContextMenu(this, valObject, callkey, options);
      };
      return value;
    });
    return items;
  }

  private fetchContextMenu(): contextMenu.Settings {
    // @todo : refactor , need clone object
    let items = JSON.parse(JSON.stringify(contextMenuItems));
    // let items = Object.assign({}, contextMenuItems); let items={...contextMenuItems}
    items = this.processContextMenuItems(items);
    return {
      items,
      callback: function sd() {
        return null;
      },
    };
  }

  render() {
    const { data, className, ...flexProps } = this.props;
    // @todo : Error in handsontable:columnSorting, use handsontable@5.0.2, check new version 6.2...
    // var showSortIndicator = pluginSettingsForColumn.indicator;
    // Uncaught (in promise) TypeError: Cannot read property 'indicator' of undefined
    // at ColumnSorting.onAfterGetColHeader (handsontable.js?0977:42068)

    // todo: refactor with DataDecorator?
    const isDark: boolean = true;
    const columns = data.meta.columns.map(c => this.getFormatForColumn(c));

    return (
      <Flex componentRef={this.rootRef} className={classNames(css.root, className)} {...flexProps}>
        <div className={css.node}>
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
            sortIndicator
            manualColumnMove
            manualColumnResize
            manualColumnFreeze
            mergeCells
            manualRowResize
            stretchH="all"
            // colWidths={100}
            observeChanges={false} /* =<!memory leak if true! */
            observeDOMVisibility
            fillHandle={false}
            customBorders
            viewportColumnRenderingOffset="auto"
            wordWrap={false}
            autoColumnSize={{ samplingRatio: 23 }}
            // currentRowClassName="currentRowDark"
            // currentColClassName="currentCol"
            // sortIndicator
            // fixedRowsTop={1}
            renderAllRows={false}
            // visibleRows={1000}
            // contextMenu={contextMenu}
            // columnsMenu={columnsMenu}
          />
        </div>
      </Flex>
    );
  }
}
