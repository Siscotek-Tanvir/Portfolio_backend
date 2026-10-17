import { Router } from 'express';
import {
  getCourses,
  getCourseBySlug,
  getRelatedCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from './course.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { courseValidator } from './course.validator.js';

const router = Router();

router.get('/', getCourses);
router.get('/related/:slug', getRelatedCourses);
router.get('/:slug', getCourseBySlug);
router.post('/', verifyJWT, verifyAdmin, validate(courseValidator), createCourse);
router.put('/:id', verifyJWT, verifyAdmin, validate(courseValidator), updateCourse);
router.delete('/:id', verifyJWT, verifyAdmin, deleteCourse);

export default router;
