import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  image: { type: String }, // URL to image
});

export default mongoose.model('Project', projectSchema);
