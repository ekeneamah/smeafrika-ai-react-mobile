import * as admin from 'firebase-admin';

export const integrationService = {
  async syncPlatformData(vendorId: string, platform: string, data: any) {
    try {
      const batch = admin.firestore().batch();

      // Sync products
      if (data.products) {
        for (const product of data.products) {
          const productRef = admin.firestore()
            .collection('products')
            .doc(product.externalId);

          batch.set(productRef, {
            ...product,
            vendorId,
            platform,
            lastSynced: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
      }

      // Sync orders
      if (data.orders) {
        for (const order of data.orders) {
          const orderRef = admin.firestore()
            .collection('orders')
            .doc(order.externalId);

          batch.set(orderRef, {
            ...order,
            vendorId,
            platform,
            lastSynced: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
      }

      // Sync inventory
      if (data.inventory) {
        for (const item of data.inventory) {
          const productRef = admin.firestore()
            .collection('products')
            .doc(item.productId);

          batch.update(productRef, {
            stock: item.quantity,
            lastStockSync: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      }

      await batch.commit();

      // Record sync event
      await admin.firestore()
        .collection('syncLogs')
        .add({
          vendorId,
          platform,
          dataTypes: Object.keys(data),
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          status: 'success'
        });
    } catch (error) {
      console.error('Error syncing platform data:', error);
      
      // Record sync failure
      await admin.firestore()
        .collection('syncLogs')
        .add({
          vendorId,
          platform,
          dataTypes: Object.keys(data),
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          status: 'failed',
          error: error.message
        });

      throw error;
    }
  },

  async getIntegrationStatus(vendorId: string, platform: string) {
    try {
      const logsSnapshot = await admin.firestore()
        .collection('syncLogs')
        .where('vendorId', '==', vendorId)
        .where('platform', '==', platform)
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get();

      if (logsSnapshot.empty) {
        return {
          status: 'never_synced',
          lastSync: null
        };
      }

      const lastLog = logsSnapshot.docs[0].data();
      return {
        status: lastLog.status,
        lastSync: lastLog.timestamp,
        error: lastLog.error
      };
    } catch (error) {
      console.error('Error getting integration status:', error);
      throw error;
    }
  }
};