import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import {
  submitContactService,
  getContactsService,
  updateContactStatusService,
  deleteContactService,
} from './contact.service.js';

export const submitContact = asyncHandler(async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const contact = await submitContactService(req.body, ip);
  return res.status(201).json(new ApiResponse(201, contact, 'Your message has been sent successfully!'));
});

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await getContactsService(req.query);
  return res.status(200).json(new ApiResponse(200, contacts, 'Messages fetched successfully'));
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await updateContactStatusService(req.params.id, req.body.status);
  return res.status(200).json(new ApiResponse(200, contact, 'Message status updated'));
});

export const deleteContact = asyncHandler(async (req, res) => {
  await deleteContactService(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Message deleted successfully'));
});
