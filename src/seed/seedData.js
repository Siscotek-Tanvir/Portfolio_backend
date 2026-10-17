import dns from 'node:dns';

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {}

import mongoose from 'mongoose';
import { User } from '../modules/auth/auth.model.js';
import { About } from '../modules/about/about.model.js';
import { Skill } from '../modules/skill/skill.model.js';
import { Project } from '../modules/project/project.model.js';
import { Experience } from '../modules/experience/experience.model.js';
import { Education } from '../modules/education/education.model.js';
import { Testimonial } from '../modules/testimonial/testimonial.model.js';
import { Blog } from '../modules/blog/blog.model.js';
import { Course } from '../modules/course/course.model.js';
import { Settings } from '../modules/settings/settings.model.js';
import { ENV } from '../config/env.js';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(ENV.MONGO_URI);
    console.log('[Seed] Connected successfully.');

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      User.deleteMany(),
      About.deleteMany(),
      Skill.deleteMany(),
      Project.deleteMany(),
      Experience.deleteMany(),
      Education.deleteMany(),
      Testimonial.deleteMany(),
      Blog.deleteMany(),
      Course.deleteMany(),
      Settings.deleteMany(),
    ]);

    // 1. Admin User
    console.log('[Seed] Creating Admin User...');
    await User.create({
      name: 'Tajul Islam Tanvir',
      email: 'mdtanvir7462@gmail.com',
      password: 'Admin@123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });

    // Also support default admin email for quick login
    await User.create({
      name: 'Tajul Islam Tanvir (Admin)',
      email: 'admin@portfolio.com',
      password: 'Admin@123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });

    // 2. About Info
    console.log('[Seed] Creating About Section...');
    await About.create({
      name: 'Tajul Islam Tanvir',
      title: 'Full Stack Developer / Frontend Specialist',
      tagline: 'Accomplished Full Stack Developer specializing in Next.js, React, Node.js, and high-performance web systems.',
      bio: `Accomplished Full Stack Developer with over 2 years of professional experience architecting, modernizing, and deploying high-performance web systems.

Expert in Next.js, React, Node.js, PHP, and SQL/NoSQL databases, with a proven track record of single-handedly engineering enterprise frontend systems (like complex Property Management Systems) and migrating legacy architectures (ASP.NET to Next.js). Adept at driving frontend performance, designing scalable RESTful APIs, and implementing robust state & database management.`,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      resumeUrl: 'https://github.com/MD-TANVIR7462',
      location: 'Chittagong, Bangladesh',
      email: 'mdtanvir7462@gmail.com',
      phone: '+8801998863753',
      yearsOfExperience: 3,
      availabilityStatus: 'Available for hire',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/MD-TANVIR7462' },
        { platform: '2nd GitHub', url: 'https://github.com/Siscotek-Tanvir' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/md-tajul-islam-tanvir-531682278' },
      ],
    });

    // 3. Technical Skills
    console.log('[Seed] Creating Skills...');
    await Skill.create([
      // Frontend
      {
        name: 'Next.js & React.js',
        category: 'Frontend',
        proficiency: 96,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        order: 1,
        isActive: true,
      },
      {
        name: 'TypeScript & JavaScript (ES6+)',
        category: 'Frontend',
        proficiency: 93,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        order: 2,
        isActive: true,
      },
      {
        name: 'Redux Toolkit & RTK Query',
        category: 'Frontend',
        proficiency: 95,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
        order: 3,
        isActive: true,
      },
      {
        name: 'Tailwind CSS & Shadcn UI',
        category: 'Frontend',
        proficiency: 98,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        order: 4,
        isActive: true,
      },
      {
        name: 'Framer Motion & Animations',
        category: 'Frontend',
        proficiency: 90,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg',
        order: 5,
        isActive: true,
      },
      {
        name: 'TanStack Query & AG Grid',
        category: 'Frontend',
        proficiency: 92,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        order: 6,
        isActive: true,
      },

      // Backend
      {
        name: 'Node.js & Express.js',
        category: 'Backend',
        proficiency: 92,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        order: 7,
        isActive: true,
      },
      {
        name: 'RESTful APIs & JWT Auth',
        category: 'Backend',
        proficiency: 94,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        order: 8,
        isActive: true,
      },
      {
        name: 'PHP & Modern Scripting',
        category: 'Backend',
        proficiency: 82,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
        order: 9,
        isActive: true,
      },

      // Database
      {
        name: 'MongoDB & Mongoose',
        category: 'Database',
        proficiency: 91,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        order: 10,
        isActive: true,
      },
      {
        name: 'SQL Databases',
        category: 'Database',
        proficiency: 85,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        order: 11,
        isActive: true,
      },

      // Tools & DevOps
      {
        name: 'Git & GitHub Deployments',
        category: 'Tools',
        proficiency: 95,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        order: 12,
        isActive: true,
      },
      {
        name: 'Postman, Vercel & Netlify',
        category: 'DevOps',
        proficiency: 90,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
        order: 13,
        isActive: true,
      },
    ]);

    // 4. Featured Projects (Real user projects)
    console.log('[Seed] Creating Real Projects...');
    await Project.create([
      {
        title: 'Property Management System (Kader Tower)',
        slug: 'property-management-system-kader-tower',
        description: 'Enterprise commercial and residential property management portal featuring tenant records, lease lifecycle tracking, and administrative financial dashboards.',
        content: `## Enterprise Property Management System (Kader Tower)

Single-handedly built and delivered the entire client-side frontend architecture for a large-scale commercial and residential property management platform.

### Architectural Highlights
- **Role-Based Access Control**: Secure authentication for property managers, unit owners, and tenants.
- **Tenant & Unit Ledger**: Dynamic tracking of occupancy rates, lease durations, rent schedules, and payment status.
- **Dynamic Administrative Dashboards**: Interactive metrics visualization, invoice issuance, and PDF rent receipts.
- **Automated Property Oversight**: Streamlined maintenance ticket dispatches and automated lease renewal warnings.

### Demo Access
- **Live Preview**: https://dev.kadertower.com/
- **Demo Credentials**: \`Email: tanvir@siscotek.com\` | \`Password: password\``,
        techStack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        ],
        liveUrl: 'https://dev.kadertower.com/',
        githubUrl: 'https://github.com/MD-TANVIR7462',
        githubClientUrl: 'https://github.com/Siscotek-Tanvir',
        githubServerUrl: '',
        startDate: 'Sep 2023',
        endDate: 'Present',
        keyFeatures: [
          'Single-handedly built entire enterprise client-side frontend architecture',
          'Commercial and residential property management workflows and tenant records',
          'Dynamic administrative dashboard with automated rent invoice generation',
          'Integrated secure JWT authentication and role-based route permissions',
        ],
        challenges: 'Managing large nested property and billing state without UI latency. Solved by implementing optimistic updates with RTK Query and AG Grid virtual scrolling.',
        category: 'Full Stack',
        featured: true,
        status: 'completed',
        order: 1,
        isActive: true,
      },
      {
        title: 'Siscotek Agency Web Platform & CMS',
        slug: 'siscotek-agency-web-platform',
        description: 'Modern digital agency portal with a live administrative dashboard, service showcase, and dynamic content management system.',
        content: `## Siscotek Agency Web Platform

Full-stack agency solution built with Next.js, Express.js, MongoDB, and TypeScript featuring client management, case study publishing, and real-time contact leads.

### Core Capabilities
- **Dynamic Content Management**: Live control over services, client testimonials, and portfolio entries.
- **Admin Control Center**: Integrated login page with pre-populated demo credentials for immediate recruiter inspection.
- **Responsive Animations**: Micro-interactions crafted with Framer Motion and Tailwind CSS.
- **Modular Backend API**: Clean REST microservice architecture running on Node.js and Express.

### Live Links & Repositories
- **Live Demo**: https://siscotek.vercel.app/
- **Admin Dashboard Login**: https://siscotek.vercel.app/login
- **Client Repository**: https://github.com/MD-TANVIR7462/Agency_client
- **Server Repository**: https://github.com/MD-TANVIR7462/Agency_server`,
        techStack: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
        ],
        liveUrl: 'https://siscotek.vercel.app/',
        githubUrl: 'https://github.com/MD-TANVIR7462/Agency_client',
        githubClientUrl: 'https://github.com/MD-TANVIR7462/Agency_client',
        githubServerUrl: 'https://github.com/MD-TANVIR7462/Agency_server',
        startDate: 'Oct 2023',
        endDate: 'Jan 2024',
        keyFeatures: [
          'Live dynamic administrative dashboard and CMS management',
          'Separate modular client and backend repositories with clean architecture',
          'Demo credentials provided directly on login route for recruiter access',
          'High performance Core Web Vitals and accessible interactive UI',
        ],
        challenges: 'Legacy ASP.NET system had severe performance bottlenecks. Migrated completely to Next.js and Express, improving page speed by over 60%.',
        category: 'Full Stack',
        featured: true,
        status: 'completed',
        order: 2,
        isActive: true,
      },
      {
        title: 'Shopfinity E-Commerce Platform',
        slug: 'shopfinity-ecommerce-platform',
        description: 'Feature-complete modern e-commerce storefront with cart persistence, category indexing, and Express/MongoDB transactional backend.',
        content: `## Shopfinity E-Commerce Platform

A production-ready e-commerce platform engineered with React, Firebase authentication, protected route guards, and a robust Express/MongoDB backend API.

### Key Capabilities
- **Product Catalog & Search**: Instant client-side filtering, multi-category indexing, and detailed item views.
- **Cart & Checkout Workflow**: Persistent shopping cart with local synchronization and price validation.
- **Secure Authentication**: Firebase Auth integrated alongside custom backend customer record synchronization.
- **Dedicated Backend Engine**: RESTful endpoints managing orders, product inventories, and user profiles.

### Live Links & Repositories
- **Live Demo**: https://myshopfinity.vercel.app/
- **Client Repository**: https://github.com/MD-TANVIR7462/Shopfinity_client
- **Server Repository**: https://github.com/MD-TANVIR7462/Shipfinity_backend`,
        techStack: ['React.js', 'Redux Toolkit', 'Firebase Auth', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80',
        ],
        liveUrl: 'https://myshopfinity.vercel.app/',
        githubUrl: 'https://github.com/MD-TANVIR7462/Shopfinity_client',
        githubClientUrl: 'https://github.com/MD-TANVIR7462/Shopfinity_client',
        githubServerUrl: 'https://github.com/MD-TANVIR7462/Shipfinity_backend',
        startDate: 'Jan 2024',
        endDate: 'Apr 2024',
        keyFeatures: [
          'Engineered full-featured e-commerce platform with cart persistence and product filters',
          'Protected routing and secure authentication workflows',
          'Separate frontend and backend repositories with complete REST API integration',
          'Optimized for mobile-first user experience and fast checkout flows',
        ],
        challenges: 'Synchronizing client cart states with fluctuating inventory data. Resolved via Redux state slices and server-side stock verification hooks.',
        category: 'Full Stack',
        featured: true,
        status: 'completed',
        order: 3,
        isActive: true,
      },
    ]);

    // 5. Professional Experience
    console.log('[Seed] Creating Professional Experiences...');
    await Experience.create([
      {
        role: 'Senior Front End Developer',
        company: 'Siscotek',
        companyUrl: 'https://siscotek.com/',
        companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=150&q=80',
        location: 'Chittagong, Bangladesh (Onsite)',
        startDate: 'Sep 2023',
        endDate: '',
        current: true,
        description: 'Serving as Senior Frontend Developer, leading client-side web architecture, high-performance UI engineering, and enterprise platform modernizations.',
        achievements: [
          'Single-handedly spearheaded and delivered the complete frontend architecture for the enterprise Property Management System (Kader Tower) and multi-tenant agency web applications.',
          'Spearheaded full legacy modernization of client web portals, migrating siscotek.com and spanishforallnyc.com from monolithic ASP.NET to Next.js App Router, cutting load latency by 60% and securing 98+ Lighthouse scores.',
          'Engineered reusable component design systems with Next.js, React 18, TypeScript, Tailwind CSS, Redux Toolkit, and Radix/Shadcn UI.',
          'Architected high-throughput data grid views using AG Grid and virtual scrolling to handle tens of thousands of tenant and financial records at steady 60 FPS.',
          'Integrated secure JWT authentication handshakes, RBAC protected routes, and coordinated Git branching and deployment workflows across GitHub organizations.',
        ],
        techStack: ['Next.js', 'React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'AG Grid', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        order: 1,
      },
      {
        role: 'MERN Stack Developer',
        company: 'SaibonSoft',
        companyUrl: 'https://saibonsoft.com/',
        companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80',
        location: 'Chittagong, Bangladesh (Hybrid)',
        startDate: 'Feb 2023',
        endDate: 'Aug 2023',
        current: false,
        description: 'Engineered end-to-end full stack web applications and interactive client portals across the MERN stack (MongoDB, Express, React, Node.js) at SaibonSoft (https://saibonsoft.com/).',
        achievements: [
          'Built and deployed end-to-end full stack features across commercial client projects utilizing React, Node.js, Express, and MongoDB.',
          'Architected resilient REST API endpoints with robust input validation, centralized error handling, and secure MongoDB schemas via Mongoose.',
          'Integrated third-party payment gateways, authentication flows, and automated notification services.',
          'Optimized client-side state management, query caching, and image delivery pipelines, improving overall application responsiveness by over 45%.',
          'Collaborated in Agile sprints, performed code reviews, and managed seamless deployments via Git, Vercel, and Cloudinary.',
        ],
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Tailwind CSS', 'REST APIs', 'Git'],
        order: 2,
      },
    ]);

    // 6. Education
    console.log('[Seed] Creating Education...');
    await Education.create([
      {
        degree: 'B.Sc. in Computer Science & Engineering',
        institution: 'East Delta University',
        fieldOfStudy: 'Computer Science & Software Engineering',
        startDate: '2024',
        endDate: 'Ongoing',
        grade: 'In Progress',
        description: 'Advanced coursework in Data Structures, Algorithms, Distributed Computing, Software Architecture, and Database Systems.',
        order: 1,
      },
      {
        degree: 'Diploma in Computer Science & Engineering',
        institution: 'Chittagong Polytechnic Institute',
        fieldOfStudy: 'Computer Science & Information Technology',
        startDate: '2019',
        endDate: '2023',
        grade: 'First Division',
        description: 'Rigorous foundation in computer hardware, object-oriented programming, database management, and web system development.',
        order: 2,
      },
    ]);

    // 7. Testimonials
    console.log('[Seed] Creating Testimonials...');
    await Testimonial.create([
      {
        name: 'Technical Director',
        role: 'Engineering Lead',
        company: 'Siscotek Digital',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        message: 'Tanvir single-handedly delivered the complete frontend architecture for our Property Management System. His mastery over Next.js and React delivered huge performance gains over our legacy ASP.NET systems.',
        rating: 5,
        isActive: true,
        order: 1,
      },
      {
        name: 'Product Manager',
        role: 'Operations Head',
        company: 'Kader Tower Estates',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        message: 'The administrative portal and tenant management experience Tanvir constructed exceeded our expectations. Clean, fast, and remarkably intuitive to navigate daily.',
        rating: 5,
        isActive: true,
        order: 2,
      },
    ]);

    // 8. Blog Posts
    console.log('[Seed] Creating Blog Posts...');
    await Blog.create([
      {
        title: 'Modernizing Legacy Architectures: Migrating ASP.NET Portals to Next.js',
        slug: 'modernizing-legacy-architectures-aspnet-to-nextjs',
        excerpt: 'How we transitioned enterprise client portals from legacy ASP.NET to Next.js, boosting Lighthouse scores from 52 to 98 and cutting server costs.',
        content: `<h2>Migrating from ASP.NET to Next.js: A Real-World Retrospective</h2>
<p>When managing client web applications originally built on monolithic ASP.NET frameworks, maintainability and Core Web Vitals often suffer due to server-side render latency and tightly coupled view logic.</p>

<h3>1. Architectural Strategy</h3>
<ul>
  <li><strong>Decoupled API Boundaries:</strong> Separating data contracts into cleanly versioned RESTful microservices.</li>
  <li><strong>Incremental Migration:</strong> Moving critical customer-facing routes to Next.js App Router first while preserving legacy backend databases.</li>
  <li><strong>Server-Side Generation (SSG) & ISR:</strong> Pre-rendering dynamic catalog pages so prospective users receive sub-100ms first paint times.</li>
</ul>

<h3>2. Tangible Outcomes</h3>
<ul>
  <li>Page load speed improved by over 60%.</li>
  <li>SEO rankings climbed significantly due to automatic Open Graph meta generation.</li>
  <li>Zero defects reported during client cutover.</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        tags: ['Next.js', 'React', 'Migration', 'Performance'],
        published: true,
        readTime: '6 min read',
      },
      {
        title: 'Architecting Scalable Frontend Systems for Property Management',
        slug: 'architecting-scalable-frontend-property-management',
        excerpt: 'Deep-dive into structuring complex data tables, role-based tenant routing, and PDF report generation in enterprise web applications.',
        content: `<h2>Building Enterprise-Grade Frontend Applications</h2>
<p>Single-handedly building an enterprise Property Management System presents unique architectural challenges: handling thousands of tenant records, dynamically calculating rent arrears, and generating printable lease agreements.</p>

<h3>Foundational Building Blocks</h3>
<ul>
  <li><strong>Data Table Optimization:</strong> Implementing AG Grid and virtualization to render thousands of tenancy rows at 60 FPS without DOM thrashing.</li>
  <li><strong>Declarative Form Schemas:</strong> Pairing React Hook Form with Zod schemas to guarantee data conformity before API submission.</li>
  <li><strong>Client-Side Document Compilation:</strong> Using React PDF renderer to generate tamper-proof tenant statements directly within the browser.</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Next.js', 'Enterprise', 'Architecture'],
        published: true,
        readTime: '7 min read',
      },
      {
        title: 'Mastering RTK Query: Normalized Cache, Optimistic Updates & Prefetching',
        slug: 'mastering-rtk-query-cache-optimistic-updates',
        excerpt: 'How Redux Toolkit Query eliminates 70% of boilerplate state management code while delivering snappy sub-second optimistic mutations.',
        content: `<h2>The Power of Modern Server-State Caching with RTK Query</h2>
<p>In large-scale React applications, state management frequently gets convoluted by mixing client UI state with asynchronous server cache. Redux Toolkit (RTK) Query brings declarative caching and data synchronization into a unified toolset.</p>

<h3>Key Architectural Strategies</h3>
<ol>
  <li><strong>Tag Invalidation for Declarative Refetching:</strong> Utilizing granular <code>providesTags</code> and <code>invalidatesTags</code> to automate UI synchronization without manual dispatch cascades.</li>
  <li><strong>Optimistic Updates:</strong> Updating the local cache instantly upon user interaction before the server confirms, delivering an instant 0ms latency feel.</li>
  <li><strong>Intelligent Prefetching:</strong> Triggering background resource prefetching on hover over table rows and links to ensure instantaneous subsequent navigations.</li>
</ol>

<h3>Performance Results</h3>
<p>By migrating from manual async thunks to RTK Query, our bundle payload decreased by 22%, and network waterfall issues were completely eliminated.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        tags: ['Redux', 'RTK Query', 'React', 'Frontend'],
        published: true,
        readTime: '5 min read',
      },
      {
        title: 'Building Resilient MERN APIs: JWT Refresh Rotation & Secure Architecture',
        slug: 'building-resilient-mern-apis-jwt-security',
        excerpt: 'A comprehensive guide to building bulletproof Node.js/Express APIs featuring HTTP-only cookies, token rotation, and robust error handling.',
        content: `<h2>Securing Node.js and Express RESTful Microservices</h2>
<p>Production applications require security patterns that protect against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF). Here is our battle-tested authentication architecture.</p>

<h3>1. Token Lifecycle Architecture</h3>
<ul>
  <li><strong>Access Tokens:</strong> Short-lived (15 minutes), stored in memory via Redux state.</li>
  <li><strong>Refresh Tokens:</strong> Long-lived (7 days), stored in secure <code>HttpOnly</code>, <code>SameSite=Strict</code> cookies.</li>
  <li><strong>Reuse Detection:</strong> Invalidating the entire refresh token family if an expired or stolen token is presented.</li>
</ul>

<h3>2. Centralized Error Handling</h3>
<p>Eliminate uncaught exceptions by adopting standardized <code>ApiError</code> and <code>ApiResponse</code> wrappers, paired with automated express-validator middleware.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        tags: ['Node.js', 'Express', 'Security', 'MERN'],
        published: true,
        readTime: '8 min read',
      },
      {
        title: 'Micro-Interactions & 60 FPS Fluid UI in Modern Web Apps',
        slug: 'micro-interactions-60fps-fluid-ui',
        excerpt: 'Leveraging Framer Motion and Tailwind CSS to craft fluid, delightful web experiences without compromising runtime performance.',
        content: `<h2>Crafting Engaging Web Interfaces with Framer Motion</h2>
<p>Great web software doesn't just work reliably—it feels alive. Thoughtful micro-animations give users visual feedback and elevate an application from standard to world-class.</p>

<h3>Three Golden Rules of Motion Design</h3>
<ul>
  <li><strong>Transform & Opacity Only:</strong> Stick strictly to composite-thread properties to prevent costly browser reflows and repaints.</li>
  <li><strong>Spring Physics over Linear Timing:</strong> Natural motion mimics physical inertia, creating controls that feel tactile and responsive.</li>
  <li><strong>Respect Reduced Motion:</strong> Always query <code>prefers-reduced-motion</code> to honor user accessibility preferences.</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        tags: ['Framer Motion', 'Tailwind CSS', 'UI/UX', 'Frontend'],
        published: true,
        readTime: '4 min read',
      },
    ]);

    // 9. Courses / Accreditations
    console.log('[Seed] Creating Courses & Certifications...');
    await Course.create([
      {
        title: 'Full Stack MERN & Next.js Architecture Masterclass',
        slug: 'full-stack-mern-nextjs-architecture',
        instructor: 'Industry Experts',
        platform: 'Professional Specialization',
        category: 'Web Development',
        description: 'Comprehensive specialization covering advanced React 18, Next.js Server Components, Redux Toolkit RTK Query, Node.js REST services, and MongoDB database tuning.',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        courseUrl: 'https://github.com/MD-TANVIR7462',
        certificateUrl: 'https://github.com/MD-TANVIR7462',
        duration: '60+ hours',
        totalLessons: 45,
        level: 'Advanced',
        status: 'completed',
        skillsCovered: ['Next.js', 'React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      },
    ]);

    // 10. Settings
    console.log('[Seed] Creating Settings...');
    await Settings.create({
      siteTitle: 'Tajul Islam Tanvir | Full Stack & Frontend Specialist',
      siteDescription: 'Portfolio of Tajul Islam Tanvir — Full Stack Developer & Frontend Specialist with over 2 years of professional experience building high-performance web systems.',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      favicon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
      metaKeywords: 'Tajul Islam Tanvir, Full Stack Developer, Frontend Specialist, Next.js, React, Node.js, Express, MongoDB, Tailwind CSS, Siscotek',
      primaryColor: '#0d9488',
      accentColor: '#06b6d4',
      heroType: 'typewriter',
      heroText: 'Accomplished Full Stack Developer with over 2 years of professional experience architecting, modernizing, and deploying high-performance web systems.',
      footerText: '© 2026 Tajul Islam Tanvir. All rights reserved. Chittagong, Bangladesh.',
      adminEmail: 'mdtanvir7462@gmail.com',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/MD-TANVIR7462' },
        { platform: '2nd GitHub', url: 'https://github.com/Siscotek-Tanvir' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/md-tajul-islam-tanvir-531682278' },
      ],
      darkModeDefault: true,
    });

    console.log('[Seed] Database successfully populated with Tajul Islam Tanvir data! 🎉');
    console.log('[Seed] Admin login credentials:');
    console.log('       Email: mdtanvir7462@gmail.com or admin@portfolio.com');
    console.log('       Password: Admin@123');
    return { success: true, message: 'Database seeded with real Tajul Islam Tanvir data' };
  } catch (error) {
    console.error('[Seed Error]', error);
    throw error;
  }
};

export default seedDatabase;
export { seedDatabase };

if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
