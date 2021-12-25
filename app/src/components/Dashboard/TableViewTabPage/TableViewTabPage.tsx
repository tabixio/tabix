import React from 'react';
import { ServerStructure } from 'services';
import { TableViewTabModel } from 'models';

interface Props {
  serverStructure?: ServerStructure.Server;
  model: TableViewTabModel;
}

export default class TableViewTabPage extends React.Component<Props> {
  render() {
    const { serverStructure, model } = this.props;
    const tableId = model.tableId;
    console.warn(serverStructure, model);
    return (
      <div>
        <b>{tableId}</b>
      </div>
    );
  }
}
