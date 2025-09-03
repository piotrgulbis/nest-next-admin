import { OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
export declare class SeedService implements OnModuleInit {
    private readonly usersService;
    private readonly postsService;
    constructor(usersService: UsersService, postsService: PostsService);
    onModuleInit(): Promise<void>;
    seedDatabase(): Promise<void>;
}
