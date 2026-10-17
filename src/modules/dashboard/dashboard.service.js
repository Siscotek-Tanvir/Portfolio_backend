import { Project } from '../project/project.model.js';
import { Skill } from '../skill/skill.model.js';
import { Experience } from '../experience/experience.model.js';
import { Blog } from '../blog/blog.model.js';
import { Course } from '../course/course.model.js';
import { Contact } from '../contact/contact.model.js';
import { Testimonial } from '../testimonial/testimonial.model.js';

export const getAdminStatsService = async () => {
  const [
    totalProjects,
    totalSkills,
    totalExperiences,
    totalBlogs,
    totalCourses,
    totalTestimonials,
    unreadContacts,
    totalContacts,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Blog.countDocuments(),
    Course.countDocuments(),
    Testimonial.countDocuments(),
    Contact.countDocuments({ status: 'unread' }),
    Contact.countDocuments(),
  ]);

  const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

  return {
    totalProjects,
    totalSkills,
    totalExperiences,
    totalBlogs,
    totalCourses,
    totalTestimonials,
    unreadContacts,
    totalContacts,
    recentContacts,
  };
};
