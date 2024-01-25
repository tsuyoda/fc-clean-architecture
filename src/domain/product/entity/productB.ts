import IProduct from './product.interface';

export default class ProductB implements IProduct {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
  ) {
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price * 2;
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
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._price < 0) {
      throw new Error('Price must be greater or equal than 0');
    }
  }
}
