export interface IInputListProductDTO {}

export interface IOutputListProductDTO {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
}
