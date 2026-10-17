import { body } from 'express-validator';

export const testimonialValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('avatar').isURL().withMessage('Avatar must be a valid URL'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];
