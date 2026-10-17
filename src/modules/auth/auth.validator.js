import { body } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const updateProfileValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
];

export const changePasswordValidator = [
  body('oldPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];
