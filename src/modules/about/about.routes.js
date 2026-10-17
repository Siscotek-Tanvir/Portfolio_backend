import { Router } from 'express';
import { getAbout, updateAbout } from './about.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { aboutValidator } from './about.validator.js';

const router = Router();

router.get('/', getAbout);
router.put('/', verifyJWT, verifyAdmin, validate(aboutValidator), updateAbout);

export default router;
