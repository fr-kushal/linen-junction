const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/analytics", analyticsRoutes);

module.exports = app;
