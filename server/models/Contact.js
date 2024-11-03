const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  name: { type: String, required: true },
  linkedinURL: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  contacted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Contact", contactSchema);
