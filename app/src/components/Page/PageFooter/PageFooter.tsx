import React from 'react';
import { Layout } from 'antd';
import { Flex } from 'reflexy';

const version = 1;

export default function PageFooter() {
  return (
    <Flex component={Layout.Footer} column alignItems="center" justifyContent="center">
      <div>
        <a href="https://tabix.io/" target="_blank" rel="noopener noreferrer">
          Tabix.IO
        </a>{' '}
        by Tabix LLC © all rights reserved.
      </div>
      <div>Build {version}</div>
    </Flex>
  );
}
