import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
export declare class DashboardService {
    private readonly usersService;
    private readonly postsService;
    constructor(usersService: UsersService, postsService: PostsService);
    getStats(): Promise<{
        totalUsers: number;
        totalPosts: number;
        totalViews: number;
        totalSettings: number;
        userStats: {
            total: number;
            active: number;
            inactive: number;
            admins: number;
            recentCount: number;
        };
        postStats: {
            total: number;
            published: number;
            drafts: number;
            archived: number;
            totalViews: number;
            totalLikes: number;
            recentCount: number;
        };
    }>;
    getRecentActivity(): Promise<{
        time: string;
        id: string;
        action: string;
        user: string;
        details: string;
        timestamp: Date;
        type: string;
    }[]>;
    private getTimeAgo;
}
