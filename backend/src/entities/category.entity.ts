import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  slug: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @Column({ nullable: true })
  @IsOptional()
  color?: string; // Hex color code for UI

  @Column({ nullable: true })
  @IsOptional()
  icon?: string; // Icon name or URL

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  // Self-referencing for hierarchical categories
  @Column({ nullable: true })
  parentId?: string;

  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  // Helper methods
  get isParent(): boolean {
    return this.parentId === null;
  }

  get hasChildren(): boolean {
    return this.children && this.children.length > 0;
  }
}
