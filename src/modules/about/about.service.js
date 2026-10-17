import { About } from './about.model.js';

export const getAboutService = async () => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
      name: 'Tanvir Hossain',
      title: 'Full Stack MERN Developer',
      tagline: 'Building robust, modern, and scalable digital solutions.',
      bio: 'Full Stack Developer with 3+ years of dedicated professional experience.',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      email: 'tanvir@example.com',
    });
  }
  return about;
};

export const updateAboutService = async (data) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create(data);
  } else {
    about = await About.findByIdAndUpdate(about._id, { $set: data }, { new: true });
  }
  return about;
};
