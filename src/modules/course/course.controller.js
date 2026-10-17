import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as courseService from './course.service.js';

export const getCourses = asyncHandler(async (req, res) => {
  const result = await courseService.getCoursesService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Courses fetched successfully'));
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseBySlugService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, course, 'Course fetched successfully'));
});

export const getRelatedCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getRelatedCoursesService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, courses, 'Related courses fetched successfully'));
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourseService(req.body);
  return res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourseService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, course, 'Course updated successfully'));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.deleteCourseService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Course deleted successfully'));
});
