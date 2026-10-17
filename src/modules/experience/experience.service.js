import { Experience } from './experience.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getExperiencesService = async (query = {}) => {
  const filter = {};
  if (query.all !== 'true') {
    filter.isActive = { $ne: false };
  }

  const { search, sortBy = 'order', sortOrder = 'asc', page, limit } = query;

  if (search && search.trim()) {
    filter.$or = [
      { role: new RegExp(search.trim(), 'i') },
      { company: new RegExp(search.trim(), 'i') },
      { location: new RegExp(search.trim(), 'i') },
      { description: new RegExp(search.trim(), 'i') },
      { techStack: { $in: [new RegExp(search.trim(), 'i')] } },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort.createdAt = -1;

  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await Experience.countDocuments(filter);
    const experiences = await Experience.find(filter).sort(sort).skip(skip).limit(limitNum);
    return {
      experiences,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  return await Experience.find(filter).sort({ order: 1, createdAt: -1 });
};

export const createExperienceService = async (data) => {
  return await Experience.create(data);
};

export const updateExperienceService = async (id, data) => {
  const experience = await Experience.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  if (!experience) {
    throw new ApiError(404, 'Experience not found');
  }
  return experience;
};

export const deleteExperienceService = async (id) => {
  const experience = await Experience.findByIdAndDelete(id);
  if (!experience) {
    throw new ApiError(404, 'Experience not found');
  }
  return experience;
};
