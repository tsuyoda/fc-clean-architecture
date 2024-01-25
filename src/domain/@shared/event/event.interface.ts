export default interface IEvent<T = any> {
  readonly createdAt: Date;
  readonly eventData: T;
}
