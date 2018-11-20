export enum TabType {
  Editor = 'editor',
  Custom = 'custom',
}

interface Tab {
  readonly type: TabType;
  id: string;
  title: string;
}

const Tab = {};

export default Tab;
