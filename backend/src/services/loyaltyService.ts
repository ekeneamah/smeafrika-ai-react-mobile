import * as admin from 'firebase-admin';
import { emailService } from './emailService';
import { notificationService } from './notificationService';

export const loyaltyService = {
  async calculatePoints(orderId: string) {
    try {
      const orderDoc = await admin.firestore()
        .collection('orders')
        .doc(orderId)
        .get();

      if (!orderDoc.exists) throw new Error('Order not found');

      const order = orderDoc.data();
      const points = Math.floor(order.total * 10); // 10 points per dollar

      await admin.firestore()
        .collection('loyaltyPoints')
        .add({
          customerId: order.customerId,
          orderId,
          points,
          type: 'earned',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      // Update customer total points
      await admin.firestore()
        .collection('customers')
        .doc(order.customerId)
        .update({
          totalPoints: admin.firestore.FieldValue.increment(points)
        });

      // Notify customer
      await notificationService.sendPushNotification(
        order.customerId,
        'pointsEarned',
        { points }
      );
    } catch (error) {
      console.error('Error calculating loyalty points:', error);
      throw error;
    }
  },

  async createReward(vendorId: string, reward: any) {
    try {
      const rewardRef = await admin.firestore()
        .collection('rewards')
        .add({
          ...reward,
          vendorId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      return {
        id: rewardRef.id,
        ...reward
      };
    } catch (error) {
      console.error('Error creating reward:', error);
      throw error;
    }
  },

  async redeemReward(customerId: string, rewardId: string) {
    try {
      const batch = admin.firestore().batch();

      const rewardDoc = await admin.firestore()
        .collection('rewards')
        .doc(rewardId)
        .get();

      if (!rewardDoc.exists) throw new Error('Reward not found');

      const customerDoc = await admin.firestore()
        .collection('customers')
        .doc(customerId)
        .get();

      if (!customerDoc.exists) throw new Error('Customer not found');

      const reward = rewardDoc.data();
      const customer = customerDoc.data();

      if (customer.totalPoints < reward.pointsCost) {
        throw new Error('Insufficient points');
      }

      // Deduct points
      batch.update(customerDoc.ref, {
        totalPoints: admin.firestore.FieldValue.increment(-reward.pointsCost)
      });

      // Record redemption
      const redemptionRef = admin.firestore().collection('redemptions').doc();
      batch.set(redemptionRef, {
        customerId,
        rewardId,
        pointsCost: reward.pointsCost,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      await batch.commit();

      // Send confirmation
      await emailService.sendEmail(
        customer.email,
        'rewardRedeemed',
        { reward }
      );
    } catch (error) {
      console.error('Error redeeming reward:', error);
      throw error;
    }
  }
};