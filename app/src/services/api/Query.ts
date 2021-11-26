import monacoEditor from 'monaco-editor';

export interface Query {
  id: string;
  tokens: any; // splitRange['tokens']
  sql: string;
  sqlOriginal: string;
  isExecutable: boolean;
  range: monacoEditor.Range;
  inCursor: boolean;
  inSelected: boolean;
  numQuery: number;
  numCommand: number;
  commands: Array<TabixCommand>;
  showProgressQuery: string;
  isOperationCAD: boolean; // CreateAlterDrop
  format: string;
  isFormatSet: boolean;
  variables: Array<Variable> | null;
  extendSettings: any | undefined;
  currentDatabase: string | undefined;
}
export interface Response {
  query: Query;
  statistics: any | null;
  data: any | null;
  error: boolean;
  rows: number | null;
  meta: any | null;
  time: string;
}

export interface TabixCommand {
  type: string;
  text: string;
}

export interface Variable {
  name: string;
  value: string;
}
