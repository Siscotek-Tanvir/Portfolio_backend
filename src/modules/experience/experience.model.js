import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=150&q=80',
    },
    companyUrl: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Remote',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      default: '',
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    achievements: [
      {
        type: String,
      },
    ],
    techStack: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Experience = mongoose.model('Experience', experienceSchema);
