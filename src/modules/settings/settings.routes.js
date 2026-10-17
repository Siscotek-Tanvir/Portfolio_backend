import { Router } from 'express';
import { getSettings, updateSettings } from './settings.controller.js';
import { verifyJWT } from '../../middlewares/authMiddleware.js';
import { verifyAdmin } from '../../middlewares/adminMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { settingsValidator } from './settings.validator.js';
import { seedDatabase } from '../../seed/seedData.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const router = Router();

router.get('/', getSettings);
router.put('/', verifyJWT, verifyAdmin, validate(settingsValidator), updateSettings);

// Convenient trigger endpoint for initial/refresh data seeding
router.post('/seed', async (req, res, next) => {
  try {
    const result = await seedDatabase();
    return res.status(200).json(new ApiResponse(200, result, 'Database seeded successfully with real portfolio data'));
  } catch (err) {
    next(err);
  }
});

export default router;
