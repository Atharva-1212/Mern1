const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// POST a new project
router.post('/', async (req, res) => {
  const { name, description, skills, members, isActive } = req.body;

  // Validate required fields
  if (!name || !description || !skills || skills.length === 0 || !members) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newProject = new Project({
      name,
      description,
      skills,
      members,
      isActive,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// PUT an existing project by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, skills, members, isActive } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, skills, members, isActive },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;
