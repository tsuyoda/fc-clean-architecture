import Address from '../valueObject/address';

export default class Customer {
  private _address?: Address;
  private _isActive = false;
  private _rewardPoints = 0;

  constructor(
    private _id: string,
    private _name: string,
  ) {
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get isActive() {
    return this._isActive;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (typeof this._address === 'undefined') {
      throw new Error('Adress is mandatory to activate a customer');
    }

    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }
}
