import { Integration, Platform, SyncStatus } from '../types/integration';

const API_URL = 'https://api.example.com/integrations';

export const integrationService = {
  async getIntegrations(): Promise<Integration[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch integrations');
    return response.json();
  },

  async getIntegrationById(id: string): Promise<Integration> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch integration');
    return response.json();
  },

  async createIntegration(integrationData: Partial<Integration>): Promise<Integration> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(integrationData)
    });
    if (!response.ok) throw new Error('Failed to create integration');
    return response.json();
  },

  async updateIntegration(id: string, integrationData: Partial<Integration>): Promise<Integration> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(integrationData)
    });
    if (!response.ok) throw new Error('Failed to update integration');
    return response.json();
  },

  async deleteIntegration(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete integration');
  },

  async syncProduct(integrationId: string, productId: string): Promise<SyncStatus> {
    const response = await fetch(`${API_URL}/${integrationId}/sync/${productId}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to sync product');
    return response.json();
  },

  async getSyncStatus(integrationId: string): Promise<SyncStatus[]> {
    const response = await fetch(`${API_URL}/${integrationId}/sync-status`);
    if (!response.ok) throw new Error('Failed to fetch sync status');
    return response.json();
  }
}; 