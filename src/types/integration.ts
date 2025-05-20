export type Platform = 'amazon' | 'ebay' | 'alibaba' | 'walmart';

export interface Integration {
  id: string;
  platform: Platform;
  name: string;
  status: 'active' | 'inactive' | 'error';
  credentials: {
    apiKey: string;
    secretKey: string;
    accessToken?: string;
    refreshToken?: string;
  };
  settings: {
    autoSync: boolean;
    syncInterval: number;
    defaultCategory?: string;
    defaultShipping?: string;
  };
  lastSync?: string;
  error?: string;
}

export interface SyncStatus {
  id: string;
  integrationId: string;
  productId: string;
  platform: Platform;
  status: 'pending' | 'synced' | 'failed';
  lastSync: string;
  error?: string;
} 