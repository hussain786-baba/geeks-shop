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

export interface singleProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category[];
  images:string
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Blog {
  id: string
  tutorial: string
  date: string
  title: string
  description: string
  imageURL: string
  author: string
  profileImgURL: string
  readTime: number
}