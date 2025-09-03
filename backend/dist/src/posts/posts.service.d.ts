import { Repository } from 'typeorm';
import { Post, PostStatus, PostType } from '../entities/post.entity';
export interface CreatePostDto {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    status?: PostStatus;
    type?: PostType;
    authorId: string;
    categoryId?: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    allowComments?: boolean;
    isFeatured?: boolean;
    isSticky?: boolean;
}
export interface UpdatePostDto {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    status?: PostStatus;
    type?: PostType;
    categoryId?: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    allowComments?: boolean;
    isFeatured?: boolean;
    isSticky?: boolean;
}
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(page?: number, limit?: number, status?: PostStatus, type?: PostType): Promise<{
        posts: Post[];
        total: number;
        pages: number;
    }>;
    findOne(id: string): Promise<Post>;
    findBySlug(slug: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<void>;
    incrementViewCount(id: string): Promise<void>;
    incrementLikeCount(id: string): Promise<void>;
    incrementShareCount(id: string): Promise<void>;
    getPublished(page?: number, limit?: number): Promise<{
        posts: Post[];
        total: number;
        pages: number;
    }>;
    getFeatured(limit?: number): Promise<Post[]>;
    getStats(): Promise<{
        total: number;
        published: number;
        drafts: number;
        archived: number;
        totalViews: number;
        totalLikes: number;
        recentCount: number;
    }>;
    getRecentPosts(limit?: number): Promise<Post[]>;
    getPopularPosts(limit?: number): Promise<Post[]>;
}
