export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ebooks' | 'insights' | 'courses' | 'others';
  image: string;
}