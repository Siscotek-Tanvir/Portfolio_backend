import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: 'Alex Rivera | Senior MERN Stack Developer',
    },
    siteDescription: {
      type: String,
      default: 'Portfolio of Alex Rivera, a MERN Stack Developer with 3+ years of experience building modern, scalable web apps.',
    },
    logo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
    },
    favicon: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
    },
    metaKeywords: {
      type: String,
      default: 'MERN, React, Node.js, MongoDB, Express, Full Stack Developer, Redux, RTK Query',
    },
    primaryColor: {
      type: String,
      default: '#6366f1',
    },
    accentColor: {
      type: String,
      default: '#06b6d4',
    },
    heroType: {
      type: String,
      default: 'typewriter',
    },
    heroText: {
      type: String,
      default: 'I build resilient distributed systems & intuitive modern interfaces.',
    },
    footerText: {
      type: String,
      default: '© 2026 Alex Rivera. All rights reserved. Built with MERN + RTK Query.',
    },
    adminEmail: {
      type: String,
      default: 'admin@portfolio.com',
    },
    socialLinks: [socialLinkSchema],
    darkModeDefault: {
      type: Boolean,
      default: true,
    },
    sectionsVisibility: {
      about: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      courses: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      testimonials: { type: Boolean, default: true },
      blog: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
    sectionsOrder: {
      type: [String],
      default: [
        'about',
        'skills',
        'projects',
        'courses',
        'experience',
        'education',
        'testimonials',
        'blog',
        'contact',
      ],
    },
    sectionsSerial: {
      about: { type: String, default: '1' },
      skills: { type: String, default: '2' },
      projects: { type: String, default: '3' },
      courses: { type: String, default: '4' },
      experience: { type: String, default: '5' },
      education: { type: String, default: '6' },
      testimonials: { type: String, default: '7' },
      blog: { type: String, default: '8' },
      contact: { type: String, default: '9' },
    },
    skillsTabsVisibility: {
      Frontend: { type: Boolean, default: true },
      Backend: { type: Boolean, default: true },
      Database: { type: Boolean, default: true },
      Tools: { type: Boolean, default: true },
      DevOps: { type: Boolean, default: true },
      Other: { type: Boolean, default: true },
    },
    projectsTabsVisibility: {
      'Full Stack': { type: Boolean, default: true },
      Frontend: { type: Boolean, default: true },
      Backend: { type: Boolean, default: true },
    },
    sectionHeaders: {
      about: {
        badge: { type: String, default: 'Developer Profile & Engineering Philosophy' },
        title: { type: String, default: 'Architecting With Precision' },
        subtitle: { type: String, default: 'Passionate full-stack developer committed to crafting accessible, scalable, high-performance web applications and resilient systems.' },
      },
      skills: {
        badge: { type: String, default: 'Core Stack & Production Tooling' },
        title: { type: String, default: 'Frontend Mastery & MERN Architecture' },
        subtitle: { type: String, default: 'Leading frontend architecture with Next.js, React 18, and TypeScript alongside scalable Node.js microservices and resilient MongoDB data pipelines.' },
      },
      projects: {
        badge: { type: String, default: 'Production Software & Enterprise Systems' },
        title: { type: String, default: 'Featured Architectural Highlights' },
        subtitle: { type: String, default: 'Explore enterprise property management portals, agency platforms with live administrative dashboards, and full-stack e-commerce storefronts.' },
      },
      courses: {
        badge: { type: String, default: 'Specialized Learning & Certifications' },
        title: { type: String, default: 'Courses & Professional Accreditations' },
        subtitle: { type: String, default: 'Rigorous masterclasses, deep-dive courses, and verified developer certifications completed.' },
      },
      experience: {
        badge: { type: String, default: 'Verified Career Trajectory' },
        title: { type: String, default: 'Commercial Work Experience' },
        subtitle: { type: String, default: 'Leading engineering architecture, modernizing mission-critical web applications, and delivering production client solutions.' },
      },
      education: {
        badge: { type: String, default: 'Academic Foundations & Credentials' },
        title: { type: String, default: 'Education & Academic Background' },
        subtitle: { type: String, default: 'Formal Computer Science & Engineering degree foundations powering algorithmic problem-solving.' },
      },
      testimonials: {
        badge: { type: String, default: 'Endorsements & Recommendations' },
        title: { type: String, default: 'Client & Colleague Praise' },
        subtitle: { type: String, default: 'Feedback from project stakeholders, engineering leads, and technical founders I have collaborated with.' },
      },
      blog: {
        badge: { type: String, default: 'Engineering Insights & Knowledge Base' },
        title: { type: String, default: 'Publications & Deep-Dive Tutorials' },
        subtitle: { type: String, default: 'Real-world software engineering articles, architecture retrospectives, and full-stack performance patterns.' },
      },
      contact: {
        badge: { type: String, default: 'Direct Inquiries & Collaboration' },
        title: { type: String, default: 'Let’s Discuss Your Next Build' },
        subtitle: { type: String, default: 'Whether you have a technical question, an open position, or an interesting engineering problem to solve, feel free to drop a message.' },
      },
    },
  },
  { timestamps: true }
);

export const Settings = mongoose.model('Settings', settingsSchema);
