// @ts-nocheck

import {
  clone,
  flatten,
  forEach,
  get,
  isArray,
  isEmpty,
  isFunction,
  isNil,
  isObject,
  last,
  max,
  size,
  trim,
} from 'lodash';
import {
  CornerNodeType,
  MultiData,
  ViewMeta,
  Node,
  SpreadSheet,
  safeJsonParse,
  Columns,
  Copyable,
  CopyMIMEType,
  ID_SEPARATOR,
  ROOT_BEGINNING_REGEX,
  ROOT_ID,
} from '@antv/s2';

// import type { Node } from '../../facet/layout/node';
// import type { SpreadSheet } from '../../sheet-type';
// import { safeJsonParse } from '../../utils/text';
// import { getLeafColumnsWithKey } from '../../facet/utils';
// import { CopyMIMEType, type Copyable, type CopyableItem } from './copy';
// import { getCsvString } from './export-worker';

export enum Formats {
  TSV,
  CSV,
  MARKDOWN,
  ORIGINAL,
}

interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: 'unspecified' | 'inline' | 'attachment';
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new (itemData: ClipboardItemData): ClipboardItem;
};

export type CopyableItem = {
  type: CopyMIMEType;
  content: string;
};

export function getCsvString(v: any, char: string): string {
  if (!v) {
    return v;
  }

  if (typeof v === 'string') {
    const out = v;
    // IF CSV
    if (char === '') {
      return `${out}`;
    }
    if (char == ',') {
      // 需要替换", https://en.wikipedia.org/wiki/Comma-separated_values#Example
      return `"${out.replace(/"/g, '""')}"`;
    }
    // IF TSV OR OTHER

    return out.replace(`/${char}/g`, '\\' + char);
  }

  return `"${v}"`;
}

/**
 * 获取 columns 的所有叶子节点
 * @param columns 列配置
 * @returns {Array} 叶子节点列组成的数组
 */
export const getLeafColumns = (columns: Columns): Columns => {
  const leafs: Columns = [];
  const recursionFn = (list) => {
    list.forEach((column) => {
      if (typeof column === 'string' || !column.children) {
        leafs.push(column);
      } else {
        recursionFn(column.children);
      }
    });
  };
  recursionFn(columns);
  return leafs;
};

/**
 * 获取 columns 的所有叶子节点的 key
 * @param columns 列配置
 * @returns {Array<string>} 叶子节点列的key组成的数组
 */
const getLeafColumnsWithKey = (columns: Columns): string[] => {
  const leafs = getLeafColumns(columns);
  return leafs.map((column) => {
    if (typeof column === 'string') {
      return column;
    }
    return column.key;
  });
};

export const copyToClipboardByExecCommand = (data: Copyable): Promise<void> => {
  return new Promise((resolve, reject) => {
    let content: string;
    if (Array.isArray(data)) {
      content = get(
        data.filter((item) => item.type === CopyMIMEType.PLAIN),
        '[0].content',
        ''
      );
    } else {
      content = data.content || '';
    }

    const textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
    // 开启 preventScroll, 防止页面有滚动条时触发滚动
    textarea.focus({ preventScroll: true });
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (success) {
      resolve();
    } else {
      reject();
    }
  });
};

export const copyToClipboardByClipboard = (data: Copyable): Promise<void> => {
  return navigator.clipboard
    .write([
      new ClipboardItem(
        [].concat(data).reduce((prev, copyable: CopyableItem) => {
          const { type, content } = copyable;
          return {
            ...prev,
            [type]: new Blob([content], { type }),
          };
        }, {})
      ),
    ])
    .catch(() => {
      return copyToClipboardByExecCommand(data);
    });
};

export const copyToClipboard = (data: Copyable | string, sync = false): Promise<void> => {
  let copyableItem: Copyable;
  if (typeof data === 'string') {
    copyableItem = {
      content: data,
      type: CopyMIMEType.PLAIN,
    };
  } else {
    copyableItem = data;
  }

  if (!navigator.clipboard || !window.ClipboardItem || sync) {
    return copyToClipboardByExecCommand(copyableItem);
  }
  return copyToClipboardByClipboard(copyableItem);
};

export const download = (str: string, fileName: string, format: Formats) => {
  try {
    const link = document.createElement('a');
    link.download = `${fileName}.csv`;
    let type = 'text/csv;charset=utf-8';
    //
    if (format === Formats.TSV) {
      type = 'text/tsv;charset=utf-8';
      link.download = `${fileName}.tsv`;
    }
    if (format === Formats.ORIGINAL) {
      type = 'text/text;charset=utf-8';
      link.download = `${fileName}.txt`;
    }

    if (format === Formats.MARKDOWN) {
      type = 'text/markdown;charset=utf-8';
      link.download = `${fileName}.md`;
    }

    // Avoid errors in Chinese encoding.
    const dataBlob = new Blob([`\ufeff${str}`], {
      type: type,
    });

    link.href = URL.createObjectURL(dataBlob);
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

/*
 * Process the multi-measure with multi-lines
 * For Grid-analysis-sheet
 * use the ' ' to divide different measures in the same line
 * use the '$' to divide different lines
 */
const processObjectValueInCol = (data: MultiData) => {
  const tempCells = data?.label ? [data?.label] : [];
  const values = data?.values as (string | number)[][];
  if (!isEmpty(values)) {
    forEach(values, (value) => {
      tempCells.push(value.join(' '));
    });
  }
  return tempCells.join('$');
};

/*
 * Process the multi-measure with single-lines
 * For StrategySheet
 */
const processObjectValueInRow = (data: MultiData, isFormat: boolean) => {
  if (!isFormat) {
    return data?.originalValues?.[0] ?? data?.values?.[0];
  }
  return data?.values?.[0];
};

/* Process the data in detail mode. */
const processValueInDetail = (
  sheetInstance: SpreadSheet,
  split: string,
  isFormat?: boolean,
  prefix: string,
  suffix: string
): string[] => {
  const data = sheetInstance.dataSet.getDisplayDataSet();
  const { columns } = sheetInstance.dataCfg?.fields;
  const leafColumns = getLeafColumnsWithKey(columns || []);
  const res = [];
  for (const [index, record] of data.entries()) {
    let tempRows = [];
    if (!isFormat) {
      tempRows = leafColumns.map((v: string) => getCsvString(record[v], split));
    } else {
      tempRows = leafColumns.map((v: string) => {
        const mainFormatter = sheetInstance.dataSet.getFieldFormatter(v);
        return getCsvString(mainFormatter(record[v], record), split);
      });
    }
    if (sheetInstance.options.showSeriesNumber) {
      tempRows = [getCsvString(index + 1, split)].concat(tempRows);
    }

    res.push(prefix + tempRows.join(split) + suffix);
  }
  return res;
};

/* Process the data when the value position is on the columns.  */
const processValueInCol = (
  viewMeta: ViewMeta,
  sheetInstance: SpreadSheet,
  isFormat?: boolean
): string => {
  if (!viewMeta) {
    // If the meta equals null, replacing it with blank line.
    return '';
  }
  const { fieldValue, valueField, data } = viewMeta;

  if (isObject(fieldValue)) {
    return processObjectValueInCol(fieldValue);
  }

  if (!isFormat) {
    return `${fieldValue}`;
  }
  const mainFormatter = sheetInstance.dataSet.getFieldFormatter(valueField);
  return mainFormatter(fieldValue, data);
};

/* Process the data when the value position is on the rows. */
const processValueInRow = (
  viewMeta: ViewMeta,
  sheetInstance: SpreadSheet,
  placeholder: string[],
  isFormat?: boolean
) => {
  let tempCells = [];

  if (viewMeta) {
    const { fieldValue, valueField, data } = viewMeta;
    if (isObject(fieldValue)) {
      tempCells = processObjectValueInRow(fieldValue, isFormat);
      return tempCells;
    }

    // 如果本身格子的数据是 null， 但是一个格子又需要绘制多个指标时，需要使用placeholder填充
    if (isNil(fieldValue) && placeholder.length > 1) {
      tempCells.push(...placeholder);
      return tempCells;
    }
    // The main measure.
    if (!isFormat) {
      tempCells.push(fieldValue);
    } else {
      const mainFormatter = sheetInstance.dataSet.getFieldFormatter(valueField);
      tempCells.push(mainFormatter(fieldValue, data));
    }
  } else {
    // If the meta equals null then it will be replaced by '-'.
    tempCells.push(...placeholder);
  }
  return tempCells.join('    ');
};

/* Get the label name for the header. */
const getHeaderLabel = (val: string) => {
  const label = safeJsonParse(val);
  if (isArray(label)) {
    return label;
  }
  return val;
};

const getPlaceholder = (viewMeta: ViewMeta, leafNode: Node, sheetInstance: SpreadSheet) => {
  const label = getHeaderLabel(leafNode.label);
  const labelLength = isArray(label) ? label.length : 1;
  const placeholder = sheetInstance.options.placeholder;
  const placeholderStr = isFunction(placeholder) ? placeholder(viewMeta) : placeholder;
  return Array(labelLength).fill(placeholderStr);
};

/**
 * 当列头label存在数组情况，需要将其他层级补齐空格
 * eg [ ['数值', '环比'], '2021'] => [ ['数值', '环比'], ['2021', '']
 */
const processColHeaders = (headers: any[][]) => {
  const result = headers.map((header) =>
    header.map((item) => {
      if (isArray(item)) {
        return item;
      }
      if (isArray(header[0])) {
        return [item, ...new Array(header[0].length - 1)];
      }
      return item;
    })
  );
  return result;
};

const getNodeFormatLabel = (node: Node) => {
  const formatter = node.spreadsheet?.dataSet?.getFieldFormatter?.(node.field);
  return formatter?.(node.label) ?? node.label;
};

/**
 * 通过 rowLeafNode 获取到当前行所有 rowNode 的数据
 * @param rowLeafNode
 */
const getRowNodeFormatData = (rowLeafNode: Node) => {
  const line = [];
  const getRowNodeFormatterLabel = (node: Node) => {
    // node.id === ROOT_ID 时，为 S2 内的虚拟根节点，导出的内容不需要考虑此节点
    if (node.id === ROOT_ID) {
      return;
    }
    const formatterLabel = getNodeFormatLabel(node);
    line.unshift(formatterLabel);
    if (node?.parent) {
      return getRowNodeFormatterLabel(node.parent);
    }
  };
  getRowNodeFormatterLabel(rowLeafNode);
  return line;
};

const getFormatOptions = (isFormat: FormatOptions) => {
  if (typeof isFormat === 'object') {
    return {
      isFormatHeader: isFormat.isFormatHeader ?? false,
      isFormatData: isFormat.isFormatData ?? false,
    };
  }
  return {
    isFormatHeader: isFormat ?? false,
    isFormatData: isFormat ?? false,
  };
};

type FormatOptions =
  | boolean
  | {
      isFormatHeader?: boolean;
      isFormatData?: boolean;
    };

export const extractSheetData = (
  sheetInstance: SpreadSheet,
  format: Formats,
  headers: boolean
): string => {
  let split = ',';
  let prefix = '';
  let suffix = '';
  const fo = { isFormatHeader: true, isFormatData: true };

  if (format === Formats.ORIGINAL) {
    prefix = '';
    split = ' ';
    suffix = '';
  }
  if (format === Formats.MARKDOWN) {
    prefix = '| ';
    split = '|';
    suffix = ' |';
  }
  if (format === Formats.TSV) {
    split = '\t';
  }

  return copyData(sheetInstance, prefix, suffix, split, headers, fo);
};

/**
 * Copy data
 */
export const copyData = (
  sheetInstance: SpreadSheet,
  prefix: string,
  suffix: string,
  split: string,
  add_headers: boolean,
  formatOptions?: FormatOptions
): string => {
  // isFormatHeader 格式化表头， isFormatData 格式化数据
  const { isFormatHeader, isFormatData } = getFormatOptions(formatOptions);

  const { rowsHierarchy, rowLeafNodes, colLeafNodes, getCellMeta } =
    sheetInstance?.facet?.layoutResult;
  const { maxLevel: maxRowsHeaderLevel } = rowsHierarchy;
  const { valueInCols } = sheetInstance.dataCfg.fields;
  // Generate the table header.
  const rowsHeader = rowsHierarchy.sampleNodesForAllLevels.map((item) =>
    sheetInstance.dataSet.getFieldName(item.key)
  );

  // get max query property length
  const maxRowDepth = rowLeafNodes.reduce((maxDepth, node) => {
    // 第一层的level为0
    const depth = (node.level ?? 0) + 1;
    return depth > maxDepth ? depth : maxDepth;
  }, 0);
  // Generate the table body.
  let detailRows = [];
  let maxRowLength = 0;

  if (!sheetInstance.isPivotMode()) {
    detailRows = processValueInDetail(sheetInstance, split, isFormatData, prefix, suffix);
  } else {
    // Filter out the related row head leaf nodes.

    const caredRowLeafNodes = rowLeafNodes.filter((row) => row.height !== 0);

    for (const rowNode of caredRowLeafNodes) {
      let tempLine = [];
      if (isFormatHeader) {
        tempLine = getRowNodeFormatData(rowNode);
      } else {
        // Removing the space at the beginning of the line of the label.
        rowNode.label = trim(rowNode?.label);
        const id = rowNode.id.replace(ROOT_BEGINNING_REGEX, '');
        tempLine = id.split(ID_SEPARATOR);
      }
      // TODO 兼容下钻，需要获取下钻最大层级
      const totalLevel = maxRowsHeaderLevel + 1;
      const emptyLength = totalLevel - tempLine.length;
      if (emptyLength > 0) {
        tempLine.push(...new Array(emptyLength));
      }

      // 指标挂行头且为平铺模式下，获取指标名称
      const lastLabel = sheetInstance.dataSet.getFieldName(last(tempLine));
      tempLine[tempLine.length - 1] = lastLabel;

      for (const colNode of colLeafNodes) {
        if (valueInCols) {
          const viewMeta = getCellMeta(rowNode.rowIndex, colNode.colIndex);
          tempLine.push(processValueInCol(viewMeta, sheetInstance, isFormatData));
        } else {
          const viewMeta = getCellMeta(rowNode.rowIndex, colNode.colIndex);
          const placeholder = getPlaceholder(viewMeta, colNode, sheetInstance);
          const lintItem = processValueInRow(viewMeta, sheetInstance, placeholder, isFormatData);
          if (isArray(lintItem)) {
            tempLine = tempLine.concat(...lintItem);
          } else {
            tempLine.push(lintItem);
          }
        }
      }
      maxRowLength = max([tempLine.length, maxRowLength]);
      // lineString
      const lineString = tempLine.map((value) => getCsvString(value, split)).join(split);

      detailRows.push(prefix + lineString + suffix);
    }
  }

  // Generate the table header.
  let headers: string[][] = [];

  if (isEmpty(colLeafNodes) && !sheetInstance.isPivotMode()) {
    // when there is no column in detail mode
    headers = [rowsHeader];
  } else {
    // When the column header label is an array, it is used to complete the labels of other levels
    let arrayLength = 0;
    // Get the table header of Columns.
    let tempColHeader = clone(colLeafNodes).map((colItem) => {
      let curColItem = colItem;

      const tempCol = [];

      // Generate the column dimensions.
      while (curColItem.level !== undefined) {
        let label = getHeaderLabel(curColItem.label);
        if (isArray(label)) {
          arrayLength = max([arrayLength, size(label)]);
        } else {
          // label 为数组时不进行格式化
          label =
            isFormatHeader && sheetInstance.isPivotMode() ? getNodeFormatLabel(curColItem) : label;
        }
        tempCol.push(label);
        curColItem = curColItem.parent;
      }
      return tempCol;
    });

    if (arrayLength > 1) {
      tempColHeader = processColHeaders(tempColHeader);
    }

    const colLevels = tempColHeader.map((colHeader) => colHeader.length);
    const colLevel = max(colLevels);

    const colHeader: string[][] = [];
    // Convert the number of column dimension levels to the corresponding array.
    for (let i = colLevel - 1; i >= 0; i -= 1) {
      // The map of data set: key-name
      const colHeaderItem = tempColHeader
        // total col completion
        .map((item) =>
          item.length < colLevel ? [...new Array(colLevel - item.length), ...item] : item
        )
        .map((item) => item[i])
        .map((colItem) => sheetInstance.dataSet.getFieldName(colItem));
      colHeader.push(flatten(colHeaderItem));
    }

    // Generate the table header.
    // todo - Fix pivot mode
    // console.log('maxRowsHeaderLevel', maxRowsHeaderLevel);
    // console.log('colHeader', colHeader);

    // if (maxRowsHeaderLevel>-1)
    // {
    //
    // }
    headers = [];
    if (maxRowsHeaderLevel > -1) {
      headers = colHeader.map((item, index) => {
        if (sheetInstance.isPivotMode()) {
          const { columns, rows, data } = sheetInstance.facet.cornerHeader.cfg;
          const colNodes = data.filter(({ cornerType }) => cornerType === CornerNodeType.Col);

          if (index < colHeader.length - 1) {
            return [
              ...Array(maxRowsHeaderLevel).fill(''),
              colNodes.find(({ field }) => field === columns[index])?.label || '',
              ...item,
            ];
          }
          // How many layers are expanded at the line header, and how many layers of content are copied.
          // No full copy is performed. eg: Under the tree structure, the row head is province/city,
          // if all cities are folded, only the province will be copied

          const copiedRows = rows.slice(0, maxRowDepth);
          // In the trend analysis table, the row header has only one extra dimension, but there are multiple levels
          if (copiedRows.length < maxRowDepth) {
            copiedRows.unshift(...Array(maxRowDepth - copiedRows.length).fill(''));
          }
          return [
            ...copiedRows.map((row) => sheetInstance.dataSet.getFieldName(row) || ''),
            ...item,
          ];
        }

        return index < colHeader.length
          ? Array(maxRowDepth)
              .fill('')
              .concat(...item)
          : rowsHeader.concat(...item);
      });
    }
  }

  const headerRow = headers
    .map((header) => {
      const emptyLength = maxRowLength - header.length;
      if (emptyLength > 0) {
        header.unshift(...new Array(emptyLength));
      }
      const r = header.map((h) => getCsvString(h, split)).join(split);
      return prefix + r + suffix;
    })
    .join('\r\n');

  let data = [];
  if (add_headers) {
    data = [headerRow].concat(detailRows);
  } else {
    data = detailRows;
  }

  const result = data.join('\r\n');
  return result;
};
