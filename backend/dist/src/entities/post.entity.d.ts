import { User } from './user.entity';
import { Category } from './category.entity';
export declare enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare enum PostType {
    ARTICLE = "article",
    PAGE = "page",
    NEWS = "news"
}
export declare class Post {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    status: PostStatus;
    type: PostType;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    publishedAt?: Date;
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
    allowComments: boolean;
    isFeatured: boolean;
    isSticky: boolean;
    authorId: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    category?: Category;
    get isPublished(): boolean;
    get isDraft(): boolean;
    get readingTime(): number;
    get summary(): string;
}
