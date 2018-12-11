import { observable, action, IReactionDisposer, reaction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { UIStore, createViewModel, ViewModelLike, Initializable } from '@vzh/mobx-stores';
import { Node } from 'react-virtualized-tree';
import { EditorTabModel, TreeFilterModel, TabType } from 'models';
import { Query, ServerStructure } from 'services';
import RootStore from './RootStore';
import DashboardStore from './DashboardStore';

export type TypedNode = Node &
  (
    | ServerStructure.Server
    | ServerStructure.Database
    | ServerStructure.Table
    | ServerStructure.Column);

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
  treeNodes: TypedNode[] = [];

  protected changeStructureReaction?: IReactionDisposer;

  protected changeCurrentDatabaseReaction?: IReactionDisposer;

  init() {
    this.changeStructureReaction = reaction(
      () => this.rootStore.dashboardStore.serverStructure,
      structure => this.generateNodes(structure)
    );

    // Keep ref to last selected node for quick replace selected state of prev selected node.
    let selectedNode: TypedNode | undefined;

    this.changeCurrentDatabaseReaction = reaction(
      () =>
        this.rootStore.dashboardStore
          .activeTabOfType<EditorTabModel>(TabType.Editor)
          .flatMap(t => t.currentDatabase),
      dbName => {
        dbName.flatMap(this.findDbNode.bind(this, this.treeNodes)).forEach(n => {
          if (selectedNode) selectedNode.state = { ...selectedNode.state, selected: false };
          selectedNode = n;
          selectedNode.state = { ...selectedNode.state, selected: true };
        });
      }
    );
  }

  private findDbNode(nodes: TypedNode[], name: string): Option<TypedNode> {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      if (ServerStructure.isDatabase(n) && n.name === name) return Some(n);
      if (ServerStructure.isServer(n)) return this.findDbNode(n.children as TypedNode[], name);
    }
    return None;
  }

  @action.bound
  collapseAll(parentNode: Node) {
    const node = parentNode;
    const isExpanded = node.state && node.state.expanded;
    // console.log(node.name, isExpanded);
    if (isExpanded) {
      node.state = { ...node.state, expanded: false };
    }
    node.children && node.children.forEach(this.collapseAll);
  }

  private generateNodes(structure: DashboardStore['serverStructure']) {
    console.log('*** generate nodes ***');
    // const selectedKeys = this.getTreeSelectedKeys();

    const nodes = structure
      .map(s => [
        {
          ...s,
          state: { expanded: true },
          children: s.databases.map<Node>(d => ({
            ...d,
            // state: { selected: selectedKeys.includes(d.id) },
            children: d.tables.map<Node>(t => ({
              ...t,
              // state: { selected: selectedKeys.includes(t.id) },
              children: t.columns.map<Node>(c => ({
                ...c,
                // state: { selected: selectedKeys.includes(c.id) },
              })),
            })),
          })),
        },
      ])
      .getOrElse([]);

    this.updateTreeNodes(nodes);
  }

  @action.bound
  updateTreeNodes(nodes: TypedNode[]) {
    this.treeNodes = nodes;
  }

  // getTreeSelectedKeys(): ReadonlyArray<string> {
  //   return this.rootStore.dashboardStore
  //     .activeTabOfType<EditorTabModel>(TabType.Editor)
  //     .flatMap(t => t.currentDatabase)
  //     .map(db => [db])
  //     .getOrElse([]);
  // }

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
