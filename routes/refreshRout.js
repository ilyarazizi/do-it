const express = require("express");
const router = express.Router();
const private = require("./../controllers/authController");

router.post("/", private.refresh);

module.exports = router;