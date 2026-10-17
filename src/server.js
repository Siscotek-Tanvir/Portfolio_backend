import dns from 'node:dns';

// Fix for Windows querySrv ECONNREFUSED with MongoDB Atlas
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // fallback if environment does not allow custom DNS
}

import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { About } from './modules/about/about.model.js';
import { Blog } from './modules/blog/blog.model.js';
import { seedDatabase } from './seed/seedData.js';

const startServer = async () => {
  await connectDB();

  // If about data is empty or still contains placeholder 'Alex Rivera' or blogs need populating, automatically seed real data
  try {
    const about = await About.findOne();
    const blogCount = await Blog.countDocuments();
    if (!about || about.name === 'Alex Rivera' || blogCount < 5) {
      console.log('[Server] Auto-populating database with Tajul Islam Tanvir real CV, Projects & Blogs...');
      await seedDatabase();
    }
  } catch (seedErr) {
    console.error('[Server Auto-Seed Error]', seedErr.message);
  }

  const PORT = ENV.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[Server] Portfolio backend running in ${ENV.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('[Server Error]', err);
  process.exit(1);
});
