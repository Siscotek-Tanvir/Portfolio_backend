import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Alex Rivera',
    },
    title: {
      type: String,
      required: true,
      default: 'Senior MERN Stack Developer',
    },
    tagline: {
      type: String,
      default: 'Crafting high-performance web applications with clean, scalable architecture.',
    },
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      default: 'https://example.com/resume.pdf',
    },
    location: {
      type: String,
      default: 'San Francisco, CA / Remote',
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '+1 (555) 019-2834',
    },
    socialLinks: [socialLinkSchema],
    yearsOfExperience: {
      type: Number,
      default: 3,
    },
    availabilityStatus: {
      type: String,
      enum: ['Available for hire', 'Open to opportunities', 'Busy'],
      default: 'Available for hire',
    },
  },
  { timestamps: true }
);

export const About = mongoose.model('About', aboutSchema);
