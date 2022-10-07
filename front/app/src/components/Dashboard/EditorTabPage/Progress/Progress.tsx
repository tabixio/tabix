import React from 'react';
import { ProgressProps } from 'antd/lib/progress';
import { Query } from 'services';
import css from './Progress.css';

interface Props extends ProgressProps {
  queries: ReadonlyArray<Query>;
}

export default function Progress({ queries }: Props) {
  return (
    <div className={css.root}>
      <div className={css.progress}>
        <div className={css.indeterminate} />
      </div>

      <div className={css['query-list']}>
        {queries.map((q) => (
          <div key={q.id}>{q.sqlOriginal.replace(/(\r\n|\n|\r)$/gm, '').substr(0, 130)}</div>
        ))}
      </div>
    </div>
  );
}
