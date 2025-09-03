import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(page?: number, limit?: number): Promise<{
        users: import("../entities/user.entity").User[];
        total: number;
        pages: number;
    }>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        admins: number;
        recentCount: number;
    }>;
    getRecent(limit?: number): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
