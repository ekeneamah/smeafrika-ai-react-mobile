import { Calendar } from '@nativescript/calendar';
import { NotificationService } from './notificationService';

export class ReminderService {
  static async addToCalendar(title: string, startDate: Date, endDate: Date, notes?: string) {
    const calendar = new Calendar();
    
    const event = {
      title,
      startDate,
      endDate,
      notes,
      location: '',
      url: ''
    };

    try {
      await calendar.createEvent(event);
      
      // Schedule local notification
      await NotificationService.scheduleLocalNotification(
        title,
        notes || '',
        new Date(startDate.getTime() - 30 * 60000) // 30 minutes before
      );
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  static async removeFromCalendar(eventId: string) {
    const calendar = new Calendar();
    await calendar.deleteEvent(eventId);
  }
}