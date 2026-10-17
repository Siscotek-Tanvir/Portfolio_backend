import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getRelatedBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blog.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { blogValidator } from './blog.validator.js';

const router = Router();

router.get('/', getBlogs);
router.get('/related/:slug', getRelatedBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', verifyJWT, verifyAdmin, validate(blogValidator), createBlog);
router.put('/:id', verifyJWT, verifyAdmin, validate(blogValidator), updateBlog);
router.delete('/:id', verifyJWT, verifyAdmin, deleteBlog);

export default router;
