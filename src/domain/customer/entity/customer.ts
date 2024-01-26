import Entity from '../../@shared/entity/abstract.entity';
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
    if (!this.id || this._id.length === 0) {
      this.notification.addNotification({
        context: this.constructor.name,
        message: 'Id is required',
      });
    }

    if (!this.name || this._name.length === 0) {
      this.notification.addNotification({
        context: this.constructor.name,
        message: 'Name is required',
      });
    }

    console.log({
      constructor: this.constructor.name,
      messages: this.notification.getMessages(),
    });

    if (this.notification.hasNotifications())
      throw new Error(this.notification.getMessages(this.constructor.name));
  }
}
