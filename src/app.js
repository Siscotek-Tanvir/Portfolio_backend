import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { ENV } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Modular route imports
import authRoutes from './modules/auth/auth.routes.js';
import aboutRoutes from './modules/about/about.routes.js';
import skillRoutes from './modules/skill/skill.routes.js';
import projectRoutes from './modules/project/project.routes.js';
import contactRoutes from './modules/contact/contact.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';

import experienceRoutes from './modules/experience/experience.routes.js';
import educationRoutes from './modules/education/education.routes.js';
import testimonialRoutes from './modules/testimonial/testimonial.routes.js';
import blogRoutes from './modules/blog/blog.routes.js';
import courseRoutes from './modules/course/course.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(compression());

if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Modular Module Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Additional Domain Routes
app.use('/api/v1/experience', experienceRoutes);
app.use('/api/v1/education', educationRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/admin', dashboardRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
    data: null,
  });
});

app.use(errorHandler);

export default app;
