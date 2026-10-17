import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import {
  getSkillsService,
  getSkillByIdService,
  createSkillService,
  updateSkillService,
  deleteSkillService,
  reorderSkillsService,
} from './skill.service.js';

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await getSkillsService(req.query);
  return res.status(200).json(new ApiResponse(200, skills, 'Skills fetched successfully'));
});

export const getSkillById = asyncHandler(async (req, res) => {
  const skill = await getSkillByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, skill, 'Skill fetched successfully'));
});

export const createSkill = asyncHandler(async (req, res) => {
  const skill = await createSkillService(req.body);
  return res.status(201).json(new ApiResponse(201, skill, 'Skill created successfully'));
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await updateSkillService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, skill, 'Skill updated successfully'));
});

export const deleteSkill = asyncHandler(async (req, res) => {
  await deleteSkillService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Skill deleted successfully'));
});

export const reorderSkills = asyncHandler(async (req, res) => {
  const skills = await reorderSkillsService(req.body.items);
  return res.status(200).json(new ApiResponse(200, skills, 'Skills reordered successfully'));
});
