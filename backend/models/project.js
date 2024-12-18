const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  skills: {
    type: [String],
    required: [true, 'At least one skill is required'],
  },
  members: {
    type: Number,
    required: [true, 'Number of members is required'],
    min: [1, 'Members must be at least 1'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
