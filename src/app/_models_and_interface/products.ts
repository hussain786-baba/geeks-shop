export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string;
  rating: Rating;
}
export interface Rating {
  rate: number;
  count: number;
}
