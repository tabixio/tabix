import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import css from './ButtonsContainer.css';

export interface Props extends FlexProps {
  children: React.ReactNode;
}

export default function ButtonsContainer(props: Props) {
  return <Flex className={css.root} {...props} />;
}
