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
      name: 'Seed Admin',
      role: 'ADMIN'
    }
  })

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      code: 'PRN212',
      name: 'ASP.NET WPF',
      description: 'Master desktop application development with Windows Presentation Foundation',
      videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008',
      requirements: ['Basic C# knowledge', 'Visual Studio', 'Understanding of OOP concepts'],
      outcomes: ['Build desktop applications', 'Understand WPF concepts', 'Master XAML', 'Implement MVVM pattern'],
      duration: 120,
      level: 'INTERMEDIATE'
    }
  })

  const course2 = await prisma.course.create({
    data: {
      code: 'PRN222',
      name: 'ASP.NET Razor Page',
      description: 'Build dynamic web applications using ASP.NET Core Razor Pages',
      videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=6936',
      requirements: ['Basic C# knowledge', 'HTML/CSS fundamentals', 'Visual Studio'],
      outcomes: ['Build web applications', 'Understand Razor Pages', 'Database integration', 'Authentication & Authorization'],
      duration: 90,
      level: 'INTERMEDIATE'
    }
  })

  const course3 = await prisma.course.create({
    data: {
      code: 'PRN232',
      name: 'ASP.NET Web API',
      description: 'Create robust RESTful APIs with ASP.NET Core Web API',
      videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=4970',
      requirements: ['C# programming', 'HTTP concepts', 'JSON understanding'],
      outcomes: ['Build RESTful APIs', 'API documentation', 'Authentication', 'Database integration'],
      duration: 100,
      level: 'INTERMEDIATE'
    }
  })

  const course4 = await prisma.course.create({
    data: {
      code: 'PRM392',
      name: 'Java Android App Development',
      description: 'Develop native Android applications using Java in Android Studio',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
      requirements: ['Java programming', 'Android Studio', 'XML basics'],
      outcomes: ['Build Android apps', 'UI/UX design', 'Database integration', 'App deployment'],
      duration: 150,
      level: 'ADVANCED'
    }
  })

  const course5 = await prisma.course.create({
    data: {
      code: 'SWP',
      name: 'Software Web App Project',
      description: 'Complete mentorship for full-stack web application projects',
      videoUrl: 'https://www.youtube.com/embed/xCkTxrIAdoU?si=6zn7jksAHzOnx6m8&start=2163',
      requirements: ['Programming fundamentals', 'Database knowledge', 'Web technologies'],
      outcomes: ['Full-stack development', 'Project management', 'Team collaboration', 'Real-world experience'],
      duration: 200,
      level: 'ADVANCED'
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

  // Create sample blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Getting Started with ASP.NET Core',
        excerpt: 'A comprehensive guide to building your first ASP.NET Core application.',
        content: 'ASP.NET Core is a cross-platform, high-performance framework for building modern, cloud-based, internet-connected applications. In this post, we\'ll explore the fundamentals and get you started with your first application.',
        authorId: adminUser.id,
        category: 'Programming',
        tags: ['ASP.NET', 'C#', 'Web Development'],
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Mastering WPF: From Beginner to Advanced',
        excerpt: 'Learn how to build professional desktop applications with Windows Presentation Foundation.',
        content: 'Windows Presentation Foundation (WPF) is Microsoft\'s framework for building desktop applications. This comprehensive guide will take you from the basics to advanced concepts like custom controls and animations.',
        authorId: adminUser.id,
        category: 'Desktop Development',
        tags: ['WPF', 'C#', 'Desktop Apps'],
        isPublished: true,
        publishedAt: new Date()
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📚 Created ${5} courses`)
  console.log(`📝 Created ${2} blog posts`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

