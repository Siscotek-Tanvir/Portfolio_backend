import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as testimonialService from './testimonial.service.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getTestimonialsService(req.query);
  return res.status(200).json(new ApiResponse(200, testimonials, 'Testimonials fetched successfully'));
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.createTestimonialService(req.body);
  return res.status(201).json(new ApiResponse(201, testimonial, 'Testimonial created successfully'));
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.updateTestimonialService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, testimonial, 'Testimonial updated successfully'));
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonialService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Testimonial deleted successfully'));
});
