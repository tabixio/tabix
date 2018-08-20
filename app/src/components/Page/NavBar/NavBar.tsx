import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Flex } from 'reflexy';
import { routePaths } from 'routes';
import css from './NavBar.css';

export default function NavBar() {
  return (
    <Flex component={Layout.Header} alignItems="center">
      <Link to={routePaths.home.path} className={css['brand']} />

      <Flex grow justifyContent="flex-end">
        <Link to={routePaths.home.path} className={css['brand']} />
      </Flex>
    </Flex>
  );
}
