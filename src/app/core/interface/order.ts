export type Order = Order2[];
export interface Order2 {
  totalOrderPrice: number;
  cartItems: CartItem[];
}

export interface CartItem {
  count: number;
  product: ProductOfOrder;
  price: number;
}

export interface ProductOfOrder {
  title: string;
  imageCover: string;
  category: CategoryOfOreder;
  ratingsAverage: number;
}

export interface CategoryOfOreder {
  name: string;
}
