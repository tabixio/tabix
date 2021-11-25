export type NotificationID = string | number;

export enum NotificationType {
  info = 'info',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export default interface Notification {
  id: NotificationID;
  type: NotificationType | keyof typeof NotificationType;
  text: string;
  timeout?: number;
}
