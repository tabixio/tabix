import React, { FC, useEffect, useState } from 'react';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import {
  generateSheetConfig,
  generateSwitcherFields,
  generateSwitcherFieldsCfgFromResult,
} from './headerUtil';
import { SwitcherResult } from './interfaces';
import { Switcher, SwitcherProps } from '.';
// import './index.less';

type SwitcherBasicCfg = Pick<
  SwitcherProps,
  'title' | 'resetText' | 'innerContentClassName' | 'contentTitleText' | 'popover' | 'disabled'
>;

export interface SwitcherCfgProps extends SwitcherBasicCfg {
  open?: boolean;
}

export interface SwitcherHeaderProps extends SwitcherBasicCfg {
  currentSheetType: string;
  sheet: SpreadSheet;
  dataCfg: S2DataConfig;
  options: S2Options;
}

export const SwitcherHeader: FC<SwitcherHeaderProps> = ({
  currentSheetType,
  sheet,
  dataCfg,
  options,
  ...props
}) => {
  const [fields, setFields] = useState(() =>
    generateSwitcherFields(sheet, dataCfg, options?.interaction?.hiddenColumnFields)
  );

  useEffect(() => {
    console.log('SwitcherHeader->useEffect->currentSheetType');
  }, [currentSheetType]);
  useEffect(() => {
    console.log('SwitcherHeader->useEffect->setFields');
    setFields(generateSwitcherFields(sheet, dataCfg, options?.interaction?.hiddenColumnFields));
  }, [
    sheet,
    JSON.stringify(dataCfg?.fields),
    JSON.stringify(dataCfg?.meta),
    JSON.stringify(options?.interaction?.hiddenColumnFields),
    currentSheetType,
  ]);

  const onSubmit = (result: SwitcherResult) => {
    const { fields, hiddenColumnFields } = generateSheetConfig(sheet, result);
    sheet.setDataCfg({
      fields: { ...sheet.dataCfg.fields, ...fields },
    } as S2DataConfig);

    if (hiddenColumnFields) {
      sheet.setOptions({ interaction: { hiddenColumnFields } });
    }
    sheet.render();

    setFields(
      generateSwitcherFieldsCfgFromResult(sheet, result, sheet.dataCfg?.meta, hiddenColumnFields)
    );
  };
  return (
    <Switcher
      currentSheetType={currentSheetType}
      sheetType={currentSheetType == 'table' ? 'table' : 'pivot'}
      onSubmit={onSubmit}
      {...props}
      {...fields}
    />
  );
};
