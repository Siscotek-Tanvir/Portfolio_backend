import slugify from 'slugify';
import { Course } from './course.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getCoursesService = async ({ search, category, status, sortBy = 'order', sortOrder = 'asc', page = 1, limit = 25 }) => {
  const query = {};
  if (category) {
    query.category = category;
  }
  if (status) {
    query.status = status;
  }
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { instructor: new RegExp(search, 'i') },
      { platform: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { skillsCovered: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort.createdAt = -1;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Course.countDocuments(query);
  const courses = await Course.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  return {
    courses,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  };
};

export const getCourseBySlugService = async (slug) => {
  const course = await Course.findOne({ slug });
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  return course;
};

export const getRelatedCoursesService = async (slug) => {
  const current = await Course.findOne({ slug });
  if (!current) return [];

  const related = await Course.find({
    slug: { $ne: slug },
    $or: [{ category: current.category }, { platform: current.platform }],
  })
    .sort({ createdAt: -1 })
    .limit(3);

  if (related.length === 0) {
    return await Course.find({ slug: { $ne: slug } })
      .sort({ createdAt: -1 })
      .limit(3);
  }

  return related;
};

export const createCourseService = async (data) => {
  const { title, slug } = data;
  const courseSlug = slug
    ? slugify(slug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true }) + '-' + Math.floor(1000 + Math.random() * 9000);

  const existing = await Course.findOne({ slug: courseSlug });
  if (existing) {
    throw new ApiError(400, 'Course with this slug already exists');
  }

  return await Course.create({
    ...data,
    slug: courseSlug,
  });
};

export const updateCourseService = async (id, data) => {
  const { slug } = data;
  const updateData = { ...data };

  if (slug) {
    updateData.slug = slugify(slug, { lower: true, strict: true });
    const existing = await Course.findOne({ slug: updateData.slug, _id: { $ne: id } });
    if (existing) {
      throw new ApiError(400, 'Another course is using this slug');
    }
  }

  const course = await Course.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  return course;
};

export const deleteCourseService = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  return course;
};
