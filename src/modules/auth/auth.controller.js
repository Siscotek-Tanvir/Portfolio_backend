import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ENV } from '../../config/env.js';
import {
  loginUserService,
  logoutUserService,
  refreshAccessTokenService,
  updateProfileService,
  changePasswordService,
  getAllUsersService,
  createAdminUserService,
  toggleUserStatusService,
  deleteUserService,
} from './auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === 'production',
  sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const loginUser = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);
  return res
    .status(200)
    .cookie('refreshToken', result.refreshToken, cookieOptions)
    .json(new ApiResponse(200, result, 'User logged in successfully'));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  await logoutUserService(token);
  return res
    .status(200)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incoming = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await refreshAccessTokenService(incoming);
  return res
    .status(200)
    .cookie('refreshToken', result.refreshToken, cookieOptions)
    .json(new ApiResponse(200, result, 'Access token refreshed successfully'));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, 'Current user fetched'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updated = await updateProfileService(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, updated, 'Profile updated successfully'));
});

export const changePassword = asyncHandler(async (req, res) => {
  await changePasswordService(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, {}, 'Password changed successfully'));
});

export const getUsers = asyncHandler(async (req, res) => {
  const result = await getAllUsersService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Users fetched successfully'));
});

export const createAdminUser = asyncHandler(async (req, res) => {
  const user = await createAdminUserService(req.body);
  return res.status(201).json(new ApiResponse(201, user, 'Admin created successfully'));
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await toggleUserStatusService(req.params.id, req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, `Admin status updated to ${user.isActive ? 'Active' : 'Inactive'}`));
});

export const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserService(req.params.id, req.user._id);
  return res.status(200).json(new ApiResponse(200, {}, 'Admin deleted successfully'));
});
