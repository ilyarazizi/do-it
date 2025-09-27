const express = require("express");
const router = express.Router();
const handler = require("./../controllers/getTasksHandler");

router.get("/", handler);

module.exports = router;