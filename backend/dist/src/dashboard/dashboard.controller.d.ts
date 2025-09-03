import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
    getRecentActivity(): Promise<any[]>;
}
