import { observable } from 'mobx';
// import { Option, None } from 'funfix-core';
import { UIStore } from '@vzh/mobx-stores';
import { Query } from 'services';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  // // remove
  // @observable
  // treeExpandedKeys: string[] = [];

  // // remove ?
  // @observable
  // treeHighlightedKey: Option<string> = None;

  // @observable
  // isTreeFiltering: boolean = false;

  @observable
  executingQueries: ReadonlyArray<Query> = [];

  // @action
  // updateFiltering(filtering: boolean) {
  //   this.isTreeFiltering = filtering;
  // }
}
