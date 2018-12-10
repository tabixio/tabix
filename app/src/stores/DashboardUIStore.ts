import { observable, action, IReactionDisposer, reaction } from 'mobx';
import { Option, None } from 'funfix-core';
import { UIStore, createViewModel, ViewModelLike, Initializable } from '@vzh/mobx-stores';
import { Node } from 'react-virtualized-tree';
import { EditorTabModel, TreeFilterModel, TabType } from 'models';
import { Query } from 'services';
import RootStore from './RootStore';
import DashboardStore from './DashboardStore';

export default class DashboardUIStore extends UIStore<RootStore> implements Initializable {
  @observable
  editedTab: Option<ViewModelLike<EditorTabModel>> = None;

  @observable
  treeExpandedKeys: string[] = [];

  @observable
  treeHighlightedKey: Option<string> = None;

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  @observable
  isFiltering: boolean = false;

  @observable
  executingQueries: ReadonlyArray<Query> = [];

  @observable
  treeNodes: Node[] = [];

  protected changeStructureReaction?: IReactionDisposer;

  protected changeCurrentDatabaseReaction?: IReactionDisposer;

  init() {
    this.changeStructureReaction = reaction(
      () => this.rootStore.dashboardStore.serverStructure,
      structure => this.generateNodes(structure)
    );

    this.changeCurrentDatabaseReaction = reaction(
      () =>
        this.rootStore.dashboardStore
          .activeTabOfType<EditorTabModel>(TabType.Editor)
          .flatMap(t => t.currentDatabase),
      db => {
        console.log(db);
        return db;
      }
    );
  }

  private generateNodes(structure: DashboardStore['serverStructure']) {
    console.log('*** generate nodes ***');
    const selectedKeys = this.getTreeSelectedKeys();

    const nodes = structure
      .map(s => [
        {
          ...s,
          state: { expanded: true },
          children: s.databases.map<Node>(d => ({
            ...d,
            state: { selected: selectedKeys.includes(d.id) },
            children: d.tables.map<Node>(t => ({
              ...t,
              state: { selected: selectedKeys.includes(t.id) },
              children: t.columns.map<Node>(c => ({
                ...c,
                state: { selected: selectedKeys.includes(c.id) },
              })),
            })),
          })),
        },
      ])
      .getOrElse([]);

    this.updateTreeNodes(nodes);
  }

  @action
  updateTreeNodes(nodes: Node[]) {
    this.treeNodes = nodes;
  }

  getTreeSelectedKeys(): ReadonlyArray<string> {
    return this.rootStore.dashboardStore
      .activeTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap(t => t.currentDatabase)
      .map(db => [db])
      .getOrElse([]);
  }

  @action
  updateTreeHighlightedKey(key?: string) {
    this.treeHighlightedKey = Option.of(key);
  }

  @action
  updateTreeExpandedKeys(keys: string[]) {
    this.treeExpandedKeys = keys;
  }

  @action
  updateFiltering(filtering: boolean) {
    this.isFiltering = filtering;
  }

  resetTabViewState() {
    if (this.editedTab.isEmpty()) return;
    this.editedTab.forEach(t => {
      t.reset();
    });
    this.editedTab = None;
  }

  @action
  showSaveModal() {
    this.rootStore.dashboardStore.activeTabOfType<EditorTabModel>(TabType.Editor).forEach(tab => {
      this.editedTab = Option.of(createViewModel(tab));
    });
  }

  @action.bound
  hideSaveModal() {
    this.resetTabViewState();
  }
}
