import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Ensure an admin user exists for authoring blog posts
  const adminUser = await prisma.user.upsert({
    where: { clerkId: 'seed-admin-clerk-id' },
    update: {},
    create: {
      clerkId: 'seed-admin-clerk-id',
      email: 'admin@demo.local',
      name: 'John Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'Senior React Developer with 8+ years experience. Passionate educator.',
      twitter: '@johnsmith',
      linkedin: 'johnsmith',
      role: 'ADMIN'
    }
  })

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      code: 'PRN212',
      name: 'ASP.NET WPF',
      title: 'ASP.NET WPF Desktop Development',
      description: 'Master desktop application development with Windows Presentation Foundation',
      videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008',
      requirements: ['Basic C# knowledge', 'Visual Studio', 'Understanding of OOP concepts'],
      outcomes: ['Build desktop applications', 'Understand WPF concepts', 'Master XAML', 'Implement MVVM pattern'],
      duration: 120,
      level: 'INTERMEDIATE',
      instructor: 'John Smith',
      rating: 4.5,
      students: 245,
      lessonsCount: 8,
      category: 'Desktop Development',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008'
    }
  })

  const course2 = await prisma.course.create({
    data: {
      code: 'PRN222',
      name: 'ASP.NET Razor Page',
      title: 'ASP.NET Core Razor Pages Web Development',
      description: 'Build dynamic web applications using ASP.NET Core Razor Pages',
      videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=6936',
      requirements: ['Basic C# knowledge', 'HTML/CSS fundamentals', 'Visual Studio'],
      outcomes: ['Build web applications', 'Understand Razor Pages', 'Database integration', 'Authentication & Authorization'],
      duration: 90,
      level: 'INTERMEDIATE',
      instructor: 'Sarah Johnson',
      rating: 4.3,
      students: 189,
      lessonsCount: 6,
      category: 'Web Development',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=6936'
    }
  })

  const course3 = await prisma.course.create({
    data: {
      code: 'PRN232',
      name: 'ASP.NET Web API',
      title: 'ASP.NET Core Web API Development',
      description: 'Create robust RESTful APIs with ASP.NET Core Web API',
      videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=4970',
      requirements: ['C# programming', 'HTTP concepts', 'JSON understanding'],
      outcomes: ['Build RESTful APIs', 'API documentation', 'Authentication', 'Database integration'],
      duration: 100,
      level: 'INTERMEDIATE',
      instructor: 'Mike Chen',
      rating: 4.7,
      students: 312,
      lessonsCount: 10,
      category: 'API Development',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=4970'
    }
  })

  const course4 = await prisma.course.create({
    data: {
      code: 'PRM392',
      name: 'Java Android App Development',
      title: 'Complete Android App Development with Java',
      description: 'Develop native Android applications using Java in Android Studio',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
      requirements: ['Java programming', 'Android Studio', 'XML basics'],
      outcomes: ['Build Android apps', 'UI/UX design', 'Database integration', 'App deployment'],
      duration: 150,
      level: 'ADVANCED',
      instructor: 'David Kim',
      rating: 4.6,
      students: 480,
      lessonsCount: 15,
      category: 'Mobile Development',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731'
    }
  })

  const course5 = await prisma.course.create({
    data: {
      code: 'SWP',
      name: 'Software Web App Project',
      title: 'Full-Stack Web Application Project',
      description: 'Complete mentorship for full-stack web application projects',
      videoUrl: 'https://www.youtube.com/embed/xCkTxrIAdoU?si=6zn7jksAHzOnx6m8&start=2163',
      requirements: ['Programming fundamentals', 'Database knowledge', 'Web technologies'],
      outcomes: ['Full-stack development', 'Project management', 'Team collaboration', 'Real-world experience'],
      duration: 200,
      level: 'ADVANCED',
      instructor: 'Alex Rodriguez',
      rating: 4.8,
      students: 156,
      lessonsCount: 20,
      category: 'Full-Stack Development',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/xCkTxrIAdoU?si=6zn7jksAHzOnx6m8&start=2163'
    }
  })

  // Create additional sample courses
  const course6 = await prisma.course.create({
    data: {
      code: 'MONGODB-AGG',
      name: 'MongoDB Aggregation',
      title: 'MongoDB Aggregation Pipeline',
      description: 'Master MongoDB aggregation pipeline with real-world examples and advanced techniques for data processing',
      videoUrl: 'https://www.youtube.com/embed/CB9G5Dvv-EE',
      requirements: ['Basic MongoDB knowledge', 'JavaScript fundamentals', 'JSON understanding'],
      outcomes: ['Master aggregation pipeline', 'Data processing techniques', 'Performance optimization', 'Real-world examples'],
      duration: 480, // 8 hours
      level: 'INTERMEDIATE',
      instructor: 'David Kim',
      rating: 4.6,
      students: 480,
      lessonsCount: 30,
      category: 'Database',
      price: 89.0,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=2070&q=80',
      previewUrl: 'https://www.youtube.com/embed/CB9G5Dvv-EE'
    }
  })

  const course7 = await prisma.course.create({
    data: {
      code: 'REACT-HOOKS',
      name: 'React Hooks',
      title: 'Complete Guide to React Hooks',
      description: 'Learn how to use React Hooks effectively with practical examples and best practices for modern React development',
      videoUrl: 'https://www.youtube.com/embed/dpw9EHDh2bM',
      requirements: ['JavaScript ES6+', 'Basic React knowledge', 'Node.js installed'],
      outcomes: ['Master React Hooks', 'State management', 'Custom hooks', 'Performance optimization'],
      duration: 360, // 6 hours
      level: 'INTERMEDIATE',
      instructor: 'Emma Wilson',
      rating: 4.4,
      students: 623,
      lessonsCount: 25,
      category: 'Frontend Development',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/dpw9EHDh2bM'
    }
  })

  const course8 = await prisma.course.create({
    data: {
      code: 'NODE-PERF',
      name: 'Node.js Performance',
      title: 'Node.js Performance Optimization',
      description: 'Discover advanced techniques to optimize your Node.js applications for better performance and scalability',
      videoUrl: 'https://www.youtube.com/embed/7nafaH9SddU',
      requirements: ['Node.js basics', 'JavaScript knowledge', 'Understanding of async programming'],
      outcomes: ['Performance optimization', 'Memory management', 'Scalability techniques', 'Monitoring and debugging'],
      duration: 300, // 5 hours
      level: 'ADVANCED',
      instructor: 'Michael Brown',
      rating: 4.7,
      students: 298,
      lessonsCount: 18,
      category: 'Backend Development',
      price: 94.99,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/7nafaH9SddU'
    }
  })

  // Create sample lessons for PRN212
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course1.id,
        title: 'Introduction to WPF',
        content: 'Learn the basics of Windows Presentation Foundation and its architecture.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008',
        duration: 45,
        order: 1
      },
      {
        courseId: course1.id,
        title: 'XAML Fundamentals',
        content: 'Master XAML syntax and understand how to create user interfaces.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=3000',
        duration: 60,
        order: 2
      },
      {
        courseId: course1.id,
        title: 'MVVM Pattern',
        content: 'Implement the Model-View-ViewModel pattern for better code organization.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=4000',
        duration: 75,
        order: 3
      }
    ]
  })

  // Create sample lessons for PRN222
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course2.id,
        title: 'Razor Pages Basics',
        content: 'Introduction to ASP.NET Core Razor Pages framework.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=6936',
        duration: 50,
        order: 1
      },
      {
        courseId: course2.id,
        title: 'Database Integration',
        content: 'Connect your Razor Pages application to a database using Entity Framework.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=8000',
        duration: 65,
        order: 2
      }
    ]
  })

  // Create sample blog posts (rich data)
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Complete Guide to React Hooks in 2024',
        excerpt: 'Learn how to use React Hooks effectively with practical examples and best practices for modern React development.',
        content: 'React Hooks have revolutionized how we write React components... (truncated for seed)',
        authorId: adminUser.id,
        category: 'React',
        tags: ['React', 'JavaScript', 'Frontend'],
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-15'),
        featured: true,
        views: 1250,
        readTime: 8,
        likes: 89
      },
      {
        title: 'Node.js Performance Optimization Techniques',
        excerpt: 'Discover advanced techniques to optimize your Node.js applications for better performance and scalability.',
        content: 'Performance optimization is crucial for Node.js applications... (truncated for seed)',
        authorId: adminUser.id,
        category: 'Node.js',
        tags: ['Node.js', 'Performance', 'Backend'],
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-12'),
        featured: true,
        views: 980,
        readTime: 12,
        likes: 57
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Which?',
        excerpt: 'A comprehensive comparison between CSS Grid and Flexbox to help you choose the right layout method for your projects.',
        content: 'CSS Grid and Flexbox are both powerful layout systems... (truncated for seed)',
        authorId: adminUser.id,
        category: 'CSS',
        tags: ['CSS', 'Layout', 'Frontend'],
        featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-10'),
        featured: false,
        views: 750,
        readTime: 6,
        likes: 34
      },
      {
        title: 'TypeScript Best Practices for Large Projects',
        excerpt: 'Learn the essential TypeScript best practices that will help you build maintainable and scalable applications.',
        content: 'TypeScript has become the standard for large-scale JavaScript projects... (truncated for seed)',
        authorId: adminUser.id,
        category: 'TypeScript',
        tags: ['TypeScript', 'JavaScript', 'Best Practices'],
        featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-08'),
        featured: false,
        views: 620,
        readTime: 10,
        likes: 41
      },
      {
        title: 'MongoDB Aggregation Pipeline Deep Dive',
        excerpt: 'Master MongoDB aggregation pipeline with real-world examples and advanced techniques for data processing.',
        content: 'MongoDB aggregation pipeline is a powerful tool for data processing... (truncated for seed)',
        authorId: adminUser.id,
        category: 'MongoDB',
        tags: ['MongoDB', 'Database', 'Backend'],
        featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-05'),
        featured: false,
        views: 480,
        readTime: 15,
        likes: 22
      },
      {
        title: 'Next.js 14 App Router Complete Guide',
        excerpt: 'Everything you need to know about Next.js 14 App Router, from basic setup to advanced features and optimization.',
        content: 'Next.js 14 introduces the new App Router with many improvements... (truncated for seed)',
        authorId: adminUser.id,
        category: 'Next.js',
        tags: ['Next.js', 'React', 'Full Stack'],
        featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        isPublished: true,
        publishedAt: new Date('2024-01-03'),
        featured: false,
        views: 890,
        readTime: 18,
        likes: 65
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📚 Created ${8} courses`)
  console.log(`📝 Created ${6} blog posts`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

