import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all products for a vendor
router.get('/products', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const products = await admin.firestore()
      .collection('products')
      .where('vendorId', '==', req.user?.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const productList = products.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(productList);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/products/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const productDoc = await admin.firestore()
      .collection('products')
      .doc(req.params.id)
      .get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (productDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: productDoc.id,
      ...productDoc.data()
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product
router.post('/products', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const productData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const productRef = await admin.firestore()
      .collection('products')
      .add(productData);

    res.status(201).json({
      id: productRef.id,
      ...productData
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/products/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const productRef = admin.firestore().collection('products').doc(req.params.id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (productDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await productRef.update(updateData);

    res.json({
      id: productRef.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const productRef = admin.firestore().collection('products').doc(req.params.id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (productDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await productRef.delete();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export const productRoutes = router;