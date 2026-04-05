const jobModel = require("../models/jobModel");
const logModel = require("../models/logModel");

exports.createJob = async (req, res) => {
  try {
    await jobModel.createJob(req.body);
    logModel.createLog(`🧵 Job created: ${req.body.id}`);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateJob = async (req, res) => {
  const { id, status, tailor } = req.body;

  try {
    await jobModel.updateJob(id, status, tailor);
    logModel.createLog(`Job ${id} → ${status} by ${tailor}`);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getJobs = async (req, res) => {
  const jobs = await jobModel.getJobs();
  res.json(jobs);
};
