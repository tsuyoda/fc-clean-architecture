import { INotification } from './notification.interface';

export default class NotificationContext<
  T extends INotification = INotification,
> {
  private _notifications: T[] = [];

  get notifications() {
    return this._notifications;
  }

  addNotification(notification: T) {
    this._notifications.push(notification);
  }

  hasNotifications() {
    return this._notifications.length > 0;
  }

  getMessages(context?: string) {
    const notifications = this._notifications.filter(
      notification =>
        typeof context === 'undefined' || notification.context === context,
    );

    return notifications
      .map(notification => `${notification.context}: ${notification.message}`)
      .join(',');
  }
}
