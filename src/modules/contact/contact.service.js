import { Contact } from './contact.model.js';
import { Settings } from '../settings/settings.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { sendEmail } from '../../utils/sendEmail.js';

export const submitContactService = async ({ name, email, subject, message }, ip) => {
  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
    ip: String(ip),
  });

  const settings = await Settings.findOne();
  if (settings?.adminEmail) {
    sendEmail({
      to: settings.adminEmail,
      subject: `New Portfolio Message: ${subject}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    });
  }

  return contact;
};

export const getContactsService = async (query = {}) => {
  const filter = {};
  const { search, status, sortBy = 'createdAt', sortOrder = 'desc', page, limit } = query;

  if (status && status !== 'All') {
    filter.status = status;
  }

  if (search && search.trim()) {
    filter.$or = [
      { name: new RegExp(search.trim(), 'i') },
      { email: new RegExp(search.trim(), 'i') },
      { subject: new RegExp(search.trim(), 'i') },
      { message: new RegExp(search.trim(), 'i') },
    ];
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortDirection };
  if (sortBy !== '_id') sort._id = -1;

  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter).sort(sort).skip(skip).limit(limitNum);
    return {
      contacts,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  }

  return await Contact.find(filter).sort({ createdAt: -1 });
};

export const updateContactStatusService = async (id, status) => {
  if (!['unread', 'read', 'replied'].includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }

  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );

  if (!contact) {
    throw new ApiError(404, 'Message not found');
  }

  return contact;
};

export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new ApiError(404, 'Message not found');
  }
  return contact;
};
