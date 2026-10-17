import { body } from 'express-validator';

export const projectValidator = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('thumbnail').isURL().withMessage('Thumbnail must be a valid URL'),
  body('liveUrl').optional({ checkFalsy: true }).isURL().withMessage('Live URL must be valid'),
  body('githubUrl').optional({ checkFalsy: true }),
  body('githubClientUrl').optional({ checkFalsy: true }),
  body('githubServerUrl').optional({ checkFalsy: true }),
  body('startDate').optional({ checkFalsy: true }),
  body('endDate').optional({ checkFalsy: true }),
];
