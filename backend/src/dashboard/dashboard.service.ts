import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getStats() {
    // In a real application, this would query your database
    return {
      totalUsers: 1234,
      totalPosts: 567,
      totalViews: 89012,
      totalSettings: 12,
    };
  }

  getRecentActivity() {
    // In a real application, this would query your database for recent activity
    return [
      { 
        id: 1,
        action: 'New user registered', 
        user: 'john@example.com', 
        time: '2 hours ago',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      { 
        id: 2,
        action: 'Post published', 
        user: 'admin@example.com', 
        time: '4 hours ago',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      { 
        id: 3,
        action: 'Settings updated', 
        user: 'admin@example.com', 
        time: '6 hours ago',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      { 
        id: 4,
        action: 'User profile updated', 
        user: 'jane@example.com', 
        time: '8 hours ago',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
      },
    ];
  }
}
