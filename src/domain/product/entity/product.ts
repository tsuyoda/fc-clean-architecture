import Entity from '../../@shared/entity/abstract.entity';
import IProduct from './product.interface';

export default class Product extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  private validate() {
    if (!this._id || this._id.length === 0) {
      this.notification.addNotification({
        context: this.constructor.name,
        message: 'Id is required',
      });
    }

    if (!this._name || this._name.length === 0) {
      this.notification.addNotification({
        context: this.constructor.name,
        message: 'Name is required',
      });
    }

    if (!this._price || this._price < 0) {
      this.notification.addNotification({
        context: this.constructor.name,
        message: 'Price must be greater or equal than 0',
      });
    }

    if (this.notification.hasNotifications()) {
      throw new Error(this.notification.getMessages(this.constructor.name));
    }
  }
}
