import * as admin from 'firebase-admin';
import { AnalyticsData } from '../types/analytics';

export const analyticsService = {
  async generateInsights(vendorId: string) {
    try {
      // Get sales data
      const salesSnapshot = await admin.firestore()
        .collection('orders')
        .where('vendorId', '==', vendorId)
        .get();

      // Get customer data
      const customersSnapshot = await admin.firestore()
        .collection('customers')
        .where('vendorId', '==', vendorId)
        .get();

      // Calculate insights
      const totalSales = salesSnapshot.docs.reduce((sum, doc) => sum + doc.data().total, 0);
      const customerCount = customersSnapshot.size;
      const averageOrderValue = totalSales / salesSnapshot.size;

      // Generate recommendations
      const recommendations = [];
      if (averageOrderValue < 100) {
        recommendations.push('Consider bundling products to increase average order value');
      }

      return {
        metrics: {
          totalSales,
          customerCount,
          averageOrderValue
        },
        recommendations
      };
    } catch (error) {
      console.error('Error generating insights:', error);
      throw error;
    }
  }
};