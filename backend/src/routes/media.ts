import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all media for a vendor
router.get('/media', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const media = await admin.firestore()
      .collection('media')
      .where('vendorId', '==', req.user?.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const mediaList = media.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(mediaList);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Get single media item
router.get('/media/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const mediaDoc = await admin.firestore()
      .collection('media')
      .doc(req.params.id)
      .get();

    if (!mediaDoc.exists) {
      return res.status(404).json({ error: 'Media not found' });
    }

    if (mediaDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: mediaDoc.id,
      ...mediaDoc.data()
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Create media entry
router.post('/media', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const mediaData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const mediaRef = await admin.firestore()
      .collection('media')
      .add(mediaData);

    res.status(201).json({
      id: mediaRef.id,
      ...mediaData
    });
  } catch (error) {
    console.error('Error creating media:', error);
    res.status(500).json({ error: 'Failed to create media entry' });
  }
});

// Delete media
router.delete('/media/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const mediaRef = admin.firestore().collection('media').doc(req.params.id);
    const mediaDoc = await mediaRef.get();

    if (!mediaDoc.exists) {
      return res.status(404).json({ error: 'Media not found' });
    }

    if (mediaDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await mediaRef.delete();

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

export const mediaRoutes = router;