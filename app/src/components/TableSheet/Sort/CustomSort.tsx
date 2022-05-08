import React from 'react';
import { Card } from 'antd';
import { ADVANCED_PRE_CLS, TOOLTIP_DEFAULT_ICON_PROPS } from './ConstantSort';
import { HtmlIcon } from '../Icons';

export interface CustomSortProps {
  splitOrders: string[];
  setSplitOrders: (param: string[]) => void;
}

export const CustomSort: React.FC<CustomSortProps> = (props) => {
  const { splitOrders = [], setSplitOrders } = props;
  const upHandler = (value: string) => {
    const res = splitOrders.concat();
    res.splice(res.indexOf(value), 1);
    res.unshift(value);
    setSplitOrders(res);
  };
  const downHandler = (value: string) => {
    const res = splitOrders.concat();
    let index = res.indexOf(value);
    res.splice(res.indexOf(value), 1);
    res.splice((index += 1), 0, value);
    setSplitOrders(res);
  };
  const toTopHandler = (value: string) => {
    const res = splitOrders.concat();
    let index = res.indexOf(value);
    if (index > 0) {
      res.splice(res.indexOf(value), 1);
      res.splice((index -= 1), 0, value);
      setSplitOrders(res);
    }
  };

  const renderItem = (value: string) => {
    return (
      <>
        <span className="split-text">{value}</span>
        <span
          className={`${ADVANCED_PRE_CLS}-split-icon`}
          onClick={() => {
            upHandler(value);
          }}
        >
          <HtmlIcon name="groupAsc" {...TOOLTIP_DEFAULT_ICON_PROPS} />
        </span>
        <span
          className={`${ADVANCED_PRE_CLS}-split-icon`}
          onClick={() => {
            downHandler(value);
          }}
        >
          <HtmlIcon name="groupDesc" {...TOOLTIP_DEFAULT_ICON_PROPS} />
        </span>
        <span
          className={`${ADVANCED_PRE_CLS}-split-icon`}
          onClick={() => {
            toTopHandler(value);
          }}
        >
          <HtmlIcon name="globalAsc" {...TOOLTIP_DEFAULT_ICON_PROPS} />
        </span>
      </>
    );
  };

  return (
    <Card className={`${ADVANCED_PRE_CLS}-card-content`}>
      {splitOrders.map((value) => (
        <li key={value} className={`${ADVANCED_PRE_CLS}-split-value`} title={value}>
          {renderItem(value)}
        </li>
      ))}
    </Card>
  );
};
