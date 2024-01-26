import NotificationContext from './notification.context';

describe('Notification context unit tests', () => {
  it('should create notifications', () => {
    const notificationContext = new NotificationContext();
    const notification1 = {
      message: 'notification message',
      context: 'customer',
    };

    notificationContext.addNotification(notification1);

    expect(notificationContext.getMessages('customer')).toBe(
      'customer: notification message',
    );

    const notification2 = {
      message: 'notification message2',
      context: 'customer',
    };
    notificationContext.addNotification(notification2);

    expect(notificationContext.getMessages('customer')).toBe(
      'customer: notification message,customer: notification message2',
    );

    const notification3 = {
      message: 'notification message3',
      context: 'order',
    };
    notificationContext.addNotification(notification3);

    expect(notificationContext.getMessages('customer')).toBe(
      'customer: notification message,customer: notification message2',
    );
    expect(notificationContext.getMessages()).toBe(
      'customer: notification message,customer: notification message2,order: notification message3',
    );
  });

  it('should check if notification context has at least one notifiction', () => {
    const notificationContext = new NotificationContext();
    const notification = {
      message: 'notification message',
      context: 'customer',
    };
    notificationContext.addNotification(notification);

    expect(notificationContext.hasNotifications()).toBe(true);
  });

  it('should get all notifications', () => {
    const notificationContext = new NotificationContext();
    const notification = {
      message: 'notification message',
      context: 'customer',
    };
    notificationContext.addNotification(notification);

    expect(notificationContext.notifications).toEqual([notification]);
  });
});
