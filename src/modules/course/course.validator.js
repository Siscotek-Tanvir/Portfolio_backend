import { body } from 'express-validator';

export const courseValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor is required'),
  body('platform').trim().notEmpty().withMessage('Platform is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('thumbnail').optional().isURL().withMessage('Thumbnail must be a valid URL'),
  body('courseUrl').optional(),
  body('certificateUrl').optional(),
];
