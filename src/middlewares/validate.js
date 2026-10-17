import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path || err.param]: err.msg }));

    throw new ApiError(422, 'Validation Error: Received invalid data', extractedErrors);
  };
};
