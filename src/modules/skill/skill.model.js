import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Other'],
      default: 'Frontend',
    },
    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 80,
    },
    icon: {
      type: String,
      required: true,
      default: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
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

export const Skill = mongoose.model('Skill', skillSchema);
