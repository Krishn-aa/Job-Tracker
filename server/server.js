const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const companiesRoutes = require("./routes/companies");
const jobsRoutes = require("./routes/jobs");
const contactsRoutes = require("./routes/contacts");

app.use("/api/companies", companiesRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/contacts", contactsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
