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
      originalPrice: 99.99,
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
      price: 69.99,
      originalPrice: 89.99,
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
      originalPrice: 119.99,
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
      originalPrice: 149.99,
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

  // Create lessons for PRN212 with curriculum sections
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'What is WPF?',
        content: 'Learn the basics of Windows Presentation Foundation and its architecture.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2008',
        duration: 15,
        order: 1,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'Setting up WPF Project',
        content: 'Learn how to create and configure a new WPF project in Visual Studio.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=2500',
        duration: 20,
        order: 2,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section1.id,
        title: 'WPF Architecture Overview',
        content: 'Understand the core components and architecture of WPF applications.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=3000',
        duration: 25,
        order: 3,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section2.id,
        title: 'XAML Basics',
        content: 'Master XAML syntax and understand how to create user interfaces.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=3500',
        duration: 30,
        order: 4,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section2.id,
        title: 'Layout Controls',
        content: 'Learn about Grid, StackPanel, and other layout controls in WPF.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=4000',
        duration: 35,
        order: 5,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section2.id,
        title: 'Styling and Templates',
        content: 'Create custom styles and control templates for consistent UI design.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=4500',
        duration: 40,
        order: 6,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section3.id,
        title: 'MVVM Pattern Introduction',
        content: 'Implement the Model-View-ViewModel pattern for better code organization.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=5000',
        duration: 25,
        order: 7,
        type: 'VIDEO'
      },
      {
        courseId: course1.id,
        curriculumSectionId: prn212Section3.id,
        title: 'Data Binding Deep Dive',
        content: 'Master data binding concepts including two-way binding and converters.',
        videoUrl: 'https://www.youtube.com/embed/_XzwkhFngFM?si=-idT8k2cQnDrRDNA&start=5500',
        duration: 30,
        order: 8,
        type: 'VIDEO'
      }
    ]
  })

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
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section2.id,
        title: 'Entity Framework Setup',
        content: 'Set up Entity Framework Core for database operations.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=8500',
        duration: 25,
        order: 4,
        type: 'VIDEO'
      },
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section2.id,
        title: 'CRUD Operations',
        content: 'Implement Create, Read, Update, Delete operations with Razor Pages.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=9000',
        duration: 35,
        order: 5,
        type: 'VIDEO'
      },
      {
        courseId: course2.id,
        curriculumSectionId: prn222Section3.id,
        title: 'User Authentication',
        content: 'Implement user authentication using ASP.NET Core Identity.',
        videoUrl: 'https://www.youtube.com/embed/WI2bdyHatjU?si=rfRWVIjQLtY6mIz5&start=9500',
        duration: 30,
        order: 6,
        type: 'VIDEO'
      }
    ]
  })

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

  // Create lessons for PRN232 with curriculum sections
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
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section2.id,
        title: 'Creating API Controllers',
        content: 'Learn how to create and structure API controllers in ASP.NET Core.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=6000',
        duration: 30,
        order: 3,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section2.id,
        title: 'API Routing and Endpoints',
        content: 'Configure routing and create custom endpoints for your API.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=6500',
        duration: 25,
        order: 4,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section3.id,
        title: 'Entity Framework Integration',
        content: 'Integrate Entity Framework Core with your Web API for data access.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=7000',
        duration: 35,
        order: 5,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section3.id,
        title: 'Model Validation',
        content: 'Implement data validation using Data Annotations and FluentValidation.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=7500',
        duration: 30,
        order: 6,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section4.id,
        title: 'JWT Authentication',
        content: 'Implement JWT-based authentication for your Web API.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=8000',
        duration: 40,
        order: 7,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section4.id,
        title: 'Authorization and Roles',
        content: 'Implement role-based authorization and policy-based security.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=8500',
        duration: 35,
        order: 8,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section5.id,
        title: 'Swagger Documentation',
        content: 'Generate and customize API documentation using Swagger/OpenAPI.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=9000',
        duration: 25,
        order: 9,
        type: 'VIDEO'
      },
      {
        courseId: course3.id,
        curriculumSectionId: prn232Section5.id,
        title: 'API Testing with Postman',
        content: 'Test your API endpoints using Postman and automated testing.',
        videoUrl: 'https://www.youtube.com/embed/B0Xdo9TWhgs?si=F3ZWB6fMaYvWxFzG&start=9500',
        duration: 30,
        order: 10,
        type: 'VIDEO'
      }
    ]
  })

  // Create curriculum sections for PRM392 (Android Development)
  const prm392Section1 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'Android Development Setup',
      order: 1
    }
  })

  const prm392Section2 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'UI/UX Design',
      order: 2
    }
  })

  const prm392Section3 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'Activity Lifecycle and Navigation',
      order: 3
    }
  })

  const prm392Section4 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'Data Storage and Management',
      order: 4
    }
  })

  const prm392Section5 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'Networking and APIs',
      order: 5
    }
  })

  const prm392Section6 = await prisma.curriculumSection.create({
    data: {
      courseId: course4.id,
      title: 'App Deployment',
      order: 6
    }
  })

  // Create lessons for PRM392 with curriculum sections
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section1.id,
        title: 'Android Studio Setup',
        content: 'Install and configure Android Studio development environment.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
        duration: 25,
        order: 1,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section1.id,
        title: 'Creating Your First App',
        content: 'Create and run your first Android application.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6200',
        duration: 30,
        order: 2,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section1.id,
        title: 'Project Structure Overview',
        content: 'Understand Android project structure and key components.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6700',
        duration: 20,
        order: 3,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section2.id,
        title: 'XML Layouts',
        content: 'Create user interfaces using XML layout files.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7200',
        duration: 35,
        order: 4,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section2.id,
        title: 'Views and ViewGroups',
        content: 'Learn about different views and view groups in Android.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7700',
        duration: 30,
        order: 5,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section2.id,
        title: 'Material Design',
        content: 'Implement Material Design principles in your app.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8200',
        duration: 40,
        order: 6,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section3.id,
        title: 'Activity Lifecycle',
        content: 'Understand the Android activity lifecycle and its methods.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8700',
        duration: 35,
        order: 7,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section3.id,
        title: 'Intent and Navigation',
        content: 'Use intents for navigation between activities.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9200',
        duration: 30,
        order: 8,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section3.id,
        title: 'Fragments',
        content: 'Create and manage fragments for flexible UI design.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9700',
        duration: 40,
        order: 9,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section4.id,
        title: 'SharedPreferences',
        content: 'Store simple data using SharedPreferences.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10200',
        duration: 25,
        order: 10,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section4.id,
        title: 'SQLite Database',
        content: 'Implement local database using SQLite.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10700',
        duration: 45,
        order: 11,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section4.id,
        title: 'Room Database',
        content: 'Use Room persistence library for database operations.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11200',
        duration: 50,
        order: 12,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section5.id,
        title: 'HTTP Requests',
        content: 'Make HTTP requests using Retrofit and OkHttp.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11700',
        duration: 40,
        order: 13,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section5.id,
        title: 'JSON Parsing',
        content: 'Parse JSON data using Gson and other libraries.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=12200',
        duration: 30,
        order: 14,
        type: 'VIDEO'
      },
      {
        courseId: course4.id,
        curriculumSectionId: prm392Section6.id,
        title: 'App Signing and Release',
        content: 'Sign your app and prepare for release on Google Play Store.',
        videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=12700',
        duration: 35,
        order: 15,
        type: 'VIDEO'
      }
    ]
  })

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