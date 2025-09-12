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

  // Create curriculum sections for PRM392 (Android Development) redesigned for 22 topics
  const prm392S1 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Android Basics', order: 1 }
  })
  const prm392S2 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'UI Components & Layout', order: 2 }
  })
  const prm392S3 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Activities, Intents & Fragments', order: 3 }
  })
  const prm392S4 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Lists, Media & Menus', order: 4 }
  })
  const prm392S5 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Permissions & Notifications', order: 5 }
  })
  const prm392S6 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Data & Content', order: 6 }
  })
  const prm392S7 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Background & Concurrency', order: 7 }
  })
  const prm392S8 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Location & Maps', order: 8 }
  })
  const prm392S9 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Networking', order: 9 }
  })
  const prm392S10 = await prisma.curriculumSection.create({
    data: { courseId: course4.id, title: 'Architecture', order: 10 }
  })

  // Seed 22 lessons mapped to the provided topics (per-object, no loops)
  const androidOverview = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S1.id,
      title: 'Android Overview',
      content: 'Overview of Android platform, history, ecosystem, and development setup.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5731',
      duration: 20,
      order: 1,
      type: 'VIDEO',
    }
  })
  const androidStructure = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S1.id,
      title: 'Android Structure',
      content: 'Android system architecture: Linux kernel, HAL, libraries, runtime, framework, apps.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=5900',
      duration: 20,
      order: 2,
      type: 'VIDEO',
    }
  })
  const simpleWidgets = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S2.id,
      title: 'Simple Widgets',
      content: 'Core widgets: TextView, EditText, Button, ImageView, and basic interactions.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6100',
      duration: 25,
      order: 3,
      type: 'VIDEO',
    }
  })


  const constraintLayout = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S2.id,
      title: 'ConstraintLayout',
      content: 'Build responsive UIs using ConstraintLayout: constraints, chains, guidelines.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6400',
      duration: 25,
      order: 4,
      type: 'VIDEO',
    }
  })

  const styleTheme = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S2.id,
      title: 'Style & Theme',
      content: 'Apply styles and themes; dark mode, color schemes, and material theming.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=6700',
      duration: 25,
      order: 5,
      type: 'VIDEO',
    }
  })
  
  const bindingViews = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S2.id,
      title: 'Binding Views and Handling Actions',
      content: 'View binding/data binding, event listeners, click handling, and form validation.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7000',
      duration: 30,
      order: 6,
      type: 'VIDEO',
    }
  })
  
  const activityLifecycle = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S3.id,
      title: 'Activity Lifecycle',
      content: 'Lifecycle callbacks (onCreate to onDestroy), state handling, and best practices.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7300',
      duration: 25,
      order: 7,
      type: 'VIDEO',
    }
  })
 
  const intentsLinkingActivities = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S3.id,
      title: 'Intents and Linking Activities',
      content: 'Explicit/implicit intents, passing data, and navigation between activities.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7600',
      duration: 25,
      order: 8,
      type: 'VIDEO',
    }
  })
 
  const fractment = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S3.id,
      title: 'Fragment',
      content: 'Create and manage fragments; fragment transactions, back stack, communication.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=7900',
      duration: 25,
      order: 9,
      type: 'VIDEO',
    }
  })

  const recyclerView = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S4.id,
      title: 'RecyclerView',
      content: 'Lists with RecyclerView: adapters, view holders, item decoration, diff util.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8200',
      duration: 30,
      order: 10,
      type: 'VIDEO',
    }
  })

  const displayImageMenu = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S4.id,
      title: 'Display Image & Menu',
      content: 'Load/display images, options/context menus, toolbar and menu actions.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8500',
      duration: 30,
      order: 11,
      type: 'VIDEO',
    }
  })

  const androidPermission = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S5.id,
      title: 'Android Permission',
      content: 'Runtime permissions, permission checks, and user flows.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=8800',
      duration: 20,
      order: 12,
      type: 'VIDEO',
    }
  })

  const androidNotification = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S5.id,
      title: 'Android Notification',
      content: 'Notification channels, styles, actions, and background notifications.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9000',
      duration: 25,
      order: 13,
      type: 'VIDEO',
    }
  })

  const dataStorageDatabase = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S6.id,
      title: 'Data Storage & Database',
      content: 'SharedPreferences, SQLite, and Room for structured local storage.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9300',
      duration: 35,
      order: 14,
      type: 'VIDEO',
    }
  })

  const contentProviders = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S6.id,
      title: 'Content Providers',
      content: 'Share data between apps with content providers, URIs, and permissions.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9600',
      duration: 30,
      order: 15,
      type: 'VIDEO',
    }
  })

  const service = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S7.id,
      title: 'Service',
      content: 'Foreground/background services, lifecycle, and use cases.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=9900',
      duration: 25,
      order: 16,
      type: 'VIDEO',
    }
  })
 
  const multithread = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S7.id,
      title: 'Multithread',
      content: 'Threads, Handlers, AsyncTask alternatives, and coroutines basics.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10200',
      duration: 30,
      order: 17,
      type: 'VIDEO',
    }
  })
  const maps = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S8.id,
      title: 'Maps',
      content: 'Google Maps integration, markers, geocoding, and user location.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10500',
      duration: 30,
      order: 18,
      type: 'VIDEO',
    }
  })
  const webservices = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S9.id,
      title: 'Webservices',
      content: 'REST web services, Retrofit setup, JSON parsing, and error handling.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=10800',
      duration: 35,
      order: 19,
      type: 'VIDEO',
    }
  })
  const sockets = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S9.id,
      title: 'Sockets',
      content: 'TCP/UDP sockets, realtime communication basics, and threading concerns.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11100',
      duration: 30,
      order: 20,
      type: 'VIDEO',
    }
  })
  const broadcastReceiver = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S5.id,
      title: 'Broadcast Receiver',
      content: 'Receive system/app broadcasts, dynamic vs static receivers, and intents.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11400',
      duration: 25,
      order: 21,
      type: 'VIDEO',
    }
  })
  const androidArchitecture = await prisma.lesson.create({
    data: {
      courseId: course4.id,
      curriculumSectionId: prm392S10.id,
      title: 'Android Architecture',
      content: 'App architecture patterns (MVVM), architecture components, and best practices.',
      videoUrl: 'https://www.youtube.com/embed/dgdgNw4VtC0?si=lbMTmKXtM93dOY3o&start=11700',
      duration: 35,
      order: 22,
      type: 'VIDEO',
    }
  })

  // Add notes and sample resources for first two PRM392 lessons (use created IDs directly)
  await prisma.lesson.update({
    where: { id: androidOverview.id },
    data: {
      notes: ['Mục tiêu bài học', 'Khái quát nền tảng Android', 'Thiết lập môi trường']
    }
  })
  await prisma.lesson.update({
    where: { id: androidStructure.id },
    data: {
      notes: [
        'Cấu trúc dự án Android',
        'Xây dựng ứng dụng Android đầu tiên',
        'Các thành phần ứng dụng Android'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: simpleWidgets.id },
    data: {
      notes: [
        'Giới thiệu Views, ViewGroups và phân cấp View',
        'Các đơn vị đo lường trong Android (px, dp, sp, dpi)',
        'Các loại Widget UI phổ biến',
        'Sử dụng ViewGroups để bố cục'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: constraintLayout.id },
    data: {
      notes: [
        'Giới thiệu ConstraintLayout và ưu điểm',
        'Thuộc tính và cách tạo Constraints (Anchors, Bias)',
        'Sử dụng Chains để căn chỉnh và phân phối View',
        'Sử dụng Guideline, Barrier, Flow để thiết kế UI phức tạp'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: styleTheme.id },
    data: {
      notes: [
        'Khái niệm Style trong Android và cách định nghĩa, sử dụng',
        'Kế thừa Style và bảng màu Style',
        'Khái niệm Theme và cách ứng dụng cho Activity/Application',
        'Tùy chỉnh Theme cho dự án Android'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: bindingViews.id },
    data: {
      notes: [
        'Liên kết Views trong code Java/Kotlin',
        'Các cách xử lý sự kiện UI (onClick, onTouch, v.v.)',
        'Các Listener sự kiện phổ biến cho Views và AdapterView',
        'Sử dụng các thành phần điều khiển đầu vào (EditText, CheckBox, RadioButton, Switch, Spinner)'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: activityLifecycle.id },
    data: {
      notes: [
        'Khái niệm và định nghĩa Activity',
        'Vòng đời của Activity và các trạng thái',
        'Các hàm Callback chính trong vòng đời Activity (onCreate, onStart, onResume, onPause, onStop, onDestroy)',
        'Các phương thức liên quan đến vòng đời Activity (finish, onBackPressedDispatcher)'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: intentsLinkingActivities.id },
    data: {
      notes: [
        'Khái niệm Intent và vai trò',
        'Các loại Intent: Explicit và Implicit Intent',
        'Truyền dữ liệu giữa các Activity bằng Extras',
        'Điều hướng giữa các Activity và Activity Stack (startActivity, startActivityForResult)'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: recyclerView.id },
    data: {
      notes: [
        'RecyclerView là gì và ưu điểm (tái sử dụng View)',
        'Các thành phần chính của RecyclerView (LayoutManager, Adapter, ViewHolder)',
        'Các bước triển khai RecyclerView',
        'Sử dụng RecyclerView để hiển thị danh sách dữ liệu'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: displayImageMenu.id },
    data: {
      notes: [
        'Sử dụng ImageView và thuộc tính scaleType',
        'Hiển thị hình ảnh từ tài nguyên cục bộ và URL (Picasso, Glide)',
        'Các loại Menu trong Android (Options Menu, Context Menu, Popup Menu)',
        'Các bước triển khai Options Menu và Context Menu'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: androidPermission.id },
    data: {
      notes: [
        'Quyền truy cập trong Android (Android Permission)',
        'Phân loại quyền: Normal Permissions và Dangerous Permissions',
        'Các nhóm quyền và cách bật/tắt quyền thủ công',
        'Quy trình xử lý và yêu cầu quyền thời gian chạy'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: androidNotification.id },
    data: {
      notes: [
        'Thông báo (Notification) là gì và cấu trúc',
        'Kênh thông báo (Notification channels) và tầm quan trọng',
        'Tạo kênh thông báo và mức độ quan trọng/ưu tiên',
        'Tạo, hiển thị và xử lý các hành động của thông báo'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: dataStorageDatabase.id },
    data: {
      notes: [
        'Lưu trữ dữ liệu với Shared Preferences',
        'Lưu trữ tệp nội bộ và bên ngoài (Internal/External Files)',
        'Cơ sở dữ liệu SQLite: khái niệm và các thao tác SQL cơ bản',
        'Cơ sở dữ liệu Room: khái niệm và các bước triển khai'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: contentProviders.id },
    data: {
      notes: [
        'Content Provider là gì và vai trò',
        'Content Resolver là gì và cách Content Provider/Resolver hoạt động cùng nhau',
        'Các thành phần của một Content Provider (Contract, URI, MIME Type)',
        'Triển khai Content Provider và cấp quyền trong Manifest'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: service.id },
    data: {
      notes: [
        'Service là gì và khi nào sử dụng',
        'Các loại Service: Started Service và Bound Service',
        'Vòng đời của Service và các hàm Callback',
        'Foreground Services và giới hạn của Background Services',
        'Intent Service'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: multithread.id },
    data: {
      notes: [
        'Main Thread (UI Thread) và các giới hạn',
        'Worker Thread và các tác vụ nền',
        'Hai quy tắc quan trọng cho Android threads',
        'Các phương pháp tạo Worker Thread và cập nhật UI (runOnUiThread, Executor)'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: fractment.id },
    data: {
      notes: [
        'Fragment là gì và ưu điểm (tái sử dụng UI, hỗ trợ nhiều kích thước màn hình)',
        'Cách tạo và thêm Fragment vào Activity (tĩnh và động)',
        'Tương tác giữa Fragment và Activity',
        'Vòng đời của Fragment và các lớp con Fragment phổ biến'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: maps.id },
    data: {
      notes: [
        'Các bước thêm Google Map vào ứng dụng Android (Play Services, MapFragment, API Key, Permissions)',
        'Các phương thức của Google Map (đặt camera, markers, lines)',
        'Truy cập vị trí hiện tại của điện thoại',
        'Sử dụng LocationManager và các sự kiện cập nhật vị trí'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: webservices.id },
    data: {
      notes: [
        'Giới thiệu Web Services và các phương thức HTTP (GET, POST, PUT, DELETE)',
        'Sử dụng Retrofit để gọi API trong Android',
        'Các Annotation trong Retrofit (@Body, @Path, @Url, @Query, @Field)',
        'Các bước triển khai Retrofit: API Interface, Model, Retrofit instance và Call'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: sockets.id },
    data: {
      notes: [
        'Khái niệm Socket và giao tiếp Client/Server',
        'Các phương thức lập trình Socket (socket, bind, listen, connect, accept, read, write)',
        'Sử dụng InputStream và OutputStream trong Java để đọc/ghi dữ liệu',
        'Các bước tạo chương trình Server và Client bằng Socket'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: broadcastReceiver.id },
    data: {
      notes: [
        'Khái niệm Broadcast và các loại (System broadcast, Custom broadcast)',
        'Broadcast Receiver là gì và vai trò',
        'Cách triển khai Broadcast Receiver: tạo và đăng ký (Static, Dynamic)',
        'Các loại Custom Broadcast (Ordered, Normal, Local Broadcast)'
      ]
    }
  }),
  await prisma.lesson.update({
    where: { id: androidArchitecture.id },
    data: {
      notes: [
        'Giới thiệu các mô hình kiến trúc trong Android',
        'Mô hình MVC (Model-View-Controller) và các thành phần, ưu nhược điểm',
        'Mô hình MVP (Model-View-Presenter) và các thành phần, ưu nhược điểm',
        'Mô hình MVVM (Model-View-ViewModel) và các thành phần, ưu nhược điểm'
      ]
    }
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: androidOverview.id,
        title: 'Slides - Android Overview',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: androidOverview.id,
        title: 'Sample Project - HelloAndroid',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: androidOverview.id,
        title: 'Reading - Android History',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: androidStructure.id,
        title: 'Slides - AndroidStructure',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: androidStructure.id,
        title: 'Sample Project - AndroidStructure',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: androidStructure.id,
        title: 'Reading - AndroidStructure',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: simpleWidgets.id,
        title: 'Slides - SimpleWidgets',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: simpleWidgets.id,
        title: 'Sample Project - SimpleWidgets',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: simpleWidgets.id,
        title: 'Reading - SimpleWidgets',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: constraintLayout.id,
        title: 'Slides - ConstraintLayout',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: constraintLayout.id,
        title: 'Sample Project - ConstraintLayout',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: constraintLayout.id,
        title: 'Reading - ConstraintLayout',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: styleTheme.id,
        title: 'Slides - StyleTheme',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: styleTheme.id,
        title: 'Sample Project - StyleTheme',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: styleTheme.id,
        title: 'Reading - StyleTheme',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: bindingViews.id,
        title: 'Slides - BindingViews',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: bindingViews.id,
        title: 'Sample Project - BindingViews',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: bindingViews.id,
        title: 'Reading - BindingViews',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: activityLifecycle.id,
        title: 'Slides - ActivityLifecycle',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: activityLifecycle.id,
        title: 'Sample Project - ActivityLifecycle',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: activityLifecycle.id,
        title: 'Reading - ActivityLifecycle',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: intentsLinkingActivities.id,
        title: 'Slides - IntentsLinkingActivities',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: intentsLinkingActivities.id,
        title: 'Sample Project - IntentsLinkingActivities',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: intentsLinkingActivities.id,
        title: 'Reading - IntentsLinkingActivities',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: fractment.id,
        title: 'Slides - Fractment',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: fractment.id,
        title: 'Sample Project - Fractment',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: fractment.id,
        title: 'Reading - Fractment',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: recyclerView.id,
        title: 'Slides - RecyclerView',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: recyclerView.id,
        title: 'Sample Project - RecyclerView',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: recyclerView.id,
        title: 'Reading - RecyclerView',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: displayImageMenu.id,
        title: 'Slides - DisplayImageMenu',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: displayImageMenu.id,
        title: 'Sample Project - DisplayImageMenu',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: displayImageMenu.id,
        title: 'Reading - DisplayImageMenu',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: androidPermission.id,
        title: 'Slides - AndroidPermission',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: androidPermission.id,
        title: 'Sample Project - AndroidPermission',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: androidPermission.id,
        title: 'Reading - AndroidPermission',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: androidNotification.id,
        title: 'Slides - AndroidNotification',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: androidNotification.id,
        title: 'Sample Project - AndroidNotification',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: androidNotification.id,
        title: 'Reading - AndroidNotification',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: dataStorageDatabase.id,
        title: 'Slides - DataStorageDatabase',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: dataStorageDatabase.id,
        title: 'Sample Project - DataStorageDatabase',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: dataStorageDatabase.id,
        title: 'Reading - DataStorageDatabase',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })


  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: contentProviders.id,
        title: 'Slides - ContentProviders',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: contentProviders.id,
        title: 'Sample Project - ContentProviders',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: contentProviders.id,
        title: 'Reading - ContentProviders',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })

  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: contentProviders.id,
        title: 'Slides - ContentProviders',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: contentProviders.id,
        title: 'Sample Project - ContentProviders',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: contentProviders.id,
        title: 'Reading - ContentProviders',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: service.id,
        title: 'Slides - Service',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: service.id,
        title: 'Sample Project - Service',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: service.id,
        title: 'Reading - Service',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: multithread.id,
        title: 'Slides - Multithread',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: multithread.id,
        title: 'Sample Project - Multithread',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: multithread.id,
        title: 'Reading - Multithread',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: maps.id,
        title: 'Slides - Maps',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: maps.id,
        title: 'Sample Project - Maps',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: maps.id,
        title: 'Reading - Maps',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: webservices.id,
        title: 'Slides - Webservices',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: webservices.id,
        title: 'Sample Project - Webservices',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: webservices.id,
        title: 'Reading - Webservices',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: sockets.id,
        title: 'Slides - Sockets',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: sockets.id,
        title: 'Sample Project - Sockets',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: sockets.id,
        title: 'Reading - Sockets',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: broadcastReceiver.id,
        title: 'Slides - BroadcastReceiver',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: broadcastReceiver.id,
        title: 'Sample Project - BroadcastReceiver',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: broadcastReceiver.id,
        title: 'Reading - BroadcastReceiver',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
      }
    ]
  })
  
  await prisma.lessonResource.createMany({
    data: [
      {
        lessonId: androidArchitecture.id,
        title: 'Slides - AndroidArchitecture',
        type: 'pdf',
        sizeText: '1.8 MB',
        url: 'https://example.com/resources/android-overview-slides.pdf',
        order: 1
      },
      {
        lessonId: androidArchitecture.id,
        title: 'Sample Project - AndroidArchitecture',
        type: 'zip',
        sizeText: '850 KB',
        url: 'https://example.com/resources/hello-android.zip',
        order: 2
      },
      {
        lessonId: androidArchitecture.id,
        title: 'Reading - AndroidArchitecture',
        type: 'docx',
        sizeText: '300 KB',
        url: 'https://example.com/resources/android-history.pdf',
        order: 3
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