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
      price: 400000,
      originalPrice: 500000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/WPF_4_1ff72da2f7.png',
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
      price: 400000,
      originalPrice: 500000,
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
      price: 400000,
      originalPrice: 500000,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=4970'
    }
  })

  const course4 = await prisma.course.create({
    data: {
      code: 'PRM392',
      name: 'Java/Kotlin Android App Development',
      title: 'Complete Android App Development with Java',
      description: 'Develop native Android applications using Java/Kotlin in Android Studio',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
      requirements: ['Java programming', 'Android Studio', 'XML basics', 'Kotlin programming'],
      outcomes: ['Build Android apps', 'UI/UX design', 'Database integration', 'App deployment', 'Setup SupabaseDB & LocalDB', 'Payment Portal', 'Fundamental Concept'],
      duration: 150,
      level: 'ADVANCED',
      instructor: 'Quoc Hoang',
      rating: 4.6,
      students: 480,
      lessonsCount: 25,
      category: 'Mobile Development',
      price: 400000,
      originalPrice: 500000,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      previewUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731'
    }
  })

  // Create curriculum sections for PRN212
  const prn212Section1 = await prisma.curriculumSection.create({
    data: {
      courseId: course1.id,
      title: 'Introduction to WPF',
      order: 1
    }
  })

  const prn212Section2 = await prisma.curriculumSection.create({
    data: {
      courseId: course1.id,
      title: 'XAML and UI Design',
      order: 2
    }
  })

  const prn212Section3 = await prisma.curriculumSection.create({
    data: {
      courseId: course1.id,
      title: 'MVVM Pattern and Data Binding',
      order: 3
    }
  })

  // Create lessons for PRN212 with curriculum sections (now include description and notes)
  const prn212Lessons = await prisma.$transaction([
    prisma.lesson.create({
      data: {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'What is WPF?',
        content: 'Learn the basics of Windows Presentation Foundation and its architecture.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008',
        duration: 15,
        order: 1,
        type: 'VIDEO',
      }
    }),
    prisma.lesson.create({
      data: {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'Setting up WPF Project',
        content: 'Learn how to create and configure a new WPF project in Visual Studio.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2500',
        duration: 20,
        order: 2,
        type: 'VIDEO'
      }
    }),
    prisma.lesson.create({
      data: {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'WPF Architecture Overview',
        content: 'Understand the core components and architecture of WPF applications.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=3000',
        duration: 25,
        order: 3,
        type: 'VIDEO'
      }
    }),
  ])

  // Create curriculum sections for PRN222
  const prn222Section1 = await prisma.curriculumSection.create({
    data: {
      courseId: course2.id,
      title: 'Razor Pages Fundamentals',
      order: 1
    }
  })

  const prn222Section2 = await prisma.curriculumSection.create({
    data: {
      courseId: course2.id,
      title: 'Database Integration',
      order: 2
    }
  })

  const prn222Section3 = await prisma.curriculumSection.create({
    data: {
      courseId: course2.id,
      title: 'Authentication & Authorization',
      order: 3
    }
  })

  // Create lessons for PRN222 with curriculum sections
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section1.id,
        title: 'Introduction to Razor Pages',
        content: 'Introduction to ASP.NET Core Razor Pages framework.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=6936',
        duration: 20,
        order: 1,
        type: 'VIDEO'
      },
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section1.id,
        title: 'Page Model and Code-Behind',
        content: 'Learn about PageModel and how to handle page logic.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=7500',
        duration: 25,
        order: 2,
        type: 'VIDEO'
      },
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section1.id,
        title: 'Razor Syntax and HTML Helpers',
        content: 'Master Razor syntax and use HTML helpers effectively.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=8000',
        duration: 30,
        order: 3,
        type: 'VIDEO'
      },
    ]
  })

  // Enrich ALL lessons without loops: set a default description and notes for all (raw SQL for compatibility)
  await prisma.$executeRawUnsafe(
    "UPDATE \"lessons\" SET description = 'Lesson overview and best practices'"
  )
  await prisma.$executeRawUnsafe(
    "UPDATE \"lessons\" SET notes = ARRAY['Key points','Review examples','Practice exercises']::text[]"
  )

  // Seed three resources for every lesson using single SQL insert-selects (no loops)
  await prisma.$executeRawUnsafe(
    'INSERT INTO "lesson_resources" ("id","lessonId","title","type","sizeText","url","order","createdAt","updatedAt")\n     SELECT CONCAT(\'lr_\', md5(random()::text || clock_timestamp()::text)), l.id, CONCAT(\'Slides - \', l.title), \'pdf\', \'2.0 MB\', \'https://www.google.com\', 1, NOW(), NOW() FROM "lessons" l'
  )

  await prisma.$executeRawUnsafe(
    'INSERT INTO "lesson_resources" ("id","lessonId","title","type","sizeText","url","order","createdAt","updatedAt")\n     SELECT CONCAT(\'lr_\', md5(random()::text || clock_timestamp()::text)), l.id, CONCAT(\'Project Files - \', l.title), \'zip\', \'1.2 MB\', \'https://www.google.com\', 2, NOW(), NOW() FROM "lessons" l'
  )

  await prisma.$executeRawUnsafe(
    'INSERT INTO "lesson_resources" ("id","lessonId","title","type","sizeText","url","order","createdAt","updatedAt")\n     SELECT CONCAT(\'lr_\', md5(random()::text || clock_timestamp()::text)), l.id, CONCAT(\'Cheatsheet - \', l.title), \'pdf\', \'640 KB\', \'https://www.google.com\', 3, NOW(), NOW() FROM "lessons" l'
  )

  // Create curriculum sections for PRN232 (Web API)
  const prn232Section1 = await prisma.curriculumSection.create({
    data: {
      courseId: course3.id,
      title: 'Web API Fundamentals',
      order: 1
    }
  })

  const prn232Section2 = await prisma.curriculumSection.create({
    data: {
      courseId: course3.id,
      title: 'Controllers and Routing',
      order: 2
    }
  })

  const prn232Section3 = await prisma.curriculumSection.create({
    data: {
      courseId: course3.id,
      title: 'Data Access and Validation',
      order: 3
    }
  })

  const prn232Section4 = await prisma.curriculumSection.create({
    data: {
      courseId: course3.id,
      title: 'Authentication and Security',
      order: 4
    }
  })

  const prn232Section5 = await prisma.curriculumSection.create({
    data: {
      courseId: course3.id,
      title: 'API Documentation and Testing',
      order: 5
    }
  })

  // Create a couple of PRN232 lessons with notes
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section1.id,
        title: 'Introduction to Web APIs',
        content: 'Learn what Web APIs are and how they work in modern applications.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=4970',
        duration: 20,
        order: 1,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section1.id,
        title: 'RESTful API Principles',
        content: 'Understand REST principles and HTTP methods for API design.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=5500',
        duration: 25,
        order: 2,
        type: 'VIDEO'
      },
    ]
  })

  // Create curriculum sections for PRM392 (Android Development)
const prm392Section1 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Introduction to Android Development',
    order: 1,
  },
});
const prm392Section2 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Kotlin Fundamentals',
    order: 2,
  },
});
const prm392Section3 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'UI Design with XML',
    order: 3,
  },
});
const prm392Section4 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'App Components: Activities and Intents',
    order: 4,
  },
});
const prm392Section5 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'App Components: Services, Broadcast Receivers, and Content Providers',
    order: 5,
  },
});
const prm392Section6 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Data Storage',
    order: 6,
  },
});
const prm392Section7 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Version Control with Git',
    order: 7,
  },
});
const prm392Section8 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Networking',
    order: 8,
  },
});
const prm392Section9 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Asynchronism with Coroutines',
    order: 9,
  },
});
const prm392Section10 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'UI Design with Jetpack Compose',
    order: 10,
  },
});
const prm392Section11 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'App Architecture and Design Patterns',
    order: 11,
  },
});
const prm392Section12 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Testing and Debugging',
    order: 12,
  },
});
const prm392Section13 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'Common Services: Firebase',
    order: 13,
  },
});
const prm392Section14 = await prisma.curriculumSection.create({
  data: {
    courseId: course4.id,
    title: 'App Distribution',
    order: 14,
  },
});
// Keep existing lesson batches for PRM392
await prisma.lesson.createMany({
  data: [
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section1.id,
      title: 'Introduction to Android Development',
      content: 'Overview of Android, its history, and ecosystem. Setting up the development environment (Android Studio, SDK).',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
      duration: 25,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section2.id,
      title: 'Kotlin Fundamentals: Variables, Data Types, and Operators',
      content: 'Learn about Variables, Data Types, and Operators.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6200',
      duration: 30,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section2.id,
      title: 'Kotlin Fundamentals: Control Flow',
      content: 'Learn about Control flow (if/else, loops).',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6700',
      duration: 20,
      order: 2,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section2.id,
      title: 'Kotlin Fundamentals: Functions and Classes',
      content: 'Learn about Functions and Classes.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7200',
      duration: 35,
      order: 3,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section3.id,
      title: 'UI Design with XML Layouts',
      content: 'Learn about Creating user interfaces using XML layout files.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7700',
      duration: 30,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section3.id,
      title: 'Views and ViewGroups',
      content: 'Learn about different views and view groups in Android.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8200',
      duration: 40,
      order: 2,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section3.id,
      title: 'Material Design',
      content: 'Implement Material Design principles in your app.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8700',
      duration: 35,
      order: 3,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section4.id,
      title: 'Activity Lifecycle',
      content: 'Understand the Android activity lifecycle and its methods.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9200',
      duration: 30,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section4.id,
      title: 'Intent and Navigation',
      content: 'Use intents for navigation between activities.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9700',
      duration: 40,
      order: 2,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section4.id,
      title: 'Fragments',
      content: 'Create and manage fragments for flexible UI design.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10200',
      duration: 25,
      order: 3,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section6.id,
      title: 'SharedPreferences',
      content: 'Store simple data using SharedPreferences.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10700',
      duration: 45,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section6.id,
      title: 'SQLite Database',
      content: 'Implement local database using SQLite.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11200',
      duration: 50,
      order: 2,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section6.id,
      title: 'Room Database',
      content: 'Use Room persistence library for database operations.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11700',
      duration: 40,
      order: 3,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section8.id,
      title: 'HTTP Requests',
      content: 'Make HTTP requests using Retrofit and OkHttp.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=12200',
      duration: 30,
      order: 1,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section8.id,
      title: 'JSON Parsing',
      content: 'Parse JSON data using Gson and other libraries.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=12700',
      duration: 35,
      order: 2,
      type: 'VIDEO',
    },
    {
      courseId: course4.id,
      curriculumSectionId: prm392Section14.id,
      title: 'App Signing and Release',
      content: 'Sign your app and prepare for release on Google Play Store.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=12700',
      duration: 35,
      order: 1,
      type: 'VIDEO',
    },
  ],
});

  // Create sample blog posts
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
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📚 Created ${4} courses`)
  console.log(`📖 Created curriculum sections and lessons for courses`)
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