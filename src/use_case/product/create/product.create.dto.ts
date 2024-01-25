interface IBaseCreateProductDTO {
  name: string;
  price: number;
}

export interface IInputCreateProductDTO extends IBaseCreateProductDTO {}

export interface IOutputCreateProductDTO extends IBaseCreateProductDTO {
  id: string;
}
