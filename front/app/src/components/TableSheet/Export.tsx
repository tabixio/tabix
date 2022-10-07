import React from 'react';
import { Button, Menu, Dropdown, message } from 'antd';
import cx from 'classnames';
import {
  SpreadSheet,
  copyData as getSheetData,
  copyToClipboard,
  download,
  S2_PREFIX_CLS,
} from '@antv/s2';
import { DotChartOutlined } from '@ant-design/icons';
import { getSwitcherClassName } from './Switcher/util';
import { SwitcherIcon } from './Sort/Icons';
import { CopyOutlined } from '@ant-design/icons';

export interface DataSet {
  icon?: React.ReactNode;
  name: string;
  value: string;
  type?: 'text' | 'location' | 'date';
  disabled?: boolean;
}

export interface ExportCfgProps {
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
    const copyData = (isFormat: boolean) => {
      const data = getSheetData(sheet, '\t', isFormat);

      copyToClipboard(data, syncCopy)
        .then(() => {
          message.success('Success copy');
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('copy failed: ', error);
          message.error('Error on copyToClipboard');
        });
    };

    const downloadData = (isFormat: boolean) => {
      const data = getSheetData(sheet, ',', isFormat);
      try {
        download(data, fileName);
        message.success('Success download');
      } catch (err) {
        message.error('Error download');
      }
    };

    const menu = (
      <Menu>
        <Menu.Item key="copyOriginal" onClick={() => copyData(false)}>
          Copy original text
        </Menu.Item>
        <Menu.Item key="copyFormat" onClick={() => copyData(true)}>
          Copy format text
        </Menu.Item>
        <Menu.Item key="downloadOriginal" onClick={() => downloadData(false)}>
          Download original Text
        </Menu.Item>
        <Menu.Item key="downloadFormat" onClick={() => downloadData(true)}>
          Download format Text
        </Menu.Item>
      </Menu>
    );
    // <Button
    //   className={getSwitcherClassName('entry-button')}
    //   size="small"
    //   disabled={disabled}
    //   icon={<SwitcherIcon />}
    // >
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
