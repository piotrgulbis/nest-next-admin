import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async getStats() {
    const [userStats, postStats] = await Promise.all([
      this.usersService.getStats(),
      this.postsService.getStats(),
    ]);

    return {
      totalUsers: userStats.total,
      totalPosts: postStats.total,
      totalViews: postStats.totalViews,
      totalSettings: 12, // Static for now, could be from a settings table later
      userStats,
      postStats,
    };
  }

  async getRecentActivity() {
    const [recentUsers, recentPosts] = await Promise.all([
      this.usersService.getRecentUsers(5),
      this.postsService.getRecentPosts(5),
    ]);

    const activities: Array<{
      id: string;
      action: string;
      user: string;
      details: string;
      timestamp: Date;
      type: string;
    }> = [];

    // Add recent user registrations
    recentUsers.forEach((user) => {
      activities.push({
        id: `user-${user.id}`,
        action: 'New user registered',
        user: user.email,
        details: `${user.firstName} ${user.lastName}`,
        timestamp: user.createdAt,
        type: 'user',
      });
    });

    // Add recent post publications
    recentPosts
      .filter((post) => post.status === 'published')
      .forEach((post) => {
        activities.push({
          id: `post-${post.id}`,
          action: 'Post published',
          user: post.author?.email || 'Unknown',
          details: post.title,
          timestamp: post.publishedAt || post.createdAt,
          type: 'post',
        });
      });

    // Sort by timestamp (most recent first) and limit to 10
    return activities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 10)
      .map((activity) => ({
        ...activity,
        time: this.getTimeAgo(activity.timestamp),
      }));
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  }
}
