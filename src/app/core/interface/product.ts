export interface Product {
  title: string;
  category: Categoryprod;
  imageCover: string;
  ratingsAverage: number;
  price: number;
  _id?: string;
}

export interface Categoryprod {
  name: string;
}
