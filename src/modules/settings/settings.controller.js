import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getSettingsService, updateSettingsService } from './settings.service.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getSettingsService();
  return res.status(200).json(new ApiResponse(200, settings, 'Settings fetched successfully'));
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await updateSettingsService(req.body);
  return res.status(200).json(new ApiResponse(200, settings, 'Settings updated successfully'));
});
