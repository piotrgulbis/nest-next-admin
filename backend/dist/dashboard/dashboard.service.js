"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    getStats() {
        return {
            totalUsers: 1234,
            totalPosts: 567,
            totalViews: 89012,
            totalSettings: 12,
        };
    }
    getRecentActivity() {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map