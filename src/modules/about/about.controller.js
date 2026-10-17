import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getAboutService, updateAboutService } from './about.service.js';

export const getAbout = asyncHandler(async (req, res) => {
  const about = await getAboutService();
  return res.status(200).json(new ApiResponse(200, about, 'About fetched successfully'));
});

export const updateAbout = asyncHandler(async (req, res) => {
  const about = await updateAboutService(req.body);
  return res.status(200).json(new ApiResponse(200, about, 'About updated successfully'));
});
