import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Get analytics summary
router.get('/analytics/summary', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const { timeframe = 'week' } = req.query;
    
    // Get products data
    const products = await admin.firestore()
      .collection('products')
      .where('vendorId', '==', req.user?.uid)
      .get();

    // Get orders data
    const orders = await admin.firestore()
      .collection('orders')
      .where('vendorId', '==', req.user?.uid)
      .get();

    // Calculate metrics
    const totalProducts = products.size;
    const totalOrders = orders.size;
    const totalRevenue = orders.docs.reduce((sum, order) => 
      sum + (order.data().totalAmount || 0), 0);

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get product analytics
router.get('/analytics/products/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const productId = req.params.id;
    
    // Get product orders
    const orders = await admin.firestore()
      .collection('orders')
      .where('productId', '==', productId)
      .where('vendorId', '==', req.user?.uid)
      .get();

    // Get product reviews
    const reviews = await admin.firestore()
      .collection('reviews')
      .where('productId', '==', productId)
      .get();

    const totalSales = orders.size;
    const totalRevenue = orders.docs.reduce((sum, order) => 
      sum + (order.data().totalAmount || 0), 0);
    const averageRating = reviews.docs.reduce((sum, review) => 
      sum + (review.data().rating || 0), 0) / (reviews.size || 1);

    res.json({
      totalSales,
      totalRevenue,
      averageRating,
      reviewCount: reviews.size
    });
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    res.status(500).json({ error: 'Failed to fetch product analytics' });
  }
});

export const analyticsRoutes = router;