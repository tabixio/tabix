// import {
//   TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU,
//   TOOLTIP_OPERATOR_TABLE_SORT_MENUS,
//   TOOLTIP_OPERATOR_SORT_MENUS,
//   TOOLTIP_OPERATOR_TREND_MENU,
//   setEVALocale,
// } from '@antv/s2';
//

import { setLang, i18n, extendLocale } from '@antv/s2';

//
export function setLocale() {
  const locale = {
    zh_CN: {
      test: '测试',
    },
    en_US: {
      test: 'test',
    },
  };
  setLang('en_US');
  extendLocale(locale);
  //   TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU.text = 'Hide';
  //   TOOLTIP_OPERATOR_TABLE_SORT_MENUS[0].text = 'Asc';
  //   TOOLTIP_OPERATOR_TABLE_SORT_MENUS[1].text = 'Desc';
  //   TOOLTIP_OPERATOR_TABLE_SORT_MENUS[2].text = 'None';
  //   TOOLTIP_OPERATOR_SORT_MENUS[0].text = 'Asc';
  //   TOOLTIP_OPERATOR_SORT_MENUS[1].text = 'Desc';
  //   TOOLTIP_OPERATOR_SORT_MENUS[2].text = 'None';
  //   TOOLTIP_OPERATOR_TREND_MENU.text = 'Trend';
  //   setEVALocale('en_US');
}

//
// setLocale();
