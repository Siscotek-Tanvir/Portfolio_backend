import slugify from 'slugify';
import { Project } from './project.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getProjectsService = async ({ featured, category, search, sortBy = 'order', sortOrder = 'asc', page = 1, limit = 10, all }) => {
  const query = {};
  if (all !== 'true') query.isActive = true;
  if (featured !== undefined) query.featured = featured === 'true';
  if (category && category !== 'All') query.category = new RegExp(category, 'i');
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { techStack: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort.createdAt = -1;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  return {
    projects,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  };
};

export const getProjectBySlugService = async (slug) => {
  const project = await Project.findOne({ slug });
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const getRelatedProjectsService = async (slug) => {
  const current = await Project.findOne({ slug });
  if (!current) return [];

  const related = await Project.find({
    slug: { $ne: slug },
    $or: [{ category: current.category }, { techStack: { $in: current.techStack } }],
  })
    .sort({ createdAt: -1 })
    .limit(3);

  if (related.length === 0) {
    return await Project.find({ slug: { $ne: slug } })
      .sort({ createdAt: -1 })
      .limit(3);
  }

  return related;
};

export const createProjectService = async (data) => {
  const { title, slug } = data;
  const projectSlug = slug
    ? slugify(slug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true }) + '-' + Math.floor(1000 + Math.random() * 9000);

  const existingProject = await Project.findOne({ slug: projectSlug });
  if (existingProject) throw new ApiError(400, 'Project slug already exists');

  return await Project.create({
    ...data,
    slug: projectSlug,
  });
};

export const updateProjectService = async (id, data) => {
  const { slug } = data;
  const updateData = { ...data };

  if (slug) {
    updateData.slug = slugify(slug, { lower: true, strict: true });
    const existing = await Project.findOne({ slug: updateData.slug, _id: { $ne: id } });
    if (existing) throw new ApiError(400, 'Slug already taken');
  }

  const project = await Project.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const deleteProjectService = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const reorderProjectsService = async (items) => {
  if (!Array.isArray(items)) throw new ApiError(400, 'Items must be an array');
  const bulkOps = items.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $set: { order: item.order } },
    },
  }));
  await Project.bulkWrite(bulkOps);
  return await Project.find().sort({ order: 1 });
};
