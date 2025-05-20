import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from '../types/email';

const transporter = nodemailer.createTransport({
  // Configure your email service
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const emailService = {
  async sendEmail(to: string, template: EmailTemplate, data: any) {
    const templates = {
      welcome: {
        subject: 'Welcome to Vendor App!',
        html: `<h1>Welcome ${data.name}!</h1>
               <p>Thank you for joining Vendor App. Get started by...</p>`
      },
      bookingConfirmation: {
        subject: 'Booking Confirmation',
        html: `<h1>Booking Confirmed</h1>
               <p>Your booking for ${data.service} on ${data.date} has been confirmed.</p>`
      },
      lowStock: {
        subject: 'Low Stock Alert',
        html: `<h1>Low Stock Alert</h1>
               <p>Product ${data.productName} is running low (${data.currentStock} remaining)</p>`
      },
      expenseReport: {
        subject: 'Monthly Expense Report',
        html: `<h1>Expense Report - ${data.month}</h1>
               <p>Total Expenses: ${data.total}</p>
               <p>View detailed report in the app.</p>`
      }
    };

    const emailContent = templates[template];
    
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: emailContent.subject,
        html: emailContent.html
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};