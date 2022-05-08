import React from 'react';
import cx from 'classnames';
import { getIcon, S2_PREFIX_CLS } from '@antv/s2';

// import './html-icon.less';

export interface HtmlIconProps {
  name: string; // 'globalAsc' | 'globalDesc' | 'groupAsc' | 'groupDesc' | 'none';
  style?: any;
  width?: number;
  height?: number;
  className?: string;
}

export class HtmlIcon extends React.PureComponent<HtmlIconProps> {
  render() {
    const { style = {}, width, height, className, name } = this.props;
    const svgIcon = () => getIcon(name);
    // fix: Uncaught TypeError: Cannot assign to read only property 'width' of object '#<Object>'
    const newStyle = { ...style };

    // html-icon 和 gui-icon 的接口趋于一致，都有 width 和 height 的便携属性
    // 但在 html-icon 中，需要将 width 和 height 合入 style 中，且 width 比 style.width 优先级高
    if (width) {
      newStyle.width = `${width}px`;
    }
    if (height) {
      newStyle.height = `${height}px`;
    }
    return (
      <span
        style={newStyle}
        className={cx(`${S2_PREFIX_CLS}-html-icon`, className)}
        dangerouslySetInnerHTML={{ __html: svgIcon() }} // svg icon 都要求是本地文件，所以暂不担心 xss 问题了
      />
    );
  }
}
