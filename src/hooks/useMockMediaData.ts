import { useState, useEffect } from 'react';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number; // in bytes
  dimensions: { width: number; height: number };
  createdAt: string; // ISO date string
  tags?: string[];
}

export const useMockMediaData = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateMockData = () => {
      try {
        setIsLoading(true);
        
        // Mock data for media items
        const mockItems: MediaItem[] = [
          {
            id: '1',
            name: 'Product Photo 1',
            url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
            type: 'image',
            size: 1200000,
            dimensions: { width: 1200, height: 800 },
            createdAt: '2023-01-15T10:30:00Z',
            tags: ['product', 'featured']
          },
          {
            id: '2',
            name: 'Product Photo 2',
            url: 'https://images.pexels.com/photos/4226869/pexels-photo-4226869.jpeg',
            type: 'image',
            size: 980000,
            dimensions: { width: 1000, height: 750 },
            createdAt: '2023-01-20T14:45:00Z',
            tags: ['product', 'electronics']
          },
          {
            id: '3',
            name: 'Store Interior',
            url: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
            type: 'image',
            size: 2400000,
            dimensions: { width: 2000, height: 1500 },
            createdAt: '2023-02-05T09:15:00Z',
            tags: ['store', 'interior']
          },
          {
            id: '4',
            name: 'Product Demo Video',
            url: 'https://images.pexels.com/photos/7681731/pexels-photo-7681731.jpeg',
            type: 'video',
            size: 15000000,
            dimensions: { width: 1920, height: 1080 },
            createdAt: '2023-02-10T16:20:00Z',
            tags: ['product', 'demo', 'video']
          },
          {
            id: '5',
            name: 'Team Photo',
            url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
            type: 'image',
            size: 1800000,
            dimensions: { width: 1600, height: 1200 },
            createdAt: '2023-02-15T11:30:00Z',
            tags: ['team', 'people']
          },
          {
            id: '6',
            name: 'Product Catalog Cover',
            url: 'https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg',
            type: 'image',
            size: 3200000,
            dimensions: { width: 2400, height: 1600 },
            createdAt: '2023-02-20T13:45:00Z',
            tags: ['catalog', 'marketing']
          },
          {
            id: '7',
            name: 'Customer Testimonial',
            url: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
            type: 'image',
            size: 1100000,
            dimensions: { width: 1200, height: 800 },
            createdAt: '2023-03-01T15:10:00Z',
            tags: ['customer', 'testimonial']
          },
          {
            id: '8',
            name: 'Product Packaging',
            url: 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg',
            type: 'image',
            size: 950000,
            dimensions: { width: 1000, height: 750 },
            createdAt: '2023-03-10T09:30:00Z',
            tags: ['product', 'packaging']
          },
          {
            id: '9',
            name: 'Marketing Banner',
            url: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg',
            type: 'image',
            size: 1400000,
            dimensions: { width: 1600, height: 600 },
            createdAt: '2023-03-15T14:20:00Z',
            tags: ['marketing', 'banner']
          }
        ];
        
        setMediaItems(mockItems);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load media data');
        setIsLoading(false);
      }
    };

    // Simulate API call delay
    setTimeout(generateMockData, 1000);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return { mediaItems, isLoading, error };
};