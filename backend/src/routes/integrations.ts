import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Connect integration
router.post('/integrations', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const integrationData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const integrationRef = await admin.firestore()
      .collection('integrations')
      .add(integrationData);

    res.status(201).json({
      id: integrationRef.id,
      ...integrationData
    });
  } catch (error) {
    console.error('Error creating integration:', error);
    res.status(500).json({ error: 'Failed to create integration' });
  }
});

// List integrations
router.get('/integrations', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const integrationsSnapshot = await admin.firestore()
      .collection('integrations')
      .where('vendorId', '==', req.user?.uid)
      .get();

    const integrations = integrationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(integrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ error: 'Failed to fetch integrations' });
  }
});

// Get integration details
router.get('/integrations/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const integrationDoc = await admin.firestore()
      .collection('integrations')
      .doc(req.params.id)
      .get();

    if (!integrationDoc.exists) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    if (integrationDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: integrationDoc.id,
      ...integrationDoc.data()
    });
  } catch (error) {
    console.error('Error fetching integration:', error);
    res.status(500).json({ error: 'Failed to fetch integration' });
  }
});

// Update integration
router.put('/integrations/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const integrationRef = admin.firestore().collection('integrations').doc(req.params.id);
    const integrationDoc = await integrationRef.get();

    if (!integrationDoc.exists) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    if (integrationDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await integrationRef.update(updateData);

    res.json({
      id: integrationRef.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating integration:', error);
    res.status(500).json({ error: 'Failed to update integration' });
  }
});

// Delete integration
router.delete('/integrations/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const integrationRef = admin.firestore().collection('integrations').doc(req.params.id);
    const integrationDoc = await integrationRef.get();

    if (!integrationDoc.exists) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    if (integrationDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await integrationRef.delete();

    res.json({ message: 'Integration deleted successfully' });
  } catch (error) {
    console.error('Error deleting integration:', error);
    res.status(500).json({ error: 'Failed to delete integration' });
  }
});

export const integrationRoutes = router;