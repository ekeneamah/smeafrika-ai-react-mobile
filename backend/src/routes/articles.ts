import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Add article
router.post('/articles', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const articleData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const articleRef = await admin.firestore()
      .collection('articles')
      .add(articleData);

    res.status(201).json({
      id: articleRef.id,
      ...articleData
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// List articles
router.get('/articles', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const articlesSnapshot = await admin.firestore()
      .collection('articles')
      .where('vendorId', '==', req.user?.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const articles = articlesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get specific article
router.get('/articles/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const articleDoc = await admin.firestore()
      .collection('articles')
      .doc(req.params.id)
      .get();

    if (!articleDoc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (articleDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: articleDoc.id,
      ...articleDoc.data()
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update article
router.put('/articles/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const articleRef = admin.firestore().collection('articles').doc(req.params.id);
    const articleDoc = await articleRef.get();

    if (!articleDoc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (articleDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await articleRef.update(updateData);

    res.json({
      id: articleRef.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article
router.delete('/articles/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const articleRef = admin.firestore().collection('articles').doc(req.params.id);
    const articleDoc = await articleRef.get();

    if (!articleDoc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (articleDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await articleRef.delete();

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export const articleRoutes = router;