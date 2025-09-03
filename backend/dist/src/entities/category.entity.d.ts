import { Post } from './post.entity';
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    isActive: boolean;
    sortOrder: number;
    parentId?: string;
    parent?: Category;
    children: Category[];
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    get isParent(): boolean;
    get hasChildren(): boolean;
}
