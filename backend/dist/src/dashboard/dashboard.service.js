"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const posts_service_1 = require("../posts/posts.service");
let DashboardService = class DashboardService {
    usersService;
    postsService;
    constructor(usersService, postsService) {
        this.usersService = usersService;
        this.postsService = postsService;
    }
    async getStats() {
        const [userStats, postStats] = await Promise.all([
            this.usersService.getStats(),
            this.postsService.getStats(),
        ]);
        return {
            totalUsers: userStats.total,
            totalPosts: postStats.total,
            totalViews: postStats.totalViews,
            totalSettings: 12,
            userStats,
            postStats,
        };
    }
    async getRecentActivity() {
        const [recentUsers, recentPosts] = await Promise.all([
            this.usersService.getRecentUsers(5),
            this.postsService.getRecentPosts(5),
        ]);
        const activities = [];
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
        return activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10)
            .map((activity) => ({
            ...activity,
            time: this.getTimeAgo(activity.timestamp),
        }));
    }
    getTimeAgo(date) {
        const now = new Date();
        const diffInMs = now.getTime() - new Date(date).getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        }
        else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }
        else {
            return `${diffInDays} days ago`;
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        posts_service_1.PostsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map