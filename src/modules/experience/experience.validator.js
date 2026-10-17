import { body } from 'express-validator';

export const experienceValidator = [
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('companyLogo').optional({ checkFalsy: true }).isURL().withMessage('Company logo must be a valid URL'),
  body('companyUrl').optional({ checkFalsy: true }),
];
