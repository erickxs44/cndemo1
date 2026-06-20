import { nuvemshopFetch } from './client';

export interface NuvemshopProduct {
  id: number;
  name: { pt: string; [key: string]: string };
  description: { pt: string; [key: string]: string };
  price: string;
  promotional_price: string | null;
  stock: number | null;
  images: Array<{
    id: number;
    src: string;
    position: number;
    alt: string[];
  }>;
  variants: Array<{
    id: number;
    price: string;
    promotional_price: string | null;
    stock: number | null;
    sku: string;
    values: Array<{ pt: string }>;
  }>;
  created_at: string;
  updated_at: string;
}

export async function getProducts(): Promise<NuvemshopProduct[]> {
  return nuvemshopFetch<NuvemshopProduct[]>('/products');
}

export async function getProductById(id: number): Promise<NuvemshopProduct> {
  return nuvemshopFetch<NuvemshopProduct>(`/products/${id}`);
}
