import type { AIImageRequest, AITextRequest, BannerConfig } from '../types';

// Base API configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class BannerApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // AI Image Generation
  async generateProductImage(request: AIImageRequest): Promise<{ imageUrl: string; prompt: string }> {
    return this.request('/ai/generate-image', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // AI Text Optimization
  async optimizeText(request: AITextRequest): Promise<{ optimizedText: string; suggestions: string[] }> {
    return this.request('/ai/optimize-text', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Banner Management
  async saveBanner(config: BannerConfig): Promise<{ id: string; success: boolean }> {
    return this.request('/banners', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async getBanner(id: string): Promise<BannerConfig> {
    return this.request(`/banners/${id}`);
  }

  async updateBanner(id: string, config: Partial<BannerConfig>): Promise<{ success: boolean }> {
    return this.request(`/banners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }

  async deleteBanner(id: string): Promise<{ success: boolean }> {
    return this.request(`/banners/${id}`, {
      method: 'DELETE',
    });
  }

  // Export Banner
  async exportBanner(id: string, format: 'png' | 'jpg' | 'svg'): Promise<{ downloadUrl: string }> {
    return this.request(`/banners/${id}/export?format=${format}`, {
      method: 'POST',
    });
  }

  // Upload Media
  async uploadMedia(file: File): Promise<{ mediaUrl: string; thumbnailUrl?: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Templates
  async getTemplates(): Promise<BannerConfig[]> {
    return this.request('/templates');
  }

  async createTemplate(config: BannerConfig): Promise<{ id: string; success: boolean }> {
    return this.request('/templates', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }
}

export const bannerApi = new BannerApiService(); 