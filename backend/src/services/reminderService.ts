import * as admin from 'firebase-admin';
import { emailService } from './emailService';
import { notificationService } from './notificationService';

export const reminderService = {
  async scheduleReminder(userId: string, type: string, data: any, scheduledTime: Date) {
    try {
      await admin.firestore().collection('reminders').add({
        userId,
        type,
        data,
        scheduledTime,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      throw error;
    }
  },

  async processReminders() {
    const now = new Date();
    
    const remindersSnapshot = await admin.firestore()
      .collection('reminders')
      .where('status', '==', 'pending')
      .where('scheduledTime', '<=', now)
      .get();

    const batch = admin.firestore().batch();

    for (const doc of remindersSnapshot.docs) {
      const reminder = doc.data();
      
      try {
        // Send notification
        await notificationService.sendPushNotification(
          reminder.userId,
          reminder.type,
          reminder.data
        );

        // Send email if configured
        if (reminder.data.sendEmail) {
          const userDoc = await admin.firestore()
            .collection('users')
            .doc(reminder.userId)
            .get();
          
          await emailService.sendEmail(
            userDoc.data()?.email,
            reminder.type,
            reminder.data
          );
        }

        // Mark reminder as processed
        batch.update(doc.ref, { 
          status: 'completed',
          processedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        console.error('Error processing reminder:', error);
        batch.update(doc.ref, { 
          status: 'failed',
          error: error.message,
          processedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    await batch.commit();
  }
};