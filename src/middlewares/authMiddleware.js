import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../modules/auth/auth.model.js';
import { ENV } from '../config/env.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
    const user = await User.findById(decodedToken?._id).select('-password');

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token: User not found');
    }

    if (user.isActive === false) {
      throw new ApiError(403, 'Account is deactivated or blocked. Please contact an administrator.');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});
