const express = require("express");
const router = express.Router();
const handler = require("./../controllers/tasksHandler");

router.post("/", handler);

module.exports = router;