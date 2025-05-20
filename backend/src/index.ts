import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as rateLimit from 'firebase-functions-rate-limiter';

import { authRoutes } from './routes/auth';
import { productRoutes } from './routes/products';
import { mediaRoutes } from './routes/media';
import { analyticsRoutes } from './routes/analytics';
import { bookingRoutes } from './routes/bookings';
import { integrationRoutes } from './routes/integrations';
import { reviewRoutes } from './routes/reviews';
import { articleRoutes } from './routes/articles';
import { expenseRoutes } from './routes/expenses';
import { reminderService } from './services/reminderService';

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();

// Rate limiter
const limiter = rateLimit.withFirestoreBackend({
  name: 'api_rate_limiter',
  maxCalls: 100,
  periodSeconds: 60,
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await limiter.rejectOnQuotaExceededOrRecordCall();
    next();
  } catch (error) {
    res.status(429).json({ error: 'Too many requests' });
  }
});

// API Routes
app.use('/v1/api', authRoutes);
app.use('/v1/api', productRoutes);
app.use('/v1/api', mediaRoutes);
app.use('/v1/api', analyticsRoutes);
app.use('/v1/api', bookingRoutes);
app.use('/v1/api', integrationRoutes);
app.use('/v1/api', reviewRoutes);
app.use('/v1/api', articleRoutes);
app.use('/v1/api', expenseRoutes);

// Export the API to Firebase Functions
export const api = functions.https.onRequest(app);

// Schedule reminder processing
export const processReminders = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async () => {
    await reminderService.processReminders();
  });

// Handle low stock notifications
export const checkLowStock = functions.firestore
  .document('products/{productId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();
    
    if (newData.stock < newData.lowStockThreshold && 
        oldData.stock >= oldData.lowStockThreshold) {
      await reminderService.scheduleReminder(
        newData.vendorId,
        'lowStock',
        {
          productId: context.params.productId,
          productName: newData.name,
          currentStock: newData.stock,
          sendEmail: true
        },
        new Date()
      );
    }
  });