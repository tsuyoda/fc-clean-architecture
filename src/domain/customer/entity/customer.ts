import Entity from '../../@shared/entity/abstract.entity';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import Address from '../valueObject/address';

export default class Customer extends Entity {
  private _name: string;
  private _address?: Address;
  private _isActive = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    super(id);
    this._name = name;
    this.validate();
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
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasNotifications())
      throw new Error(this.notification.getMessages(this.constructor.name));
  }
}
