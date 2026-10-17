import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as educationService from './education.service.js';

export const getEducations = asyncHandler(async (req, res) => {
  const educations = await educationService.getEducationsService(req.query);
  return res.status(200).json(new ApiResponse(200, educations, 'Educations fetched successfully'));
});

export const createEducation = asyncHandler(async (req, res) => {
  const education = await educationService.createEducationService(req.body);
  return res.status(201).json(new ApiResponse(201, education, 'Education created successfully'));
});

export const updateEducation = asyncHandler(async (req, res) => {
  const education = await educationService.updateEducationService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, education, 'Education updated successfully'));
});

export const deleteEducation = asyncHandler(async (req, res) => {
  await educationService.deleteEducationService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Education deleted successfully'));
});
