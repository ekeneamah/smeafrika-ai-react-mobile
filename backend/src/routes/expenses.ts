import { Router } from 'express';
import * as admin from 'firebase-admin';
import { authenticate, isVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Add expense
router.post('/expenses', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expenseData = {
      ...req.body,
      vendorId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const expenseRef = await admin.firestore()
      .collection('expenses')
      .add(expenseData);

    res.status(201).json({
      id: expenseRef.id,
      ...expenseData
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// List expenses
router.get('/expenses', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expensesSnapshot = await admin.firestore()
      .collection('expenses')
      .where('vendorId', '==', req.user?.uid)
      .orderBy('date', 'desc')
      .get();

    const expenses = expensesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get specific expense
router.get('/expenses/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expenseDoc = await admin.firestore()
      .collection('expenses')
      .doc(req.params.id)
      .get();

    if (!expenseDoc.exists) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (expenseDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      id: expenseDoc.id,
      ...expenseDoc.data()
    });
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// Update expense
router.put('/expenses/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expenseRef = admin.firestore().collection('expenses').doc(req.params.id);
    const expenseDoc = await expenseRef.get();

    if (!expenseDoc.exists) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (expenseDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await expenseRef.update(updateData);

    res.json({
      id: expenseRef.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete expense
router.delete('/expenses/:id', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expenseRef = admin.firestore().collection('expenses').doc(req.params.id);
    const expenseDoc = await expenseRef.get();

    if (!expenseDoc.exists) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (expenseDoc.data()?.vendorId !== req.user?.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await expenseRef.delete();

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Get expense summary
router.get('/expenses/summary', authenticate, isVendor, async (req: AuthRequest, res) => {
  try {
    const expensesSnapshot = await admin.firestore()
      .collection('expenses')
      .where('vendorId', '==', req.user?.uid)
      .get();

    const expenses = expensesSnapshot.docs.map(doc => doc.data());
    
    // Calculate summary statistics
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json({
      total,
      byCategory,
      count: expenses.length
    });
  } catch (error) {
    console.error('Error fetching expense summary:', error);
    res.status(500).json({ error: 'Failed to fetch expense summary' });
  }
});

export const expenseRoutes = router;