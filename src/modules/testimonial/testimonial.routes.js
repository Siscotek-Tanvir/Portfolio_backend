import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from './testimonial.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { testimonialValidator } from './testimonial.validator.js';

const router = Router();

router.get('/', getTestimonials);
router.post('/', verifyJWT, verifyAdmin, validate(testimonialValidator), createTestimonial);
router.put('/:id', verifyJWT, verifyAdmin, validate(testimonialValidator), updateTestimonial);
router.delete('/:id', verifyJWT, verifyAdmin, deleteTestimonial);

export default router;
