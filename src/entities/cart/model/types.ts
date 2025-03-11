export interface CartItem {
  image: string;
  count: number;
  name: string;
  price: number;
  sku: number;
}

export type CartValues = CartItem[];
