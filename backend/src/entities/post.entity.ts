import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import { User } from './user.entity';
import { Category } from './category.entity';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum PostType {
  ARTICLE = 'article',
  PAGE = 'page',
  NEWS = 'news',
}

@Entity('posts')
@Index(['status', 'publishedAt'])
@Index(['authorId', 'status'])
@Index(['categoryId', 'status'])
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  slug: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(300)
  excerpt?: string;

  @Column('text')
  @IsNotEmpty()
  content: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  featuredImage?: string;

  @Column({ nullable: true })
  @IsOptional()
  featuredImageAlt?: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  @IsEnum(PostStatus)
  status: PostStatus;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.ARTICLE,
  })
  @IsEnum(PostType)
  type: PostType;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  shareCount: number;

  @Column({ nullable: true })
  publishedAt?: Date;

  @Column({ nullable: true })
  @IsOptional()
  metaTitle?: string;

  @Column({ nullable: true })
  @IsOptional()
  metaDescription?: string;

  @Column('simple-array', { nullable: true })
  @IsOptional()
  tags?: string[];

  @Column({ default: true })
  allowComments: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isSticky: boolean;

  // Foreign Keys
  @Column()
  authorId: string;

  @Column({ nullable: true })
  categoryId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  // Helper methods
  get isPublished(): boolean {
    return this.status === PostStatus.PUBLISHED && this.publishedAt !== null && this.publishedAt !== undefined && this.publishedAt <= new Date();
  }

  get isDraft(): boolean {
    return this.status === PostStatus.DRAFT;
  }

  get readingTime(): number {
    // Estimate reading time in minutes (assuming 200 words per minute)
    const wordCount = this.content.split(' ').length;
    return Math.ceil(wordCount / 200);
  }

  get summary(): string {
    return this.excerpt || this.content.substring(0, 200) + '...';
  }
}
