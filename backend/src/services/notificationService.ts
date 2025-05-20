import * as admin from 'firebase-admin';
import { NotificationType } from '../types/notification';

export const notificationService = {
  async sendPushNotification(userId: string, type: NotificationType, data: any) {
    try {
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      const fcmToken = userDoc.data()?.fcmToken;

      if (!fcmToken) return;

      const notifications = {
        newBooking: {
          title: 'New Booking',
          body: `New booking received for ${data.service}`,
        },
        lowStock: {
          title: 'Low Stock Alert',
          body: `${data.productName} is running low on stock`,
        },
        expenseReminder: {
          title: 'Expense Reminder',
          body: 'Remember to log your expenses for today',
        },
        reviewAlert: {
          title: 'New Review',
          body: `New review received for ${data.productName}`,
        }
      };

      const notification = notifications[type];

      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: notification.title,
          body: notification.body
        },
        data: {
          type,
          ...data
        }
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
};