import { ProductListing } from '../types/Product';

const API_URL = 'https://api.example.com/products';

export const productService = {
  async getProductListings(page: number): Promise<ProductListing[]> {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch product listings');
    return response.json();
  },

  async getProductListingById(id: string): Promise<ProductListing> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product listing');
    return response.json();
  },

  async createProductListing(productData: Partial<ProductListing>): Promise<ProductListing> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product listing');
    return response.json();
  },

  async updateProductListing(id: string, productData: Partial<ProductListing>): Promise<ProductListing> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product listing');
    return response.json();
  },

  async deleteProductListing(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product listing');
  },

  async updateProductStatus(id: string, status: ProductListing['status']): Promise<ProductListing> {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update product status');
    return response.json();
  }
}; 