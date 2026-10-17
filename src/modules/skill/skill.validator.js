import { body } from 'express-validator';

export const skillValidator = [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('category')
    .isIn(['Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Other'])
    .withMessage('Invalid category'),
  body('proficiency')
    .isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be between 0 and 100'),
  body('icon').trim().notEmpty().withMessage('Icon string or URL is required'),
];
