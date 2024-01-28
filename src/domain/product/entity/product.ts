import Entity from '../../@shared/entity/abstract.entity';
import ProductValidatorFactory from '../factory/product.validator.factory';
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
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasNotifications()) {
      throw new Error(this.notification.getMessages(this.constructor.name));
    }
  }
}
