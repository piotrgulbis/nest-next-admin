import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from '../entities/user.entity';
export interface CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    status?: UserStatus;
    password?: string;
    phone?: string;
}
export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    status?: UserStatus;
    avatar?: string;
}
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<{
        users: User[];
        total: number;
        pages: number;
    }>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    updateLastLogin(id: string): Promise<void>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        admins: number;
        recentCount: number;
    }>;
    getRecentUsers(limit?: number): Promise<User[]>;
}
