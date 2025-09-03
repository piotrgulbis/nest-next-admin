<div align="center">
  <h1>🚀 NestJS + Next.js Admin System</h1>
  <p>A modern, full-stack admin dashboard built with NestJS, Next.js, PostgreSQL, and TypeORM</p>
  
  <p>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>

  <div align="center">
    <h3>✨ Built with AI assistance from</h3>
    <a href="https://warp.dev" target="_blank">
      <img src="https://assets.warp.dev/warp-logo-light-bg.svg" width="200" alt="Warp.dev Logo" style="margin: 10px;" />
    </a>
    <p>
      <a href="https://warp.dev" target="_blank">
        <img src="https://img.shields.io/badge/Built_with-Warp.dev-6366f1?style=for-the-badge&logo=terminal&logoColor=white" alt="Built with Warp.dev" />
      </a>
    </p>
  </div>
</div>

## 📖 About This Project

This is a **complete, production-ready admin system** featuring:

- **🔥 Modern Stack**: NestJS backend with Next.js frontend
- **🗄️ Database Integration**: PostgreSQL with TypeORM for robust data management
- **👥 User Management**: Complete CRUD operations with role-based access
- **📝 Content Management**: Full blog/post system with categories and engagement tracking
- **📊 Real-time Dashboard**: Live statistics and activity monitoring
- **🎨 Beautiful UI**: Responsive admin interface built with Tailwind CSS
- **🔐 Security**: Proper authentication structure and input validation
- **🚀 Monorepo Setup**: Organized workspace for scalable development

## 🏗️ Architecture

### Backend (NestJS + PostgreSQL)
- **API Server**: RESTful API running on port 3001
- **Database**: PostgreSQL with TypeORM for migrations and relationships
- **Entities**: User, Post, Category with complete relationships
- **Services**: Comprehensive CRUD operations with statistics
- **Seeding**: Automatic sample data generation for development

### Frontend (Next.js + Tailwind)
- **Admin Dashboard**: Modern responsive interface on port 3000
- **Pages**: Dashboard, Users Management, Settings
- **Components**: Reusable UI components with Heroicons
- **Real-time Data**: Live API integration with error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### 1. Clone and Install
```bash
git clone https://github.com/piotrgulbis/nest-next-admin.git
cd nest-next-admin
npm install
```

### 2. Database Setup
```bash
# Install PostgreSQL (see DATABASE_SETUP.md for detailed instructions)
# Create database
psql -U postgres -c "CREATE DATABASE nest_admin_db;"

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your PostgreSQL credentials
```

### 3. Start Development Servers
```bash
# Start both backend and frontend
npm run dev

# Or start individually:
# Backend (NestJS)
cd backend && npm run start:dev

# Frontend (Next.js)
cd admin && npm run dev
```

### 4. Access the Application
- **Admin Dashboard**: http://localhost:3000/admin
- **Backend API**: http://localhost:3001/api
- **Default Admin**: admin@example.com / admin123

## 📁 Project Structure

```
nest-next-admin/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── entities/       # Database entities (User, Post, Category)
│   │   ├── users/          # User management module
│   │   ├── posts/          # Post management module
│   │   ├── dashboard/      # Dashboard statistics module
│   │   ├── database/       # Database seeding and configuration
│   │   └── config/         # Application configuration
│   ├── .env                # Environment variables
│   └── package.json
│
├── admin/                  # Next.js Admin Interface
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/      # Admin pages
│   │   │   │   ├── users/  # User management page
│   │   │   │   └── settings/ # Settings page
│   │   │   └── page.tsx    # Root redirect
│   │   └── components/     # Reusable UI components
│   └── package.json
│
├── DATABASE_SETUP.md       # Detailed database setup guide
├── package.json            # Monorepo configuration
└── README.md
```

## 🔧 Features

### 👤 User Management
- Complete user CRUD operations
- Role-based access (Admin, Moderator, User)
- User status management (Active, Inactive, Suspended)
- Registration and authentication structure
- User statistics and analytics

### 📝 Content Management
- Full blog post system with rich content support
- Category organization with hierarchical structure
- Post status workflow (Draft, Published, Archived)
- SEO-friendly features (meta titles, descriptions, slugs)
- Engagement tracking (views, likes, shares)

### 📊 Dashboard & Analytics
- Real-time statistics dashboard
- User and content metrics
- Recent activity monitoring
- System health indicators
- Interactive charts and graphs

### 🎨 Admin Interface
- Modern, responsive design
- Intuitive navigation and UX
- Mobile-friendly interface
- Dark/light theme ready
- Comprehensive settings panel

## 🛠️ API Endpoints

### Users
- `GET /api/users` - List users with pagination
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats` - User statistics

### Posts
- `GET /api/posts` - List posts with filtering
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get post details
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/published` - Get published posts
- `GET /api/posts/stats` - Post statistics

### Dashboard
- `GET /api/dashboard/stats` - System statistics
- `GET /api/dashboard/activity` - Recent activity

## 🤖 Built with AI

<div align="center">
  <h3>🔮 Powered by Warp.dev</h3>
  <p>This entire project was created with AI assistance from <a href="https://warp.dev" target="_blank"><strong>Warp.dev</strong></a> - the AI-powered development tool that transforms how we build software.</p>
  
  <a href="https://warp.dev" target="_blank">
    <img src="https://img.shields.io/badge/Try_Warp-6366f1?style=for-the-badge&logo=terminal&logoColor=white" alt="Try Warp.dev" />
  </a>
  
  <p><em>"Complete tasks across the software lifecycle, without leaving Warp"</em></p>
</div>

### How Warp.dev Helped Build This Project:

- **🧠 Intelligent Code Generation**: Created comprehensive TypeScript entities, services, and controllers
- **🔄 Agentic Workflows**: Managed complex database relationships and API integrations
- **🐛 Advanced Debugging**: Resolved TypeScript compilation errors and database connection issues
- **📚 Documentation**: Generated detailed setup guides and API documentation
- **🎯 Best Practices**: Implemented production-ready patterns and security measures
- **⚡ Rapid Development**: Accelerated development from concept to production-ready application

Warp.dev made it possible to build this enterprise-grade admin system efficiently while maintaining high code quality and following modern development practices.

## 🔧 Development

### Database Migrations
```bash
cd backend

# Generate migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

### Seeding Data
```bash
# Database is automatically seeded on startup in development
# Includes sample users and posts with realistic data
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm run test
```

## 🚀 Deployment

The project is structured for easy deployment on platforms like:
- **Vercel** (Frontend)
- **Railway** or **Heroku** (Backend)
- **Supabase** or **AWS RDS** (Database)

See individual package.json files for build commands.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Warp.dev](https://warp.dev)** - For the incredible AI development experience
- **[NestJS](https://nestjs.com)** - For the powerful Node.js framework
- **[Next.js](https://nextjs.org)** - For the excellent React framework
- **[Tailwind CSS](https://tailwindcss.com)** - For the utility-first CSS framework
- **[TypeORM](https://typeorm.io)** - For the robust database ORM

---

<div align="center">
  <p>Built with ❤️ and AI assistance from <a href="https://warp.dev" target="_blank">Warp.dev</a></p>
  <p>
    <a href="https://warp.dev" target="_blank">
      <img src="https://assets.warp.dev/warp-logo-light-bg.svg" width="120" alt="Warp.dev" />
    </a>
  </p>
</div>
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
