import { observable, runInAction } from 'mobx';
import { withRequest } from 'module/mobx-utils';
import { sqlHistoryStorage } from 'services';
import ApiRequestableStore from './ApiRequestableStore';

export default class SqlHistoryStore extends ApiRequestableStore {
  @observable
  history: Array<string> = [];

  @withRequest
  async loadData() {
    const items = await sqlHistoryStorage.getItems();
    runInAction(() => {
      this.history = items.reverse();
    });
  }
}
