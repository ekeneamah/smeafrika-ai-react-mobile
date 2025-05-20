import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Submit review
router.post('/reviews', authenticate, async (req: AuthRequest, res) => {
  try {
    const reviewData = {
      ...req.body,
      userId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const reviewRef = await admin.firestore()
      .collection('reviews')
      .add(reviewData);

    res.status(201).json({
      id: reviewRef.id,
      ...reviewData
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get product reviews
router.get('/reviews/:productId', async (req, res) => {
  try {
    const reviewsSnapshot = await admin.firestore()
      .collection('reviews')
      .where('productId', '==', req.params.productId)
      .orderBy('createdAt', 'desc')
      .get();

    const reviews = reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export const reviewRoutes = router;