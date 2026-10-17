import { Router } from 'express';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from './skill.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { skillValidator } from './skill.validator.js';

const router = Router();

router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', verifyJWT, verifyAdmin, validate(skillValidator), createSkill);
router.put('/:id', verifyJWT, verifyAdmin, validate(skillValidator), updateSkill);
router.delete('/:id', verifyJWT, verifyAdmin, deleteSkill);
router.patch('/reorder', verifyJWT, verifyAdmin, reorderSkills);

export default router;
