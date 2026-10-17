import { Router } from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from './contact.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { contactLimiter } from '../../middlewares/rateLimiter.js';
import { contactValidator } from './contact.validator.js';

const router = Router();

router.post('/', contactLimiter, validate(contactValidator), submitContact);
router.get('/', verifyJWT, verifyAdmin, getContacts);
router.patch('/:id/status', verifyJWT, verifyAdmin, updateContactStatus);
router.delete('/:id', verifyJWT, verifyAdmin, deleteContact);

export default router;
