export default class Address {
  constructor(
    private _street: string,
    private _number: number,
    private _zipcode: string,
    private _city: string,
  ) {
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipcode() {
    return this._zipcode;
  }

  get city() {
    return this._city;
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zipcode} - ${this._city}`;
  }

  private validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }

    if (this._number <= 0) {
      throw new Error('Number must be greater then 0');
    }

    if (this._zipcode.length === 0) {
      throw new Error('Zipcode is required');
    }

    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }
}
