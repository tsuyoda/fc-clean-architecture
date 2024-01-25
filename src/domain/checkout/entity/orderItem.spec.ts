import OrderItem from './orderItem';

describe('OrderItem unit tests', () => {
  it('Should throw a error when id is empty', () => {
    expect(() => {
      new OrderItem('', 'Item 1', 'p1', 10, 1);
    }).toThrow('Id is required');
  });

  it('Should throw a error when name is empty', () => {
    expect(() => {
      new OrderItem('i1', '', 'p1', 10, 1);
    }).toThrow('Name is required');
  });

  it('Should throw a error when productId is empty', () => {
    expect(() => {
      new OrderItem('i1', 'Item 1', '', 10, 1);
    }).toThrow('ProductId is required');
  });

  it('Should throw a error when unit price is less than 0', () => {
    expect(() => {
      new OrderItem('i1', 'Item 1', 'p1', -1, 1);
    }).toThrow('UnitPrice must be greater or equal than 0');
  });

  it('Should throw a error when quantity is less or equal than 0', () => {
    expect(() => {
      new OrderItem('i1', 'Item 1', 'p1', 10, 0);
    }).toThrow('Quantity must be greater than 0');

    expect(() => {
      new OrderItem('i1', 'Item 1', 'p1', 10, -1);
    }).toThrow('Quantity must be greater than 0');
  });

  it('Should mark a item as deleted', () => {
    const item = new OrderItem('i1', 'Item 1', 'p1', 10, 1);

    expect(item.isDeleted).toBe(false);

    item.delete();

    expect(item.isDeleted).toBe(true);
  });
});
