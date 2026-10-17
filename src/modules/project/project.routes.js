import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  getRelatedProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from './project.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { projectValidator } from './project.validator.js';

const router = Router();

router.get('/', getProjects);
router.get('/related/:slug', getRelatedProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', verifyJWT, verifyAdmin, validate(projectValidator), createProject);
router.put('/:id', verifyJWT, verifyAdmin, validate(projectValidator), updateProject);
router.delete('/:id', verifyJWT, verifyAdmin, deleteProject);
router.patch('/reorder', verifyJWT, verifyAdmin, reorderProjects);

export default router;
