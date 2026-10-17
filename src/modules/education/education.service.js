import { Education } from './education.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getEducationsService = async (query = {}) => {
  const filter = {};
  const { search, sortBy = 'order', sortOrder = 'asc', page, limit } = query;

  if (search && search.trim()) {
    filter.$or = [
      { degree: new RegExp(search.trim(), 'i') },
      { institution: new RegExp(search.trim(), 'i') },
      { fieldOfStudy: new RegExp(search.trim(), 'i') },
      { description: new RegExp(search.trim(), 'i') },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort.createdAt = -1;

  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await Education.countDocuments(filter);
    const educations = await Education.find(filter).sort(sort).skip(skip).limit(limitNum);
    return {
      educations,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  return await Education.find(filter).sort({ order: 1, createdAt: -1 });
};

export const createEducationService = async (data) => {
  return await Education.create(data);
};

export const updateEducationService = async (id, data) => {
  const education = await Education.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  if (!education) {
    throw new ApiError(404, 'Education not found');
  }
  return education;
};

export const deleteEducationService = async (id) => {
  const education = await Education.findByIdAndDelete(id);
  if (!education) {
    throw new ApiError(404, 'Education not found');
  }
  return education;
};
