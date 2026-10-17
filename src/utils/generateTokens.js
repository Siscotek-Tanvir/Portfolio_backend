import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_ACCESS_SECRET,
    { expiresIn: ENV.JWT_ACCESS_EXPIRY }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: ENV.JWT_REFRESH_EXPIRY }
  );
};

export const generateAccessAndRefreshTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
