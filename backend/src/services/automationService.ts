import * as admin from 'firebase-admin';
import { emailService } from './emailService';
import { notificationService } from './notificationService';
import { reminderService } from './reminderService';

export const automationService = {
  async setupAutomatedTasks(vendorId: string, tasks: any[]) {
    try {
      const batch = admin.firestore().batch();

      tasks.forEach(task => {
        const taskRef = admin.firestore().collection('automatedTasks').doc();
        batch.set(taskRef, {
          ...task,
          vendorId,
          status: 'active',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error setting up automated tasks:', error);
      throw error;
    }
  },

  async processAutomatedTasks() {
    try {
      const tasksSnapshot = await admin.firestore()
        .collection('automatedTasks')
        .where('status', '==', 'active')
        .get();

      for (const doc of tasksSnapshot.docs) {
        const task = doc.data();

        switch (task.type) {
          case 'stockCheck':
            await this.processStockCheck(task);
            break;
          case 'customerFollowup':
            await this.processCustomerFollowup(task);
            break;
          case 'reportGeneration':
            await this.processReportGeneration(task);
            break;
        }
      }
    } catch (error) {
      console.error('Error processing automated tasks:', error);
      throw error;
    }
  },

  private async processStockCheck(task: any) {
    const productsSnapshot = await admin.firestore()
      .collection('products')
      .where('vendorId', '==', task.vendorId)
      .where('stock', '<=', 'lowStockThreshold')
      .get();

    if (productsSnapshot.size > 0) {
      await notificationService.sendPushNotification(
        task.vendorId,
        'lowStock',
        {
          productCount: productsSnapshot.size,
          products: productsSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            stock: doc.data().stock
          }))
        }
      );
    }
  },

  private async processCustomerFollowup(task: any) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - task.daysThreshold);

    const customersSnapshot = await admin.firestore()
      .collection('customers')
      .where('vendorId', '==', task.vendorId)
      .where('lastPurchase', '<=', cutoffDate)
      .get();

    for (const doc of customersSnapshot.docs) {
      const customer = doc.data();
      await emailService.sendEmail(
        customer.email,
        'customerFollowup',
        { customerName: customer.name }
      );
    }
  },

  private async processReportGeneration(task: any) {
    const now = new Date();
    const reportData = {
      vendorId: task.vendorId,
      type: task.reportType,
      date: now,
      // Add report-specific data
    };

    await admin.firestore()
      .collection('reports')
      .add({
        ...reportData,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

    await reminderService.scheduleReminder(
      task.vendorId,
      'reportReady',
      reportData,
      now
    );
  }
};