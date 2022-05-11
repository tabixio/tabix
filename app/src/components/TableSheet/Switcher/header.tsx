import React, { FC, useEffect, useState } from 'react';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import {
  generateSheetConfig,
  generateSwitcherFields,
  generateSwitcherFieldsCfgFromResult,
  getSheetType,
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
    // console.log('onSubmit - SwitcherResult current state', currentSheetType);
    // console.log('onSubmit - SwitcherResult getSheetType:', getSheetType(sheet));
    // console.log('onSubmit - SwitcherResult before Obj', { ...sheet.dataCfg.fields });
    const { fields, hiddenColumnFields } = generateSheetConfig(sheet, result);
    sheet.setDataCfg({
      fields: { ...sheet.dataCfg.fields, ...fields },
    } as S2DataConfig);

    if (hiddenColumnFields) {
      sheet.setOptions({ interaction: { hiddenColumnFields } });
    }

    // console.log('onSubmit - SwitcherResult Field', fields);
    // console.log('onSubmit - SwitcherResult Obj', { ...sheet.dataCfg.fields, ...fields });
    // console.log('onSubmit - SwitcherResult : hiddenColumnFields', hiddenColumnFields);
    // console.log('onSubmit - SwitcherResult : sheet.dataCfg', sheet.dataCfg);
    // console.log('onSubmit - SwitcherResult Option', sheet.options);
    // console.log('sheet.render...');
    sheet.render();

    setFields(
      generateSwitcherFieldsCfgFromResult(sheet, result, sheet.dataCfg?.meta, hiddenColumnFields)
    );
  };
  // console.log(
  //   'SwitcherHeader -> render -> sheetType={}',
  //   getSheetType(sheet),
  //   ' currentSheetTypy= ',
  //   currentSheetType
  // );
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
