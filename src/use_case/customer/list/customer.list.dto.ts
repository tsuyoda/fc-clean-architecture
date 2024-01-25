export interface IInputListCustomerDTO {}

export interface IOutputListCustomerDTO {
  customers: {
    id: string;
    name: string;
    address?: {
      street: string;
      number: number;
      zipcode: string;
      city: string;
    };
  }[];
}
