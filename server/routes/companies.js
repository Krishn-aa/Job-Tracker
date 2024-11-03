const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Add a new company
router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a company by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
