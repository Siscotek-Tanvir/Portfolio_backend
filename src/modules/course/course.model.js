import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
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
    instructor: {
      type: String,
      required: true,
      default: 'Tanvir Hossain',
    },
    platform: {
      type: String,
      required: true,
      default: 'Udemy / Coursera / YouTube',
    },
    category: {
      type: String,
      required: true,
      default: 'Web Development',
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    },
    courseUrl: {
      type: String,
      default: '',
    },
    certificateUrl: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '20 hours',
    },
    totalLessons: {
      type: Number,
      default: 1,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'All Levels',
    },
    skillsCovered: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'upcoming'],
      default: 'completed',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
