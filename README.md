# Dynamic Developer Portfolio — Backend API

RESTful API backend built with Node.js, Express, and MongoDB providing full content management capabilities, secure authentication, and optimized query pipelines.

## 🚀 Key Features

- **Authentication & Security:**
  - JWT Access Token + HttpOnly Refresh Token rotation
  - Role-based admin access control
  - **Admin User Management:** Create new admins, toggle active/deactivate status with immediate session revocation (blocking mechanism)
  - Rate limiting, Helmet security headers, MongoDB sanitize, CORS policy
- **Server-Side Data Operations:**
  - **Full Backend Search, Dynamic Sorting, and Pagination** on all resources (Skills, Projects, Experience, Education, Courses, Blogs, Testimonials, Contacts, Users)
  - Dual response support: Returns paginated objects `{ items, pagination }` when requested, and flat arrays when unpaginated for backwards compatibility
- **Content Modules:**
  - About, Skills, Projects, Experience, Education, Courses, Blogs, Testimonials, Contact Inquiries, Global Settings, and Dashboard Analytics
  - Section Ordering & Dynamic Section Headers (titles, subtitles, badges) stored in MongoDB
  - Automated database seeding script for quick setup

## 🛠️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database & ODM:** MongoDB & Mongoose
- **Authentication:** JWT (jsonwebtoken) & bcryptjs
- **Validation:** Express-Validator
- **Security:** Helmet, express-rate-limit, express-mongo-sanitize, cors, cookie-parser

## ⚙️ Environment Configuration

Create a `.env` file in the `server/` root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=adminpassword123
```

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Run database seed (initializes real projects, CV data, and admin user)
npm run seed

# Start server in development mode (using nodemon)
npm run dev

# Start server in production mode
npm run start
```
# Portfolio_backend
