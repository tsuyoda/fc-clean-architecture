interface IBaseUpdateCustomerDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    zipcode: string;
    city: string;
  };
}

export interface IInputUpdateCustomerDTO extends IBaseUpdateCustomerDTO {}
export interface IOutputUpdateCustomerDTO extends IBaseUpdateCustomerDTO {}
