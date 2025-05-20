import { LocalNotifications } from '@nativescript/local-notifications';
import { PushNotifications } from '@nativescript/push-notifications';
import { Application } from '@nativescript/core';

export class NotificationService {
  static async initialize() {
    // Request permissions
    await LocalNotifications.requestPermission();
    
    // Initialize push notifications
    PushNotifications.register({
      onPushTokenReceived: (token: string) => {
        console.log('Firebase FCM Token:', token);
        // Save token to backend
      },
      onMessageReceived: (message: any) => {
        console.log('Push Message Received:', message);
        this.handlePushNotification(message);
      },
      showNotifications: true,
      showNotificationsWhenInForeground: true
    });
  }

  static async scheduleLocalNotification(title: string, body: string, at: Date) {
    await LocalNotifications.schedule([{
      id: Math.random() * 10000,
      title,
      body,
      at,
      forceShowWhenInForeground: true
    }]);
  }

  static async cancelAllNotifications() {
    await LocalNotifications.cancel();
  }

  private static handlePushNotification(message: any) {
    // Handle different notification types
    switch (message.data.type) {
      case 'newBooking':
        // Navigate to booking details
        break;
      case 'lowStock':
        // Navigate to inventory
        break;
      case 'expenseReminder':
        // Navigate to expenses
        break;
      case 'reviewAlert':
        // Navigate to reviews
        break;
    }
  }
}