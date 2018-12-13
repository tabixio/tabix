import { observable, action, IReactionDisposer, reaction, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { Overwrite } from 'typelevel-ts';
import { Initializable, withRequest } from '@vzh/mobx-stores';
import { Node } from 'react-virtualized-tree';
import { EditorTabModel, TreeFilterModel, TabType } from 'models';
import { ServerStructure } from 'services';
import ApiRequestableStore from './ApiRequestableStore';

export type TypedNode = Overwrite<Node, { children?: TypedNode[] }> &
  (
    | ServerStructure.Server
    | ServerStructure.Database
    | ServerStructure.Table
    | ServerStructure.Column);

export type FilteredNodes = Array<
  ServerStructure.Database | ServerStructure.Table | ServerStructure.Column
>;

export default class TreeStore extends ApiRequestableStore implements Initializable {
  // private unfilteredNodes: TypedNode[] = [];

  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  treeNodes: TypedNode[] = [];

  // // remove
  // @observable
  // treeExpandedKeys: string[] = [];

  // // remove ?
  // @observable
  // treeHighlightedKey: Option<string> = None;

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  @observable
  filteredNodes: FilteredNodes = [];

  protected changeCurrentDatabaseReaction?: IReactionDisposer;

  init() {
    // Keep ref to last selected node for quick replace selected state of prev selected node.
    let selectedNode: TypedNode | undefined;

    this.changeCurrentDatabaseReaction = reaction(
      () =>
        this.rootStore.tabsStore
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
    console.log('*** generate nodes ***');
    // const selectedKeys = this.getTreeSelectedKeys();

    this.treeNodes = [
      {
        ...server,
        state: { expanded: true },
        children: server.databases.map<TypedNode>(d => ({
          ...d,
          // state: { selected: selectedKeys.includes(d.id) },
          children: d.tables.map<TypedNode>(t => ({
            ...t,
            // state: { selected: selectedKeys.includes(t.id) },
            children: t.columns.map<TypedNode>(c => ({
              ...c,
              // state: { selected: selectedKeys.includes(c.id) },
            })),
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

  // getTreeSelectedKeys(): ReadonlyArray<string> {
  //   return this.rootStore.dashboardStore
  //     .activeTabOfType<EditorTabModel>(TabType.Editor)
  //     .flatMap(t => t.currentDatabase)
  //     .map(db => [db])
  //     .getOrElse([]);
  // }

  // @action
  // updateTreeHighlightedKey(key?: string) {
  //   this.treeHighlightedKey = Option.of(key);
  // }

  // @action
  // updateTreeExpandedKeys(keys: string[]) {
  //   this.treeExpandedKeys = keys;
  // }
}
