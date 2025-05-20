export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  ratings: number;
  reviewCount: number;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  variants?: ProductVariant[];
  tags?: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: {
    [key: string]: string;
  };
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  searchTerm?: string;
}

export interface ProductListing {
  id: string;
  mediaId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  quantity: number;
  location: string;
  tags: string[];
  shippingOptions: 'standard' | 'express' | 'free';
  returnPolicy: '30 days' | '14 days' | 'no returns';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'sold' | 'inactive';
}