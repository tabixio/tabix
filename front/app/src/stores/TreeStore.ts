import { observable, action, IReactionDisposer, reaction, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { withRequest } from 'module/mobx-utils';
import { Node } from 'react-virtualized-tree';
import { TreeFilterModel, EditorTab } from 'models';
import { ServerStructure } from 'services';
import ApiRequestableStore from './ApiRequestableStore';
import DashboardUIStore from './DashboardUIStore';

export type TypedNode = Node & { children?: TypedNode[] } & (
    | ServerStructure.Server
    | ServerStructure.Database
    | ServerStructure.Table
    | ServerStructure.SpecialItem
    | ServerStructure.SpecialGroupItem
    | ServerStructure.Column
  );

export type FilteredNodes = Array<
  | ServerStructure.Database
  | ServerStructure.Table
  | ServerStructure.Column
  | ServerStructure.SpecialItem
  | ServerStructure.SpecialGroupItem
>;

export default class TreeStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  treeNodes: TypedNode[] = [];

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  @observable
  filteredNodes: FilteredNodes = [];

  @observable
  highlightedId?: string;

  private lastSelectedId?: string;

  protected changeCurrentDatabaseReaction?: IReactionDisposer;

  protected changeTreeFilterReaction?: IReactionDisposer;

  protected initialize() {
    this.changeCurrentDatabaseReaction = reaction(
      () => this.rootStore.tabsStore.getActiveEditorDatabase(),
      this.selectDbNode
    );

    this.changeTreeFilterReaction = reaction(
      () => this.treeFilter.text,
      () => {
        if (!this.highlightedId) return;
        this.updateState(this.highlightedId, { highlighted: false });
        this.highlightedId = undefined;
      }
    );
  }

  private findDbNode(nodes: TypedNode[], name: string): Option<TypedNode> {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      if (ServerStructure.isDatabase(n) && n.name === name) return Some(n);
      if (ServerStructure.isServer(n) && n.children) return this.findDbNode(n.children, name);
    }
    return None;
  }

  @action.bound
  selectDbNode(dbName: EditorTab['currentDatabase']) {
    this.lastSelectedId && this.updateState(this.lastSelectedId, { selected: false });

    dbName.flatMap(this.findDbNode.bind(this, this.treeNodes)).forEach((n) => {
      const node = n;
      node.state = { ...node.state, selected: true };
      this.lastSelectedId = node.id;
    });
  }

  @withRequest.bound
  async loadData(attachItem: ServerStructure.SpecialArrayGroupItem) {
    // if (this.treeNodes.length) return;
    const structure = await this.api.loadDatabaseStructure();
    // Check new build Tabix and Clickhouse compatibility
    // const updateTabix = await this.api.checkVersionUpdateTabix();
    // TODO: show alert if need update tabix
    runInAction(() => {
      this.serverStructure = Some(structure);
      this.generateNodes(structure, attachItem);
    });
  }

  @action.bound
  collapseAll() {
    this.treeNodes.forEach(this.collapseDeep);
  }

  @action.bound
  private collapseDeep(n: Node) {
    const node = n;
    const isExpanded = node.state && node.state.expanded;
    if (isExpanded) {
      node.state = { ...node.state, expanded: false };
    }
    node.children && node.children.forEach(this.collapseDeep);
  }

  private generateNodes(
    server: ServerStructure.Server,
    attachItem: ServerStructure.SpecialArrayGroupItem
  ) {
    const children = server.databases.map((d) => ({
      ...d,
      children: d.tables.map((t) => ({
        ...t,
        children: t.columns.map((c) => ({ ...c })),
      })),
    }));
    // Merge twice interface in array
    const cc: Array<any> = [];
    children.forEach((n) => {
      cc.push(n);
    });
    attachItem.children &&
      attachItem.children.forEach((n) => {
        cc.push(n);
      });
    this.treeNodes = [
      {
        ...server,
        state: { expanded: true },
        children: cc,
      },
    ];
    // ToDo: fix selectDbNode if change connection, assign select_db to host`s
    // attachItem.children && attachItem.children.forEach(this.attachItem);
    this.selectDbNode(this.rootStore.tabsStore.getActiveEditorDatabase());
  }

  @action.bound
  updateTreeNodes(nodes: TypedNode[]) {
    this.treeNodes = nodes;
  }

  private filterNodes(searchText: string, nodes: TypedNode[]): FilteredNodes {
    const text = searchText.toLowerCase();
    return nodes.reduce<FilteredNodes>((acc, n) => {
      if (!ServerStructure.isServer(n) && n.name.toLowerCase().includes(text)) acc.push(n);
      const children = n.children && this.filterNodes(text, n.children);
      if (children && children.length) acc.push(...children);
      return acc;
    }, []);
  }

  @action.bound
  async filter() {
    if (this.treeFilter.text.length < TreeFilterModel.MIN_SEARCH_LENGTH) {
      this.filteredNodes = [];
      return;
    }
    const result = await Promise.resolve().then(() =>
      this.filterNodes(this.treeFilter.text, this.treeNodes)
    );
    runInAction(() => {
      this.filteredNodes = result;
    });
  }

  private findNode(id: string, nodes: TypedNode[]): Option<TypedNode> {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      if (n.id === id) return Some(n);
      if (n.children) {
        const maybe = this.findNode(id, n.children);
        if (maybe.nonEmpty()) return maybe;
      }
    }
    return None;
  }

  private updateState(id: string, state: object) {
    this.findNode(id, this.treeNodes).forEach((n) => {
      const node = n;
      node.state = { ...node.state, ...state };
    });
  }

  // Use id instead of node because treeNodes updated on every manipulation of nodes (expand, collapse)
  @action
  highlightNode(id: string) {
    this.filteredNodes = [];
    this.highlightedId && this.updateState(this.highlightedId, { highlighted: false });
    this.highlightAndExpandParentsOf(id, this.treeNodes);
    this.highlightedId = id;
  }

  private highlightAndExpandParentsOf(id: string, nodes: TypedNode[]): Option<TypedNode> {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];

      if (n.id === id) {
        n.state = { ...n.state, highlighted: true };
        return Some(n);
      }

      if (n.children) {
        const maybe = this.highlightAndExpandParentsOf(id, n.children);
        if (maybe.nonEmpty()) {
          n.state = { ...n.state, expanded: true };
          return maybe;
        }
      }
    }
    return None;
  }
}
