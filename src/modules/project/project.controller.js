import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import {
  getProjectsService,
  getProjectBySlugService,
  getRelatedProjectsService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
  reorderProjectsService,
} from './project.service.js';

export const getProjects = asyncHandler(async (req, res) => {
  const result = await getProjectsService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Projects fetched successfully'));
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await getProjectBySlugService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, project, 'Project fetched successfully'));
});

export const getRelatedProjects = asyncHandler(async (req, res) => {
  const projects = await getRelatedProjectsService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, projects, 'Related projects fetched successfully'));
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await createProjectService(req.body);
  return res.status(201).json(new ApiResponse(201, project, 'Project created successfully'));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await updateProjectService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, project, 'Project updated successfully'));
});

export const deleteProject = asyncHandler(async (req, res) => {
  await deleteProjectService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Project deleted successfully'));
});

export const reorderProjects = asyncHandler(async (req, res) => {
  const updated = await reorderProjectsService(req.body.items);
  return res.status(200).json(new ApiResponse(200, updated, 'Projects reordered successfully'));
});
