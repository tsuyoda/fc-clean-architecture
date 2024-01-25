import Address from './address';

describe('Address unit tests', () => {
  it('should throw error when Street is empty', () => {
    expect(() => {
      new Address('', 10, '99999-999', 'City');
    }).toThrow('Street is required');
  });

  it('should throw error when Number less or equal than 0', () => {
    expect(() => {
      new Address('Street', 0, '99999-999', 'City');
    }).toThrow('Number must be greater then 0');

    expect(() => {
      new Address('Street', -1, '99999-999', 'City');
    }).toThrow('Number must be greater then 0');
  });

  it('should throw error when ZIP is empty', () => {
    expect(() => {
      new Address('Street', 10, '', 'City');
    }).toThrow('Zipcode is required');
  });

  it('should throw error when City is empty', () => {
    expect(() => {
      new Address('Street', 10, '99999-999', '');
    }).toThrow('City is required');
  });

  it('should return address as string', () => {
    const street = 'Street';
    const number = 10;
    const zipcode = '99999-999';
    const city = 'City';

    const address = new Address(street, number, zipcode, city);

    expect(address.toString()).toBe(
      `${street}, ${number}, ${zipcode} - ${city}`,
    );
  });
});
