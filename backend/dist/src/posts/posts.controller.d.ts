import { PostsService } from './posts.service';
import type { CreatePostDto, UpdatePostDto } from './posts.service';
import { PostStatus, PostType } from '../entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<import("../entities/post.entity").Post>;
    findAll(page?: number, limit?: number, status?: PostStatus, type?: PostType): Promise<{
        posts: import("../entities/post.entity").Post[];
        total: number;
        pages: number;
    }>;
    getStats(): Promise<{
        total: number;
        published: number;
        drafts: number;
        archived: number;
        totalViews: number;
        totalLikes: number;
        recentCount: number;
    }>;
    getRecent(limit?: number): Promise<import("../entities/post.entity").Post[]>;
    getPopular(limit?: number): Promise<import("../entities/post.entity").Post[]>;
    getPublished(page?: number, limit?: number): Promise<{
        posts: import("../entities/post.entity").Post[];
        total: number;
        pages: number;
    }>;
    getFeatured(limit?: number): Promise<import("../entities/post.entity").Post[]>;
    findBySlug(slug: string): Promise<import("../entities/post.entity").Post>;
    findOne(id: string): Promise<import("../entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("../entities/post.entity").Post>;
    incrementView(id: string): Promise<void>;
    incrementLike(id: string): Promise<void>;
    incrementShare(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
