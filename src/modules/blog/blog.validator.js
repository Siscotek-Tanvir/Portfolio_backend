import { body } from 'express-validator';

export const blogValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('coverImage').isURL().withMessage('Cover image must be a valid URL'),
];
