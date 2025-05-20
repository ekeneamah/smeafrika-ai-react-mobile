import { Router } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { validateSignup } from '../validators/auth';

const router = Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { error, value } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, name, storeName } = value;

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Create user document in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      name,
      storeName,
      role: 'vendor',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Create custom token
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // This would typically be handled by Firebase Authentication client-side
    // Here we're just verifying the user exists
    const userRecord = await admin.auth().getUserByEmail(email);
    
    // Create custom token
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    await admin.auth().generatePasswordResetLink(email);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(400).json({ error: 'Failed to send reset email' });
  }
});

export const authRoutes = router;