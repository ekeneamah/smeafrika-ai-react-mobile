import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Create booking
router.post('/bookings', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const bookingData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const bookingRef = await admin.firestore()
      .collection('bookings')
      .add(bookingData);

    res.status(201).json({
      id: bookingRef.id,
      ...bookingData
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get all bookings
router.get('/bookings', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const bookingsSnapshot = await admin.firestore()
      .collection('bookings')
      .where('vendorId', '==', req.user?.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get single booking
router.get('/bookings/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const bookingDoc = await admin.firestore()
      .collection('bookings')
      .doc(req.params.id)
      .get();

    if (!bookingDoc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (bookingDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: bookingDoc.id,
      ...bookingDoc.data()
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update booking
router.put('/bookings/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const bookingRef = admin.firestore().collection('bookings').doc(req.params.id);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (bookingDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await bookingRef.update(updateData);

    res.json({
      id: bookingRef.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking
router.delete('/bookings/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const bookingRef = admin.firestore().collection('bookings').doc(req.params.id);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (bookingDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await bookingRef.delete();

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

export const bookingRoutes = router;