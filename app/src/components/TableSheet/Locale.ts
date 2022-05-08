import { TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU, setEVALocale } from '@antv/s2';

export function setLocale() {
  TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU.text = 'Hide';
  setEVALocale('en_US');
}

setLocale();
