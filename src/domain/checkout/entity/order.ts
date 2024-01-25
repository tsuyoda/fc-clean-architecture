import OrderItem from './orderItem';

export default class Order {
  private _total: number;

  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[],
  ) {
    this._total = this.calculateTotal();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get total() {
    return this._total;
  }

  get items() {
    return this._items;
  }

  addItems(items: OrderItem[]): void {
    this._items.push(...items);
  }

  removeItems(itemIds: string[]): void {
    this._items = this._items.filter(item => !itemIds.includes(item.id));
  }

  private validate(): void {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required');
    }

    if (this._items.length === 0) {
      throw new Error('At least 1 item is required');
    }
  }

  private calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.total, 0);
  }
}
