const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume.models'); // Adjust path if needed
const { generateSummary } = require('../utils/gemini');

module.exports = { generateSummary };

// POST /api/resume - Create a new resume
router.post('/resume', async (req, res) => {
  try {
    const { title, resumeID, username, useremailId } = req.body;
    const newResume = new Resume({ title, resumeID, username, useremailId });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/resume - Get all resumes
router.get('/resume', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single resume by resumeID
router.get('/resume/:resumeID', async (req, res) => {
  try {
    const { resumeID } = req.params;
    const resume = await Resume.findOne({ resumeID });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// GET /api/resume/:id
router.get('/resume/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save or update personal details
router.post('/resume/personal', async (req, res) => {
  try {
    const { resumeID, ...personalDetails } = req.body;
    // Find the resume by ID and update its personal details
    const updated = await Resume.findOneAndUpdate(
      { resumeID },
      { $set: { personalDetails } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save personal details' });
  }
});

// Save summary
router.post('/resume/summary', async (req, res) => {
  try {
    const { resumeID, summery } = req.body;
    
    const updated = await Resume.findOneAndUpdate(
      { resumeID },
      { $set: { summery } },
      { new: true, upsert: true }
    );
    
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save summary' });
  }
});

// Generate AI summary suggestions using Gemini
router.post('/resume/generate-summary', async (req, res) => {
  try {
    const { jobTitle, experience } = req.body;
    const summary = await generateSummary({ jobTitle, experience });

    // You can return as a list for compatibility with your frontend
    res.json({ suggestions: [{ experience_level: experience, summery: summary }] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// Save or update experience
router.post('/resume/experience', async (req, res) => {
  try {
    const { resumeID, experience } = req.body;
    const updated = await Resume.findOneAndUpdate(
      { resumeID },
      { $set: { experience } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save experience' });
  }
});

// Save or update education
router.post('/resume/education', async (req, res) => {
  try {
    const { resumeID, education } = req.body;
    const updated = await Resume.findOneAndUpdate(
      { resumeID },
      { $set: { education } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save education' });
  }
});

// Save or update skills
router.post('/resume/skills', async (req, res) => {
  try {
    const { resumeID, skills } = req.body;
    const updated = await Resume.findOneAndUpdate(
      { resumeID },
      { $set: { skills } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save skills' });
  }
});

module.exports = router;