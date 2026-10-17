import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateProfile,
  changePassword,
  getUsers,
  createAdminUser,
  toggleUserStatus,
  deleteUser,
} from './auth.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';
import {
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
} from './auth.validator.js';

const router = Router();

router.post('/login', authLimiter, validate(loginValidator), loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshAccessToken);

router.get('/me', verifyJWT, getCurrentUser);
router.patch('/update-profile', verifyJWT, validate(updateProfileValidator), updateProfile);
router.patch('/change-password', verifyJWT, validate(changePasswordValidator), changePassword);

// Admin User Management
router.get('/users', verifyJWT, getUsers);
router.post('/users', verifyJWT, createAdminUser);
router.patch('/users/:id/toggle-status', verifyJWT, toggleUserStatus);
router.delete('/users/:id', verifyJWT, deleteUser);

export default router;
