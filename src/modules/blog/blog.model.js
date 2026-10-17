import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
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
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    },
    tags: [
      {
        type: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
