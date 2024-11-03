const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  jobName: { type: String, required: true },
  techStack: [String],
  uploadDate: { type: Date, default: Date.now },
  linkedinURL: { type: String },
});

module.exports = mongoose.model("Job", jobSchema);
