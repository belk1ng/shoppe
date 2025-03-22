export interface CartItemSchema {
  image: string;
  count: number;
  name: string;
  price: number;
  sku: number;
}

export type CartValues = CartItemSchema[];
