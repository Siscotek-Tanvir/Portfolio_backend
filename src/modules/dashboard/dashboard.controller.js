import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as dashboardService from './dashboard.service.js';

export const getAdminStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getAdminStatsService();
  return res.status(200).json(new ApiResponse(200, stats, 'Dashboard stats fetched successfully'));
});
