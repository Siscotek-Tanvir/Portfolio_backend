import { body } from 'express-validator';

export const educationValidator = [
  body('degree').trim().notEmpty().withMessage('Degree is required'),
  body('institution').trim().notEmpty().withMessage('Institution is required'),
  body('fieldOfStudy').trim().notEmpty().withMessage('Field of study is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('endDate').notEmpty().withMessage('End date is required'),
];
