## Passcode_Elearning_BE_1 – Backend Guide (End-to-End)

### Mục tiêu
Thiết lập backend e-learning với Next.js 15 (App Router), Prisma ORM (PostgreSQL), Clerk auth, đầy đủ API cho Courses, Blog, Enrollment, Progress. Dùng được cả khi khởi tạo ở thư mục hiện tại hoặc repo riêng.

### 1) Yêu cầu hệ thống
- Node.js 18+
- Tài khoản Prisma Data Platform (PostgreSQL)
- Tài khoản Clerk (Authentication)

### 2) Khởi tạo dự án
- Dựng tại thư mục hiện tại (khuyến nghị khi tạo repo mới rỗng):
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```
- Hoặc tạo thư mục mới rồi di chuyển vào:
```bash
npx create-next-app@latest passcode-elearning-be --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd passcode-elearning-be
```

### 3) Cài dependencies backend
```bash
npm install @prisma/client @clerk/nextjs
npm install -D prisma tsx
```

### 4) Tạo và cấu hình môi trường (.env)
Tạo file `.env` tại root:
```env
# Database (Prisma Data Platform)
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 5) Khởi tạo Prisma và schema
```bash
npx prisma init
```
Ghi đè nội dung `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  role      Role     @default(STUDENT)

  enrollments    Enrollment[]
  blogPosts      BlogPost[]
  comments       Comment[]
  progress       LessonProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Course {
  id          String   @id @default(cuid())
  code        String   @unique
  name        String
  description String
  videoUrl    String
  thumbnail   String?

  requirements String[]
  outcomes     String[]
  duration     Int
  level        Level    @default(BEGINNER)
  isActive     Boolean  @default(true)

  lessons     Lesson[]
  enrollments Enrollment[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("courses")
}

model Lesson {
  id        String   @id @default(cuid())
  courseId  String
  title     String
  content   String   @db.Text
  videoUrl  String
  duration  Int
  order     Int

  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  progress  LessonProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("lessons")
}

model Enrollment {
  id       String @id @default(cuid())
  userId   String
  courseId String

  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course   Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  enrolledAt DateTime @default(now())

  @@unique([userId, courseId])
  @@map("enrollments")
}

model LessonProgress {
  id        String  @id @default(cuid())
  userId    String
  lessonId  String
  completed Boolean @default(false)
  watchedAt DateTime?

  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson   Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@map("lesson_progress")
}

model BlogPost {
  id            String   @id @default(cuid())
  title         String
  excerpt       String
  content       String   @db.Text
  authorId      String
  category      String
  tags          String[]
  featuredImage String?
  isPublished   Boolean  @default(false)
  publishedAt   DateTime?

  author   User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments Comment[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("blog_posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  postId    String

  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  post      BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("comments")
}

enum Role {
  STUDENT
  ADMIN
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### 6) Prisma Client và Auth utilities
Tạo `lib/prisma.ts`:
```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

Tạo `lib/auth.ts`:
```ts
import { auth } from '@clerk/nextjs'
import { prisma } from './prisma'

export async function getCurrentUser() {
  const { userId } = auth()
  if (!userId) return null
  return prisma.user.findUnique({ where: { clerkId: userId } })
}

export async function createUserIfNotExists(clerkId: string, email: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } })
  if (existing) return existing
  return prisma.user.create({ data: { clerkId, email, name } })
}

export async function requireAuth() {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'ADMIN') throw new Error('Forbidden: Admin access required')
  return user
}
```

### 7) Middleware cho Clerk
Tạo `middleware.ts` ở root:
```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/courses",
    "/api/courses/(.*)",
    "/api/blog/posts",
    "/api/blog/posts/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### 8) Bọc ứng dụng với ClerkProvider
Sửa `app/layout.tsx` (hoặc `src/app/layout.tsx` nếu dùng src/):
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passcode Academy API",
  description: "Backend API for Passcode Academy e-learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### 9) API Routes
Tạo các file sau (đặt dưới `app/api/...` hoặc `src/app/api/...` nếu dùng src/):

`app/api/courses/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        _count: { select: { enrollments: true } }
      }
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const body = await request.json()
    const course = await prisma.course.create({ data: body })
    return NextResponse.json(course)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (error?.message?.includes('Forbidden')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
```

`app/api/courses/[id]/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        enrollments: { include: { user: true } }
      }
    })
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json(course)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const body = await request.json()
    const course = await prisma.course.update({ where: { id: params.id }, data: body })
    return NextResponse.json(course)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (error?.message?.includes('Forbidden')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    await prisma.course.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (error?.message?.includes('Forbidden')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
```

`app/api/blog/posts/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = { isPublished: true }
    if (category) where.category = category
    if (tag) where.tags = { has: tag }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          _count: { select: { comments: true } }
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.blogPost.count({ where })
    ])

    return NextResponse.json({ posts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const post = await prisma.blogPost.create({
      data: { ...body, authorId: user.id },
      include: { author: { select: { id: true, name: true, email: true } } }
    })
    return NextResponse.json(post)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
```

`app/api/blog/posts/[id]/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        comments: {
          include: { author: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    if (!post) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    if (existing.authorId !== user.id && user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: body,
      include: { author: { select: { id: true, name: true, email: true } } }
    })
    return NextResponse.json(post)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth()
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    if (existing.authorId !== user.id && user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
```

`app/api/user/enroll/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { courseId } = await request.json()
    if (!courseId) return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } }
    })
    if (existing) return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 400 })

    const enrollment = await prisma.enrollment.create({
      data: { userId: user.id, courseId },
      include: { course: true }
    })
    return NextResponse.json(enrollment)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await requireAuth()
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: { include: { lessons: { orderBy: { order: 'asc' } } } } },
      orderBy: { enrolledAt: 'desc' }
    })
    return NextResponse.json(enrollments)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
  }
}
```

`app/api/user/progress/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()
    const progress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: { lesson: { include: { course: true } } },
      orderBy: { watchedAt: 'desc' }
    })
    return NextResponse.json(progress)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { lessonId, completed } = await request.json()
    if (!lessonId) return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
    if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: lesson.courseId } }
    })
    if (!enrollment) return NextResponse.json({ error: 'You must be enrolled in this course to track progress' }, { status: 403 })

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      update: { completed: completed ?? true, watchedAt: new Date() },
      create: { userId: user.id, lessonId, completed: completed ?? true, watchedAt: new Date() },
      include: { lesson: { include: { course: true } } }
    })
    return NextResponse.json(progress)
  } catch (error: any) {
    if (error?.message?.includes('Unauthorized')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
```

### 10) Seed database (tùy chọn)
Tạo `prisma/seed.ts`:
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding...')

  const course = await prisma.course.create({
    data: {
      code: 'PRN212',
      name: 'ASP.NET WPF',
      description: 'Master desktop application development with WPF',
      videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM',
      requirements: ['Basic C# knowledge'],
      outcomes: ['Build desktop apps'],
      duration: 120,
      level: 'INTERMEDIATE'
    }
  })

  await prisma.lesson.createMany({
    data: [
      { courseId: course.id, title: 'Intro WPF', content: 'Basics...', videoUrl: 'https://youtu.be/...', duration: 45, order: 1 },
      { courseId: course.id, title: 'XAML', content: 'XAML...', videoUrl: 'https://youtu.be/...', duration: 60, order: 2 }
    ]
  })

  console.log('✅ Seed done')
}

main().catch(console.error).finally(() => prisma.$disconnect())
```

### 11) Scripts trong package.json
Thêm các scripts sau:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

### 12) Khởi chạy và kiểm thử
```bash
npm run db:push
npm run db:generate
npm run db:seed   # tùy chọn
npm run dev
```

Kiểm thử nhanh bằng curl:
```bash
# Courses
curl http://localhost:3000/api/courses

# Blog posts
curl http://localhost:3000/api/blog/posts

# Enroll (cần đăng nhập Clerk)
curl -X POST http://localhost:3000/api/user/enroll -H "Content-Type: application/json" -d '{"courseId":"<id>"}'
```

### 13) Cấu trúc thư mục tham khảo
```text
.
├─ app/
│  └─ api/
│     ├─ courses/
│     │  ├─ route.ts
│     │  └─ [id]/route.ts
│     ├─ blog/
│     │  └─ posts/
│     │     ├─ route.ts
│     │     └─ [id]/route.ts
│     └─ user/
│        ├─ enroll/route.ts
│        └─ progress/route.ts
├─ lib/
│  ├─ prisma.ts
│  └─ auth.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ middleware.ts
├─ package.json
└─ .env
```

### Ghi chú quan trọng
- Nếu dùng `src/` directory, đặt các file vào `src/...` tương ứng và giữ import alias `@/*`.
- Với Clerk, đảm bảo đã cấu hình keys và allowed origins trong dashboard.
- Với Prisma Data Platform, hãy dùng đúng `DATABASE_URL` từ project của bạn.

File này đủ để bạn hoặc đồng đội mở ở Cursor cửa sổ khác và dựng backend từ A→Z theo đúng cấu trúc và code mẫu ở trên.
