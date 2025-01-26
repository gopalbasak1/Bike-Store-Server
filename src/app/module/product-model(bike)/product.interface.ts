export interface IBike {
  name: string;
  brand: string;
  price: number;
  model?: string;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock?: boolean;
}
