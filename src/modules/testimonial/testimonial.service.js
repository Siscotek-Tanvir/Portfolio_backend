import { Testimonial } from './testimonial.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getTestimonialsService = async (query = {}) => {
  const filter = query.all === 'true' ? {} : { isActive: true };
  const { search, sortBy = 'order', sortOrder = 'asc', page, limit } = query;

  if (search && search.trim()) {
    filter.$or = [
      { name: new RegExp(search.trim(), 'i') },
      { role: new RegExp(search.trim(), 'i') },
      { company: new RegExp(search.trim(), 'i') },
      { message: new RegExp(search.trim(), 'i') },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort.createdAt = -1;

  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await Testimonial.countDocuments(filter);
    const testimonials = await Testimonial.find(filter).sort(sort).skip(skip).limit(limitNum);
    return {
      testimonials,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  return await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
};

export const createTestimonialService = async (data) => {
  return await Testimonial.create(data);
};

export const updateTestimonialService = async (id, data) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }
  return testimonial;
};

export const deleteTestimonialService = async (id) => {
  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }
  return testimonial;
};
