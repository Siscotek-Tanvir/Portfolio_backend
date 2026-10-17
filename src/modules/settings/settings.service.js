import { Settings } from './settings.model.js';

export const getSettingsService = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
};

export const updateSettingsService = async (data) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(data);
  } else {
    settings = await Settings.findByIdAndUpdate(settings._id, { $set: data }, { new: true });
  }
  return settings;
};
