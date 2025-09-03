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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../entities/post.entity");
let PostsService = class PostsService {
    postRepository;
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(createPostDto) {
        const post = this.postRepository.create({
            ...createPostDto,
            publishedAt: createPostDto.status === post_entity_1.PostStatus.PUBLISHED ? new Date() : undefined,
        });
        return await this.postRepository.save(post);
    }
    async findAll(page = 1, limit = 10, status, type) {
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.category', 'category')
            .orderBy('post.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit);
        if (status) {
            queryBuilder.andWhere('post.status = :status', { status });
        }
        if (type) {
            queryBuilder.andWhere('post.type = :type', { type });
        }
        const [posts, total] = await queryBuilder.getManyAndCount();
        return {
            posts,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author', 'category'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async findBySlug(slug) {
        const post = await this.postRepository.findOne({
            where: { slug, status: post_entity_1.PostStatus.PUBLISHED },
            relations: ['author', 'category'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        await this.incrementViewCount(post.id);
        return post;
    }
    async update(id, updatePostDto) {
        const post = await this.findOne(id);
        Object.assign(post, updatePostDto);
        if (updatePostDto.status === post_entity_1.PostStatus.PUBLISHED && !post.publishedAt) {
            post.publishedAt = new Date();
        }
        return await this.postRepository.save(post);
    }
    async remove(id) {
        const post = await this.findOne(id);
        await this.postRepository.remove(post);
    }
    async incrementViewCount(id) {
        await this.postRepository.increment({ id }, 'viewCount', 1);
    }
    async incrementLikeCount(id) {
        await this.postRepository.increment({ id }, 'likeCount', 1);
    }
    async incrementShareCount(id) {
        await this.postRepository.increment({ id }, 'shareCount', 1);
    }
    async getPublished(page = 1, limit = 10) {
        return this.findAll(page, limit, post_entity_1.PostStatus.PUBLISHED);
    }
    async getFeatured(limit = 5) {
        return await this.postRepository.find({
            where: {
                status: post_entity_1.PostStatus.PUBLISHED,
                isFeatured: true,
            },
            relations: ['author', 'category'],
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getStats() {
        const total = await this.postRepository.count();
        const published = await this.postRepository.count({
            where: { status: post_entity_1.PostStatus.PUBLISHED },
        });
        const drafts = await this.postRepository.count({
            where: { status: post_entity_1.PostStatus.DRAFT },
        });
        const archived = await this.postRepository.count({
            where: { status: post_entity_1.PostStatus.ARCHIVED },
        });
        const viewsResult = await this.postRepository
            .createQueryBuilder('post')
            .select('SUM(post.viewCount)', 'totalViews')
            .getRawOne();
        const likesResult = await this.postRepository
            .createQueryBuilder('post')
            .select('SUM(post.likeCount)', 'totalLikes')
            .getRawOne();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentCount = await this.postRepository
            .createQueryBuilder('post')
            .where('post.createdAt >= :sevenDaysAgo', { sevenDaysAgo })
            .getCount();
        return {
            total,
            published,
            drafts,
            archived,
            totalViews: parseInt(viewsResult?.totalViews) || 0,
            totalLikes: parseInt(likesResult?.totalLikes) || 0,
            recentCount,
        };
    }
    async getRecentPosts(limit = 10) {
        return await this.postRepository.find({
            take: limit,
            order: { createdAt: 'DESC' },
            relations: ['author', 'category'],
        });
    }
    async getPopularPosts(limit = 10) {
        return await this.postRepository.find({
            where: { status: post_entity_1.PostStatus.PUBLISHED },
            take: limit,
            order: { viewCount: 'DESC' },
            relations: ['author', 'category'],
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map