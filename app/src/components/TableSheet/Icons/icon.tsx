import React from 'react';
import { S2_PREFIX_CLS, IconProps, getIcon, TooltipContentType } from '@antv/s2';
import { HtmlIcon, HtmlIconProps } from './html-icon';
import cx from 'classnames';

export const TOOLTIP_DEFAULT_ICON_PROPS: Partial<HtmlIconProps> = {
  width: 14,
  height: 14,
  style: {
    verticalAlign: 'sub',
    marginRight: 4,
  },
};

interface Props {
  content: TooltipContentType;
  style?: any;
  className?: string;
}

class ReactElement extends React.PureComponent<Props> {
  render() {
    const { style = {}, className, content } = this.props;
    let htmlNode: string;
    if (typeof content !== 'string') {
      htmlNode = content?.innerHTML || '';
    } else {
      htmlNode = content;
    }
    return (
      <div
        style={style}
        className={cx(`${S2_PREFIX_CLS}-react-element`, className)}
        dangerouslySetInnerHTML={{ __html: htmlNode }}
      />
    );
  }
}

export const Icon = (props: IconProps) => {
  const { icon, ...attrs } = props;

  if (!icon) {
    return null;
  }

  if (getIcon(icon as string)) {
    const name = icon as string;

    return <HtmlIcon name={name} {...TOOLTIP_DEFAULT_ICON_PROPS} {...attrs} />;
  }
  return <ReactElement content={icon} {...TOOLTIP_DEFAULT_ICON_PROPS} {...attrs} />;
};
