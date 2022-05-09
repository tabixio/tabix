import React, { FC, ReactNode } from 'react';
import { PageHeader } from 'antd';
// import cx from 'classnames';
import { Export } from './Export';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
// import { Export } from '@antv/s2-react';
import { AdvancedSort } from './Sort';
import { SwitcherHeader } from './Switcher/header';

// import './index.less';

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
  sheet: SpreadSheet;
}

export const Header: FC<HeaderProps> = ({
  // className,
  // title,
  // width,
  // description,
  // exportCfg,
  // advancedSortCfg,
  // switcherCfg,
  sheet,
  // extra,
  dataCfg,
  options,
  ...restProps
}) => {
  const PRE_CLASS = 's2-header';

  // Todo : SwitcherHeader
  // Todo : AdvancedSort
  return (
    <PageHeader
      extra={[
        <SwitcherHeader sheet={sheet} dataCfg={dataCfg} options={options} key="s" />,
        <Export key={'export'} sheet={sheet} />,
      ]}
    ></PageHeader>
  );
};
//
Header.defaultProps = {
  // exportCfg: { open: false },
  // advancedSortCfg: { open: false },
  // switcherCfg: { open: false },
};
