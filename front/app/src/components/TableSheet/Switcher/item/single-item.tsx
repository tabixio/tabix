// @ts-nocheck
import { Checkbox, Tooltip } from 'antd';
import cx from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { SwitcherFieldd, SwitcherItem } from '../interfaces';
import { getSwitcherClassName } from '../util';
import { DimensionCommonProps } from './index';

const CLASS_NAME_PREFIX = 'item';

type SingleItemProps = Omit<SwitcherItem, 'children'> &
  Pick<SwitcherFieldd, 'selectable'> &
  DimensionCommonProps & {
    parentId?: string;
    disabled?: boolean;
    className: string;
    dragHandleProps?: DraggableProvided['dragHandleProps'];
  };

export const SingleItem: FC<SingleItemProps> = ({
  dragHandleProps,
  fieldType,
  id,
  displayName,
  selectable,
  checked,
  parentId,
  className,
  disabled,
  onVisibleItemChange,
}) => {
  const ref = useRef<any>();
  const [ellipsis, setEllipsis] = useState(false);

  useEffect(() => {
    // 针对超长文字，添加 tooltip
    // @ts-ignore
    setEllipsis(ref.current.offsetWidth < ref.current.scrollWidth);
  }, []);

  const realDisplayName = displayName ?? id;
  // @ts-ignore: Unreachable code error
  /* tslint:disable-next-line */
  return (
    <div
      {...dragHandleProps}
      className={cx(getSwitcherClassName(CLASS_NAME_PREFIX), className, {
        unchecked: !checked,
      })}
    >
      {selectable && (
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={(e) => onVisibleItemChange?.(fieldType, e.target.checked, id, parentId)}
        />
      )}
      {ellipsis ? (
        <Tooltip
          title={realDisplayName}
          placement="bottomRight"
          overlayClassName={getSwitcherClassName('tooltip')}
        >
          <div className={getSwitcherClassName(CLASS_NAME_PREFIX, 'text')} ref={ref}>
            {realDisplayName}
          </div>
        </Tooltip>
      ) : (
        <div className={getSwitcherClassName(CLASS_NAME_PREFIX, 'text')} ref={ref}>
          {realDisplayName}
        </div>
      )}
    </div>
  );
};

SingleItem.defaultProps = {
  checked: true,
  disabled: false,
};
