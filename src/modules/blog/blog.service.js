import slugify from 'slugify';
import { Blog } from './blog.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getBlogsService = async ({ all, tag, search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 }) => {
  const query = {};
  if (all !== 'true') {
    query.published = true;
  }
  if (tag) {
    query.tags = { $in: [tag] };
  }
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { excerpt: new RegExp(search, 'i') },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort._id = -1;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  return {
    blogs,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  };
};

export const getBlogBySlugService = async (slug) => {
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }
  return blog;
};

export const getRelatedBlogsService = async (slug) => {
  const current = await Blog.findOne({ slug });
  if (!current) return [];

  const related = await Blog.find({
    slug: { $ne: slug },
    published: true,
    tags: { $in: current.tags || [] },
  })
    .sort({ createdAt: -1 })
    .limit(3);

  if (related.length === 0) {
    return await Blog.find({ slug: { $ne: slug }, published: true })
      .sort({ createdAt: -1 })
      .limit(3);
  }

  return related;
};

export const createBlogService = async (data) => {
  const { title, slug } = data;
  const blogSlug = slug
    ? slugify(slug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true }) + '-' + Math.floor(1000 + Math.random() * 9000);

  const existingBlog = await Blog.findOne({ slug: blogSlug });
  if (existingBlog) {
    throw new ApiError(400, 'Blog post with this slug already exists');
  }

  return await Blog.create({
    ...data,
    slug: blogSlug,
  });
};

export const updateBlogService = async (id, data) => {
  const { slug } = data;
  const updateData = { ...data };

  if (slug) {
    updateData.slug = slugify(slug, { lower: true, strict: true });
    const existing = await Blog.findOne({ slug: updateData.slug, _id: { $ne: id } });
    if (existing) {
      throw new ApiError(400, 'Slug already taken by another blog post');
    }
  }

  const blog = await Blog.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }

  return blog;
};

export const deleteBlogService = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }
  return blog;
};
