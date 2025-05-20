import * as admin from 'firebase-admin';
import { notificationService } from './notificationService';

export const inventoryService = {
  async trackInventory(vendorId: string, productId: string) {
    try {
      const productDoc = await admin.firestore()
        .collection('products')
        .doc(productId)
        .get();

      if (!productDoc.exists) throw new Error('Product not found');

      const product = productDoc.data();
      
      // Check low stock
      if (product.stock <= product.lowStockThreshold) {
        await notificationService.sendPushNotification(
          vendorId,
          'lowStock',
          {
            productId,
            productName: product.name,
            currentStock: product.stock
          }
        );
      }

      // Track inventory changes
      await admin.firestore()
        .collection('inventoryLogs')
        .add({
          vendorId,
          productId,
          stock: product.stock,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
      console.error('Error tracking inventory:', error);
      throw error;
    }
  },

  async generateRestockReport(vendorId: string) {
    try {
      const productsSnapshot = await admin.firestore()
        .collection('products')
        .where('vendorId', '==', vendorId)
        .where('stock', '<=', 'lowStockThreshold')
        .get();

      return productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error generating restock report:', error);
      throw error;
    }
  }
};