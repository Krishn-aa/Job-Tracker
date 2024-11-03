const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Add a job to a specific company
router.post('/:companyId', async (req, res) => {
  try {
    const job = new Job({ ...req.body, companyId: req.params.companyId });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get jobs for a specific company
router.get('/:companyId', async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.params.companyId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
