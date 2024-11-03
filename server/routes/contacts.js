const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Add a contact for a specific company
router.post("/:companyId", async (req, res) => {
  try {
    console.log(req);
    const contact = new Contact({ ...req.body });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get contacts for a specific company
router.get("/:companyId", async (req, res) => {
  try {
    const contacts = await Contact.find({ companyId: req.params.companyId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
