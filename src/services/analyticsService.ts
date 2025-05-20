import { AnalyticsData, AnalyticsFilter } from '../types/Analytics';

// This would be connected to your API in a real app
export const analyticsService = {

    fetchSupplierAnalytics: async (supplierId: string, timeRange: string) => {
    // Replace this with actual API call if needed
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          totalOrders: 25,
          totalValue: 45250,
          avgOrderValue: 1810,
          activeOrders: 8,
          onTimeDeliveryRate: 98,
          qualityRating: 4.8,
          responseTime: 85,
          topProducts: [
            { name: 'Wireless Earbuds', totalValue: 12500, units: 250 },
            { name: 'Smart Watches', totalValue: 10000, units: 100 },
            { name: 'Bluetooth Speakers', totalValue: 8000, units: 100 },
          ],
          issues: {
            quality: 3,
            lateDeliveries: 2,
            returnRate: 1.2,
            returnValue: 520,
          },
        });
      }, 1000)
    );
  },

  async fetchAnalyticsData(filter: AnalyticsFilter) {
    // Simulate API call
    return new Promise<{
      salesData: AnalyticsData;
      revenueData: AnalyticsData;
      trafficData: AnalyticsData;
    }>((resolve) => {
      setTimeout(() => {
        // Generate labels based on the date range
        let labels: string[];
        switch (filter.dateRange) {
          case 'day':
            labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
            break;
          case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
          case 'month':
            labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
            break;
          case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
          default:
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        }
        
        // Generate random data for each metric
        const generateRandomData = () => labels.map(() => Math.floor(Math.random() * 100));
        
        const salesData: AnalyticsData = {
          labels,
          datasets: [
            {
              label: 'Sales',
              data: generateRandomData(),
              backgroundColor: '#228B22',
            }
          ]
        };
        
        const revenueData: AnalyticsData = {
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: generateRandomData().map(val => val * 10), // Higher values for revenue
              backgroundColor: '#2E8B57',
            }
          ]
        };
        
        const trafficData: AnalyticsData = {
          labels,
          datasets: [
            {
              label: 'Visitors',
              data: generateRandomData().map(val => val * 2), // Different scale
              backgroundColor: '#6B8E23',
            }
          ]
        };
        
        resolve({
          salesData,
          revenueData,
          trafficData
        });
      }, 1500);
    });
  }
};