import { Product } from '../types/Product';

// Mock data for initial product listings
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 129.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'],
    stock: 45,
    ratings: 4.8,
    reviewCount: 124,
    vendorId: '123456',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-03-10'),
    isPublished: true,
    tags: ['wireless', 'audio', 'featured']
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 199.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
    stock: 28,
    ratings: 4.5,
    reviewCount: 97,
    vendorId: '123456',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-28'),
    isPublished: true,
    tags: ['wearable', 'fitness']
  },
  {
    id: '3',
    name: 'Portable Charger',
    description: '20000mAh high-capacity portable power bank',
    price: 49.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg'],
    stock: 112,
    ratings: 4.7,
    reviewCount: 203,
    vendorId: '123456',
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-03-05'),
    isPublished: true,
    tags: ['power', 'travel']
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Waterproof portable speaker with 20-hour battery life',
    price: 79.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/373632/pexels-photo-373632.jpeg'],
    stock: 63,
    ratings: 4.6,
    reviewCount: 158,
    vendorId: '123456',
    createdAt: new Date('2023-02-12'),
    updatedAt: new Date('2023-03-15'),
    isPublished: true,
    tags: ['audio', 'wireless', 'portable']
  },
  {
    id: '5',
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with USB charging port',
    price: 59.99,
    category: 'Accessories',
    images: ['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'],
    stock: 95,
    ratings: 4.4,
    reviewCount: 86,
    vendorId: '123456',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-03-12'),
    isPublished: true,
    tags: ['travel', 'accessories']
  },
  {
    id: '6',
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad for smartphones',
    price: 29.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/4526540/pexels-photo-4526540.jpeg'],
    stock: 74,
    ratings: 4.3,
    reviewCount: 112,
    vendorId: '123456',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-18'),
    isPublished: true,
    tags: ['charging', 'wireless']
  }
];

// This would be connected to your API in a real app
export const productsService = {
  async fetchProducts(): Promise<Product[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 1000);
    });
  },
  
  async getProductById(id: string): Promise<Product | undefined> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 800);
    });
  },
  
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...product,
          id: `${mockProducts.length + 1}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          ratings: 0,
          reviewCount: 0,
        };
        
        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 1000);
    });
  },
  
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          mockProducts[index] = {
            ...mockProducts[index],
            ...product,
            updatedAt: new Date(),
          };
          resolve(mockProducts[index]);
        } else {
          reject(new Error('Product not found'));
        }
      }, 1000);
    });
  },
  
  async deleteProduct(id: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          mockProducts.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Product not found'));
        }
      }, 800);
    });
  }
};