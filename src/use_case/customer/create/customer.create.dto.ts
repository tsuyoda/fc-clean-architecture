interface IBaseCreateCustomerDTO {
  name: string;
  address?: {
    street: string;
    number: number;
    zipcode: string;
    city: string;
  };
}

export interface IInputCreateCustomerDTO extends IBaseCreateCustomerDTO {}

export interface IOutputCreateCustomerDTO extends IBaseCreateCustomerDTO {
  id: string;
}
