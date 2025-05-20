import * as admin from 'firebase-admin';
import { emailService } from './emailService';
import { notificationService } from './notificationService';

export const customerService = {
  async getCustomerSegments(vendorId: string) {
    try {
      const customersSnapshot = await admin.firestore()
        .collection('customers')
        .where('vendorId', '==', vendorId)
        .get();

      const customers = customersSnapshot.docs.map(doc => doc.data());

      // Segment customers by purchase behavior
      const segments = {
        vip: customers.filter(c => c.totalSpent > 1000),
        regular: customers.filter(c => c.totalSpent > 500 && c.totalSpent <= 1000),
        occasional: customers.filter(c => c.totalSpent <= 500)
      };

      return segments;
    } catch (error) {
      console.error('Error getting customer segments:', error);
      throw error;
    }
  },

  async sendCustomerFeedbackRequest(customerId: string, orderId: string) {
    try {
      const customerDoc = await admin.firestore()
        .collection('customers')
        .doc(customerId)
        .get();

      if (!customerDoc.exists) throw new Error('Customer not found');

      // Send email
      await emailService.sendEmail(
        customerDoc.data().email,
        'feedbackRequest',
        { orderId }
      );

      // Send push notification if available
      if (customerDoc.data().fcmToken) {
        await notificationService.sendPushNotification(
          customerId,
          'feedbackRequest',
          { orderId }
        );
      }
    } catch (error) {
      console.error('Error sending feedback request:', error);
      throw error;
    }
  },

  async updateCustomerLifetimeValue(customerId: string) {
    try {
      const ordersSnapshot = await admin.firestore()
        .collection('orders')
        .where('customerId', '==', customerId)
        .get();

      const totalSpent = ordersSnapshot.docs.reduce(
        (sum, doc) => sum + doc.data().total,
        0
      );

      await admin.firestore()
        .collection('customers')
        .doc(customerId)
        .update({
          totalSpent,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
      console.error('Error updating customer lifetime value:', error);
      throw error;
    }
  }
};