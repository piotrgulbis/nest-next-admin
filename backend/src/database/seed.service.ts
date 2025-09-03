import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { UserRole } from '../entities/user.entity';
import { PostStatus, PostType } from '../entities/post.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async onModuleInit() {
    // Only seed in development
    if (process.env.NODE_ENV === 'development') {
      await this.seedDatabase();
    }
  }

  async seedDatabase() {
    console.log('🌱 Starting database seeding...');

    try {
      // Check if data already exists
      const userStats = await this.usersService.getStats();
      if (userStats.total > 0) {
        console.log('📊 Database already has data, skipping seeding');
        return;
      }

      // Create admin user
      const adminUser = await this.usersService.create({
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.ADMIN,
        phone: '+1-555-0123',
      });

      // Create regular users
      const users: Array<{ id: string; firstName: string; lastName: string; email: string }> = [];
      const userNames = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
        { firstName: 'Alice', lastName: 'Wilson', email: 'alice@example.com' },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'charlie@example.com',
        },
      ];

      for (const userData of userNames) {
        const user = await this.usersService.create({
          ...userData,
          password: 'password123',
          role: UserRole.USER,
        });
        users.push(user);
      }

      // Create sample posts
      const samplePosts = [
        {
          title: 'Getting Started with NestJS',
          slug: 'getting-started-with-nestjs',
          excerpt:
            'Learn the basics of building scalable Node.js applications with NestJS framework.',
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
          status: PostStatus.PUBLISHED,
          type: PostType.ARTICLE,
          authorId: adminUser.id,
          tags: ['nestjs', 'nodejs', 'typescript', 'backend'],
          isFeatured: true,
        },
        {
          title: 'Database Integration with TypeORM',
          slug: 'database-integration-typeorm',
          excerpt:
            'Learn how to integrate PostgreSQL with your NestJS application using TypeORM.',
          content: `
            <h2>Setting up TypeORM with PostgreSQL</h2>
            <p>TypeORM is a powerful ORM that works well with NestJS. In this tutorial, we'll set up PostgreSQL integration.</p>
            
            <h3>Installation</h3>
            <pre><code>npm install @nestjs/typeorm typeorm pg</code></pre>
            
            <h3>Configuration</h3>
            <p>Configure your database connection in the app.module.ts file and create your first entity.</p>
          `,
          status: PostStatus.PUBLISHED,
          type: PostType.ARTICLE,
          authorId: users[0].id,
          tags: ['typeorm', 'postgresql', 'database', 'nestjs'],
        },
        {
          title: 'Building a RESTful API',
          slug: 'building-restful-api',
          excerpt:
            'Create a complete RESTful API with CRUD operations using NestJS.',
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
          status: PostStatus.PUBLISHED,
          type: PostType.ARTICLE,
          authorId: users[1].id,
          tags: ['rest', 'api', 'crud', 'http'],
        },
        {
          title: 'Authentication and Authorization',
          slug: 'authentication-authorization',
          excerpt:
            'Implement secure authentication and authorization in your NestJS application.',
          content: `
            <h2>Securing Your Application</h2>
            <p>Security is crucial for any web application. Learn how to implement JWT-based authentication.</p>
            
            <h3>JWT Strategy</h3>
            <p>JSON Web Tokens provide a secure way to handle user authentication in modern web applications.</p>
          `,
          status: PostStatus.DRAFT,
          type: PostType.ARTICLE,
          authorId: adminUser.id,
          tags: ['jwt', 'authentication', 'security', 'nestjs'],
        },
        {
          title: 'Next.js Admin Dashboard',
          slug: 'nextjs-admin-dashboard',
          excerpt:
            'Build a modern admin dashboard using Next.js and TypeScript.',
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
          status: PostStatus.PUBLISHED,
          type: PostType.ARTICLE,
          authorId: users[2].id,
          tags: ['nextjs', 'admin', 'dashboard', 'typescript'],
          isFeatured: true,
        },
      ];

      for (const postData of samplePosts) {
        await this.postsService.create(postData);
      }

      // Simulate some views and likes
      const allPosts = await this.postsService.findAll(1, 100);
      for (const post of allPosts.posts) {
        // Random views between 10-500
        const views = Math.floor(Math.random() * 490) + 10;
        for (let i = 0; i < views; i++) {
          await this.postsService.incrementViewCount(post.id);
        }

        // Random likes between 1-50
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
    } catch (error) {
      console.error('❌ Error seeding database:', error);
    }
  }
}
