import { observable, action, IReactionDisposer, reaction, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { Overwrite } from 'typelevel-ts';
import { Initializable, withRequest } from '@vzh/mobx-stores';
import { Node } from 'react-virtualized-tree';
import { EditorTabModel, TreeFilterModel, TabType } from 'models';
import { ServerStructure } from 'services';
import ApiRequestableStore from './ApiRequestableStore';
import DashboardUIStore from './DashboardUIStore';

export type TypedNode = Overwrite<Node, { children?: TypedNode[] }> &
  (
    | ServerStructure.Server
    | ServerStructure.Database
    | ServerStructure.Table
    | ServerStructure.Column);

export type FilteredNodes = Array<
  ServerStructure.Database | ServerStructure.Table | ServerStructure.Column
>;

export default class TreeStore extends ApiRequestableStore<DashboardUIStore>
  implements Initializable {
  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  treeNodes: TypedNode[] = [];

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  @observable
  filteredNodes: FilteredNodes = [];

  private lastHighlightedId?: string;

  protected changeCurrentDatabaseReaction?: IReactionDisposer;

  protected changeTreeFilterReaction?: IReactionDisposer;

  init() {
    let lastSelectedId: string | undefined;
    // todo: select node correctly
    this.changeCurrentDatabaseReaction = reaction(
      () =>
        this.rootStore.tabsStore
          .activeTabOfType<EditorTabModel>(TabType.Editor)
          .flatMap(t => t.currentDatabase),
      dbName => {
        dbName.flatMap(this.findDbNode.bind(this, this.treeNodes)).forEach(n => {
          lastSelectedId && this.updateState(lastSelectedId, { selected: false });

          const node = n;
          node.state = { ...node.state, selected: true };
          lastSelectedId = node.id;
        });
      }
    );

    this.changeTreeFilterReaction = reaction(
      () => this.treeFilter.text,
      () => {
        if (!this.lastHighlightedId) return;
        this.updateState(this.lastHighlightedId, { highlighted: false });
        this.lastHighlightedId = undefined;
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

  @withRequest.bound
  async loadData() {
    const structure = await this.api.loadDatabaseStructure();
    runInAction(() => {
      this.serverStructure = Some(structure);
      this.generateNodes(structure);
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

  private generateNodes(server: ServerStructure.Server) {
    const activeTabDb = this.rootStore.tabsStore
      .activeTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap(t => t.currentDatabase)
      .orUndefined();

    this.treeNodes = [
      {
        ...server,
        state: { expanded: true },
        children: server.databases.map<TypedNode>(d => ({
          ...d,
          state: activeTabDb === d.name ? { selected: true } : undefined,
          children: d.tables.map<TypedNode>(t => ({
            ...t,
            children: t.columns.map<TypedNode>(c => ({ ...c })),
          })),
        })),
      },
    ];
  }

  @action.bound
  updateTreeNodes(nodes: TypedNode[]) {
    this.treeNodes = nodes;
  }

  private filterNodes(searchText: string, nodes: TypedNode[]): FilteredNodes {
    return nodes.reduce<FilteredNodes>((acc, n) => {
      if (!ServerStructure.isServer(n) && n.name.toLowerCase().includes(searchText)) acc.push(n);
      const children = n.children && this.filterNodes(searchText, n.children);
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
    this.findNode(id, this.treeNodes).forEach(n => {
      const node = n;
      node.state = { ...node.state, ...state };
    });
  }

  @action
  highlightFilteredNode(id: string) {
    this.filteredNodes = [];
    this.lastHighlightedId && this.updateState(this.lastHighlightedId, { highlighted: false });
    this.expandParentsOf(id, this.treeNodes);
    this.lastHighlightedId = id;
  }

  private expandParentsOf(id: string, nodes: TypedNode[]): Option<TypedNode> {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];

      if (n.id === id) {
        n.state = { ...n.state, highlighted: true };
        return Some(n);
      }

      if (n.children) {
        const maybe = this.expandParentsOf(id, n.children);
        if (maybe.nonEmpty()) {
          n.state = { ...n.state, expanded: true };
          return maybe;
        }
      }
    }
    return None;
  }
}
