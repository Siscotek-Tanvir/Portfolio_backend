import { User } from './auth.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { generateAccessAndRefreshTokens } from '../../utils/generateTokens.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (user.isActive === false) {
    throw new ApiError(403, 'Your account has been deactivated or blocked by an administrator.');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);
  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  return { user: loggedInUser, accessToken, refreshToken };
};

export const logoutUserService = async (token) => {
  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
      await User.findByIdAndUpdate(
        decoded._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
      );
    } catch {}
  }
};

export const refreshAccessTokenService = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, ENV.JWT_REFRESH_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, 'Invalid refresh token: User not found');
    }

    if (user.isActive === false) {
      throw new ApiError(403, 'Your account has been deactivated.');
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Refresh token has been revoked or is expired');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
};

export const updateProfileService = async (userId, { name, avatar }) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(name && { name }),
        ...(avatar && { avatar }),
      },
    },
    { new: true }
  ).select('-password');
};

export const changePasswordService = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId);
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid current password');
  }

  user.password = newPassword;
  await user.save();
};

export const getAllUsersService = async (query = {}) => {
  const { page, limit, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
  const filter = {};

  if (search && search.trim()) {
    filter.$or = [
      { name: new RegExp(search.trim(), 'i') },
      { email: new RegExp(search.trim(), 'i') },
    ];
  }

  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password -refreshToken')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    return {
      users,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  return await User.find(filter).select('-password -refreshToken').sort(sort);
};

export const createAdminUserService = async ({ name, email, password, avatar }) => {
  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new ApiError(400, 'An account with this email already exists.');
  }

  const newUser = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: 'admin',
    isActive: true,
    avatar:
      avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  });

  return await User.findById(newUser._id).select('-password -refreshToken');
};

export const toggleUserStatusService = async (targetUserId, currentUserId) => {
  if (String(targetUserId) === String(currentUserId)) {
    throw new ApiError(400, 'You cannot deactivate or block your own active session.');
  }

  const user = await User.findById(targetUserId);
  if (!user) {
    throw new ApiError(404, 'Admin user not found');
  }

  user.isActive = !user.isActive;
  // If deactivating, invalidate their refreshToken so session terminates immediately
  if (!user.isActive) {
    user.refreshToken = undefined;
  }
  await user.save();

  return await User.findById(user._id).select('-password -refreshToken');
};

export const deleteUserService = async (targetUserId, currentUserId) => {
  if (String(targetUserId) === String(currentUserId)) {
    throw new ApiError(400, 'You cannot delete your own account.');
  }

  const user = await User.findById(targetUserId);
  if (!user) {
    throw new ApiError(404, 'Admin user not found');
  }

  await User.findByIdAndDelete(targetUserId);
  return true;
};
