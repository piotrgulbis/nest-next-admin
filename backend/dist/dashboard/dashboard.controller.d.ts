import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
