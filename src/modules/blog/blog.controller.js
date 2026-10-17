import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as blogService from './blog.service.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const result = await blogService.getBlogsService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Blog posts fetched successfully'));
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlogBySlugService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, blog, 'Blog post fetched successfully'));
});

export const getRelatedBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogService.getRelatedBlogsService(req.params.slug);
  return res.status(200).json(new ApiResponse(200, blogs, 'Related blog posts fetched successfully'));
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlogService(req.body);
  return res.status(201).json(new ApiResponse(201, blog, 'Blog post created successfully'));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlogService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, blog, 'Blog post updated successfully'));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.deleteBlogService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Blog post deleted successfully'));
});
