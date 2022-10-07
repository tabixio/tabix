import { Button, Popover, PopoverProps } from 'antd';
import React, { FC, ReactNode, useState } from 'react';
// import { SwitcherIcon } from '../Sort/Icons';
import { SwitcherContent, SwitcherContentProps } from './content';
import { getSwitcherClassName } from './util';

// import './index.less';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';

export interface SwitcherProps extends Omit<SwitcherContentProps, 'onToggleVisible'> {
  title?: ReactNode;
  // ref: https://ant.design/components/popover-cn/#API
  popover?: PopoverProps;
  disabled?: boolean;
}

export const Switcher: FC<SwitcherProps> = ({ title, popover, disabled, ...otherProps }) => {
  const [visible, setVisible] = useState(false);

  const onToggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Popover
      visible={!disabled && visible}
      content={<SwitcherContent {...otherProps} onToggleVisible={onToggleVisible} />}
      onVisibleChange={onToggleVisible}
      trigger="click"
      placement="bottomLeft"
      destroyTooltipOnHide
      {...popover}
    >
      {title || (
        <Button
          className={getSwitcherClassName('entry-button')}
          // size="small"
          disabled={disabled}
          icon={<VerticalAlignMiddleOutlined />}
        >
          Row & col
        </Button>
      )}
    </Popover>
  );
};
