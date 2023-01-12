import React from 'react';
import { Button, Menu, Dropdown, message, MenuProps } from 'antd';
import cx from 'classnames';
import { SpreadSheet, S2_PREFIX_CLS } from '@antv/s2';

import { Formats, extractSheetData, copyToClipboard, download } from './ExportUtils';
import { getSwitcherClassName } from './Switcher/util';
import { FileExcelOutlined, CopyOutlined } from '@ant-design/icons';

export interface DataSet {
  icon?: React.ReactNode;
  name: string;
  value: string;
  type?: 'text' | 'location' | 'date';
  disabled?: boolean;
}

export interface ExportCfgProps {
  currentSheetType: string;
  className?: string;
  fileName?: string;
  syncCopy?: boolean;
}

export interface ExportProps extends ExportCfgProps {
  sheet: SpreadSheet;
}

export const Export: React.FC<ExportProps> = React.memo(
  ({ className, syncCopy = false, sheet, fileName = 'sheet', ...restProps }) => {
    const PRE_CLASS = `${S2_PREFIX_CLS}-export`;
    // @todo : copyAsMarkdown -> GitHub Markdown,Create Table ...,Redmine Markdown
    // @todo : copyAsSQLWhere, copyAsSQLColumns

    // - Transpose full table
    // - Calc Avg & Sum & Median
    const onClickMenu: MenuProps['onClick'] = (e) => {
      const key = e.key;
      const action = key.match(/copy_.*/) ? 'copy' : key.match(/download_.*/) ? 'download' : ''; // download|copy
      const format: Formats = key.match(/Markdown.*/)
        ? Formats.MARKDOWN
        : key.match(/Original.*/)
        ? Formats.ORIGINAL
        : key.match(/TSV.*/)
        ? Formats.TSV
        : Formats.CSV;

      const headers = !!key.match(/headers.*/);

      const data = extractSheetData(sheet, format, headers);

      if (action === 'copy') {
        copyToClipboard(data, syncCopy)
          .then(() => {
            message.success('Success copy');
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('copy failed: ', error);
            message.error('Error on copyToClipboard');
          });
      }
      if (action === 'download') {
        try {
          download(data, fileName, format);
          message.success('Success download');
        } catch (err) {
          message.error('Error download');
        }
      }
    };

    // @TODO: Fix export in pivot
    const menu = (
      <Menu onClick={onClickMenu}>
        <Menu.SubMenu key="Copy" icon={<CopyOutlined />} title="Copy to clipboard">
          <Menu.Item key="copy_Original_headers">Copy original text</Menu.Item>
          <Menu.Item key="copy_Markdown_headers">Markdown</Menu.Item>
          {/*<Menu.Item key="copy_WHERE">WHERE col1 IN (val,val),col2 IN ...</Menu.Item>*/}
          {/*<Menu.Item key="copy_CREATE">Create TABLE...</Menu.Item>*/}
          <Menu.Item key="copy_TSV_headers">TSV with headers</Menu.Item>
          <Menu.Item key="copy_TSV">TSV without headers</Menu.Item>
          <Menu.Item key="copy_CSV_headers">CSV with headers</Menu.Item>
          <Menu.Item key="copy_CSV">CSV without headers</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="Down" icon={<FileExcelOutlined />} title="Download">
          <Menu.Item key="download_Original_headers">Original Text</Menu.Item>
          <Menu.Item key="download_TSV_headers">TSV with headers</Menu.Item>
          <Menu.Item key="download_TSV">TSV without headers</Menu.Item>
          <Menu.Item key="download_CSV_headers">CSV with headers</Menu.Item>
          <Menu.Item key="download_CSV">CSV without headers</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
        className={cx(PRE_CLASS, className)}
        {...restProps}
      >
        <Button
          // size="small"
          className={getSwitcherClassName('entry-button')}
          key="export"
          onClick={(e) => e.preventDefault()}
          icon={<CopyOutlined />}
        >
          Export
        </Button>
      </Dropdown>
    );
  }
);
