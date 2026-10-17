import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from './experience.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { experienceValidator } from './experience.validator.js';

const router = Router();

router.get('/', getExperiences);
router.post('/', verifyJWT, verifyAdmin, validate(experienceValidator), createExperience);
router.put('/:id', verifyJWT, verifyAdmin, validate(experienceValidator), updateExperience);
router.delete('/:id', verifyJWT, verifyAdmin, deleteExperience);

export default router;
