import * as admin from 'firebase-admin';
import { emailService } from './emailService';

export const marketingService = {
  async createCampaign(vendorId: string, campaign: any) {
    try {
      const campaignRef = await admin.firestore()
        .collection('campaigns')
        .add({
          ...campaign,
          vendorId,
          status: 'draft',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      return {
        id: campaignRef.id,
        ...campaign
      };
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },

  async sendPromotionalEmail(vendorId: string, customerId: string, template: string, data: any) {
    try {
      const customerDoc = await admin.firestore()
        .collection('customers')
        .doc(customerId)
        .get();

      if (!customerDoc.exists) throw new Error('Customer not found');

      await emailService.sendEmail(
        customerDoc.data().email,
        template,
        data
      );
    } catch (error) {
      console.error('Error sending promotional email:', error);
      throw error;
    }
  }
};