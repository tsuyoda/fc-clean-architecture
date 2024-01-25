interface IBaseUpdateProductDTO {
  id: string;
  name: string;
  price: number;
}

export interface IInputUpdateProductDTO extends IBaseUpdateProductDTO {}
export interface IOutputUpdateProductDTO extends IBaseUpdateProductDTO {}
