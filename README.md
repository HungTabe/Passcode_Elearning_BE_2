# Passcode_Elearning_BE_1

A robust backend API for Passcode Academy e-learning platform built with Next.js, Prisma ORM, and Clerk authentication.

## 🚀 Features

- **Course Management**: Full CRUD operations for courses and lessons
- **User Authentication**: Secure authentication with Clerk
- **Blog System**: Complete blog post management with comments
- **Progress Tracking**: User enrollment and lesson progress tracking
- **Admin Controls**: Role-based access control for administrators
- **Database**: PostgreSQL with Prisma ORM for type-safe queries

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL via Prisma Data Platform
- **ORM**: Prisma with TypeScript
- **Authentication**: Clerk
- **API**: RESTful API with Next.js API Routes
- **Language**: TypeScript

## 📚 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/[id]` - Get specific course
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/[id]` - Update course (Admin)
- `DELETE /api/courses/[id]` - Delete course (Admin)

### Blog Posts
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/[id]` - Get specific blog post
- `POST /api/blog/posts` - Create blog post (Authenticated)
- `PUT /api/blog/posts/[id]` - Update blog post (Author/Admin)
- `DELETE /api/blog/posts/[id]` - Delete blog post (Author/Admin)

### User Management
- `GET /api/user/enroll` - Get user enrollments
- `POST /api/user/enroll` - Enroll in course
- `GET /api/user/progress` - Get user progress
- `POST /api/user/progress` - Update lesson progress

## 🗄️ Database Schema

### Core Models
- **User**: Authentication and role management
- **Course**: Course information and metadata
- **Lesson**: Individual lessons within courses
- **Enrollment**: User course enrollments
- **LessonProgress**: User learning progress tracking
- **BlogPost**: Blog content management
- **Comment**: Blog post comments

## 🔐 Authentication & Authorization

- **Public Routes**: Course listing, blog posts, home page
- **Protected Routes**: User-specific data, admin functions
- **Role-based Access**: Student and Admin roles
- **JWT Tokens**: Secure authentication with Clerk

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Passcode_Elearning_BE_1.git
   cd Passcode_Elearning_BE_1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
   CLERK_SECRET_KEY=sk_test_your_key
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   npm run db:generate
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data

## 🧪 Testing

Test API endpoints using:
- **Thunder Client** (VS Code extension)
- **Postman**
- **curl** commands

Example:
```bash
curl http://localhost:3000/api/courses
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Railway**: Easy deployment with database
- **Netlify**: Static site hosting
- **AWS**: Full cloud infrastructure

## 📊 Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── courses/         # Course endpoints
│   │   ├── blog/           # Blog endpoints
│   │   └── user/           # User management
│   └── layout.tsx          # Root layout
├── lib/
│   ├── prisma.ts           # Database client
│   └── auth.ts             # Authentication utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
├── middleware.ts           # Clerk middleware
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@passcodeacademy.com or create an issue in this repository.

## 🔗 Links

- **Frontend Repository**: [Passcode_Elearning_FE](https://github.com/yourusername/Passcode_Elearning_FE)
- **Live Demo**: [https://passcode-academy.vercel.app](https://passcode-academy.vercel.app)
- **Documentation**: [https://docs.passcodeacademy.com](https://docs.passcodeacademy.com)

---

Built with ❤️ by Passcode Academy Team
