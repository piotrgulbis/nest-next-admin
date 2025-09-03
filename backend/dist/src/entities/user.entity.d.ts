import { Post } from './post.entity';
export declare enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    USER = "user"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
    lastLoginAt?: Date;
    emailVerified: boolean;
    emailVerificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    get fullName(): string;
    get isAdmin(): boolean;
    get isActive(): boolean;
}
