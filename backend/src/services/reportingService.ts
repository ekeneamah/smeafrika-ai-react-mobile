import * as admin from 'firebase-admin';
import { format } from 'date-fns';

export const reportingService = {
  async generateSalesReport(vendorId: string, startDate: Date, endDate: Date) {
    try {
      const salesSnapshot = await admin.firestore()
        .collection('orders')
        .where('vendorId', '==', vendorId)
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .get();

      const sales = salesSnapshot.docs.map(doc => doc.data());

      // Calculate metrics
      const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
      const averageOrderValue = totalSales / sales.length;
      const salesByProduct = sales.reduce((acc, sale) => {
        sale.products.forEach(product => {
          acc[product.id] = (acc[product.id] || 0) + product.quantity;
        });
        return acc;
      }, {});

      return {
        period: {
          start: format(startDate, 'yyyy-MM-dd'),
          end: format(endDate, 'yyyy-MM-dd')
        },
        metrics: {
          totalSales,
          orderCount: sales.length,
          averageOrderValue
        },
        salesByProduct
      };
    } catch (error) {
      console.error('Error generating sales report:', error);
      throw error;
    }
  },

  async generateFinancialReport(vendorId: string, month: Date) {
    try {
      // Get sales
      const salesSnapshot = await admin.firestore()
        .collection('orders')
        .where('vendorId', '==', vendorId)
        .where('createdAt', '>=', new Date(month.getFullYear(), month.getMonth(), 1))
        .where('createdAt', '<', new Date(month.getFullYear(), month.getMonth() + 1, 1))
        .get();

      // Get expenses
      const expensesSnapshot = await admin.firestore()
        .collection('expenses')
        .where('vendorId', '==', vendorId)
        .where('date', '>=', new Date(month.getFullYear(), month.getMonth(), 1))
        .where('date', '<', new Date(month.getFullYear(), month.getMonth() + 1, 1))
        .get();

      const totalSales = salesSnapshot.docs.reduce((sum, doc) => sum + doc.data().total, 0);
      const totalExpenses = expensesSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
      const netIncome = totalSales - totalExpenses;

      return {
        month: format(month, 'MMMM yyyy'),
        metrics: {
          totalSales,
          totalExpenses,
          netIncome,
          profitMargin: (netIncome / totalSales) * 100
        },
        expensesByCategory: expensesSnapshot.docs.reduce((acc, doc) => {
          const expense = doc.data();
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error generating financial report:', error);
      throw error;
    }
  }
};