import { body } from 'express-validator';

export const settingsValidator = [
  body('siteTitle').trim().notEmpty().withMessage('Site title is required'),
  body('logo').optional({ checkFalsy: true }).isURL().withMessage('Logo must be a valid URL'),
  body('favicon').optional({ checkFalsy: true }).isURL().withMessage('Favicon must be a valid URL'),
];
