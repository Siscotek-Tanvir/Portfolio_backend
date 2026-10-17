import { Router } from 'express';
import { getAdminStats } from './dashboard.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';

const router = Router();

router.get('/stats', verifyJWT, verifyAdmin, getAdminStats);

export default router;
