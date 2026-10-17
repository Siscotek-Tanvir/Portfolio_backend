import { Router } from 'express';
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from './education.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { educationValidator } from './education.validator.js';

const router = Router();

router.get('/', getEducations);
router.post('/', verifyJWT, verifyAdmin, validate(educationValidator), createEducation);
router.put('/:id', verifyJWT, verifyAdmin, validate(educationValidator), updateEducation);
router.delete('/:id', verifyJWT, verifyAdmin, deleteEducation);

export default router;
