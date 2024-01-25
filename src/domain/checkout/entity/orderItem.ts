export default class OrderItem {
  private _total: number;
  private _isDeleted = false;

  constructor(
    private _id: string,
    private _name: string,
    private _productId: string,
    private _unitPrice: number,
    private _quantity: number,
  ) {
    this._total = this.calculateTotal();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get productId() {
    return this._productId;
  }

  get unitPrice() {
    return this._unitPrice;
  }

  get quantity() {
    return this._quantity;
  }

  get total() {
    return this._total;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  delete() {
    this._isDeleted = true;
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._productId.length === 0) {
      throw new Error('ProductId is required');
    }

    if (this._unitPrice < 0) {
      throw new Error('UnitPrice must be greater or equal than 0');
    }

    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  private calculateTotal() {
    return this._unitPrice * this._quantity;
  }
}
