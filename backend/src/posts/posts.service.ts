import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      publishedAt: createPostDto.status === PostStatus.PUBLISHED ? new Date() : undefined,
    });

    return await this.postRepository.save(post);
  }

  async findAll(
    page = 1,
    limit = 10,
    status?: PostStatus,
    type?: PostType,
  ): Promise<{ posts: Post[]; total: number; pages: number }> {
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

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { slug, status: PostStatus.PUBLISHED },
      relations: ['author', 'category'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Increment view count
    await this.incrementViewCount(post.id);

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);

    // Set published date when status changes to published
    if (updatePostDto.status === PostStatus.PUBLISHED && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    return await this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.postRepository.increment({ id }, 'viewCount', 1);
  }

  async incrementLikeCount(id: string): Promise<void> {
    await this.postRepository.increment({ id }, 'likeCount', 1);
  }

  async incrementShareCount(id: string): Promise<void> {
    await this.postRepository.increment({ id }, 'shareCount', 1);
  }

  async getPublished(page = 1, limit = 10): Promise<{ posts: Post[]; total: number; pages: number }> {
    return this.findAll(page, limit, PostStatus.PUBLISHED);
  }

  async getFeatured(limit = 5): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        status: PostStatus.PUBLISHED,
        isFeatured: true,
      },
      relations: ['author', 'category'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getStats(): Promise<{
    total: number;
    published: number;
    drafts: number;
    archived: number;
    totalViews: number;
    totalLikes: number;
    recentCount: number;
  }> {
    const total = await this.postRepository.count();
    const published = await this.postRepository.count({
      where: { status: PostStatus.PUBLISHED },
    });
    const drafts = await this.postRepository.count({
      where: { status: PostStatus.DRAFT },
    });
    const archived = await this.postRepository.count({
      where: { status: PostStatus.ARCHIVED },
    });

    // Get total views and likes
    const viewsResult = await this.postRepository
      .createQueryBuilder('post')
      .select('SUM(post.viewCount)', 'totalViews')
      .getRawOne();

    const likesResult = await this.postRepository
      .createQueryBuilder('post')
      .select('SUM(post.likeCount)', 'totalLikes')
      .getRawOne();

    // Posts created in the last 7 days
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

  async getRecentPosts(limit = 10): Promise<Post[]> {
    return await this.postRepository.find({
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['author', 'category'],
    });
  }

  async getPopularPosts(limit = 10): Promise<Post[]> {
    return await this.postRepository.find({
      where: { status: PostStatus.PUBLISHED },
      take: limit,
      order: { viewCount: 'DESC' },
      relations: ['author', 'category'],
    });
  }
}
