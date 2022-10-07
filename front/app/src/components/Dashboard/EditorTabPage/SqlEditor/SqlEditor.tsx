import React from 'react';
import { observer } from 'mobx-react';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { Query, ServerStructure } from 'services';
import { TextInsertType } from './types';
import Toolbar, { ActionType, ToolbarProps } from './Toolbar';
import css from './SqlEditor.css';
import SimpleEditor, { SimpleEditorProps } from './SimpleEditor';
// ------------------------------------------------------------------------------------
export interface SqlEditorProps
  extends Omit<ToolbarProps, 'databases'>,
    SimpleEditorProps,
    FlexProps {
  currentDatabase: string;
}
// ------------------------------------------------------------------------------------
@observer
export default class SqlEditor extends React.Component<SqlEditorProps> {
  private ref: SimpleEditor | null = null;
  constructor(props: any) {
    super(props);
  }

  public insertColumn(coll: ServerStructure.Column) {
    this.insertText(` ${coll.name} `, TextInsertType.Column);
  }

  /**
   * Вставка текста к курсору
   * @param textToInsert
   * @param mode
   */
  public insertText(textToInsert: string, mode: TextInsertType) {
    this.ref?.insert(textToInsert, mode);
  }

  /**
   * Выполнение запросов, если получена command
   *
   * @param queryList
   * @param isExecAll
   */
  public execQueries = (queryList: Array<Query>, isExecAll: boolean): void => {
    const { onAction } = this.props;
    if (!queryList.length) {
      console.warn('Empty queryList, can`t exec...');
      return;
    }
    queryList.forEach((query: Query) => {
      console.info(`%c%s`, 'padding: 1rem;color: #bada55;font: 130% Tahoma;', query.sql);
    });
    // ------
    // Call parent onAction
    onAction(isExecAll ? ActionType.RunAll : ActionType.RunCurrent, queryList);
  };

  private onAction = (action: ActionType, eventData?: any): void => {
    const { onAction } = this.props;
    switch (action) {
      case ActionType.RunCurrent: {
        this.ref?.onExecCommand(false);
        break;
      }
      case ActionType.RunAll: {
        this.ref?.onExecCommand(true);
        break;
      }
      default:
        onAction(action, eventData);
        break;
    }
  };

  private onEditorMount = () => {
    // Bind key here
    // this.ref?.helper().bindKeys();
    // console.warn('onEditorMount - onEditorMount');
  };
  private setEditorRef = (editor: SimpleEditor | null) => {
    this.ref = editor;
  };

  render() {
    const {
      serverStructure,
      currentDatabase,
      onDatabaseChange,
      onContentChange,
      content,
      stats,
      onAction,
      className,
      ...rest
    } = this.props;

    return (
      <Flex column className={classNames(css.root, className)} {...rest}>
        <Flex grow fill className={css.editor}>
          <SimpleEditor
            ref={this.setEditorRef}
            content={content}
            readonly={false}
            processSql={true}
            onContentChange={onContentChange}
            serverStructure={serverStructure}
            onMount={this.onEditorMount}
            onExecCommand={this.execQueries}
          />
        </Flex>

        <Toolbar
          className={css.toolbar}
          databases={serverStructure ? serverStructure.databases : []}
          currentDatabase={currentDatabase}
          onDatabaseChange={onDatabaseChange}
          onAction={this.onAction}
          stats={stats}
        />
      </Flex>
    );
  }
}
