import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    githubClientUrl: {
      type: String,
      default: '',
    },
    githubServerUrl: {
      type: String,
      default: '',
    },
    keyFeatures: [
      {
        type: String,
      },
    ],
    challenges: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Full Stack',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'completed',
    },
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

export const Project = mongoose.model('Project', projectSchema);
