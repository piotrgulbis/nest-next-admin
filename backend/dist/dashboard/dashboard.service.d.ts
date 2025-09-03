export declare class DashboardService {
    getStats(): {
        totalUsers: number;
        totalPosts: number;
        totalViews: number;
        totalSettings: number;
    };
    getRecentActivity(): {
        id: number;
        action: string;
        user: string;
        time: string;
        timestamp: Date;
    }[];
}
