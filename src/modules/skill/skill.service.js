import { Skill } from './skill.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getSkillsService = async (query = {}) => {
  // If passed directly as string (e.g. 'true')
  const isAll = typeof query === 'string' ? query === 'true' : query.all === 'true';
  const filter = isAll ? {} : { isActive: true };

  const { search, category, sortBy = 'order', sortOrder = 'asc', page, limit } =
    typeof query === 'object' ? query : {};

  if (category && category !== 'All') {
    filter.category = new RegExp(category, 'i');
  }

  if (search && search.trim()) {
    filter.$or = [
      { name: new RegExp(search.trim(), 'i') },
      { category: new RegExp(search.trim(), 'i') },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort._id = 1;

  // If pagination requested (e.g. admin table)
  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await Skill.countDocuments(filter);
    const skills = await Skill.find(filter).sort(sort).skip(skip).limit(limitNum);
    return {
      skills,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  // Public portfolio array
  return await Skill.find(filter).sort({ order: 1, createdAt: 1 });
};

export const getSkillByIdService = async (id) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  return skill;
};

export const createSkillService = async (data) => {
  return await Skill.create(data);
};

export const updateSkillService = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!skill) throw new ApiError(404, 'Skill not found');
  return skill;
};

export const deleteSkillService = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  return skill;
};

export const reorderSkillsService = async (items) => {
  if (!Array.isArray(items)) throw new ApiError(400, 'Items must be an array');
  const bulkOps = items.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $set: { order: item.order } },
    },
  }));
  await Skill.bulkWrite(bulkOps);
  return await Skill.find().sort({ order: 1 });
};
