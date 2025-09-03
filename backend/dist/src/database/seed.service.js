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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const posts_service_1 = require("../posts/posts.service");
const user_entity_1 = require("../entities/user.entity");
const post_entity_1 = require("../entities/post.entity");
let SeedService = class SeedService {
    usersService;
    postsService;
    constructor(usersService, postsService) {
        this.usersService = usersService;
        this.postsService = postsService;
    }
    async onModuleInit() {
        if (process.env.NODE_ENV === 'development') {
            await this.seedDatabase();
        }
    }
    async seedDatabase() {
        console.log('🌱 Starting database seeding...');
        try {
            const userStats = await this.usersService.getStats();
            if (userStats.total > 0) {
                console.log('📊 Database already has data, skipping seeding');
                return;
            }
            const adminUser = await this.usersService.create({
                email: 'admin@example.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                role: user_entity_1.UserRole.ADMIN,
                phone: '+1-555-0123',
            });
            const users = [];
            const userNames = [
                { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
                { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
                { firstName: 'Alice', lastName: 'Wilson', email: 'alice@example.com' },
                { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com' },
            ];
            for (const userData of userNames) {
                const user = await this.usersService.create({
                    ...userData,
                    password: 'password123',
                    role: user_entity_1.UserRole.USER,
                });
                users.push(user);
            }
            const samplePosts = [
                {
                    title: 'Getting Started with NestJS',
                    slug: 'getting-started-with-nestjs',
                    excerpt: 'Learn the basics of building scalable Node.js applications with NestJS framework.',
                    content: `
            <h2>Introduction to NestJS</h2>
            <p>NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses modern JavaScript, is built with TypeScript, and combines elements of OOP, FP, and FRP.</p>
            
            <h3>Key Features</h3>
            <ul>
              <li>TypeScript support out of the box</li>
              <li>Modular architecture</li>
              <li>Dependency injection</li>
              <li>Decorator-based programming</li>
            </ul>
            
            <p>This comprehensive guide will help you understand the core concepts and get you started with your first NestJS application.</p>
          `,
                    status: post_entity_1.PostStatus.PUBLISHED,
                    type: post_entity_1.PostType.ARTICLE,
                    authorId: adminUser.id,
                    tags: ['nestjs', 'nodejs', 'typescript', 'backend'],
                    isFeatured: true,
                },
                {
                    title: 'Database Integration with TypeORM',
                    slug: 'database-integration-typeorm',
                    excerpt: 'Learn how to integrate PostgreSQL with your NestJS application using TypeORM.',
                    content: `
            <h2>Setting up TypeORM with PostgreSQL</h2>
            <p>TypeORM is a powerful ORM that works well with NestJS. In this tutorial, we'll set up PostgreSQL integration.</p>
            
            <h3>Installation</h3>
            <pre><code>npm install @nestjs/typeorm typeorm pg</code></pre>
            
            <h3>Configuration</h3>
            <p>Configure your database connection in the app.module.ts file and create your first entity.</p>
          `,
                    status: post_entity_1.PostStatus.PUBLISHED,
                    type: post_entity_1.PostType.ARTICLE,
                    authorId: users[0].id,
                    tags: ['typeorm', 'postgresql', 'database', 'nestjs'],
                },
                {
                    title: 'Building a RESTful API',
                    slug: 'building-restful-api',
                    excerpt: 'Create a complete RESTful API with CRUD operations using NestJS.',
                    content: `
            <h2>REST API Best Practices</h2>
            <p>Building a RESTful API requires following certain conventions and best practices.</p>
            
            <h3>HTTP Methods</h3>
            <ul>
              <li>GET - Retrieve data</li>
              <li>POST - Create new resource</li>
              <li>PUT - Update entire resource</li>
              <li>PATCH - Partial update</li>
              <li>DELETE - Remove resource</li>
            </ul>
          `,
                    status: post_entity_1.PostStatus.PUBLISHED,
                    type: post_entity_1.PostType.ARTICLE,
                    authorId: users[1].id,
                    tags: ['rest', 'api', 'crud', 'http'],
                },
                {
                    title: 'Authentication and Authorization',
                    slug: 'authentication-authorization',
                    excerpt: 'Implement secure authentication and authorization in your NestJS application.',
                    content: `
            <h2>Securing Your Application</h2>
            <p>Security is crucial for any web application. Learn how to implement JWT-based authentication.</p>
            
            <h3>JWT Strategy</h3>
            <p>JSON Web Tokens provide a secure way to handle user authentication in modern web applications.</p>
          `,
                    status: post_entity_1.PostStatus.DRAFT,
                    type: post_entity_1.PostType.ARTICLE,
                    authorId: adminUser.id,
                    tags: ['jwt', 'authentication', 'security', 'nestjs'],
                },
                {
                    title: 'Next.js Admin Dashboard',
                    slug: 'nextjs-admin-dashboard',
                    excerpt: 'Build a modern admin dashboard using Next.js and TypeScript.',
                    content: `
            <h2>Modern Admin Interfaces</h2>
            <p>Next.js provides an excellent foundation for building fast, modern admin dashboards.</p>
            
            <h3>Features</h3>
            <ul>
              <li>Server-side rendering</li>
              <li>TypeScript support</li>
              <li>Tailwind CSS integration</li>
              <li>API routes</li>
            </ul>
          `,
                    status: post_entity_1.PostStatus.PUBLISHED,
                    type: post_entity_1.PostType.ARTICLE,
                    authorId: users[2].id,
                    tags: ['nextjs', 'admin', 'dashboard', 'typescript'],
                    isFeatured: true,
                },
            ];
            for (const postData of samplePosts) {
                await this.postsService.create(postData);
            }
            const allPosts = await this.postsService.findAll(1, 100);
            for (const post of allPosts.posts) {
                const views = Math.floor(Math.random() * 490) + 10;
                for (let i = 0; i < views; i++) {
                    await this.postsService.incrementViewCount(post.id);
                }
                const likes = Math.floor(Math.random() * 49) + 1;
                for (let i = 0; i < likes; i++) {
                    await this.postsService.incrementLikeCount(post.id);
                }
            }
            console.log('✅ Database seeding completed successfully!');
            console.log(`👤 Created ${users.length + 1} users (including admin)`);
            console.log(`📝 Created ${samplePosts.length} posts`);
            console.log('');
            console.log('🔑 Admin credentials:');
            console.log('   Email: admin@example.com');
            console.log('   Password: admin123');
        }
        catch (error) {
            console.error('❌ Error seeding database:', error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        posts_service_1.PostsService])
], SeedService);
//# sourceMappingURL=seed.service.js.map