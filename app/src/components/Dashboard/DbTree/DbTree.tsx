import React from 'react';
import { Tree } from 'antd';
import DatabaseStructure from 'services/api/DatabaseStructure';
import DbTitle from './DbTitle';
import css from './DbTree.css';

interface Props {
  dbStructure: DatabaseStructure;
}

export default class DbTree extends React.Component<Props> {
  render() {
    const { dbStructure } = this.props;

    return (
      <Tree className={css.root}>
        {dbStructure.getDatabases().map(d => (
          <Tree.TreeNode
            key={d.name}
            title={<DbTitle dbName={d.name} tableCount={dbStructure.getTables(d.name).length} />}
            selectable={false}
          >
            {dbStructure.getTables(d.name).map(t => (
              <Tree.TreeNode key={`${d.name}_${t.name}`} title={t.name} />
            ))}
          </Tree.TreeNode>
        ))}
      </Tree>
    );
  }
}
