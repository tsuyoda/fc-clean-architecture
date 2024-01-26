import NotificationContext from '../notification/notification.context';

export default abstract class Entity {
  public notification: NotificationContext;

  constructor(protected _id: string) {
    this.notification = new NotificationContext();
  }

  get id(): string {
    return this._id;
  }
}
