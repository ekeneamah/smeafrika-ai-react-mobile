import { User } from '../store/slices/authSlice';

// This would be connected to your API in a real app
export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo, we'll accept any non-empty email and password
        if (email && password) {
          const user: User = {
            id: '123456',
            email: email,
            name: 'Sample Vendor',
            storeName: 'Demo Store',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          };
          
          // In a real app, we would save auth token to secure storage
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },
  
  async register(email: string, password: string, name: string, storeName: string): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name && storeName) {
          const user: User = {
            id: '123456',
            email: email,
            name: name,
            storeName: storeName,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          };
          
          resolve(user);
        } else {
          reject(new Error('Please fill all required fields'));
        }
      }, 1000);
    });
  },
  
  async logout(): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would clear auth token from secure storage
        resolve();
      }, 500);
    });
  },
  
  async forgotPassword(email: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email) {
          resolve();
        } else {
          reject(new Error('Please provide a valid email'));
        }
      }, 1000);
    });
  },
  
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && newPassword) {
          resolve();
        } else {
          reject(new Error('Invalid token or password'));
        }
      }, 1000);
    });
  },
  
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword && newPassword) {
          resolve();
        } else {
          reject(new Error('Please provide both current and new passwords'));
        }
      }, 1000);
    });
  }
};