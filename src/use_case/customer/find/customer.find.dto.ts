export interface IInputFindCustomerDTO {
  id: string;
}

export interface IOutputFindCustomerDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    zipcode: string;
    city: string;
  };
}
