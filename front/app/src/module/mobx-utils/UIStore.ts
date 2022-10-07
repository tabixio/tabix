import { Omit } from 'typelevel-ts';
import { observable, computed, action } from 'mobx';
import Notification, { NotificationID, NotificationType } from './Notification';
import LoadableStore from './LoadableStore';

export default class UIStore<RS extends object> extends LoadableStore<RS> {
  @observable
  private notificationList: ReadonlyArray<Notification> = [];

  constructor(rootStore: RS) {
    super(rootStore);

    this.addNotification = this.addNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.cleanNotifications = this.cleanNotifications.bind(this);
  }

  @computed
  get notifications(): ReadonlyArray<Notification> {
    return this.notificationList;
  }

  @computed
  get hasError() {
    return this.notificationList.some(n => n.type === NotificationType.error);
  }

  @action
  addNotification(notification: Omit<Notification, 'id'>) {
    const newId = this.notificationList.length + 1;
    this.notificationList = this.notificationList.concat({ id: newId, ...notification });

    if (notification.timeout) {
      setTimeout(() => this.closeNotification(newId), notification.timeout);
    }
  }

  @action
  closeNotification(id: NotificationID) {
    this.notificationList = this.notificationList.filter(_ => _.id !== id);
  }

  @action
  cleanNotifications(type?: NotificationType) {
    this.notificationList = type ? this.notificationList.filter(_ => _.type !== type) : [];
  }
}
