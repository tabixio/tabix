import React from 'react';
import { Spin } from 'antd';
import { Flex } from 'reflexy';
import css from './Loader.css';

export default function Loader() {
  return (
    <Flex center className={css.root}>
      <Spin size="large" />
    </Flex>
  );
}
