import React, { useEffect, useState, FC, ReactNode } from 'react';
// import { PageHeader } from 'antd';
import { Menu, Dropdown, Popover, Button, Row, Col } from 'antd';
import { Export } from './Export';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { AdvancedSort } from './Sort';
import { SwitcherHeader } from './Switcher/header';
import {
  SettingOutlined,
  ForwardOutlined,
  SaveOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';

export interface HeaderCfgProps {
  // extends PageHeaderProps {
  // width?: React.CSSProperties['width'];
  description?: ReactNode;
  // exportCfg?: ExportCfgProps;
  // advancedSortCfg?: AdvancedSortCfgProps;
  // switcherCfg?: SwitcherCfgProps;
}

export interface HeaderProps extends HeaderCfgProps {
  dataCfg: S2DataConfig;
  options: S2Options;
  sheetType: string;
  sheet: SpreadSheet;
  setSheetType: React.Dispatch<any>;
  title?: string;
}

export const Header: FC<HeaderProps> = ({
  // className,
  // title,
  // width,
  // description,
  // exportCfg,
  // advancedSortCfg,
  // switcherCfg,
  sheetType,
  sheet,
  // extra,
  dataCfg,
  options,
  setSheetType,
  title,
  ...restProps
}) => {
  // Todo : SwitcherHeader
  // Todo : AdvancedSort
  function titleCase(string: string) {
    return string[0].toUpperCase() + string.substr(1).toLowerCase();
  }

  // const sheetType = getSheetType(sheet).toString();
  const [currentSheet, setSheetTypeLocal] = useState(sheetType);

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={[currentSheet]}
      onSelect={(value) => {
        // Update setSheetType
        // console.log('Header -> SetSheetType:', value.key);
        setSheetType(value.key);
        setSheetTypeLocal(value.key);
      }}
    >
      {['pivot', 'table'].map((i) => (
        <Menu.Item key={i} itemID={i}>
          {titleCase(i)}
        </Menu.Item>
      ))}
    </Menu>
  );

  const pop = [
    <SwitcherHeader
      currentSheetType={currentSheet}
      sheet={sheet}
      dataCfg={dataCfg}
      options={options}
      key="switcher"
    />,
    <Export key={'export'} sheet={sheet} />,
    <Dropdown overlay={menu} placement="topLeft" arrow key="settingZ">
      <Button icon={<VerticalAlignMiddleOutlined />}>Type</Button>
    </Dropdown>,
  ];

  return (
    <Row align={'middle'} justify={'end'}>
      <Col span={18} push={6}>
        {title}
      </Col>
      <Col span={6} pull={18}>
        <Popover content={pop} title="Table settings ...">
          <Button icon={<SettingOutlined />} size={'small'}>
            Setting table
          </Button>
        </Popover>
      </Col>
    </Row>
  );
};
Header.defaultProps = {
  // exportCfg: { open: false },
  // advancedSortCfg: { open: false },
  // switcherCfg: { open: false },
};
