import React from 'react';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import { Lang, setEVALocale } from '@antv/s2';

//
interface Props {}

export default function ServerOverviewTabPage({}: Props) {
  const s2Options = {
    width: 600,
    height: 600,
    lang: 'en_US',
  };
  console.log(Lang);
  setEVALocale('en_US');
  console.log(Lang);
  const s2DataConfig = {
    fields: {
      //rows: ['a', 'b'],
      columns: ['a', 'b'],
      valueInCols: true,
    },
    data: [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 3, b: 3 },
    ],
  };

  return (
    <div>
      s2 sd ServerOverviewTabPage
      <SheetComponent dataCfg={s2DataConfig} options={s2Options} themeCfg={{ name: 'gray' }} />
    </div>
  );
}
