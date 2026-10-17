import { body } from 'express-validator';

export const aboutValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('bio').trim().notEmpty().withMessage('Bio is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('profileImage').isURL().withMessage('Profile image must be a valid URL'),
];
