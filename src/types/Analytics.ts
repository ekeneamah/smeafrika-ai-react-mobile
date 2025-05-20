export interface AnalyticsData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface AnalyticsFilter {
  dateRange: 'day' | 'week' | 'month' | 'year';
  category?: string;
  productId?: string;
}

export interface SalesMetrics {
  totalSales: number;
  salesGrowth: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
  topCategories: {
    name: string;
    sales: number;
  }[];
}

export interface TrafficMetrics {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  averageSessionDuration: number;
  trafficSources: {
    source: string;
    percentage: number;
  }[];
}