import React from 'react';
import { TableSheet } from 'components/TableSheet';
import DataDecorator from 'services/api/DataDecorator';

interface Props {}

export default function ServerOverviewTabPage({}: Props) {
  return (
    <div>
      ServerOverviewTabPage
      <br />
      <TableSheet data={new DataDecorator()} />
    </div>
  );
}
