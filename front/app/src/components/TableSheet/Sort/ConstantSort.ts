import { HtmlIconProps } from '../Icons';

export const TOOLTIP_DEFAULT_ICON_PROPS: Partial<HtmlIconProps> = {
  width: 14,
  height: 14,
  style: {
    verticalAlign: 'sub',
    marginRight: 4,
  },
};

export const SORT_METHOD = [
  {
    name: 'ASC',
    value: 'ASC',
  },
  {
    name: 'DESC',
    value: 'DESC',
  },
];

export const RULE_OPTIONS = [
  {
    label: 'Sort method',
    value: 'sortMethod',
  },
  {
    label: 'Sort by',
    value: 'sortBy',
  },
  {
    label: 'Sort by measure',
    value: 'sortByMeasure',
    children: [],
  },
];

export const ADVANCED_PRE_CLS = 'antv-s2-advanced-sort';
