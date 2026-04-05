const express = require("express");
const router = express.Router();
const controller = require("../controllers/jobController");

router.post("/", controller.createJob);
router.post("/update", controller.updateJob);
router.get("/", controller.getJobs);

module.exports = router;
