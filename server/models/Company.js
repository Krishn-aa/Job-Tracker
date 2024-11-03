// In your Company model file
const mongoose = require("mongoose");
const Job = require("./Job");
const Contact = require("./Contact");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

companySchema.pre("findOneAndDelete", async function (next) {
  const companyId = this.getQuery()._id;

  // Delete all jobs with this companyId
  await Job.deleteMany({ companyId });

  // Delete all contacts with this companyId
  await Contact.deleteMany({ companyId });

  next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
