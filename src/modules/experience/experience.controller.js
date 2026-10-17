import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as experienceService from './experience.service.js';

export const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await experienceService.getExperiencesService(req.query);
  return res.status(200).json(new ApiResponse(200, experiences, 'Experiences fetched successfully'));
});

export const createExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.createExperienceService(req.body);
  return res.status(201).json(new ApiResponse(201, experience, 'Experience created successfully'));
});

export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.updateExperienceService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, experience, 'Experience updated successfully'));
});

export const deleteExperience = asyncHandler(async (req, res) => {
  await experienceService.deleteExperienceService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Experience deleted successfully'));
});
