export interface IOrderProps {
  customerId: string;
  items: {
    name: string;
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];
}
