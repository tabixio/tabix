import { action } from 'mobx';
import Model from './Model';

export default class StoreModel<Entity extends object> extends Model<Entity> {
  constructor() {
    super();
    this.changeField = action((this.changeField as Function).bind(this));
  }
}
